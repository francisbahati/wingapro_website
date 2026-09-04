// app/(auth)/products/page.tsx
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
  Button,
  CircularProgress,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  useEffect(() => {
    // Fetch products from API
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProducts(data.products);
        else {
          setProducts([
            { id: 1, name: '1GB Daily', price: 500, stock: 100, network: 'Halotel' },
            { id: 2, name: '5GB Monthly', price: 2500, stock: 50, network: 'Tigo' },
            { id: 3, name: 'Pocket MiFi', price: 12000, stock: 20, network: 'Vodacom' },
          ]);
        }
      })
      .catch(() => {
        setProducts([
          { id: 1, name: '1GB Daily', price: 500, stock: 100, network: 'Halotel' },
          { id: 2, name: '5GB Monthly', price: 2500, stock: 50, network: 'Tigo' },
          { id: 3, name: 'Pocket MiFi', price: 12000, stock: 20, network: 'Vodacom' },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure?')) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, { method: 'DELETE' });
        setProducts(products.filter((p) => p.id !== id));
      } catch (error) {
        console.error(error);
      }
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
        <Typography variant="h4">Products</Typography>
        <Button variant="contained" onClick={() => router.push('/products/new')}>
          Add Product
        </Button>
      </Box>
      <Card>
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
                      <IconButton onClick={() => router.push(`/products/edit/${product.id}`)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(product.id)}>
                        <DeleteIcon />
                      </IconButton>
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