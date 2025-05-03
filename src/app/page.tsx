import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import PartnersSlider from '@/components/sections/PartnersSlider';
import ContactSection from '@/components/sections/ContactSection';
import CTASection from '@/components/sections/CTASection';
import NewsletterCTASection from '@/components/sections/NewsletterCTASection';
import PopularItemsSection from '@/components/sections/PopularItemsSection';
import { popularServices } from '@/data/popularServices';
import { popularProducts } from '@/data/popularProducts';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <PopularItemsSection
        title="Popularni tretmani"
        items={popularServices}
        viewAllLink="/usluge"
        viewAllText="Pogledajte sve tretmane"
        background="gray"
      />
      <NewsletterCTASection />
      <PopularItemsSection
        title="Popularni proizvodi"
        items={popularProducts}
        viewAllLink="/proizvodi"
        viewAllText="Pogledajte sve proizvode"
        background="white"
      />
      <PartnersSlider />
      <CTASection />
      <ContactSection />
    </main>
  );
}
