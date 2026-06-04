/** @type {import('next').NextConfig} */

const supabaseHostname = process.env.SUPABASE_URL
  ? new URL(process.env.SUPABASE_URL).hostname
  : null;

const imageRemotePatterns = [
  {
    protocol: 'https',
    hostname: '**.supabase.co',
    pathname: '/storage/v1/object/public/**',
  },
];

if (supabaseHostname) {
  imageRemotePatterns.push({
    protocol: 'https',
    hostname: supabaseHostname,
    pathname: '/storage/v1/object/public/**',
  });
}

const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  images: {
    remotePatterns: imageRemotePatterns,
  },
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
