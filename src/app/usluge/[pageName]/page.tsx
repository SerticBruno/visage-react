import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { services, type ServiceKey } from '@/data/services';
import ContactSection from '@/components/sections/ContactSection';
import HeroSection from '@/components/sections/HeroSection';
import ServiceStepsNav from '@/components/ServiceStepsNav';
import ServiceStepSections from '@/components/ServiceStepSections';
import {
  FaRegFileAlt,
  FaUsers,
  FaRegEdit,
  FaRegClock,
  FaRegHospital,
  FaRegFile,
  FaHandHoldingUsd
} from 'react-icons/fa';

const iconMap = {
  FaRegFileAlt,
  FaUsers,
  FaRegEdit,
  FaRegClock,
  FaRegHospital,
  FaRegFile,
  FaHandHoldingUsd
};

type Props = {
  params: { pageName: string };
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

  return {
    title: `${service.title} | VISAGE studio`,
    description: service.metaDescription,
    keywords: service.metaKeywords,
    openGraph: {
      title: `${service.title} | VISAGE studio`,
      description: service.metaDescription,
      images: [service.image],
    },
  };
}

export default function ServicePage({ params }: Props) {
  console.log('Service page params:', params);
  const service = services[params.pageName as ServiceKey];

  if (!service) {
    console.log('Service not found for pageName:', params.pageName);
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Usluga nije pronađena</h1>
            <p className="mt-4 text-lg text-gray-600">
              Tražena usluga nije pronađena u našoj ponudi.
            </p>
            <Link
              href="/usluge"
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Povratak na sve usluge
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <HeroSection
        title={service.title}
        description={service.description}
        image={service.heroImage}
      />
      {service.steps && <ServiceStepsNav steps={service.steps} />}
      {service.steps && service.stepContents && (
        <ServiceStepSections steps={service.steps} stepContents={service.stepContents} />
      )}
      <ContactSection />
    </div>
  );
} 