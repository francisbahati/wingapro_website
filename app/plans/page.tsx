// app/plans/page.tsx
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Container, Typography, Card, CardContent, Button, Chip, Skeleton, Alert } from '@mui/material';
import Navbar from '@/components/Navbar';

function PlansContent() {
  const searchParams = useSearchParams();
  const networkFilter = searchParams.get('network') || '';
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/packages`);
        const data = await res.json();
        let list = data.packages || data;
        if (networkFilter) list = list.filter((p: any) => p.network === networkFilter);
        setPackages(list);
      } catch (err) {
        setError('Failed to load packages');
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, [networkFilter]);

  if (loading) {
    return (
      <Box>
        <Navbar />
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h3" gutterBottom>Data Packages</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
            {[1,2,3].map((i) => (
              <Card key={i}>
                <CardContent><Skeleton width="60%" height={40} /></CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Navbar />
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Alert severity="error">{error}</Alert>
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => window.location.reload()}>Retry</Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" gutterBottom>Data Packages</Typography>
        {networkFilter && <Chip label={`Network: ${networkFilter}`} onDelete={() => window.history.back()} sx={{ mb: 2 }} />}
        {packages.length === 0 ? (
          <Typography variant="body1">No packages available.</Typography>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
            {packages.map((pkg) => (
              <Card key={pkg.id}>
                <CardContent>
                  <Typography variant="h6">{pkg.name}</Typography>
                  <Typography variant="body2">{pkg.network} • {pkg.dataSize} • {pkg.validity}</Typography>
                  <Typography variant="h5" sx={{ my: 1 }}>TZS {pkg.price.toLocaleString()}</Typography>
                  <Button variant="contained" href="/login">Buy Now</Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default function PlansPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlansContent />
    </Suspense>
  );
}