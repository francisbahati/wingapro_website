// app/not-found.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Box, Button, Container, Typography } from '@mui/material';

export default function NotFound() {
  const router = useRouter();

  return (
    <Box sx={{ bgcolor: 'var(--bg)', minHeight: '100vh' }}>
      <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
        <Typography
          sx={{
            fontSize: { xs: '6rem', md: '8rem' },
            fontWeight: 800,
            lineHeight: 1,
            background: `linear-gradient(135deg, var(--navy) 0%, var(--cyan) 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          404
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--navy)' }} gutterBottom>
          Page not found
        </Typography>
        <Typography sx={{ mb: 4, color: 'var(--text-muted)' }}>
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button onClick={() => router.push('/')} variant="contained" size="large">
            Go Home
          </Button>
          <Button onClick={() => router.push('/dashboard')} variant="outlined" size="large">
            Dashboard
          </Button>
        </Box>
      </Container>
    </Box>
  );
}