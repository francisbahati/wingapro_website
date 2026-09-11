// app/(auth)/layout.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';

const DRAWER_WIDTH = 248;

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const navItems = [
    { text: 'Dashboard',     icon: <DashboardIcon />,              href: '/dashboard' },
    { text: 'Orders',        icon: <ShoppingCartIcon />,           href: '/orders' },
    { text: 'Buy Data',      icon: <AddShoppingCartIcon />,        href: '/packages' },
    { text: 'Wallet',        icon: <AccountBalanceWalletIcon />,   href: '/wallet' },
    { text: 'Promotions',    icon: <LocalOfferIcon />,             href: '/promotions' },
    { text: 'Support',       icon: <SupportAgentIcon />,           href: '/support' },
    { text: 'Notifications', icon: <NotificationsIcon />,          href: '/notifications' },
    { text: 'Profile',       icon: <PersonIcon />,                 href: '/profile' },
    ...(user?.role === 'admin'
      ? [
          { text: 'Users',   icon: <PeopleIcon />, href: '/users' },
          { text: 'Reports', icon: <BarChartIcon />, href: '/reports' },
        ]
      : []),
    { text: 'Settings', icon: <SettingsIcon />, href: '/settings' },
  ];

  const handleNavClick = (href: string) => {
    router.push(href);
    setMobileOpen(false);
  };

  const drawer = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'var(--surface)',
        backgroundImage: 'none',
      }}
    >
      <Box
        onClick={() => handleNavClick('/dashboard')}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,
          p: 2.5,
          cursor: 'pointer',
        }}
      >
        {/* White circle logo */}
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            bgcolor: 'var(--logo-circle-bg)',
            border: '1px solid var(--logo-circle-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(10,46,92,0.08)',
          }}
        >
          <Image
            src="/images/wingapro.webp"
            alt="WingaPro"
            width={26}
            height={26}
            style={{ width: '78%', height: '78%', objectFit: 'contain' }}
          />
        </Box>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: '1.05rem',
            color: 'var(--navy)',
            letterSpacing: '-0.02em',
          }}
        >
          Winga
          <Box component="span" sx={{ color: 'var(--cyan)' }}>
            Pro
          </Box>
        </Typography>
      </Box>

      <Divider sx={{ borderColor: 'var(--border)' }} />

      <List sx={{ py: 1.5, flexGrow: 1 }}>
        {navItems.map((item) => {
          const selected =
            pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <ListItemButton
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              selected={selected}
              sx={{
                mx: 1,
                borderRadius: 2,
                color: selected ? 'var(--navy)' : 'var(--text-muted)',
                '&.Mui-selected': {
                  bgcolor: 'var(--navy-muted)',
                  color: 'var(--navy)',
                  '&:hover': { bgcolor: 'var(--navy-muted)' },
                },
                '&:hover': { bgcolor: 'var(--navy-muted)' },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                slotProps={{ primary: { sx: { fontSize: '0.9rem', fontWeight: 500 } } }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Divider sx={{ borderColor: 'var(--border)' }} />

      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          v1.0.0
        </Typography>
      </Box>
    </Box>
  );

  const currentTitle =
    navItems.find((n) => pathname.startsWith(n.href))?.text ?? 'Dashboard';

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'var(--bg)' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          bgcolor: 'var(--navbar-bg-scrolled)',
          backdropFilter: 'saturate(180%) blur(12px)',
          WebkitBackdropFilter: 'saturate(180%) blur(12px)',
          color: 'var(--text)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              onClick={() => setMobileOpen(true)}
              sx={{ mr: 1, color: 'var(--navy)' }}
              aria-label="Open navigation"
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography sx={{ flexGrow: 1, fontWeight: 700, color: 'var(--navy)' }}>
            {currentTitle}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <ThemeToggle size="small" />
            <IconButton
              onClick={(e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)}
              aria-label="Open user menu"
            >
              <Avatar
                sx={{
                  bgcolor: 'var(--navy)',
                  color: '#fff',
                  width: 34,
                  height: 34,
                  fontSize: 14,
                }}
              >
                {user?.username?.charAt(0).toUpperCase() ?? 'U'}
              </Avatar>
            </IconButton>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                bgcolor: 'var(--surface)',
                border: '1px solid var(--border)',
              },
            }}
          >
            <MenuItem disabled>
              <Typography sx={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                {user?.email}
              </Typography>
            </MenuItem>
            <Divider sx={{ borderColor: 'var(--border)' }} />
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                logout();
              }}
            >
              <ListItemIcon>
                <LogoutIcon fontSize="small" sx={{ color: 'var(--error)' }} />
              </ListItemIcon>
              <Typography sx={{ color: 'var(--error)' }}>Logout</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              bgcolor: 'var(--surface)',
              backgroundImage: 'none',
              borderRight: '1px solid var(--border)',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              bgcolor: 'var(--surface)',
              backgroundImage: 'none',
              borderRight: '1px solid var(--border)',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: 8,
          minHeight: 'calc(100vh - 64px)',
          bgcolor: 'var(--bg)',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}