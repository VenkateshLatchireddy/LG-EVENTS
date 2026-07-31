import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
<<<<<<< HEAD
  turbopack: {
    root: process.cwd(),
  },
  experimental: {
    // This machine's .next filesystem benchmark is slow; avoid the cache writes
    // that delayed requests and triggered stale Turbopack resolver state.
    turbopackFileSystemCacheForDev: false,
    optimizePackageImports: ['framer-motion', 'swiper'],
  },
=======
>>>>>>> 9c84da3429ac73ff6b77aa26a413561a09801748
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
