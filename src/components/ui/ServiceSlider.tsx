'use client'

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight, FaArrowRight, FaCheck } from 'react-icons/fa';
import { services } from '@/data/services';
import { Service } from '@/data/services/types';

export default function ServiceSlider() {
  const servicesArray = Object.values(services);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [visibleServices, setVisibleServices] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

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

  const totalPages = Math.ceil(servicesArray.length / visibleServices);
  const currentPage = Math.floor(currentIndex / visibleServices) + 1;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= servicesArray.length - visibleServices ? 0 : prevIndex + 1
    );
  }, [servicesArray.length, visibleServices]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? servicesArray.length - visibleServices : prevIndex - 1
    );
  }, [servicesArray.length, visibleServices]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
    setDragOffset(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const currentTouch = e.targetTouches[0].clientX;
    const diff = currentTouch - touchStart;
    setDragOffset(diff);
    setTouchEnd(currentTouch);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchEnd - touchStart;
    const isLeftSwipe = distance < -minSwipeDistance;
    const isRightSwipe = distance > minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  const getTransform = () => {
    if (!containerRef.current) return `translateX(-${currentIndex * (100 / visibleServices)}%)`;
    
    const containerWidth = containerRef.current.offsetWidth;
    const baseTransform = currentIndex * (100 / visibleServices);
    const dragPercentage = (dragOffset / containerWidth) * 100;
    return `translateX(calc(-${baseTransform}% + ${dragPercentage}%))`;
  };

  return (
    <div className="relative w-full py-20">
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
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-slate-800 p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer opacity-100"
            aria-label="Previous service"
          >
            <FaChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-slate-800 p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer opacity-100"
            aria-label="Next service"
          >
            <FaChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Slides Container */}
          <div 
            ref={containerRef}
            className="relative overflow-hidden pb-8"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div 
              className="flex transition-transform duration-300 ease-out"
              style={{ 
                transform: getTransform(),
                transition: isDragging ? 'none' : 'transform 300ms ease-out'
              }}
            >
              {servicesArray.map((service: Service, index: number) => (
                <div
                  key={`slide-${service.id}`}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                >
                  <div className="group h-[480px] rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-col h-full">
                      {/* Image Section */}
                      <div className="relative h-[200px] overflow-hidden">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {service.title}
                          </h3>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 p-6">
                        <div>
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

                          <Link
                            href={`/usluge/${service.id}`}
                            className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-xl hover:from-slate-700 hover:to-slate-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                          >
                            <span className="font-medium">Saznaj više</span>
                            <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {Array.from({ length: Math.ceil(servicesArray.length / visibleServices) }).map((_, index) => (
              <button
                key={`dot-${index}`}
                onClick={() => setCurrentIndex(index * visibleServices)}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  currentPage === index + 1
                    ? 'bg-slate-800 scale-125'
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 