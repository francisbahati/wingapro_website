// app/page.tsx
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Typography,
} from '@mui/material';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { brand } from '@/theme-provider';

const NETWORKS = [
  { name: 'Halotel', logo: '/images/halotel.webp' },
  { name: 'Tigo', logo: '/images/yas.webp' },
  { name: 'Vodacom', logo: '/images/vodacom.webp' },
  { name: 'Airtel', logo: '/images/airtel.webp' },
];

const STEPS = [
  { n: '01', title: 'Choose Your Package', desc: 'Browse bundles for Halotel, Tigo, Vodacom, and Airtel.' },
  { n: '02', title: 'Pay Your Way', desc: 'Use your WingaPro wallet or mobile money. Instant confirmation.' },
  { n: '03', title: 'Get Instant Delivery', desc: 'Your data lands on the phone within seconds.' },
];

const FEATURES = [
  { icon: <SecurityRoundedIcon />, title: 'Bank-Grade Security', desc: 'Encrypted payments and secure account protection.' },
  { icon: <BoltRoundedIcon />, title: 'Instant Delivery', desc: 'Data delivered within seconds of payment.' },
  { icon: <SupportAgentRoundedIcon />, title: '24/7 Support', desc: 'Our team is always online.' },
  { icon: <VerifiedUserRoundedIcon />, title: 'Trusted Platform', desc: 'Thousands of happy customers.' },
  { icon: <TrendingUpRoundedIcon />, title: 'Best Prices', desc: 'Competitive rates and weekly deals.' },
  { icon: <DownloadRoundedIcon />, title: 'Mobile & Desktop', desc: 'Apps for Android and Windows.' },
];

