'use client'

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight, FaArrowRight, FaCheck } from 'react-icons/fa';
import { services } from '@/data/services';
import { Service } from '@/data/services/types';

export default function ServiceSlider() {
  const servicesArray = Object.values(services);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex: number) => 
      prevIndex === servicesArray.length - 1 ? 0 : prevIndex + 1
    );
  }, [servicesArray.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex: number) => 
      prevIndex === 0 ? servicesArray.length - 1 : prevIndex - 1
    );
  }, [servicesArray.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
    setIsHovering(false);
  };

  return (
    <div 
      className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white py-16"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Naše usluge
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Otkrijte našu paletu profesionalnih tretmana za lice i tijelo
          </p>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-slate-800 p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer opacity-100"
            aria-label="Previous service"
          >
            <FaChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-slate-800 p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer opacity-100"
            aria-label="Next service"
          >
            <FaChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Slides Container */}
          <div className="relative h-[400px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl">
            {servicesArray.map((service: Service, index: number) => (
              <div
                key={`slide-${service.id}`}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentIndex
                    ? 'opacity-100 translate-x-0'
                    : index < currentIndex
                    ? 'opacity-0 -translate-x-full'
                    : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                  {/* Image Section */}
                  <div className="relative h-[250px] md:h-full">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col justify-center p-6 md:p-8 bg-white">
                    <div className="max-w-lg">
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                        {service.title}
                      </h3>
                      <p className="text-base text-slate-600 mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      
                      {/* Benefits List */}
                      <div className="mb-6">
                        {service.benefits.slice(0, 3).map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-2 mb-2">
                            <FaCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
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
            ))}
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-6">
            {servicesArray.map((service: Service, index: number) => (
              <button
                key={`dot-${service.id}`}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIndex
                    ? 'bg-slate-800 scale-125'
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 