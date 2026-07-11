/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.stripe.com',
      },
    ],
  },
  // Enable rewrites for clean URLs
  async rewrites() {
    return [
      // Handle domain-specific routes
    ];
  },
};

module.exports = nextConfig;