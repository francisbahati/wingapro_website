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
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import apiClient from '@/lib/api/client';

interface Tx {
  type: 'credit' | 'debit';
  description: string;
  amount: number;
  date: string;
}

export default function WalletPage() {
  const router = useRouter();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Tx[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const walletRes = await apiClient.get('/wallet');
        setBalance(walletRes.data.balance ?? 0);
        setTransactions(walletRes.data.transactions ?? []);
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
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: 'var(--navy)' }}>
        My Wallet
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Card
        sx={{
          mb: 4,
          color: '#fff',
          border: 'none',
          background:
            'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 60%, var(--cyan) 140%)',
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
          <Typography variant="h3" sx={{ fontWeight: 800, my: 1, letterSpacing: '-0.02em' }}>
            TZS {balance.toLocaleString()}
          </Typography>
          <Button
            onClick={() => router.push('/deposit-withdraw')}
            startIcon={<AddRoundedIcon />}
            sx={{
              mt: 2,
              bgcolor: '#fff',
              color: 'var(--navy-deep)',
              '&:hover': { bgcolor: '#F1F5F9' },
            }}
          >
            Deposit / Withdraw
          </Button>
        </CardContent>
      </Card>

      <Divider sx={{ my: 3, borderColor: 'var(--border)' }} />

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: 'var(--navy)' }}>
        Recent Transactions
      </Typography>
      {transactions.length === 0 ? (
        <Typography sx={{ color: 'var(--text-muted)' }}>No transactions yet.</Typography>
      ) : (
        <Stack spacing={1}>
          {transactions.map((tx, i) => {
            const isCredit = tx.type === 'credit';
            return (
              <Card
                key={i}
                sx={{ bgcolor: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <CardContent sx={{ py: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: isCredit ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                        color: isCredit ? 'var(--success)' : 'var(--error)',
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
                      <Typography
                        sx={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text)' }}
                      >
                        {tx.description}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>
                        {new Date(tx.date).toLocaleString()}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: isCredit ? 'var(--success)' : 'var(--error)',
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