import HeroSection from '@/components/sections/HeroSection';
import AboutContent from '@/components/sections/AboutContent';
import ContactSection from '@/components/sections/ContactSection';

export default function OnamaPage() {
  return (
    <main>
      <HeroSection
        title="O nama"
        description="VISAGE Studio - Vaš partner u estetskoj medicini"
        image="/images/services/Mesoterapia-transdermica-facial.webp"
      />
      <AboutContent />
      <ContactSection/>
    </main>
  );
} 