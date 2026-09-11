// app/(auth)/reports/page.tsx
'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import apiClient from '@/lib/api/client';

// Lazy-load Recharts (heavy) client-side only
const ReportsCharts = dynamic(() => import('./_charts'), {
  ssr: false,
  loading: () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
      <CircularProgress />
    </Box>
  ),
});

export default function ReportsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await apiClient.get('/admin/dashboard/stats');
        setData(res.data.stats);
      } catch (e: any) {
        setError(e?.response?.data?.message || 'Failed to load reports');
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

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!data) return null;

  const kpis = [
    { label: 'Total Users', value: data.totalUsers?.toLocaleString() ?? '0', color: '#0A2E5C' },
    { label: 'Total Orders', value: data.totalOrders?.toLocaleString() ?? '0', color: '#10B981' },
    {
      label: 'Total Revenue',
      value: `TZS ${Number(data.totalRevenue ?? 0).toLocaleString()}`,
      color: '#F59E0B',
    },
    {
      label: 'Pending Orders',
      value: data.pendingOrders?.toLocaleString() ?? '0',
      color: '#8B5CF6',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        Reports
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {kpis.map((k) => (
          <Grid item xs={12} sm={6} md={3} key={k.label}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {k.label}
                </Typography>
                <Typography variant="h5" fontWeight={800} sx={{ color: k.color }}>
                  {k.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <ReportsCharts data={data} />
    </Box>
  );
}