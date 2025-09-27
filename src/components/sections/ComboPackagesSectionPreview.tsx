'use client'

import Image from 'next/image';
import { comboPackages } from '@/data/comboPackages';
import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ComboPackageNavigationModal from '@/components/ui/ComboPackageNavigationModal';
import { useIntersectionObserver } from '@/lib/useIntersectionObserver';

import 'swiper/css';

// Utility function to calculate discount percentage
const calculateDiscountPercentage = (oldPrice: string, currentPrice: string): number => {
  const oldPriceNum = parseFloat(oldPrice.replace(/[^\d.]/g, ''));
  const currentPriceNum = parseFloat(currentPrice.replace(/[^\d.]/g, ''));
  
  if (oldPriceNum <= 0 || currentPriceNum <= 0) return 0;
  
  const discount = ((oldPriceNum - currentPriceNum) / oldPriceNum) * 100;
  return Math.round(discount);
};

export default function ComboPackagesSectionPreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openComboModal, setOpenComboModal] = useState<string | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const totalSlides = comboPackages.length;
  
  // Use intersection observer to detect when slider comes into view
  const [sliderRef, isInView] = useIntersectionObserver<HTMLElement>({
    threshold: 0.3,
    rootMargin: '0px',
    triggerOnce: false
  });

  // Control autoplay based on visibility
  useEffect(() => {
    if (swiperRef.current) {
      if (isInView) {
        swiperRef.current.autoplay.start();
      } else {
        swiperRef.current.autoplay.stop();
      }
    }
  }, [isInView]);

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
      // For looped swiper, we need to calculate the correct slide index
      // The swiper automatically handles the loop, so we can use the index directly
      swiperRef.current.slideToLoop(index);
    }
  };

  return (
    <section ref={sliderRef} className="px-4 pb-16 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(to bottom, #ffffff, #e5e7eb)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Kombinirani Paketi
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Uštedite i doživite optimalne rezultate s našim posebno kreiranim paketima tretmana
          </p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            watchSlidesProgress={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            breakpoints={{
              320: {
                spaceBetween: 16,
                slidesPerView: 1,
              },
              768: {
                spaceBetween: 24,
                slidesPerView: 2,
              },
              1024: {
                spaceBetween: 32,
                slidesPerView: 3,
              },
            }}
            className="pb-12"
          >
            {comboPackages.map((comboPackage) => {
              const discountPercentage = comboPackage.oldPrice 
                ? calculateDiscountPercentage(comboPackage.oldPrice, comboPackage.price)
                : 0;
              
              return (
              <SwiperSlide key={comboPackage.id} className="!p-2 !pb-6">
                <button
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
                            sizes="(max-width: 768px) 80vw, 40vw"
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
              </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Navigation and Pagination */}
          <div className="flex items-center justify-center gap-6 mt-8 pb-4">
            <button
              onClick={handlePrev}
              className="w-8 h-8 bg-gradient-to-b from-white to-[#e5e7eb] hover:from-slate-50 hover:to-slate-100 text-slate-800 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
              aria-label="Previous combo package"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === index
                      ? 'bg-slate-800 scale-125'
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="w-8 h-8 bg-gradient-to-b from-white to-[#e5e7eb] hover:from-slate-50 hover:to-slate-100 text-slate-800 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
              aria-label="Next combo package"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Combo Package Navigation Modal */}
      <ComboPackageNavigationModal
        isOpen={openComboModal !== null}
        onClose={() => setOpenComboModal(null)}
        initialComboPackage={openComboModal ? comboPackages.find(pkg => pkg.id === openComboModal) : undefined}
        serviceId=""
        comboPackages={comboPackages}
      />
    </section>
  );
}