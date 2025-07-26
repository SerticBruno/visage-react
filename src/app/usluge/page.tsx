import ContactSection from '@/components/sections/ContactSection';
import ServicesSection from '@/components/sections/ServicesSection';
import HeroSection from '@/components/sections/HeroSection';
import ComboPackagesSectionPreview from '@/components/sections/ComboPackagesSectionPreview';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Usluge",
  description: "Otkrijte široku ponudu tretmana za lice i tijelo. Od estetske medicine do kozmetičkih tretmana - sve za vašu ljepotu i dobrobit.",
  openGraph: {
    title: "Usluge",
    description: "Otkrijte široku ponudu tretmana za lice i tijelo. Od estetske medicine do kozmetičkih tretmana - sve za vašu ljepotu i dobrobit.",
    images: [
      {
        url: "/images/services/services-hero-visage-estetski-studio.webp",
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
        description="Otkrijte široku ponudu tretmana za lice, vlasište i tijelo koji su personalizirani vašim individualnim željama i potrebama"
        image="/images/services/services-hero-visage-estetski-studio.webp"
      />
      <ServicesSection />
      <ComboPackagesSectionPreview />
      <ContactSection hasTopPadding={false}/>
    </main>
  );
} 