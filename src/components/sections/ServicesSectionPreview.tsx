'use client'

import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/data/services';
import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'swiper/css';

export default function ServicesSectionPreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const totalSlides = Object.keys(services).length;

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
    <section className="px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(to bottom, #ffffff, #e5e7eb)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Tretmani po kategorijama
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Pružamo širok spektar profesionalnih tretmana za lice i tijelo, koristeći najkvalitetnije proizvode i najsuvremenije tehnike
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
              delay: 5000,
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
            {Object.entries(services).map(([pageName, service]) => (
              <SwiperSlide key={pageName} className="!p-2 !pb-6">
                <Link
                  href={`/usluge/${pageName}`}
                  className="group relative bg-white rounded-lg shadow-lg overflow-hidden block transition-all duration-300 hover:scale-105"
                >
                  <div className="relative h-48 md:h-64">
                    <Image
                      src={service.heroImage}
                      alt={service.title}
                      fill
                      loading="lazy"
                      className="object-cover transition-all duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 80vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-all duration-300" />
                    
                    {/* Content Container */}
                    <div className="absolute inset-0 p-3 md:p-6 flex flex-col justify-end transition-all duration-300">
                      {/* Mobile: Always show title and description */}
                      <div className="md:hidden">
                        <h3 className="text-xl font-bold text-white mb-2">
                          {service.title}
                        </h3>
                        <div>
                          <p className="text-base text-white line-clamp-2">
                            {service.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Desktop: Title - Always visible at bottom */}
                      <div className="hidden md:block transform transition-all duration-300 group-hover:opacity-0">
                        <h3 className="text-xl font-bold text-white">
                          {service.title}
                        </h3>
                      </div>
                      
                      {/* Desktop: Hover Content - Hidden by default, appears on hover */}
                      <div className="hidden md:block absolute bottom-0 left-0 right-0 p-6 transform translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        {/* Hover Title */}
                        <h3 className="text-xl font-bold text-white mb-2">
                          {service.title}
                        </h3>
                        
                        {/* Description and Show More */}
                        <div>
                          <p className="text-sm text-white line-clamp-3 mb-2">
                            {service.description}
                          </p>
                          <span className="text-sm text-white font-medium underline">
                            Saznajte više
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation and Pagination */}
          <div className="flex items-center justify-center gap-6 mt-8 pb-4">
            <button
              onClick={handlePrev}
              className="w-8 h-8 bg-gradient-to-b from-white to-[#e5e7eb] hover:from-slate-50 hover:to-slate-100 text-slate-800 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
              aria-label="Previous service"
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
              aria-label="Next service"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* View All Services Button */}
          <div className="flex justify-center mt-8">
            <Link
              href="/usluge"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="font-medium">Pogledajte sve usluge</span>
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M14 5l7 7m0 0l-7 7m7-7H3" 
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 