// app/account-deleted/page.tsx
'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

export default function AccountDeletedPage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'var(--bg)',
        p: 2,
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Box
          sx={{
            width: 110, height: 110, borderRadius: '50%',
            bgcolor: 'var(--success)', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            mx: 'auto', mb: 3,
            boxShadow: '0 20px 40px rgba(16,185,129,0.35)',
          }}
        >
          <CheckRoundedIcon sx={{ fontSize: 60 }} />
        </Box>
        <Typography
          sx={{
            fontSize: { xs: '1.75rem', md: '2.2rem' },
            fontWeight: 800, color: 'var(--navy)',
            letterSpacing: '-0.02em', mb: 1.5,
          }}
        >
          Account Deleted
        </Typography>
        <Typography
          sx={{
            color: 'var(--text-muted)', fontSize: '1rem',
            lineHeight: 1.65, maxWidth: 480, mx: 'auto', mb: 4,
          }}
        >
          Your WingaPro account has been permanently deleted. You have been logged
          out on all devices. Thank you for using WingaPro.
        </Typography>
        <Button
          variant="contained" size="large"
          onClick={() => router.push('/')}
          sx={{ px: 4, py: 1.5, fontWeight: 700 }}
        >
          Return to Home
        </Button>
      </Container>
    </Box>
  );
}
