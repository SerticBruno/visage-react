import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import CTASection from '@/components/sections/CTASection';
import { Metadata } from 'next';
import ComboPackagesSectionPreview from '@/components/sections/ComboPackagesSectionPreview';
import ServicesSectionPreview from '@/components/sections/ServicesSectionPreview';

export const metadata: Metadata = {
  title: 'Dan žena - Dermapen 10% popusta',
  description:
    'Proslavite Dan žena u VISAGE studiju. 10% popusta na Dermapen 4 - rezervirajte termin do kraja ožujka.',
  openGraph: {
    title: 'Dan žena | VISAGE Studio',
    description:
      '10% popusta na Dermapen 4. Rezervirajte termin do kraja ožujka i poklonite svojoj koži i vlasištu obnovu kakvu zaslužuju.',
    images: [
      {
        url: '/images/womensday.svg',
        width: 1200,
        height: 630,
        alt: 'Dan žena - VISAGE studio',
      },
    ],
  },
};

export default function DanZenaPage() {
  return (
    <main>
      <HeroSection
        title="Dan žena u VISAGE studiju"
        description="10% popusta na Dermapen 4. Rezervirajte termin do kraja ožujka i poklonite svojoj koži i vlasištu obnovu kakvu zaslužuju."
        image="/images/womensday.svg"
        ctaText="Rezervirajte termin"
        ctaLink="/kontakt"
        variant="home"
      />

      <AboutSection
        title="Dan žena u VISAGE studiju"
        description="Ovog ožujka odvojite vrijeme za sebe i počastite se Dermapen 4 tretmanom.

Darujemo vam 10% popusta na Dermapen 4 tretmane. Akcija traje do kraja ožujka.

Dermapen 4 potiče prirodnu regeneraciju kože, poboljšava teksturu, smanjuje ožiljke, pore i sitne bore te poboljšava kvalitetu vlasišta i potiče rast kose."
        imageSrc="/images/services/mezoterapija/mezoterapija-tijek-tretmana-visage-estetski-studio.jpeg"
        imageAlt="Dan žena - VISAGE studio"
        buttonText="Rezervirajte termin"
        buttonHref="/kontakt"
        invertGradient
      />
      
      <ServicesSectionPreview paddingBottom="pb-0" paddingTop="pt-16" />

      <CTASection
        title="Rezervirajte svoj termin do kraja ožujka"
        description="Iskoristite 10% popusta na Dermapen 4."
        ctaText="Rezervirajte termin"
        ctaLink="/kontakt"
        secondaryCtaText="Pogledajte usluge"
        secondaryCtaLink="/usluge"
        gradientDirection="b"
      />

      <ComboPackagesSectionPreview paddingTop="pt-0" paddingBottom="pb-16" />

      <ContactSection hasTopPadding={false} />
    </main>
  );
}
