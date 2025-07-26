import { Metadata } from 'next';
import { BLOG_ENABLED } from '@/lib/config';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: BLOG_ENABLED ? "Blog" : "Stranica nije pronađena",
  description: BLOG_ENABLED 
    ? "Najnovije vijesti, savjeti i informacije o estetskoj medicini i kozmetičkim tretmanima. Pratite naš blog za stručne članke i savjete za njegu kože."
    : "Tražena stranica ne postoji.",
  openGraph: {
    title: BLOG_ENABLED ? "Blog" : "Stranica nije pronađena",
    description: BLOG_ENABLED 
      ? "Najnovije vijesti, savjeti i informacije o estetskoj medicini i kozmetičkim tretmanima. Pratite naš blog za stručne članke i savjete za njegu kože."
      : "Tražena stranica ne postoji.",
    images: BLOG_ENABLED ? [
      {
        url: "/images/services/toskani-woman-visage-estetski-studio.webp",
        width: 1200,
        height: 630,
        alt: "VISAGE Studio - Blog"
      }
    ] : []
  }
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