import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import CTASection from '@/components/sections/CTASection';
import { Metadata } from 'next';
import ComboPackagesSectionPreview from '@/components/sections/ComboPackagesSectionPreview';
import ServicesSectionPreview from '@/components/sections/ServicesSectionPreview';

const PAGE_URL = '/dan-zena';
const OG_IMAGE = '/images/visage-studio-dan-zena.png'; // PNG for SEO/social (Google Ads, Facebook, etc. prefer raster over SVG)

export const metadata: Metadata = {
  title: 'Dan žena - Dermapen 10% popusta',
  description:
    'Proslavite Dan žena u VISAGE studiju. 10% popusta na Dermapen 4 - rezervirajte termin do kraja ožujka.',
  keywords: [
    'Dan žena',
    'Dermapen 4',
    'popust',
    'VISAGE Studio',
    'estetski studio Sisak',
    'tretman kože',
    'tretman vlasišta',
    'rezervacija termina',
  ],
  alternates: {
    canonical: `https://visagestudio.hr${PAGE_URL}`,
  },
  openGraph: {
    type: 'website',
    url: `https://visagestudio.hr${PAGE_URL}`,
    title: 'Dan žena | VISAGE Studio',
    description:
      '10% popusta na Dermapen 4. Rezervirajte termin do kraja ožujka i poklonite svojoj koži i vlasištu obnovu kakvu zaslužuju.',
    siteName: 'VISAGE Studio',
    locale: 'hr_HR',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Dan žena - Dermapen 4 popust 10% - VISAGE Studio Sisak',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dan žena | VISAGE Studio',
    description:
      '10% popusta na Dermapen 4. Rezervirajte termin do kraja ožujka i poklonite svojoj koži i vlasištu obnovu kakvu zaslužuju.',
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
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
        description={`Ovog ožujka odvojite vrijeme za sebe i počastite se Dermapen 4 tretmanom.

Darujemo vam 10% popusta na Dermapen 4 tretmane. Akcija traje do kraja ožujka.

Dermapen 4 potiče prirodnu regeneraciju kože, poboljšava teksturu, smanjuje ožiljke, pore i sitne bore te poboljšava kvalitetu vlasišta i potiče rast kose.`}
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
