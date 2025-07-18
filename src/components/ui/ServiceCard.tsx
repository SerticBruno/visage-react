import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaCheck } from 'react-icons/fa';
import { Service } from '@/data/services/types';

interface ServiceCardProps {
  service: Service;
  className?: string;
}

export default function ServiceCard({ service, className = '' }: ServiceCardProps) {
  // Check if this is a product card by checking if the ID is numeric (product IDs are numeric)
  const isProductCard = service.id && /^\d+$/.test(service.id);
  
  // Generate the appropriate link
  const getLink = () => {
    if (isProductCard) {
      // For product cards, link to katalog with product ID parameter
      return `/katalog?product=${service.id}`;
    }
    // For service cards, use the regular service link
    return `/usluge/${service.id}`;
  };

  return (
    <Link 
      href={getLink()}
      className={`block h-full ${className}`}
    >
      <div className="group rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        {/* Image Section */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 flex flex-col">
          <div className="flex flex-col flex-grow">
            <p className="text-base text-[#334155] mb-6 leading-relaxed line-clamp-3">
              {service.description}
            </p>
            
            {/* Benefits List */}
            <div className="mb-6 space-y-2">
              {service.benefits.slice(0, 3).map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <FaCheck className="w-3 h-3 text-gray-600" />
                  </div>
                  <span className="text-sm text-[#1e293b]">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="group inline-flex items-center gap-2 px-6 py-3 bg-[#1e293b] text-white rounded-xl hover:bg-[#334155] transition-all duration-300 shadow-lg hover:shadow-xl mt-auto w-fit"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-medium">Saznajte više</span>
            <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
} 