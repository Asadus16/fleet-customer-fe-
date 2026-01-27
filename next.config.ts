import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Add your image domains here
      // {
      //   protocol: 'https',
      //   hostname: 'example.com',
      // },
    ],
  },
  // Enable typed routes when all pages are created
  // experimental: {
  //   typedRoutes: true,
  // },
};

export default nextConfig;
