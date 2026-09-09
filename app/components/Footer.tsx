import { Box, Container, Typography, Stack, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#0a1a2b', color: '#adb5bd', py: 6, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'space-between', mb: 4 }}>
          <Box sx={{ flex: 1, minWidth: 200 }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>WingaPro</Typography>
            <Typography variant="body2">Fast, secure and reliable data bundles.</Typography>
          </Box>
          <Box sx={{ flex: 1, minWidth: 200 }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>Quick Links</Typography>
            <Stack spacing={1}>
              <Link href="/about" color="inherit">About</Link>
              <Link href="/contact" color="inherit">Contact</Link>
              <Link href="/download" color="inherit">Download</Link>
              <Link href="/plans" color="inherit">Packages</Link>
            </Stack>
          </Box>
          <Box sx={{ flex: 1, minWidth: 200 }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>Support</Typography>
            <Typography variant="body2">support@wingapro.com</Typography>
            <Typography variant="body2">+255 762 040 592</Typography>
          </Box>
        </Box>
        <Typography variant="caption" sx={{ display: 'block', textAlign: 'center' }}>
          © {new Date().getFullYear()} WingaPro. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}