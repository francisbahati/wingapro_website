// app/children-abuse/page.tsx
'use client';

import Link from 'next/link';
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import ReportRoundedIcon from '@mui/icons-material/ReportRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';

const LAST_UPDATED = 'November 2, 2026';

export default function ChildrenAbusePage() {
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
            <ShieldRoundedIcon sx={{ fontSize: 40 }} />
          </Box>
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: '2rem', md: '2.6rem' },
              fontWeight: 800, color: 'var(--navy)',
              letterSpacing: '-0.02em', mb: 1,
            }}
          >
            Child Safety Standards
          </Typography>
          <Typography sx={{ color: 'var(--text-muted)', maxWidth: 660, mx: 'auto' }}>
            WingaPro has <strong>zero tolerance</strong> for Child Sexual Abuse and
            Exploitation (CSAE). This page is publicly available without login and
            explains our policy, age restrictions, reporting mechanisms, and
            cooperation with law enforcement.
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', color: 'var(--text-soft)', mt: 2 }}>
            Last updated: {LAST_UPDATED}
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
            Zero Tolerance Policy
          </Typography>
          <Typography sx={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.7 }}>
            WingaPro strictly prohibits any content, behaviour or activity that
            sexually exploits or abuses children, in any form, on any device, at
            any time. Accounts found in violation are permanently terminated and,
            where required by law, reported to law enforcement. There are no
            exceptions.
          </Typography>
        </Box>

        <Stack spacing={2.5}>
          <PolicyCard icon={<BlockRoundedIcon />} title="1. Age Requirement — 18+ Only">
            <Typography sx={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.7 }}>
              WingaPro is strictly for users aged <strong>18 years or older</strong>.
              We do not knowingly allow anyone under 18 to create an account or use
              the service. If we discover that a minor has registered, we will:
            </Typography>
            <Box component="ul" sx={{ pl: 3, color: 'var(--text)', m: 0, mt: 1 }}>
              <li><Typography component="span" sx={{ fontSize: '0.92rem' }}>Immediately disable the account.</Typography></li>
              <li><Typography component="span" sx={{ fontSize: '0.92rem' }}>Delete all associated personal data (subject to legal retention of completed transactions).</Typography></li>
              <li><Typography component="span" sx={{ fontSize: '0.92rem' }}>Refund any wallet balance to the registered mobile-money number.</Typography></li>
            </Box>
            <Typography sx={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.7, mt: 1.5 }}>
              Parents and guardians who believe a minor has registered should
              contact us immediately at{' '}
              <a href="mailto:child-safety@wingapro.com" style={{ color: 'var(--cyan-deep)', fontWeight: 600 }}>
                child-safety@wingapro.com
              </a>.
            </Typography>
          </PolicyCard>

          <PolicyCard icon={<BlockRoundedIcon />} title="2. Prohibited Content &amp; Conduct">
            <Typography sx={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.7, mb: 1 }}>
              The following are strictly prohibited on WingaPro, in any form, at any time:
            </Typography>
            <Box component="ul" sx={{ pl: 3, color: 'var(--text)', m: 0 }}>
              <li><Typography component="span" sx={{ fontSize: '0.92rem' }}>Creating, uploading, sharing, requesting, storing, or soliciting Child Sexual Abuse Material (CSAM) — including AI-generated or manipulated content.</Typography></li>
              <li><Typography component="span" sx={{ fontSize: '0.92rem' }}>Grooming a minor for sexual purposes.</Typography></li>
              <li><Typography component="span" sx={{ fontSize: '0.92rem' }}>Sextortion, sexual extortion, or trafficking of a minor.</Typography></li>
              <li><Typography component="span" sx={{ fontSize: '0.92rem' }}>Using WingaPro to contact, coordinate with, or arrange to meet a minor for any harmful purpose.</Typography></li>
              <li><Typography component="span" sx={{ fontSize: '0.92rem' }}>Any conduct that sexualises, endangers, or harms a minor.</Typography></li>
            </Box>
          </PolicyCard>

          <PolicyCard icon={<ReportRoundedIcon />} title="3. How to Report CSAE Content or Conduct">
            <Typography sx={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.7, mb: 2 }}>
              If you see any content or behaviour on WingaPro that involves the
              abuse or exploitation of a child, please report it immediately. You
              do <strong>not</strong> need to be a WingaPro user to report. Do not
              attempt to investigate yourself — report and let trained
              investigators handle it.
            </Typography>

            <Box
              sx={{
                p: 2, mb: 2, borderRadius: 2,
                bgcolor: 'var(--navy-muted)',
                border: '1px solid var(--border)',
              }}
            >
              <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--navy)', mb: 0.5 }}>
                In-app reporting
              </Typography>
              <Typography sx={{ fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.6 }}>
                Logged-in users can report CSAE content via{' '}
                <strong>Support → New Ticket</strong> in the WingaPro app, or from
                the web dashboard at{' '}
                <Link href="/support" style={{ color: 'var(--cyan-deep)', fontWeight: 600 }}>
                  /support
                </Link>
                . Select <em>Dispute</em> and use the subject prefix{' '}
                <strong>[CSAE]</strong> so our child-safety team sees it immediately.
              </Typography>
            </Box>

            <Box
              sx={{
                p: 2, borderRadius: 2,
                bgcolor: 'var(--error-muted)',
                border: '1px solid rgba(239,68,68,0.3)',
              }}
            >
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <EmailRoundedIcon sx={{ color: 'var(--error)', flexShrink: 0 }} />
                  <Box>
                    <Typography sx={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Dedicated child-safety email · monitored 24/7
                    </Typography>
                    <a href="mailto:child-safety@wingapro.com" style={{ color: 'var(--error)', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none' }}>
                      child-safety@wingapro.com
                    </a>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <PhoneRoundedIcon sx={{ color: 'var(--error)', flexShrink: 0 }} />
                  <Box>
                    <Typography sx={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Emergency hotline · Mon–Sat 8am–8pm EAT
                    </Typography>
                    <Typography sx={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.95rem' }}>
                      +255 762 040 592
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Box>

            <Typography sx={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, mt: 2 }}>
              If a child is in <strong>immediate danger</strong>, call Tanzania
              Police at <strong>112</strong> (or <strong>110</strong> for the
              child-protection hotline) before contacting us.
            </Typography>
          </PolicyCard>

          <PolicyCard icon={<ShieldRoundedIcon />} title="4. What We Do When We Receive a Report">
            <Typography sx={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.7, mb: 1 }}>
              Every report of child abuse or exploitation is treated with the utmost
              urgency. When we receive a report:
            </Typography>
            <Box component="ol" sx={{ pl: 3, color: 'var(--text)', m: 0 }}>
              <li style={{ marginBottom: 6 }}><Typography component="span" sx={{ fontSize: '0.92rem' }}>We acknowledge the report within <strong>24 hours</strong>.</Typography></li>
              <li style={{ marginBottom: 6 }}><Typography component="span" sx={{ fontSize: '0.92rem' }}>We preserve all relevant data (account activity, content, metadata) for law enforcement, even if the account is deleted.</Typography></li>
              <li style={{ marginBottom: 6 }}><Typography component="span" sx={{ fontSize: '0.92rem' }}>We suspend the reported account <strong>immediately</strong> while we investigate.</Typography></li>
              <li style={{ marginBottom: 6 }}><Typography component="span" sx={{ fontSize: '0.92rem' }}>We remove any confirmed CSAE content within <strong>24 hours</strong>.</Typography></li>
              <li style={{ marginBottom: 6 }}><Typography component="span" sx={{ fontSize: '0.92rem' }}>We report confirmed CSAE to the <strong>Tanzania Police Force (Cybercrimes Unit)</strong> and, where applicable, to <strong>INTERPOL</strong> and/or the <strong>National Center for Missing &amp; Exploited Children (NCMEC)</strong>.</Typography></li>
              <li><Typography component="span" sx={{ fontSize: '0.92rem' }}>We cooperate fully with criminal investigations and any resulting legal proceedings.</Typography></li>
            </Box>
          </PolicyCard>

          <PolicyCard icon={<GavelRoundedIcon />} title="5. Legal Framework">
            <Typography sx={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.7, mb: 1 }}>
              WingaPro operates in Tanzania and complies with all applicable child-safety laws, including:
            </Typography>
            <Box component="ul" sx={{ pl: 3, color: 'var(--text)', m: 0 }}>
              <li><Typography component="span" sx={{ fontSize: '0.92rem' }}>The <strong>Penal Code (Cap. 16)</strong> of Tanzania — offences against children, sexual offences.</Typography></li>
              <li><Typography component="span" sx={{ fontSize: '0.92rem' }}>The <strong>Law of the Child Act, 2009</strong> — protection of children from abuse and exploitation.</Typography></li>
              <li><Typography component="span" sx={{ fontSize: '0.92rem' }}>The <strong>Cybercrimes Act, 2015</strong> — offences involving computer systems and content.</Typography></li>
              <li><Typography component="span" sx={{ fontSize: '0.92rem' }}>The <strong>Anti-Trafficking in Persons Act, 2008</strong>.</Typography></li>
              <li><Typography component="span" sx={{ fontSize: '0.92rem' }}>Applicable international conventions ratified by Tanzania, including the UN Convention on the Rights of the Child.</Typography></li>
            </Box>
          </PolicyCard>

          <PolicyCard icon={<LockRoundedIcon />} title="6. Preventive Measures">
            <Box component="ul" sx={{ pl: 3, color: 'var(--text)', m: 0 }}>
              <li><Typography component="span" sx={{ fontSize: '0.92rem' }}>Age confirmation during sign-up.</Typography></li>
              <li><Typography component="span" sx={{ fontSize: '0.92rem' }}>Automatic moderation of text and image content submitted through the service.</Typography></li>
              <li><Typography component="span" sx={{ fontSize: '0.92rem' }}>Monitoring of abuse reports and rapid response.</Typography></li>
              <li><Typography component="span" sx={{ fontSize: '0.92rem' }}>Periodic review of this policy and our safety processes.</Typography></li>
            </Box>
          </PolicyCard>

          <PolicyCard icon={<GroupsRoundedIcon />} title="7. Enforcement Actions">
            <Box component="ul" sx={{ pl: 3, color: 'var(--text)', m: 0 }}>
              <li><Typography component="span" sx={{ fontSize: '0.92rem' }}>Immediate and permanent termination of the offending account.</Typography></li>
              <li><Typography component="span" sx={{ fontSize: '0.92rem' }}>Preservation of all data for law enforcement, even after account deletion.</Typography></li>
              <li><Typography component="span" sx={{ fontSize: '0.92rem' }}>Referral to the Tanzania Police Force, INTERPOL and/or NCMEC as appropriate.</Typography></li>
              <li><Typography component="span" sx={{ fontSize: '0.92rem' }}>Full cooperation with any criminal investigation.</Typography></li>
            </Box>
          </PolicyCard>

          <PolicyCard icon={<ReportRoundedIcon />} title="8. Contact &amp; Related Policies">
            <Typography sx={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.7, mb: 1 }}>
              For all child-safety matters, contact our dedicated team:
            </Typography>
            <Box component="ul" sx={{ pl: 3, color: 'var(--text)', m: 0, mb: 2 }}>
              <li><Typography component="span" sx={{ fontSize: '0.92rem' }}><strong>Child-safety email:</strong>{' '}<a href="mailto:child-safety@wingapro.com" style={{ color: 'var(--cyan-deep)', fontWeight: 600 }}>child-safety@wingapro.com</a></Typography></li>
              <li><Typography component="span" sx={{ fontSize: '0.92rem' }}><strong>General support:</strong>{' '}<a href="mailto:support@wingapro.com" style={{ color: 'var(--cyan-deep)', fontWeight: 600 }}>support@wingapro.com</a></Typography></li>
              <li><Typography component="span" sx={{ fontSize: '0.92rem' }}><strong>Phone:</strong> +255 762 040 592 (Mon–Sat, 8am–8pm EAT)</Typography></li>
              <li><Typography component="span" sx={{ fontSize: '0.92rem' }}><strong>Address:</strong> Msimu Softech, Dar es Salaam, Tanzania</Typography></li>
            </Box>
            <Divider sx={{ my: 2, borderColor: 'var(--border)' }} />
            <Typography sx={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              See also:{' '}
              <Link href="/legal#privacy" style={{ color: 'var(--cyan-deep)', fontWeight: 600 }}>Privacy Policy</Link>
              {' · '}
              <Link href="/legal#terms" style={{ color: 'var(--cyan-deep)', fontWeight: 600 }}>Terms of Service</Link>
              {' · '}
              <Link href="/account-deletion" style={{ color: 'var(--cyan-deep)', fontWeight: 600 }}>Account Deletion</Link>
            </Typography>
          </PolicyCard>
        </Stack>

        <Box
          sx={{
            mt: 5, p: 3, borderRadius: 3,
            bgcolor: 'var(--navy-muted)',
            border: '1px solid var(--border)',
            textAlign: 'center',
          }}
        >
          <Typography sx={{ fontWeight: 700, color: 'var(--navy)', mb: 0.75 }}>
            Child safety questions?
          </Typography>
          <Typography sx={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Reach our dedicated team at{' '}
            <a href="mailto:child-safety@wingapro.com" style={{ color: 'var(--cyan-deep)', fontWeight: 600 }}>
              child-safety@wingapro.com
            </a>
          </Typography>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}

function PolicyCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        bgcolor: 'var(--surface)',
        border: '1px solid var(--border)',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
          <Box
            sx={{
              width: 36, height: 36, borderRadius: 2,
              bgcolor: 'var(--navy-muted)', color: 'var(--navy)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
          <Typography sx={{ fontWeight: 700, color: 'var(--navy)' }}>{title}</Typography>
        </Stack>
        {children}
      </CardContent>
    </Card>
  );
}
