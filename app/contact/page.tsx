// app/contact/page.tsx
'use client';

import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';

const CONTACT_INFO = [
  {
    icon: <EmailRoundedIcon />,
    label: 'Email',
    value: 'support@wingapro.com',
  },
  {
    icon: <PhoneRoundedIcon />,
    label: 'Phone',
    value: '+255 762 040 592',
  },
  {
    icon: <LocationOnRoundedIcon />,
    label: 'Location',
    value: 'Dar es Salaam, Tanzania',
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: wire to your backend / email service
    console.log(form);
    setSubmitted(true);
  };

  return (
    <Box sx={{ bgcolor: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        <Typography
          component="h1"
          align="center"
          sx={{ mb: 1.5, color: 'var(--navy)', fontWeight: 800 }}
        >
          Contact{' '}
          <Box component="span" sx={{ color: 'var(--cyan)' }}>
            Us
          </Box>
        </Typography>
        <Typography
          align="center"
          sx={{ mb: 6, maxWidth: 640, mx: 'auto', color: 'var(--text-muted)' }}
        >
          We&apos;re here to help. Reach out to us anytime.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 6,
          }}
        >
          {/* Info column */}
          <Box>
            <Typography
              sx={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--navy)', mb: 3 }}
            >
              Contact Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {CONTACT_INFO.map((item) => (
                <Box key={item.label} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: 'var(--navy)',
                      color: '#fff',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 6px 16px rgba(10,46,92,0.20)',
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 600, color: 'var(--navy)' }}>
                      {item.label}
                    </Typography>
                    <Typography sx={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      {item.value}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Form column */}
          <Card
            sx={{
              borderRadius: 3,
              bgcolor: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              {submitted ? (
                <Alert severity="success">
                  Your message has been sent. We&apos;ll get back to you soon.
                </Alert>
              ) : (
                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    label="Name"
                    fullWidth
                    required
                    margin="normal"
                    value={form.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setForm({ ...form, name: e.target.value })
                    }
                  />
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    required
                    margin="normal"
                    value={form.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                  <TextField
                    label="Message"
                    multiline
                    rows={5}
                    fullWidth
                    required
                    margin="normal"
                    value={form.message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setForm({ ...form, message: e.target.value })
                    }
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 3 }}
                    size="large"
                  >
                    Send Message
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}