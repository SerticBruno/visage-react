'use client';

import { useState, useRef, useEffect } from 'react';
import { blogPosts } from '@/data/posts';
import { blogCategories } from '@/data/blogCategories';
import HeroSection from '@/components/sections/HeroSection';
import { FaSearch, FaSort, FaSortAmountDown, FaSortAmountUp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import BlogPostCard from '@/components/ui/BlogPostCard';
import ContactSection from '@/components/sections/ContactSection';
import NewsletterCTASection from '@/components/sections/NewsletterCTASection';

const POSTS_PER_PAGE = 6;

// Get unique authors from all posts
const allAuthors = Array.from(new Set(blogPosts.map(post => post.author)));

type SortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc';

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [isScrolling, setIsScrolling] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const postsRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  const filteredPosts = blogPosts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategories = selectedCategories.length === 0 || 
        selectedCategories.includes(post.category);
      const matchesAuthors = selectedAuthors.length === 0 ||
        selectedAuthors.includes(post.author);
      return matchesSearch && matchesCategories && matchesAuthors;
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
  }, [searchTerm, selectedCategories, selectedAuthors, sortBy]);

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

  const toggleCategory = (categoryId: string) => {
    setIsFiltering(true);
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
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

  return (
    <div className="min-h-screen">
      <HeroSection
        title="Blog"
        description="Otkrijte najnovije vijesti i savjete iz svijeta estetske medicine"
        image="/images/services/blog-hero-visage-estetski-studio.jpg"
      />

      <div className="w-full" style={{ background: 'linear-gradient(to bottom, #e5e7eb, #ffffff)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
                    className="absolute inset-0 overflow-y-auto pr-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
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
                              ? 'bg-slate-700 text-white shadow-sm' 
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
                              ? 'bg-slate-700 text-white shadow-sm' 
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
                              ? 'bg-slate-700 text-white shadow-sm' 
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
                              ? 'bg-slate-700 text-white shadow-sm' 
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

                    {/* Categories */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Kategorije
                      </label>
                      <div className="space-y-2">
                        {blogCategories.map((category) => (
                          <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(category.id)}
                              onChange={() => toggleCategory(category.id)}
                              className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-slate-300 rounded cursor-pointer"
                            />
                            <span className="text-sm text-slate-700 cursor-pointer">{category.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
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
                    aria-label="Prethodna stranica"
                  >
                    <span className="hidden sm:inline">Prethodna</span>
                    <FaChevronLeft className="sm:hidden w-4 h-4" />
                  </button>
                  <div className="flex items-center space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${
                          currentPage === page
                            ? 'bg-slate-800 text-white shadow-md'
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
                    aria-label="Sljedeća stranica"
                  >
                    <span className="hidden sm:inline">Sljedeća</span>
                    <FaChevronRight className="sm:hidden w-4 h-4" />
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
      </div>
      <NewsletterCTASection/>
      <ContactSection hasTopPadding={true}/>
    </div>
  );
}