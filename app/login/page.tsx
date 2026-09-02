// app/login/page.tsx
'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { AxiosError } from 'axios';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || 'Invalid credentials');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 420, width: '100%' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
            Winga<span style={{ color: '#00b4d8' }}>Pro</span>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
            Sign in to your account
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ py: 1.5 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <Link href="/register" style={{ color: '#00b4d8' }}>
              Register
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}