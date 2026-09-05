// app/download/page.tsx
'use client';

import { Box, Container, Typography, Card, CardContent, Button } from '@mui/material';
import { AndroidRounded, ComputerRounded } from '@mui/icons-material';

export default function DownloadPage() {
  return (
    <Box sx={{ bgcolor: '#0a1a2b', minHeight: '100vh', display: 'flex', alignItems: 'center', py: 8 }}>
      <Container maxWidth="md">
        <Typography variant="h3" align="center" sx={{ color: '#fff', fontWeight: 800, mb: 2 }}>
          Get the WingaPro App
        </Typography>
        <Typography variant="h6" align="center" sx={{ color: '#aaa', mb: 6 }}>
          Fast, secure and easy – available on Android and Windows.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, justifyContent: 'center' }}>
          <Card sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: '#fff', textAlign: 'center', p: 3, border: '1px solid rgba(255,255,255,0.2)', flex: 1 }}>
            <AndroidRounded sx={{ fontSize: 80, color: '#00b4d8' }} />
            <Typography variant="h5" sx={{ my: 2 }}>Android APK</Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Download the APK for your Android device. Works on Android 8+.
            </Typography>
            <Button
              variant="contained"
              href="/apk/wingapro.apk"
              download
              sx={{ bgcolor: '#00b4d8', '&:hover': { bgcolor: '#0093b0' }, px: 4, py: 1.5 }}
            >
              Download APK
            </Button>
          </Card>

          <Card sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: '#fff', textAlign: 'center', p: 3, border: '1px solid rgba(255,255,255,0.2)', flex: 1 }}>
            <ComputerRounded sx={{ fontSize: 80, color: '#00b4d8' }} />
            <Typography variant="h5" sx={{ my: 2 }}>Windows App</Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Install the desktop app for Windows 10/11.
            </Typography>
            <Button
              variant="contained"
              href="/windows/WingaProSetup.exe"
              download
              sx={{ bgcolor: '#00b4d8', '&:hover': { bgcolor: '#0093b0' }, px: 4, py: 1.5 }}
            >
              Download for Windows
            </Button>
          </Card>
        </Box>

        <Typography variant="body2" align="center" sx={{ color: '#aaa', mt: 6 }}>
          Your data is protected. All downloads are secure and verified.
        </Typography>
      </Container>
    </Box>
  );
}