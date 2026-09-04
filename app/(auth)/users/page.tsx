// app/(auth)/users/page.tsx
'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
} from '@mui/material';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch users from API
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUsers(data.users);
        else {
          setUsers([
            { id: 1, username: 'admin', email: 'admin@wingapro.com', role: 'admin', isActive: true },
            { id: 2, username: 'seller1', email: 'seller1@wingapro.com', role: 'seller', isActive: true },
            { id: 3, username: 'finance1', email: 'finance@wingapro.com', role: 'finance', isActive: false },
          ]);
        }
      })
      .catch(() => {
        setUsers([
          { id: 1, username: 'admin', email: 'admin@wingapro.com', role: 'admin', isActive: true },
          { id: 2, username: 'seller1', email: 'seller1@wingapro.com', role: 'seller', isActive: true },
          { id: 3, username: 'finance1', email: 'finance@wingapro.com', role: 'finance', isActive: false },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const roleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'error';
      case 'seller': return 'primary';
      case 'finance': return 'warning';
      case 'technical': return 'info';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Users
      </Typography>
      <Card>
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
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip label={user.role} color={roleColor(user.role)} size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.isActive ? 'Active' : 'Inactive'}
                        color={user.isActive ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}