// app/(auth)/layout.tsx
'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import {
  Dashboard as DashboardIcon,
  ShoppingCart as OrdersIcon,
  Inventory2 as ProductsIcon,
  People as UsersIcon,
  BarChart as ReportsIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  AccountBalanceWallet as WalletIcon,
  AddShoppingCart as BuyIcon,
  Notifications as NotificationsIcon,
  SupportAgent as SupportIcon,
  LocalOffer as OffersIcon,
  Person as ProfileIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, href: '/dashboard' },
    { text: 'Orders', icon: <OrdersIcon />, href: '/orders' },
    { text: 'Products', icon: <ProductsIcon />, href: '/products' },
    { text: 'Wallet', icon: <WalletIcon />, href: '/wallet' },
    { text: 'Buy Data', icon: <BuyIcon />, href: '/packages' },
    { text: 'Promotions', icon: <OffersIcon />, href: '/promotions' },
    { text: 'Support', icon: <SupportIcon />, href: '/support' },
    { text: 'Notifications', icon: <NotificationsIcon />, href: '/notifications' },
    { text: 'Profile', icon: <ProfileIcon />, href: '/profile' },
    ...(user?.role === 'admin' ? [{ text: 'Users', icon: <UsersIcon />, href: '/users' }] : []),
    { text: 'Reports', icon: <ReportsIcon />, href: '/reports' },
    { text: 'Settings', icon: <SettingsIcon />, href: '/settings' },
  ];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    logout();
  };

  const drawerContent = (
    <div>
      <Box sx={{ py: 2, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Winga<span style={{ color: '#00b4d8' }}>Pro</span>
        </Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              href={item.href}
              selected={pathname === item.href}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(0, 180, 216, 0.1)',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 180, 216, 0.2)',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'primary.main',
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            WingaPro Dashboard
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} sx={{ p: 0 }}>
              <Avatar alt={user?.username} src="/images/avatar.png">
                {user?.username?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
            >
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}