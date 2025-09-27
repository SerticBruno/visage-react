'use client';

import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import type { Swiper as SwiperType } from 'swiper';
import { useIntersectionObserver } from '@/lib/useIntersectionObserver';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const PartnersSlider = () => {
  const swiperRef = React.useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  
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
      swiperRef.current.slideToLoop(index);
    }
  };

  const partners = [
    {
      id: 1,
      name: 'TOSKANI',
      logo: '/images/partners/toskani-logo.webp',
      url: 'https://toskani.com'
    },
    {
      id: 2,
      name: 'Circadia',
      logo: '/images/partners/circadia-logo.webp',
      url: 'https://circadia.com'
    },
    {
      id: 3,
      name: 'StarMedico',
      logo: '/images/partners/starmedico-logo.webp',
      url: 'https://starmedico.com'
    },
    {
      id: 4,
      name: 'Bio Sculpture Gel',
      logo: '/images/partners/bio-sculpture-gel-logo.webp',
      url: 'https://biosculpturegel.com'
    },
    {
      id: 5,
      name: 'Profhilo',
      logo: '/images/partners/profhilo-logo.webp',
      url: 'https://profhilo.com'
    },
    {
      id: 6,
      name: 'Aliaxin',
      logo: '/images/partners/ALIAXIN_LOGO.webp',
      url: 'https://aliaxin.com'
    },
    {
      id: 7,
      name: 'Revelo',
      logo: '/images/partners/revelo-logo.webp',
      url: 'https://revelo.com'
    },
    {
      id: 8,
      name: 'Humedp',
      logo: '/images/partners/humedp.webp',
      url: 'https://humedp.com'
    }
  ];

  return (
    <section ref={sliderRef} className="pb-18" style={{ background: 'linear-gradient(to bottom, #ffffff, #e5e7eb)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Naši partneri
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Suradnja s vodećim brendovima u industriji ljepote
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-24 z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 z-10"></div>
          
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={60}
            slidesPerView={1}
            wrapperClass="!pb-3"
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 60,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 80,
              },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination-custom',
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active',
            }}
            loop={true}
            className="partners-slider"
          >
            {partners.map((partner) => (
              <SwiperSlide key={partner.id}>
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-48 bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      loading="lazy"
                      className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    />
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-8 h-8 bg-white text-slate-800 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
              aria-label="Previous partner"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            
            {/* Custom Pagination Dots */}
            <div className="flex space-x-2">
              {partners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
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
              aria-label="Next partner"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .swiper-pagination {
          position: relative !important;
          margin-top: 0 !important;
        }
        .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          background: #94A3B8 !important;
          opacity: 1 !important;
          transition: all 0.3s ease !important;
          margin: 0 8px !important;
        }
        .swiper-pagination-bullet-active {
          background: #4B5563 !important;
          transform: scale(1.3) !important;
        }
        .swiper-pagination-bullet:hover {
          background: #64748B !important;
        }
      `}</style>
    </section>
  );
};

export default PartnersSlider; 