// app/(auth)/notifications/page.tsx
'use client';

import { useEffect, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import apiClient from '@/lib/api/client';
import { brand } from '@/theme-provider';

interface Notification {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const res = await apiClient.get('/notifications');
      setItems(res.data.notifications ?? []);
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id: number) => {
    try {
      await apiClient.put(`/notifications/${id}/read`);
      setItems((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    } catch { /* silent */ }
  };

  const remove = async (id: number) => {
    if (!confirm('Delete this notification?')) return;
    try {
      await apiClient.delete(`/notifications/${id}`);
      setItems((prev) => prev.filter((n) => n.id !== id));
    } catch { /* silent */ }
  };

  const markAll = async () => {
    try {
      await apiClient.post('/notifications/mark-all-read');
      setItems((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch { /* silent */ }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  const unread = items.filter((n) => !n.isRead).length;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Notifications</Typography>
        {unread > 0 && (
          <Button onClick={markAll} variant="outlined" size="small">
            Mark all read
          </Button>
        )}
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {items.length === 0 ? (
        <Card sx={{ p: 6, textAlign: 'center' }}>
          <NotificationsIcon sx={{ fontSize: 56, color: 'text.secondary', mb: 2 }} />
          <Typography color="text.secondary">No notifications yet.</Typography>
        </Card>
      ) : (
        <Stack spacing={1.5}>
          {items.map((n) => (
            <Card
              key={n.id}
              sx={{
                borderLeft: `4px solid ${n.isRead ? '#E2E8F0' : brand.navy}`,
                bgcolor: n.isRead ? 'background.paper' : 'rgba(10,46,92,0.03)',
              }}
            >
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Avatar sx={{ bgcolor: brand.navy }}>
                    <NotificationsIcon fontSize="small" />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography fontWeight={600}>{n.title}</Typography>
                      {!n.isRead && <Chip label="New" size="small" color="primary" />}
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {n.message}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(n.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                  <Stack>
                    {!n.isRead && (
                      <IconButton onClick={() => markRead(n.id)} size="small" color="primary">
                        <CheckCircleIcon fontSize="small" />
                      </IconButton>
                    )}
                    <IconButton onClick={() => remove(n.id)} size="small" color="error">
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
}