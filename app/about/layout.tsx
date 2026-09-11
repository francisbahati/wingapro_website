// app/about/layout.tsx
import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wingapro.com';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about WingaPro — Tanzania\'s modern platform for fast, affordable data bundles and quality networking devices. Our mission is to simplify how you buy data.',
  keywords: ['about WingaPro', 'data bundles Tanzania', 'networking devices', 'WingaPro company'],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: 'About WingaPro',
    description: 'Learn about WingaPro — Tanzania\'s modern data bundle platform.',
    url: `${SITE_URL}/about`,
    type: 'website',
    images: ['/images/wingapro.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About WingaPro',
    description: 'Learn about WingaPro — Tanzania\'s modern data bundle platform.',
    images: ['/images/wingapro.webp'],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}