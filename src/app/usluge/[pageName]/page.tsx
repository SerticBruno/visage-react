import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { services, type ServiceKey } from '@/data/services';
import ContactSection from '@/components/sections/ContactSection';

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
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="relative h-[400px] lg:h-[600px] rounded-lg overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">{service.title}</h1>
              <p className="text-xl text-gray-600 mb-8">{service.longDescription}</p>
              
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Prednosti</h2>
                <ul className="space-y-2">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/kontakt"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Zakažite termin
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ContactSection />
    </div>
  );
} 