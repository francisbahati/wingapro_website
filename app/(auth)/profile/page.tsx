'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Typography,
  Avatar,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
  Alert,
  Skeleton,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import apiClient from '@/lib/api/client';
import { AxiosError } from 'axios';
import LockIcon from '@mui/icons-material/Lock';
import ShareIcon from '@mui/icons-material/Share';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const PRIMARY = '#0A2E5C';

interface Profile {
  username: string;
  email: string;
  phone: string;
  referral_code: string;
  Branch?: { name: string };
}

export default function ProfilePage() {
  const { logout } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiClient.get('/users/profile');
        setProfile(res.data.user);
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err.response?.data?.message || 'Failed to load profile');
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      alert('New password must be at least 6 characters');
      return;
    }
    setChangingPassword(true);
    try {
      await apiClient.post('/users/change-password', {
        oldPassword,
        newPassword,
      });
      alert('Password changed successfully!');
      setPasswordDialog(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      if (err instanceof AxiosError) {
        alert(err.response?.data?.message || 'Failed to change password');
      } else {
        alert('An unexpected error occurred');
      }
    } finally {
      setChangingPassword(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    router.push('/login');
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Skeleton variant="circular" width={80} height={80} sx={{ mx: 'auto', mb: 2 }} />
        <Skeleton variant="text" width="60%" sx={{ mx: 'auto' }} />
        <Skeleton variant="text" width="40%" sx={{ mx: 'auto' }} />
        <Skeleton variant="rectangular" height={60} sx={{ mt: 3 }} />
        <Skeleton variant="rectangular" height={60} sx={{ mt: 2 }} />
        <Skeleton variant="rectangular" height={60} sx={{ mt: 2 }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
        <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Box>
    );
  }

  const username = profile?.username || 'User';
  const email = profile?.email || '';
  const phone = profile?.phone || '';
  const referralCode = profile?.referral_code || 'N/A';
  const branch = profile?.Branch?.name || '';

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        My Profile
      </Typography>

      {/* Profile Header */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
        <Avatar sx={{ width: 80, height: 80, bgcolor: PRIMARY, fontSize: 32 }}>
          {username.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>
          {username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {phone}
        </Typography>
        {branch && <Typography variant="body2" color="text.secondary">Branch: {branch}</Typography>}
        <Typography variant="body2" color="text.secondary">Role: Customer</Typography>
      </Box>

      {/* Options */}
      <Card sx={{ mb: 2 }}>
        <List>
          <ListItemButton onClick={() => setPasswordDialog(true)}>
            <ListItemIcon><LockIcon sx={{ color: PRIMARY }} /></ListItemIcon>
            <ListItemText primary="Change Password" />
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={() => alert(`Referral code: ${referralCode}`)}>
            <ListItemIcon><ShareIcon sx={{ color: PRIMARY }} /></ListItemIcon>
            <ListItemText primary="Referral Code" secondary={referralCode} />
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={() => router.push('/settings')}>
            <ListItemIcon><SettingsIcon sx={{ color: PRIMARY }} /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={handleLogout} disabled={loggingOut}>
            <ListItemIcon><LogoutIcon color="error" /></ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: 'error.main' }} />
            {loggingOut && <CircularProgress size={20} />}
          </ListItemButton>
        </List>
      </Card>

      {/* Change Password Dialog */}
      <Dialog open={passwordDialog} onClose={() => !changingPassword && setPasswordDialog(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            label="Current Password"
            type={showOld ? 'text' : 'password'}
            fullWidth
            margin="dense"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowOld(!showOld)}>
                      {showOld ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            label="New Password"
            type={showNew ? 'text' : 'password'}
            fullWidth
            margin="dense"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            helperText="Minimum 6 characters"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowNew(!showNew)}>
                      {showNew ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            label="Confirm New Password"
            type={showConfirm ? 'text' : 'password'}
            fullWidth
            margin="dense"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirm(!showConfirm)}>
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordDialog(false)} disabled={changingPassword}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleChangePassword}
            disabled={changingPassword}
            sx={{ bgcolor: PRIMARY }}
          >
            {changingPassword ? <CircularProgress size={24} color="inherit" /> : 'Update Password'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}