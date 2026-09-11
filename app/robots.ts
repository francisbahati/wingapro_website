// app/robots.ts
import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wingapro.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/wallet/',
          '/orders/',
          '/support/',
          '/notifications/',
          '/profile/',
          '/settings/',
          '/users/',
          '/reports/',
          '/deposit-withdraw/',
          '/packages/',
          '/promotions/',
          '/buy/',
          '/payment/',
          '/order-confirmation/',
          '/admin/',
          '/_next/',
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}