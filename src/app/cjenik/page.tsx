'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { pricingData, pricingCategories, PricingItem, DERMAPEN_4_CATEGORY } from '@/data/pricing';
import { FaSearch, FaBox, FaChevronDown, FaChevronUp, FaStar } from 'react-icons/fa';
import { FaFire, FaCrown } from 'react-icons/fa6';
import React from 'react';
import Link from 'next/link';
import HeroSection from '@/components/sections/HeroSection';
import ContactSection from '@/components/sections/ContactSection';
import CTASection from '@/components/sections/CTASection';

const DAN_ZENA_DISCOUNT = 0.1; // 10%

function parsePrice(priceStr: string): { value: number; suffix: string } {
  const match = priceStr.match(/^([\d.,]+)\s*(.*)$/);
  if (!match) return { value: 0, suffix: '' };
  const value = parseFloat(match[1].replace(',', '.'));
  const suffix = (match[2] || '').trim();
  return { value: isNaN(value) ? 0 : value, suffix };
}

function formatDiscountedPrice(priceStr: string): string | null {
  const { value, suffix } = parsePrice(priceStr);
  if (value <= 0) return null;
  const discounted = value * (1 - DAN_ZENA_DISCOUNT);
  const formatted = Number.isInteger(discounted) ? discounted : discounted.toFixed(2);
  return `${formatted} ${suffix}`;
}

