// app/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { motion, type Variants } from 'framer-motion';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { brand } from '@/theme-provider';

/* Framer Motion v13 requires cubic-bezier easing to be a 4-tuple */
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

const NETWORKS = [
  { name: 'Halotel', logo: '/images/halotel.webp', tint: '#f97316' },
  { name: 'Tigo',    logo: '/images/yas.webp',     tint: '#0ea5e9' },
  { name: 'Vodacom', logo: '/images/vodacom.webp', tint: '#ef4444' },
  { name: 'Airtel',  logo: '/images/airtel.webp',  tint: '#dc2626' },
];

const STEPS = [
  { n: '01', title: 'Choose your package', desc: 'Browse bundles for Halotel, Tigo, Vodacom and Airtel — all in one place.' },
  { n: '02', title: 'Pay your way',        desc: 'Use your WingaPro wallet or mobile money. Confirmation in seconds.' },
  { n: '03', title: 'Get instant delivery', desc: 'Your data lands on the recipient phone within moments.' },
];

const FEATURES = [
  { icon: <SecurityRoundedIcon />,     title: 'Bank-grade security',  desc: 'Encrypted payments and secure account protection at every step.' },
  { icon: <BoltRoundedIcon />,         title: 'Instant delivery',     desc: 'Data delivered within seconds of a confirmed payment.' },
  { icon: <SupportAgentRoundedIcon />, title: '24/7 support',         desc: 'Real humans ready to help whenever you need us.' },
  { icon: <VerifiedUserRoundedIcon />, title: 'Trusted platform',     desc: 'Thousands of happy customers across Tanzania.' },
  { icon: <TrendingUpRoundedIcon />,   title: 'Best prices',          desc: 'Competitive rates and weekly promotions.' },
  { icon: <DownloadRoundedIcon />,     title: 'Mobile & desktop',     desc: 'Apps for Android, Windows and any modern browser.' },
];

