// app/(auth)/settings/page.tsx
'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { useAuth } from '@/hooks/useAuth';

export default function SettingsPage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to update profile' });
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/change-password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'Password changed successfully' });
        setCurrentPassword('');
        setNewPassword('');
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to change password' });
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Settings
      </Typography>
      {message && (
        <Alert severity={message.type} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      )}

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Profile
          </Typography>
          <form onSubmit={handleProfileUpdate}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" disabled={loading}>
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Change Password
          </Typography>
          <form onSubmit={handlePasswordUpdate}>
            <TextField
              fullWidth
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
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
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" disabled={loading}>
              Change Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}