'use client';

import { useState, useRef, useEffect } from 'react';
import { blogPosts } from '@/data/posts';
import Link from 'next/link';
import Image from 'next/image';
import HeroSection from '@/components/sections/HeroSection';
import { FaSearch, FaSort, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import BlogPostCard from '@/components/ui/BlogPostCard';
import ContactSection from '@/components/sections/ContactSection';
import NewsletterCTASection from '@/components/sections/NewsletterCTASection';

const POSTS_PER_PAGE = 6;

// Get unique tags and authors from all posts
const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));
const allAuthors = Array.from(new Set(blogPosts.map(post => post.author)));

type SortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc';

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [isScrolling, setIsScrolling] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const postsRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [showGradient, setShowGradient] = useState(false);

  const filteredPosts = blogPosts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => post.tags.includes(tag));
      const matchesAuthors = selectedAuthors.length === 0 ||
        selectedAuthors.includes(post.author);
      return matchesSearch && matchesTags && matchesAuthors;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedTags, selectedAuthors, sortBy]);

  // Reset filtering state after a delay
  useEffect(() => {
    if (isFiltering) {
      const timer = setTimeout(() => {
        setIsFiltering(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isFiltering]);

  const scrollToPosts = () => {
    const navbarHeight = 80;
    const postsTop = postsRef.current?.offsetTop || 0;
    const scrollPosition = postsTop - navbarHeight - 30;

    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth' as ScrollBehavior
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage !== currentPage) {
      setIsScrolling(true);
      setCurrentPage(newPage);
      
      requestAnimationFrame(() => {
        scrollToPosts();
        setTimeout(() => {
          setIsScrolling(false);
        }, 500);
      });
    }
  };

  const toggleTag = (tag: string) => {
    setIsFiltering(true);
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
    requestAnimationFrame(scrollToPosts);
  };

  const toggleAuthor = (author: string) => {
    setIsFiltering(true);
    setSelectedAuthors(prev => 
      prev.includes(author)
        ? prev.filter(a => a !== author)
        : [...prev, author]
    );
    requestAnimationFrame(scrollToPosts);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFiltering(true);
    setSearchTerm(e.target.value);
    requestAnimationFrame(scrollToPosts);
  };

  const handleSort = (option: SortOption) => {
    setIsFiltering(true);
    setSortBy(option);
    requestAnimationFrame(scrollToPosts);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('hr-HR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleCategoriesScroll = () => {
    const scrollTop = categoriesRef.current?.scrollTop || 0;
    const scrollHeight = categoriesRef.current?.scrollHeight || 0;
    const clientHeight = categoriesRef.current?.clientHeight || 0;
    const scrollThreshold = scrollHeight - clientHeight - 100;

    if (scrollTop >= scrollThreshold) {
      setShowGradient(true);
    } else {
      setShowGradient(false);
    }
  };

  return (
    <div className="min-h-screen">
      <HeroSection
        title="Blog"
        description="Otkrijte najnovije vijesti i savjete iz svijeta estetske medicine"
        image="/images/services/hero-blog.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Najnoviji članci
          </h2>
          <p className="text-xl text-slate-600">
            Pratite najnovije trendove i savjete iz svijeta ljepote
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar with Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Filtriraj članke</h3>
              
              {/* Search */}
              <div className="mb-6">
                <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-2">
                  Pretraži članke
                </label>
                <div className="relative">
                  <input
                    id="search"
                    type="text"
                    placeholder="Naslov ili sadržaj..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-300"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <FaSearch className="absolute left-3 top-3 text-slate-400" />
                </div>
              </div>

              {/* Scrollable Filters Container */}
              <div className="relative h-[300px]">
                <div 
                  ref={categoriesRef}
                  onScroll={handleCategoriesScroll}
                  className="absolute inset-0 overflow-y-auto pr-2 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                >
                  {/* Sort Options */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Sortiraj po
                    </label>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleSort('newest')}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-300 cursor-pointer ${
                          sortBy === 'newest' 
                            ? 'bg-gradient-to-br from-slate-700 to-slate-800 text-white shadow-sm' 
                            : 'text-slate-600 hover:bg-slate-50 hover:shadow-sm'
                        }`}
                      >
                        <FaSortAmountDown className="w-4 h-4" />
                        Najnovije
                      </button>
                      <button
                        onClick={() => handleSort('oldest')}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-300 cursor-pointer ${
                          sortBy === 'oldest' 
                            ? 'bg-gradient-to-br from-slate-700 to-slate-800 text-white shadow-sm' 
                            : 'text-slate-600 hover:bg-slate-50 hover:shadow-sm'
                        }`}
                      >
                        <FaSortAmountUp className="w-4 h-4" />
                        Najstarije
                      </button>
                      <button
                        onClick={() => handleSort('title-asc')}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-300 cursor-pointer ${
                          sortBy === 'title-asc' 
                            ? 'bg-gradient-to-br from-slate-700 to-slate-800 text-white shadow-sm' 
                            : 'text-slate-600 hover:bg-slate-50 hover:shadow-sm'
                        }`}
                      >
                        <FaSort className="w-4 h-4" />
                        Naslov A-Ž
                      </button>
                      <button
                        onClick={() => handleSort('title-desc')}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-300 cursor-pointer ${
                          sortBy === 'title-desc' 
                            ? 'bg-gradient-to-br from-slate-700 to-slate-800 text-white shadow-sm' 
                            : 'text-slate-600 hover:bg-slate-50 hover:shadow-sm'
                        }`}
                      >
                        <FaSort className="w-4 h-4 rotate-180" />
                        Naslov Ž-A
                      </button>
                    </div>
                  </div>

                  {/* Authors */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Autori
                    </label>
                    <div className="space-y-2">
                      {allAuthors.map((author) => (
                        <label key={author} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedAuthors.includes(author)}
                            onChange={() => toggleAuthor(author)}
                            className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-slate-300 rounded cursor-pointer"
                          />
                          <span className="text-sm text-slate-700 cursor-pointer">{author}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Kategorije
                    </label>
                    <div className="space-y-2">
                      {allTags.map((tag) => (
                        <label key={tag} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedTags.includes(tag)}
                            onChange={() => toggleTag(tag)}
                            className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-slate-300 rounded cursor-pointer"
                          />
                          <span className="text-sm text-slate-700 cursor-pointer">{tag}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Gradient overlay to indicate scrollable content */}
                <div 
                  className={`absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none transition-opacity duration-200 ${
                    showGradient ? 'opacity-100' : 'opacity-0'
                  }`} 
                />
              </div>

              {/* Results Count - Moved to bottom */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-sm text-slate-600">
                  Pronađeno članaka: <span className="font-semibold">{filteredPosts.length}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="flex-1">
            <div ref={postsRef} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${isScrolling || isFiltering ? 'opacity-25' : 'opacity-100'}`}>
              {currentPosts.map((post) => (
                <BlogPostCard 
                  key={post.id} 
                  post={post}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center space-x-2">
                <button
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer hover:border-slate-300 hover:shadow-sm"
                >
                  Prethodna
                </button>
                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${
                        currentPage === page
                          ? 'bg-gradient-to-br from-slate-700 to-slate-800 text-white shadow-md'
                          : 'text-slate-600 hover:bg-slate-50 hover:border hover:border-slate-200 hover:shadow-sm'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer hover:border-slate-300 hover:shadow-sm"
                >
                  Sljedeća
                </button>
              </div>
            )}

            {currentPosts.length === 0 && (
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Nema pronađenih članaka
                </h3>
                <p className="text-slate-600">
                  Pokušajte promijeniti kriterije pretraživanja
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <NewsletterCTASection/>
      <ContactSection/>
    </div>
  );
}