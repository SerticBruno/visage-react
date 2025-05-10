import React from 'react';
import { Metadata } from 'next';
import { services, type ServiceKey } from '@/data/services';
import { Service } from '@/data/services/types';
import ContactSection from '@/components/sections/ContactSection';
import HeroSection from '@/components/sections/HeroSection';
import ServiceContentSection from '@/components/sections/ServiceContentSection';
import ServiceDetailsSection from '@/components/sections/ServiceDetailsSection';
import RelatedServicesSection from '@/components/sections/RelatedServicesSection';
import CTASection from '@/components/sections/CTASection';
import { notFound } from 'next/navigation';

interface ServicePageProps {
  params: Promise<{
    pageName: string;
  }>;
}

const findRelatedServices = (currentService: Service, allServices: Service[]): Service[] => {
  return allServices
    .filter(service => service !== currentService)
    .sort((a, b) => {
      const aCommonTags = a.tags.filter(tag => currentService.tags.includes(tag)).length;
      const bCommonTags = b.tags.filter(tag => currentService.tags.includes(tag)).length;
      return bCommonTags - aCommonTags;
    })
    .slice(0, 3);
};

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const service = services[resolvedParams.pageName as ServiceKey];
  
  if (!service) {
    return {
      title: 'Usluga nije pronađena',
      description: 'Tražena usluga ne postoji na našoj stranici.',
    };
  }

  return {
    title: `${service.title} | Visage`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const resolvedParams = await params;
  const currentService = services[resolvedParams.pageName as ServiceKey];
  
  if (!currentService) {
    notFound();
  }

  const allServices = Object.values(services);
  const relatedServices = findRelatedServices(currentService, allServices);

  return (
    <main className="min-h-screen">
      <HeroSection
        title={currentService.title}
        description={currentService.description}
        image={currentService.heroImage}
        ctaText="Rezervirajte svoj tretman"
        ctaLink="/kontakt"
      />
      <ServiceContentSection
        title={currentService.title}
        description={currentService.longDescription}
        imageSrc={currentService.image}
        imageAlt={currentService.title}
        benefits={currentService.benefits}
      />
      <ServiceDetailsSection service={currentService} />
      <CTASection />
      <RelatedServicesSection
        currentService={currentService}
        relatedServices={relatedServices}
      />
      <ContactSection />
    </main>
  );
} 