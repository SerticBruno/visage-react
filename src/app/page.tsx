import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import PartnersSlider from '@/components/sections/PartnersSlider';
import ContactSection from '@/components/sections/ContactSection';
import CTASection from '@/components/sections/CTASection';
import NewsletterCTASection from '@/components/sections/NewsletterCTASection';
import FAQSection from '@/components/sections/FAQSection';
import { BLOG_ENABLED } from '@/lib/config';
import { getPopularProducts } from '@/data/products';
import { blogPosts } from '@/data/posts';

// Conditionally import FeaturedBlogsSection only when blog is enabled
import FeaturedBlogsSection from '@/components/sections/FeaturedBlogsSection';
import ServiceSlider from '@/components/ui/ServiceSlider';
import { Metadata } from 'next';
import { getPopularServices } from '@/data/services';
import ServicesSectionPreview from '@/components/sections/ServicesSectionPreview';

import ComboPackagesSectionPreview from '@/components/sections/ComboPackagesSectionPreview';
import ShowcaseSlider from '@/components/ui/ShowcaseSlider';
import type { ShowcaseItem } from '@/components/ui/ShowcaseSlider';

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

  // Get popular services using the utility function
  const popularServicesData = getPopularServices();

  // Showcase slider items (mock data with horizontal images)
  const showcaseItems: ShowcaseItem[] = [
    {
      id: 'showcase-dan-zena',
      variant: 'event',
      image: '/images/womensday.svg',
      imageAlt: 'Dan žena - VISAGE studio',
      title: 'Dan žena',
      description: 'Darujemo vam 10% popusta na sve usluge. Posvetite si trenutak i rezervirajte tretman 8. ožujka.',
      link: '/dan-zena',
      eventDate: '8. ožujka',
      discountLabel: '-10% ',
      ctaText: 'Rezervirajte tretman',
    },
    {
      id: 'showcase-1',
      image: '/images/services/toskani-woman-visage-estetski-studio.webp',
      imageAlt: 'Tretmani lica VISAGE studio',
      title: 'Profesionalni tretmani lica',
      description: 'Nekirurški estetski tretmani prilagođeni vašim potrebama',
      link: '/usluge',
      price: 'Od 50 EUR',
      discountLabel: 'Akcija',
    },
    {
      id: 'showcase-2',
      image: '/images/services/pricing-hero-visage-estetski-studio.webp',
      imageAlt: 'Cjenik usluga',
      title: 'Transparentni cjenik',
      description: 'Pregledajte cijene naših tretmana i odaberite ono što vam odgovara',
      link: '/cjenik',
    },
    {
      id: 'showcase-3',
      image: '/images/pages/katalog/katalog-visage-estetski-studio-sisak.webp',
      imageAlt: 'Katalog proizvoda',
      title: 'Katalog proizvoda',
      description: 'TOSKANI, Circadia i drugi vodeći brendovi za njegu kože',
      link: '/katalog',
      price: 'Od 25 EUR',
      oldPrice: '30 EUR',
      discountLabel: '-17%',
    },
    {
      id: 'showcase-4',
      image: '/images/services/woman-face-visage-estetski-studio.webp',
      imageAlt: 'Estetski tretmani',
      title: 'Dermalni fileri i njega',
      description: 'Savjetovanje i tretmani u centru Siska',
      link: '/usluge',
    },
  ];

  // Convert popular products to match Service type for the slider
  const popularProductsData = getPopularProducts().map(product => ({
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
      <HeroSection
        title="VISAGE studio"
        description="Estetski studio specijaliziran za nekirurške estetske tretmane lica koji su prilagođeni vašim potrebama"
        image="/images/services/toskani-woman-visage-estetski-studio.webp"
        ctaText="Dogovorite termin"
        ctaLink="/kontakt"
        variant="home"
      />
      <AboutSection />
      <ShowcaseSlider
        items={showcaseItems}
        title="Istaknuta ponuda"
        description="Posebne ponude i najtraženiji proizvodi za vašu njegu"
        widthFraction={0.8}
      />
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
