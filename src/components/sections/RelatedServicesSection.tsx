'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Service } from '@/data/services/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

interface RelatedServicesSectionProps {
  currentService: Service;
  relatedServices: Service[];
}

export default function RelatedServicesSection({ currentService, relatedServices }: RelatedServicesSectionProps) {
  const [visibleServices, setVisibleServices] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const swiperRef = React.useRef<SwiperType | null>(null);

  // Filter out the current service and ensure we have valid services
  const validServices = relatedServices.filter(service => 
    service && 
    service.id && 
    service.id !== currentService.id
  );

  React.useEffect(() => {
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
      swiperRef.current.slideTo(pageIndex);
    }
  };

  if (validServices.length === 0) {
    return null;
  }

  return (
    <section className="bg-gradient-to-t from-[#e5e7eb] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Usluge koje bi vas mogle zanimati
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Otkrijte još tretmana koji će vam pomoći postići željeni izgled
          </p>
        </div>

        <div className="relative">
          {/* Mobile and Tablet Slider */}
          <div className="lg:hidden">
            <Swiper
              spaceBetween={24}
              slidesPerView={visibleServices}
              loop={true}
              initialSlide={0}
              watchSlidesProgress={true}
              speed={400}
              grabCursor={true}
              touchRatio={1.5}
              touchAngle={45}
              resistance={true}
              resistanceRatio={0.85}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setCurrentPage(swiper.realIndex + 1);
              }}
              breakpoints={{
                320: {
                  spaceBetween: 16,
                  slidesPerView: 1,
                },
                768: {
                  spaceBetween: 24,
                  slidesPerView: 2,
                }
              }}
              className="pb-16 overflow-hidden"
            >
              {validServices.map((service) => (
                <SwiperSlide key={service.id} className="!h-auto">
                  <div className="h-full pb-8 px-3">
                    <Link 
                      href={`/usluge/${service.id}`}
                      className="block h-full"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={service.heroImage}
                            alt={service.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-slate-700 transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-gray-600 line-clamp-2 flex-1">
                            {service.description}
                          </p>
                        </div>
                      </motion.div>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Mobile and Tablet Navigation Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                className="w-10 h-10 bg-white text-slate-800 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
                aria-label="Previous service"
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: validServices.length }).map((_, index) => (
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
                className="w-10 h-10 bg-white text-slate-800 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
                aria-label="Next service"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-3 gap-8">
            {validServices.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -5 }}
                className="group h-full"
              >
                <Link 
                  href={`/usluge/${service.id}`}
                  className="block h-full"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={service.heroImage}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-slate-700 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2 flex-1">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/usluge"
            className="inline-flex items-center px-8 py-4 text-base font-medium rounded-xl shadow-lg text-white bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
          >
            <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Povratak na sve usluge
          </Link>
        </div>
      </div>
    </section>
  );
} 