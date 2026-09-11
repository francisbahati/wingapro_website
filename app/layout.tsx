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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wingapro.com';
const SITE_NAME = 'WingaPro';
const SITE_TAGLINE = 'Fast, Reliable & Affordable Data Bundles';
const SITE_DESCRIPTION =
  'Buy data bundles for Halotel, Tigo, Vodacom & Airtel in Tanzania. Top up your wallet, purchase instantly, and stay connected with WingaPro.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: 'Next.js',
  keywords: [
    'data bundles',
    'Tanzania',
    'Halotel',
    'Tigo',
    'Vodacom',
    'Airtel',
    'WingaPro',
    'buy data',
    'data bundles Tanzania',
    'mobile data',
    'M-Pesa',
    'Halopesa',
    'Mixx by Yas',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'Telecommunications',

  alternates: {
    canonical: '/',
    languages: {
      'en-TZ': '/',
      'sw-TZ': '/',
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_TZ',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/images/wingapro.webp',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Data Bundles Made Easy`,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: ['/images/wingapro.webp'],
    creator: '@wingapro',
  },

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/wingapro.webp', type: 'image/webp', sizes: '512x512' },
    ],
    apple: '/images/wingapro.webp',
    shortcut: '/favicon.ico',
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Optional: add your Google Search Console verification code here once you have it
  // verification: {
  //   google: 'YOUR_GOOGLE_VERIFICATION_TOKEN',
  //   other: {
  //     'msvalidate.01': 'YOUR_BING_VERIFICATION_TOKEN',
  //   },
  // },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8FAFC' },
    { media: '(prefers-color-scheme: dark)',  color: '#0E1526' },
  ],
  colorScheme: 'light dark',
};

// Organization + WebSite structured data (rendered in <head>)
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/wingapro.webp`,
  description: SITE_DESCRIPTION,
  foundingDate: '2024',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dar es Salaam',
    addressCountry: 'TZ',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+255-762-040-592',
      contactType: 'customer service',
      email: 'support@wingapro.com',
      areaServed: 'TZ',
      availableLanguage: ['en', 'sw'],
    },
  ],
  sameAs: [
    // Add your social profiles once ready:
    // 'https://www.facebook.com/wingapro',
    // 'https://www.instagram.com/wingapro',
    // 'https://twitter.com/wingapro',
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: 'en-TZ',
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={inter.variable}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        {/* Theme flash prevention — runs before React hydrates */}
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

        {/* Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, '\\u003c'),
          }}
        />

        {/* WebSite structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, '\\u003c'),
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