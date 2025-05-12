'use client'

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/data/types';
import BlogPostCard from '@/components/ui/BlogPostCard';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface FeaturedBlogsSectionProps {
  posts: BlogPost[];
}

export default function FeaturedBlogsSection({ posts }: FeaturedBlogsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [visiblePosts, setVisiblePosts] = useState(1);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

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

  const totalPages = Math.ceil(posts.length / visiblePosts);
  const currentPage = Math.floor(currentIndex / visiblePosts) + 1;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= posts.length - visiblePosts ? 0 : prevIndex + 1
    );
  }, [posts.length, visiblePosts]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? posts.length - visiblePosts : prevIndex - 1
    );
  }, [posts.length, visiblePosts]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
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
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-slate-800 p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer opacity-100"
            aria-label="Previous post"
          >
            <FaChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-slate-800 p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer opacity-100"
            aria-label="Next post"
          >
            <FaChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Slides Container */}
          <div 
            className="relative overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visiblePosts)}%)` }}
            >
              {posts.map((post, index) => (
                <div
                  key={post.id}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                >
                  <BlogPostCard post={post} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {Array.from({ length: Math.ceil(posts.length / visiblePosts) }).map((_, index) => (
              <button
                key={`dot-${index}`}
                onClick={() => setCurrentIndex(index * visiblePosts)}
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