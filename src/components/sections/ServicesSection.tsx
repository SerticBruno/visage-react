import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/data/services';

export default function ServicesSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(to bottom, #e5e7eb, #ffffff)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Tretmani po kategorijama
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Pružamo širok spektar profesionalnih tretmana za lice i tijelo, koristeći najkvalitetnije proizvode i najsuvremenije tehnike
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {Object.entries(services).map(([pageName, service]) => (
            <Link
              key={pageName}
              href={`/usluge/${pageName}`}
              className="group relative bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <div className="relative h-48 md:h-64">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-300 group-hover:from-black/90 group-hover:via-black/60" />
                
                {/* Content Container */}
                <div className="absolute inset-0 p-3 md:p-6 flex flex-col justify-between transition-all duration-300 group-hover:justify-start">
                  {/* Title and Description */}
                  <div className="transform transition-all duration-300 group-hover:translate-y-0">
                    <h3 className="text-base md:text-xl font-bold text-white mb-1 md:mb-2 transition-all duration-300 group-hover:mb-2 md:group-hover:mb-3">
                      {service.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-200 opacity-0 max-h-0 overflow-hidden transition-all duration-300 group-hover:opacity-100 group-hover:max-h-20 md:group-hover:max-h-24 line-clamp-2 md:line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* See More Button */}
                  <div className="transform translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 mt-auto">
                    <div className="inline-flex items-center justify-center px-3 py-1.5 bg-white text-gray-900 rounded-full text-xs md:text-sm font-semibold transition-colors duration-300 group-hover:bg-gray-100">
                      Saznajte više
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          
          {/* CTA Card */}
          <Link
            href="/kontakt"
            className="group relative bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 lg:hidden xl:hidden"
          >
            <div className="relative h-48 md:h-64 flex items-center justify-center p-4 md:p-6 text-center">
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10">
                <h3 className="text-base md:text-lg font-bold text-white mb-2">
                  Rezervirajte tretman
                </h3>
                <div className="inline-flex items-center justify-center px-4 py-1.5 bg-white text-slate-700 rounded-full text-sm font-semibold transition-colors duration-300 group-hover:bg-slate-50">
                  Kontakt
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
} 