import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(),
  },
  experimental: {
    // This machine's .next filesystem benchmark is slow; avoid the cache writes
    // that delayed requests and triggered stale Turbopack resolver state.
    turbopackFileSystemCacheForDev: false,
    optimizePackageImports: ['framer-motion', 'swiper'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
