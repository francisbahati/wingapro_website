import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['192.168.1.15'], // only for dev, safe to keep
  experimental: {
    serverActions: {
      allowedOrigins: ['wingapro.com', '*.wingapro.com'],
    },
  },
};

export default nextConfig;