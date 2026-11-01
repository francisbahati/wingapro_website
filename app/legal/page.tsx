'use client';

import { Box, Container, Divider, Typography } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const LAST_UPDATED = 'November 1, 2026';

const PRIVACY: { title: string; body: string }[] = [
  { title: '1. Introduction', body: `WingaPro ("WingaPro", "we", "us", "our") operates wingapro.com and the WingaPro Android and Windows apps (together, the "Service"). This document combines our Privacy Policy and Terms & Conditions. By creating an account or using the Service you agree to both.` },
  { title: '2. Information We Collect', body: `• Account data — username, email, phone number, hashed password, referral code, role.
• Transaction data — packages purchased, wallet balance, deposits, withdrawals, mobile-money numbers, order history, recipient names and phone numbers.
• Device & usage data — device type, OS, browser, IP address, page views, timestamps, crash logs.
• Push tokens — Firebase Cloud Messaging token for order and account notifications.
• Support data — messages sent through our contact form or support tickets.` },
  { title: '3. How We Use Your Data', body: `• Create and authenticate your account.
• Process purchases, deposits and withdrawals via mobile-money providers.
• Deliver data bundles and networking devices to the recipient you specify.
• Send transactional notifications and (with consent) promotional messages.
• Detect fraud, abuse and unauthorised access.
• Comply with Tanzanian financial, tax and telecommunication law.
• Improve the Service and provide support.` },
  { title: '4. Legal Basis', body: `We rely on (a) performance of our contract with you; (b) our legitimate interests in operating a secure Service; (c) your consent (e.g. marketing notifications); and (d) compliance with law.` },
  { title: '5. Sharing Your Data', body: `We never sell your data. We share only with:
• Mobile-money providers — Vodacom M-Pesa, Mixx by Yas, Airtel Money, Halotel Halopesa.
• Telecom networks — Halotel, Tigo/Mixx by Yas, Vodacom, Airtel (for bundle delivery).
• Firebase / Google — for push notifications.
• Hosting and infrastructure providers operating the Service.
• Law enforcement, regulators or courts when legally required.` },
  { title: '6. Data Retention', body: `Account data is retained while your account is active and for 30 days after deletion. Transaction records are retained 5–7 years as required by Tanzanian financial and tax law. Device logs are retained up to 90 days. Push tokens are deleted immediately when you uninstall the app or disable notifications.` },
  { title: '7. Account & Data Deletion', body: `You can delete your account and the personal data we hold about you at any time.
• In-app: Profile → Settings → "Delete Account"
• Email: send from your registered address to support@wingapro.com with subject "Delete my account" and your username.
• Phone: call +255 762 040 592 (Mon–Sat, 8am–8pm EAT).

After we verify your identity (usually within 2 business days):
1. You must withdraw any wallet balance first (any remaining balance is refunded to your registered mobile-money number before deletion).
2. Account, profile, push tokens, notification history and support messages are deleted within 30 days.
3. Transaction records (orders, payments, withdrawals) are retained 5–7 years as required by law — restricted to compliance staff, never used for marketing.
4. Once deleted, the account cannot be recovered. You may create a new one any time.` },
  { title: '8. Security', body: `We use TLS in transit, hashed passwords, short-lived JWT access tokens, refresh-token rotation, access controls and monitoring. No system is perfectly secure; we cannot guarantee absolute security.` },
  { title: '9. Cookies & Local Storage', body: `We use cookies and local storage to keep you signed in, remember your theme, and maintain your session. We do not use third-party advertising cookies. You can clear them in your browser at any time (this will sign you out).` },
  { title: '10. Your Rights', body: `Subject to applicable law, you may: access your data, correct inaccurate data, delete your data (see Section 7), export your data, withdraw marketing consent, and object to certain processing. To exercise these rights email support@wingapro.com. You may also lodge a complaint with the Tanzanian data-protection authority.` },
  { title: '11. Children', body: `The Service is for users aged 18 and over. We do not knowingly collect data from children. If you believe a child has provided us data, contact us and we will delete it.` },
  { title: '12. International Transfers', body: `Some processors (cloud hosting, Firebase) may process data outside Tanzania. Where this happens, we ensure appropriate safeguards consistent with applicable data-protection law.` },
  { title: '13. Third-Party Links', body: `The Service may link to third-party sites. We are not responsible for their privacy practices — please read their policies.` },
];

