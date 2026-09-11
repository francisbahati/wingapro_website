// app/components/Navbar.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '@/context/AuthContext';
import { brand } from '@/theme-provider';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Packages', href: '/plans' },
  { label: 'About', href: '/about' },
  { label: 'Download', href: '/download' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);

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
        bgcolor: 'rgba(255,255,255,0.85)',
        backdropFilter: 'saturate(180%) blur(12px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 68 }}>
          {/* Logo */}
          <Box
            onClick={() => go('/')}
            sx={{ display: 'flex', alignItems: 'center', gap: 1.25, cursor: 'pointer' }}
          >
            <Image src="/images/wingapro.webp" alt="WingaPro" width={34} height={34} />
            <Typography
              sx={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: brand.navy,
                letterSpacing: '-0.02em',
              }}
            >
              Winga
              <Box component="span" sx={{ color: brand.cyan }}>
                Pro
              </Box>
            </Typography>
          </Box>

          {/* Desktop nav */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 0.5, ml: 4, flexGrow: 1 }}>
              {NAV_LINKS.map((link) => (
                <Button
                  key={link.href}
                  onClick={() => go(link.href)}
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 500,
                    '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Desktop actions */}
          {!isMobile ? (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {isAuthenticated ? (
                <>
                  <Button onClick={() => go('/dashboard')} variant="outlined" size="small">
                    Dashboard
                  </Button>
                  <Button onClick={handleLogout} variant="contained" size="small">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => go('/login')} variant="text" size="small">
                    Login
                  </Button>
                  <Button onClick={() => go('/register')} variant="contained" size="small">
                    Get Started
                  </Button>
                </>
              )}
            </Box>
          ) : (
            <IconButton
              onClick={() => setOpen(true)}
              sx={{ ml: 'auto' }}
              aria-label="Open menu"
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {/* Mobile drawer */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 280, p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>Menu</Typography>
            <IconButton onClick={() => setOpen(false)} aria-label="Close menu">
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {NAV_LINKS.map((link) => (
              <ListItemButton key={link.href} onClick={() => go(link.href)}>
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}
          </List>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
            {isAuthenticated ? (
              <>
                <Button onClick={() => go('/dashboard')} variant="outlined" fullWidth>
                  Dashboard
                </Button>
                <Button onClick={handleLogout} variant="contained" fullWidth>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => go('/login')} variant="outlined" fullWidth>
                  Login
                </Button>
                <Button onClick={() => go('/register')} variant="contained" fullWidth>
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