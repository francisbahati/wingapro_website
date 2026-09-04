'use client';

import { useState, useEffect } from 'react';
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
import { useRouter, useParams } from 'next/navigation';
import { AxiosError } from 'axios';
import apiClient from '@/lib/api/client';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [form, setForm] = useState({
    name: '',
    network: 'Halotel',
    price: '',
    stock: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const networks = ['Halotel', 'Tigo', 'Vodacom', 'Airtel'];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await apiClient.get(`/products/${id}`);
        const product = res.data.product;
        setForm({
          name: product.name,
          network: product.network,
          price: product.price.toString(),
          stock: product.stock.toString(),
        });
      } catch (err) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await apiClient.put(`/products/${id}`, {
        name: form.name,
        network: form.network,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
      });
      router.push('/products');
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || 'Failed to update product');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setSaving(false);
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
      <Typography variant="h4" sx={{ mb: 3 }}>
        Edit Product
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
            <Button type="submit" variant="contained" disabled={saving}>
              {saving ? <CircularProgress size={24} color="inherit" /> : 'Update Product'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}