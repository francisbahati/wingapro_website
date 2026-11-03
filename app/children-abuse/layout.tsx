// app/children-abuse/layout.tsx
import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wingapro.com';

export const metadata: Metadata = {
  title: 'Child Safety Standards — CSAE Policy',
  description:
    "WingaPro's Child Safety Standards. Zero tolerance for Child Sexual Abuse and Exploitation (CSAE). Age restrictions, reporting procedures, and cooperation with Tanzania Police, INTERPOL and NCMEC.",
  keywords: [
    'child safety standards',
    'CSAE policy',
    'child sexual abuse exploitation Tanzania',
    'child safety WingaPro',
    'report child abuse',
  ],
  alternates: { canonical: `${SITE_URL}/children-abuse` },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Child Safety Standards — WingaPro',
    description:
      'WingaPro has zero tolerance for child sexual abuse and exploitation (CSAE). Learn how to report concerns.',
    url: `${SITE_URL}/children-abuse`,
    type: 'website',
    images: ['/images/wingapro.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Child Safety Standards — WingaPro',
    description:
      'Zero tolerance for CSAE. Age 18+. Report to child-safety@wingapro.com.',
    images: ['/images/wingapro.webp'],
  },
};

export default function ChildrenAbuseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
