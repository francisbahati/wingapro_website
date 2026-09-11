'use client';

import { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import apiClient from '@/lib/api/client';
import { AxiosError } from 'axios';

export default function SettingsPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await apiClient.put('/users/profile', { name, email });
      if (res.data.success) setMessage({ type: 'success', text: 'Profile updated successfully' });
      else setMessage({ type: 'error', text: res.data.message || 'Failed to update profile' });
    } catch (err) {
      if (err instanceof AxiosError) setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile' });
      else setMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await apiClient.put('/users/change-password', { currentPassword, newPassword });
      if (res.data.success) {
        setMessage({ type: 'success', text: 'Password changed successfully' });
        setCurrentPassword('');
        setNewPassword('');
      } else setMessage({ type: 'error', text: res.data.message || 'Failed to change password' });
    } catch (err) {
      if (err instanceof AxiosError) setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to change password' });
      else setMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, color: 'var(--navy)', fontWeight: 700 }}>
        Settings
      </Typography>
      {message && (
        <Alert severity={message.type} sx={{ mb: 2 }}>{message.text}</Alert>
      )}

      <Card sx={{ mb: 4, borderRadius: 3, bgcolor: 'var(--surface)', border: '1px solid var(--border)' }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, color: 'var(--navy)' }}>Profile</Typography>
          <form onSubmit={handleProfileUpdate}>
            <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} />
            <TextField fullWidth label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 3, bgcolor: 'var(--surface)', border: '1px solid var(--border)' }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, color: 'var(--navy)' }}>Change Password</Typography>
          <form onSubmit={handlePasswordUpdate}>
            <TextField fullWidth label="Current Password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required sx={{ mb: 2 }} />
            <TextField fullWidth label="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required sx={{ mb: 2 }} />
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Change Password'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}