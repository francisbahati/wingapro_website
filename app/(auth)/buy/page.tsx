'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Chip,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api/client';

interface Package {
  id: number;
  name: string;
  dataSize: string;
  validity: string;
  price: number;
  network: string;
}

const steps = ['Select Package', 'Enter Details', 'Confirm & Pay'];

export default function BuyPage() {
  const router = useRouter();
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [phone, setPhone] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await apiClient.get('/packages');
        setPackages(res.data.packages || []);
      } catch {
        setError('Failed to load packages');
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const handleNext = () => {
    setError('');
    if (activeStep === 0 && !selectedPackage) {
      setError('Please select a package');
      return;
    }
    if (activeStep === 1) {
      if (!phone || phone.length < 10) {
        setError('Enter a valid phone number');
        return;
      }
      if (!recipientName) {
        setError('Enter recipient name');
        return;
      }
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setError('');
    setActiveStep((prev) => prev - 1);
  };

  const handlePurchase = () => {
    if (!selectedPackage) return;
    setSubmitting(true);
    const params = new URLSearchParams({
      packageId: selectedPackage.id.toString(),
      network: selectedPackage.network,
      recipientName,
      recipientPhone: phone,
    });
    router.push(`/payment?${params.toString()}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Buy Data Package
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {activeStep === 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Select a Package
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                gap: 2,
              }}
            >
              {packages.map((pkg) => (
                <Card
                  key={pkg.id}
                  sx={{
                    cursor: 'pointer',
                    border: selectedPackage?.id === pkg.id ? 2 : 1,
                    borderColor: selectedPackage?.id === pkg.id ? 'primary.main' : 'divider',
                    '&:hover': { boxShadow: 4 },
                  }}
                  onClick={() => setSelectedPackage(pkg)}
                >
                  <CardContent>
                    <Chip label={pkg.network} size="small" color="primary" />
                    <Typography variant="h6" sx={{ my: 1 }}>
                      {pkg.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {pkg.dataSize} • {pkg.validity}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 2, color: 'primary.main' }}>
                      TZS {pkg.price.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}

      {activeStep === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Recipient Details
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Package: <strong>{selectedPackage?.name}</strong> (TZS {selectedPackage?.price.toLocaleString()})
            </Typography>
            <TextField
              fullWidth
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g., 0712345678"
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Recipient Name"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              required
            />
          </CardContent>
        </Card>
      )}

      {activeStep === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Confirm Purchase
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography>Package: <strong>{selectedPackage?.name}</strong></Typography>
              <Typography>Price: <strong>TZS {selectedPackage?.price.toLocaleString()}</strong></Typography>
              <Typography>Phone: <strong>{phone}</strong></Typography>
              <Typography>Recipient: <strong>{recipientName}</strong></Typography>
            </Box>
          </CardContent>
        </Card>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button onClick={handleBack} disabled={activeStep === 0 || submitting}>
          Back
        </Button>
        {activeStep < steps.length - 1 ? (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button variant="contained" onClick={handlePurchase} disabled={submitting}>
            {submitting ? <CircularProgress size={24} color="inherit" /> : 'Confirm Purchase'}
          </Button>
        )}
      </Box>
    </Box>
  );
}