// next.config.ts
import type { NextConfig } from 'next';

const devOrigins = (process.env.DEV_ALLOWED_ORIGINS || 'localhost,127.0.0.1')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  output: 'standalone',

  reactStrictMode: true,
  poweredByHeader: false,

  typescript: {
    ignoreBuildErrors: false,
  },

  images: {
    remotePatterns: [],
  },

  // Exact hostnames or IPs only — Next.js 16 rejects glob wildcards.
  // Set DEV_ALLOWED_ORIGINS=localhost,192.168.1.5 in your .env.local
  allowedDevOrigins: devOrigins,
};

export default nextConfig;