'use client';

import { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeading from './SectionHeading';
import { useIntersectionObserver } from '@/lib/useIntersectionObserver';
import 'swiper/css';

export interface ShowcaseItem {
  id: string;
  image: string;
  imageAlt?: string;
  title: string;
  description?: string;
  link?: string;
  /** Shown in the corner overlay (e.g. "39 EUR") */
  price?: string;
  /** Old price when on sale (e.g. "49 EUR") */
  oldPrice?: string;
  /** Optional label (e.g. "-20%", "Akcija") */
  discountLabel?: string;
  /** Custom event slide (e.g. Dan žena) with dedicated layout */
  variant?: 'event';
  /** For variant="event": display date (e.g. "8. ožujka") */
  eventDate?: string;
  /** For variant="event": CTA button text */
  ctaText?: string;
}

interface ShowcaseSliderProps {
  items: ShowcaseItem[];
  title?: string;
  description?: string;
  /** Container width as fraction of parent (default 0.8 = 80%) */
  widthFraction?: number;
  autoplayDelayMs?: number;
}

export default function ShowcaseSlider({
  items,
  title = 'Istaknuto',
  description,
  widthFraction = 0.8,
  autoplayDelayMs = 5000,
}: ShowcaseSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const [sliderRef, isInView] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: '0px',
    triggerOnce: false,
  });

  useEffect(() => {
    if (!isInView || isHovered || !swiperRef.current) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
      return;
    }
    autoPlayRef.current = setInterval(() => {
      swiperRef.current?.slideNext();
    }, autoplayDelayMs);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isInView, isHovered, autoplayDelayMs]);

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();
  const goTo = (index: number) => swiperRef.current?.slideToLoop(index);

  if (!items.length) return null;

  return (
    <section
      ref={sliderRef}
      className="relative w-full pt-20 md:pt-20"
      style={{ background: 'rgb(229, 231, 235)' }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-center">
          <div
            className="relative w-full max-w-full"
            style={{ width: `${widthFraction * 100}%` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Swiper
              loop={items.length > 1}
              slidesPerView={1}
              spaceBetween={0}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
              className="showcase-slider overflow-hidden rounded-2xl shadow-xl"
            >
              {items.map((item) => (
                <SwiperSlide key={item.id}>
                  {item.variant === 'event' ? (
                    <ShowcaseEventCard item={item} />
                  ) : (
                    <ShowcaseCard item={item} />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation */}
            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                  aria-label="Prethodni"
                >
                  <FaChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                  aria-label="Sljedeći"
                >
                  <FaChevronRight className="w-4 h-4" />
                </button>
                <div className="flex justify-center gap-2 mt-6">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => goTo(i)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        i === currentIndex
                          ? 'w-8 bg-slate-700'
                          : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Custom slide for events (e.g. Dan žena 8. ožujka) */
function ShowcaseEventCard({ item }: { item: ShowcaseItem }) {
  const content = (
    <div className="relative aspect-[4/3] md:aspect-[21/9] w-full overflow-hidden rounded-2xl bg-slate-200">
      <Image
        src={item.image}
        alt={item.imageAlt ?? item.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 80vw"
        priority={false}
      />
      {/* Subtle bottom gradient for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)',
        }}
      />
      {/* Content — right-aligned, extra horizontal padding so text clears arrow buttons */}
      <div className="absolute inset-0 flex flex-col justify-end items-end py-6 px-14 md:py-10 md:px-24">
        <div className="max-w-xl text-right w-full flex flex-col items-end">
          {/* Discount badge — right side, above the text */}
          {item.discountLabel && (
            <span className="inline-block px-4 py-2 md:px-5 md:py-2.5 bg-black text-white text-sm md:text-base font-bold rounded-xl shadow-lg ring-2 ring-black/10 uppercase tracking-wide mb-4">
              {item.discountLabel}
            </span>
          )}
          {item.eventDate && (
            <p className="text-white/95 text-lg md:text-xl font-medium tracking-wide uppercase mb-1 drop-shadow-md">
              {item.eventDate}
            </p>
          )}
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg tracking-tight">
            {item.title}
          </h3>
          {item.description && (
            <p className="text-white/90 text-base md:text-lg mt-2 md:mt-3 max-w-md drop-shadow ml-auto">
              {item.description}
            </p>
          )}
          {item.link && item.ctaText && (
            <span className="inline-block mt-4 md:mt-6 px-5 py-2.5 md:px-6 md:py-3 bg-white text-slate-800 font-semibold rounded-xl shadow-lg hover:bg-white/95 transition-colors cursor-pointer">
              {item.ctaText}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (item.link) {
    return (
      <Link
        href={item.link}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-2xl"
      >
        {content}
      </Link>
    );
  }
  return content;
}

function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  const hasPriceInfo = item.price || item.oldPrice || item.discountLabel;
  const content = (
    <div className="relative aspect-[4/3] md:aspect-[21/9] w-full overflow-hidden rounded-2xl bg-slate-200">
      <Image
        src={item.image}
        alt={item.imageAlt ?? item.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 80vw"
        priority={false}
      />
      {/* Gradient overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%, transparent 100%)',
        }}
      />
      {/* Bottom right: title, description, and optional price/discount — extra horizontal padding so text clears arrow buttons */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-end p-4 px-14 md:p-6 md:px-24">
        <div className="text-white max-w-xl text-right">
          <h3 className="text-xl md:text-2xl font-bold drop-shadow-md">
            {item.title}
          </h3>
          {item.description && (
            <p className="text-sm md:text-base text-white/90 mt-1 line-clamp-2 drop-shadow">
              {item.description}
            </p>
          )}
          {hasPriceInfo && (
            <div className="mt-2 flex flex-wrap items-center justify-end gap-2">
              {item.discountLabel && (
                <span className="text-sm md:text-base font-semibold text-rose-200 drop-shadow-md">
                  {item.discountLabel}
                </span>
              )}
              {item.oldPrice && (
                <span className="text-sm line-through text-white/70 drop-shadow">
                  {item.oldPrice}
                </span>
              )}
              {item.price && (
                <span className="text-base md:text-lg font-bold text-white drop-shadow-md">
                  {item.price}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (item.link) {
    return (
      <Link href={item.link} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 rounded-2xl">
        {content}
      </Link>
    );
  }
  return content;
}
