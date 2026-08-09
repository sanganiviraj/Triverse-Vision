import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async rewrites() {
    return [
      { source: '/work', destination: '/' },
      { source: '/services', destination: '/' },
      { source: '/process', destination: '/' },
      { source: '/approach', destination: '/' },
      { source: '/contact', destination: '/' },
    ];
  },
};

export default nextConfig;
