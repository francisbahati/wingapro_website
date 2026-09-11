'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Box, Typography, Button, Paper, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const packageName = searchParams.get('package') || 'Package';
  const purchaseId = searchParams.get('id') || '';

  return (
    <Paper
      sx={{
        p: 4,
        textAlign: 'center',
        maxWidth: 400,
        borderRadius: 3,
        bgcolor: 'var(--surface)',
        border: '1px solid var(--border)',
      }}
    >
      <CheckCircleIcon sx={{ fontSize: 80, color: 'var(--success)', mb: 2 }} />
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'var(--navy)' }}>
        🎉 Order Confirmed!
      </Typography>
      <Typography variant="body1" sx={{ mt: 2, color: 'var(--text)' }}>
        You have successfully purchased <strong>{packageName}</strong> from WingaPro.
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, color: 'var(--text-muted)' }}>
        Order ID: #{purchaseId}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, color: 'var(--text-muted)' }}>
        Thank you for using our service.
      </Typography>
      <Button variant="contained" sx={{ mt: 3 }} onClick={() => router.push('/dashboard')}>
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