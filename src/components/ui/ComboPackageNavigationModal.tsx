'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Transition } from '@headlessui/react';
import { FaTimes, FaCheck, FaGift, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { ComboPackage, comboPackages } from '@/data/comboPackages';

interface ComboPackageNavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialComboPackage?: ComboPackage;
  serviceId?: string;
  serviceTitle?: string;
}

export default function ComboPackageNavigationModal({ 
  isOpen, 
  onClose, 
  initialComboPackage,
  serviceId,
  serviceTitle,
}: ComboPackageNavigationModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentComboPackage, setCurrentComboPackage] = useState<ComboPackage | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle mounting for SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize with the initial combo package or first one
  useEffect(() => {
    if (initialComboPackage) {
      const index = comboPackages.findIndex(pkg => pkg.id === initialComboPackage.id);
      setCurrentIndex(index >= 0 ? index : 0);
      setCurrentComboPackage(initialComboPackage);
    } else {
      setCurrentIndex(0);
      setCurrentComboPackage(comboPackages[0]);
    }
  }, [initialComboPackage, isOpen]);

  // Handle transition state
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handlePrevious = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const newIndex = currentIndex === 0 ? comboPackages.length - 1 : currentIndex - 1;
    
    // Fade out first
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setCurrentComboPackage(comboPackages[newIndex]);
    }, 150); // Half of the transition duration
  };

  const handleNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const newIndex = currentIndex === comboPackages.length - 1 ? 0 : currentIndex + 1;
    
    // Fade out first
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setCurrentComboPackage(comboPackages[newIndex]);
    }, 150); // Half of the transition duration
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen || isTransitioning) return;
      
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft') {
        handlePrevious();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, isTransitioning]);

  const calculateSavings = (oldPrice: string, newPrice: string) => {
    const old = parseFloat(oldPrice.replace(/\D/g, ''));
    const new_ = parseFloat(newPrice.replace(/\D/g, ''));
    return `${old - new_} EUR`;
  };

  if (!currentComboPackage || !mounted) return null;

  const modalContent = (
    <Transition appear show={isOpen} as={Fragment}>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30" onClick={onClose} />
        
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="relative">
            {/* Close Button - Outside Modal */}
            <button
              onClick={onClose}
              className="absolute -top-4 -right-4 z-20 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors cursor-pointer p-2 hover:bg-slate-100 rounded-full bg-white shadow-md"
            >
              <FaTimes size={20} />
            </button>

            {/* Navigation Arrows - Outside Container */}
            <button
              onClick={handlePrevious}
              disabled={isTransitioning}
              className="absolute -left-16 sm:-left-20 top-1/2 -translate-y-1/2 z-20 text-slate-600 hover:text-slate-800 focus:outline-none transition-all duration-300 cursor-pointer p-3 sm:p-4 hover:bg-white/80 rounded-full bg-white/60 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous combo package"
            >
              <FaChevronLeft size={24} className="sm:w-7 sm:h-7" />
            </button>

            <button
              onClick={handleNext}
              disabled={isTransitioning}
              className="absolute -right-16 sm:-right-20 top-1/2 -translate-y-1/2 z-20 text-slate-600 hover:text-slate-800 focus:outline-none transition-all duration-300 cursor-pointer p-3 sm:p-4 hover:bg-white/80 rounded-full bg-white/60 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next combo package"
            >
              <FaChevronRight size={24} className="sm:w-7 sm:h-7" />
            </button>

            {/* Package Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 text-white bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              {currentIndex + 1} / {comboPackages.length}
            </div>
            
            <div className="w-[900px] max-w-[95vw] transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all border border-slate-200 max-h-[90vh]">
              {/* Header */}
              <div className={`relative h-64 overflow-hidden transition-opacity duration-300 ${isTransitioning ? 'opacity-25' : 'opacity-100'}`}>
                {/* Combined Service and Product Images */}
                <div className="relative w-full h-full flex">
                  {/* Services */}
                  {currentComboPackage.services.map((service) => (
                    <div key={`service-${service.id}`} className="relative flex-1">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                  {/* Products */}
                  {currentComboPackage.products && currentComboPackage.products.map((product) => (
                    <div key={`product-${product.id}`} className="relative flex-1">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Header Content */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {currentComboPackage.title}
                  </h2>
                  <p className="text-white/90 text-lg">
                    {currentComboPackage.description}
                  </p>
                </div>
              </div>
              
              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-16rem)]">
                <div className={`p-6 transition-opacity duration-300 ${isTransitioning ? 'opacity-25' : 'opacity-100'}`}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Services Included */}
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <FaGift className="text-slate-600" />
                        Uključene usluge
                      </h3>
                      <div className="space-y-3">
                        {currentComboPackage.services.map((service) => (
                          <div 
                            key={service.id}
                            className={`flex items-center p-3 rounded-lg border ${
                              service.id === serviceId 
                                ? 'bg-slate-100 border-slate-300' 
                                : 'bg-white border-slate-200'
                            }`}
                          >
                            <div className={`w-3 h-3 rounded-full mr-3 ${
                              service.id === serviceId 
                                ? 'bg-slate-600' 
                                : 'bg-slate-400'
                            }`} />
                            
                            <div className="flex-1">
                              {service.id === serviceId ? (
                                <span className="font-medium text-slate-800">
                                  {service.title}
                                </span>
                              ) : (
                                <div className="flex items-center justify-between w-full">
                                  <Link
                                    href={`/usluge/${service.id}`}
                                    className="font-medium underline text-slate-700 hover:text-slate-900 transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {service.title}
                                  </Link>
                                  <Link
                                    href={`/usluge/${service.id}`}
                                    className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 px-2 py-1 rounded-md transition-colors font-medium"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    Saznaj više
                                  </Link>
                                </div>
                              )}
                              {service.shortDescription && (
                                <p className="text-sm text-slate-500 mt-1">
                                  {service.shortDescription}
                                </p>
                              )}
                            </div>
                            {service.id === serviceId && (
                              <FaCheck className="text-green-600 ml-2" size={16} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Products Included */}
                    {currentComboPackage.products && currentComboPackage.products.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">
                          Uključeni proizvodi
                        </h3>
                        <div className="space-y-3">
                          {currentComboPackage.products.map((product) => (
                            <div 
                              key={product.id}
                              className="flex items-center p-3 rounded-lg border border-slate-200 bg-white"
                            >
                              <div className="w-3 h-3 rounded-full mr-3 bg-slate-400" />
                              <div className="flex items-center justify-between w-full">
                                <Link
                                  href={`/katalog?product=${product.id}`}
                                  className="text-slate-700 font-medium underline hover:text-slate-900 transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {product.title}
                                </Link>
                                <Link
                                  href={`/katalog?product=${product.id}`}
                                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 px-2 py-1 rounded-md transition-colors font-medium"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  Saznaj više
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Pricing */}
                    <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 border border-slate-200">
                      <h3 className="text-xl font-bold text-slate-900 mb-4">
                        Cijena paketa
                      </h3>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-3xl font-bold text-slate-900">
                            {currentComboPackage.price}
                          </span>
                          {currentComboPackage.oldPrice && (
                            <span className="text-lg text-slate-500 line-through ml-3">
                              {currentComboPackage.oldPrice}
                            </span>
                          )}
                        </div>
                        {currentComboPackage.oldPrice && (
                          <div className="text-sm text-green-600 font-semibold bg-green-50 px-3 py-2 rounded-lg">
                            Ušteda {calculateSavings(currentComboPackage.oldPrice, currentComboPackage.price)}
                          </div>
                        )}
                      </div>
                      {currentComboPackage.oldPrice && (
                        <div className="text-sm text-slate-600 mb-4">
                          Uštedite {Math.round((1 - parseFloat(currentComboPackage.price.replace(/\D/g, '')) / parseFloat(currentComboPackage.oldPrice.replace(/\D/g, ''))) * 100)}% u odnosu na pojedinačne usluge
                        </div>
                      )}
                      
                      <Link
                        href={`/kontakt?combo=${encodeURIComponent(currentComboPackage.title)}`}
                        onClick={onClose}
                        className="w-full inline-flex items-center justify-center px-6 py-3 border border-slate-600 text-base font-medium rounded-xl text-white bg-slate-800 hover:bg-slate-700 transition-all duration-300 hover:shadow-lg"
                      >
                        Rezervirajte paket
                      </Link>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <FaCheck className="text-green-600" />
                        Prednosti paketa
                      </h3>
                      <ul className="space-y-3">
                        {currentComboPackage.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start text-slate-700">
                            <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="leading-relaxed">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );

  // Render modal using portal to avoid clipping issues
  return createPortal(modalContent, document.body);
} 