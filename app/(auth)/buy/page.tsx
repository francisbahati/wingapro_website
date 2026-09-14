// app/(auth)/buy/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';

/**
 * /buy is deprecated. The unified purchase flow lives at /packages.
 * This page exists only to redirect old links and bookmarks.
 */
export default function BuyRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/packages');
  }, [router]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>
        Redirecting to packages…
      </Typography>
    </Box>
  );
}