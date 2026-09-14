// app/error.tsx
'use client';

import { useEffect } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to the console; in production, send to your error tracker here.
    // eslint-disable-next-line no-console
    console.error('[GlobalError]', error);
  }, [error]);

  return (
    <Box sx={{ bgcolor: 'var(--bg)', minHeight: '100vh' }}>
      <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
        <Typography
          sx={{
            fontSize: { xs: '4rem', md: '6rem' },
            fontWeight: 800,
            lineHeight: 1,
            background: 'linear-gradient(135deg, var(--navy) 0%, var(--cyan) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Oops
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--navy)', mt: 2 }} gutterBottom>
          Something went wrong
        </Typography>
        <Typography sx={{ mb: 4, color: 'var(--text-muted)' }}>
          Please try again. If the problem persists, contact support.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button onClick={reset} variant="contained" size="large">
            Try Again
          </Button>
          <Button
            onClick={() => {
              if (typeof window !== 'undefined') window.location.href = '/';
            }}
            variant="outlined"
            size="large"
          >
            Go Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
}