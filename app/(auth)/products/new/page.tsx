// app/(auth)/products/new/page.tsx
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

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    network: 'Halotel',
    price: '',
    stock: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const networks = ['Halotel', 'Tigo', 'Vodacom', 'Airtel'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await apiClient.post('/products', {
        name: form.name,
        network: form.network,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
      });
      router.push('/products');
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || 'Failed to create product');
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
        New Product
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
              label="Product Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              select
              fullWidth
              label="Network"
              name="network"
              value={form.network}
              onChange={handleChange}
              sx={{ mb: 2 }}
            >
              {networks.map((net) => (
                <MenuItem key={net} value={net}>
                  {net}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Price (TZS)"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Stock Quantity"
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
            />
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Product'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}