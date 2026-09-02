// app/(auth)/buy/page.tsx
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
import { AxiosError } from 'axios';
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
  const [purchasing, setPurchasing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/packages`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPackages(data.packages);
        else {
          setPackages([
            { id: 1, name: '1GB Daily', dataSize: '1GB', validity: '24 hours', price: 500, network: 'Halotel' },
            { id: 2, name: '5GB Monthly', dataSize: '5GB', validity: '30 days', price: 2500, network: 'Tigo' },
            { id: 3, name: '500MB Weekly', dataSize: '500MB', validity: '7 days', price: 1000, network: 'Vodacom' },
          ]);
        }
      })
      .catch(() => {
        setPackages([
          { id: 1, name: '1GB Daily', dataSize: '1GB', validity: '24 hours', price: 500, network: 'Halotel' },
          { id: 2, name: '5GB Monthly', dataSize: '5GB', validity: '30 days', price: 2500, network: 'Tigo' },
          { id: 3, name: '500MB Weekly', dataSize: '500MB', validity: '7 days', price: 1000, network: 'Vodacom' },
        ]);
      })
      .finally(() => setLoading(false));
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

  const handlePurchase = async () => {
    setPurchasing(true);
    setError('');
    try {
      await apiClient.post('/customer/orders', {
        packageId: selectedPackage?.id,
        phone: phone,
        recipientName: recipientName,
      });
      router.push('/orders?purchase=success');
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || 'Purchase failed');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Buy Data Package
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {activeStep === 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Select a Package
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
              {packages.map((pkg) => (
                <Card
                  key={pkg.id}
                  sx={{
                    cursor: 'pointer',
                    border: selectedPackage?.id === pkg.id ? 2 : 1,
                    borderColor: selectedPackage?.id === pkg.id ? 'primary.main' : 'divider',
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
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 2 }}>
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
              sx={{ mb: 2 }}
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
        <Button onClick={handleBack} disabled={activeStep === 0 || purchasing}>
          Back
        </Button>
        {activeStep < steps.length - 1 ? (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button variant="contained" onClick={handlePurchase} disabled={purchasing}>
            {purchasing ? <CircularProgress size={24} color="inherit" /> : 'Confirm Purchase'}
          </Button>
        )}
      </Box>
    </Box>
  );
}