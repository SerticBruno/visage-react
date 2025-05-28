import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaCheck } from 'react-icons/fa';
import { Service } from '@/data/services/types';

interface ServiceCardProps {
  service: Service;
  className?: string;
}

export default function ServiceCard({ service, className = '' }: ServiceCardProps) {
  return (
    <Link 
      href={`/usluge/${service.id}`}
      className={`block h-full ${className}`}
    >
      <div className="group h-[480px] rounded-2xl overflow-hidden bg-gradient-to-b from-white to-slate-50 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col h-full">
          {/* Image Section */}
          <div className="relative h-[200px] overflow-hidden">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {service.title}
              </h3>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6 flex flex-col">
            <div className="flex flex-col flex-grow">
              <p className="text-base text-slate-600 mb-6 leading-relaxed line-clamp-3">
                {service.description}
              </p>
              
              {/* Benefits List */}
              <div className="mb-6 space-y-2">
                {service.benefits.slice(0, 3).map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center">
                      <FaCheck className="w-3 h-3 text-emerald-500" />
                    </div>
                    <span className="text-sm text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-xl hover:from-slate-700 hover:to-slate-600 transition-all duration-300 shadow-lg hover:shadow-xl mt-auto w-fit"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="font-medium">Saznajte više</span>
              <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 