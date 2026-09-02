'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface SalesSummary {
  totalRevenue: number;
  totalOrders: number;
  totalPackagesSold: number;
  avgOrderValue: number;
}

interface NetworkSales {
  network: string;
  revenue: number;
}

export default function ReportsPage() {
  const [summary, setSummary] = useState<SalesSummary | null>(null);
  const [networkSales, setNetworkSales] = useState<NetworkSales[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading (in production, fetch from API)
    setTimeout(() => {
      setSummary({
        totalRevenue: 12500000,
        totalOrders: 342,
        totalPackagesSold: 512,
        avgOrderValue: 36550,
      });
      setNetworkSales([
        { network: 'Halotel', revenue: 4500000 },
        { network: 'Tigo', revenue: 3800000 },
        { network: 'Vodacom', revenue: 2900000 },
        { network: 'Airtel', revenue: 1300000 },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Reports
      </Typography>

      {/* Summary Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
          gap: 3,
          mb: 4,
        }}
      >
        <Card sx={{ borderLeft: 4, borderColor: 'primary.main' }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">Total Revenue</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              TZS {summary?.totalRevenue.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ borderLeft: 4, borderColor: 'success.main' }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">Total Orders</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {summary?.totalOrders}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ borderLeft: 4, borderColor: 'warning.main' }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">Packages Sold</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {summary?.totalPackagesSold}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ borderLeft: 4, borderColor: 'secondary.main' }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">Avg Order Value</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              TZS {summary?.avgOrderValue.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Charts */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Revenue by Network</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={networkSales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="network" />
                <YAxis tickFormatter={(value) => `TZS ${(value / 1000)}k`} />
                <Tooltip formatter={(value) => `TZS ${Number(value).toLocaleString()}`} />
                <Legend />
                <Bar dataKey="revenue" fill="#0a2e5c" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Share by Network</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={networkSales}
                  dataKey="revenue"
                  nameKey="network"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  // The label function receives PieLabelRenderProps which includes 'name'
                  label={({ name }) => name}
                >
                  {networkSales.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `TZS ${Number(value).toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}