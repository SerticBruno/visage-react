import { Metadata } from 'next';
import { businessData } from '@/data/business';

export function legalPageMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  const url = `${businessData.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: '/images/services/toskani-woman-visage-estetski-studio.webp',
          width: 1200,
          height: 630,
          alt: `${businessData.name} - ${title}`,
        },
      ],
    },
    robots: { index: true, follow: true },
  };
}
