'use client';

import { blogPosts } from '@/data/posts';
import Link from 'next/link';
import Image from 'next/image';
import HeroSection from '@/components/sections/HeroSection';
import SearchBar from '@/components/SearchBar';
import { useState, useMemo } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ContactSection from '@/components/sections/ContactSection';
import SubscriptionCTASection from '@/components/sections/SubscriptionCTASection';
import NewsletterCTASection from '@/components/sections/NewsletterCTASection';

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div>
      <HeroSection
        title="Blog"
        description="Otkrijte najnovije savjete i trendove u svijetu ljepote i njege"
        image="/images/services/hero-blog.jpg"
        ctaText="Pročitajte više"
        ctaLink="#blog-posts"
      />
      <div id="blog-posts" className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Najnoviji savjeti i trendovi u svijetu ljepote
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            U našem blogu dijelimo ekspertno znanje o najnovijim tretmanima, proizvodima i tehnikama u svijetu ljepote. 
            Otkrijte kako postići najbolje rezultate za svoju kožu i izgled.
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Nema rezultata za vašu pretragu.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post) => (
                <Link 
                  href={`/blog/${post.slug}`}
                  key={post.id}
                  className="block h-full"
                >
                  <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px] h-full flex flex-col">
                    {post.image && (
                      <div className="relative h-48 w-full flex-shrink-0">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <span>{post.author}</span>
                      </div>
                      <h2 className="text-xl font-semibold mb-2 text-gray-900 hover:text-indigo-600 transition-colors duration-300">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 flex-grow">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-indigo-50 text-indigo-600 text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Prethodna
                </button>
                <span className="text-gray-600">
                  Stranica {currentPage} od {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sljedeća
                </button>
              </div>
            )}

          </>
        )}
      </div>
      <NewsletterCTASection />
      <ContactSection />
    </div>
  );
} 