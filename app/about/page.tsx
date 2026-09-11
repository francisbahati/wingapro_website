// app/about/page.tsx
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

const VALUES = [
  {
    icon: <SecurityRoundedIcon />,
    title: 'Secure Transactions',
    desc: 'Every payment is encrypted and processed safely.',
  },
  {
    icon: <BoltRoundedIcon />,
    title: 'Instant Delivery',
    desc: 'Data is sent to your phone immediately after payment.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: '24/7 Support',
    desc: 'Our team is available to help you any time of day.',
  },
];

export default function AboutPage() {
  const router = useRouter();

  return (
    <Box sx={{ bgcolor: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />

      {/* HERO */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 12 },
          background:
            'radial-gradient(ellipse at 90% 20%, rgba(0,180,216,0.08) 0%, transparent 55%), ' +
            'radial-gradient(ellipse at 10% 90%, rgba(10,46,92,0.06) 0%, transparent 50%), ' +
            'var(--hero-base)',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
              gap: { xs: 6, md: 8 },
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: '2.2rem', md: '3.2rem' },
                  fontWeight: 800,
                  color: 'var(--navy)',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.08,
                  mb: 2,
                }}
              >
                About{' '}
                <Box component="span" sx={{ color: 'var(--cyan)' }}>
                  WingaPro
                </Box>
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  color: 'var(--text-muted)',
                  mb: 4,
                  maxWidth: 560,
                  lineHeight: 1.65,
                }}
              >
                WingaPro is a modern digital platform dedicated to providing fast,
                affordable internet packages and quality networking devices.
              </Typography>
              <Typography sx={{ color: 'var(--text-muted)', mb: 4, maxWidth: 560, lineHeight: 1.65 }}>
                Our mission is to simplify how you buy data and hardware. With just
                a few clicks, you can choose a plan, order a router, and get
                started.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  onClick={() => router.push('/plans')}
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardRoundedIcon />}
                  className="btn-shine"
                >
                  Browse Packages
                </Button>
                <Button
                  onClick={() => router.push('/contact')}
                  variant="outlined"
                  size="large"
                >
                  Contact Us
                </Button>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box className="animate-float" sx={{ maxWidth: { xs: 320, md: 420 }, width: '100%' }}>
                <Image
                  src="/images/buckete.webp"
                  alt="WingaPro"
                  width={900}
                  height={900}
                  priority
                  style={{
                    width: '100%',
                    height: 'auto',
                    filter: 'drop-shadow(0 30px 60px rgba(10,46,92,0.18))',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* VALUES */}
      <Box sx={{ bgcolor: 'var(--bg-soft)', py: { xs: 8, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            align="center"
            sx={{ mb: 6, color: 'var(--navy)', fontWeight: 800 }}
          >
            What We Stand For
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {VALUES.map((v) => (
              <Card
                key={v.title}
                className="lift"
                sx={{
                  textAlign: 'center',
                  p: 2,
                  bgcolor: 'var(--surface)',
                  border: '1px solid var(--border)',
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      bgcolor: 'var(--navy-muted)',
                      color: 'var(--navy)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    <Box sx={{ fontSize: 32, display: 'flex' }}>{v.icon}</Box>
                  </Box>
                  <Typography
                    sx={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy)', mb: 1 }}
                  >
                    {v.title}
                  </Typography>
                  <Typography sx={{ color: 'var(--text-muted)', lineHeight: 1.65 }}>
                    {v.desc}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          background: `linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)`,
          color: '#fff',
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: '1.8rem', md: '2.4rem' },
              fontWeight: 800,
              color: '#fff',
              mb: 2,
            }}
          >
            Ready to get connected?
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.75)', mb: 4, maxWidth: 560, mx: 'auto' }}>
            Join thousands of Tanzanians who trust WingaPro for their data needs.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              onClick={() => router.push('/register')}
              variant="contained"
              size="large"
              sx={{
                bgcolor: '#fff',
                color: 'var(--navy-deep)',
                '&:hover': { bgcolor: '#F1F5F9' },
              }}
            >
              Create Account
            </Button>
            <Button
              onClick={() => router.push('/plans')}
              variant="outlined"
              size="large"
              sx={{
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.35)',
                '&:hover': { borderColor: '#fff' },
              }}
            >
              View Packages
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}