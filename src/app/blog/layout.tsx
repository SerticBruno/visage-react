import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Blog",
  description: "Najnovije vijesti, savjeti i informacije o estetskoj medicini i kozmetičkim tretmanima. Pratite naš blog za stručne članke i savjete za njegu kože.",
  openGraph: {
    title: "Blog",
    description: "Najnovije vijesti, savjeti i informacije o estetskoj medicini i kozmetičkim tretmanima. Pratite naš blog za stručne članke i savjete za njegu kože.",
    images: [
      {
        url: "/images/services/toskani-woman-visage-estetski-studio.webp",
        width: 1200,
        height: 630,
        alt: "VISAGE Studio - Blog"
      }
    ]
  }
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 