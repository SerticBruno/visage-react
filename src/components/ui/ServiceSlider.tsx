'use client'

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaCheck, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { services } from '@/data/services';
import { Service } from '@/data/services/types';

// Import Swiper styles
import 'swiper/css';

export default function ServiceSlider() {
  const servicesArray = Object.values(services);
  const [visibleServices, setVisibleServices] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const swiperRef = useRef<SwiperType | null>(null);
  const totalPages = Math.ceil(servicesArray.length / visibleServices);

  useEffect(() => {
    const updateVisibleServices = () => {
      if (window.innerWidth >= 1024) { // lg
        setVisibleServices(3);
      } else if (window.innerWidth >= 768) { // md
        setVisibleServices(2);
      } else {
        setVisibleServices(1);
      }
    };

    updateVisibleServices();
    window.addEventListener('resize', updateVisibleServices);
    return () => window.removeEventListener('resize', updateVisibleServices);
  }, []);

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

  const goToPage = (pageIndex: number) => {
    if (swiperRef.current) {
      const targetIndex = pageIndex * visibleServices;
      swiperRef.current.slideToLoop(targetIndex);
    }
  };

  return (
    <div className="relative w-full py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Naše usluge
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Otkrijte našu paletu profesionalnih tretmana za lice i tijelo
          </p>
        </div>
        
        <div className="relative">
          <Swiper
            spaceBetween={24}
            slidesPerView={visibleServices}
            loop={true}
            loopAdditionalSlides={visibleServices}
            watchSlidesProgress={true}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setCurrentPage(Math.floor(swiper.realIndex / visibleServices) + 1);
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
          >
            {servicesArray.map((service: Service) => (
              <SwiperSlide key={`slide-${service.id}`}>
                <Link 
                  href={`/usluge/${service.id}`}
                  className="block h-full pb-8 px-4"
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
                          priority={service.id === servicesArray[0].id}
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
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={handlePrev}
              className="w-8 h-8 bg-white/90 hover:bg-white text-slate-800 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
              aria-label="Previous service"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentPage === index + 1
                      ? 'bg-slate-800 scale-125'
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="w-8 h-8 bg-white/90 hover:bg-white text-slate-800 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
              aria-label="Next service"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 