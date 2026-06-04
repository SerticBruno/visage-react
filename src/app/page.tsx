import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import PartnersSlider from '@/components/sections/PartnersSlider';
import ContactSection from '@/components/sections/ContactSection';
import CTASection from '@/components/sections/CTASection';
import NewsletterCTASection from '@/components/sections/NewsletterCTASection';
import FAQSection from '@/components/sections/FAQSection';
import { BLOG_ENABLED } from '@/lib/config';
import { getPopularProducts } from '@/lib/products-db';
import { blogPosts } from '@/data/posts';

// Conditionally import FeaturedBlogsSection only when blog is enabled
import FeaturedBlogsSection from '@/components/sections/FeaturedBlogsSection';
import ServiceSlider from '@/components/ui/ServiceSlider';
import { Metadata } from 'next';
import { getPopularServices } from '@/data/services';
import ServicesSectionPreview from '@/components/sections/ServicesSectionPreview';
import ComboPackagesSectionPreview from '@/components/sections/ComboPackagesSectionPreview';
import { FAQPageStructuredData } from '@/components/StructuredData';
import { faqItems } from '@/data/faq';

const HOME_TITLE = 'VISAGE Studio Sisak - Estetski & Kozmetički Tretmani';
const HOME_DESCRIPTION =
  'VISAGE Studio - certificirani estetski studio u Sisku. Mezoterapija, Dermapen 4, skin boosteri, PRP, Plasmage, fileri. Rezervirajte termin.';

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  keywords: [
    'estetski studio Sisak',
    'kozmetički studio Sisak',
    'mezoterapija Sisak',
    'Dermapen Sisak',
    'TOSKANI Sisak',
    'tretmani lica Sisak',
    'estetska medicina Sisak',
    'VISAGE Studio',
  ],
  alternates: {
    canonical: 'https://visagestudio.hr',
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: 'https://visagestudio.hr',
    images: [
      {
        url: '/images/services/toskani-woman-visage-estetski-studio.webp',
        width: 1200,
        height: 630,
        alt: 'VISAGE Studio - Estetski studio Sisak',
      },
    ],
  },
};

export default async function Home() {
  // Get the 8 most recent blog posts (only when blog is enabled)
  const featuredPosts = BLOG_ENABLED ? blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8) : [];

  // Get popular services using the utility function
  const popularServicesData = getPopularServices();

  // Convert popular products to match Service type for the slider
  const popularProductsData = (await getPopularProducts()).map(product => ({
    id: product.id,
    title: product.title,
    description: product.description,
    previewDescription: product.previewDescription || product.description,
    longDescription: product.description,
    image: product.image,
    heroImage: product.image,
    benefits: product.benefits || product.features || [],
    metaDescription: product.description,
    metaKeywords: '',
    steps: [],
    stepContents: {},
    tags: []
  }));

  return (
    <main>
      <FAQPageStructuredData items={faqItems} />
      <HeroSection
        title="VISAGE Studio"
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
      <ComboPackagesSectionPreview />
      <NewsletterCTASection />
      <ServiceSlider 
        services={popularProductsData}
        title="Popularni proizvodi"
        description="Otkrijte naše najtraženije proizvode za njegu kože"
        showViewAll={true}
        viewAllLink="/katalog"
        viewAllText="Pogledajte sve proizvode"
        imageFit="contain"
      />
      <ServicesSectionPreview/>
      <CTASection gradientDirection='n'/>
      {BLOG_ENABLED && <FeaturedBlogsSection posts={featuredPosts} />}
      <FAQSection />
      <PartnersSlider />
      <ContactSection hasTopPadding={false}/>
    </main>
  );
}
