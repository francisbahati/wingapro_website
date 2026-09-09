'use client';

import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, CircularProgress, IconButton, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api/client';
import { AxiosError } from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  network: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await apiClient.get('/products');
        setProducts(res.data.products || []);
      } catch (err) {
        if (err instanceof AxiosError) setError(err.response?.data?.message || 'Failed to load products');
        else setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    try {
      await apiClient.delete(`/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      if (err instanceof AxiosError) alert(err.response?.data?.message || 'Failed to delete product');
      else alert('An unexpected error occurred');
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}><CircularProgress /></Box>;
  if (error) return <Box sx={{ p: 3 }}><Alert severity="error">{error}</Alert><Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>Retry</Button></Box>;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Products</Typography>
        <Button variant="contained" onClick={() => router.push('/products/new')} sx={{ bgcolor: '#0A2E5C' }}>Add Product</Button>
      </Box>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Network</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.network}</TableCell>
                    <TableCell>TZS {product.price.toLocaleString()}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => router.push(`/products/edit/${product.id}`)}><EditIcon /></IconButton>
                      <IconButton onClick={() => handleDelete(product.id)}><DeleteIcon /></IconButton>
                    </TableCell>
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