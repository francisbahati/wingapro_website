// app/(auth)/orders/page.tsx
'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Button,
} from '@mui/material';
import { useRouter } from 'next/navigation';

interface Order {
  id: number;
  packageName: string;
  phoneNumber: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'rejected';
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customer/orders`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setOrders(data.orders);
        else {
          setOrders([
            { id: 1, packageName: '1GB Daily', phoneNumber: '0712345678', amount: 500, status: 'completed', createdAt: '2025-01-17' },
            { id: 2, packageName: '5GB Monthly', phoneNumber: '0756123456', amount: 2500, status: 'pending', createdAt: '2025-01-16' },
            { id: 3, packageName: '500MB Weekly', phoneNumber: '0789012345', amount: 1000, status: 'processing', createdAt: '2025-01-15' },
          ]);
        }
      })
      .catch(() => {
        setOrders([
          { id: 1, packageName: '1GB Daily', phoneNumber: '0712345678', amount: 500, status: 'completed', createdAt: '2025-01-17' },
          { id: 2, packageName: '5GB Monthly', phoneNumber: '0756123456', amount: 2500, status: 'pending', createdAt: '2025-01-16' },
          { id: 3, packageName: '500MB Weekly', phoneNumber: '0789012345', amount: 1000, status: 'processing', createdAt: '2025-01-15' },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const statusColor = (status: Order['status']) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'processing': return 'info';
      case 'failed':
      case 'rejected': return 'error';
      default: return 'default';
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">My Orders</Typography>
        <Button variant="contained" onClick={() => router.push('/packages')}>
          Buy New
        </Button>
      </Box>
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Package</TableCell>
                  <TableCell>Recipient Phone</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.packageName}</TableCell>
                    <TableCell>{order.phoneNumber}</TableCell>
                    <TableCell>TZS {order.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip label={order.status} color={statusColor(order.status)} size="small" />
                    </TableCell>
                    <TableCell>{order.createdAt}</TableCell>
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