// app/sitemap.ts
import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wingapro.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const publicRoutes: Array<{
    path: string;
    priority: number;
    changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  }> = [
    { path: '',            priority: 1.0, changeFrequency: 'weekly'  },
    { path: '/plans',      priority: 0.9, changeFrequency: 'daily'   },
    { path: '/about',      priority: 0.7, changeFrequency: 'monthly' },
    { path: '/download',   priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact',    priority: 0.6, changeFrequency: 'monthly' },
  ];

  return publicRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}