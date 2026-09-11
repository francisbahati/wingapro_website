// app/download/page.tsx
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Typography,
} from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AndroidRoundedIcon from '@mui/icons-material/AndroidRounded';
import ComputerRoundedIcon from '@mui/icons-material/ComputerRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';

const FEATURES = [
  'Instant data delivery on purchase',
  'Wallet top-up with mobile money',
  'Order history and receipts',
  'Real-time push notifications',
  'Secure login with refresh tokens',
  'Works on WiFi and mobile data',
];

const APPS = [
  {
    key: 'android',
    icon: <AndroidRoundedIcon sx={{ fontSize: 44 }} />,
    title: 'Android App',
    subtitle: 'For Android 8.0 and above',
    description:
      'Install the APK directly on your phone. Buy bundles, manage your wallet, and track orders on the go.',
    size: '18 MB',
    version: 'v1.1.0',
    href: '/apk/Wingapro v1.1.apk',
    cta: 'Download APK',
    isPrimary: true,
  },
  {
    key: 'windows',
    icon: <ComputerRoundedIcon sx={{ fontSize: 44 }} />,
    title: 'Windows App',
    subtitle: 'For Windows 10 / 11',
    description:
      'Install the desktop client for a larger workspace. Ideal for sellers and corporate accounts.',
    size: '62 MB',
    version: 'v1.1.0',
    href: '/apk/Wingapro.exe',
    cta: 'Download for Windows',
    isPrimary: false,
  },
];

const TRUST = [
  { icon: <SecurityRoundedIcon />,     label: 'Secure & verified' },
  { icon: <BoltRoundedIcon />,         label: 'Fast installation' },
  { icon: <VerifiedUserRoundedIcon />, label: 'No ads or tracking' },
  { icon: <SupportAgentRoundedIcon />, label: '24/7 support' },
];

