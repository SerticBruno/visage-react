'use client';

import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Transition } from '@headlessui/react';
import { FaTimes, FaCheck, FaGift, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { ComboPackage, comboPackages } from '@/data/comboPackages';

interface ComboPackageNavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialComboPackage?: ComboPackage;
  serviceId?: string;
}

export default function ComboPackageNavigationModal({ 
  isOpen, 
  onClose, 
  initialComboPackage,
  serviceId,
}: ComboPackageNavigationModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentComboPackage, setCurrentComboPackage] = useState<ComboPackage | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Handle mounting for SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset image loading state when combo package changes
  useEffect(() => {
    if (currentComboPackage) {
      setLoadedImages(new Set());
      setImagesLoaded(false);
    }
  }, [currentComboPackage]);

  // Check if all images are loaded
  useEffect(() => {
    if (currentComboPackage) {
      const totalImages = currentComboPackage.services.slice(0, 3).length;
      if (loadedImages.size === totalImages && totalImages > 0) {
        setImagesLoaded(true);
      }
    }
  }, [loadedImages, currentComboPackage]);

  // Handle image load
  const handleImageLoad = useCallback((imageSrc: string) => {
    setLoadedImages(prev => new Set([...prev, imageSrc]));
  }, []);

  // Initialize when modal opens
  useEffect(() => {
    if (isOpen && !isClosing) {
      if (initialComboPackage) {
        const index = comboPackages.findIndex(pkg => pkg.id === initialComboPackage.id);
        console.log('Modal opened with initial package:', initialComboPackage.title, 'at index:', index);
        setCurrentIndex(index >= 0 ? index : 0);
        setCurrentComboPackage(initialComboPackage);
      } else {
        console.log('Modal opened without initial package, setting to first');
        setCurrentIndex(0);
        setCurrentComboPackage(comboPackages[0]);
      }
    }
  }, [isOpen, initialComboPackage, isClosing]);


  const handlePrevious = useCallback(() => {
    if (isTransitioning) return;
    
    console.log('handlePrevious called', { currentIndex, comboPackagesLength: comboPackages.length });
    
    setIsTransitioning(true);
    const newIndex = currentIndex === 0 ? comboPackages.length - 1 : currentIndex - 1;
    
    console.log('New index will be:', newIndex, 'Package:', comboPackages[newIndex]?.title);
    
    // Update both state values immediately
    setCurrentIndex(newIndex);
    setCurrentComboPackage(comboPackages[newIndex]);
    
    // Reset transition state after a short delay
    setTimeout(() => {
      setIsTransitioning(false);
    }, 150);
  }, [currentIndex, isTransitioning]);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    
    console.log('handleNext called', { currentIndex, comboPackagesLength: comboPackages.length });
    
    setIsTransitioning(true);
    const newIndex = currentIndex === comboPackages.length - 1 ? 0 : currentIndex + 1;
    
    console.log('New index will be:', newIndex, 'Package:', comboPackages[newIndex]?.title);
    
    // Update both state values immediately
    setCurrentIndex(newIndex);
    setCurrentComboPackage(comboPackages[newIndex]);
    
    // Reset transition state after a short delay
    setTimeout(() => {
      setIsTransitioning(false);
    }, 150);
  }, [currentIndex, isTransitioning]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    onClose();
    // Reset closing state after transition
    setTimeout(() => {
      setIsClosing(false);
    }, 300);
  }, [onClose]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen || isTransitioning) return;
      
      if (event.key === 'Escape') {
        handleClose();
      } else if (event.key === 'ArrowLeft') {
        handlePrevious();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, isTransitioning, handleNext, handlePrevious, handleClose]);

  const calculateSavings = (oldPrice: string, newPrice: string) => {
    const old = parseFloat(oldPrice.replace(/\D/g, ''));
    const new_ = parseFloat(newPrice.replace(/\D/g, ''));
    return `${old - new_} EUR`;
  };

  if (!currentComboPackage || !mounted) return null;

  const modalContent = (
    <Transition appear show={isOpen} as={Fragment}>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4">
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30" onClick={handleClose} />
        
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="relative w-full h-full lg:h-auto max-w-4xl max-h-full lg:max-h-none flex items-center justify-center">
            {/* Close Button - Mobile: Inside Modal, Desktop: Outside Modal */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 lg:-top-4 lg:-right-4 z-20 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors cursor-pointer p-2 hover:bg-slate-100 rounded-full bg-white shadow-md"
            >
              <FaTimes size={20} />
            </button>

            {/* Navigation Arrows - Outside Container (Desktop Only) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="hidden lg:block absolute -left-16 sm:-left-20 top-1/2 -translate-y-1/2 z-20 text-slate-600 hover:text-slate-800 focus:outline-none transition-all duration-300 cursor-pointer p-3 sm:p-4 hover:bg-white/80 rounded-full bg-white/60 shadow-lg hover:shadow-xl"
              aria-label="Previous combo package"
              disabled={isTransitioning}
            >
              <FaChevronLeft size={24} className="sm:w-7 sm:h-7" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="hidden lg:block absolute -right-16 sm:-right-20 top-1/2 -translate-y-1/2 z-20 text-slate-600 hover:text-slate-800 focus:outline-none transition-all duration-300 cursor-pointer p-3 sm:p-4 hover:bg-white/80 rounded-full bg-white/60 shadow-lg hover:shadow-xl"
              aria-label="Next combo package"
              disabled={isTransitioning}
            >
              <FaChevronRight size={24} className="sm:w-7 sm:h-7" />
            </button>

            
            <div className="w-full h-full lg:h-auto max-w-4xl max-h-full lg:max-h-none transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all border border-slate-200 flex flex-col">
              {/* Content - Fixed Left + Scrollable Right */}
              <div className="flex flex-col lg:flex-row h-full min-h-0">
                {/* Mobile Layout */}
                <div className="lg:hidden w-full h-full flex flex-col">
                  {/* Images - Fixed height */}
                  <div className={`w-full relative h-32 sm:h-40 bg-slate-50 rounded-t-xl overflow-hidden shadow-sm flex-shrink-0 transition-opacity duration-300 ${
                    isTransitioning ? 'opacity-25' : 'opacity-100'
                  }`}>
                    <div className={`relative w-full h-full flex flex-row transition-opacity duration-500 ${
                      imagesLoaded ? 'opacity-100' : 'opacity-0'
                    }`}>
                      {/* Services - Max 3 */}
                      {currentComboPackage.services.slice(0, 3).map((service) => (
                        <div 
                          key={`service-${service.id}`} 
                          className={`relative flex-1 transition-all ${
                            service.id === serviceId 
                              ? 'ring-2 ring-slate-400 ring-offset-2' 
                              : ''
                          }`}
                        >
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover"
                            onLoad={() => handleImageLoad(service.image)}
                          />
                          {service.id === serviceId && (
                            <div className="absolute top-2 right-2">
                              <FaCheck className="text-slate-500 bg-white rounded-full p-1 shadow-md" size={16} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>
                  
                  {/* Scrollable Content */}
                  <div className={`flex-1 overflow-y-auto p-3 space-y-3 transition-opacity duration-300 ${
                    imagesLoaded 
                      ? 'opacity-100' 
                      : 'opacity-0'
                  }`}>
                    {/* Title and Description */}
                    <div className="bg-slate-50 rounded-xl p-3">
                      <h2 className="text-xl font-bold text-slate-900 mb-2">
                        {currentComboPackage.title}
                      </h2>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {currentComboPackage.description}
                      </p>
                    </div>
                    
                    {/* Pricing Section */}
                    <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl p-4 border border-slate-200 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-2xl font-bold text-slate-900">
                              {currentComboPackage.price}
                            </span>
                            {currentComboPackage.oldPrice && (
                              <span className="text-lg text-slate-500 line-through">
                                {currentComboPackage.oldPrice}
                              </span>
                            )}
                          </div>
                          {currentComboPackage.oldPrice && (
                            <div className="flex items-center gap-2">
                              <div className="text-xs text-slate-700 font-semibold bg-slate-200 px-2 py-1 rounded-lg">
                                Ušteda {calculateSavings(currentComboPackage.oldPrice, currentComboPackage.price)}
                              </div>
                              <div className="text-xs text-slate-600">
                                ({Math.round((1 - parseFloat(currentComboPackage.price.replace(/\D/g, '')) / parseFloat(currentComboPackage.oldPrice.replace(/\D/g, ''))) * 100)}% popusta)
                              </div>
                            </div>
                          )}
                        </div>
                        <Link
                          href={`/kontakt?combo=${encodeURIComponent(currentComboPackage.title)}`}
                          onClick={onClose}
                          className="inline-flex items-center justify-center px-6 py-2 border border-slate-600 text-sm font-medium rounded-lg text-white bg-slate-800 hover:bg-slate-700 transition-all duration-300 hover:shadow-lg whitespace-nowrap"
                        >
                          Rezervirajte paket
                        </Link>
                      </div>
                    </div>

                    {/* Services Details */}
                    <div className="bg-slate-50 rounded-xl p-3">
                      <h3 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                        <FaGift className="text-slate-600" />
                        Uključene usluge
                      </h3>
                      <div className="space-y-2">
                        {currentComboPackage.services.map((service) => {
                          const isCurrentService = service.id === serviceId;
                          
                          const content = (
                            <>
                              <div className={`w-2 h-2 rounded-full mr-2 mt-2 flex-shrink-0 ${
                                isCurrentService 
                                  ? 'bg-slate-600' 
                                  : 'bg-slate-400'
                              }`} />
                              
                              <div className="flex-1 min-w-0">
                                {isCurrentService ? (
                                  <span className="text-sm font-medium text-slate-800 break-words">
                                    {service.title}
                                  </span>
                                ) : (
                                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                    <span className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors break-words">
                                      {service.title}
                                    </span>
                                    <span className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 px-2 py-1 rounded transition-colors font-medium whitespace-nowrap flex-shrink-0">
                                      Saznaj više
                                    </span>
                                  </div>
                                )}
                                {service.shortDescription && (
                                  <p className="text-xs text-slate-500 mt-1">
                                    {service.shortDescription}
                                  </p>
                                )}
                              </div>
                              {isCurrentService && (
                                <FaCheck className="text-slate-600 ml-2 mt-2 flex-shrink-0" size={12} />
                              )}
                            </>
                          );

                          return isCurrentService ? (
                            <div
                              key={service.id}
                              className="flex items-start p-2 rounded-lg border border-slate-300 bg-white"
                            >
                              {content}
                            </div>
                          ) : (
                            <Link
                              key={service.id}
                              href={`/usluge/${service.linkId || service.id}`}
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-start p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors block"
                            >
                              {content}
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Products Details */}
                    {currentComboPackage.products && currentComboPackage.products.length > 0 && (
                      <div className="bg-slate-50 rounded-xl p-3">
                        <h3 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                          <FaStar className="text-slate-600" />
                          Uključeni proizvodi
                        </h3>
                        <div className="space-y-2">
                          {currentComboPackage.products.map((product) => (
                            <Link
                              key={product.id}
                              href={`/katalog?product=${product.id}`}
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-start p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors block"
                            >
                              <div className="w-2 h-2 rounded-full mr-2 mt-1.5 flex-shrink-0 bg-slate-400" />
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 flex-1 min-w-0">
                                <span className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors truncate">
                                  {product.title}
                                </span>
                                <span className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 px-2 py-1 rounded transition-colors font-medium whitespace-nowrap flex-shrink-0">
                                  Saznaj više
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Benefits */}
                    <div className="bg-slate-50 rounded-xl p-3">
                      <h3 className="text-sm font-semibold text-slate-900 mb-2">
                        Prednosti paketa
                      </h3>
                      <ul className="space-y-2">
                        {currentComboPackage.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start text-slate-700">
                            <svg className="h-4 w-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm leading-relaxed">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout - Fixed Left Side */}
                <div className="hidden lg:block w-2/5 p-6 border-r border-slate-100">
                  <div className="relative h-[calc(600px-3rem)] bg-slate-50 rounded-xl overflow-hidden shadow-sm">
                    {/* Loading Overlay */}
                    <div className={`absolute inset-0 bg-slate-200 transition-opacity duration-500 z-10 ${
                      imagesLoaded ? 'opacity-0' : 'opacity-100'
                    }`}>
                      <div className="flex items-center justify-center h-full">
                        <div className="animate-pulse text-slate-400">
                          <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Combined Service and Product Images - Vertical Layout */}
                    <div className={`relative w-full h-full flex flex-col transition-opacity duration-500 ${
                      imagesLoaded ? 'opacity-100' : 'opacity-0'
                    }`}>
                      {/* Services - Max 3 */}
                      {currentComboPackage.services.slice(0, 3).map((service) => (
                        <div 
                          key={`service-${service.id}`} 
                          className={`relative flex-1 transition-all ${
                            service.id === serviceId 
                              ? 'ring-2 ring-slate-400 ring-offset-2' 
                              : ''
                          }`}
                        >
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover"
                            onLoad={() => handleImageLoad(service.image)}
                          />
                          {service.id === serviceId && (
                            <div className="absolute top-2 right-2">
                              <FaCheck className="text-slate-500 bg-white rounded-full p-1 shadow-md" size={16} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>
                </div>
                
                {/* Scrollable Right Side - Desktop Only */}
                <div className="hidden lg:block w-3/5 overflow-y-auto max-h-[600px] flex-1 min-h-0">
                  <div className={`p-4 space-y-3 transition-opacity duration-300 ${
                    imagesLoaded 
                      ? 'opacity-100' 
                      : 'opacity-0'
                  }`}>
                    
                    {/* Title and Description */}
                    <div className="bg-slate-50 rounded-xl p-3">
                      <h2 className="text-xl font-bold text-slate-900 mb-2">
                        {currentComboPackage.title}
                      </h2>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {currentComboPackage.description}
                      </p>
                    </div>
                    
                    {/* Pricing Section */}
                    <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl p-4 border border-slate-200 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-2xl font-bold text-slate-900">
                              {currentComboPackage.price}
                            </span>
                            {currentComboPackage.oldPrice && (
                              <span className="text-lg text-slate-500 line-through">
                                {currentComboPackage.oldPrice}
                              </span>
                            )}
                          </div>
                          {currentComboPackage.oldPrice && (
                            <div className="flex items-center gap-2">
                              <div className="text-xs text-slate-700 font-semibold bg-slate-200 px-2 py-1 rounded-lg">
                                Ušteda {calculateSavings(currentComboPackage.oldPrice, currentComboPackage.price)}
                              </div>
                              <div className="text-xs text-slate-600">
                                ({Math.round((1 - parseFloat(currentComboPackage.price.replace(/\D/g, '')) / parseFloat(currentComboPackage.oldPrice.replace(/\D/g, ''))) * 100)}% popusta)
                              </div>
                            </div>
                          )}
                        </div>
                        <Link
                          href={`/kontakt?combo=${encodeURIComponent(currentComboPackage.title)}`}
                          onClick={onClose}
                          className="inline-flex items-center justify-center px-6 py-2 border border-slate-600 text-sm font-medium rounded-lg text-white bg-slate-800 hover:bg-slate-700 transition-all duration-300 hover:shadow-lg whitespace-nowrap"
                        >
                          Rezervirajte paket
                        </Link>
                      </div>
                    </div>

                    {/* Services Details */}
                    <div className="bg-slate-50 rounded-xl p-3">
                      <h3 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                        <FaGift className="text-slate-600" />
                        Uključene usluge
                      </h3>
                      <div className="space-y-2">
                        {currentComboPackage.services.map((service) => {
                          const isCurrentService = service.id === serviceId;
                          
                          const content = (
                            <>
                              <div className={`w-2 h-2 rounded-full mr-2 mt-2 flex-shrink-0 ${
                                isCurrentService 
                                  ? 'bg-slate-600' 
                                  : 'bg-slate-400'
                              }`} />
                              
                              <div className="flex-1 min-w-0">
                                {isCurrentService ? (
                                  <span className="text-sm font-medium text-slate-800 break-words">
                                    {service.title}
                                  </span>
                                ) : (
                                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                    <span className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors break-words">
                                      {service.title}
                                    </span>
                                    <span className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 px-2 py-1 rounded transition-colors font-medium whitespace-nowrap flex-shrink-0">
                                      Saznaj više
                                    </span>
                                  </div>
                                )}
                                {service.shortDescription && (
                                  <p className="text-xs text-slate-500 mt-1">
                                    {service.shortDescription}
                                  </p>
                                )}
                              </div>
                              {isCurrentService && (
                                <FaCheck className="text-slate-600 ml-2 mt-2 flex-shrink-0" size={12} />
                              )}
                            </>
                          );

                          return isCurrentService ? (
                            <div
                              key={service.id}
                              className="flex items-start p-2 rounded-lg border border-slate-300 bg-white"
                            >
                              {content}
                            </div>
                          ) : (
                            <Link
                              key={service.id}
                              href={`/usluge/${service.linkId || service.id}`}
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-start p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors block"
                            >
                              {content}
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Products Details */}
                    {currentComboPackage.products && currentComboPackage.products.length > 0 && (
                      <div className="bg-slate-50 rounded-xl p-3">
                        <h3 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                          <FaStar className="text-slate-600" />
                          Uključeni proizvodi
                        </h3>
                        <div className="space-y-2">
                          {currentComboPackage.products.map((product) => (
                            <Link
                              key={product.id}
                              href={`/katalog?product=${product.id}`}
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-start p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors block"
                            >
                              <div className="w-2 h-2 rounded-full mr-2 mt-2 flex-shrink-0 bg-slate-400" />
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 flex-1 min-w-0">
                                <span className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors break-words">
                                  {product.title}
                                </span>
                                <span className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 px-2 py-1 rounded transition-colors font-medium whitespace-nowrap flex-shrink-0">
                                  Saznaj više
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Benefits */}
                    <div className="bg-slate-50 rounded-xl p-3">
                      <h3 className="text-sm font-semibold text-slate-900 mb-2">
                        Prednosti paketa
                      </h3>
                      <ul className="space-y-2">
                        {currentComboPackage.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start text-slate-700">
                            <svg className="h-4 w-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm leading-relaxed">{benefit}</span>
                          </li>
                        ))}
                      </ul>
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