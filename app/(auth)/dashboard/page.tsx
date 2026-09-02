'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import apiClient from '@/lib/api/client';
import { AxiosError } from 'axios';
import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import LockIcon from '@mui/icons-material/Lock';
import VerifiedIcon from '@mui/icons-material/Verified';
import HeadsetIcon from '@mui/icons-material/Headset';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const PRIMARY = '#0A2E5C';
const BACKGROUND = '#F8FAFC';

interface Network {
  name: string;
  logo: string;
}

interface Promotion {
  id: number;
  title: string;
  description: string;
  discount?: number;
  validUntil?: string;
  Package?: {
    name: string;
    displayPrice: number;
  };
}

export default function DashboardPage() {
  // We don't need the user variable here, so just call useAuth() without destructuring
  useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('All');
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const [username, setUsername] = useState('User');
  const [phone, setPhone] = useState('Not provided');
  const [walletBalance, setWalletBalance] = useState(0);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const networks: Network[] = [
    { name: 'Halotel', logo: '/images/halotel.webp' },
    { name: 'Tigo', logo: '/images/yas.webp' },
    { name: 'Vodacom', logo: '/images/vodacom.webp' },
    { name: 'Airtel', logo: '/images/airtel.webp' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await apiClient.get('/users/profile');
        const userData = profileRes.data.user;
        setUsername(userData.username || 'User');
        setPhone(userData.phone || 'Not provided');
        setWalletBalance(userData.wallet_balance || 0);

        const promoRes = await apiClient.get('/promotions');
        setPromotions(promoRes.data.promotions || []);
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err.response?.data?.message || 'Failed to load data');
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      if (selectedNetwork !== 'All') params.set('network', selectedNetwork);
      if (minPrice !== null) params.set('minPrice', minPrice.toString());
      if (maxPrice !== null) params.set('maxPrice', maxPrice.toString());
      router.push(`/packages?${params.toString()}`);
    }
  };

  const handleFilterApply = () => {
    setFilterOpen(false);
    handleSearch();
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
        <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: BACKGROUND, minHeight: '100vh', p: { xs: 2, md: 3 } }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar sx={{ bgcolor: PRIMARY, width: 48, height: 48 }}>
          {username.charAt(0).toUpperCase()}
        </Avatar>
        <Box sx={{ ml: 2, flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Welcome back, {username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {phone}
          </Typography>
        </Box>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
      </Box>

      {/* Search & Filter */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <TextField
          placeholder="Search packages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          fullWidth
          size="medium"
          sx={{ bgcolor: 'white', borderRadius: 2 }}
          slotProps={{
            input: {
              endAdornment: (
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              ),
            },
          }}
        />
        <Button
          variant="contained"
          sx={{ bgcolor: PRIMARY, minWidth: 48, borderRadius: 2 }}
          onClick={() => setFilterOpen(true)}
        >
          <TuneIcon sx={{ color: 'white' }} />
        </Button>
      </Box>

      {/* Banner Carousel (placeholder) */}
      <Box sx={{ height: 200, bgcolor: PRIMARY, borderRadius: 3, mb: 3, p: 3, color: 'white' }}>
        <Typography variant="h5">Special Offers</Typography>
        <Typography variant="body2">Wallet Balance: TZS {walletBalance.toLocaleString()}</Typography>
        <Button variant="contained" sx={{ mt: 2, bgcolor: 'white', color: PRIMARY }}>
          View Details
        </Button>
      </Box>

      {/* Trust Strip */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          bgcolor: 'white',
          borderRadius: 3,
          p: 1.5,
          mb: 3,
          boxShadow: 1,
        }}
      >
        {[
          { icon: <SecurityIcon />, label: 'Trusted' },
          { icon: <LockIcon />, label: 'Secure' },
          { icon: <VerifiedIcon />, label: 'Verified' },
          { icon: <HeadsetIcon />, label: '24/7 Support' },
          { icon: <TrendingUpIcon />, label: 'Best Value' },
        ].map((item, idx) => (
          <Box key={idx} sx={{ textAlign: 'center' }}>
            <Box sx={{ color: PRIMARY }}>{item.icon}</Box>
            <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Networks */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Available Networks
        </Typography>
        <Button
          variant="text"
          sx={{ color: PRIMARY }}
          onClick={() => router.push('/packages')}
        >
          See All
        </Button>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 4 }}>
        {networks.map((net) => (
          <Card
            key={net.name}
            sx={{
              cursor: 'pointer',
              '&:hover': { boxShadow: 4 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 100,
            }}
            onClick={() => {
              setSelectedNetwork(net.name);
              router.push(`/packages?network=${net.name}`);
            }}
          >
            <CardContent>
              <Image
                src={net.logo}
                alt={net.name}
                width={100}
                height={60}
                style={{ objectFit: 'contain' }}
                unoptimized
              />
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Promotions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Active Promotions
        </Typography>
        <Button
          variant="text"
          sx={{ color: PRIMARY }}
          onClick={() => router.push('/promotions')}
        >
          See All
        </Button>
      </Box>
      {promotions.length === 0 ? (
        <Typography color="text.secondary">No active promotions at the moment.</Typography>
      ) : (
        promotions.slice(0, 3).map((promo) => (
          <Card key={promo.id} sx={{ mb: 2, p: 2, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {promo.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {promo.description}
              </Typography>
              {promo.discount && (
                <Chip label={`-${promo.discount}% OFF`} size="small" sx={{ mt: 1, bgcolor: PRIMARY, color: 'white' }} />
              )}
              {promo.Package && (
                <Typography variant="body2" color="text.secondary">
                  {promo.Package.name} · TZS {promo.Package.displayPrice}
                </Typography>
              )}
              {promo.validUntil && (
                <Typography variant="caption" color="text.secondary">
                  Valid until {new Date(promo.validUntil).toLocaleDateString()}
                </Typography>
              )}
            </Box>
            <IconButton onClick={() => router.push('/promotions')}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Card>
        ))
      )}

      {/* Filter Modal */}
      <Dialog open={filterOpen} onClose={() => setFilterOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Filter Packages</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 1, mb: 2 }}>
            <InputLabel>Network</InputLabel>
            <Select
              value={selectedNetwork}
              label="Network"
              onChange={(e) => setSelectedNetwork(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              {networks.map((n) => (
                <MenuItem key={n.name} value={n.name}>{n.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Min Price (TZS)"
            type="number"
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : null)}
          />
          <TextField
            label="Max Price (TZS)"
            type="number"
            fullWidth
            onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : null)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setSelectedNetwork('All'); setMinPrice(null); setMaxPrice(null); }}>
            Clear All
          </Button>
          <Button variant="contained" sx={{ bgcolor: PRIMARY }} onClick={handleFilterApply}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}