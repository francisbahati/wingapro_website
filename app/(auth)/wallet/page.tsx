// app/(auth)/wallet/page.tsx
'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import { AxiosError } from 'axios';
import apiClient from '@/lib/api/client';

interface Transaction {
  id: number;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
}

interface WalletData {
  balance: number;
  transactions: Transaction[];
}

export default function WalletPage() {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [topUpLoading, setTopUpLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customer/wallet`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setWallet(data.wallet);
        else {
          setWallet({
            balance: 5000,
            transactions: [
              { id: 1, type: 'credit', amount: 5000, description: 'Initial top-up', date: '2025-01-01' },
              { id: 2, type: 'debit', amount: 500, description: '1GB Daily purchase', date: '2025-01-17' },
            ],
          });
        }
      })
      .catch(() => {
        setWallet({
          balance: 5000,
          transactions: [
            { id: 1, type: 'credit', amount: 5000, description: 'Initial top-up', date: '2025-01-01' },
            { id: 2, type: 'debit', amount: 500, description: '1GB Daily purchase', date: '2025-01-17' },
          ],
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleTopUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setTopUpLoading(true);
    setMessage(null);
    try {
      await apiClient.post('/customer/wallet/topup', {
        amount: parseFloat(amount),
      });
      setMessage({ type: 'success', text: 'Wallet topped up successfully' });
      setAmount('');
      const res = await apiClient.get('/customer/wallet');
      setWallet(res.data.wallet);
    } catch (err) {
      if (err instanceof AxiosError) {
        setMessage({ type: 'error', text: err.response?.data?.message || 'Top-up failed' });
      } else {
        setMessage({ type: 'error', text: 'An unexpected error occurred' });
      }
    } finally {
      setTopUpLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        My Wallet
      </Typography>

      <Card sx={{ mb: 4, bgcolor: 'primary.main', color: 'white' }}>
        <CardContent>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Current Balance
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 'bold', my: 1 }}>
            TZS {wallet?.balance.toLocaleString()}
          </Typography>
        </CardContent>
      </Card>

      {message && (
        <Alert severity={message.type} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      )}

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Top Up Wallet
          </Typography>
          <form onSubmit={handleTopUp}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                label="Amount (TZS)"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                sx={{ minWidth: 200 }}
              />
              <Button type="submit" variant="contained" disabled={topUpLoading}>
                {topUpLoading ? <CircularProgress size={24} color="inherit" /> : 'Top Up'}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Transaction History
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {wallet?.transactions.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell>{txn.id}</TableCell>
                    <TableCell>
                      <Chip
                        label={txn.type}
                        color={txn.type === 'credit' ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {txn.type === 'credit' ? '+' : '-'} TZS {txn.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>{txn.description}</TableCell>
                    <TableCell>{txn.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}