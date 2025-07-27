"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { comboPackages } from '@/data/comboPackages';
import { products, Product } from '@/data/products';
import { FaPlus, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import ProductModal from '@/components/ui/ProductModal';
import ComboPackageNavigationModal from '@/components/ui/ComboPackageNavigationModal';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default function ComboPackagesInlineSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openComboModal, setOpenComboModal] = useState<string | null>(null);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index);
    }
  };

  const handleProductClick = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  return (
    <section className="pb-12" style={{ background: 'linear-gradient(to bottom, #ffffff, #e5e7eb)' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Kombinirani Paketi</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Uštedite i doživite optimalne rezultate s našim posebno kreiranim paketima tretmana
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-8">
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            className="combo-packages-swiper"
            style={{ paddingTop: '2rem' }}
          >
            {comboPackages.map((pkg) => (
              <SwiperSlide key={pkg.id} style={{ marginBottom: '2rem' }}>
                <div className="relative cursor-pointer" onClick={() => setOpenComboModal(pkg.id)}>
                  {/* Title Badge - Overlapping the container */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg font-bold text-base md:text-lg">
                      {pkg.title}
                    </div>
                  </div>
                  
                  {/* Card Container */}
                  <div className="bg-white rounded-xl md:rounded-2xl shadow-lg h-full relative">
                    <div className="p-4 md:p-8 lg:p-10 h-full flex flex-col pt-10 rounded-xl md:rounded-2xl mb-4" style={{ background: 'linear-gradient(to bottom,rgb(233, 234, 235),#f0f0f0)' }}>
                      <div className="text-center mb-6 md:mb-8">
                        <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-lg">{pkg.description}</p>
                        <div className="flex items-center justify-center gap-2 md:gap-3">
                          <span className="text-2xl md:text-3xl font-bold text-primary">{pkg.price}</span>
                          {pkg.oldPrice && (
                            <>
                              <span className="text-lg md:text-xl text-gray-400 line-through">{pkg.oldPrice}</span>
                              <span className="bg-gray-300 text-gray-700 text-xs md:text-sm font-bold px-2 md:px-3 py-1 md:py-1.5 rounded-full shadow-sm">
                                -{Math.round(((parseFloat(pkg.oldPrice.replace(' EUR', '')) - parseFloat(pkg.price.replace(' EUR', ''))) / parseFloat(pkg.oldPrice.replace(' EUR', ''))) * 100)}%
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex-1 mb-6 md:mb-8">
                        {/* Mobile Layout - 2 cards per row */}
                        <div className="md:hidden">
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            {/* Combine all services and products into a single array for mobile */}
                            {(() => {
                              const allItems = [
                                ...pkg.services.map(service => ({ ...service, type: 'service' as const })),
                                ...(pkg.products || []).map(product => ({ ...product, type: 'product' as const }))
                              ];
                              
                              return allItems.map((item, index) => (
                                <React.Fragment key={`${item.type}-${item.id}`}>
                                  {item.type === 'service' ? (
                                    <Link href={`/usluge/${item.id}`} className="group">
                                      <div className="flex flex-col items-center justify-start h-36 bg-gray-50 rounded-lg p-3 pt-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                                        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden shadow-md transition-transform group-hover:scale-105">
                                          <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                          />
                                        </div>
                                        <div className="text-center flex items-center justify-center mt-2">
                                          <h5 className="font-medium text-xs group-hover:text-primary transition-colors">
                                            {item.title}
                                          </h5>
                                        </div>
                                      </div>
                                    </Link>
                                  ) : (
                                    <button 
                                      onClick={() => handleProductClick(item.id)}
                                      className="group"
                                    >
                                      <div className="flex flex-col items-center justify-start h-36 bg-gray-50 rounded-lg p-3 pt-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                                        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden shadow-md transition-transform group-hover:scale-105">
                                          <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                          />
                                        </div>
                                        <div className="text-center flex items-center justify-center mt-2">
                                          <h5 className="font-medium text-xs group-hover:text-primary transition-colors">
                                            {item.title}
                                          </h5>
                                        </div>
                                      </div>
                                    </button>
                                  )}
                                  {/* Add plus icon between items, but not after the last item in a row */}
                                  {index < allItems.length - 1 && index % 2 === 1 && (
                                    <div className="col-span-2 flex justify-center my-2">
                                      <div className="bg-primary/10 rounded-full p-1.5 shadow-sm">
                                        <FaPlus className="text-primary text-sm" />
                                      </div>
                                    </div>
                                  )}
                                </React.Fragment>
                              ));
                            })()}
                          </div>
                        </div>

                        {/* Desktop Layout - Original horizontal layout */}
                        <div className="hidden md:flex flex-row items-center justify-center gap-3 lg:gap-4">
                          {(() => {
                            const totalItems = pkg.services.length + (pkg.products?.length || 0);
                            const cardWidth = totalItems <= 2 ? 'w-48 lg:w-56 xl:w-64' : 'w-40 lg:w-44 xl:w-48';
                            
                            return (
                              <>
                                {pkg.services.map((service, index) => (
                                  <React.Fragment key={service.id}>
                                    <Link href={`/usluge/${service.id}`} className={`group flex justify-center ${cardWidth}`}>
                                      <div className={`flex flex-col items-center justify-start ${cardWidth} h-44 lg:h-48 xl:h-52 bg-gray-50 rounded-xl p-3 lg:p-4 pt-4 lg:pt-5 pb-2 lg:pb-3 xl:pb-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer`}>
                                        <div className="relative w-24 lg:w-28 xl:w-32 h-24 lg:h-28 xl:h-32 flex-shrink-0 rounded-xl overflow-hidden shadow-md transition-transform group-hover:scale-105">
                                          <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover"
                                          />
                                        </div>
                                        <div className="text-center flex items-center justify-center mt-3 lg:mt-4">
                                          <h5 className="font-medium text-xs lg:text-sm group-hover:text-primary transition-colors">
                                            {service.title}
                                          </h5>
                                        </div>
                                      </div>
                                    </Link>
                                    {index < pkg.services.length - 1 && (
                                      <div className="flex items-center justify-center">
                                        <div className="bg-primary/10 rounded-full p-1.5 lg:p-2 shadow-sm">
                                          <FaPlus className="text-primary text-sm lg:text-base" />
                                        </div>
                                      </div>
                                    )}
                                  </React.Fragment>
                                ))}

                                {pkg.products && pkg.products.length > 0 && (
                                  <>
                                    {pkg.services.length > 0 && (
                                      <div className="flex items-center justify-center">
                                        <div className="bg-primary/10 rounded-full p-1.5 lg:p-2 shadow-sm">
                                          <FaPlus className="text-primary text-sm lg:text-base" />
                                        </div>
                                      </div>
                                    )}
                                    {pkg.products.map((product, index) => (
                                      <React.Fragment key={product.id}>
                                        <button 
                                          onClick={() => handleProductClick(product.id)}
                                          className={`group flex justify-center ${cardWidth}`}
                                        >
                                          <div className={`flex flex-col items-center justify-start ${cardWidth} h-44 lg:h-48 xl:h-52 bg-gray-50 rounded-xl p-3 lg:p-4 pt-4 lg:pt-5 pb-2 lg:pb-3 xl:pb-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer`}>
                                            <div className="relative w-24 lg:w-28 xl:w-32 h-24 lg:h-28 xl:h-32 flex-shrink-0 rounded-xl overflow-hidden shadow-md transition-transform group-hover:scale-105">
                                              <Image
                                                src={product.image}
                                                alt={product.title}
                                                fill
                                                className="object-cover"
                                              />
                                            </div>
                                            <div className="text-center flex items-center justify-center mt-3 lg:mt-4">
                                              <h5 className="font-medium text-xs lg:text-sm group-hover:text-primary transition-colors">
                                                {product.title}
                                              </h5>
                                            </div>
                                          </div>
                                        </button>
                                        {index < pkg.products!.length - 1 && (
                                          <div className="flex items-center justify-center">
                                            <div className="bg-primary/10 rounded-full p-1.5 lg:p-2 shadow-sm">
                                              <FaPlus className="text-primary text-sm lg:text-base" />
                                            </div>
                                          </div>
                                        )}
                                      </React.Fragment>
                                    ))}
                                  </>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      </div>

                      <div className="flex justify-center mt-auto">
                        <Link
                          href={`/kontakt?service=${encodeURIComponent(pkg.title)}`}
                          className="group inline-flex items-center gap-2 px-6 py-3 bg-[#1e293b] text-white rounded-xl hover:bg-[#334155] transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                        >
                          <span>Rezervirajte termin</span>
                          <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={handlePrev}
              className="w-8 h-8 bg-white text-slate-800 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
              aria-label="Previous combo"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            
            {/* Manual Pagination Dots */}
            <div className="flex space-x-2">
              {comboPackages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    index === activeIndex 
                      ? 'bg-slate-600 scale-125' 
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={handleNext}
              className="w-8 h-8 bg-white text-slate-800 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
              aria-label="Next combo"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .combo-packages-swiper .swiper-slide {
          height: auto;
        }
      `}</style>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />

      {/* Combo Package Navigation Modal */}
      <ComboPackageNavigationModal
        isOpen={openComboModal !== null}
        onClose={() => setOpenComboModal(null)}
        initialComboPackage={openComboModal ? comboPackages.find(pkg => pkg.id === openComboModal) : undefined}
        serviceId=""
        serviceTitle=""
      />
    </section>
  );
} 