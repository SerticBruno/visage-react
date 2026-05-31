/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  images: {
    domains: ['localhost'],
  },
  // Ensure proper handling of dynamic routes
  async rewrites() {
    return [
      {
        source: '/usluge/:pageName',
        destination: '/usluge/:pageName',
      },
    ];
  },
};

module.exports = nextConfig; 