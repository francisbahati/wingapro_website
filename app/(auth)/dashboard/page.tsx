'use client';

import { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, TextField, Button, Avatar, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
  MenuItem, Select, FormControl, InputLabel, Stack,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import apiClient from '@/lib/api/client';
import { AxiosError } from 'axios';
import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import SecurityIcon from '@mui/icons-material/Security';
import BoltIcon from '@mui/icons-material/Bolt';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const PRIMARY = '#0A2E5C';

export default function DashboardPage() {
  useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('All');
  const [filterOpen, setFilterOpen] = useState(false);
  const [username, setUsername] = useState('User');
  const [walletBalance, setWalletBalance] = useState(0);
  const [promotions, setPromotions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const networks = [
    { name: 'Halotel', logo: '/images/halotel.webp' },
    { name: 'Tigo', logo: '/images/yas.webp' },
    { name: 'Vodacom', logo: '/images/vodacom.webp' },
    { name: 'Airtel', logo: '/images/airtel.webp' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await apiClient.get('/users/profile');
        setUsername(profileRes.data.user.username || 'User');
        setWalletBalance(profileRes.data.user.wallet_balance || 0);
        const promoRes = await apiClient.get('/promotions');
        setPromotions(promoRes.data.promotions || []);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      if (selectedNetwork !== 'All') params.set('network', selectedNetwork);
      router.push(`/packages?${params.toString()}`);
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
        Welcome back, {username} 👋
      </Typography>

      {/* Wallet Summary */}
      <Card sx={{ mb: 3, background: `linear-gradient(45deg, ${PRIMARY} 30%, #1a3a5c 90%)`, color: 'white', borderRadius: 3 }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3 }}>
          <Box>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>Wallet Balance</Typography>
            <Typography variant="h3" sx={{ fontWeight: 800 }}>TZS {walletBalance.toLocaleString()}</Typography>
            <Button variant="contained" sx={{ mt: 2, bgcolor: 'white', color: PRIMARY }} onClick={() => router.push('/deposit-withdraw')}>
              Deposit / Withdraw
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Image src="/images/wallet.png" alt="Wallet" width={150} height={100} />
          </Box>
        </CardContent>
      </Card>

      {/* Search & Filter */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          placeholder="Search packages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          fullWidth
          size="medium"
          sx={{ bgcolor: 'white', borderRadius: 2 }}
          slotProps={{ input: { endAdornment: <IconButton onClick={handleSearch}><SearchIcon /></IconButton> } }}
        />
        <Button variant="contained" sx={{ bgcolor: PRIMARY, minWidth: 48 }} onClick={() => setFilterOpen(true)}>
          <TuneIcon />
        </Button>
      </Box>

      {/* Trust Strip */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around', bgcolor: 'white', borderRadius: 3, p: 2, mb: 4, boxShadow: 1 }}>
        {[
          { icon: <SecurityIcon />, label: 'Secure' },
          { icon: <BoltIcon />, label: 'Instant' },
          { icon: <VerifiedUserIcon />, label: 'Verified' },
          { icon: <SupportAgentIcon />, label: '24/7' },
          { icon: <TrendingUpIcon />, label: 'Best Prices' },
        ].map((item, idx) => (
          <Box key={idx} sx={{ textAlign: 'center', '& svg': { color: PRIMARY, fontSize: 32 } }}>
            {item.icon}
            <Typography variant="caption" sx={{ display: 'block' }}>{item.label}</Typography>
          </Box>
        ))}
      </Box>

      {/* Networks */}
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Choose Your Network</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }, gap: 2, mb: 4 }}>
        {networks.map((net) => (
          <Card key={net.name} onClick={() => router.push(`/packages?network=${net.name}`)} sx={{ cursor: 'pointer', '&:hover': { transform: 'scale(1.03)', boxShadow: 4 }, transition: '0.3s' }}>
            <CardContent sx={{ textAlign: 'center', p: 2 }}>
              <Image src={net.logo} alt={net.name} width={100} height={60} style={{ objectFit: 'contain' }} unoptimized />
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{net.name}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Promotions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Active Promotions</Typography>
        <Button variant="text" sx={{ color: PRIMARY }} onClick={() => router.push('/promotions')}>See All</Button>
      </Box>
      {promotions.length === 0 ? (
        <Typography color="text.secondary">No active promotions at the moment.</Typography>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
          {promotions.slice(0, 3).map((promo) => (
            <Card key={promo.id} sx={{ p: 2, borderLeft: 4, borderColor: PRIMARY, '&:hover': { boxShadow: 4 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{promo.title}</Typography>
              <Typography variant="body2" color="text.secondary">{promo.description}</Typography>
              {promo.discount && <Chip label={`-${promo.discount}% OFF`} color="success" size="small" sx={{ mt: 1 }} />}
              <Button size="small" variant="contained" sx={{ mt: 2, bgcolor: PRIMARY }} onClick={() => router.push('/promotions')}>View Deal</Button>
            </Card>
          ))}
        </Box>
      )}

      {/* Filter Modal */}
      <Dialog open={filterOpen} onClose={() => setFilterOpen(false)}>
        <DialogTitle>Filter Packages</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 1, mb: 2 }}>
            <InputLabel>Network</InputLabel>
            <Select value={selectedNetwork} label="Network" onChange={(e) => setSelectedNetwork(e.target.value)}>
              <MenuItem value="All">All</MenuItem>
              {networks.map((n) => <MenuItem key={n.name} value={n.name}>{n.name}</MenuItem>)}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFilterOpen(false)}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: PRIMARY }} onClick={() => { setFilterOpen(false); handleSearch(); }}>Apply</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}