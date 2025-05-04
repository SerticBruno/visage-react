import ContactSection from '@/components/sections/ContactSection';
import ServicesSection from '@/components/sections/ServicesSection';
import HeroSection from '@/components/sections/HeroSection';
import CTASection from '@/components/sections/CTASection';

export default function ServicesPage() {
  return (
    <main>
      <HeroSection
        title="Naše Usluge"
        description="Otkrijte našu široku ponudu tretmana za lice i tijelo, dizajniranih da vas učine osjećati se i izgledati najbolje"
        image="/images/services/botox-face-girl.webp"
      />
      <ServicesSection />
      <CTASection />
      <ContactSection />
    </main>
  );
} 