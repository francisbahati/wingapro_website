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

  // Allow the dev server to be reached from any device on the LAN
  // (phones, tablets, other laptops). Production is unaffected.
  allowedDevOrigins: [
    'localhost',
    '127.0.0.1',
    '192.168.1.*',    // any device on this subnet
    '192.168.0.*',    // in case router uses this range
    '10.0.0.*',       // some routers
    '172.16.0.*',     // some routers
  ],
};

export default nextConfig;