'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Alert,
  Skeleton,
  Divider,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api/client';
import { AxiosError } from 'axios';

const PRIMARY = '#0A2E5C';

interface Promotion {
  id: number;
  title: string;
  description: string;
  discount?: number;
  validUntil?: string;
  Package?: {
    id: number;
    name: string;
    network: string;
    dataSize: string;
    validity: string;
    displayPrice: number;
  };
}

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const res = await apiClient.get('/promotions');
        setPromotions(res.data.promotions || []);
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err.response?.data?.message || 'Failed to load promotions');
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPromotions();
  }, []);

  const handleBuy = (pkg: Promotion['Package']) => {
    if (pkg) {
      router.push(`/packages?search=${pkg.name}`);
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        {[1, 2, 3].map((i) => (
          <Card key={i} sx={{ mb: 2 }}>
            <CardContent>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="rectangular" height={40} />
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
        <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Offers & Promotions
      </Typography>
      {promotions.length === 0 ? (
        <Typography color="text.secondary">No active promotions at the moment.</Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 3,
          }}
        >
          {promotions.map((promo) => (
            <Card key={promo.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Chip label={`${promo.discount || 0}% OFF`} color="success" size="small" />
                  {promo.validUntil && (
                    <Typography variant="caption" color="text.secondary">
                      Valid until {new Date(promo.validUntil).toLocaleDateString()}
                    </Typography>
                  )}
                </Box>
                <Typography variant="h6" component="div">
                  {promo.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {promo.description}
                </Typography>
                {promo.Package && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2">
                      <strong>Package:</strong> {promo.Package.name}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Network:</strong> {promo.Package.network}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Data:</strong> {promo.Package.dataSize}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Validity:</strong> {promo.Package.validity}
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 1, color: PRIMARY }}>
                      TZS {promo.Package.displayPrice}
                    </Typography>
                  </>
                )}
              </CardContent>
              {promo.Package && (
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ bgcolor: PRIMARY }}
                    onClick={() => handleBuy(promo.Package)}
                  >
                    Buy Now
                  </Button>
                </Box>
              )}
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}