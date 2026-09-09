import { Container, Typography, Box } from '@mui/material';
import Navbar from '@/components/Navbar';

export default function AboutPage() {
  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" gutterBottom>About WingaPro</Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          WingaPro is a modern digital platform dedicated to providing fast, affordable internet packages and quality networking devices.
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Our mission is to simplify how you buy data and hardware. With just a few clicks, you can choose a plan, order a router, and get started.
        </Typography>
      </Container>
    </Box>
  );
}