// app/contact/page.tsx
'use client';
import { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';
import Navbar from '@/components/Navbar';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send to backend or console
    console.log(form);
    setSubmitted(true);
  };

  return (
    <Box>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h2" gutterBottom>Contact Us</Typography>
        {submitted ? (
          <Alert severity="success">Your message has been sent. We'll get back to you soon.</Alert>
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <TextField label="Name" fullWidth required margin="normal" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <TextField label="Email" type="email" fullWidth required margin="normal" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <TextField label="Message" multiline rows={5} fullWidth required margin="normal" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>Send Message</Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}