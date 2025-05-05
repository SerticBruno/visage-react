import HeroSection from '@/components/sections/HeroSection';
import ContactSection from '@/components/sections/ContactSection';

export default function KontaktPage() {
  return (
    <main>
      <HeroSection
        title="Kontakt"
        description="Javite nam se za sve informacije i rezervacije"
        image="/images/services/kontakt-hero.webp"
      />
      <ContactSection />
    </main>
  );
} 