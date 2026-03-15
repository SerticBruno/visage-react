import { Metadata } from 'next';

const TITLE = 'Katalog proizvoda | TOSKANI i njega kože Sisak';
const DESCRIPTION =
  'Katalog proizvoda VISAGE Studija u Siska. TOSKANI i vodeći brendovi za njegu kože – profesionalna i kućna njega lica i tijela. Dostava u Sisak i okolicu.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'katalog proizvoda Sisak',
    'TOSKANI proizvodi',
    'njega kože Sisak',
    'kozmetika Sisak',
    'estetski studio proizvodi',
  ],
  alternates: {
    canonical: 'https://visagestudio.hr/katalog',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://visagestudio.hr/katalog',
    images: [
      {
        url: '/images/services/toskani-woman-visage-estetski-studio.webp',
        width: 1200,
        height: 630,
        alt: 'VISAGE Studio – Katalog proizvoda za njegu kože Sisak',
      },
    ],
  },
};

export default function KatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 