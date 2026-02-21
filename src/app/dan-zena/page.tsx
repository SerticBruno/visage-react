import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import CTASection from '@/components/sections/CTASection';
import { Metadata } from 'next';
import ComboPackagesSectionPreview from '@/components/sections/ComboPackagesSectionPreview';
import ServicesSectionPreview from '@/components/sections/ServicesSectionPreview';

export const metadata: Metadata = {
  title: 'Dan žena - 8. ožujka',
  description:
    'Proslavite Dan žena u VISAGE studiju. Posvetite si trenutak i rezervirajte tretman 8. ožujka — posebna pažnja za vas.',
  openGraph: {
    title: 'Dan žena | VISAGE Studio',
    description:
      'Proslavite 8. ožujka u VISAGE studiju. Rezervirajte tretman i posvetite si trenutak.',
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
        description="8. ožujka - posvetite si trenutak. Darujemo vam 10% popusta na sve usluge. Rezervirajte tretman i proslavite s njim za sebe."
        image="/images/womensday.svg"
        ctaText="Rezervirajte tretman"
        ctaLink="/kontakt"
        variant="default"
      />

      <AboutSection
        title="Dan žena u VISAGE studiju"
        description="Na Dan žena želimo vam dati do znanja da zaslužujete trenutak samo za sebe. Darujemo vam 10% popusta na sve usluge. Dođite u VISAGE studio u Sisku i prepustite se profesionalnim tretmanima lica i tijela — nekirurškoj estetici, njegi kože i opuštanju koje će vas oživjeti. Rezervirajte termin putem kontakta ili direktno u studiju."
        imageSrc="/images/womensday.png"
        imageAlt="Dan žena - VISAGE studio"
        buttonText="Rezervirajte termin"
        buttonHref="/kontakt"
        invertGradient
      />
      
      <ServicesSectionPreview paddingBottom="pb-0" paddingTop="pt-16" />

      <CTASection
        title="Rezervirajte svoj termin za 8. ožujka"
        description="Darujemo vam 10% popusta na sve usluge. Kontaktirajte nas i dogovorite posjet — radujemo se vašem pozivu ili poruci."
        ctaText="Rezervirajte termin"
        ctaLink="/kontakt"
        secondaryCtaText="Pogledajte usluge"
        secondaryCtaLink="/usluge"
        gradientDirection="b"
      />

      <ComboPackagesSectionPreview paddingTop="pt-0" paddingBottom="pb-0" />

      <ContactSection hasTopPadding={false} />
    </main>
  );
}
