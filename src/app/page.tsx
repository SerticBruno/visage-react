import HeroSection from '@/components/sections/HeroSection';
import PopularTreatmentsSection from '@/components/sections/PopularTreatmentsSection';
import AboutSection from '@/components/sections/AboutSection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <PopularTreatmentsSection />
      <AboutSection />
    </div>
  );
}
