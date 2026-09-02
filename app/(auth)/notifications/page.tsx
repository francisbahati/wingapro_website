'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItemAvatar,
  Avatar,
  IconButton,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Skeleton,
} from '@mui/material';
import apiClient from '@/lib/api/client';
import { AxiosError } from 'axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';

const PRIMARY = '#0A2E5C';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [marking, setMarking] = useState<number | null>(null);

  // Effect data fetch – we define the function inside the effect to avoid the lint warning.
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await apiClient.get('/notifications');
        setNotifications(res.data.notifications || []);
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err.response?.data?.message || 'Failed to load notifications');
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const markAsRead = async (id: number) => {
    setMarking(id);
    try {
      await apiClient.put(`/notifications/${id}/read`);
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
    } catch (err) {
      if (err instanceof AxiosError) {
        alert(err.response?.data?.message || 'Failed to mark as read');
      } else {
        alert('An unexpected error occurred');
      }
    } finally {
      setMarking(null);
    }
  };

  const deleteNotification = async (id: number) => {
    if (!confirm('Delete this notification?')) return;
    try {
      await apiClient.delete(`/notifications/${id}`);
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (err) {
      if (err instanceof AxiosError) {
        alert(err.response?.data?.message || 'Failed to delete');
      } else {
        alert('An unexpected error occurred');
      }
    }
  };

  const markAllRead = async () => {
    try {
      await apiClient.post('/notifications/mark-all-read');
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (err) {
      if (err instanceof AxiosError) {
        alert(err.response?.data?.message || 'Failed to mark all as read');
      } else {
        alert('An unexpected error occurred');
      }
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        {[1, 2, 3].map(i => (
          <Card key={i} sx={{ mb: 2 }}>
            <CardContent>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </CardContent>
          </Card>
        ))}
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

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Notifications
        </Typography>
        {unreadCount > 0 && (
          <Button variant="outlined" onClick={markAllRead} size="small" sx={{ borderColor: PRIMARY, color: PRIMARY }}>
            Mark all as read
          </Button>
        )}
      </Box>

      {notifications.length === 0 ? (
        <Typography color="text.secondary" align="center" sx={{ mt: 4 }}>
          No notifications yet.
        </Typography>
      ) : (
        <List>
          {notifications.map((n) => (
            <Card
              key={n.id}
              sx={{
                mb: 2,
                opacity: n.read ? 0.8 : 1,
                bgcolor: n.read ? 'inherit' : '#f0f7ff',
                borderLeft: `4px solid ${n.read ? '#e0e0e0' : PRIMARY}`,
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Avatar sx={{ bgcolor: PRIMARY }}>
                      <NotificationsIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {n.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {n.message}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(n.createdAt).toLocaleString()}
                    </Typography>
                    {!n.read && <Chip label="New" size="small" color="primary" sx={{ ml: 1 }} />}
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {!n.read && (
                      <IconButton
                        size="small"
                        onClick={() => markAsRead(n.id)}
                        disabled={marking === n.id}
                        sx={{ color: PRIMARY }}
                      >
                        {marking === n.id ? <CircularProgress size={20} /> : <CheckCircleIcon />}
                      </IconButton>
                    )}
                    <IconButton size="small" onClick={() => deleteNotification(n.id)}>
                      <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </List>
      )}
    </Box>
  );
}