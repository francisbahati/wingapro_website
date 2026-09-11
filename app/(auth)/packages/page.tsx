// app/(auth)/packages/page.tsx
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Skeleton,
} from '@mui/material';
import apiClient from '@/lib/api/client';
import { AxiosError } from 'axios';

interface Package {
  id: number;
  name: string;
  network: string;
  dataSize: string;
  validity: string;
  price: number;
  description?: string;
}

function PackagesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const networkFilter = searchParams.get('network') || '';
  const searchQuery = searchParams.get('search') || '';
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : null;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null;

  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [buyDialogOpen, setBuyDialogOpen] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await apiClient.get('/packages');
        let data = res.data.packages || [];
        if (networkFilter) data = data.filter((p: Package) => p.network === networkFilter);
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          data = data.filter(
            (p: Package) =>
              p.name.toLowerCase().includes(q) ||
              p.network.toLowerCase().includes(q) ||
              p.price.toString().includes(q)
          );
        }
        if (minPrice !== null) data = data.filter((p: Package) => p.price >= minPrice);
        if (maxPrice !== null) data = data.filter((p: Package) => p.price <= maxPrice);
        setPackages(data);
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err.response?.data?.message || 'Failed to load packages');
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, [networkFilter, searchQuery, minPrice, maxPrice]);

  const handleBuy = (pkg: Package) => {
    setSelectedPackage(pkg);
    setBuyDialogOpen(true);
  };

  const handleConfirmPurchase = async () => {
    if (!recipientName.trim() || !recipientPhone.trim()) {
      alert('Please fill in recipient details');
      return;
    }
    setSubmitting(true);
    try {
      await apiClient.post('/purchase', {
        packageId: selectedPackage?.id,
        recipientName,
        recipientPhone,
        network: selectedPackage?.network,
      });
      router.push('/orders');
    } catch (err) {
      if (err instanceof AxiosError) {
        alert(err.response?.data?.message || 'Purchase failed');
      } else {
        alert('An unexpected error occurred');
      }
    } finally {
      setSubmitting(false);
      setBuyDialogOpen(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            sx={{ mb: 2, bgcolor: 'var(--surface)', border: '1px solid var(--border)' }}
          >
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
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Alert severity="error">{error}</Alert>
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          sx={{ mt: 2 }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, bgcolor: 'var(--bg)', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: 'var(--navy)' }}>
        {networkFilter ? `${networkFilter} Packages` : 'All Packages'}
      </Typography>
      {packages.length === 0 ? (
        <Typography variant="body1" sx={{ color: 'var(--text-muted)' }}>
          No packages match your criteria.
        </Typography>
      ) : (
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
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                bgcolor: 'var(--surface)',
                border: '1px solid var(--border)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 20px 40px rgba(15,23,42,0.12)',
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Chip
                  label={pkg.network}
                  size="small"
                  sx={{ bgcolor: 'var(--navy)', color: 'white', mb: 1 }}
                />
                <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: 'var(--navy)' }}>
                  {pkg.name}
                </Typography>
                <Typography variant="body2" sx={{ my: 1, color: 'var(--text-muted)' }}>
                  {pkg.dataSize} • {pkg.validity}
                </Typography>
                {pkg.description && (
                  <Typography variant="body2" sx={{ mb: 1, color: 'var(--text-muted)' }}>
                    {pkg.description}
                  </Typography>
                )}
                <Typography variant="h5" sx={{ fontWeight: 800, color: 'var(--navy)', mt: 2 }}>
                  TZS {pkg.price.toLocaleString()}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button fullWidth variant="contained" onClick={() => handleBuy(pkg)}>
                  Buy Now
                </Button>
              </Box>
            </Card>
          ))}
        </Box>
      )}

      <Dialog
        open={buyDialogOpen}
        onClose={() => setBuyDialogOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: 'var(--surface)',
            border: '1px solid var(--border)',
            backgroundImage: 'none',
          },
        }}
      >
        <DialogTitle sx={{ color: 'var(--navy)', fontWeight: 700 }}>
          Confirm Purchase
        </DialogTitle>
        <DialogContent>
          {selectedPackage && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'var(--text)' }}>
                {selectedPackage.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>
                Network: {selectedPackage.network}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>
                Data: {selectedPackage.dataSize}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>
                Validity: {selectedPackage.validity}
              </Typography>
              <Typography variant="h6" sx={{ mt: 1, color: 'var(--navy)' }}>
                TZS {selectedPackage.price.toLocaleString()}
              </Typography>
            </Box>
          )}
          <TextField
            label="Recipient Name"
            fullWidth
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Recipient Phone (10 digits)"
            fullWidth
            value={recipientPhone}
            onChange={(e) => setRecipientPhone(e.target.value)}
            placeholder="e.g., 0712345678"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBuyDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            disabled={submitting}
            onClick={handleConfirmPurchase}
          >
            {submitting ? <CircularProgress size={24} color="inherit" /> : 'Buy Now'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default function PackagesPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ p: 3, textAlign: 'center', bgcolor: 'var(--bg)', minHeight: '100vh' }}>
          <CircularProgress />
        </Box>
      }
    >
      <PackagesContent />
    </Suspense>
  );
}