// app/(auth)/deposit-withdraw/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { AxiosError } from 'axios';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import apiClient from '@/lib/api/client';

type Mode = 'deposit' | 'withdraw';

const MIN_DEPOSIT = 1000;
const MIN_WITHDRAW = 25000;

function normalizePhone(value: string): string {
  let v = value.replace(/\s+/g, '').replace(/-/g, '');
  if (v.startsWith('+255')) v = '0' + v.slice(4);
  if (v.startsWith('255') && v.length === 12) v = '0' + v.slice(3);
  if (v.length === 9 && /^\d+$/.test(v)) v = '0' + v;
  return v;
}

function generateIdempotencyKey(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `tx-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function DepositWithdrawPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('deposit');
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isWithdraw = mode === 'withdraw';
  const minAmount = isWithdraw ? MIN_WITHDRAW : MIN_DEPOSIT;

  const isValidPhone = (value: string) => /^0[67]\d{8}$/.test(normalizePhone(value));

  const handleModeChange = (_: any, val: Mode | null) => {
    if (!val) return;
    setMode(val);
    setError('');
    setSuccess('');
    setAmount('');
    setPhone('');
  };

  const handleSubmit = async () => {
    const numericAmount = parseFloat(amount);

    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    if (numericAmount < minAmount) {
      setError(
        `Minimum ${isWithdraw ? 'withdrawal' : 'deposit'} amount is TZS ${minAmount.toLocaleString()}`
      );
      return;
    }
    if (!phone.trim()) {
      setError(
        isWithdraw
          ? 'Please enter the mobile money number to receive the money'
          : 'Please enter your mobile money number'
      );
      return;
    }
    if (!isValidPhone(phone)) {
      setError('Enter a valid Tanzanian number (e.g. 0712345678)');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const normalizedPhone = normalizePhone(phone);
      const idempotencyKey = generateIdempotencyKey();

      if (isWithdraw) {
        await apiClient.post('/wallet/withdraw', {
          amount: numericAmount,
          phone: normalizedPhone,
          idempotencyKey,
        });
        setSuccess(
          `Withdrawal of TZS ${numericAmount.toLocaleString()} is being sent to ${normalizedPhone}. ` +
            `It should arrive within a few minutes.`
        );
      } else {
        await apiClient.post('/wallet/deposit', {
          amount: numericAmount,
          phone: normalizedPhone,
          idempotencyKey,
        });
        setSuccess(
          `Deposit initiated. Please approve the payment prompt sent to ${normalizedPhone}.`
        );
      }

      setAmount('');
      setPhone('');
      setTimeout(() => router.push('/wallet'), 2500);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || `Failed to ${mode}`);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 560, mx: 'auto' }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.02em', color: 'var(--navy)' }}
      >
        Deposit & Withdraw
      </Typography>
      <Typography variant="body2" sx={{ mb: 4, color: 'var(--text-muted)' }}>
        {isWithdraw
          ? `Send money from your WingaPro wallet to your mobile money number (min TZS ${MIN_WITHDRAW.toLocaleString()}).`
          : `Add funds to your WingaPro wallet via mobile money (min TZS ${MIN_DEPOSIT.toLocaleString()}).`}
      </Typography>

      <Card
        sx={{
          borderRadius: 4,
          border: '1px solid var(--border)',
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'var(--surface)',
        }}
      >
        <Box
          sx={{
            height: 4,
            background: 'linear-gradient(90deg, var(--navy) 0%, var(--cyan) 100%)',
          }}
        />

        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={handleModeChange}
            fullWidth
            sx={{ mb: 4 }}
          >
            <ToggleButton value="deposit">
              <Stack direction="row" spacing={1} alignItems="center">
                <AccountBalanceWalletRoundedIcon fontSize="small" />
                <span>Deposit</span>
              </Stack>
            </ToggleButton>
            <ToggleButton value="withdraw">
              <Stack direction="row" spacing={1} alignItems="center">
                <PhoneIphoneRoundedIcon fontSize="small" />
                <span>Withdraw</span>
              </Stack>
            </ToggleButton>
          </ToggleButtonGroup>

          <TextField
            label="Amount"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`Minimum TZS ${minAmount.toLocaleString()}`}
            InputProps={{
              startAdornment: <InputAdornment position="start">TZS</InputAdornment>,
            }}
            inputProps={{ min: minAmount, step: 100 }}
            helperText={`Minimum ${isWithdraw ? 'withdrawal' : 'deposit'}: TZS ${minAmount.toLocaleString()}`}
            sx={{ mb: 3 }}
          />

          <TextField
            label={isWithdraw ? 'Phone number to receive money' : 'Mobile money phone number'}
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 0712345678"
            helperText={
              isWithdraw
                ? 'We will send the money to this number.'
                : 'You will receive a payment prompt on this number.'
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIphoneRoundedIcon sx={{ color: 'var(--text-muted)', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
              {success}
            </Alert>
          )}

          <Button
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
            onClick={handleSubmit}
            className="btn-shine"
            sx={{ py: 1.6, fontSize: '1rem' }}
          >
            {loading ? (
              <CircularProgress size={22} color="inherit" />
            ) : isWithdraw ? (
              'Request Withdrawal'
            ) : (
              'Deposit Now'
            )}
          </Button>
        </CardContent>
      </Card>

      <Box
        sx={{
          mt: 3,
          p: 2.5,
          borderRadius: 3,
          bgcolor: 'var(--cyan-muted)',
          border: '1px solid rgba(0,180,216,0.18)',
        }}
      >
        <Typography variant="body2" sx={{ color: 'var(--navy)', fontWeight: 600, mb: 0.5 }}>
          {isWithdraw ? 'Withdrawal info' : 'Deposit info'}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-muted)' }}
        >
          {isWithdraw
            ? `Withdrawals are processed within minutes. Minimum: TZS ${MIN_WITHDRAW.toLocaleString()}. Make sure the phone number matches your mobile money account.`
            : `You will receive a USSD / app prompt from your mobile money provider. Approve it to complete the deposit. Minimum: TZS ${MIN_DEPOSIT.toLocaleString()}.`}
        </Typography>
      </Box>
    </Box>
  );
}