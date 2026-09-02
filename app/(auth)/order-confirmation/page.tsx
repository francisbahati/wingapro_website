'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Box, Typography, Button, Paper, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Component that uses useSearchParams – must be wrapped in Suspense
function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const packageName = searchParams.get('package') || 'Package';
  const purchaseId = searchParams.get('id') || '';

  return (
    <Paper sx={{ p: 4, textAlign: 'center', maxWidth: 400 }}>
      <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        🎉 Order Confirmed!
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        You have successfully purchased <strong>{packageName}</strong> from WingaPro.
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Order ID: #{purchaseId}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Thank you for using our service.
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 3, bgcolor: '#0A2E5C' }}
        onClick={() => router.push('/dashboard')}
      >
        Continue Shopping
      </Button>
    </Paper>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Suspense fallback={<CircularProgress />}>
        <OrderConfirmationContent />
      </Suspense>
    </Box>
  );
}