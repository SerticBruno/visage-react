'use client'

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/data/types';
import BlogPostCard from '@/components/ui/BlogPostCard';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

interface FeaturedBlogsSectionProps {
  posts: BlogPost[];
}

export default function FeaturedBlogsSection({ posts }: FeaturedBlogsSectionProps) {
  const [visiblePosts, setVisiblePosts] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const swiperRef = useRef<SwiperType | null>(null);
  const totalPages = Math.ceil(posts.length / visiblePosts);

  useEffect(() => {
    const updateVisiblePosts = () => {
      if (window.innerWidth >= 1024) { // lg
        setVisiblePosts(3);
      } else if (window.innerWidth >= 768) { // md
        setVisiblePosts(2);
      } else {
        setVisiblePosts(1);
      }
    };

    updateVisiblePosts();
    window.addEventListener('resize', updateVisiblePosts);
    return () => window.removeEventListener('resize', updateVisiblePosts);
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
      const targetIndex = pageIndex * visiblePosts;
      swiperRef.current.slideToLoop(targetIndex);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Izdvojeni članci</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Otkrijte najnovije savjete i trendove iz svijeta estetske medicine. Naši stručnjaci dijele svoje znanje i iskustvo kroz detaljne članke o najmodernijim tretmanima i tehnikama.
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Swiper Container */}
          <Swiper
            spaceBetween={24}
            slidesPerView={visiblePosts}
            loop={true}
            loopAdditionalSlides={visiblePosts}
            watchSlidesProgress={true}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setCurrentPage(Math.floor(swiper.realIndex / visiblePosts) + 1);
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
          >
            {posts.map((post) => (
              <SwiperSlide key={post.id} className='pb-8'>
                <div className="px-4 h-[600px]">
                  <BlogPostCard post={post} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation and Pagination */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={handlePrev}
              className="w-8 h-8 bg-white/90 hover:bg-white text-slate-800 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
              aria-label="Previous post"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-slate-800 font-medium">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer ${
                    currentPage === index + 1
                      ? 'bg-slate-800 text-white'
                      : 'hover:bg-slate-100'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              className="w-8 h-8 bg-white/90 hover:bg-white text-slate-800 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
              aria-label="Next post"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-xl hover:from-slate-700 hover:to-slate-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span className="font-medium">Pogledajte sve članke</span>
            <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
} 