'use client';

import { useState, useRef, useEffect } from 'react';
import { blogPosts } from '@/data/posts';
import Link from 'next/link';
import Image from 'next/image';
import HeroSection from '@/components/sections/HeroSection';
import { FaSearch, FaSort, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

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
      }, 300);
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
        }, 800);
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

  return (
    <main>
      <HeroSection
        title="Blog"
        description="Otkrijte najnovije vijesti i savjete iz svijeta estetske medicine"
        image="/images/services/hero-blog.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Najnoviji članci
          </h2>
          <p className="text-xl text-gray-600">
            Pratite najnovije trendove i savjete iz svijeta ljepote
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar with Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtriraj članke</h3>
              
              {/* Search */}
              <div className="mb-6">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Pretraži članke
                </label>
                <div className="relative">
                  <input
                    id="search"
                    type="text"
                    placeholder="Naslov ili sadržaj..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>

              {/* Sort Options */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sortiraj po
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => handleSort('newest')}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      sortBy === 'newest' 
                        ? 'bg-indigo-50 text-indigo-700' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <FaSortAmountDown className="w-4 h-4" />
                    Najnovije
                  </button>
                  <button
                    onClick={() => handleSort('oldest')}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      sortBy === 'oldest' 
                        ? 'bg-indigo-50 text-indigo-700' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <FaSortAmountUp className="w-4 h-4" />
                    Najstarije
                  </button>
                  <button
                    onClick={() => handleSort('title-asc')}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      sortBy === 'title-asc' 
                        ? 'bg-indigo-50 text-indigo-700' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <FaSort className="w-4 h-4" />
                    Naslov A-Ž
                  </button>
                  <button
                    onClick={() => handleSort('title-desc')}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      sortBy === 'title-desc' 
                        ? 'bg-indigo-50 text-indigo-700' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <FaSort className="w-4 h-4 rotate-180" />
                    Naslov Ž-A
                  </button>
                </div>
              </div>

              {/* Authors */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Autori
                </label>
                <div className="space-y-2">
                  {allAuthors.map((author) => (
                    <label key={author} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedAuthors.includes(author)}
                        onChange={() => toggleAuthor(author)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{author}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategorije
                </label>
                <div className="space-y-2">
                  {allTags.map((tag) => (
                    <label key={tag} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Pronađeno članaka: <span className="font-semibold">{filteredPosts.length}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="flex-1" ref={postsRef}>
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${isScrolling || isFiltering ? 'opacity-25' : 'opacity-100'}`}>
              {currentPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative h-48 w-full">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{post.author}</span>
                        <time>{formatDate(post.date)}</time>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Prethodna
                </button>
                
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-lg cursor-pointer ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      } transition-colors`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Sljedeća
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
