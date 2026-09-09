import { Box, Container, Typography, Link, Divider } from '@mui/material';
import Image from 'next/image';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#0a1a2b', color: '#adb5bd', py: 6, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 4, mb: 4 }}>
          <Box>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
              <Image src="/images/wingapro.webp" alt="WingaPro Logo" width={40} height={40} />
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>Winga<span style={{ color: '#00b4d8' }}>Pro</span></Typography>
            </Box>
            <Typography variant="body2">Fast, secure and reliable data bundles for all networks.</Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>Quick Links</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/about" color="inherit" underline="hover">About</Link>
              <Link href="/contact" color="inherit" underline="hover">Contact</Link>
              <Link href="/download" color="inherit" underline="hover">Download</Link>
              <Link href="/plans" color="inherit" underline="hover">Packages</Link>
            </Box>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>Support</Typography>
            <Typography variant="body2">support@wingapro.com</Typography>
            <Typography variant="body2">+255 762 040 592</Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>Follow Us</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link href="#" color="inherit">Facebook</Link>
              <Link href="#" color="inherit">Twitter</Link>
              <Link href="#" color="inherit">Instagram</Link>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.2)' }} />
        <Typography variant="caption" sx={{ display: 'block', textAlign: 'center' }}>
          © {new Date().getFullYear()} WingaPro. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}