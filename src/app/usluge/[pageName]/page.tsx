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
import {
  BreadcrumbListStructuredData,
  ServiceStructuredData,
} from '@/components/StructuredData';
import { businessData } from '@/data/business';

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

  const description = service.metaDescription || service.description;
  const pageTitle = `${service.title} Sisak`;
  const keywords = service.metaKeywords
    ? service.metaKeywords.split(',').map((s) => s.trim()).filter(Boolean)
    : service.tags;
  const canonicalUrl = `https://visagestudio.hr/usluge/${resolvedParams.pageName}`;
  const imageUrl = service.heroImage.startsWith('http')
    ? service.heroImage
    : `https://visagestudio.hr${service.heroImage}`;

  return {
    title: pageTitle,
    description,
    keywords: keywords.length ? keywords : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${pageTitle} | VISAGE Studio`,
      description,
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${service.title} – VISAGE Studio Sisak`,
        },
      ],
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
  const serviceUrl = `https://visagestudio.hr/usluge/${resolvedParams.pageName}`;
  const serviceImageUrl = currentService.heroImage.startsWith('http')
    ? currentService.heroImage
    : `https://visagestudio.hr${currentService.heroImage}`;

  return (
    <main className="min-h-screen">
      <BreadcrumbListStructuredData
        items={[
          { name: 'Početna', url: '/' },
          { name: 'Usluge', url: '/usluge' },
          { name: currentService.title, url: `/usluge/${resolvedParams.pageName}` },
        ]}
      />
      <ServiceStructuredData
        data={{
          name: currentService.title,
          description: currentService.metaDescription || currentService.description,
          url: serviceUrl,
          image: serviceImageUrl,
          providerName: businessData.name,
          providerUrl: businessData.url,
          areaServed: businessData.areaServed,
        }}
      />
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