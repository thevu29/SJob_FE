import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'api.slingacademy.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'sjob-storage.s3.ap-southeast-1.amazonaws.com',
        port: ''
      }
    ]
  },
  transpilePackages: ['geist']
};

export default nextConfig;
