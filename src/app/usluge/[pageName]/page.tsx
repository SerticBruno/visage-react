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
    'kemijski-piling': ['mezoterapija', 'plasmage', 'skin-boosters'],
    'mezoterapija': ['kemijski-piling', 'plasmage', 'skin-boosters'],
    'plasmage': ['kemijski-piling', 'mezoterapija', 'skin-boosters'],
    'skin-boosters': ['mezoterapija', 'dermalni-fileri', 'terapija-bora-lica'],
    'dermalni-fileri': ['skin-boosters', 'terapija-bora-lica', 'beauty-tretmani'],
    'terapija-bora-lica': ['dermalni-fileri', 'skin-boosters', 'beauty-tretmani'],
    'beauty-tretmani': ['terapija-bora-lica', 'bio-sculpture', 'dermalni-fileri'],
    'bio-sculpture': ['beauty-tretmani', 'kemijski-piling', 'mezoterapija']
  };

  // Get the current service key
  const currentServiceKey = Object.entries(services).find(([_, service]) => service === currentService)?.[0];
  
  if (!currentServiceKey) {
    return [];
  }

  // Get related service IDs for the current service
  const relatedIds = serviceRelationships[currentServiceKey] || [];
  
  // Find related services
  const relatedServices = allServices
    .filter(service => {
      const serviceKey = Object.entries(services).find(([_, s]) => s === service)?.[0];
      const isRelated = relatedIds.includes(serviceKey || '');
      if (currentServiceKey === 'kemijski-piling') {
        console.log('Checking service:', service.title, 'Key:', serviceKey, 'Is related:', isRelated);
      }
      return isRelated;
    })
    .slice(0, 3);

  // If we don't have enough related services, add some from the remaining services
  if (relatedServices.length < 3) {
    const remainingServices = allServices
      .filter(service => {
        const serviceKey = Object.entries(services).find(([_, s]) => s === service)?.[0];
        return serviceKey !== currentServiceKey && 
               !relatedServices.some(rs => rs.id === service.id);
      })
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