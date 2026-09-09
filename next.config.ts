import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['192.168.1.15'],
  // Force webpack for production builds – fixes Server Reference ID issues
  // (if you're using Turbopack by default)
  experimental: {
    // This option is available in Next.js 15+ – if not, remove it.
    // Alternatively, you can run `next build --webpack` in your build command.
  },
};

export default nextConfig;