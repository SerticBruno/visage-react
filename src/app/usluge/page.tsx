import ContactSection from '@/components/sections/ContactSection';
import ServicesSection from '@/components/sections/ServicesSection';
import HeroSection from '@/components/sections/HeroSection';
import ComboPackagesSectionPreview from '@/components/sections/ComboPackagesSectionPreview';
import { Metadata } from 'next';

const TITLE = 'Usluge | Tretmani lica i tijela Sisak';
const DESCRIPTION =
  'Usluge VISAGE Studija u Siska: mezoterapija, Dermapen 4, skin boosteri, PRP, Plasmage, botox, kemijski piling, foto-terapija. Profesionalni tretmani za lice, vlasište i tijelo.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'usluge estetski studio Sisak',
    'tretmani lica Sisak',
    'mezoterapija Sisak',
    'Dermapen 4 Sisak',
    'estetska medicina Sisak',
    'kozmetički tretmani Sisak',
  ],
  alternates: {
    canonical: 'https://visagestudio.hr/usluge',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://visagestudio.hr/usluge',
    images: [
      {
        url: '/images/services/services-hero-visage-estetski-studio.webp',
        width: 1200,
        height: 630,
        alt: 'VISAGE Studio – Usluge i tretmani Sisak',
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <main>
      <HeroSection
        title="Naše usluge"
        description="Otkrijte široku ponudu tretmana za lice, vlasište i tijelo koji su personalizirani vašim individualnim željama i potrebama"
        image="/images/services/services-hero-visage-estetski-studio.webp"
      />
      <ServicesSection />
      <ComboPackagesSectionPreview />
      <ContactSection hasTopPadding={false}/>
    </main>
  );
} 