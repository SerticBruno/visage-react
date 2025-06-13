import ContactSection from '@/components/sections/ContactSection';
import ServicesSection from '@/components/sections/ServicesSection';
import HeroSection from '@/components/sections/HeroSection';
import CTASection from '@/components/sections/CTASection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Usluge - VISAGE Studio",
  description: "Otkrijte našu široku ponudu tretmana za lice i tijelo. Od estetske medicine do kozmetičkih tretmana - sve za vašu ljepotu i dobrobit.",
  openGraph: {
    title: "Usluge - VISAGE Studio",
    description: "Otkrijte našu široku ponudu tretmana za lice i tijelo. Od estetske medicine do kozmetičkih tretmana - sve za vašu ljepotu i dobrobit.",
    images: [
      {
        url: "/images/services/usluge-hero.webp",
        width: 1200,
        height: 630,
        alt: "VISAGE Studio - Usluge"
      }
    ]
  }
};

export default function ServicesPage() {
  return (
    <main>
      <HeroSection
        title="Naše usluge"
        description="Otkrijte našu široku ponudu tretmana za lice i tijelo, dizajniranih da vas učine osjećati se i izgledati najbolje"
        image="/images/services/usluge-hero.webp"
      />
      <ServicesSection />
      <CTASection hasPadding={false}/>
      <ContactSection />
    </main>
  );
} 