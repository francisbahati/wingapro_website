// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Registry from './registry';
import ThemeProvider from './theme-provider';
import { AuthProvider } from './context/AuthContext';
import NotificationListener from './components/notifications/NotificationListener';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://wingapro.com'),
  title: {
    default: 'WingaPro — Fast, Reliable & Affordable Data Bundles',
    template: '%s · WingaPro',
  },
  description:
    'Buy data bundles for Halotel, Tigo, Vodacom & Airtel. Top up your wallet, purchase instantly, and stay connected with WingaPro.',
  keywords: ['data bundles', 'Tanzania', 'Halotel', 'Tigo', 'Vodacom', 'Airtel', 'WingaPro'],
  openGraph: {
    title: 'WingaPro — Data Bundles Made Easy',
    description: 'Fast, reliable and affordable data bundles across Tanzania.',
    url: 'https://wingapro.com',
    siteName: 'WingaPro',
    type: 'website',
    images: ['/images/wingapro.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WingaPro',
    description: 'Fast, reliable and affordable data bundles across Tanzania.',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/images/wingapro.webp',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A2E5C',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Registry>
          <ThemeProvider>
            <AuthProvider>
              <NotificationListener />
              {children}
            </AuthProvider>
          </ThemeProvider>
        </Registry>
      </body>
    </html>
  );
}