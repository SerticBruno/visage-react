'use client'

import Image from 'next/image';
import { comboPackages } from '@/data/comboPackages';
import { useState } from 'react';
import ComboPackageNavigationModal from '@/components/ui/ComboPackageNavigationModal';

export default function ComboPackagesSectionPreview() {
  const [openComboModal, setOpenComboModal] = useState<string | null>(null);

  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#e5e7eb]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Kombinirani Paketi
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Uštedite i doživite optimalne rezultate s našim posebno kreiranim paketima tretmana
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {comboPackages.map((comboPackage) => (
            <button
              key={comboPackage.id}
              onClick={() => setOpenComboModal(comboPackage.id)}
              className="group relative bg-white rounded-lg shadow-lg overflow-hidden block transition-all duration-300 hover:scale-105 w-full text-left cursor-pointer"
            >
              <div className="relative h-48 md:h-64">
                {/* Combined Cover Photo */}
                <div className="relative w-full h-full flex">
                  {/* Services - Max 3 */}
                  {comboPackage.services.slice(0, 3).map((service) => (
                    <div key={`service-${service.id}`} className="relative flex-1">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        loading="lazy"
                        className="object-cover transition-all duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      />
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300" />
                
                {/* Content Container */}
                <div className="absolute inset-0 p-3 md:p-6 flex flex-col justify-end transition-all duration-300">
                  {/* Mobile: Always show title and description */}
                  <div className="md:hidden">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {comboPackage.title}
                    </h3>
                    <div>
                      <p className="text-base text-white line-clamp-2 mb-2">
                        {comboPackage.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-white">
                          {comboPackage.price}
                        </span>
                        {comboPackage.oldPrice && (
                          <span className="text-sm text-white/80 line-through">
                            {comboPackage.oldPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Desktop: Title - Always visible at bottom */}
                  <div className="hidden md:block transform transition-all duration-300 group-hover:opacity-0">
                    <h3 className="text-xl font-bold text-white">
                      {comboPackage.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-bold text-white">
                        {comboPackage.price}
                      </span>
                      {comboPackage.oldPrice && (
                        <span className="text-sm text-white/80 line-through">
                          {comboPackage.oldPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Desktop: Hover Content - Hidden by default, appears on hover */}
                  <div className="hidden md:block absolute bottom-0 left-0 right-0 p-6 transform translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {/* Hover Title */}
                    <h3 className="text-xl font-bold text-white mb-2">
                      {comboPackage.title}
                    </h3>
                    
                    {/* Description and Show More */}
                    <div>
                      <p className="text-sm text-white line-clamp-3 mb-2">
                        {comboPackage.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-white">
                            {comboPackage.price}
                          </span>
                          {comboPackage.oldPrice && (
                            <span className="text-sm text-white/80 line-through">
                              {comboPackage.oldPrice}
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-white font-medium underline">
                          Saznajte više
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Combo Package Navigation Modal */}
      <ComboPackageNavigationModal
        isOpen={openComboModal !== null}
        onClose={() => setOpenComboModal(null)}
        initialComboPackage={openComboModal ? comboPackages.find(pkg => pkg.id === openComboModal) : undefined}
        serviceId=""
      />
    </section>
  );
} 