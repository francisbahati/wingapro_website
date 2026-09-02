'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  Alert,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api/client';
import { AxiosError } from 'axios';

const PRIMARY = '#0A2E5C';

interface Transaction {
  id: number;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
}

interface Withdrawal {
  id: number;
  amount: number;
  status: 'pending' | 'completed' | 'rejected';
  requestedAt: string;
}

export default function WalletPage() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await apiClient.get('/wallet');
        setBalance(res.data.balance || 0);
        setTransactions(res.data.transactions || []);
        const wRes = await apiClient.get('/withdrawals');
        setWithdrawals(wRes.data.withdrawals || []);
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err.response?.data?.message || 'Failed to load wallet');
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchWallet();
  }, []);

  if (loading) return <Box sx={{ p: 3, textAlign: 'center' }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error" sx={{ m: 3 }}>{error}</Alert>;

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        My Wallet
      </Typography>

      {/* Balance Card */}
      <Card sx={{ mb: 4, bgcolor: PRIMARY, color: 'white' }}>
        <CardContent>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Total Balance
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
            TZS {balance.toLocaleString()}
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2, bgcolor: 'white', color: PRIMARY }}
            onClick={() => router.push('/deposit-withdraw')}
          >
            Deposit / Withdraw
          </Button>
        </CardContent>
      </Card>

      {/* Withdrawals */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Withdrawal History
      </Typography>
      {withdrawals.length === 0 ? (
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          No withdrawal requests yet.
        </Typography>
      ) : (
        <List sx={{ mb: 4 }}>
          {withdrawals.map((w) => (
            <ListItem key={w.id} divider>
              <ListItemText
                primary={`TZS ${w.amount.toLocaleString()}`}
                secondary={new Date(w.requestedAt).toLocaleDateString()}
              />
              <Chip
                label={w.status}
                color={w.status === 'completed' ? 'success' : w.status === 'rejected' ? 'error' : 'warning'}
                size="small"
              />
            </ListItem>
          ))}
        </List>
      )}

      <Divider sx={{ my: 3 }} />

      {/* Transactions */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Recent Transactions
      </Typography>
      {transactions.length === 0 ? (
        <Typography color="text.secondary">No transactions yet.</Typography>
      ) : (
        <List>
          {transactions.map((tx) => (
            <ListItem key={tx.id} divider>
              <ListItemText
                primary={tx.description}
                secondary={new Date(tx.date).toLocaleString()}
              />
              <Typography
                variant="body2"
                color={tx.type === 'credit' ? 'green' : 'red'}
                sx={{ fontWeight: 'bold' }}
              >
                {tx.type === 'credit' ? '+' : '-'} TZS {tx.amount.toLocaleString()}
              </Typography>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}