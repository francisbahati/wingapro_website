'use client';

import { Card, CardContent, Grid, Typography } from '@mui/material';
import {
  Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';

const COLORS = ['#0A2E5C', '#00B4D8', '#FFB703', '#10B981', '#8B5CF6'];

export default function ReportsCharts({ data }: { data: any }) {
  const revenueByNetwork = data.revenueByNetwork ?? [];
  const statusBreakdown = data.orderStatusBreakdown ?? [];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={7}>
        <Card sx={{ bgcolor: 'var(--surface)', border: '1px solid var(--border)' }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: 'var(--navy)' }}>
              Revenue by Network
            </Typography>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={revenueByNetwork}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="network" />
                <YAxis tickFormatter={(v) => `TZS ${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => `TZS ${Number(v).toLocaleString()}`} />
                <Bar dataKey="revenue" fill="#0A2E5C" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={5}>
        <Card sx={{ bgcolor: 'var(--surface)', border: '1px solid var(--border)' }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: 'var(--navy)' }}>
              Order Status Split
            </Typography>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={statusBreakdown}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(e: any) => e.status}
                >
                  {statusBreakdown.map((_: any, i: number) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}