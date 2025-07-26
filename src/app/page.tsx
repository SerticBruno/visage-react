import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import PartnersSlider from '@/components/sections/PartnersSlider';
import ContactSection from '@/components/sections/ContactSection';
import CTASection from '@/components/sections/CTASection';
import NewsletterCTASection from '@/components/sections/NewsletterCTASection';
import FAQSection from '@/components/sections/FAQSection';
import { BLOG_ENABLED } from '@/lib/config';
import { popularProducts } from '@/data/popularProducts';
import { blogPosts } from '@/data/posts';

// Conditionally import FeaturedBlogsSection only when blog is enabled
import FeaturedBlogsSection from '@/components/sections/FeaturedBlogsSection';
import ServiceSlider from '@/components/ui/ServiceSlider';
import { Metadata } from 'next';
import { popularServices } from '@/data/popularServices';
import ServicesSectionPreview from '@/components/sections/ServicesSectionPreview';
import ComboPackagesInlineSection from '@/components/sections/ComboPackagesInlineSection';

export const metadata: Metadata = {
  title: "Estetski studio Sisak",
  description: "VISAGE Studio je vodeći estetski studio u centru Siska, certificirani predstavnik za TOSKANI. Pružamo profesionalne usluge estetske medicine i kozmetičke tretmane.",
  openGraph: {
    title: "Estetski studio Sisak",
    description: "VISAGE Studio je vodeći estetski studio u centru Siska, certificirani predstavnik za TOSKANI. Pružamo profesionalne usluge estetske medicine i kozmetičke tretmane.",
    images: [
      {
        url: "/images/services/toskani-woman-visage-estetski-studio.webp",
        width: 1200,
        height: 630,
        alt: "VISAGE Studio - Estetski studio Sisak"
      }
    ]
  }
};

export default function Home() {
  // Get the 8 most recent blog posts (only when blog is enabled)
  const featuredPosts = BLOG_ENABLED ? blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8) : [];

  // Convert popular services to match Service type
  const popularServicesData = popularServices.map(service => ({
    id: service.link.split('/').pop() || '',
    title: service.title,
    description: service.description,
    longDescription: service.description,
    image: service.image,
    heroImage: service.image,
    benefits: service.features,
    metaDescription: service.description,
    metaKeywords: '',
    steps: [],
    stepContents: {},
    tags: []
  }));

  // Convert popular products to match Service type
  const popularProductsData = popularProducts.map(product => ({
    id: product.id,
    title: product.title,
    description: product.description,
    longDescription: product.description,
    image: product.image,
    heroImage: product.image,
    benefits: product.features,
    metaDescription: product.description,
    metaKeywords: '',
    steps: [],
    stepContents: {},
    tags: []
  }));

  return (
    <main>
      <HeroSection
        title="VISAGE studio"
        description="Estetski studio specijaliziran za nekirurške estetske tretmane lica koji su prilagođeni vašim potrebama"
        image="/images/services/toskani-woman-visage-estetski-studio.webp"
        ctaText="Dogovorite termin"
        ctaLink="/kontakt"
        variant="home"
      />
      <AboutSection />
      <ServiceSlider 
        services={popularServicesData}
        title="Popularni tretmani"
        description="Otkrijte naše najtraženije tretmane za lice i tijelo"
        showViewAll={true}
        viewAllLink="/usluge"
        viewAllText="Pogledajte sve usluge"
      />
      <ComboPackagesInlineSection />
      <NewsletterCTASection />
      <ServiceSlider 
        services={popularProductsData}
        title="Popularni proizvodi"
        description="Otkrijte naše najtraženije proizvode za njegu kože"
        showViewAll={true}
        viewAllLink="/katalog"
        viewAllText="Pogledajte sve proizvode"
      />
      <ServicesSectionPreview/>
      <CTASection gradientDirection='b'/>
      {BLOG_ENABLED && <FeaturedBlogsSection posts={featuredPosts} />}
      <FAQSection />
      <PartnersSlider />
      <ContactSection hasTopPadding={false}/>
    </main>
  );
}
