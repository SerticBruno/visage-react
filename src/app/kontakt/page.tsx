import HeroSection from '@/components/sections/HeroSection';
import ContactSection from '@/components/sections/ContactSection';
import { Metadata } from 'next';

const TITLE = 'Kontakt | Rezervacija termina Sisak';
const DESCRIPTION =
  'Kontaktirajte VISAGE Studio u Siska. Rezervirajte termin za mezoterapiju, Dermapen 4 ili drugi tretman. Adresa, telefon, radno vrijeme i obrazac za upite.';

export const metadata: Metadata = {
  title: 'Kontakt | Rezervacija termina Sisak',
  description: DESCRIPTION,
  keywords: [
    'kontakt VISAGE Studio Sisak',
    'rezervacija termina Sisak',
    'estetski studio Sisak adresa',
    'telefon estetski studio Sisak',
  ],
  alternates: {
    canonical: 'https://visagestudio.hr/kontakt',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://visagestudio.hr/kontakt',
    images: [
      {
        url: '/images/services/toskani-woman-visage-estetski-studio.webp',
        width: 1200,
        height: 630,
        alt: 'VISAGE Studio – Kontakt i rezervacija Sisak',
      },
    ],
  },
};

interface KontaktPageProps {
  searchParams: Promise<{ service?: string; combo?: string }>;
}

export default async function KontaktPage({ searchParams }: KontaktPageProps) {
  const resolvedSearchParams = await searchParams;
  const serviceLabel = resolvedSearchParams.service ? decodeURIComponent(resolvedSearchParams.service) : undefined;
  const comboLabel = resolvedSearchParams.combo ? decodeURIComponent(resolvedSearchParams.combo) : undefined;

  return (
    <main>
      <HeroSection
        title="Kontakt"
        description="Javite nam se za sve informacije i rezervacije"
        image="/images/services/contact-hero-visage-estetski-studio.webp"
      />
      <ContactSection serviceLabel={serviceLabel} comboLabel={comboLabel} />
    </main>
  );
} 