// app/components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'Packages', href: '/plans' },
  { label: 'About',    href: '/about' },
  { label: 'Download', href: '/download' },
  { label: 'Contact',  href: '/contact' },
];

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setOpen(false);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: scrolled ? 'var(--navbar-bg-scrolled)' : 'var(--navbar-bg)',
        backdropFilter: 'saturate(180%) blur(16px)',
        WebkitBackdropFilter: 'saturate(180%) blur(16px)',
        borderBottom: '1px solid',
        borderColor: scrolled ? 'var(--border)' : 'transparent',
        color: 'text.primary',
        transition: 'background-color .25s ease, border-color .25s ease',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 64, sm: 68, md: 72 },
            gap: { xs: 1.5, sm: 2 },
          }}
        >
          {/* ─── Logo ─── */}
          <Box
            onClick={() => go('/')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1, sm: 1.25 },
              cursor: 'pointer',
              mr: { xs: 'auto', md: 2 },
              transition: 'transform .2s ease',
              '&:hover': { transform: 'translateY(-1px)' },
            }}
          >
            {/* ── WHITE CIRCLE — logo stays visible in BOTH themes ── */}
            <Box
              sx={{
                width: { xs: 36, sm: 38, md: 40 },
                height: { xs: 36, sm: 38, md: 40 },
                borderRadius: '50%',
                bgcolor: 'var(--logo-circle-bg)',         // ← always white
                border: '1px solid var(--logo-circle-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(10,46,92,0.10)',
                position: 'relative',
                overflow: 'hidden',
                flexShrink: 0,
                transition: 'box-shadow .25s ease, transform .25s ease',
                '&:hover': {
                  boxShadow: '0 6px 20px rgba(0,180,216,0.30)',
                  transform: 'scale(1.04)',
                },
              }}
            >
              <Image
                src="/images/wingapro.webp"
                alt="WingaPro"
                width={30}
                height={30}
                style={{
                  width: '78%',
                  height: '78%',
                  objectFit: 'contain',
                }}
              />
            </Box>
            <Typography
              sx={{
                fontSize: { xs: '1.05rem', sm: '1.15rem', md: '1.22rem' },
                fontWeight: 800,
                color: 'var(--navy)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              Winga
              <Box component="span" sx={{ color: 'var(--cyan)' }}>Pro</Box>
            </Typography>
          </Box>

          {/* ─── Desktop nav ─── */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 0.5, ml: 3, flexGrow: 1 }}>
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Button
                    key={link.href}
                    onClick={() => go(link.href)}
                    disableRipple
                    sx={{
                      position: 'relative',
                      color: active ? 'primary.main' : 'var(--text-muted)',
                      fontWeight: active ? 700 : 500,
                      px: 1.75,
                      py: 1,
                      fontSize: '0.92rem',
                      borderRadius: 2,
                      '&:hover': {
                        color: 'primary.main',
                        bgcolor: 'var(--navy-muted)',
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                );
              })}
            </Box>
          )}

          {/* ─── Desktop actions ─── */}
          {!isMobile ? (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <ThemeToggle />
              {isAuthenticated ? (
                <>
                  <Button onClick={() => go('/dashboard')} variant="outlined" size="medium">
                    Dashboard
                  </Button>
                  <Button onClick={handleLogout} variant="contained" size="medium">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => go('/login')}
                    disableRipple
                    sx={{
                      color: 'var(--text)',
                      fontWeight: 600,
                      '&:hover': { bgcolor: 'var(--navy-muted)' },
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => go('/register')}
                    variant="contained"
                    endIcon={<ArrowForwardRoundedIcon />}
                    className="btn-shine"
                    sx={{ px: 2.5 }}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </Box>
          ) : (
            /* ─── Mobile actions ─── */
            <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center' }}>
              <ThemeToggle size="small" />
              <IconButton
                onClick={() => setOpen(true)}
                sx={{
                  border: '1px solid var(--border)',
                  borderRadius: 2.5,
                  width: 40,
                  height: 40,
                  color: 'var(--navy)',
                  '&:hover': {
                    borderColor: 'var(--cyan)',
                    bgcolor: 'var(--cyan-muted)',
                  },
                }}
                aria-label="Open menu"
              >
                <MenuRoundedIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </Container>

      {/* ─── Mobile drawer ─── */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '85%', sm: 340 },
            maxWidth: 340,
            borderTopLeftRadius: 24,
            borderBottomLeftRadius: 24,
            bgcolor: 'var(--surface)',
            backgroundImage: 'none',
          },
        }}
        ModalProps={{ keepMounted: true }}
      >
        <Box
          sx={{
            p: { xs: 2.5, sm: 3 },
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {/* Drawer header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  bgcolor: 'var(--logo-circle-bg)',
                  border: '1px solid var(--logo-circle-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  src="/images/wingapro.webp"
                  alt="Wingapro"
                  width={24}
                  height={24}
                  style={{ width: '75%', height: '75%', objectFit: 'contain' }}
                />
              </Box>
              <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--navy)' }}>
                Menu
              </Typography>
            </Box>
            <IconButton
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              sx={{
                border: '1px solid var(--border)',
                width: 36,
                height: 36,
              }}
            >
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 1.5, borderColor: 'var(--border)' }} />

          {/* Nav links */}
          <List sx={{ py: 0, flexGrow: 1 }}>
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <ListItemButton
                  key={link.href}
                  onClick={() => go(link.href)}
                  sx={{
                    borderRadius: 2.5,
                    mb: 0.5,
                    py: 1.25,
                    color: active ? 'primary.main' : 'var(--text)',
                    bgcolor: active ? 'var(--navy-muted)' : 'transparent',
                    '&:hover': { bgcolor: 'var(--navy-muted)' },
                  }}
                >
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{
                      fontWeight: active ? 700 : 500,
                      fontSize: '0.98rem',
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>

          <Divider sx={{ my: 2, borderColor: 'var(--border)' }} />

          {/* Bottom actions */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            {isAuthenticated ? (
              <>
                <Button onClick={() => go('/dashboard')} variant="outlined" fullWidth size="large">
                  Dashboard
                </Button>
                <Button onClick={handleLogout} variant="contained" fullWidth size="large">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => go('/login')} variant="outlined" fullWidth size="large">
                  Login
                </Button>
                <Button
                  onClick={() => go('/register')}
                  variant="contained"
                  fullWidth
                  size="large"
                  endIcon={<ArrowForwardRoundedIcon />}
                >
                  Get Started
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
}