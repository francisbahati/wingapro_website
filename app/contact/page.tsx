// app/contact/page.tsx
'use client';

import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { AxiosError } from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import apiClient from '@/lib/api/client';

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

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const INITIAL_FORM: FormState = { name: '', email: '', phone: '', message: '' };

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Normalize Tanzanian phone number to 0XXXXXXXXX form.
   * Backend's formatAndValidatePhone accepts 0/255/+255 prefixes.
   */
  const normalizePhone = (value: string): string => {
    let v = value.replace(/\s+/g, '').replace(/-/g, '');
    if (v.startsWith('+255')) v = '0' + v.slice(4);
    if (v.startsWith('255') && v.length === 12) v = '0' + v.slice(3);
    if (v.length === 9 && /^\d+$/.test(v)) v = '0' + v;
    return v;
  };

  const isValidPhone = (value: string) => /^0[67]\d{8}$/.test(normalizePhone(value));
  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // ---- Client-side validation (mirrors backend) ----
    if (!form.name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!isValidEmail(form.email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!form.phone.trim()) {
      setError('Please enter your phone number so we can reach you');
      return;
    }
    if (!isValidPhone(form.phone)) {
      setError('Enter a valid Tanzanian number (e.g. 0712345678)');
      return;
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      setError('Please write a message (at least 10 characters)');
      return;
    }

    setLoading(true);

    try {
      // Public endpoint — no auth required.
      // Creates a support ticket visible in the admin's support panel.
      await apiClient.post('/contact', {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: normalizePhone(form.phone),
        message: form.message.trim(),
      });

      setSubmitted(true);
      setForm(INITIAL_FORM);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(
          err.response?.data?.message ||
            'Failed to send message. Please try again or email us directly.'
        );
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
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
          {/* ─── Info column ─── */}
          <Box>
            <Typography
              sx={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--navy)',
                mb: 3,
              }}
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

            {/* Optional help note */}
            <Box
              sx={{
                mt: 4,
                p: 2.5,
                borderRadius: 3,
                bgcolor: 'var(--cyan-muted)',
                border: '1px solid rgba(0,180,216,0.18)',
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: 'var(--navy)', fontWeight: 600, mb: 0.5 }}
              >
                Need a quick reply?
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}
              >
                Include your phone number so our team can reach you directly. We reply
                within a few hours on business days.
              </Typography>
            </Box>
          </Box>

          {/* ─── Form column ─── */}
          <Card
            sx={{
              borderRadius: 3,
              bgcolor: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              {submitted ? (
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      bgcolor: 'var(--success-muted)',
                      color: 'var(--success)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    <SendRoundedIcon sx={{ fontSize: 30 }} />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ color: 'var(--navy)', fontWeight: 700, mb: 1 }}
                  >
                    Message sent successfully!
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'var(--text-muted)', mb: 3 }}
                  >
                    Our support team has received your message and will get back to you
                    shortly.
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => setSubmitted(false)}
                    sx={{ mt: 1 }}
                  >
                    Send another message
                  </Button>
                </Box>
              ) : (
                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <TextField
                    label="Full name"
                    name="name"
                    fullWidth
                    required
                    margin="normal"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlineRoundedIcon
                            sx={{ color: 'var(--text-muted)', fontSize: 20 }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    required
                    margin="normal"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineRoundedIcon
                            sx={{ color: 'var(--text-muted)', fontSize: 20 }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    label="Phone number"
                    name="phone"
                    type="tel"
                    fullWidth
                    required
                    margin="normal"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="e.g. 0712345678"
                    autoComplete="tel"
                    helperText="So we can reach you directly"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneRoundedIcon
                            sx={{ color: 'var(--text-muted)', fontSize: 20 }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    label="Message"
                    name="message"
                    multiline
                    rows={5}
                    fullWidth
                    required
                    margin="normal"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help…"
                  />

                  {error && (
                    <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
                      {error}
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading}
                    className="btn-shine"
                    startIcon={
                      loading ? (
                        <CircularProgress size={18} color="inherit" />
                      ) : (
                        <SendRoundedIcon />
                      )
                    }
                    sx={{ mt: 3, py: 1.6 }}
                  >
                    {loading ? 'Sending…' : 'Send Message'}
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