// app/(auth)/orders/new/page.tsx
'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  MenuItem,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import apiClient from '@/lib/api/client';

export default function NewOrderPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    packageId: '',
    amount: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock package list (replace with real fetch)
  const packages = [
    { id: '1', name: '1GB Daily' },
    { id: '2', name: '5GB Monthly' },
    { id: '3', name: '500MB Weekly' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await apiClient.post('/orders', {
        customerName: form.customerName,
        phone: form.phone,
        packageId: form.packageId,
        amount: parseFloat(form.amount),
      });
      router.push('/orders');
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || 'Failed to create order');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        New Order
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Customer Name"
              name="customerName"
              value={form.customerName}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              select
              fullWidth
              label="Package"
              name="packageId"
              value={form.packageId}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            >
              {packages.map((pkg) => (
                <MenuItem key={pkg.id} value={pkg.id}>
                  {pkg.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Amount (TZS)"
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
            />
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Order'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}