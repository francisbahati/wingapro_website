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
        if (networkFilter) list = list.filter((p) => p.network === networkFilter);
        setPackages(list);
      } catch {
        setError('Failed to load packages');
      } finally {
        setLoading(false);
      }
    })();
  }, [networkFilter]);

  return (
    <Box sx={{ bgcolor: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        <Typography
          component="h1"
          align="center"
          sx={{ mb: 1.5, color: 'var(--navy)', fontWeight: 800 }}
        >
          Data{' '}
          <Box component="span" sx={{ color: 'var(--cyan)' }}>
            Packages
          </Box>
        </Typography>
        <Typography
          align="center"
          sx={{ mb: 5, maxWidth: 640, mx: 'auto', color: 'var(--text-muted)' }}
        >
          Choose your network and find the perfect plan.
        </Typography>

        {networkFilter && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Chip
              label={`Network: ${networkFilter}`}
              onDelete={() => router.push('/plans')}
              sx={{
                bgcolor: 'var(--navy)',
                color: '#fff',
                fontWeight: 600,
                '& .MuiChip-deleteIcon': { color: 'rgba(255,255,255,0.7)' },
              }}
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
          <Typography align="center" sx={{ py: 8, color: 'var(--text-muted)' }}>
            No packages available.
          </Typography>
        )}

        {!loading && !error && packages.length > 0 && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
              gap: 3,
            }}
          >
            {packages.map((pkg) => (
              <Card
                key={pkg.id}
                className="lift"
                sx={{
                  borderRadius: 4,
                  height: '100%',
                  bgcolor: 'var(--surface)',
                  border: '1px solid var(--border)',
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Chip
                    label={pkg.network}
                    size="small"
                    sx={{
                      bgcolor: 'var(--navy)',
                      color: '#fff',
                      fontWeight: 600,
                      mb: 2,
                    }}
                  />
                  <Typography sx={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy)' }}>
                    {pkg.name}
                  </Typography>
                  <Typography sx={{ fontSize: '0.85rem', color: 'var(--text-muted)', my: 1 }}>
                    {pkg.dataSize} • {pkg.validity}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      color: 'var(--navy)',
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            py: 12,
            bgcolor: 'var(--bg)',
            minHeight: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      }
    >
      <PlansContent />
    </Suspense>
  );
}