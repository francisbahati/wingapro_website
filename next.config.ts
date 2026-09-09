import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['192.168.1.15'],
  // Force webpack for production builds (fixes Turbopack runtime issues)
  webpack: (config, { isServer }) => {
    // You can add custom webpack config here if needed
    return config;
  },
};

export default nextConfig;