// app/plans/layout.tsx
import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wingapro.com';

export const metadata: Metadata = {
  title: 'Data Packages & Prices',
  description:
    'Browse affordable data bundles for Halotel, Tigo, Vodacom and Airtel in Tanzania. Compare prices, choose your plan, and get instant delivery.',
  keywords: [
    'data packages Tanzania',
    'data bundle prices',
    'Halotel packages',
    'Tigo bundles',
    'Vodacom data',
    'Airtel Tanzania',
    'buy data online',
  ],
  alternates: {
    canonical: `${SITE_URL}/plans`,
  },
  openGraph: {
    title: 'Data Packages — WingaPro',
    description: 'Compare and buy data bundles from all major Tanzanian networks.',
    url: `${SITE_URL}/plans`,
    type: 'website',
    images: ['/images/wingapro.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Packages — WingaPro',
    description: 'Compare and buy data bundles from all major Tanzanian networks.',
    images: ['/images/wingapro.webp'],
  },
};

export default function PlansLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}