const TERMS: { title: string; body: string }[] = [
  { title: '1. Acceptance', body: `These Terms govern your use of wingapro.com and the WingaPro Android and Windows apps. By creating an account or using the Service you agree to these Terms and to the Privacy Policy above. If you do not agree, do not use the Service.` },
  { title: '2. Eligibility', body: `You must be at least 18 years old and legally capable of entering a binding contract. You represent that the information you provide is accurate.` },
  { title: '3. Account Registration', body: `Provide accurate registration data, keep your password confidential, and accept responsibility for all activity under your account. Notify us immediately of unauthorised use. We may suspend accounts with false information or that breach these Terms.` },
  { title: '4. Wallet & Payments', body: `WingaPro provides a prepaid wallet you top up using supported mobile-money providers. Balances are in Tanzanian Shillings (TZS) and earn no interest. Minimum deposit/withdrawal amounts are displayed in the app. You are responsible for ensuring the mobile-money number you provide belongs to you. We may place holds on funds reasonably suspected of fraud or illegality.` },
  { title: '5. Purchases & Delivery', body: `All prices are in TZS and may change without notice. Data bundles are delivered to the recipient phone number you specify. Delivery is typically within seconds to a few minutes, depending on the network. We may refuse or cancel any order (pricing errors, suspected fraud, network unavailability) — in which case we refund the amount to your wallet.` },
  { title: '6. Refunds & Cancellations', body: `Digital products are non-refundable once delivered. If a bundle fails to deliver, or you entered the wrong recipient number, contact support within 24 hours. Where a claim is verified we re-deliver the bundle or credit your wallet. Device orders may be cancelled before dispatch; after dispatch our returns policy applies.` },
  { title: '7. Acceptable Use', body: `You agree not to: use the Service unlawfully or fraudulently; resell our products without written permission; attempt to access the Service's systems without authorisation; scrape, copy or reverse-engineer the Service; transmit malware; impersonate anyone; or interfere with other users.` },
  { title: '8. Intellectual Property', body: `All content on the Service — including the WingaPro name and logo, text, graphics, software and design — is owned by WingaPro or its licensors. You may not copy, modify, distribute or create derivative works without written consent.` },
  { title: '9. Third-Party Networks', body: `WingaPro is an independent reseller of data bundles and networking devices. We are not affiliated with, endorsed by, or an agent of Halotel, Tigo/Mixx by Yas, Vodacom, Airtel or any other network. All trademarks belong to their respective owners.` },
  { title: '10. Disclaimers', body: `The Service is provided "as is" and "as available". To the fullest extent permitted by law, we disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose and non-infringement. We do not guarantee uninterrupted or error-free operation.` },
  { title: '11. Limitation of Liability', body: `To the fullest extent permitted by law, WingaPro and its directors, employees and agents are not liable for any indirect, incidental, special, consequential or punitive damages, or for loss of profits, revenue, data or goodwill. Our total liability for any claim will not exceed the amount you paid to WingaPro in the 30 days preceding the event giving rise to the claim.` },
  { title: '12. Indemnity', body: `You agree to indemnify and hold harmless WingaPro and its officers, employees and agents from any claim, loss, liability or expense (including reasonable legal fees) arising from your breach of these Terms or misuse of the Service.` },
  { title: '13. Termination', body: `You may close your account at any time (see Privacy Policy, Section 7). We may suspend or terminate your access if you breach these Terms, if required by law, or for operational reasons. Any wallet balance remaining at termination is handled per applicable law.` },
  { title: '14. Governing Law', body: `These Terms are governed by the laws of the United Republic of Tanzania. Any dispute is subject to the exclusive jurisdiction of the courts of Dar es Salaam, Tanzania.` },
  { title: '15. Changes', body: `We may update this document. The "Last updated" date above will change and, for material changes, we will notify you in the app or by email. Continued use after changes take effect constitutes acceptance.` },
  { title: '16. Contact', body: `Email: support@wingapro.com
Phone: +255 762 040 592
Address: Dar es Salaam, Tanzania` },
];

function SectionBlock({ title, body }: { title: string; body: string }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography component="h3" sx={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy)', mb: 0.75 }}>
        {title}
      </Typography>
      <Typography sx={{ color: 'var(--text)', lineHeight: 1.75, fontSize: '0.95rem', whiteSpace: 'pre-line' }}>
        {body}
      </Typography>
    </Box>
  );
}

export default function LegalPage() {
  return (
    <Box sx={{ bgcolor: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 10 } }}>
        <Typography component="h1" sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, fontWeight: 800, color: 'var(--navy)', letterSpacing: '-0.02em', mb: 1 }}>
          Privacy Policy &amp; Terms
        </Typography>
        <Typography sx={{ color: 'var(--text-muted)', mb: 5 }}>
          Last updated: {LAST_UPDATED}
        </Typography>

        <Box id="privacy" sx={{ mb: 6 }}>
          <Typography component="h2" sx={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy)', mb: 3 }}>
            Privacy Policy
          </Typography>
          {PRIVACY.map((s) => <SectionBlock key={s.title} {...s} />)}
        </Box>

        <Divider sx={{ my: 5, borderColor: 'var(--border)' }} />

        <Box id="terms">
          <Typography component="h2" sx={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy)', mb: 3 }}>
            Terms &amp; Conditions
          </Typography>
          {TERMS.map((s) => <SectionBlock key={s.title} {...s} />)}
        </Box>

        <Divider sx={{ my: 5, borderColor: 'var(--border)' }} />
        <Typography sx={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Questions? Email support@wingapro.com or call +255 762 040 592.
        </Typography>
      </Container>
      <Footer />
    </Box>
  );
}