const TESTIMONIALS = [
  { name: 'John D.',  role: 'Dar es Salaam', text: 'WingaPro is my go-to for buying data. Instant and unbeatable prices!' },
  { name: 'Amina K.', role: 'Arusha',        text: 'I love the wallet feature. I buy for my whole family in one place.' },
  { name: 'Peter M.', role: 'Mwanza',        text: 'Support resolved my issue in minutes. Five stars from me!' },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <Box sx={{ bgcolor: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════
          HERO — video background with theme-aware overlay
          ═══════════════════════════════════════════════════════════ */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: { xs: '88vh', md: '92vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* ─── Video background ─── */}
        <Box
          component="video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/wingapro.webp"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src="/images/wingaprovideo.mp4" type="video/mp4" />
        </Box>

        {/* ─── Theme-aware solid overlay ─── */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            backgroundColor: 'var(--hero-overlay)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            transition: 'background-color .35s ease',
          }}
        />

        {/* ─── Soft radial glow on top of overlay ─── */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            pointerEvents: 'none',
            background:
              'radial-gradient(ellipse at 20% 20%, rgba(0,180,216,0.18) 0%, transparent 55%), ' +
              'radial-gradient(ellipse at 80% 80%, rgba(10,46,92,0.18) 0%, transparent 55%)',
          }}
        />

        {/* ─── Content ─── */}
        <Container
          maxWidth="md"
          sx={{
            position: 'relative',
            zIndex: 3,
            py: { xs: 8, md: 10 },
          }}
        >
          <motion.div initial="hidden" animate="show" variants={container}>
            {/* Live badge */}
            <motion.div variants={item}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Chip
                  icon={<Box className="status-dot live" sx={{ ml: 1 }} />}
                  label="Trusted by 10,000+ Tanzanians"
                  sx={{
                    bgcolor: 'var(--cyan-muted)',
                    color: 'var(--cyan-deep)',
                    fontWeight: 600,
                    border: '1px solid rgba(0,180,216,0.28)',
                    height: 34,
                    px: 1,
                    backdropFilter: 'blur(8px)',
                    '& .MuiChip-label': { px: 1.5 },
                  }}
                />
              </Box>
            </motion.div>

            {/* H1 */}
            <motion.div variants={item}>
              <Typography
                component="h1"
                align="center"
                sx={{
                  fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4.4rem' },
                  fontWeight: 800,
                  color: 'var(--navy)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1.02,
                  mb: 3,
                  textShadow:
                    '0 2px 24px rgba(255,255,255,0.35), 0 0 1px rgba(255,255,255,0.2)',
                  '[data-theme="dark"] &': {
                    textShadow: '0 2px 32px rgba(0,0,0,0.55)',
                  },
                }}
              >
                Fast. Reliable.{' '}
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(135deg, #0096B8 0%, #22C7E0 50%, #4DD0E1 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                    display: 'inline-block',
                    animation: 'gradientShift 6s ease-in-out infinite',
                    backgroundSize: '200% 200%',
                  }}
                >
                  Affordable.
                </Box>
              </Typography>
            </motion.div>

            {/* Subtitle */}
            <motion.div variants={item}>
              <Typography
                align="center"
                sx={{
                  fontSize: { xs: '1.05rem', sm: '1.15rem', md: '1.25rem' },
                  color: 'var(--text-muted)',
                  mb: 5,
                  maxWidth: 620,
                  mx: 'auto',
                  lineHeight: 1.7,
                  fontWeight: 500,
                }}
              >
                Buy data bundles and top up your wallet in seconds. All major
                Tanzanian networks, one beautiful app.
              </Typography>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={item}>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  mb: 6,
                }}
              >
                <Button
                  onClick={() => router.push('/plans')}
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardRoundedIcon />}
                  className="btn-shine"
                  sx={{
                    px: 4,
                    py: 1.75,
                    fontSize: '1rem',
                    borderRadius: 3,
                    boxShadow: '0 12px 32px rgba(10,46,92,0.28)',
                  }}
                >
                  Browse Packages
                </Button>
                <Button
                  onClick={() => router.push('/download')}
                  variant="outlined"
                  size="large"
                  startIcon={<PlayArrowRoundedIcon />}
                  sx={{
                    px: 4,
                    py: 1.75,
                    fontSize: '1rem',
                    borderRadius: 3,
                    bgcolor: 'var(--surface)',
                    borderColor: 'var(--border-strong)',
                    color: 'var(--navy)',
                    backdropFilter: 'blur(8px)',
                    '&:hover': {
                      bgcolor: 'var(--surface)',
                      borderColor: 'var(--cyan)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Download App
                </Button>
              </Box>
            </motion.div>

            {/* Trust chips row */}
            <motion.div variants={item}>
              <Stack
                direction="row"
                spacing={{ xs: 2, sm: 3.5 }}
                sx={{
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  rowGap: 1.5,
                }}
              >
                {[
                  { i: <SecurityRoundedIcon sx={{ fontSize: 18 }} />, t: 'Secure payments' },
                  { i: <BoltRoundedIcon sx={{ fontSize: 18 }} />,     t: 'Instant delivery' },
                  { i: <VerifiedUserRoundedIcon sx={{ fontSize: 18 }} />, t: 'Trusted platform' },
                ].map((s) => (
                  <Box
                    key={s.t}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 2,
                      py: 1,
                      borderRadius: 999,
                      bgcolor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      backdropFilter: 'blur(10px)',
                      transition: 'transform .2s ease, border-color .2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        borderColor: 'var(--cyan)',
                      },
                    }}
                  >
                    <Box sx={{ color: 'var(--cyan-deep)', display: 'flex' }}>{s.i}</Box>
                    <Typography
                      sx={{
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: 'var(--navy)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {s.t}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </motion.div>

            {/* Stats row */}
            <motion.div variants={item}>
              <Box
                sx={{
                  display: 'flex',
                  gap: { xs: 4, sm: 8 },
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  mt: { xs: 6, md: 8 },
                  pt: { xs: 4, md: 5 },
                  borderTop: '1px solid var(--border)',
                  maxWidth: 640,
                  mx: 'auto',
                }}
              >
                {[
                  { n: '10K+',  l: 'Customers' },
                  { n: '1M+',   l: 'Bundles delivered' },
                  { n: '99.9%', l: 'Uptime' },
                ].map((s) => (
                  <Box key={s.l} sx={{ textAlign: 'center' }}>
                    <Typography
                      sx={{
                        fontSize: { xs: '1.9rem', md: '2.2rem' },
                        fontWeight: 800,
                        color: 'var(--navy)',
                        letterSpacing: '-0.03em',
                        lineHeight: 1.05,
                      }}
                    >
                      {s.n}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        mt: 0.5,
                        letterSpacing: '0.02em',
                      }}
                    >
                      {s.l}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </motion.div>
        </Container>

        {/* ─── Bottom fade (smooth transition into next section) ─── */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 120,
            zIndex: 3,
            pointerEvents: 'none',
            background: 'linear-gradient(to bottom, transparent 0%, var(--bg) 100%)',
          }}
        />
      </Box>

      {/* ═══════════ TRUST STRIP ═══════════ */}
      <Box
        sx={{
          bgcolor: 'var(--surface)',
          py: 3.5,
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
              gap: { xs: 2.5, sm: 2 },
            }}
          >
            {[
              { i: <SecurityRoundedIcon />,     t: 'Secure payments' },
              { i: <BoltRoundedIcon />,         t: 'Instant delivery' },
              { i: <SupportAgentRoundedIcon />, t: '24/7 support' },
              { i: <VerifiedUserRoundedIcon />, t: 'Trusted platform' },
              { i: <TrendingUpRoundedIcon />,   t: 'Best prices' },
            ].map((s) => (
              <Box key={s.t} sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                <Box sx={{ color: 'var(--cyan-deep)', display: 'flex' }}>{s.i}</Box>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--navy)' }}>
                  {s.t}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ═══════════ NETWORKS ═══════════ */}
      <Box className="section">
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
          >
            <motion.div variants={item}>
              <Typography
                component="h2"
                align="center"
                sx={{ mb: 1.5, fontWeight: 800, color: 'var(--navy)' }}
              >
                Available networks
              </Typography>
              <Typography align="center" sx={{ mb: 7, maxWidth: 560, mx: 'auto', color: 'var(--text-muted)' }}>
                All major Tanzanian operators, one seamless experience.
              </Typography>
            </motion.div>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                gap: 3,
              }}
            >
              {NETWORKS.map((n) => (
                <motion.div key={n.name} variants={item}>
                  <Card
                    onClick={() => router.push(`/plans?network=${n.name}`)}
                    className="lift"
                    sx={{
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      height: '100%',
                      bgcolor: 'var(--surface)',
                      borderColor: 'var(--border)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        background: `radial-gradient(circle at 50% 0%, ${n.tint}22 0%, transparent 70%)`,
                        opacity: 0,
                        transition: 'opacity .35s ease',
                        pointerEvents: 'none',
                      },
                      '&:hover::before': { opacity: 1 },
                    }}
                  >
                    <CardContent sx={{ py: 5, textAlign: 'center' }}>
                      <Box sx={{ height: 72, display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2.5 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={n.logo}
                          alt={n.name}
                          style={{ maxHeight: 60, maxWidth: '100%', objectFit: 'contain' }}
                        />
                      </Box>
                      <Typography sx={{ fontWeight: 700, color: 'var(--navy)', mb: 0.75, fontSize: '1.05rem' }}>
                        {n.name}
                      </Typography>
                      <Typography sx={{ fontSize: '0.8rem', color: 'var(--cyan-deep)', fontWeight: 600 }}>
                        View plans →
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <Box sx={{ bgcolor: 'var(--bg-soft)', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
          >
            <motion.div variants={item}>
              <Typography component="h2" align="center" sx={{ mb: 1.5, fontWeight: 800, color: 'var(--navy)' }}>
                How it works
              </Typography>
              <Typography align="center" sx={{ mb: 7, color: 'var(--text-muted)' }}>
                Three simple steps. Under a minute.
              </Typography>
            </motion.div>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
              {STEPS.map((step) => (
                <motion.div key={step.n} variants={item}>
                  <Card
                    sx={{
                      height: '100%',
                      bgcolor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      p: 1,
                      transition: 'transform .25s ease, box-shadow .25s ease',
                      '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 20px 40px rgba(15,23,42,0.08)' },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 48,
                          height: 48,
                          borderRadius: 3,
                          background: `linear-gradient(135deg, var(--navy), var(--cyan))`,
                          color: '#fff',
                          fontWeight: 800,
                          fontSize: '1rem',
                          mb: 3,
                          boxShadow: '0 10px 22px rgba(10,46,92,0.20)',
                        }}
                      >
                        {step.n}
                      </Box>
                      <Typography sx={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy)', mb: 1 }}>
                        {step.title}
                      </Typography>
                      <Typography sx={{ fontSize: '0.925rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                        {step.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* ═══════════ FEATURES ═══════════ */}
      <Box className="section">
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={container}
          >
            <motion.div variants={item}>
              <Typography component="h2" align="center" sx={{ mb: 1.5, fontWeight: 800, color: 'var(--navy)' }}>
                Why choose WingaPro
              </Typography>
              <Typography align="center" sx={{ mb: 7, color: 'var(--text-muted)' }}>
                Built for speed, security and reliability.
              </Typography>
            </motion.div>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
              {FEATURES.map((f) => (
                <motion.div key={f.title} variants={item}>
                  <Card
                    className="lift"
                    sx={{
                      height: '100%',
                      bgcolor: 'var(--surface)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <CardContent sx={{ p: 3.5 }}>
                      <Box
                        sx={{
                          width: 52,
                          height: 52,
                          borderRadius: 3,
                          bgcolor: 'var(--navy-muted)',
                          color: 'var(--navy)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 2.5,
                          transition: 'transform .25s ease, background-color .25s ease',
                          '.MuiCard-root:hover &': {
                            transform: 'scale(1.06) rotate(-3deg)',
                            bgcolor: 'var(--cyan-muted)',
                          },
                        }}
                      >
                        {f.icon}
                      </Box>
                      <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy)', mb: 1 }}>
                        {f.title}
                      </Typography>
                      <Typography sx={{ fontSize: '0.925rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                        {f.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <Box sx={{ bgcolor: 'var(--bg-soft)', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
          >
            <motion.div variants={item}>
              <Typography component="h2" align="center" sx={{ mb: 1.5, fontWeight: 800, color: 'var(--navy)' }}>
                Loved by our customers
              </Typography>
              <Typography align="center" sx={{ mb: 7, color: 'var(--text-muted)' }}>
                Real feedback from real users.
              </Typography>
            </motion.div>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
              {TESTIMONIALS.map((t) => (
                <motion.div key={t.name} variants={item}>
                  <Card
                    sx={{
                      height: '100%',
                      bgcolor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      transition: 'transform .25s ease, box-shadow .25s ease',
                      '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 20px 40px rgba(15,23,42,0.08)' },
                    }}
                  >
                    <CardContent sx={{ p: 3.5 }}>
                      <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Box key={i} sx={{ color: '#F59E0B', fontSize: 16, lineHeight: 1 }}>★</Box>
                        ))}
                      </Box>
                      <Typography sx={{ fontStyle: 'italic', mb: 3, color: 'var(--text)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                        &ldquo;{t.text}&rdquo;
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ bgcolor: 'var(--navy)', width: 40, height: 40, fontSize: 15, fontWeight: 700 }}>
                          {t.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--navy)' }}>
                            {t.name}
                          </Typography>
                          <Typography sx={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            {t.role}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <Box
              sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 5,
                p: { xs: 5, md: 8 },
                background: `linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 55%, var(--cyan) 165%)`,
                color: '#fff',
                boxShadow: '0 30px 60px rgba(10,46,92,0.28)',
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: -80,
                  right: -60,
                  width: 320,
                  height: 320,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />

              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography
                  component="h2"
                  sx={{
                    fontSize: { xs: '1.9rem', md: '2.6rem' },
                    fontWeight: 800,
                    color: '#fff',
                    mb: 2,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                  }}
                >
                  Ready to get connected?
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.82)',
                    mb: 4,
                    maxWidth: 520,
                    mx: 'auto',
                    fontSize: '1.05rem',
                    lineHeight: 1.65,
                  }}
                >
                  Join thousands of Tanzanians who trust WingaPro for their data needs.
                </Typography>

                <Stack direction="row" spacing={1.5} sx={{ mb: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
                  {['No signup fee', 'Instant delivery', '24/7 support'].map((it) => (
                    <Box key={it} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <CheckCircleRoundedIcon sx={{ fontSize: 18, color: 'var(--cyan)' }} />
                      <Typography sx={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)' }}>
                        {it}
                      </Typography>
                    </Box>
                  ))}
                </Stack>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Button
                    onClick={() => router.push('/register')}
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardRoundedIcon />}
                    className="btn-shine"
                    sx={{
                      bgcolor: '#fff',
                      color: 'var(--navy-deep)',
                      px: 3.5,
                      py: 1.6,
                      '&:hover': { bgcolor: '#F1F5F9', transform: 'translateY(-2px)' },
                    }}
                  >
                    Create account
                  </Button>
                  <Button
                    onClick={() => router.push('/plans')}
                    variant="outlined"
                    size="large"
                    sx={{
                      color: '#fff',
                      borderColor: 'rgba(255,255,255,0.4)',
                      px: 3.5,
                      py: 1.6,
                      '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.08)' },
                    }}
                  >
                    View packages
                  </Button>
                </Box>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}