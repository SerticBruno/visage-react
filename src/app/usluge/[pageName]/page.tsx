import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { services, type ServiceKey } from '@/data/services';
import { Service } from '@/data/services/types';
import ContactSection from '@/components/sections/ContactSection';
import HeroSection from '@/components/sections/HeroSection';
import ServiceContentSection from '@/components/sections/ServiceContentSection';
import ChemicalPeelTypesSection from '@/components/sections/ChemicalPeelTypesSection';
import ChemicalPeelRecoverySection from '@/components/sections/ChemicalPeelRecoverySection';
import ServiceDetailsSection from '@/components/sections/ServiceDetailsSection';
import RelatedServicesSection from '@/components/sections/RelatedServicesSection';
import CTASection from '@/components/sections/CTASection';
import { FaArrowLeft } from 'react-icons/fa';
import { notFound } from 'next/navigation';

type Props = {
  params: { pageName: string };
};

const findRelatedServices = (currentService: Service, allServices: Service[]): Service[] => {
  // Define relationships between services
  const serviceRelationships: { [key: string]: string[] } = {
    'kemijski-piling': ['mezoterapija', 'plasmage', 'hidrafacial'],
    'mezoterapija': ['kemijski-piling', 'plasmage', 'hidrafacial'],
    'plasmage': ['kemijski-piling', 'mezoterapija', 'hidrafacial'],
    'hidrafacial': ['kemijski-piling', 'mezoterapija', 'plasmage']
  };

  // Get related service IDs for the current service
  const relatedIds = serviceRelationships[currentService.id] || [];
  
  // Find related services
  const relatedServices = allServices
    .filter(service => relatedIds.includes(service.id))
    .slice(0, 3);

  // If we don't have enough related services, add random ones
  if (relatedServices.length < 3) {
    const remainingServices = allServices
      .filter(service => service.id !== currentService.id && !relatedServices.includes(service))
      .slice(0, 3 - relatedServices.length);
    
    return [...relatedServices, ...remainingServices];
  }

  return relatedServices;
};

export async function generateStaticParams() {
  return Object.keys(services).map((pageName) => ({
    pageName,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = services[params.pageName as ServiceKey];
  
  if (!service) {
    return {
      title: 'Usluga nije pronađena',
      description: 'Tražena usluga nije pronađena u našoj ponudi.',
    };
  }

  const metaDescription = service.metaDescription || service.description;
  const metaKeywords = service.metaKeywords || '';

  return {
    title: `${service.title} | VISAGE studio`,
    description: metaDescription,
    keywords: metaKeywords,
    openGraph: {
      title: `${service.title} | VISAGE studio`,
      description: metaDescription,
      images: [service.image],
      type: 'website',
      locale: 'hr_HR',
      siteName: 'VISAGE studio',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | VISAGE studio`,
      description: metaDescription,
      images: [service.image],
    },
  };
}

export default function ServicePage({ params }: Props) {
  const service = services[params.pageName];
  const allServices = Object.values(services);
  const relatedServices = findRelatedServices(service, allServices);

  if (!service) {
    return notFound();
  }

  return (
    <main className="min-h-screen">
      <HeroSection
        title={service.title}
        description={service.description}
        image={service.heroImage}
        ctaText="Rezervirajte svoj tretman"
        ctaLink="/kontakt"
      />
      <ServiceContentSection
        title={service.title}
        description={service.longDescription}
        imageSrc={service.image}
        imageAlt={service.title}
        benefits={service.benefits}
        reverse={false}
      />
      <ServiceDetailsSection service={service} />
      <RelatedServicesSection
        currentService={service}
        relatedServices={relatedServices}
      />
      <CTASection
        title="Spremni za transformaciju?"
        description="Rezervirajte svoj tretman danas i otkrijte razliku koju VISAGE studio može napraviti."
        ctaText="Kontaktirajte nas"
        ctaLink="/kontakt"
      />
      <ContactSection />
    </main>
  );
} 