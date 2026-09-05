'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box, Card, CardContent, Typography, Rating, Button, CircularProgress, Alert,
} from '@mui/material';
import apiClient from '@/lib/api/client';
import { AxiosError } from 'axios';

interface Order {
  id: number;
  recipientName: string;
  recipientPhone: string;
  network: string;
  amount: number;
  orderStatus: string;
  createdAt: string;
  Package?: { name: string };
  assignedSeller?: { username: string };
}

export default function OrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rating, setRating] = useState<number | null>(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await apiClient.get('/purchases'); // fetch all purchases
        const orders = res.data.purchases || [];
        const found = orders.find((o: Order) => o.id === Number(id));
        if (!found) {
          setError('Order not found');
        } else {
          setOrder(found);
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err.response?.data?.message || 'Failed to load order');
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchOrder();
  }, [id]);

  const handleConfirm = async () => {
    if (!rating || rating === 0) {
      setError('Please rate your experience');
      return;
    }
    setSubmitting(true);
    try {
      await apiClient.put(`/purchase/${id}/confirm`, { rating });
      router.push(`/order-confirmation?id=${id}`);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || 'Failed to confirm');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Box sx={{ p: 3, textAlign: 'center' }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error" sx={{ m: 3 }}>{error}</Alert>;
  if (!order) return <Typography sx={{ m: 3 }}>Order not found</Typography>;

  const canConfirm = order.orderStatus === 'waiting_delivery';

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
        Order #{order.id}
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <DetailRow label="Package" value={order.Package?.name || 'N/A'} />
          <DetailRow label="Recipient" value={order.recipientName} />
          <DetailRow label="Phone" value={order.recipientPhone} />
          <DetailRow label="Network" value={order.network} />
          <DetailRow label="Amount" value={`TZS ${order.amount.toLocaleString()}`} />
          <DetailRow label="Status" value={order.orderStatus} />
          <DetailRow label="Date" value={new Date(order.createdAt).toLocaleDateString()} />
        </CardContent>
      </Card>

      {canConfirm && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>Rate your experience:</Typography>
          <Rating value={rating} onChange={(_, val) => setRating(val)} size="large" sx={{ mb: 2 }} />
          <Button variant="contained" fullWidth disabled={submitting} onClick={handleConfirm} sx={{ bgcolor: 'green', '&:hover': { bgcolor: 'darkgreen' } }}>
            {submitting ? <CircularProgress size={24} color="inherit" /> : 'Confirm Receipt'}
          </Button>
        </Box>
      )}
    </Box>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: 'flex', py: 1, borderBottom: '1px solid #eee' }}>
      <Typography variant="body2" sx={{ fontWeight: 'bold', width: 100 }}>{label}:</Typography>
      <Typography variant="body2">{value}</Typography>
    </Box>
  );
}