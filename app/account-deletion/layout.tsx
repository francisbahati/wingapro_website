// app/account-deletion/layout.tsx
import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wingapro.com';

export const metadata: Metadata = {
  title: 'Delete Your Account',
  description:
    'Request permanent deletion of your WingaPro account and personal data. Details on what is deleted, what we retain for legal compliance, and how to proceed.',
  keywords: ['delete WingaPro account', 'account deletion', 'data deletion Tanzania'],
  alternates: { canonical: `${SITE_URL}/account-deletion` },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Delete Your WingaPro Account',
    description: 'Permanently remove your WingaPro account and personal data.',
    url: `${SITE_URL}/account-deletion`,
    type: 'website',
    images: ['/images/wingapro.webp'],
  },
};

export default function AccountDeletionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
