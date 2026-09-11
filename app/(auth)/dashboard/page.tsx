// app/(auth)/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Typography,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import apiClient from '@/lib/api/client';
import { useAuth } from '@/context/AuthContext';
import { brand } from '@/theme-provider';

const NETWORKS = [
  { name: 'Halotel', logo: '/images/halotel.webp' },
  { name: 'Tigo', logo: '/images/yas.webp' },
  { name: 'Vodacom', logo: '/images/vodacom.webp' },
  { name: 'Airtel', logo: '/images/airtel.webp' },
];

const TRUST = [
  { icon: <SecurityRoundedIcon />, label: 'Secure' },
  { icon: <BoltRoundedIcon />, label: 'Instant' },
  { icon: <VerifiedUserRoundedIcon />, label: 'Verified' },
  { icon: <SupportAgentRoundedIcon />, label: '24/7' },
  { icon: <TrendingUpRoundedIcon />, label: 'Best Value' },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [promotions, setPromotions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [p, promo] = await Promise.all([
          apiClient.get('/users/profile'),
          apiClient.get('/promotions'),
        ]);
        setProfile(p.data.user);
        setPromotions(promo.data.promotions ?? []);
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  const balance = Number(profile?.wallet_balance ?? 0);
  const username = profile?.username ?? user?.username ?? 'User';

  return (
    <Box>
      {/* Greeting */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 3,
        }}
      >
        <Avatar sx={{ bgcolor: brand.navy, width: 48, height: 48, fontWeight: 700 }}>
          {username.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Welcome back, {username} 👋
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Here's what's happening with your account
          </Typography>
        </Box>
      </Box>

      {/* Wallet + trust grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          gap: 3,
          mb: 3,
        }}
      >
        {/* Wallet Card */}
        <Card
          sx={{
            border: 'none',
            color: '#fff',
            background: `linear-gradient(135deg, ${brand.navy} 0%, ${brand.navyLight} 55%, ${brand.cyan} 140%)`,
            boxShadow: '0 20px 40px rgba(10,46,92,0.28)',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography
              variant="caption"
              sx={{
                opacity: 0.85,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Wallet Balance
            </Typography>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, my: 1, letterSpacing: '-0.02em' }}
            >
              TZS {balance.toLocaleString()}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                onClick={() => router.push('/deposit-withdraw')}
                startIcon={<AddRoundedIcon />}
                sx={{
                  bgcolor: '#fff',
                  color: brand.navy,
                  '&:hover': { bgcolor: '#F1F5F9' },
                }}
              >
                Deposit
              </Button>
              <Button
                onClick={() => router.push('/packages')}
                sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.6)' }}
                variant="outlined"
                endIcon={<ArrowForwardRoundedIcon />}
              >
                Buy Data
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Trust Strip */}
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography sx={{ fontWeight: 700, fontSize: '0.875rem', mb: 1.5 }}>
              Why WingaPro
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
              {TRUST.map((t) => (
                <Box
                  key={t.label}
                  sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: 'rgba(0,180,216,0.12)',
                      color: brand.navy,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {t.icon}
                  </Box>
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                    {t.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Networks */}
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
        Choose Your Network
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
          gap: 2,
          mb: 3,
        }}
      >
        {NETWORKS.map((n) => (
          <Card
            key={n.name}
            onClick={() => router.push(`/packages?network=${n.name}`)}
            className="lift"
            sx={{
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            <CardContent>
              <Box
                sx={{
                  height: 70,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 1,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={n.logo}
                  alt={n.name}
                  style={{ maxHeight: 60, maxWidth: '100%', objectFit: 'contain' }}
                />
              </Box>
              <Typography sx={{ fontWeight: 700 }}>{n.name}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Promotions */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1.5,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Active Promotions
        </Typography>
        <Button
          onClick={() => router.push('/promotions')}
          endIcon={<ArrowForwardRoundedIcon />}
        >
          See All
        </Button>
      </Box>
      {promotions.length === 0 ? (
        <Typography color="text.secondary">No active promotions right now.</Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 2,
          }}
        >
          {promotions.slice(0, 3).map((promo) => (
            <Card key={promo.id} className="lift">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Chip label={`${promo.discount ?? 0}% OFF`} color="success" size="small" />
                </Box>
                <Typography sx={{ fontWeight: 700 }}>{promo.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                  {promo.description}
                </Typography>
                <Button
                  onClick={() => router.push('/promotions')}
                  size="small"
                  variant="contained"
                >
                  View Deal
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}