import { Suspense } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import ContactSection from '@/components/sections/ContactSection';
import NewsletterCTASection from '@/components/sections/NewsletterCTASection';
import KatalogCatalog from './KatalogCatalog';
import KatalogCatalogSkeleton from './KatalogCatalogSkeleton';

export default function KatalogPage() {
  return (
    <>
      <HeroSection
        title="Katalog proizvoda"
        description="Otkrijte široku ponudu proizvoda za njegu lica i tijela"
        image="/images/pages/katalog/katalog-visage-estetski-studio-sisak.webp"
      />
      <Suspense fallback={<KatalogCatalogSkeleton />}>
        <KatalogCatalog />
      </Suspense>
      <NewsletterCTASection />
      <ContactSection hasTopPadding={true} />
    </>
  );
}
