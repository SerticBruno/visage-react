'use client';

import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { Transition } from '@headlessui/react';
import { FaTimes, FaLeaf, FaTag, FaFire, FaShieldAlt, FaStar } from 'react-icons/fa';
import Image from 'next/image';
import { Product, products } from '@/data/products';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onProductChange?: (productId: string) => void;
}

export default function ProductModal({ isOpen, onClose, product, onProductChange }: ProductModalProps) {
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Handle mounting for SSR
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset image loading state when product changes
  useEffect(() => {
    if (currentProduct) {
      setLoadedImages(new Set());
      setImagesLoaded(false);
    }
  }, [currentProduct]);

  // Check if all images are loaded
  useEffect(() => {
    if (currentProduct) {
      const totalImages = 1; // Product image
      if (loadedImages.size === totalImages && totalImages > 0) {
        setImagesLoaded(true);
      }
    }
  }, [loadedImages, currentProduct]);

  // Handle image load
  const handleImageLoad = useCallback((imageSrc: string) => {
    setLoadedImages(prev => new Set([...prev, imageSrc]));
  }, []);

  // Initialize with the product prop
  useEffect(() => {
    if (product && !isClosing && !currentProduct) {
      setCurrentProduct(product);
    } else if (product && !isClosing && currentProduct && product.id !== currentProduct.id) {
      // Product changed, trigger transition
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentProduct(product);
      }, 150); // Half of the transition duration
    }
  }, [product, isClosing, currentProduct]);

  // Handle transition state
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    onClose();
    // Reset closing state after transition
    setTimeout(() => {
      setIsClosing(false);
    }, 300);
  }, [onClose]);

  // Handle product link clicks with transition
  const handleProductLinkClick = useCallback((productId: string) => {
    if (productId && onProductChange) {
      // Trigger transition
      setIsTransitioning(true);
      setTimeout(() => {
        onProductChange(productId);
      }, 150); // Half of the transition duration
    }
  }, [onProductChange]);

  if (!currentProduct || !mounted) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pt-12 pb-12 md:p-4">
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
          <div className="relative">
            {/* Close Button - Outside Modal */}
            <button
              onClick={handleClose}
              className="absolute -top-4 -right-4 z-20 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors cursor-pointer p-2 hover:bg-slate-100 rounded-full bg-white shadow-md"
            >
              <FaTimes size={20} />
            </button>
            
            <div className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all border border-slate-200 max-h-[95vh] md:max-h-[90vh] flex flex-col">
              {/* Content */}
              <div className="flex flex-col md:flex-row h-full min-h-0 overflow-hidden">
                {/* Mobile Layout - First Row with Image and Info */}
                <div className="md:hidden w-full p-3 flex gap-3 items-stretch">
                  {/* Left side - Image and Title */}
                  <div className="w-3/4 flex flex-col gap-3">
                    {/* Title Section */}
                    <div className={`bg-slate-50 rounded-xl p-3 transition-opacity duration-300 ${isTransitioning ? 'opacity-25' : 'opacity-100'}`}>
                      <h2 className="text-lg font-bold text-slate-900">
                        {currentProduct.title}
                      </h2>
                    </div>
                    
                    {/* Image */}
                    <div className={`relative bg-slate-50 rounded-xl overflow-hidden shadow-sm flex-1 transition-opacity duration-300 ${isTransitioning ? 'opacity-25' : 'opacity-100'}`}>
                      <Image
                        src={currentProduct.image}
                        alt={currentProduct.title}
                        fill
                        className="object-contain"
                        onLoad={() => handleImageLoad(currentProduct.image)}
                      />
                      {/* Product Badges in Modal */}
                      <div className="absolute top-2 right-2 flex flex-col gap-1">
                        {currentProduct.isNew && (
                          <span className="bg-emerald-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                            <FaLeaf className="w-3 h-3" />
                            Novo
                          </span>
                        )}
                        {currentProduct.isOnSale && currentProduct.oldPrice && (
                          <span className="bg-rose-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                            <FaTag className="w-3 h-3" />
                            Akcija
                          </span>
                        )}
                        {currentProduct.isLimited && (
                          <span className="bg-violet-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                            <FaFire className="w-3 h-3" />
                            Limitirano
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                   {/* Right side info - 25% width */}
                   <div className="w-1/4 space-y-2 flex flex-col">
                     {/* Price Section - Takes remaining space */}
                     <div className={`bg-slate-50 rounded-lg p-2 flex-1 flex flex-col justify-center transition-opacity duration-300 ${isTransitioning ? 'opacity-25' : 'opacity-100'}`}>
                       <h3 className="text-xs font-semibold text-slate-900 mb-2">
                         Cijena
                       </h3>
                       <div className="flex flex-col items-center">
                         {currentProduct.isOnSale && currentProduct.oldPrice ? (
                           <>
                             <span className="text-xs text-slate-400 line-through">{currentProduct.oldPrice}</span>
                             <span className="text-lg font-bold text-rose-500">{currentProduct.price}</span>
                           </>
                         ) : (
                           <span className="text-lg font-bold text-slate-900">{currentProduct.price}</span>
                         )}
                         {currentProduct.isOnSale && currentProduct.oldPrice && (
                           <span className="bg-rose-500 text-white text-xs font-bold w-8 h-8 rounded-full shadow-lg transform -rotate-12 flex items-center justify-center mt-1">
                             -{Math.round((1 - parseFloat(currentProduct.price) / parseFloat(currentProduct.oldPrice)) * 100)}%
                           </span>
                         )}
                       </div>
                     </div>
                     
                     {/* Sadržaj Section */}
                     {currentProduct.volume && (
                       <div className={`bg-slate-50 rounded-lg p-2 transition-opacity duration-300 ${isTransitioning ? 'opacity-25' : 'opacity-100'}`}>
                         <h3 className="text-xs font-semibold text-slate-900 mb-1">
                           {currentProduct.category === 'Beauty Tretmani' ? 'Trajanje' : 'Sadržaj'}
                         </h3>
                         <p className="text-xs text-slate-600">{currentProduct.volume}</p>
                       </div>
                     )}
                     
                     {/* Marka Section */}
                     <div className={`bg-slate-50 rounded-lg p-2 transition-opacity duration-300 ${isTransitioning ? 'opacity-25' : 'opacity-100'}`}>
                       <h3 className="text-xs font-semibold text-slate-900 mb-1">
                         Marka
                       </h3>
                       <p className="text-xs text-slate-600">{currentProduct.marka}</p>
                     </div>
                   </div>
                </div>

                {/* Desktop Layout - Fixed Left Side */}
                <div className="hidden md:block w-2/5 p-4 border-r border-slate-100 flex-shrink-0">
                  {/* Title Section */}
                  <div className={`bg-slate-50 rounded-xl p-4 mb-4 transition-opacity duration-300 ${isTransitioning ? 'opacity-25' : 'opacity-100'}`}>
                    <h2 className="text-xl font-bold text-slate-900">
                      {currentProduct.title}
                    </h2>
                  </div>
                  
                  <div className={`relative h-96 bg-slate-50 rounded-xl overflow-hidden shadow-sm transition-opacity duration-300 ${isTransitioning ? 'opacity-25' : 'opacity-100'}`}>
                    <Image
                      src={currentProduct.image}
                      alt={currentProduct.title}
                      fill
                      className="object-cover"
                      onLoad={() => handleImageLoad(currentProduct.image)}
                    />
                    {/* Product Badges in Modal */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      {currentProduct.isNew && (
                        <span className="bg-emerald-500 text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-2 shadow-lg">
                          <FaLeaf className="w-4 h-4" />
                          Novo
                        </span>
                      )}
                      {currentProduct.isOnSale && currentProduct.oldPrice && (
                        <span className="bg-rose-500 text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-2 shadow-lg">
                          <FaTag className="w-4 h-4" />
                          Akcija
                        </span>
                      )}
                      {currentProduct.isLimited && (
                        <span className="bg-violet-500 text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-2 shadow-lg">
                          <FaFire className="w-4 h-4" />
                          Limitirano
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/20">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          {currentProduct.isOnSale && currentProduct.oldPrice ? (
                            <>
                              <span className="text-sm text-slate-400 line-through">{currentProduct.oldPrice}</span>
                              <span className="text-xl font-bold text-rose-500">{currentProduct.price}</span>
                            </>
                          ) : (
                            <span className="text-xl font-bold text-slate-900">{currentProduct.price}</span>
                          )}
                        </div>
                        {currentProduct.isOnSale && currentProduct.oldPrice && (
                          <span className="bg-rose-500 text-white text-sm font-bold w-12 h-12 rounded-full shadow-lg transform -rotate-12 flex items-center justify-center">
                            -{Math.round((1 - parseFloat(currentProduct.price) / parseFloat(currentProduct.oldPrice)) * 100)}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Sadržaj Section */}
                  {currentProduct.volume && (
                    <div className={`mt-3 bg-slate-50 rounded-xl p-3 transition-opacity duration-300 ${isTransitioning ? 'opacity-25' : 'opacity-100'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-semibold text-slate-900">
                          {currentProduct.category === 'Beauty Tretmani' ? 'Trajanje' : 'Sadržaj'}
                        </h3>
                        <span className="text-sm font-medium text-slate-600">
                          {currentProduct.marka}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">{currentProduct.volume}</p>
                    </div>
                  )}
                </div>
                
                {/* Scrollable Right Side */}
                <div className="w-full md:w-3/5 overflow-y-auto flex-1 min-h-0">
                  <div className={`p-3 md:p-4 space-y-3 transition-all duration-500 ${
                    isTransitioning 
                      ? 'opacity-25 blur-sm' 
                      : imagesLoaded 
                        ? 'opacity-100 blur-0' 
                        : 'opacity-0 blur-md'
                  }`}>

                    {/* Opis Section */}
                    <div className="bg-slate-50 rounded-xl p-3">
                      <h3 className="text-sm font-semibold text-slate-900 mb-1">Opis</h3>
                      <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                        {currentProduct.description}
                      </div>
                    </div>

                    {currentProduct.application && (
                      <div className="bg-slate-50 rounded-xl p-3">
                        {currentProduct.category !== 'Beauty Tretmani' && (
                          <h3 className="text-sm font-semibold text-slate-900 mb-3">Kako koristiti</h3>
                        )}
                        <div className="space-y-4">
                          {currentProduct.application.map((step, index) => {
                            // Check if the step contains HTML links
                            if (step.includes('<a href=')) {
                              // Process the content to replace catalog links with modal triggers
                              const processedStep = step.replace(
                                /<a href="\/katalog\?product=(\d+)">([^<]+)<\/a>/g,
                                (match, productId, linkText) => {
                                  return `<a href="#" class="product-link" data-product-id="${productId}">${linkText}</a>`;
                                }
                              );
                              
                              return (
                                <div key={index} className="flex items-start">
                                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                                    <span className="text-xs font-semibold text-slate-700">{index + 1}</span>
                                  </div>
                                  <div 
                                    className="text-sm text-slate-600 leading-relaxed [&_a]:text-gray-700 [&_a]:underline [&_a]:hover:text-gray-900 [&_a]:transition-colors [&_a]:cursor-pointer"
                                    dangerouslySetInnerHTML={{ __html: processedStep }}
                                    onClick={(e) => {
                                      const target = e.target as HTMLElement;
                                      if (target.tagName === 'A') {
                                        e.preventDefault();
                                        const productId = target.getAttribute('data-product-id');
                                        if (productId) {
                                          handleProductLinkClick(productId);
                                        }
                                      }
                                    }}
                                  />
                                </div>
                              );
                            }
                            
                            return (
                              <div key={index} className="flex items-start">
                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                                  <span className="text-xs font-semibold text-slate-700">{index + 1}</span>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">{step}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Glow Tip Section */}
                    {currentProduct.proTips && currentProduct.proTips.length > 0 && (
                      <div className="bg-slate-50 rounded-xl p-3">
                        <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                          <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center border border-slate-300">
                            <FaStar className="w-3 h-3 text-slate-600" />
                          </div>
                          Glow tip
                        </h3>
                        <div className="space-y-3">
                          {currentProduct.proTips.map((tip, index) => (
                            <div key={index} className="text-sm text-slate-600 leading-relaxed">
                              <div 
                                className="[&_a]:text-gray-700 [&_a]:underline [&_a]:hover:text-gray-900 [&_a]:transition-colors [&_a]:cursor-pointer"
                                dangerouslySetInnerHTML={{ 
                                  __html: tip.description.replace(
                                    /<a href='#' data-product-id='(\d+)'>(.*?)<\/a>/g,
                                    '<a href="#" data-product-id="$1" class="product-link">$2</a>'
                                  )
                                }}
                                onClick={(e) => {
                                  const target = e.target as HTMLElement;
                                  if (target.tagName === 'A') {
                                    e.preventDefault();
                                    const productId = target.getAttribute('data-product-id');
                                    if (productId) {
                                      handleProductLinkClick(productId);
                                    }
                                  }
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Aktivni sastojci Section */}
                    {currentProduct.activeIngredients && (
                      <div className="bg-slate-50 rounded-xl p-3">
                        <h3 className="text-sm font-semibold text-slate-900 mb-3">
                          {currentProduct.category === 'Beauty Tretmani' ? 'Prednosti' : 'Aktivni sastojci'}
                        </h3>
                        {currentProduct.category === 'Beauty Tretmani' ? (
                          <div className="space-y-2">
                            {currentProduct.activeIngredients.map((ingredient, index) => (
                              <div key={index} className="flex items-start">
                                <span className="flex-shrink-0 w-1.5 h-1.5 bg-slate-400 rounded-full mr-3 mt-2"></span>
                                <p className="text-sm text-slate-600 leading-relaxed">{ingredient}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {currentProduct.activeIngredients.join(', ')}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Product Safety Information */}
                    {currentProduct.warnings && currentProduct.warnings.length > 0 && (
                      <div className="space-y-3">
                        {currentProduct.warnings.map((warning, index) => {
                          // Extract everything after "SIGURNOST:" or "UPOZORENJE" (with or without colon)
                          const warningText = warning.replace(/^(SIGURNOST|UPOZORENJE)\s*:?\s*/, '');
                          const isSafetyWarning = warning.startsWith('SIGURNOST');
                          
                          return (
                            <div key={index} className={`${isSafetyWarning ? 'bg-slate-50 border-slate-200' : 'bg-gray-50 border-gray-200'} border rounded-lg p-4 shadow-sm`}>
                              <div className="flex items-center gap-3 mb-2">
                                <FaShieldAlt className={`w-5 h-5 ${isSafetyWarning ? 'text-slate-600' : 'text-gray-600'}`} />
                                <div className={`text-sm font-semibold ${isSafetyWarning ? 'text-slate-800' : 'text-gray-800'}`}>
                                  {isSafetyWarning ? 'Sigurnosna informacija' : 'Upozorenje'}
                                </div>
                              </div>
                              <div className={`text-sm ${isSafetyWarning ? 'text-slate-700' : 'text-gray-800'} leading-relaxed`}>
                                {warningText}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
} 