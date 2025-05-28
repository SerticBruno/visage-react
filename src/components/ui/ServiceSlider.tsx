'use client'

import { useState, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Service } from '@/data/services/types';
import ServiceCard from './ServiceCard';
import SectionHeading from './SectionHeading';
import Link from 'next/link';

// Import Swiper styles
import 'swiper/css';

interface ServiceSliderProps {
  services: Service[];
  title?: string;
  description?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
  viewAllText?: string;
}

export default function ServiceSlider({ 
  services,
  title = "Naše usluge",
  description = "Otkrijte našu paletu profesionalnih tretmana za lice i tijelo",
  showViewAll = false,
  viewAllLink = "/usluge",
  viewAllText = "Pogledajte sve usluge"
}: ServiceSliderProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const swiperRef = useRef<SwiperType | null>(null);

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
      swiperRef.current.slideToLoop(pageIndex);
    }
  };

  return (
    <div className="relative w-full py-16" style={{ background: 'linear-gradient(to bottom, #e5e7eb, #ffffff)' }}>
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading
          title={title}
          description={description}
        />
        
        <div className="relative">
          {/* Mobile Slider */}
          <div className="md:hidden">
            <Swiper
              spaceBetween={24}
              slidesPerView={1}
              loop={true}
              loopAdditionalSlides={1}
              watchSlidesProgress={true}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setCurrentPage(swiper.realIndex + 1);
              }}
              className="pb-8"
            >
              {services.map((service: Service) => (
                <SwiperSlide key={`slide-${service.id}`}>
                  <ServiceCard service={service} className="pb-8 px-4" />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Mobile Navigation Controls */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <button
                onClick={handlePrev}
                className="w-8 h-8 bg-white hover:bg-white text-[#1e293b] rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
                aria-label="Previous service"
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: services.length }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentPage === index + 1
                        ? 'bg-[#1e293b] scale-125'
                        : 'bg-[#cbd5e1] hover:bg-[#94a3b8]'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                className="w-8 h-8 bg-white hover:bg-white text-[#1e293b] rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
                aria-label="Next service"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service: Service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* View All Button */}
          {showViewAll && (
            <div className="flex justify-center mt-12">
              <Link
                href={viewAllLink}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[#1e293b] text-white rounded-xl hover:bg-[#334155] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span className="font-medium">{viewAllText}</span>
                <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 