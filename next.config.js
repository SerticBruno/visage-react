/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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