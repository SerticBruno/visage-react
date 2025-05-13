import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import PartnersSlider from '@/components/sections/PartnersSlider';
import ContactSection from '@/components/sections/ContactSection';
import CTASection from '@/components/sections/CTASection';
import NewsletterCTASection from '@/components/sections/NewsletterCTASection';
import PopularItemsSection from '@/components/sections/PopularItemsSection';
import FAQSection from '@/components/sections/FAQSection';
import FeaturedBlogsSection from '@/components/sections/FeaturedBlogsSection';
import { popularServices } from '@/data/popularServices';
import { popularProducts } from '@/data/popularProducts';
import { blogPosts } from '@/data/posts';
import ServiceSlider from '@/components/ui/ServiceSlider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "VISAGE Studio - Estetski studio Sisak",
  description: "VISAGE Studio je vodeći estetski studio u centru Siska, certificirani predstavnik za TOSKANI. Pružamo profesionalne usluge estetske medicine i kozmetičke tretmane.",
  openGraph: {
    title: "VISAGE Studio - Estetski studio Sisak",
    description: "VISAGE Studio je vodeći estetski studio u centru Siska, certificirani predstavnik za TOSKANI. Pružamo profesionalne usluge estetske medicine i kozmetičke tretmane.",
    images: [
      {
        url: "/images/services/toskani-woman.webp",
        width: 1200,
        height: 630,
        alt: "VISAGE Studio - Estetski studio Sisak"
      }
    ]
  }
};

export default function Home() {
  // Get the 5 most recent blog posts
  const featuredPosts = blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8);

  return (
    <main>
      <HeroSection
        title="VISAGE studio"
        description="Estetski studio u centru Siska koji je certificirani predstavnik za TOSKANI, Circadia, Dp Dermaceuticals i Skymedic"
        image="/images/services/toskani-woman.webp"
        ctaText="Zakažite termin"
        ctaLink="/kontakt"
      />
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
      <ServiceSlider />
      <CTASection />
      <FeaturedBlogsSection posts={featuredPosts} />
      <FAQSection />
      <PartnersSlider />
      <ContactSection />
    </main>
  );
}
