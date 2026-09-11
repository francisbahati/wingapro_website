'use client';

import { Box, Button, Typography } from '@mui/material';

export default function AuthError({ reset }: { reset: () => void }) {
  return (
    <Box sx={{ p: 6, textAlign: 'center' }}>
      <Typography variant="h5" fontWeight={700} gutterBottom sx={{ color: 'var(--navy)' }}>
        Could not load this page
      </Typography>
      <Typography sx={{ mb: 3, color: 'var(--text-muted)' }}>
        Try refreshing. If this persists, contact support.
      </Typography>
      <Button variant="contained" onClick={reset}>
        Retry
      </Button>
    </Box>
  );
}