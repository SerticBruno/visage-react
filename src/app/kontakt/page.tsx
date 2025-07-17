import HeroSection from '@/components/sections/HeroSection';
import ContactSection from '@/components/sections/ContactSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktirajte VISAGE Studio u Siska. Dogovorite termin za tretman ili saznajte više o našim uslugama. Dostupni smo za sve vaše upite.",
  openGraph: {
    title: "Kontakt",
    description: "Kontaktirajte VISAGE Studio u Siska. Dogovorite termin za tretman ili saznajte više o našim uslugama. Dostupni smo za sve vaše upite.",
    images: [
      {
        url: "/images/services/toskani-woman.webp",
        width: 1200,
        height: 630,
        alt: "VISAGE Studio - Kontakt"
      }
    ]
  }
};

interface KontaktPageProps {
  searchParams: Promise<{ service?: string }>;
}

export default async function KontaktPage({ searchParams }: KontaktPageProps) {
  const resolvedSearchParams = await searchParams;
  const serviceLabel = resolvedSearchParams.service ? decodeURIComponent(resolvedSearchParams.service) : undefined;

  return (
    <main>
      <HeroSection
        title="Kontakt"
        description="Javite nam se za sve informacije i rezervacije"
        image="/images/services/kontakt-hero.webp"
      />
      <ContactSection serviceLabel={serviceLabel} />
    </main>
  );
} 