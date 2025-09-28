import React from 'react';
import { Metadata } from 'next';
import { services, type ServiceKey } from '@/data/services';
import { Service } from '@/data/services/types';
import ContactSection from '@/components/sections/ContactSection';
import HeroSection from '@/components/sections/HeroSection';
import ServiceContentSection from '@/components/sections/ServiceContentSection';
import ServiceDetailsSection from '@/components/sections/ServiceDetailsSection';
import BeautyTreatmentsSection from '@/components/sections/BeautyTreatmentsSection';
import RelatedServicesSection from '@/components/sections/RelatedServicesSection';

import CTASection from '@/components/sections/CTASection';
import { notFound } from 'next/navigation';
import { individualBeautyTreatments } from '@/data/services/beautyTreatments';
import { findComboPackagesWithService } from '@/lib/services';

interface ServicePageProps {
  params: Promise<{
    pageName: string;
  }>;
}

const findRelatedServices = (currentService: Service, allServices: Service[]): Service[] => {
  // If the service has explicitly defined related services, use those
  if (currentService.relatedServices && currentService.relatedServices.length > 0) {
    return currentService.relatedServices
      .map(serviceId => allServices.find(service => service.id === serviceId))
      .filter((service): service is Service => service !== undefined);
  }
  
  // Fallback to finding related services based on common tags
  return allServices
    .filter(service => service !== currentService)
    .sort((a, b) => {
      const aCommonTags = a.tags.filter(tag => currentService.tags.includes(tag)).length;
      const bCommonTags = b.tags.filter(tag => currentService.tags.includes(tag)).length;
      return bCommonTags - aCommonTags;
    });
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
    title: service.title,
    description: service.description,
    keywords: service.tags,
    alternates: {
      canonical: `https://visagestudio.hr/usluge/${resolvedParams.pageName}`,
    },
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
  const comboPackagesWithService = findComboPackagesWithService(currentService.id);

  return (
    <main className="min-h-screen">
      <HeroSection
        title={currentService.title}
        description={currentService.description}
        image={currentService.heroImage}
        ctaText="Rezervirajte svoj tretman"
        ctaLink="/kontakt"
        serviceName={currentService.title}
        mobileFocalPoint={currentService.mobileFocalPoint}
      />
      <ServiceContentSection
        title={currentService.title}
        description={currentService.longDescription}
        imageSrc={currentService.image}
        imageAlt={currentService.title}
        benefits={currentService.benefits}
        serviceName={currentService.title}
        focalPoint={currentService.focalPoint}
        hasComboPackages={comboPackagesWithService.length > 0}
        comboPackages={comboPackagesWithService}
        serviceId={currentService.id}
      />
      {currentService.id === 'beauty-tretmani' ? (
        <BeautyTreatmentsSection treatments={individualBeautyTreatments} />
      ) : (
        <ServiceDetailsSection service={currentService} />
      )}

      <CTASection gradientDirection='b'/>
      <RelatedServicesSection
        currentService={currentService}
        relatedServices={relatedServices}
      />
      <ContactSection />
    </main>
  );
} 