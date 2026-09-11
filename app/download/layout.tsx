// app/download/layout.tsx
import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wingapro.com';

export const metadata: Metadata = {
  title: 'Download the App',
  description:
    'Download the WingaPro app for Android and Windows. Buy data bundles, manage your wallet, and track orders on the go. Free, fast, and secure.',
  keywords: ['WingaPro app', 'download WingaPro APK', 'WingaPro Windows', 'data bundles app Tanzania'],
  alternates: {
    canonical: `${SITE_URL}/download`,
  },
  openGraph: {
    title: 'Download the WingaPro App',
    description: 'Buy data bundles and manage your wallet on Android and Windows.',
    url: `${SITE_URL}/download`,
    type: 'website',
    images: ['/images/wingapro.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download WingaPro',
    description: 'Get the WingaPro app for Android and Windows.',
    images: ['/images/wingapro.webp'],
  },
};

export default function DownloadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}