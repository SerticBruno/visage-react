"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ComboPackageNavigationModal from "@/components/ui/ComboPackageNavigationModal";
import { ComboPackage } from "@/data/comboPackages";

interface ServiceContentSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  benefits?: readonly string[];
  serviceName?: string;
  focalPoint?: 'left' | 'center' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | `${number}% ${number}%`;
  hasComboPackages?: boolean;
  comboPackages?: ComboPackage[];
  serviceId?: string;
}

export default function ServiceContentSection({
  title,
  description,
  imageSrc,
  imageAlt,
  benefits = [],
  serviceName,
  focalPoint = 'center',
  hasComboPackages = false,
  comboPackages = [],
  serviceId,
}: ServiceContentSectionProps) {
  const [openComboModal, setOpenComboModal] = useState<string | null>(null);
  // Convert focal point to CSS object-position values
  const getObjectPosition = (focalPoint: string) => {
    // Check if focalPoint is a percentage string (e.g., "25% 30%")
    if (focalPoint.includes('%')) {
      return focalPoint;
    }
    
    switch (focalPoint) {
      case 'left':
        return 'left center';
      case 'right':
        return 'right center';
      case 'top':
        return 'center top';
      case 'bottom':
        return 'center bottom';
      case 'top-left':
        return 'left top';
      case 'top-right':
        return 'right top';
      case 'bottom-left':
        return 'left bottom';
      case 'bottom-right':
        return 'right bottom';
      case 'center':
      default:
        return 'center center';
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="order-1 lg:order-2">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{title}</h1>
            <div 
              className="text-l text-gray-600 mb-8 leading-relaxed whitespace-pre-line [&_a]:text-gray-700 [&_a]:underline [&_a]:hover:text-gray-900 [&_a]:transition-colors [&_a]:cursor-pointer"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            
            {benefits.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Prednosti</h2>
                <ul className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-6 w-6 text-slate-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Combo packages section - shown above button for both mobile and desktop */}
            {hasComboPackages && comboPackages.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Dostupno u combo paketima</h2>
                <p className="text-sm text-slate-700 leading-relaxed mb-4">
                  Ova usluga je također dostupna kao dio naših premium combo paketa koji pružaju kompletnu transformaciju i optimalne rezultate:
                </p>
                
                {/* Combo Package Cards - Optimal layout based on count */}
                {comboPackages.length === 5 ? (
                  // Special layout for 5 cards: 3 in first row, 2 in second row
                  <div className="space-y-4 mb-6">
                    {/* First row: 3 cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {comboPackages.slice(0, 3).map((comboPackage) => (
                        <button
                          key={comboPackage.id}
                          onClick={() => setOpenComboModal(comboPackage.id)}
                          className="group relative bg-white rounded-lg shadow-lg overflow-hidden block transition-all duration-300 hover:scale-105 w-full text-left cursor-pointer"
                        >
                          <div className="relative h-24 md:h-32">
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
                                    sizes="(max-width: 768px) 80vw, 40vw"
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300" />
                            
                            {/* Content Container */}
                            <div className="absolute inset-0 p-3 flex flex-col justify-between transition-all duration-300">
                              {/* Title - Always visible */}
                              <h3 className="text-sm md:text-base font-bold text-white">
                                {comboPackage.title}
                              </h3>
                              
                              {/* Hover Content - Hidden by default, appears on hover */}
                              <div className="transform translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                <span className="text-xs md:text-sm text-white font-medium underline">
                                  Saznajte više
                                </span>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    {/* Second row: 2 cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {comboPackages.slice(3, 5).map((comboPackage) => (
                        <button
                          key={comboPackage.id}
                          onClick={() => setOpenComboModal(comboPackage.id)}
                          className="group relative bg-white rounded-lg shadow-lg overflow-hidden block transition-all duration-300 hover:scale-105 w-full text-left cursor-pointer"
                        >
                          <div className="relative h-24 md:h-32">
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
                                    sizes="(max-width: 768px) 80vw, 40vw"
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300" />
                            
                            {/* Content Container */}
                            <div className="absolute inset-0 p-3 flex flex-col justify-between transition-all duration-300">
                              {/* Title - Always visible */}
                              <h3 className="text-sm md:text-base font-bold text-white">
                                {comboPackage.title}
                              </h3>
                              
                              {/* Hover Content - Hidden by default, appears on hover */}
                              <div className="transform translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                <span className="text-xs md:text-sm text-white font-medium underline">
                                  Saznajte više
                                </span>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Standard grid layout for other cases
                  <div className={`grid gap-4 mb-6 ${
                    comboPackages.length === 2
                      ? 'grid-cols-1 md:grid-cols-2' // 2 cards: always 2 columns on medium+ screens
                      : comboPackages.length === 4 
                      ? 'grid-cols-1 md:grid-cols-2' 
                      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  }`}>
                    {comboPackages.map((comboPackage, index) => {
                      // Calculate optimal layout based on total count
                      const totalCount = comboPackages.length;
                      let gridColumnClass = '';
                      
                      if (totalCount > 5) {
                        // 6+ cards: 3 in first row, remaining cards fill subsequent rows
                        if (index >= 3) {
                          gridColumnClass = 'md:col-span-2 lg:col-span-3';
                        }
                      }
                      
                      return (
                        <button
                          key={comboPackage.id}
                          onClick={() => setOpenComboModal(comboPackage.id)}
                          className={`group relative bg-white rounded-lg shadow-lg overflow-hidden block transition-all duration-300 hover:scale-105 w-full text-left cursor-pointer ${gridColumnClass}`}
                        >
                          <div className="relative h-24 md:h-32">
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
                                    sizes="(max-width: 768px) 80vw, 40vw"
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300" />
                            
                            {/* Content Container */}
                            <div className="absolute inset-0 p-3 flex flex-col justify-between transition-all duration-300">
                              {/* Title - Always visible */}
                              <h3 className="text-sm md:text-base font-bold text-white">
                                {comboPackage.title}
                              </h3>
                              
                              {/* Hover Content - Hidden by default, appears on hover */}
                              <div className="transform translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                <span className="text-xs md:text-sm text-white font-medium underline">
                                  Saznajte više
                                </span>
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Button Layout */}
                <div className="flex flex-wrap gap-2">
                  {comboPackages.map((comboPackage) => (
                    <button
                      key={comboPackage.id}
                      onClick={() => setOpenComboModal(comboPackage.id)}
                      className={`flex items-center px-2.5 py-1.5 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer text-left min-w-0 ${
                        comboPackages.length === 1 ? '' : 'flex-1'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-medium text-slate-800 leading-tight">
                          {comboPackage.title}
                        </div>
                        <div className="text-xs text-slate-600 underline hover:text-slate-800 transition-colors font-medium">
                          Detalji
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Link
              href={serviceName ? `/kontakt?service=${encodeURIComponent(serviceName)}` : "/kontakt"}
              className="inline-flex items-center px-8 py-4 border border-slate-600 text-base font-medium rounded-xl shadow-lg text-white bg-slate-800 hover:bg-slate-700 transition-all duration-300 hover:shadow-xl"
            >
              Dogovorite termin
            </Link>
          </div>

          <div className="order-2 lg:order-1">
            <div className="relative h-full min-h-[400px] lg:min-h-[600px] rounded-lg overflow-hidden mb-6">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                style={{ objectPosition: getObjectPosition(focalPoint) }}
                priority
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Combo Package Navigation Modal */}
      {hasComboPackages && comboPackages.length > 0 && serviceId && (
        <ComboPackageNavigationModal
          isOpen={openComboModal !== null}
          onClose={() => setOpenComboModal(null)}
          initialComboPackage={openComboModal ? comboPackages.find(pkg => pkg.id === openComboModal) : undefined}
          serviceId={serviceId}
        />
      )}
    </section>
  );
} 