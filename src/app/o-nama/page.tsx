import HeroSection from '@/components/sections/HeroSection';
import AboutContent from '@/components/sections/AboutContent';
import ContactSection from '@/components/sections/ContactSection';

export default function OnamaPage() {
  return (
    <main>
      <HeroSection
        title="O nama"
        description="VISAGE Studio - Vaš partner u estetskoj medicini"
        image="/images/plasmage-hero.webp"
      />
      <AboutContent />
      <ContactSection/>
    </main>
  );
} 