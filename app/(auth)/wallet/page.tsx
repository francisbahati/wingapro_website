// app/(auth)/wallet/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import apiClient from '@/lib/api/client';
import { brand } from '@/theme-provider';

interface Tx {
  type: 'credit' | 'debit';
  description: string;
  amount: number;
  date: string;
}

interface Withdrawal {
  id: number;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'rejected';
  requestedAt: string;
}

const W_STATUS: Record<string, { color: string; label: string }> = {
  pending: { color: '#F59E0B', label: 'Pending' },
  processing: { color: '#3B82F6', label: 'Processing' },
  completed: { color: '#10B981', label: 'Completed' },
  failed: { color: '#EF4444', label: 'Failed' },
  rejected: { color: '#EF4444', label: 'Rejected' },
};

export default function WalletPage() {
  const router = useRouter();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Tx[]>([]);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const [walletRes, withdrawalsRes] = await Promise.all([
          apiClient.get('/wallet'),
          apiClient.get('/withdraw/history', { params: { limit: 10 } }),
        ]);
        setBalance(walletRes.data.balance ?? 0);
        setTransactions(walletRes.data.transactions ?? []);
        setWithdrawals(withdrawalsRes.data.withdrawals ?? []);
      } catch (e: any) {
        setError(e?.response?.data?.message || 'Failed to load wallet');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        My Wallet
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Card
        sx={{
          mb: 4,
          color: '#fff',
          border: 'none',
          background: `linear-gradient(135deg, ${brand.navy} 0%, ${brand.navyLight} 60%, ${brand.cyan} 140%)`,
          boxShadow: '0 20px 40px rgba(10,46,92,0.3)',
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Typography
            variant="body2"
            sx={{
              opacity: 0.85,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontSize: 12,
            }}
          >
            Available Balance
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontWeight: 800, my: 1, letterSpacing: '-0.02em' }}
          >
            TZS {balance.toLocaleString()}
          </Typography>
          <Button
            onClick={() => router.push('/deposit-withdraw')}
            startIcon={<AddRoundedIcon />}
            sx={{
              mt: 2,
              bgcolor: '#fff',
              color: brand.navy,
              '&:hover': { bgcolor: '#F1F5F9' },
            }}
          >
            Deposit / Withdraw
          </Button>
        </CardContent>
      </Card>

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
        Withdrawal History
      </Typography>
      {withdrawals.length === 0 ? (
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          No withdrawal requests yet.
        </Typography>
      ) : (
        <Box sx={{ mb: 3, bgcolor: 'background.paper', borderRadius: 3 }}>
          {withdrawals.map((w, i) => {
            const s = W_STATUS[w.status];
            return (
              <Box
                key={w.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 2,
                  borderBottom: i < withdrawals.length - 1 ? '1px solid' : 'none',
                  borderColor: 'divider',
                }}
              >
                <Box>
                  <Typography sx={{ fontWeight: 600 }}>
                    TZS {w.amount.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(w.requestedAt).toLocaleString()}
                  </Typography>
                </Box>
                <Chip
                  size="small"
                  label={s.label}
                  sx={{ bgcolor: s.color, color: '#fff' }}
                />
              </Box>
            );
          })}
        </Box>
      )}

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
        Recent Transactions
      </Typography>
      {transactions.length === 0 ? (
        <Typography color="text.secondary">No transactions yet.</Typography>
      ) : (
        <Stack spacing={1}>
          {transactions.map((tx, i) => {
            const isCredit = tx.type === 'credit';
            return (
              <Card key={i}>
                <CardContent sx={{ py: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: isCredit ? 'success.light' : 'error.light',
                        color: isCredit ? 'success.main' : 'error.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {isCredit ? (
                        <ArrowDownwardRoundedIcon fontSize="small" />
                      ) : (
                        <ArrowUpwardRoundedIcon fontSize="small" />
                      )}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                        {tx.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(tx.date).toLocaleString()}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: isCredit ? 'success.main' : 'error.main',
                      }}
                    >
                      {isCredit ? '+' : '-'} TZS {tx.amount.toLocaleString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      )}
    </Box>
  );
}