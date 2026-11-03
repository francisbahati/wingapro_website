// app/account-deletion/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box, Button, Card, CardContent, Container, Divider, Stack, Typography,
} from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function AccountDeletionPublicPage() {
  const router = useRouter();

  return (
    <Box sx={{ bgcolor: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Box
            sx={{
              width: 72, height: 72, borderRadius: 3,
              bgcolor: 'var(--error-muted)', color: 'var(--error)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              mx: 'auto', mb: 2,
            }}
          >
            <DeleteForeverRoundedIcon sx={{ fontSize: 40 }} />
          </Box>
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: '2rem', md: '2.6rem' },
              fontWeight: 800, color: 'var(--navy)',
              letterSpacing: '-0.02em', mb: 1,
            }}
          >
            Delete Your Account
          </Typography>
          <Typography sx={{ color: 'var(--text-muted)', maxWidth: 640, mx: 'auto' }}>
            You can permanently delete your WingaPro account and the personal data
            we hold about you at any time. This page is publicly available — no
            login required to read it.
          </Typography>
        </Box>

        <Box
          sx={{
            p: 2.5, mb: 4, borderRadius: 2.5,
            bgcolor: 'var(--error-muted)',
            border: '1px solid rgba(239,68,68,0.35)',
          }}
        >
          <Typography sx={{ fontWeight: 700, color: 'var(--error)', mb: 0.5 }}>
            This action is permanent
          </Typography>
          <Typography sx={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.6 }}>
            Once your account is deleted, you cannot log in again, and your data
            cannot be recovered. You can always create a new account later.
          </Typography>
        </Box>

        <Typography sx={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy)', mb: 2 }}>
          How to delete your account
        </Typography>
        <Typography sx={{ fontSize: '0.9rem', color: 'var(--text-muted)', mb: 3 }}>
          Three ways — choose the one that works for you.
        </Typography>

        <Stack spacing={2.5}>
          <Card sx={{ borderRadius: 3, bgcolor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: 'var(--navy-muted)', color: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700 }}>
                  1
                </Box>
                <Typography sx={{ fontWeight: 700, color: 'var(--navy)' }}>
                  In the WingaPro app (fastest)
                </Typography>
              </Stack>
              <Box component="ol" sx={{ pl: 3, m: 0, color: 'var(--text)' }}>
                <li style={{ marginBottom: 8 }}>
                  <Typography component="span" sx={{ fontSize: '0.9rem' }}>
                    Sign in to the WingaPro mobile app or{' '}
                    <Link href="/login?next=/delete-account" style={{ color: 'var(--cyan-deep)', fontWeight: 600 }}>
                      web dashboard
                    </Link>.
                  </Typography>
                </li>
                <li style={{ marginBottom: 8 }}>
                  <Typography component="span" sx={{ fontSize: '0.9rem' }}>
                    Go to <strong>Profile → Delete Account</strong>, or{' '}
                    <strong>Settings → Delete Account</strong>.
                  </Typography>
                </li>
                <li style={{ marginBottom: 8 }}>
                  <Typography component="span" sx={{ fontSize: '0.9rem' }}>
                    Follow the confirmation steps. You will need to type{' '}
                    <code style={{ background: 'var(--navy-muted)', padding: '1px 6px', borderRadius: 4, fontFamily: 'monospace', color: 'var(--navy)' }}>
                      DELETE
                    </code>{' '}
                    to confirm.
                  </Typography>
                </li>
              </Box>
              <Button
                variant="contained" size="large" startIcon={<LoginRoundedIcon />}
                onClick={() => router.push('/login?next=/delete-account')}
                sx={{ mt: 2, bgcolor: 'var(--error)', '&:hover': { bgcolor: '#B91C1C' } }}
              >
                Sign in to delete my account
              </Button>
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 3, bgcolor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: 'var(--navy-muted)', color: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700 }}>
                  2
                </Box>
                <Typography sx={{ fontWeight: 700, color: 'var(--navy)' }}>
                  On the web (if you can sign in but not open the app)
                </Typography>
              </Stack>
              <Typography sx={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.7 }}>
                Sign in at{' '}
                <Link href="/login" style={{ color: 'var(--cyan-deep)', fontWeight: 600 }}>wingapro.com/login</Link>
                {' '}using your normal credentials, then open{' '}
                <Link href="/delete-account" style={{ color: 'var(--cyan-deep)', fontWeight: 600 }}>wingapro.com/delete-account</Link>.
                The web flow is identical to the app flow and uses the same backend.
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 3, bgcolor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: 'var(--navy-muted)', color: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700 }}>
                  3
                </Box>
                <Typography sx={{ fontWeight: 700, color: 'var(--navy)' }}>
                  By email (if you cannot log in)
                </Typography>
              </Stack>
              <Typography sx={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.7, mb: 2 }}>
                Email{' '}
                <a href="mailto:support@wingapro.com?subject=Account%20Deletion%20Request" style={{ color: 'var(--cyan-deep)', fontWeight: 600 }}>
                  support@wingapro.com
                </a>{' '}
                from your registered email address with:
              </Typography>
              <Box component="ul" sx={{ pl: 3, m: 0, color: 'var(--text)' }}>
                <li style={{ marginBottom: 6 }}>
                  <Typography component="span" sx={{ fontSize: '0.9rem' }}>
                    Subject line: <strong>&quot;Account Deletion Request&quot;</strong>
                  </Typography>
                </li>
                <li>
                  <Typography component="span" sx={{ fontSize: '0.9rem' }}>
                    Your username and the phone number registered to the account.
                  </Typography>
                </li>
              </Box>
              <Typography sx={{ fontSize: '0.88rem', color: 'var(--text-muted)', mt: 2 }}>
                Our team verifies your identity and processes the request within{' '}
                <strong>7 business days</strong>. You can also call{' '}
                <strong>+255 762 040 592</strong> (Mon–Sat, 8am–8pm EAT).
              </Typography>
              <Button
                variant="outlined" size="large" startIcon={<EmailRoundedIcon />}
                href="mailto:support@wingapro.com?subject=Account%20Deletion%20Request"
                sx={{ mt: 2 }}
              >
                Email support
              </Button>
            </CardContent>
          </Card>
        </Stack>

        <Card sx={{ mt: 4, borderRadius: 3, bgcolor: 'var(--surface)', border: '1px solid var(--border)' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography sx={{ fontWeight: 700, color: 'var(--navy)', mb: 1.5 }}>
              What is deleted, and what we keep
            </Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--navy)', mb: 0.75 }}>
              Deleted within 30 days
            </Typography>
            <Box component="ul" sx={{ pl: 3, mt: 0, mb: 2, color: 'var(--text)' }}>
              <li><Typography component="span" sx={{ fontSize: '0.9rem' }}>Your profile (name, email, phone, hashed password, referral code)</Typography></li>
              <li><Typography component="span" sx={{ fontSize: '0.9rem' }}>Access to your WingaPro wallet</Typography></li>
              <li><Typography component="span" sx={{ fontSize: '0.9rem' }}>Your in-app notifications and support ticket content</Typography></li>
              <li><Typography component="span" sx={{ fontSize: '0.9rem' }}>Your in-app order history view</Typography></li>
              <li><Typography component="span" sx={{ fontSize: '0.9rem' }}>Your Firebase push token (deleted immediately)</Typography></li>
              <li><Typography component="span" sx={{ fontSize: '0.9rem' }}>All active refresh tokens (revoked on all devices)</Typography></li>
            </Box>
            <Divider sx={{ my: 2, borderColor: 'var(--border)' }} />
            <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--navy)', mb: 0.75 }}>
              Retained for legal compliance
            </Typography>
            <Box component="ul" sx={{ pl: 3, mt: 0, color: 'var(--text)' }}>
              <li style={{ marginBottom: 6 }}>
                <Typography component="span" sx={{ fontSize: '0.9rem' }}>
                  <strong>Transaction records</strong> (orders, deposits, withdrawals, invoices) — retained <strong>5–7 years</strong> as required by the Bank of Tanzania and the Anti-Money Laundering Act 2006.
                </Typography>
              </li>
              <li style={{ marginBottom: 6 }}>
                <Typography component="span" sx={{ fontSize: '0.9rem' }}>
                  <strong>Audit logs</strong> of sensitive account actions — retained up to 7 years for security and regulatory purposes.
                </Typography>
              </li>
              <li>
                <Typography component="span" sx={{ fontSize: '0.9rem' }}>
                  <strong>Record of the deletion request itself</strong> — retained permanently (minimal data: your email and the deletion date).
                </Typography>
              </li>
            </Box>
            <Typography sx={{ fontSize: '0.85rem', color: 'var(--text-muted)', mt: 2, lineHeight: 1.6 }}>
              Retained records are stored securely and are only accessible to
              authorized compliance staff. They are never used for marketing or any
              purpose unrelated to legal compliance.
            </Typography>
          </CardContent>
        </Card>

        <Box
          sx={{
            mt: 3, p: 2.5, borderRadius: 2.5,
            bgcolor: 'var(--info-muted)',
            border: '1px solid rgba(59,130,246,0.25)',
            display: 'flex', gap: 1.5,
          }}
        >
          <InfoOutlinedIcon sx={{ color: 'var(--info)', flexShrink: 0 }} />
          <Box>
            <Typography sx={{ fontWeight: 600, color: 'var(--info)', mb: 0.5 }}>
              Before you delete
            </Typography>
            <Box component="ul" sx={{ pl: 2, m: 0, color: 'var(--text)' }}>
              <li style={{ marginBottom: 4 }}>
                <Typography component="span" sx={{ fontSize: '0.87rem' }}>
                  <strong>Withdraw your wallet balance</strong> — any remaining balance is forfeited when you delete. Withdraw first from Wallet → Withdraw.
                </Typography>
              </li>
              <li style={{ marginBottom: 4 }}>
                <Typography component="span" sx={{ fontSize: '0.87rem' }}>
                  <strong>Complete or cancel active orders</strong> — you cannot delete while you have pending purchases or deliveries.
                </Typography>
              </li>
              <li>
                <Typography component="span" sx={{ fontSize: '0.87rem' }}>
                  <strong>Wait for pending withdrawals</strong> to finish.
                </Typography>
              </li>
            </Box>
          </Box>
        </Box>

        <Typography sx={{ mt: 4, fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.6 }}>
          See our{' '}
          <Link href="/legal#privacy" style={{ color: 'var(--cyan-deep)', fontWeight: 600 }}>Privacy Policy</Link>{' '}
          for full details on data handling and your rights, and our{' '}
          <Link href="/children-abuse" style={{ color: 'var(--cyan-deep)', fontWeight: 600 }}>Child Safety Standards</Link>{' '}
          for our CSAE policy.
        </Typography>
      </Container>

      <Footer />
    </Box>
  );
}
