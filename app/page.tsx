import { Box, Container, Typography, Button, Card, CardContent, Link } from '@mui/material';
import Navbar from '@/components/Navbar';
import HeroBackground from '@/components/HeroBackground';

export default function HomePage() {
  return (
    <Box>
      <Navbar />
      <Box sx={{ position: 'relative', minHeight: '80vh', bgcolor: '#0a1a2b', color: '#fff', overflow: 'hidden' }}>
        <HeroBackground />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: 8, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
            Fast. Reliable. <span style={{ color: '#00b4d8' }}>Affordable.</span>
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, color: '#aaa' }}>
            Buy data bundles and routers for Halotel, Tigo, Vodacom & Airtel.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button variant="contained" size="large" sx={{ bgcolor: '#00b4d8' }} href="/plans">
              Browse Packages
            </Button>
            <Button variant="outlined" size="large" sx={{ color: '#fff', borderColor: '#fff' }} href="/download">
              Download App
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>Available Networks</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr 1fr' }, gap: 4 }}>
          {['halotel', 'tigo', 'vodacom', 'airtel'].map((net) => (
            <Link key={net} href={`/plans?network=${net}`} style={{ textDecoration: 'none' }}>
              <Card sx={{ textAlign: 'center', p: 3, '&:hover': { boxShadow: 6 } }}>
                <CardContent>
                  <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>{net}</Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Box>
      </Container>

      <Container maxWidth="lg" sx={{ py: 8, bgcolor: '#f5f5f5', borderRadius: 3 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>Why Choose WingaPro?</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h5">🔒 Secure</Typography>
              <Typography>Bank-grade encryption for every transaction.</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h5">⚡ Instant</Typography>
              <Typography>Data delivered in seconds after payment.</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h5">🎧 24/7 Support</Typography>
              <Typography>Real humans ready to help anytime.</Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}