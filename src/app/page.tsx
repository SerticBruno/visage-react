import HeroSection from '@/components/sections/HeroSection';
import PopularTreatmentsSection from '@/components/sections/PopularTreatmentsSection';
import AboutSection from '@/components/sections/AboutSection';
import FeaturedProductsSection from '@/components/sections/FeaturedProductsSection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <PopularTreatmentsSection />
      <FeaturedProductsSection />
      <AboutSection />
    </div>
  );
}
