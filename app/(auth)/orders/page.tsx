// app/(auth)/orders/page.tsx
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
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import apiClient from '@/lib/api/client';
import { brand } from '@/theme-provider';

interface Order {
  id: number;
  amount: number;
  orderStatus: string;
  recipientName: string;
  recipientPhone: string;
  network: string;
  createdAt: string;
  Package?: { name?: string };
}

const STATUS_COLORS: Record<string, { bg: string; label: string }> = {
  payment_received: { bg: '#3B82F6', label: 'Payment Received' },
  waiting_approval: { bg: '#F59E0B', label: 'Waiting Approval' },
  approved: { bg: '#8B5CF6', label: 'Approved' },
  waiting_delivery: { bg: '#0EA5E9', label: 'Out for Delivery' },
  completed: { bg: '#10B981', label: 'Completed' },
};

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await apiClient.get('/purchases');
        setOrders(res.data.purchases ?? []);
      } catch (e: any) {
        setError(e?.response?.data?.message || 'Failed to load orders');
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

  if (error) return <Alert severity="error">{error}</Alert>;

  if (orders.length === 0) {
    return (
      <Card sx={{ p: 6, textAlign: 'center' }}>
        <ReceiptLongIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>
          No orders yet
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Browse packages and place your first order in seconds.
        </Typography>
        <Button
          onClick={() => router.push('/packages')}
          variant="contained"
          size="large"
        >
          Browse Packages
        </Button>
      </Card>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        My Orders
      </Typography>
      <Stack spacing={2}>
        {orders.map((o) => {
          const status = STATUS_COLORS[o.orderStatus] ?? {
            bg: '#64748B',
            label: o.orderStatus,
          };
          return (
            <Card key={o.id} className="lift" sx={{ overflow: 'hidden' }}>
              <CardContent>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  sx={{ justifyContent: 'space-between' }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Stack
                      direction="row"
                      spacing={1.5}
                      sx={{ alignItems: 'center', mb: 1 }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {o.Package?.name ?? 'Package'}
                      </Typography>
                      <Chip
                        size="small"
                        label={status.label}
                        sx={{ bgcolor: status.bg, color: '#fff', fontWeight: 600 }}
                      />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      Order #{o.id} · {o.network}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Recipient: {o.recipientName} · {o.recipientPhone}
                    </Typography>
                    <Divider sx={{ my: 1.5 }} />
                    <Stack
                      direction="row"
                      sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        {new Date(o.createdAt).toLocaleString()}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: brand.navy }}>
                        TZS {Number(o.amount).toLocaleString()}
                      </Typography>
                    </Stack>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                      onClick={() => router.push(`/orders/${o.id}`)}
                      endIcon={<ArrowForwardIcon />}
                      variant="outlined"
                    >
                      View
                    </Button>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
}