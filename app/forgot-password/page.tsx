// app/forgot-password/page.tsx
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
import { AxiosError } from 'axios';
import apiClient from '@/lib/api/client';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await apiClient.post('/auth/forgot-password', { email });
      setSent(true);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || 'Failed to send OTP');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'var(--bg)',
          p: 2,
        }}
      >
        <Card
          sx={{
            maxWidth: 420,
            width: '100%',
            bgcolor: 'var(--surface)',
            border: '1px solid var(--border)',
          }}
        >
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ mb: 2, color: 'var(--navy)', fontWeight: 700 }}>
              Check Your Email
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: 'var(--text-muted)' }}>
              We&apos;ve sent a password reset OTP to <strong>{email}</strong>. Please enter it
              on the reset page.
            </Typography>
            <Button
              variant="contained"
              onClick={() => router.push('/reset-password')}
            >
              Go to Reset Password
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'var(--bg)',
        p: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 420,
          width: '100%',
          bgcolor: 'var(--surface)',
          border: '1px solid var(--border)',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold', color: 'var(--navy)' }}
          >
            Forgot Password
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Send OTP'}
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', color: 'var(--text-muted)' }}>
            Remember your password?{' '}
            <Link
              href="/login"
              style={{ color: 'var(--cyan)', fontWeight: 600, textDecoration: 'none' }}
            >
              Login
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}