'use client';

import { blogPosts } from '@/data/posts';
import Link from 'next/link';
import Image from 'next/image';
import HeroSection from '@/components/sections/HeroSection';
import SearchBar from '@/components/SearchBar';
import { useState, useMemo } from 'react';
import { FaChevronLeft, FaChevronRight, FaCalendarAlt, FaUser, FaTag, FaSort } from 'react-icons/fa';
import ContactSection from '@/components/sections/ContactSection';
import SubscriptionCTASection from '@/components/sections/SubscriptionCTASection';
import NewsletterCTASection from '@/components/sections/NewsletterCTASection';
import { formatDate } from '@/lib/utils';

const POSTS_PER_PAGE = 6;

type SortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: ''
  });

  // Get unique authors and tags
  const authors = useMemo(() => {
    const uniqueAuthors = Array.from(new Set(blogPosts.map(post => post.author)));
    return uniqueAuthors.sort((a, b) => a.localeCompare(b)); // Sort authors alphabetically
  }, []);
  const allTags = useMemo(() => Array.from(new Set(blogPosts.flatMap(post => post.tags))), []);

  // Get popular tags (tags that appear in more than one post)
  const popularTags = useMemo(() => {
    const tagCounts = allTags.reduce((acc, tag) => {
      acc[tag] = blogPosts.filter(post => post.tags.includes(tag)).length;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(tagCounts)
      .filter(([_, count]) => count > 1)
      .sort((a, b) => {
        // First sort by count (descending)
        if (b[1] !== a[1]) return b[1] - a[1];
        // Then sort alphabetically
        return a[0].localeCompare(b[0]);
      })
      .map(([tag]) => tag);
  }, [allTags, blogPosts]);

  // Get recent posts
  const recentPosts = useMemo(() => {
    return [...blogPosts]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 3);
  }, [blogPosts]);

  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply author filter
    if (selectedAuthor) {
      filtered = filtered.filter(post => post.author === selectedAuthor);
    }

    // Apply tag filters
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post => 
        selectedTags.every(tag => post.tags.includes(tag))
      );
    }

    // Apply date range filter
    if (dateRange.start) {
      filtered = filtered.filter(post => 
        post.date >= new Date(dateRange.start)
      );
    }
    if (dateRange.end) {
      filtered = filtered.filter(post => 
        post.date <= new Date(dateRange.end)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.date.getTime() - a.date.getTime();
        case 'oldest':
          return a.date.getTime() - b.date.getTime();
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedAuthor, selectedTags, sortBy, dateRange]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
    setCurrentPage(1);
  };

  const handleAuthorClick = (author: string) => {
    setSelectedAuthor(prev => prev === author ? null : author);
    setCurrentPage(1);
  };

  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    setDateRange(prev => ({ ...prev, [field]: value }));
    setCurrentPage(1);
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
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Search */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pretraži</h3>
                <SearchBar onSearch={handleSearch} />
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Popularne kategorije</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className={`px-3 py-1 text-sm rounded-full transition-colors cursor-pointer ${
                        selectedTags.includes(tag)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Authors */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Autori</h3>
                <div className="space-y-2">
                  {authors.map((author) => (
                    <button
                      key={author}
                      onClick={() => handleAuthorClick(author)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                        selectedAuthor === author
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {author}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Posts */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Najnoviji članci</h3>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="block group"
                    >
                      <div className="flex gap-4">
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {formatDate(post.date)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Filters */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex flex-wrap gap-4">
                  {/* Sort */}
                  <div className="flex items-center gap-2">
                    <FaSort className="text-gray-500" />
                    <select
                      value={sortBy}
                      onChange={(e) => handleSortChange(e.target.value as SortOption)}
                      className="border rounded-lg px-3 py-2"
                    >
                      <option value="newest">Najnovije</option>
                      <option value="oldest">Najstarije</option>
                      <option value="title-asc">Naslov A-Ž</option>
                      <option value="title-desc">Naslov Ž-A</option>
                    </select>
                  </div>

                  {/* Date Range */}
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-500" />
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => handleDateRangeChange('start', e.target.value)}
                      className="border rounded-lg px-3 py-2"
                    />
                    <span>do</span>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => handleDateRangeChange('end', e.target.value)}
                      className="border rounded-lg px-3 py-2"
                    />
                  </div>
                </div>
              </div>

              {/* Posts Grid */}
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
                          <div className="p-6 flex-grow">
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                              <span>{formatDate(post.date)}</span>
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
          </div>
        </div>
      </div>
      <NewsletterCTASection />
      <ContactSection />
    </div>
  );
} 