// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['192.168.1.15', '192.168.1.31', 'localhost'],
  experimental: {
    serverActions: {
      allowedOrigins: ['wingapro.com', '*.wingapro.com', '192.168.1.31'],
    },
  },
};

export default nextConfig;