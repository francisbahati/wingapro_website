'use client';

import { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, Alert, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import apiClient from '@/lib/api/client';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await apiClient.post('/auth/register', {
        username: form.username,
        email: form.email,
        phone: form.phone || undefined,
        password: form.password,
      });
      router.push('/login?registered=true');
    } catch (err) {
      if (err instanceof AxiosError) setError(err.response?.data?.message || 'Registration failed');
      else setError('An unexpected error occurred');
    } finally { setLoading(false); }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0a1a2b, #1a3a5c)', p: 2 }}>
      <Card sx={{ maxWidth: 420, width: '100%', bgcolor: 'rgba(255,255,255,0.95)', borderRadius: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ mb: 1, textAlign: 'center', fontWeight: 800 }}>Create Account</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>Join WingaPro today</Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Phone (optional)"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              sx={{ mb: 2 }}
              placeholder="0712345678"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
              slotProps={{
                input: {
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
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={form.confirmPassword}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
            />
            <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ py: 1.5, bgcolor: '#0A2E5C', '&:hover': { bgcolor: '#071e3d' } }}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            Already have an account? <Link href="/login" style={{ color: '#00b4d8' }}>Login</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}