'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import apiClient from '@/lib/api/client';
import { AxiosError } from 'axios';

const PRIMARY = '#0A2E5C';

interface PackageData {
  id: number;
  name: string;
  dataSize: string;
  validity: string;
  price: number;
}

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const packageId = searchParams.get('packageId');
  const network = searchParams.get('network') || '';
  const recipientName = searchParams.get('recipientName') || '';
  const recipientPhone = searchParams.get('recipientPhone') || '';
  const [packageData, setPackageData] = useState<PackageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchPackage = async () => {
      if (!packageId) {
        setError('Package not specified');
        setLoading(false);
        return;
      }
      try {
        const res = await apiClient.get(`/packages/${packageId}`);
        setPackageData(res.data.package);
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err.response?.data?.message || 'Failed to load package');
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [packageId]);

  const handlePay = async () => {
    setProcessing(true);
    try {
      await apiClient.post('/purchase', {
        packageId: Number(packageId),
        recipientName,
        recipientPhone,
        network,
      });
      router.push(`/order-confirmation?id=${packageId}`);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || 'Payment failed');
      } else {
        setError('An unexpected error occurred');
      }
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
        <Button variant="contained" onClick={() => router.back()} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }

  if (!packageData) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">Package not found</Alert>
        <Button variant="contained" onClick={() => router.push('/packages')} sx={{ mt: 2 }}>
          Browse Packages
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Confirm Payment
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {packageData.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Network: {network}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Data: {packageData.dataSize}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Validity: {packageData.validity}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" sx={{ color: PRIMARY }}>
            TZS {packageData.price.toLocaleString()}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
            Recipient Details
          </Typography>
          <Typography variant="body2">Name: {recipientName}</Typography>
          <Typography variant="body2">Phone: {recipientPhone}</Typography>
        </CardContent>
      </Card>

      <Box sx={{ bgcolor: '#e3f2fd', p: 2, borderRadius: 2, mb: 3 }}>
        <Typography variant="body2">
          Payment method: <strong>Wallet Balance</strong>
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Button
        variant="contained"
        fullWidth
        disabled={processing}
        onClick={handlePay}
        sx={{ bgcolor: PRIMARY, py: 1.5 }}
      >
        {processing ? <CircularProgress size={24} color="inherit" /> : 'Pay Now'}
      </Button>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
        Your wallet will be debited TZS {packageData.price.toLocaleString()}
      </Typography>
    </Box>
  );
}