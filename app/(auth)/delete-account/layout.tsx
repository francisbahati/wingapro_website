// app/(auth)/delete-account/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delete My Account',
  description: 'Permanently delete your WingaPro account and personal data.',
  robots: { index: false, follow: false },
};

export default function DeleteAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}