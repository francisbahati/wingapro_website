// app/components/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Box, Container, Divider, Typography, Stack } from '@mui/material';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';

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

const CONTACT = [
  { icon: <EmailRoundedIcon sx={{ fontSize: 16 }} />, text: 'support@wingapro.com' },
  { icon: <PhoneRoundedIcon sx={{ fontSize: 16 }} />, text: '+255 762 040 592' },
  { icon: <LocationOnRoundedIcon sx={{ fontSize: 16 }} />, text: 'Dar es Salaam, Tanzania' },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        pt: { xs: 7, sm: 8, md: 10 },
        pb: { xs: 3, md: 4 },
        bgcolor: 'var(--footer-bg)',
        color: 'rgba(255,255,255,0.75)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background-color .3s ease',
      }}
    >
      {/* Decorative cyan orb */}
      <Box
        sx={{
          position: 'absolute',
          top: -120,
          right: -80,
          width: { xs: 200, md: 320 },
          height: { xs: 200, md: 320 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,180,216,0.20) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 2.5, sm: 3 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '2.2fr 1fr 1fr 1fr',
            },
            gap: { xs: 5, sm: 4, md: 6 },
            mb: { xs: 5, md: 6 },
          }}
        >
          {/* ─── Brand column ─── */}
          <Box sx={{ maxWidth: { xs: '100%', md: 380 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
              {/* White circle with logo */}
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  bgcolor: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/images/wingapro.webp"
                  alt="WingaPro"
                  width={30}
                  height={30}
                  style={{ width: '78%', height: '78%', objectFit: 'contain' }}
                />
              </Box>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  color: '#fff',
                  letterSpacing: '-0.03em',
                }}
              >
                Winga
                <Box component="span" sx={{ color: 'var(--cyan)' }}>Pro</Box>
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: '0.925rem',
                lineHeight: 1.7,
                mb: 3,
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              Fast, secure and reliable data bundles for all major Tanzanian networks.
              Instant delivery, trusted by thousands.
            </Typography>

            <Stack spacing={1.25}>
              {CONTACT.map((c) => (
                <Box key={c.text} sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                  <Box
                    sx={{
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      bgcolor: 'rgba(0,180,216,0.15)',
                      color: 'var(--cyan)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {c.icon}
                  </Box>
                  <Typography sx={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.78)' }}>
                    {c.text}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* ─── Link columns ─── */}
          {COLUMNS.map((col) => (
            <Box key={col.title}>
              <Typography
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: '#fff',
                  fontSize: '0.95rem',
                  letterSpacing: '-0.01em',
                }}
              >
                {col.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                {col.links.map((l) => (
                  <Link
                    key={l.href + l.label}
                    href={l.href}
                    style={{
                      color: 'rgba(255,255,255,0.70)',
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                      transition: 'color .2s ease, transform .2s ease',
                      display: 'inline-block',
                      width: 'fit-content',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = 'var(--cyan)';
                      (e.currentTarget as HTMLAnchorElement).style.transform = 'translateX(3px)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.70)';
                      (e.currentTarget as HTMLAnchorElement).style.transform = 'translateX(0)';
                    }}
                  >
                    {l.label}
                  </Link>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Divider sx={{ mb: 3, borderColor: 'rgba(255,255,255,0.10)' }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: { xs: 1.5, sm: 2 },
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Typography sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)' }}>
            © {new Date().getFullYear()} WingaPro. All rights reserved.
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)' }}>
            Made with care in Tanzania 🇹🇿
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}