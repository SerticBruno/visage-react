'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaCheck } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { services } from '@/data/services';
import { Service } from '@/data/services/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ServiceSlider() {
  const servicesArray = Object.values(services);
  const [visibleServices, setVisibleServices] = useState(1);

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
          {/* Custom Navigation Buttons */}
          <div className="hidden lg:block">
            <button
              className="swiper-button-prev !w-12 !h-12 !bg-white/90 hover:!bg-white !text-slate-800 !rounded-full !shadow-lg transition-all duration-300 hover:!scale-110 after:!text-xl after:!font-bold"
              aria-label="Previous service"
            />
            <button
              className="swiper-button-next !w-12 !h-12 !bg-white/90 hover:!bg-white !text-slate-800 !rounded-full !shadow-lg transition-all duration-300 hover:!scale-110 after:!text-xl after:!font-bold"
              aria-label="Next service"
            />
          </div>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={visibleServices}
            navigation={{
              enabled: true,
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            className="pb-12"
            breakpoints={{
              320: {
                spaceBetween: 16,
              },
              768: {
                spaceBetween: 24,
              },
              1024: {
                spaceBetween: 32,
              },
            }}
          >
            {servicesArray.map((service: Service) => (
              <SwiperSlide key={`slide-${service.id}`}>
                <Link 
                  href={`/usluge/${service.id}`}
                  className="block h-full"
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

                          <div
                            className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-xl hover:from-slate-700 hover:to-slate-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="font-medium">Saznaj više</span>
                            <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .swiper-button-prev,
        .swiper-button-next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1e293b;
        }

        .swiper-button-prev {
          left: -60px;
        }

        .swiper-button-next {
          right: -60px;
        }

        .swiper-button-disabled {
          opacity: 0.35;
          cursor: auto;
          pointer-events: none;
        }

        .swiper-pagination {
          position: relative;
          bottom: 0;
          margin-top: 2rem;
        }

        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #cbd5e1;
          opacity: 1;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          background: #1e293b;
          transform: scale(1.25);
        }

        @media (max-width: 1024px) {
          .swiper-button-prev,
          .swiper-button-next {
            display: none;
          }
        }
      `}</style>
    </div>
  );
} 