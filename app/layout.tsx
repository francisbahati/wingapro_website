// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Registry from './registry';
import ThemeProvider from './theme-provider';
import { ThemeModeProvider } from './context/ThemeModeContext';
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8FAFC' },
    { media: '(prefers-color-scheme: dark)',  color: '#0E1526' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Prevent theme flash on first paint — runs before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('wingapro-theme');
                  var mode = (saved === 'dark' || saved === 'light') ? saved : 'light';
                  document.documentElement.setAttribute('data-theme', mode);
                  document.documentElement.style.colorScheme = mode;
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <Registry>
          <ThemeModeProvider>
            <ThemeProvider>
              <AuthProvider>
                <NotificationListener />
                {children}
              </AuthProvider>
            </ThemeProvider>
          </ThemeModeProvider>
        </Registry>
      </body>
    </html>
  );
}