export default function PricingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [isScrolling] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Accordion states for filter sections
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    badges: false
  });
  // Mobile: filter panel collapsed by default
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const filteredItems = useMemo(() => {
    return pricingData.filter(item => {
      const matchesSearch = searchTerm === '' || 
                          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 ||
        selectedCategories.includes(item.category) ||
        (selectedCategories.includes('Dan žena') && item.category === DERMAPEN_4_CATEGORY);
      const matchesBadges = selectedBadges.length === 0 || 
        (selectedBadges.includes('popular') && item.isPopular) ||
        (selectedBadges.includes('package') && item.isPackage) ||
        (selectedBadges.includes('recommended') && item.isRecommended) ||
        (selectedBadges.includes('new') && item.isNew);
      return matchesSearch && matchesCategory && matchesBadges;
    });
  }, [searchTerm, selectedCategories, selectedBadges]);

  // Reset filtering state after a delay
  useEffect(() => {
    if (isFiltering) {
      const timer = setTimeout(() => {
        setIsFiltering(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isFiltering]);

  // Handle transition state
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const scrollToContent = () => {
    const navbarHeight = 80;
    const contentTop = contentRef.current?.offsetTop || 0;
    const scrollPosition = contentTop - navbarHeight - 30;

    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth' as ScrollBehavior
    });
  };

  const toggleCategory = (category: string) => {
    setIsTransitioning(true);
    setIsFiltering(true);
    
    // Fade out first
    setTimeout(() => {
      setSelectedCategories(prev => 
        prev.includes(category)
          ? prev.filter(c => c !== category)
          : [...prev, category]
      );
      requestAnimationFrame(scrollToContent);
    }, 150); // Half of the transition duration
  };

  const toggleBadge = (badge: string) => {
    setIsTransitioning(true);
    setIsFiltering(true);
    
    // Fade out first
    setTimeout(() => {
      setSelectedBadges(prev => 
        prev.includes(badge)
          ? prev.filter(b => b !== badge)
          : [...prev, badge]
      );
      requestAnimationFrame(scrollToContent);
    }, 150); // Half of the transition duration
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsFiltering(true);
    requestAnimationFrame(scrollToContent);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const groupedItems = useMemo(() => {
    const groups: { [key: string]: PricingItem[] } = {};
    filteredItems.forEach(item => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    // Dan žena at top: show Dermapen 4 items under "Dan žena" with red header; other categories in order (skip Mezoterapija Dermapenom 4 to avoid duplicate)
    const dermapen4Items = groups[DERMAPEN_4_CATEGORY] ?? [];
    const ordered: { category: string; items: PricingItem[]; isDanZena?: boolean }[] = [];
    if (dermapen4Items.length > 0) {
      ordered.push({ category: 'Dan žena', items: dermapen4Items, isDanZena: true });
    }
    pricingCategories.forEach(cat => {
      if (cat === 'Dan žena' || cat === DERMAPEN_4_CATEGORY) return;
      const items = groups[cat];
      if (items?.length) ordered.push({ category: cat, items, isDanZena: false });
    });
    return ordered;
  }, [filteredItems]);

  return (
    <main>
      <HeroSection
        title="Cjenik usluga"
        description="10% popusta na Dermapen 4 za Dan žena"
        image="/images/services/pricing-hero-visage-estetski-studio.webp"
      />
      <div className="w-full" style={{ background: 'linear-gradient(to bottom, #e5e7eb, #ffffff)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Naše usluge
            </h2>
            <p className="text-xl text-gray-600">
              Profesionalne estetske usluge za njegu lica i tijela s najnovijim tehnologijama i vrhunskim proizvodima. U sklopu Dana žena vrijedi 10% popusta na usluge Dermapen 4 - pogledajte snižene cijene u kategoriji Dan žena.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar with Filters */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-md sticky top-24 lg:max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-spaced" style={{ scrollbarGutter: 'stable' }}>
                {/* Mobile: collapsible filter header */}
                <button
                  type="button"
                  onClick={() => setIsFilterOpen((open) => !open)}
                  className="lg:hidden flex items-center justify-between w-full p-6 pr-3 ps-7 text-left focus:outline-none rounded-t-lg hover:bg-gray-50/80 transition-colors"
                  aria-expanded={isFilterOpen}
                  aria-controls="cjenik-filter-content"
                >
                  <h3 className="text-lg font-semibold text-gray-900">Filtriraj usluge</h3>
                  {isFilterOpen ? (
                    <FaChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" aria-hidden />
                  ) : (
                    <FaChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" aria-hidden />
                  )}
                </button>
                <h3 className="hidden lg:block text-lg font-semibold text-gray-900 mb-2 px-6 pr-3 ps-7 pt-6">Filtriraj usluge</h3>
                <div
                  id="cjenik-filter-content"
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isFilterOpen ? 'max-h-[85vh] overflow-y-auto' : 'max-h-0'
                  } lg:max-h-none lg:overflow-visible lg:opacity-100`}
                >
                  <div className="p-6 pr-3 ps-7 pt-0 lg:pt-0 space-y-3">
                {/* Search */}
                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                    Pretraži usluge
                  </label>
                  <div className="relative">
                    <input
                      id="search"
                      type="text"
                      placeholder="Naziv ili opis..."
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                    <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
                    {searchTerm && (
                      <button
                        onClick={() => {
                          setIsTransitioning(true);
                          setIsFiltering(true);
                          
                          // Fade out first, then clear search
                          setTimeout(() => {
                            setSearchTerm('');
                            requestAnimationFrame(scrollToContent);
                          }, 150); // Half of the transition duration
                        }}
                        className="absolute right-3 top-3.5 w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-800 rounded-full transition-all duration-200 cursor-pointer"
                        aria-label="Očisti pretraživanje"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Categories Section */}
                <div className="border-t border-gray-200 pt-3 pb-0 mb-0">
                  <button
                    onClick={() => toggleSection('categories')}
                    className="flex items-center justify-between w-full text-left mb-2 focus:outline-none cursor-pointer"
                  >
                    <label className="block text-sm font-medium text-gray-700 cursor-pointer">
                      Kategorije
                    </label>
                    {expandedSections.categories ? (
                      <FaChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      expandedSections.categories 
                        ? 'max-h-80 opacity-100' 
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="relative">
                      <div className="space-y-2 max-h-72 overflow-y-auto scrollbar-spaced pr-2">
                        {pricingCategories.filter(category => category !== "Konzultacije").map((category, index) => (
                          <label 
                            key={category} 
                            className={`flex items-baseline space-x-2 cursor-pointer group ${
                              index === pricingCategories.filter(cat => cat !== "Konzultacije").length - 1 ? 'pb-2' : ''
                            }`}
                          >
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => toggleCategory(category)}
                                className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                                style={{ transform: 'translateY(2px)' }}
                              />
                            </div>
                            <span className="text-sm text-gray-700 group-hover:text-gray-900">{category}</span>
                          </label>
                        ))}
                      </div>
                      <div className="absolute bottom-0 left-0 right-2 h-4 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                {/* Badges Filter Section */}
                <div className="border-t border-gray-200 pt-3 pb-0 mb-0">
                  <button
                    onClick={() => toggleSection('badges')}
                    className="flex items-center justify-between w-full text-left mb-2 focus:outline-none cursor-pointer"
                  >
                    <label className="block text-sm font-medium text-gray-700 cursor-pointer">
                      Tagovi
                    </label>
                    {expandedSections.badges ? (
                      <FaChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      expandedSections.badges 
                        ? 'max-h-80 opacity-100' 
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="space-y-2 relative">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBadges.includes('popular')}
                          onChange={() => toggleBadge('popular')}
                          className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700 flex items-center gap-1">
                          <FaFire className="w-3 h-3 text-gray-600" />
                          Popularno
                        </span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBadges.includes('package')}
                          onChange={() => toggleBadge('package')}
                          className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700 flex items-center gap-1">
                          <FaBox className="w-3 h-3 text-gray-600" />
                          Paket
                        </span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBadges.includes('recommended')}
                          onChange={() => toggleBadge('recommended')}
                          className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700 flex items-center gap-1">
                          <FaCrown className="w-3 h-3 text-gray-600" />
                          Naša preporuka
                        </span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer pb-2">
                        <input
                          type="checkbox"
                          checked={selectedBadges.includes('new')}
                          onChange={() => toggleBadge('new')}
                          className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700 flex items-center gap-1">
                          <FaStar className="w-3 h-3 text-gray-600" />
                          Novo
                        </span>
                      </label>
                      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                {/* Clear Filters Button */}
                {(searchTerm || selectedCategories.length > 0 || selectedBadges.length > 0) && (
                  <div className="border-t border-gray-200 pt-4">
                    <button
                      onClick={() => {
                        setIsTransitioning(true);
                        setIsFiltering(true);
                        setTimeout(() => {
                          setSearchTerm('');
                          setSelectedCategories([]);
                          setSelectedBadges([]);
                          requestAnimationFrame(scrollToContent);
                        }, 150);
                      }}
                      className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium shadow-sm cursor-pointer
                                 hover:bg-gray-200 hover:shadow-md transition-all duration-200 ease-out
                                 border border-gray-200 hover:border-gray-300"
                    >
                      Očisti sve filtere
                    </button>
                  </div>
                )}

                {/* Results Count */}
                <div className="border-t border-gray-200 pt-6">
                  <p className="text-sm text-gray-600">
                    Pronađeno usluga: <span className="font-semibold">{filteredItems.length}</span>
                  </p>
                </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-lg p-6" ref={contentRef}>
              {/* Content View */}
              <div className={`transition-opacity duration-300 ${isScrolling || isFiltering || isTransitioning ? 'opacity-25' : 'opacity-100'}`}>
                <div className="space-y-6">
                  {groupedItems.map(({ category, items, isDanZena }) => (
                    <div key={`category-group-${category}`} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                      <div className={`px-6 py-3 border-b ${isDanZena ? 'bg-[#9d304e] border-[#9d304e]' : 'bg-gray-50 border-gray-200'}`}>
                        <h3 className={`text-lg font-semibold ${isDanZena ? 'text-white' : 'text-gray-900'}`}>{category}</h3>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {items.map((item) => {
                          const hasDanZenaDiscount = item.category === DERMAPEN_4_CATEGORY;
                          return (
                            <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <h4 className="text-base font-medium text-gray-900">{item.title}</h4>
                                    {item.isPopular && (
                                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-white">
                                        <FaFire className="mr-1" />
                                        Popularno
                                      </span>
                                    )}
                                    {item.isPackage && (
                                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-white">
                                        <FaBox className="mr-1" />
                                        Paket
                                      </span>
                                    )}
                                    {item.isRecommended && (
                                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-white">
                                        <FaCrown className="mr-1" />
                                        Preporuka
                                      </span>
                                    )}
                                    {item.isNew && (
                                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-white">
                                        <FaStar className="mr-1" />
                                        Novo
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600">{item.description}</p>
                                </div>
                                <div className="flex flex-col items-end gap-2 sm:justify-end">
                                  {hasDanZenaDiscount && (
                                    <Link
                                      href="/dan-zena"
                                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#9d304e] text-white hover:bg-[#7a2640] transition-colors w-fit"
                                    >
                                      10% Dan žena
                                    </Link>
                                  )}
                                  {hasDanZenaDiscount && formatDiscountedPrice(item.price) ? (
                                    <div className="flex flex-wrap items-baseline justify-end gap-2">
                                      <span className="text-sm text-gray-500 line-through">{item.price}</span>
                                      <span className="text-base font-semibold text-rose-600">
                                        {formatDiscountedPrice(item.price)}
                                      </span>
                                    </div>
                                  ) : (
                                    <div className="text-base font-medium text-gray-900">{item.price}</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {filteredItems.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Nema pronađenih usluga
                  </h3>
                  <p className="text-gray-600">
                    Pokušajte promijeniti kriterije pretraživanja
                  </p>
                </div>
              )}

              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">
                  * Cijene su informativne i mogu varirati ovisno o specifičnim zahtjevima
                </p>
                <p className="text-gray-600">
                  Za više informacija i rezervacije, slobodno nas kontaktirajte
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CTASection gradientDirection='t'/>
      <ContactSection/>
    </main>
  );
} 