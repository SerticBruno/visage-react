import HeroSection from '@/components/sections/HeroSection';
import PopularTreatmentsSection from '@/components/sections/PopularTreatmentsSection';
import AboutSection from '@/components/sections/AboutSection';
import FeaturedProductsSection from '@/components/sections/FeaturedProductsSection';
import PartnersSlider from '@/components/sections/PartnersSlider';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <PopularTreatmentsSection />
      <FeaturedProductsSection />
      <PartnersSlider />
      <AboutSection />
    </div>
  );
}
