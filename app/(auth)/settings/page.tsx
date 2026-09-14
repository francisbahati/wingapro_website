// app/(auth)/settings/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import apiClient from '@/lib/api/client';
import { AxiosError } from 'axios';
import { useAuth } from '@/context/AuthContext';

function normalizePhone(value: string): string {
  let v = value.replace(/\s+/g, '').replace(/-/g, '');
  if (v.startsWith('+255')) v = '0' + v.slice(4);
  if (v.startsWith('255') && v.length === 12) v = '0' + v.slice(3);
  if (v.length === 9 && /^\d+$/.test(v)) v = '0' + v;
  return v;
}

const isValidPhone = (value: string) => /^0[67]\d{8}$/.test(normalizePhone(value));
const isValidPassword = (value: string) =>
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(value);

export default function SettingsPage() {
  const { user } = useAuth();

  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiClient.get('/users/profile');
        setUsername(res.data.user?.username ?? '');
        setPhone(res.data.user?.phone ?? '');
      } catch {
        /* silent */
      }
    })();
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!username.trim()) {
      setMessage({ type: 'error', text: 'Username is required' });
      return;
    }
    if (phone && !isValidPhone(phone)) {
      setMessage({ type: 'error', text: 'Enter a valid Tanzanian phone (e.g. 0712345678)' });
      return;
    }

    setProfileLoading(true);
    try {
      await apiClient.put('/users/profile', {
        username: username.trim(),
        phone: phone ? normalizePhone(phone) : null,
      });
      setMessage({ type: 'success', text: 'Profile updated successfully' });
    } catch (err) {
      if (err instanceof AxiosError) {
        setMessage({
          type: 'error',
          text: err.response?.data?.message || 'Failed to update profile',
        });
      } else {
        setMessage({ type: 'error', text: 'An unexpected error occurred' });
      }
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!oldPassword || !newPassword) {
      setMessage({ type: 'error', text: 'Both password fields are required' });
      return;
    }
    if (!isValidPassword(newPassword)) {
      setMessage({
        type: 'error',
        text: 'New password must be at least 8 characters with at least one letter and one number',
      });
      return;
    }

    setPasswordLoading(true);
    try {
      await apiClient.post('/users/change-password', {
        oldPassword,
        newPassword,
      });
      setMessage({ type: 'success', text: 'Password changed successfully' });
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      if (err instanceof AxiosError) {
        setMessage({
          type: 'error',
          text: err.response?.data?.message || 'Failed to change password',
        });
      } else {
        setMessage({ type: 'error', text: 'An unexpected error occurred' });
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 640, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3, color: 'var(--navy)', fontWeight: 700 }}>
        Settings
      </Typography>

      {message && (
        <Alert severity={message.type} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      )}

      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
          bgcolor: 'var(--surface)',
          border: '1px solid var(--border)',
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, color: 'var(--navy)' }}>
            Profile
          </Typography>
          <form onSubmit={handleProfileUpdate}>
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              fullWidth
              label="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 0712345678"
              helperText="Tanzanian mobile number"
              sx={{ mb: 2 }}
            />
            <Typography
              variant="caption"
              sx={{ display: 'block', mb: 2, color: 'var(--text-muted)' }}
            >
              Email: {user?.email} (cannot be changed)
            </Typography>
            <Button type="submit" variant="contained" disabled={profileLoading}>
              {profileLoading ? <CircularProgress size={24} color="inherit" /> : 'Update Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card
        sx={{ borderRadius: 3, bgcolor: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, color: 'var(--navy)' }}>
            Change Password
          </Typography>
          <form onSubmit={handlePasswordUpdate}>
            <TextField
              fullWidth
              label="Current Password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              helperText="At least 8 characters, with a letter and a number"
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" disabled={passwordLoading}>
              {passwordLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Change Password'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}