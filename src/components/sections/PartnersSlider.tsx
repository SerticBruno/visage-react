'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const PartnersSlider = () => {
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
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
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
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
          
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={60}
            slidesPerView={1}
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
              el: '.swiper-pagination',
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
                      className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="swiper-pagination mt-16 !relative !bottom-0 !top-auto"></div>
        </div>
      </div>

      <style jsx global>{`
        .swiper-pagination {
          position: relative !important;
          margin-top: 4rem !important;
        }
        .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          background: #E2E8F0 !important;
          opacity: 1 !important;
          transition: all 0.3s ease !important;
          margin: 0 8px !important;
        }
        .swiper-pagination-bullet-active {
          background: #4B5563 !important;
          transform: scale(1.3) !important;
        }
        .swiper-pagination-bullet:hover {
          background: #CBD5E1 !important;
        }
      `}</style>
    </section>
  );
};

export default PartnersSlider; 