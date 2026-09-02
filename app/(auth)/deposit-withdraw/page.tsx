'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api/client';
import { AxiosError } from 'axios';

const PRIMARY = '#0A2E5C';

export default function DepositWithdrawPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    const numericAmount = parseFloat(amount);
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const endpoint = mode === 'deposit' ? '/wallet/deposit' : '/wallet/withdraw';
      await apiClient.post(endpoint, { amount: numericAmount });
      setSuccess(`${mode === 'deposit' ? 'Deposit' : 'Withdrawal'} successful!`);
      setAmount('');
      setTimeout(() => router.push('/wallet'), 2000);
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
    <Box sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Deposit / Withdraw
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(_, val) => val && setMode(val)}
            fullWidth
            sx={{ mb: 3 }}
          >
            <ToggleButton value="deposit" sx={{ py: 1.5 }}>
              <Typography sx={{ fontWeight: 'bold' }}>Deposit</Typography>
            </ToggleButton>
            <ToggleButton value="withdraw" sx={{ py: 1.5 }}>
              <Typography sx={{ fontWeight: 'bold' }}>Withdraw</Typography>
            </ToggleButton>
          </ToggleButtonGroup>

          <TextField
            label="Amount (TZS)"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            sx={{ mb: 3 }}
          />

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <Button
            variant="contained"
            fullWidth
            disabled={loading}
            onClick={handleSubmit}
            sx={{ bgcolor: PRIMARY, py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : (mode === 'deposit' ? 'Deposit' : 'Withdraw')}
          </Button>
        </CardContent>
      </Card>

      <Typography variant="body2" color="text.secondary" align="center">
        {mode === 'deposit'
          ? 'Funds will be added to your wallet instantly.'
          : 'Withdrawals are processed within 24 hours.'}
      </Typography>
    </Box>
  );
}