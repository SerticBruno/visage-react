'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { popularServices } from '@/data/popularServices';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'swiper/css';

export default function PopularServices() {
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
      swiperRef.current.slideTo(pageIndex);
    }
  };

  const ServiceCard = ({ service }: { service: typeof popularServices[0] }) => (
    <Link
      href={service.link}
      className="group block h-full"
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full hover:shadow-xl transition-all duration-300">
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-6 flex flex-col h-full">
          <div>
            <h3 className="text-xl font-semibold group-hover:text-gray-700 transition-colors">{service.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{service.description}</p>
          </div>
          <ul className="space-y-2 mt-4 mb-2 flex-grow">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-sm text-gray-700">
                <svg
                  className="w-4 h-4 mr-2 text-green-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-4 md:mt-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg group-hover:bg-gray-800 transition-all duration-300">
              <span className="font-medium text-sm">Saznajte više</span>
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
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <section className="py-16" style={{ background: 'linear-gradient(to bottom, #e5e7eb, #ffffff)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Popularne Usluge</h2>
        
        {/* Mobile Slider */}
        <div className="md:hidden">
          <Swiper
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            watchSlidesProgress={true}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setCurrentPage(swiper.realIndex + 1);
            }}
            className="pb-8"
            touchRatio={1}
            touchAngle={45}
            resistance={true}
            resistanceRatio={0.85}
            threshold={20}
            speed={400}
            grabCursor={true}
          >
            {popularServices.map((service, index) => (
              <SwiperSlide key={index}>
                <div className="px-4 pb-4">
                  <ServiceCard service={service} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Mobile Navigation Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrev}
              className="w-10 h-10 bg-white text-slate-800 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
              aria-label="Previous service"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: popularServices.length }).map((_, index) => (
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
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
          {popularServices.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

        <div className="mt-8 md:mt-12 text-center">
          <Link
            href="/usluge"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 group"
          >
            <span className="font-medium">Pogledajte sve tretmane</span>
            <svg 
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
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
    </section>
  );
} 