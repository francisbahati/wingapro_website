// app/components/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Box, Container, Divider, Typography } from '@mui/material';
import { brand } from '@/theme-provider';

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Packages', href: '/plans' },
      { label: 'Download', href: '/download' },
      { label: 'Dashboard', href: '/dashboard' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Recovery', href: '/recovery' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms', href: '/terms' },
      { label: 'Privacy', href: '/privacy' },
    ],
  },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 6,
        bgcolor: brand.navy,
        color: 'rgba(255,255,255,0.75)',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr 1fr' },
            gap: 4,
            mb: 4,
          }}
        >
          {/* Brand */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Image src="/images/wingapro.webp" alt="WingaPro" width={32} height={32} />
              <Typography sx={{ fontWeight: 800, fontSize: '1.15rem', color: '#fff' }}>
                Winga
                <Box component="span" sx={{ color: brand.cyan }}>
                  Pro
                </Box>
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '0.9rem', maxWidth: 320 }}>
              Fast, secure and reliable data bundles for all major Tanzanian networks.
            </Typography>
          </Box>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <Box key={col.title}>
              <Typography
                sx={{ fontWeight: 700, mb: 1.5, color: '#fff', fontSize: '0.95rem' }}
              >
                {col.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {col.links.map((l) => (
                  <Link
                    key={l.href + l.label}
                    href={l.href}
                    style={{
                      color: 'rgba(255,255,255,0.72)',
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                    }}
                  >
                    {l.label}
                  </Link>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Divider sx={{ mb: 3, borderColor: 'rgba(255,255,255,0.12)' }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography sx={{ fontSize: '0.75rem' }}>
            © {new Date().getFullYear()} WingaPro. All rights reserved.
          </Typography>
          <Typography sx={{ fontSize: '0.75rem' }}>
            support@wingapro.com · +255 762 040 592
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}