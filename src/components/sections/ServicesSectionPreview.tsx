'use client'

import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/data/services';
import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'swiper/css';

export default function ServicesSectionPreview() {
  const [currentPage, setCurrentPage] = useState(1);
  const swiperRef = useRef<SwiperType | null>(null);
  const totalPages = Math.ceil(Object.keys(services).length / 3);

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
      const targetIndex = pageIndex * 3;
      swiperRef.current.slideToLoop(targetIndex);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
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
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            loopAdditionalSlides={3}
            watchSlidesProgress={true}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setCurrentPage(Math.floor(swiper.realIndex / 3) + 1);
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
            className="pb-8"
          >
            {Object.entries(services).map(([pageName, service]) => (
              <SwiperSlide key={pageName}>
                <Link
                  href={`/usluge/${pageName}`}
                  className="group relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 block"
                >
                  <div className="relative h-48 md:h-64">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6">
                      <h3 className="text-base md:text-xl font-bold text-white mb-1 md:mb-2">{service.title}</h3>
                      <p className="text-sm md:text-base text-white/90 line-clamp-2 md:line-clamp-none">{service.description}</p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation and Pagination */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={handlePrev}
              className="w-8 h-8 bg-gradient-to-b from-white to-[#e5e7eb] hover:from-slate-50 hover:to-slate-100 text-slate-800 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
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
              className="w-8 h-8 bg-gradient-to-b from-white to-[#e5e7eb] hover:from-slate-50 hover:to-slate-100 text-slate-800 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
              aria-label="Next service"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 