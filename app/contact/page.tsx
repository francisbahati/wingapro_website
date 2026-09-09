// app/contact/page.tsx
'use client';
import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Alert, Card, CardContent, Grid, Stack } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { EmailRounded, PhoneRounded, LocationOnRounded } from '@mui/icons-material';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    setSubmitted(true);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 8, flexGrow: 1 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 800, textAlign: 'center' }}>
          Contact <span style={{ color: '#00b4d8' }}>Us</span>
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 6, textAlign: 'center' }}>
          We're here to help. Reach out to us anytime.
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
          {/* Contact Info */}
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Contact Information</Typography>
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Box sx={{ bgcolor: '#0a2e5c', color: '#fff', borderRadius: '50%', p: 1.5 }}>
                  <EmailRounded />
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight="600">Email</Typography>
                  <Typography variant="body2" color="text.secondary">support@wingapro.com</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Box sx={{ bgcolor: '#0a2e5c', color: '#fff', borderRadius: '50%', p: 1.5 }}>
                  <PhoneRounded />
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight="600">Phone</Typography>
                  <Typography variant="body2" color="text.secondary">+255 762 040 592</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Box sx={{ bgcolor: '#0a2e5c', color: '#fff', borderRadius: '50%', p: 1.5 }}>
                  <LocationOnRounded />
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight="600">Location</Typography>
                  <Typography variant="body2" color="text.secondary">Dar es Salaam, Tanzania</Typography>
                </Box>
              </Box>
            </Stack>
          </Box>

          {/* Contact Form */}
          <Card sx={{ p: 4, borderRadius: 3 }}>
            <CardContent>
              {submitted ? (
                <Alert severity="success" sx={{ mb: 2 }}>Your message has been sent. We'll get back to you soon.</Alert>
              ) : (
                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    label="Name"
                    fullWidth
                    required
                    margin="normal"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    required
                    margin="normal"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  <TextField
                    label="Message"
                    multiline
                    rows={5}
                    fullWidth
                    required
                    margin="normal"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                  <Button type="submit" variant="contained" sx={{ mt: 2, bgcolor: '#0A2E5C', '&:hover': { bgcolor: '#071e3d' } }}>
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