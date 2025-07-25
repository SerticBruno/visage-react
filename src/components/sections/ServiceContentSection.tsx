"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SingleComboPackageModal from "@/components/ui/SingleComboPackageModal";
import { ComboPackage } from "@/data/comboPackages";

interface ServiceContentSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  benefits?: readonly string[];
  serviceName?: string;
  focalPoint?: 'left' | 'center' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
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
            
            {hasComboPackages && comboPackages.length > 0 && (
              <div className="mb-8 p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200">
                <p className="text-sm text-slate-700 leading-relaxed mb-4">
                  Ova usluga je također dostupna kao dio naših premium combo paketa koji pružaju kompletnu transformaciju i optimalne rezultate:
                </p>
                <div className="space-y-2">
                  {comboPackages.map((comboPackage) => (
                    <button
                      key={comboPackage.id}
                      onClick={() => setOpenComboModal(comboPackage.id)}
                      className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                        <span className="text-sm font-medium text-slate-800">
                          {comboPackage.title}
                        </span>
                      </div>
                      <span className="text-sm text-slate-600 underline hover:text-slate-800 transition-colors font-medium">
                        Pogledaj detalje
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
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

                        <Link
              href={serviceName ? `/kontakt?service=${encodeURIComponent(serviceName)}` : "/kontakt"}
              className="inline-flex items-center px-8 py-4 border border-slate-600 text-base font-medium rounded-xl shadow-lg text-white bg-slate-800 hover:bg-slate-700 transition-all duration-300 hover:shadow-xl"
            >
              Dogovorite termin
            </Link>
          </div>

          <div className="relative h-[400px] lg:h-[600px] rounded-lg overflow-hidden order-2 lg:order-1">
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
      
      {/* Combo Package Modals */}
      {hasComboPackages && comboPackages.length > 0 && serviceId && 
        comboPackages.map((comboPackage) => (
          <SingleComboPackageModal
            key={comboPackage.id}
            isOpen={openComboModal === comboPackage.id}
            onClose={() => setOpenComboModal(null)}
            comboPackage={comboPackage}
            serviceId={serviceId}
            serviceTitle={title}
          />
        ))
      }
    </section>
  );
} 