import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import PopularTreatmentsSection from '@/components/sections/PopularTreatmentsSection';
import PartnersSlider from '@/components/sections/PartnersSlider';
import ContactSection from '@/components/sections/ContactSection';
import CTASection from '@/components/sections/CTASection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <PopularTreatmentsSection />
      <PartnersSlider />
      <CTASection />
      <ContactSection />
    </main>
  );
}
