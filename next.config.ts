// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    // Linting is handled separately; don't block production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Keep strict — real errors should fail the build
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;