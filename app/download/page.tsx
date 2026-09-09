// app/download/page.tsx
'use client';

import { Box, Container, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import { AndroidRounded, ComputerRounded, SecurityRounded, BoltRounded } from '@mui/icons-material';

export default function DownloadPage() {
  return (
    <Box sx={{ bgcolor: '#0a1a2b', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" sx={{ color: '#fff', fontWeight: 800, mb: 2 }}>
          Get the <span style={{ color: '#00b4d8' }}>WingaPro</span> App
        </Typography>
        <Typography variant="h6" align="center" sx={{ color: '#aaa', mb: 6 }}>
          Fast, secure and easy – available on Android and Windows.
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, mb: 6 }}>
          {/* Android Card */}
          <Card sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: '#fff', p: 4, textAlign: 'center', borderRadius: 3, '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 }, transition: '0.3s' }}>
            <AndroidRounded sx={{ fontSize: 80, color: '#00b4d8', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Android APK</Typography>
            <Typography variant="body2" sx={{ mb: 3, color: '#ccc' }}>
              Download the APK for your Android device. Works on Android 8+.
            </Typography>
            <Button
              variant="contained"
              href="/apk/Wingapro v1.1.apk"
              download
              size="large"
              sx={{ bgcolor: '#00b4d8', '&:hover': { bgcolor: '#0093b0' }, px: 4, py: 1.5 }}
            >
              Download APK
            </Button>
          </Card>

          {/* Windows Card */}
          <Card sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: '#fff', p: 4, textAlign: 'center', borderRadius: 3, '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 }, transition: '0.3s' }}>
            <ComputerRounded sx={{ fontSize: 80, color: '#00b4d8', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Windows App</Typography>
            <Typography variant="body2" sx={{ mb: 3, color: '#ccc' }}>
              Install the desktop app for Windows 10/11.
            </Typography>
            <Button
              variant="contained"
              href="/windows/WingaProSetup.exe"
              download
              size="large"
              sx={{ bgcolor: '#00b4d8', '&:hover': { bgcolor: '#0093b0' }, px: 4, py: 1.5 }}
            >
              Download for Windows
            </Button>
          </Card>
        </Box>

        {/* Trust badges */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 4, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#aaa' }}>
            <SecurityRounded sx={{ color: '#00b4d8' }} />
            <Typography variant="body2">Secure Download</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#aaa' }}>
            <BoltRounded sx={{ color: '#00b4d8' }} />
            <Typography variant="body2">Fast Installation</Typography>
          </Box>
        </Box>

        <Typography variant="body2" align="center" sx={{ color: '#aaa' }}>
          Your data is protected. All downloads are secure and verified.
        </Typography>
      </Container>
    </Box>
  );
}