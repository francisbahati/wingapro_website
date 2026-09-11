// app/error.tsx
'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Box sx={{ bgcolor: 'var(--bg)', minHeight: '100vh' }}>
      <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
        <Box
          sx={{
            width: 88,
            height: 88,
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'var(--error-muted)',
            color: 'var(--error)',
            mb: 3,
          }}
        >
          <ReportProblemRoundedIcon sx={{ fontSize: 44 }} />
        </Box>
        <Typography variant="h4" fontWeight={700} sx={{ color: 'var(--navy)' }} gutterBottom>
          Something went wrong
        </Typography>
        <Typography sx={{ mb: 4, color: 'var(--text-muted)' }}>
          We hit an unexpected error. Try again, or head back to the dashboard.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button variant="contained" size="large" onClick={() => reset()}>
            Try Again
          </Button>
          <Button variant="outlined" size="large" href="/">
            Go Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
}