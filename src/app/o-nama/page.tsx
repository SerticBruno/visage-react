import HeroSection from '@/components/sections/HeroSection';
import AboutContent from '@/components/sections/AboutContent';
import ContactSection from '@/components/sections/ContactSection';
import { Metadata } from 'next';

const TITLE = 'O nama | VISAGE Studio Sisak';
const DESCRIPTION =
  'Upoznajte VISAGE Studio – estetski studio u centru Siska. Certificirani predstavnik TOSKANI. Tim stručnjaka za mezoterapiju, Dermapen 4, skin boostere i estetsku medicinu.';

export const metadata: Metadata = {
  title: 'O nama | VISAGE Studio Sisak',
  description: DESCRIPTION,
  keywords: [
    'VISAGE Studio Sisak',
    'estetski studio Sisak',
    'TOSKANI certificirani',
    'tim estetske medicine',
    'o nama Sisak',
  ],
  alternates: {
    canonical: 'https://visagestudio.hr/o-nama',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://visagestudio.hr/o-nama',
    images: [
      {
        url: '/images/background.webp',
        width: 1200,
        height: 630,
        alt: 'VISAGE Studio – O nama, estetski studio Sisak',
      },
    ],
  },
};

export default function OnamaPage() {
  return (
    <main>
      <HeroSection
        title="O nama"
        description="Posjetite nas u Sisku i započnite svoje beauty putovanje!"
        image="/images/background.webp"
      />
      <AboutContent />
      <ContactSection/>
    </main>
  );
} 