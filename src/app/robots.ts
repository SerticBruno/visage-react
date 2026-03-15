import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/combo-demo', '/api/'],
      },
    ],
    sitemap: 'https://visagestudio.hr/sitemap.xml',
    host: 'https://visagestudio.hr',
  };
}
