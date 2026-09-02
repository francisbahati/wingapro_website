'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Skeleton,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api/client';
import { AxiosError } from 'axios';

const PRIMARY = '#0A2E5C';

interface Order {
  id: number;
  Package?: { name: string };
  recipientName: string;
  recipientPhone: string;
  network: string;
  amount: number;
  orderStatus: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await apiClient.get('/purchases');
        setOrders(res.data.purchases || []);
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err.response?.data?.message || 'Failed to load orders');
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'payment_received': return 'info';
      case 'waiting_approval': return 'warning';
      case 'approved': return 'primary';
      case 'waiting_delivery': return 'warning';
      case 'completed': return 'success';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'payment_received': return 'Payment Received';
      case 'waiting_approval': return 'Waiting Approval';
      case 'approved': return 'Approved';
      case 'waiting_delivery': return 'Waiting Delivery';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        {[1, 2, 3].map((i) => (
          <Card key={i} sx={{ mb: 2 }}>
            <CardContent>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="rectangular" height={40} />
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
        <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Box>
    );
  }

  if (orders.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">No orders yet</Typography>
        <Button variant="contained" sx={{ mt: 2, bgcolor: PRIMARY }} onClick={() => router.push('/packages')}>
          Start Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        My Orders
      </Typography>
      {orders.map((order) => (
        <Card
          key={order.id}
          sx={{
            mb: 2,
            cursor: 'pointer',
            '&:hover': { boxShadow: 4 },
          }}
          onClick={() => router.push(`/orders/${order.id}`)}
        >
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { sm: 'center' }, justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {order.Package?.name || 'Package'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Recipient: {order.recipientName} ({order.recipientPhone})
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Network: {order.network}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Amount: TZS {order.amount.toLocaleString()}
                </Typography>
              </Box>
              <Box sx={{ mt: { xs: 1, sm: 0 }, textAlign: { sm: 'right' } }}>
                <Chip
                  label={getStatusLabel(order.orderStatus)}
                  color={getStatusColor(order.orderStatus)}
                  size="small"
                  sx={{ mb: 1 }}
                />
                <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}