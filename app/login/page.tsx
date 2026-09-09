'use client';

import { useState } from 'react';
import {
  Box, Card, CardContent, TextField, Button, Typography, Alert, CircularProgress, IconButton, InputAdornment,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { AxiosError } from 'axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
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
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0a1a2b, #1a3a5c)', p: 2 }}>
      <Card sx={{ maxWidth: 420, width: '100%', backdropFilter: 'blur(10px)', bgcolor: 'rgba(255,255,255,0.95)', borderRadius: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ mb: 1, textAlign: 'center', fontWeight: 800 }}>
            Welcome back to <span style={{ color: '#00b4d8' }}>WingaPro</span>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
            Sign in to continue
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username or Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              sx={{ mb: 2 }}
              slotProps={{ input: { style: { borderRadius: 8 } } }}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 3 }}
              slotProps={{
                input: {
                  style: { borderRadius: 8 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ py: 1.5, bgcolor: '#0A2E5C', '&:hover': { bgcolor: '#071e3d' } }}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <Link href="/register" style={{ color: '#00b4d8' }}>Register</Link>
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
            <Link href="/forgot-password" style={{ color: '#00b4d8' }}>Forgot Password?</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}