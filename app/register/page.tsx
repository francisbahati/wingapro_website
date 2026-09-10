// app/register/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import apiClient from '@/lib/api/client';
import { brand } from '@/theme-provider';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const change = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters');
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
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Registration failed');
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
        p: 2,
        background: `linear-gradient(135deg, ${brand.navy} 0%, ${brand.navyLight} 60%, ${brand.cyan} 140%)`,
      }}
    >
      <Card sx={{ maxWidth: 480, width: '100%', borderRadius: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box
              sx={{
                width: 56, height: 56, mx: 'auto', mb: 2, borderRadius: 3,
                background: `linear-gradient(135deg, ${brand.navy}, ${brand.cyan})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <PersonAddRoundedIcon sx={{ color: '#fff', fontSize: 28 }} />
            </Box>
            <Typography variant="h5" fontWeight={800} gutterBottom>
              Create your account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Join WingaPro today
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={submit}>
            <TextField fullWidth label="Username" name="username" value={form.username} onChange={change} required sx={{ mb: 2 }} />
            <TextField fullWidth label="Email" name="email" type="email" value={form.email} onChange={change} required sx={{ mb: 2 }} />
            <TextField fullWidth label="Phone (optional)" name="phone" value={form.phone} onChange={change} placeholder="0712345678" sx={{ mb: 2 }} />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={change}
              required
              helperText="At least 8 characters, with a letter and number"
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField fullWidth label="Confirm Password" name="confirmPassword" type={showPassword ? 'text' : 'password'} value={form.confirmPassword} onChange={change} required sx={{ mb: 3 }} />
            <Button type="submit" fullWidth variant="contained" size="large" disabled={loading}>
              {loading ? <CircularProgress size={22} color="inherit" /> : 'Create Account'}
            </Button>
          </form>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" textAlign="center">
            Already have an account?{' '}
            <Link href="/login" style={{ color: brand.cyan, fontWeight: 600 }}>
              Sign in
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}