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

export default function DepositWithdrawPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('deposit');
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isWithdraw = mode === 'withdraw';

  // Accept 0712345678, 712345678, +255712345678, or 255712345678
  const normalizePhone = (value: string): string => {
    let v = value.replace(/\s+/g, '').replace(/-/g, '');
    if (v.startsWith('+255')) v = '0' + v.slice(4);
    if (v.startsWith('255') && v.length === 12) v = '0' + v.slice(3);
    if (v.length === 9 && /^\d+$/.test(v)) v = '0' + v;
    return v;
  };

  const isValidPhone = (value: string) => /^0\d{9}$/.test(normalizePhone(value));

  const handleModeChange = (_: any, val: Mode | null) => {
    if (!val) return;
    setMode(val);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async () => {
    const numericAmount = parseFloat(amount);

    // ---- Validation ----
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    if (numericAmount < 500) {
      setError('Minimum amount is TZS 500');
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
      setError('Enter a valid 10-digit Tanzanian number (e.g. 0712345678)');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const endpoint = isWithdraw ? '/wallet/withdraw' : '/wallet/deposit';
      const payload = {
        amount: numericAmount,
        phone: normalizePhone(phone),
      };

      await apiClient.post(endpoint, payload);

      setSuccess(
        isWithdraw
          ? `Withdrawal request submitted. You will receive the money on ${normalizePhone(phone)} within 24 hours.`
          : `Deposit request submitted. Please approve the payment prompt sent to ${normalizePhone(phone)}.`
      );

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
      {/* Header */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          mb: 1,
          letterSpacing: '-0.02em',
          color: 'var(--navy)',
        }}
      >
        Deposit & Withdraw
      </Typography>
      <Typography variant="body2" sx={{ mb: 4, color: 'var(--text-muted)' }}>
        {isWithdraw
          ? 'Request a payout to your mobile money number.'
          : 'Add funds to your WingaPro wallet using mobile money.'}
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
        {/* Top accent bar */}
        <Box
          sx={{
            height: 4,
            background: `linear-gradient(90deg, var(--navy) 0%, var(--cyan) 100%)`,
          }}
        />

        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          {/* Mode toggle */}
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

          {/* Amount */}
          <TextField
            label="Amount"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            InputProps={{
              startAdornment: <InputAdornment position="start">TZS</InputAdornment>,
            }}
            inputProps={{ min: 500, step: 100 }}
            sx={{ mb: 3 }}
          />

          {/* Phone — shown for BOTH deposit and withdraw */}
          <TextField
            label={
              isWithdraw
                ? 'Phone number to receive money'
                : 'Mobile money phone number'
            }
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
                  <PhoneIphoneRoundedIcon
                    sx={{ color: 'var(--text-muted)', fontSize: 20 }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          {/* Alerts */}
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

          {/* Submit */}
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

      {/* Info footer */}
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
          sx={{
            fontSize: '0.85rem',
            lineHeight: 1.6,
            color: 'var(--text-muted)',
          }}
        >
          {isWithdraw
            ? 'Withdrawals are processed within 24 hours. Make sure the phone number matches your mobile money account.'
            : 'You will receive a USSD / app prompt from your mobile money provider. Approve it to complete the deposit.'}
        </Typography>
      </Box>
    </Box>
  );
}