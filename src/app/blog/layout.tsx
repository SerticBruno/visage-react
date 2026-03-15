import { Metadata } from 'next';
import { BLOG_ENABLED } from '@/lib/config';
import { notFound } from 'next/navigation';

const BLOG_TITLE = 'Blog | Savjeti estetske medicine i njega kože';
const BLOG_DESCRIPTION =
  'Blog VISAGE Studija – stručni članci o estetskoj medicini, mezoterapiji, njegi kože i kozmetičkim tretmanima. Savjeti i vijesti iz našeg studija u Siska.';

export const metadata: Metadata = {
  title: BLOG_ENABLED ? BLOG_TITLE : 'Stranica nije pronađena',
  description: BLOG_ENABLED ? BLOG_DESCRIPTION : 'Tražena stranica ne postoji.',
  keywords: BLOG_ENABLED
    ? [
        'blog estetska medicina',
        'savjeti njega kože',
        'mezoterapija blog',
        'estetski studio Sisak blog',
      ]
    : undefined,
  alternates: BLOG_ENABLED ? { canonical: 'https://visagestudio.hr/blog' } : undefined,
  openGraph: {
    title: BLOG_ENABLED ? BLOG_TITLE : 'Stranica nije pronađena',
    description: BLOG_ENABLED ? BLOG_DESCRIPTION : 'Tražena stranica ne postoji.',
    url: BLOG_ENABLED ? 'https://visagestudio.hr/blog' : undefined,
    images: BLOG_ENABLED
      ? [
          {
            url: '/images/services/toskani-woman-visage-estetski-studio.webp',
            width: 1200,
            height: 630,
            alt: 'VISAGE Studio – Blog estetska medicina Sisak',
          },
        ]
      : [],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // If blog is disabled, show 404 page
  if (!BLOG_ENABLED) {
    notFound();
  }
  
  return children;
} 