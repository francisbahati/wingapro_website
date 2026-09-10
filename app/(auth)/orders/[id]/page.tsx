// app/(auth)/orders/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
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
  assignedSeller?: { username?: string };
}

const STATUS_COLORS: Record<string, { bg: string; label: string }> = {
  payment_received: { bg: '#3B82F6', label: 'Payment Received' },
  waiting_approval: { bg: '#F59E0B', label: 'Waiting Approval' },
  approved: { bg: '#8B5CF6', label: 'Approved' },
  waiting_delivery: { bg: '#0EA5E9', label: 'Out for Delivery' },
  completed: { bg: '#10B981', label: 'Completed' },
};

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rating, setRating] = useState<number | null>(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      if (!id) return;
      try {
        // Backend has no /purchases/:id — fetch the list and find by id
        const res = await apiClient.get('/purchases');
        const found = (res.data.purchases ?? []).find((p: Order) => String(p.id) === String(id));
        if (!found) throw new Error('Order not found');
        setOrder(found);
      } catch (e: any) {
        setError(e?.response?.data?.message || e.message || 'Failed to load order');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleConfirm = async () => {
    if (!rating) {
      setError('Please rate your experience');
      return;
    }
    setSubmitting(true);
    try {
      await apiClient.put(`/purchase/${id}/confirm`, { rating });
      router.push(`/order-confirmation?id=${id}&package=${order?.Package?.name ?? ''}`);
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Failed to confirm');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !order) return <Alert severity="error">{error || 'Order not found'}</Alert>;

  const status = STATUS_COLORS[order.orderStatus] ?? { bg: '#64748B', label: order.orderStatus };
  const canConfirm = order.orderStatus === 'waiting_delivery';

  return (
    <Box sx={{ maxWidth: 640, mx: 'auto' }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Order #{order.id}
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              {order.Package?.name ?? 'Package'}
            </Typography>
            <Chip label={status.label} sx={{ bgcolor: status.bg, color: '#fff', fontWeight: 600 }} />
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <DetailRow label="Recipient" value={order.recipientName} />
          <DetailRow label="Phone" value={order.recipientPhone} />
          <DetailRow label="Network" value={order.network} />
          <DetailRow label="Amount" value={`TZS ${Number(order.amount).toLocaleString()}`} />
          {order.assignedSeller && <DetailRow label="Seller" value={order.assignedSeller.username ?? ''} />}
          <DetailRow label="Placed" value={new Date(order.createdAt).toLocaleString()} />
        </CardContent>
      </Card>

      {canConfirm ? (
        <Card>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Rate your experience
            </Typography>
            <Rating
              value={rating}
              onChange={(_, v) => setRating(v)}
              size="large"
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              size="large"
              fullWidth
              disabled={submitting}
              onClick={handleConfirm}
              startIcon={<CheckCircleRoundedIcon />}
            >
              {submitting ? 'Confirming…' : 'Confirm Receipt'}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Alert severity="info" icon={<CheckCircleRoundedIcon />}>
          {order.orderStatus === 'completed'
            ? 'This order is complete. Thank you for using WingaPro!'
            : 'Your order is being processed. You will be notified when it is out for delivery.'}
        </Alert>
      )}
    </Box>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Stack direction="row" spacing={2} sx={{ py: 0.75 }}>
      <Typography variant="body2" fontWeight={600} sx={{ width: 110, color: 'text.secondary' }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {value}
      </Typography>
    </Stack>
  );
}