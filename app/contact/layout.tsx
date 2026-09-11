// app/contact/layout.tsx
import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wingapro.com';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with WingaPro. Email support@wingapro.com, call +255 762 040 592, or fill out our contact form. We\'re here 24/7 to help.',
  keywords: ['contact WingaPro', 'WingaPro support', 'customer service Tanzania', 'data bundles help'],
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: 'Contact WingaPro',
    description: 'Reach out to WingaPro for support, questions, or partnership inquiries.',
    url: `${SITE_URL}/contact`,
    type: 'website',
    images: ['/images/wingapro.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact WingaPro',
    description: 'Reach out to WingaPro for support or questions.',
    images: ['/images/wingapro.webp'],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}