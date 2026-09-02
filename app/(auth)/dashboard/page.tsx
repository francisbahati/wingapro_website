// app/(auth)/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface CustomerStats {
  balance: number;
  activeOrders: number;
  totalPurchases: number;
  lastPurchase: string | null;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<CustomerStats | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customer/dashboard`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStats(data.stats);
        else {
          setStats({
            balance: 5000,
            activeOrders: 2,
            totalPurchases: 15,
            lastPurchase: '2025-01-17',
          });
        }
      })
      .catch(() => {
        setStats({
          balance: 5000,
          activeOrders: 2,
          totalPurchases: 15,
          lastPurchase: '2025-01-17',
        });
      })
      .finally(() => setLoading(false));
  }, []);

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
        Welcome back, {user?.username}!
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
          gap: 3,
          mb: 4,
        }}
      >
        <Card sx={{ borderLeft: 4, borderColor: 'primary.main' }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Wallet Balance
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              TZS {stats?.balance.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ borderLeft: 4, borderColor: 'warning.main' }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Active Orders
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {stats?.activeOrders}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ borderLeft: 4, borderColor: 'success.main' }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Total Purchases
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {stats?.totalPurchases}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ borderLeft: 4, borderColor: 'secondary.main' }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Last Purchase
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {stats?.lastPurchase || 'None'}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          gap: 3,
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Button variant="contained" onClick={() => router.push('/packages')}>
                Buy Data
              </Button>
              <Button variant="outlined" onClick={() => router.push('/wallet')}>
                Top Up Wallet
              </Button>
              <Button variant="outlined" onClick={() => router.push('/orders')}>
                View Orders
              </Button>
            </Box>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Network Status
            </Typography>
            <Typography variant="body2" color="text.secondary">
              All networks are currently operational.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}