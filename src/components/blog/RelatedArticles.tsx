'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/data/types';
import { FaArrowLeft, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

interface RelatedArticlesProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
}

export default function RelatedArticles({ currentPost, allPosts }: RelatedArticlesProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Find next and previous posts
  const currentIndex = allPosts.findIndex(post => post.id === currentPost.id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Find related posts based on tags with a more flexible matching system
  const relatedPosts = allPosts
    .filter(post => post.id !== currentPost.id) // Exclude current post
    .map(post => {
      // Calculate similarity score based on matching tags
      const matchingTags = post.tags.filter(tag => 
        currentPost.tags.some(currentTag => 
          currentTag.toLowerCase().includes(tag.toLowerCase()) || 
          tag.toLowerCase().includes(currentTag.toLowerCase())
        )
      );
      return {
        post,
        score: matchingTags.length
      };
    })
    .filter(({ score }) => score > 0) // Only include posts with at least one matching tag
    .sort((a, b) => b.score - a.score) // Sort by number of matching tags
    .map(({ post }) => post)
    .slice(0, 3);

  // If no related posts found, show most recent posts instead
  const displayPosts = relatedPosts.length > 0 
    ? relatedPosts 
    : allPosts
        .filter(post => post.id !== currentPost.id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);

  const totalPages = displayPosts.length;

  const swiperRef = React.useRef<SwiperType | null>(null);

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

  return (
    <div className="mt-16 space-y-12">
      {/* Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prevPost ? (
          <Link
            href={`/blog/${prevPost.slug}`}
            className="group flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md"
          >
            <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
              {prevPost.image && (
                <Image
                  src={prevPost.image}
                  alt={prevPost.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <FaArrowLeft className="mr-2" />
                <span>Prethodni članak</span>
              </div>
              <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-2">
                {prevPost.title}
              </h3>
            </div>
          </Link>
        ) : <div />}
        
        {nextPost ? (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="group flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md"
          >
            <div className="flex-1 min-w-0 text-right">
              <div className="flex items-center justify-end text-sm text-gray-500 mb-1">
                <span>Sljedeći članak</span>
                <FaArrowRight className="ml-2" />
              </div>
              <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-2">
                {nextPost.title}
              </h3>
            </div>
            <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
              {nextPost.image && (
                <Image
                  src={nextPost.image}
                  alt={nextPost.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              )}
            </div>
          </Link>
        ) : <div />}
      </div>

      {/* Related Articles */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {relatedPosts.length > 0 ? 'Slični članci' : 'Najnoviji članci'}
          </h2>
        </div>

        {/* Mobile and Tablet Slider */}
        <div className="lg:hidden">
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
            breakpoints={{
              320: {
                spaceBetween: 16,
                slidesPerView: 1,
              },
              768: {
                spaceBetween: 24,
                slidesPerView: 2,
              }
            }}
            className="pb-8"
          >
            {displayPosts.map((post) => (
              <SwiperSlide key={post.id}>
                <div className="px-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block"
                  >
                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                      {post.image && (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-gray-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Mobile and Tablet Navigation Controls */}
          <div className="flex flex-col items-center gap-6 pt-8">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handlePrev}
                className="w-10 h-10 bg-white text-slate-800 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
                aria-label="Previous article"
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
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
                aria-label="Next article"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* View All Button */}
            <Link
              href="/blog"
              className="inline-flex items-center px-8 py-4 text-base font-medium rounded-xl shadow-lg text-white bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Pogledajte sve članke
            </Link>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {displayPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-gray-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>

        {/* Desktop View All Button */}
        <div className="hidden lg:flex justify-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center px-8 py-4 text-base font-medium rounded-xl shadow-lg text-white bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
          >
            <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Pogledajte sve članke
          </Link>
        </div>
      </div>
    </div>
  );
}