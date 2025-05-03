import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/data/services';
import ContactSection from '@/components/sections/ContactSection';

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Naše Usluge</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(services).map(([pageName, service]) => (
            <Link
              key={pageName}
              href={`/usluge/${pageName}`}
              className="group relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <div className="relative h-64">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-xl font-bold text-white mb-2">{service.title}</h2>
                  <p className="text-white/90">{service.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <ContactSection />
    </div>
  );
} 