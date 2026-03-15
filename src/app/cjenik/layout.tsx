import { Metadata } from 'next';

const TITLE = 'Cjenik usluga | Cijene tretmana Sisak';
const DESCRIPTION =
  'Cjenik VISAGE Studija u Siska. Transparentne cijene za mezoterapiju, Dermapen 4, skin boostere, PRP, Plasmage i sve tretmane estetske medicine. Pogledajte cijene i rezervirajte termin.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'cjenik estetski studio Sisak',
    'cijene tretmana Sisak',
    'mezoterapija cijena',
    'Dermapen 4 cijena',
    'estetski studio Sisak cijene',
    'transparentne cijene',
  ],
  alternates: {
    canonical: 'https://visagestudio.hr/cjenik',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://visagestudio.hr/cjenik',
    images: [
      {
        url: '/images/services/toskani-woman-visage-estetski-studio.webp',
        width: 1200,
        height: 630,
        alt: 'VISAGE Studio – Cjenik usluga Sisak',
      },
    ],
  },
};

export default function CjenikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 