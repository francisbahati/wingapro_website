'use client';

import { Box, Container, Typography, Button, Card, CardContent, Paper, Avatar, Divider } from '@mui/material';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroBackground from '@/components/HeroBackground';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import BoltIcon from '@mui/icons-material/Bolt';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function HomePage() {
  const networks = [
    { name: 'Halotel', logo: '/images/halotel.webp' },
    { name: 'Tigo', logo: '/images/yas.webp' },
    { name: 'Vodacom', logo: '/images/vodacom.webp' },
    { name: 'Airtel', logo: '/images/airtel.webp' },
  ];

  const steps = [
    { title: 'Choose Your Package', description: 'Browse our wide range of data bundles for all networks. Pick the one that suits your needs.' },
    { title: 'Pay with Wallet or Mobile Money', description: 'Pay securely using your WingaPro wallet or your preferred mobile money service.' },
    { title: 'Get Instant Delivery', description: 'Your data is delivered to your phone in seconds. No waiting.' },
  ];

  const features = [
    { icon: <SecurityIcon />, title: 'Bank‑Grade Security', description: 'Your payments are encrypted and protected with the latest security protocols.' },
    { icon: <BoltIcon />, title: 'Instant Delivery', description: 'Data is sent to your number immediately after payment confirmation.' },
    { icon: <SupportAgentIcon />, title: '24/7 Support', description: 'Our dedicated support team is always ready to assist you, day or night.' },
    { icon: <VerifiedUserIcon />, title: 'Trusted by Thousands', description: 'Join over 10,000 satisfied customers who trust WingaPro for their data needs.' },
    { icon: <TrendingUpIcon />, title: 'Best Prices', description: 'We offer competitive prices and regular promotions to save you money.' },
    { icon: <DownloadIcon />, title: 'Mobile & Desktop App', description: 'Access your account from anywhere with our Android and Windows apps.' },
  ];

  return (
    <Box>
      <Navbar />

      {/* Hero Section */}
      <Box sx={{ position: 'relative', minHeight: '90vh', bgcolor: '#0a1a2b', color: '#fff', overflow: 'hidden' }}>
        <HeroBackground />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, pt: 12, pb: 8, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '2.2rem', md: '3.5rem' } }}>
            Fast. Reliable. <Box component="span" sx={{ color: '#00b4d8' }}>Affordable.</Box>
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, color: '#aaa', maxWidth: 700, mx: 'auto' }}>
            Buy data bundles and routers for Halotel, Tigo, Vodacom & Airtel. Top up your wallet, purchase instantly, and stay connected.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
            <Button variant="contained" size="large" sx={{ bgcolor: '#00b4d8', '&:hover': { bgcolor: '#0093b0' } }} href="/plans">
              Browse Packages
            </Button>
            <Button variant="outlined" size="large" sx={{ color: '#fff', borderColor: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }} href="/download">
              Download App <ArrowForwardIcon sx={{ ml: 1 }} />
            </Button>
          </Box>

          {/* Trust Stats */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 4, mt: 8 }}>
            {[
              { number: '10K+', label: 'Happy Customers' },
              { number: '1M+', label: 'Data Delivered' },
              { number: '99.9%', label: 'Uptime Guarantee' },
              { number: '24/7', label: 'Support Available' },
            ].map((stat) => (
              <Paper key={stat.label} sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2, color: '#fff' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#00b4d8' }}>{stat.number}</Typography>
                <Typography variant="body2" sx={{ color: '#aaa' }}>{stat.label}</Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Trust Strip */}
      <Box sx={{ bgcolor: 'white', py: 4, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, justifyContent: 'space-around', alignItems: 'center' }}>
            {[
              { icon: <SecurityIcon />, text: 'Secure Payments' },
              { icon: <BoltIcon />, text: 'Instant Delivery' },
              { icon: <SupportAgentIcon />, text: '24/7 Support' },
              { icon: <VerifiedUserIcon />, text: 'Trusted Platform' },
              { icon: <TrendingUpIcon />, text: 'Best Prices' },
            ].map((item) => (
              <Box key={item.text} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Box sx={{ color: '#0a2e5c' }}>{item.icon}</Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.text}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Available Networks */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 2 }}>Available Networks</Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', mb: 5 }}>
          We support all major Tanzanian telecom operators. Choose your network and get the best deals.
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }, gap: 4 }}>
          {networks.map((net) => (
            <Card key={net.name} sx={{ textAlign: 'center', p: 3, '&:hover': { boxShadow: 6, transform: 'translateY(-4px)', transition: '0.3s' } }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 80, mb: 2 }}>
                <Image src={net.logo} alt={`${net.name} logo`} width={120} height={60} style={{ objectFit: 'contain' }} unoptimized />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>{net.name}</Typography>
              <Button variant="text" sx={{ mt: 1, color: '#0a2e5c' }} href={`/plans?network=${net.name.toLowerCase()}`}>
                View Packages
              </Button>
            </Card>
          ))}
        </Box>
      </Container>

      {/* How It Works */}
      <Box sx={{ bgcolor: '#f4f6fa', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ textAlign: 'center', mb: 2 }}>How It Works</Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', mb: 6 }}>
            Getting connected has never been easier. Follow these simple steps.
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 5 }}>
            {steps.map((step, index) => (
              <Box key={step.title} sx={{ textAlign: 'center', px: 2 }}>
                <Avatar sx={{ bgcolor: '#0a2e5c', color: '#fff', width: 60, height: 60, mx: 'auto', mb: 2, fontSize: '1.5rem' }}>
                  {index + 1}
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>{step.title}</Typography>
                <Typography variant="body2" color="text.secondary">{step.description}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Why Choose Us */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 2 }}>Why Choose WingaPro?</Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', mb: 6 }}>
          We are more than just a data seller – we are your trusted connectivity partner.
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 4 }}>
          {features.map((feature) => (
            <Card key={feature.title} sx={{ p: 3, height: '100%', '&:hover': { boxShadow: 6 } }}>
              <Box sx={{ color: '#0a2e5c', mb: 2, '& svg': { fontSize: 40 } }}>{feature.icon}</Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>{feature.title}</Typography>
              <Typography variant="body2" color="text.secondary">{feature.description}</Typography>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Testimonials */}
      <Box sx={{ bgcolor: '#f4f6fa', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ textAlign: 'center', mb: 2 }}>What Our Customers Say</Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', mb: 6 }}>
            Real feedback from real users.
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
            {[
              { name: 'John D.', text: 'WingaPro is my go‑to for buying data. It’s instant and the prices are unbeatable!' },
              { name: 'Amina K.', text: 'I love the wallet feature – I can buy for my family without any hassle. Highly recommended.' },
              { name: 'Peter M.', text: 'The support team is amazing. They solved my issue in minutes. Five stars!' },
            ].map((testimonial) => (
              <Card key={testimonial.name} sx={{ p: 3, height: '100%' }}>
                <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2 }}>“{testimonial.text}”</Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: '#0a2e5c' }}>{testimonial.name.charAt(0)}</Avatar>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{testimonial.name}</Typography>
                </Box>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Download CTA */}
      <Box sx={{ bgcolor: '#0a2e5c', color: '#fff', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Get the WingaPro App</Typography>
              <Typography variant="body1" sx={{ mb: 3, color: '#ccc' }}>
                Manage your purchases, top up your wallet, and receive notifications – all from your phone.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                <Button variant="contained" size="large" sx={{ bgcolor: '#00b4d8' }} href="/download">
                  <DownloadIcon sx={{ mr: 1 }} /> Android APK
                </Button>
                <Button variant="outlined" size="large" sx={{ color: '#fff', borderColor: '#fff' }} href="/download">
                  Windows App
                </Button>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Image src="/images/wingapro.webp" alt="WingaPro App" width={250} height={250} style={{ objectFit: 'contain' }} unoptimized />
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}