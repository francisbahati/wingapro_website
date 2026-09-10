// app/not-found.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Box, Button, Container, Typography } from '@mui/material';
import { brand } from '@/theme-provider';

export default function NotFound() {
  const router = useRouter();

  return (
    <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
      <Typography
        sx={{
          fontSize: { xs: '6rem', md: '8rem' },
          fontWeight: 800,
          lineHeight: 1,
          background: `linear-gradient(135deg, ${brand.navy} 0%, ${brand.cyan} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        404
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>
        Page not found
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        The page you're looking for doesn't exist or has moved.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button
          onClick={() => router.push('/')}
          variant="contained"
          size="large"
        >
          Go Home
        </Button>
        <Button
          onClick={() => router.push('/dashboard')}
          variant="outlined"
          size="large"
        >
          Dashboard
        </Button>
      </Box>
    </Container>
  );
}