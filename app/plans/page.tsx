// app/plans/page.tsx
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { brand } from '@/theme-provider';

interface Plan {
  id: number;
  name: string;
  network: string;
  dataSize: string;
  validity: string;
  price: number;
  description?: string;
}

function PlansContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const networkFilter = searchParams.get('network') || '';

  const [packages, setPackages] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/packages`);
        const data = await res.json();
        let list: Plan[] = data.packages || data || [];
        if (networkFilter) {
          list = list.filter((p) => p.network === networkFilter);
        }
        setPackages(list);
      } catch {
        setError('Failed to load packages');
      } finally {
        setLoading(false);
      }
    })();
  }, [networkFilter]);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        <Typography component="h1" align="center" sx={{ mb: 1.5 }}>
          Data{' '}
          <Box component="span" sx={{ color: brand.cyan }}>
            Packages
          </Box>
        </Typography>
        <Typography
          align="center"
          color="text.secondary"
          sx={{ mb: 5, maxWidth: 640, mx: 'auto' }}
        >
          Choose your network and find the perfect plan.
        </Typography>

        {networkFilter && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Chip
              label={`Network: ${networkFilter}`}
              onDelete={() => router.push('/plans')}
              sx={{ bgcolor: brand.navy, color: '#fff', fontWeight: 600 }}
            />
          </Box>
        )}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress />
          </Box>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && packages.length === 0 && (
          <Typography align="center" color="text.secondary" sx={{ py: 8 }}>
            No packages available.
          </Typography>
        )}

        {!loading && !error && packages.length > 0 && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                md: '1fr 1fr 1fr',
              },
              gap: 3,
            }}
          >
            {packages.map((pkg) => (
              <Card key={pkg.id} className="lift" sx={{ borderRadius: 4, height: '100%' }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Chip
                    label={pkg.network}
                    size="small"
                    sx={{
                      bgcolor: brand.navy,
                      color: '#fff',
                      fontWeight: 600,
                      mb: 2,
                    }}
                  />
                  <Typography
                    sx={{ fontSize: '1.15rem', fontWeight: 700, color: brand.navy }}
                  >
                    {pkg.name}
                  </Typography>
                  <Typography
                    sx={{ fontSize: '0.85rem', color: 'text.secondary', my: 1 }}
                  >
                    {pkg.dataSize} • {pkg.validity}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      color: brand.navy,
                      my: 2,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    TZS {Number(pkg.price).toLocaleString()}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => router.push('/login')}
                  >
                    Buy Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>

      <Footer />
    </Box>
  );
}

export default function PlansPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
          <CircularProgress />
        </Box>
      }
    >
      <PlansContent />
    </Suspense>
  );
}