export default function DownloadPage() {
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
            'radial-gradient(ellipse at 90% 10%, rgba(0,180,216,0.08) 0%, transparent 55%), ' +
            'radial-gradient(ellipse at 5% 90%, rgba(10,46,92,0.06) 0%, transparent 50%), ' +
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
              <Chip
                label="Available on Android & Windows"
                sx={{
                  bgcolor: 'var(--cyan-muted)',
                  color: 'var(--cyan-deep)',
                  fontWeight: 600,
                  mb: 3,
                  border: '1px solid rgba(0,180,216,0.25)',
                }}
              />
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
                Get the{' '}
                <Box component="span" sx={{ color: 'var(--cyan)' }}>
                  WingaPro
                </Box>{' '}
                app
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  color: 'var(--text-muted)',
                  mb: 4,
                  maxWidth: 520,
                  lineHeight: 1.65,
                }}
              >
                Buy data, manage your wallet, and track every order — right from
                your phone or desktop. Fast, secure, and always in sync.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 5 }}>
                <Button
                  href="/apk/Wingapro v1.1.apk"
                  download
                  variant="contained"
                  size="large"
                  startIcon={<DownloadRoundedIcon />}
                  className="btn-shine"
                >
                  Download APK
                </Button>
                <Button
                  href="#apps"
                  variant="outlined"
                  size="large"
                  endIcon={<ArrowForwardRoundedIcon />}
                >
                  See all versions
                </Button>
              </Box>

              <Box sx={{ display: 'flex', gap: { xs: 3, sm: 5 }, flexWrap: 'wrap' }}>
                {[
                  { n: '10K+', l: 'Downloads' },
                  { n: '4.8★', l: 'Avg. rating' },
                  { n: '99.9%', l: 'Uptime' },
                ].map((s) => (
                  <Box key={s.l}>
                    <Typography
                      sx={{
                        fontSize: '1.6rem',
                        fontWeight: 800,
                        color: 'var(--navy)',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {s.n}
                    </Typography>
                    <Typography sx={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {s.l}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

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
                  background: 'radial-gradient(circle at center, rgba(0,180,216,0.14) 0%, transparent 65%)',
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
                  src="/images/buckete.webp"
                  alt="WingaPro mobile and desktop apps"
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

      {/* TRUST STRIP */}
      <Box
        sx={{
          bgcolor: 'var(--surface)',
          py: 3,
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
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
            {TRUST.map((t) => (
              <Box key={t.label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ color: 'var(--navy)', display: 'flex' }}>{t.icon}</Box>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--navy)' }}>
                  {t.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* APPS */}
      <Container maxWidth="lg" id="apps" sx={{ py: { xs: 8, md: 10 } }}>
        <Typography
          component="h2"
          align="center"
          sx={{ mb: 1.5, color: 'var(--navy)', fontWeight: 800 }}
        >
          Choose your platform
        </Typography>
        <Typography
          align="center"
          sx={{ mb: 6, maxWidth: 640, mx: 'auto', color: 'var(--text-muted)' }}
        >
          The same WingaPro experience on every device.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 4,
          }}
        >
          {APPS.map((app) => (
            <Card
              key={app.key}
              className="surface-interactive"
              sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 4,
                height: '100%',
                bgcolor: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              {app.isPrimary && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: `linear-gradient(90deg, var(--navy) 0%, var(--cyan) 100%)`,
                  }}
                />
              )}
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: app.isPrimary ? 'var(--cyan-muted)' : 'var(--navy-muted)',
                    color: app.isPrimary ? 'var(--cyan-deep)' : 'var(--navy)',
                    mb: 3,
                  }}
                >
                  {app.icon}
                </Box>

                <Typography
                  sx={{
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: 'var(--navy)',
                    letterSpacing: '-0.015em',
                    mb: 0.5,
                  }}
                >
                  {app.title}
                </Typography>
                <Typography sx={{ fontSize: '0.85rem', color: 'var(--text-muted)', mb: 2 }}>
                  {app.subtitle}
                </Typography>
                <Typography
                  sx={{ fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.65, mb: 3 }}
                >
                  {app.description}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                  <Chip
                    label={app.version}
                    size="small"
                    sx={{ bgcolor: 'var(--navy-muted)', color: 'var(--navy)', fontWeight: 600, borderRadius: 1.5 }}
                  />
                  <Chip
                    label={app.size}
                    size="small"
                    sx={{ bgcolor: 'var(--navy-muted)', color: 'var(--navy)', fontWeight: 600, borderRadius: 1.5 }}
                  />
                  <Chip
                    label="Free"
                    size="small"
                    sx={{ bgcolor: 'var(--success-muted)', color: 'var(--success)', fontWeight: 600, borderRadius: 1.5 }}
                  />
                </Box>

                <Button
                  href={app.href}
                  download
                  variant={app.isPrimary ? 'contained' : 'outlined'}
                  size="large"
                  fullWidth
                  startIcon={<DownloadRoundedIcon />}
                >
                  {app.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* WHAT'S INSIDE */}
      <Box sx={{ bgcolor: 'var(--bg-soft)', py: { xs: 8, md: 10 } }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 6,
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography
                component="h2"
                sx={{ fontSize: { xs: '1.8rem', md: '2.25rem' }, mb: 2, color: 'var(--navy)', fontWeight: 800 }}
              >
                Everything you need,{' '}
                <Box component="span" sx={{ color: 'var(--cyan)' }}>
                  built in.
                </Box>
              </Typography>
              <Typography
                sx={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7, mb: 3 }}
              >
                No clutter. No distractions. Just the features that help you buy
                data faster, safer, and cheaper.
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 1.5,
                }}
              >
                {FEATURES.map((feature) => (
                  <Box
                    key={feature}
                    sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}
                  >
                    <CheckCircleRoundedIcon
                      sx={{
                        fontSize: 20,
                        color: 'var(--cyan-deep)',
                        flexShrink: 0,
                        mt: 0.25,
                      }}
                    />
                    <Typography
                      sx={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.5 }}
                    >
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box
                className="animate-float-slow"
                sx={{
                  width: { xs: 220, md: 260 },
                  aspectRatio: '9 / 19',
                  borderRadius: 6,
                  border: `10px solid var(--navy)`,
                  overflow: 'hidden',
                  bgcolor: 'var(--navy-deep)',
                  boxShadow: '0 40px 80px rgba(10,46,92,0.28)',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 90,
                    height: 18,
                    bgcolor: 'var(--navy)',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    zIndex: 2,
                  }}
                />
                <Image
                  src="/images/wingapro.webp"
                  alt="WingaPro app screen"
                  width={540}
                  height={1140}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* FAQ */}
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 10 } }}>
        <Typography
          component="h2"
          align="center"
          sx={{ mb: 1.5, color: 'var(--navy)', fontWeight: 800 }}
        >
          Frequently asked
        </Typography>
        <Typography align="center" sx={{ mb: 6, color: 'var(--text-muted)' }}>
          Quick answers before you install.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[
            {
              q: 'Is the APK safe to install?',
              a: 'Yes. Every build is signed with our developer certificate. Your Android device will warn you once about installing from outside the Play Store — this is normal for any APK.',
            },
            {
              q: 'Will my data sync across devices?',
              a: 'Yes. Sign in with the same account on both Android and Windows and everything — wallet, orders, notifications — stays in sync.',
            },
            {
              q: 'Do I need to update manually?',
              a: 'The app notifies you whenever a new version is available. You will always have the download link here on this page.',
            },
            {
              q: 'What about Windows SmartScreen?',
              a: 'Windows may show a SmartScreen prompt the first time you run the installer. Click "More info" → "Run anyway". The installer is code-signed and verified.',
            },
          ].map((item) => (
            <Card
              key={item.q}
              sx={{ borderRadius: 3, bgcolor: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <CardContent>
                <Typography
                  sx={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: 'var(--navy)',
                    mb: 1,
                  }}
                >
                  {item.q}
                </Typography>
                <Typography
                  sx={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.65 }}
                >
                  {item.a}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* CTA */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          background: `linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)`,
          color: '#fff',
        }}
      >
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
                Ready to get started?
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.75)',
                  mb: 3,
                  maxWidth: 520,
                  lineHeight: 1.65,
                }}
              >
                Download the app, sign in, and start buying data in under a minute.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  onClick={() => router.push('/register')}
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardRoundedIcon />}
                  className="btn-shine"
                  sx={{
                    bgcolor: '#fff',
                    color: 'var(--navy-deep)',
                    '&:hover': { bgcolor: '#F1F5F9' },
                  }}
                >
                  Create an account
                </Button>
                <Button
                  onClick={() => router.push('/login')}
                  variant="outlined"
                  size="large"
                  sx={{
                    color: '#fff',
                    borderColor: 'rgba(255,255,255,0.35)',
                    '&:hover': { borderColor: '#fff' },
                  }}
                >
                  Sign in
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