// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Required for the Dockerfile (server.js + .next/standalone)
  output: 'standalone',

  reactStrictMode: true,
  poweredByHeader: false,

  // Next.js 16 removed the `eslint` option from next.config.
  // Run lint separately with: npx eslint .
  typescript: {
    ignoreBuildErrors: false,
  },

  images: {
    remotePatterns: [],
  },
};

export default nextConfig;