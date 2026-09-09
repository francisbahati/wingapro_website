import { Box, Container, Typography, Card, CardContent, Grid, Stack } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SecurityRounded, BoltRounded, SupportAgentRounded } from '@mui/icons-material';

export default function AboutPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 8, flexGrow: 1 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 800 }}>
          About <span style={{ color: '#00b4d8' }}>WingaPro</span>
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 800 }}>
          WingaPro is a modern digital platform dedicated to providing fast, affordable internet packages
          and quality networking devices.
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
          Our mission is to simplify how you buy data and hardware. With just a few clicks, you can choose a plan,
          order a router, and get started.
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4, mt: 6 }}>
          {[
            { icon: <SecurityRounded />, title: 'Secure Transactions', desc: 'All payments are encrypted and processed safely.' },
            { icon: <BoltRounded />, title: 'Instant Delivery', desc: 'Data is sent to your phone immediately after payment.' },
            { icon: <SupportAgentRounded />, title: '24/7 Support', desc: 'Our support team is always available to assist you.' },
          ].map((item) => (
            <Card key={item.title} sx={{ p: 3, textAlign: 'center', '&:hover': { boxShadow: 6 } }}>
              <Box sx={{ color: '#0a2e5c', mb: 2, '& svg': { fontSize: 50 } }}>{item.icon}</Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{item.title}</Typography>
              <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
            </Card>
          ))}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}