const TESTIMONIALS = [
  { name: 'John D.', text: 'WingaPro is my go-to for buying data. Instant and unbeatable prices!' },
  { name: 'Amina K.', text: 'I love the wallet feature. I buy for my whole family in one place.' },
  { name: 'Peter M.', text: 'Support resolved my issue in minutes. Five stars!' },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Navbar />

      {/* ============ HERO ============ */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 12 },
          background: `radial-gradient(ellipse at 90% 20%, rgba(0,180,216,0.08) 0%, transparent 55%),
                       radial-gradient(ellipse at 10% 90%, rgba(10,46,92,0.06) 0%, transparent 50%),
                       #FFFFFF`,
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
            {/* Left */}
            <Box>
              <Chip
                label="Trusted by 10,000+ Tanzanians"
                sx={{
                  bgcolor: 'rgba(0,180,216,0.10)',
                  color: brand.cyanDeep,
                  fontWeight: 600,
                  mb: 3,
                  border: '1px solid rgba(0,180,216,0.25)',
                }}
              />
              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: '2.4rem', md: '3.4rem' },
                  fontWeight: 800,
                  color: brand.navy,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.05,
                  mb: 2,
                }}
              >
                Fast. Reliable.{' '}
                <Box component="span" sx={{ color: brand.cyan }}>
                  Affordable.
                </Box>
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  color: 'text.secondary',
                  mb: 4,
                  maxWidth: 520,
                  lineHeight: 1.65,
                }}
              >
                Buy data bundles and top up your wallet instantly. All major
                Tanzanian networks in one app.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 5 }}>
                <Button
                  onClick={() => router.push('/plans')}
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardRoundedIcon />}
                >
                  Browse Packages
                </Button>
                <Button
                  onClick={() => router.push('/download')}
                  variant="outlined"
                  size="large"
                  sx={{ borderColor: brand.slate200, color: brand.navy }}
                >
                  Download App
                </Button>
              </Box>

              <Box sx={{ display: 'flex', gap: { xs: 3, sm: 5 }, flexWrap: 'wrap' }}>
                {[
                  { n: '10K+', l: 'Customers' },
                  { n: '1M+', l: 'Data Delivered' },
                  { n: '99.9%', l: 'Uptime' },
                ].map((s) => (
                  <Box key={s.l}>
                    <Typography
                      sx={{
                        fontSize: '1.75rem',
                        fontWeight: 800,
                        color: brand.navy,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {s.n}
                    </Typography>
                    <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                      {s.l}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Right — buckete.png */}
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: '-8%',
                  background: `radial-gradient(circle at center, rgba(0,180,216,0.12) 0%, transparent 65%)`,
                  filter: 'blur(30px)',
                  zIndex: 0,
                }}
              />
              <Box
                className="animate-float"
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  maxWidth: { xs: 320, md: 460 },
                  width: '100%',
                }}
              >
                <Image
                  src="/images/buckete.png"
                  alt="WingaPro data bundles"
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

      {/* ============ TRUST STRIP ============ */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          py: 3,
          borderTop: '1px solid',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-around',
              alignItems: 'center',
              gap: { xs: 2, sm: 0 },
            }}
          >
            {[
              { i: <SecurityRoundedIcon />, t: 'Secure Payments' },
              { i: <BoltRoundedIcon />, t: 'Instant Delivery' },
              { i: <SupportAgentRoundedIcon />, t: '24/7 Support' },
              { i: <VerifiedUserRoundedIcon />, t: 'Trusted Platform' },
              { i: <TrendingUpRoundedIcon />, t: 'Best Prices' },
            ].map((s) => (
              <Box key={s.t} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ color: brand.navy, display: 'flex' }}>{s.i}</Box>
                <Typography
                  sx={{ fontSize: '0.875rem', fontWeight: 600, color: brand.navy }}
                >
                  {s.t}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ============ NETWORKS ============ */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        <Typography component="h2" align="center" sx={{ mb: 1.5 }}>
          Available Networks
        </Typography>
        <Typography
          align="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: 640, mx: 'auto' }}
        >
          All major Tanzanian operators, all in one place.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 3,
          }}
        >
          {NETWORKS.map((n) => (
            <Card
              key={n.name}
              onClick={() => router.push(`/plans?network=${n.name}`)}
              className="lift"
              sx={{
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              <CardContent sx={{ py: 4 }}>
                <Box
                  sx={{
                    height: 70,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={n.logo}
                    alt={n.name}
                    style={{ maxHeight: 60, maxWidth: '100%', objectFit: 'contain' }}
                  />
                </Box>
                <Typography sx={{ fontWeight: 700, color: brand.navy, mb: 0.5 }}>
                  {n.name}
                </Typography>
                <Typography
                  sx={{ fontSize: '0.8rem', color: brand.cyanDeep, fontWeight: 600 }}
                >
                  View Plans →
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* ============ HOW IT WORKS ============ */}
      <Box sx={{ bgcolor: brand.slate50, py: { xs: 8, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography component="h2" align="center" sx={{ mb: 1.5 }}>
            How It Works
          </Typography>
          <Typography align="center" color="text.secondary" sx={{ mb: 6 }}>
            Three steps. Under a minute.
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 4,
            }}
          >
            {STEPS.map((step) => (
              <Card key={step.n} sx={{ height: '100%', p: 1 }}>
                <CardContent>
                  <Typography
                    sx={{
                      fontSize: '2.5rem',
                      fontWeight: 800,
                      color: brand.cyan,
                      lineHeight: 1,
                      mb: 2,
                      opacity: 0.9,
                    }}
                  >
                    {step.n}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: brand.navy,
                      mb: 1,
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    sx={{ fontSize: '0.9rem', color: 'text.secondary', lineHeight: 1.6 }}
                  >
                    {step.desc}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ============ FEATURES ============ */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        <Typography component="h2" align="center" sx={{ mb: 1.5 }}>
          Why Choose WingaPro?
        </Typography>
        <Typography align="center" color="text.secondary" sx={{ mb: 6 }}>
          Built for speed, security, and reliability.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {FEATURES.map((f) => (
            <Card key={f.title} className="lift" sx={{ height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2.5,
                    bgcolor: 'rgba(10,46,92,0.06)',
                    color: brand.navy,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  {f.icon}
                </Box>
                <Typography
                  sx={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: brand.navy,
                    mb: 0.75,
                  }}
                >
                  {f.title}
                </Typography>
                <Typography
                  sx={{ fontSize: '0.9rem', color: 'text.secondary', lineHeight: 1.6 }}
                >
                  {f.desc}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* ============ TESTIMONIALS ============ */}
      <Box sx={{ bgcolor: brand.slate50, py: { xs: 8, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography component="h2" align="center" sx={{ mb: 1.5 }}>
            Loved by Our Customers
          </Typography>
          <Typography align="center" color="text.secondary" sx={{ mb: 6 }}>
            Real feedback from real users.
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {TESTIMONIALS.map((t) => (
              <Card key={t.name} sx={{ height: '100%' }}>
                <CardContent>
                  <Typography
                    sx={{
                      fontStyle: 'italic',
                      mb: 2.5,
                      color: 'text.primary',
                      lineHeight: 1.65,
                    }}
                  >
                    "{t.text}"
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar
                      sx={{ bgcolor: brand.navy, width: 36, height: 36, fontSize: 14 }}
                    >
                      {t.name.charAt(0)}
                    </Avatar>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600 }}>
                      {t.name}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ============ CTA action ============ */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: brand.navy, color: '#fff' }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' },
              gap: 4,
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: '1.8rem', md: '2.4rem' },
                  fontWeight: 800,
                  color: '#fff',
                  mb: 1.5,
                }}
              >
                Get the WingaPro App
              </Typography>
              <Typography
                sx={{ color: 'rgba(255,255,255,0.75)', mb: 3, maxWidth: 520 }}
              >
                Manage your wallet, buy data, and receive alerts — anywhere, anytime.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  onClick={() => router.push('/download')}
                  variant="contained"
                  size="large"
                  startIcon={<DownloadRoundedIcon />}
                  sx={{
                    bgcolor: '#fff',
                    color: brand.navy,
                    '&:hover': { bgcolor: brand.slate100 },
                  }}
                >
                  Download for Android
                </Button>
                <Button
                  onClick={() => router.push('/download')}
                  variant="outlined"
                  size="large"
                  sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.35)' }}
                >
                  Windows App
                </Button>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Box className="animate-float" sx={{ maxWidth: 320, mx: 'auto' }}>
                <Image
                  src="/images/buckete.webp"
                  alt="WingaPro bundle"
                  width={900}
                  height={900}
                  style={{
                    width: '100%',
                    height: 'auto',
                    filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.35))',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}