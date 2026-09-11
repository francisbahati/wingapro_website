'use client';

import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import apiClient from '@/lib/api/client';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  is_active: boolean;
}

const ROLE_COLORS: Record<string, string> = {
  admin:     '#EF4444',
  seller:    '#0A2E5C',
  finance:   '#F59E0B',
  technical: '#3B82F6',
  customer:  '#10B981',
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await apiClient.get('/admin/users');
        setUsers(res.data.users ?? []);
      } catch (e: any) {
        setError(e?.response?.data?.message || 'Failed to load users');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3, color: 'var(--navy)' }}>
        Users
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Card sx={{ bgcolor: 'var(--surface)', border: '1px solid var(--border)' }}>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id} hover>
                    <TableCell>{u.id}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{u.username}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={u.role}
                        size="small"
                        sx={{
                          bgcolor: ROLE_COLORS[u.role] ?? '#64748B',
                          color: '#fff',
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={u.is_active ? 'Active' : 'Inactive'}
                        size="small"
                        color={u.is_active ? 'success' : 'default'}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {users.length === 0 && !error && (
            <Typography sx={{ p: 4, textAlign: 'center', color: 'var(--text-muted)' }}>
              No users to display.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}