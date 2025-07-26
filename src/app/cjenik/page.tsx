'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { pricingData, pricingCategories, PricingItem } from '@/data/pricing';
import { FaSearch, FaStar, FaBox, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import ContactSection from '@/components/sections/ContactSection';
import CTASection from '@/components/sections/CTASection';

export default function PricingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [isScrolling] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Accordion states for filter sections
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    badges: false
  });

  const filteredItems = useMemo(() => {
    return pricingData.filter(item => {
      const matchesSearch = searchTerm === '' || 
                          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
      const matchesBadges = selectedBadges.length === 0 || 
        (selectedBadges.includes('popular') && item.isPopular) ||
        (selectedBadges.includes('package') && item.isPackage);
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
    setIsFiltering(true);
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    requestAnimationFrame(scrollToContent);
  };

  const toggleBadge = (badge: string) => {
    setIsFiltering(true);
    setSelectedBadges(prev => 
      prev.includes(badge)
        ? prev.filter(b => b !== badge)
        : [...prev, badge]
    );
    requestAnimationFrame(scrollToContent);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFiltering(true);
    setSearchTerm(e.target.value);
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
    return groups;
  }, [filteredItems]);

  return (
    <main>
      <HeroSection
        title="Cjenik usluga"
        description="Pronađite savršenu uslugu za vaše potrebe. Naš cjenik je transparentan i jasno prikazuje sve naše usluge i njihove cijene."
        image="/images/services/pricing-hero-visage-estetski-studio.webp"
      />
      <div className="w-full" style={{ background: 'linear-gradient(to bottom, #e5e7eb, #ffffff)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Naše usluge
            </h2>
            <p className="text-xl text-gray-600">
              Profesionalne estetske usluge za njegu lica i tijela s najnovijim tehnologijama i vrhunskim proizvodima
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar with Filters */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-md p-6 pr-3 ps-7 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto space-y-3 scrollbar-spaced" style={{ scrollbarGutter: 'stable' }}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Filtriraj usluge</h3>
                
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
                          setIsFiltering(true);
                          setSearchTerm('');
                          requestAnimationFrame(scrollToContent);
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
                      <div className="space-y-0.5 max-h-72 overflow-y-auto scrollbar-spaced pr-2">
                        {pricingCategories.filter(category => category !== "Konzultacije").map((category, index) => (
                          <label 
                            key={category} 
                            className={`flex items-start space-x-2 cursor-pointer group ${
                              index === pricingCategories.filter(cat => cat !== "Konzultacije").length - 1 ? 'pb-2' : ''
                            }`}
                          >
                            <div className="pt-0.5">
                              <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => toggleCategory(category)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
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
                      Oznake
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
                        ? 'max-h-60 opacity-100' 
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="space-y-1 relative">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBadges.includes('popular')}
                          onChange={() => toggleBadge('popular')}
                          className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700 flex items-center gap-1">
                          <FaStar className="w-3 h-3 text-yellow-500" />
                          Popularno
                        </span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer pb-2">
                        <input
                          type="checkbox"
                          checked={selectedBadges.includes('package')}
                          onChange={() => toggleBadge('package')}
                          className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700 flex items-center gap-1">
                          <FaBox className="w-3 h-3 text-green-500" />
                          Paket
                        </span>
                      </label>
                      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                {/* Results Count */}
                <div className="border-t border-gray-200 pt-6">
                  <p className="text-sm text-gray-600">
                    Pronađeno usluga: <span className="font-semibold">{filteredItems.length}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-lg p-6" ref={contentRef}>
              {/* Content View */}
              <div className={`transition-opacity duration-300 ${isScrolling || isFiltering ? 'opacity-25' : 'opacity-100'}`}>
                <div className="space-y-6">
                  {Object.entries(groupedItems).map(([category, items]) => (
                    <div key={`category-group-${category}`} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {items.map((item) => (
                          <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                  <h4 className="text-base font-medium text-gray-900">{item.title}</h4>
                                  {item.isPackage && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                      <FaBox className="mr-1" />
                                      Paket
                                    </span>
                                  )}
                                  {item.isPopular && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                      <FaStar className="mr-1" />
                                      Popularno
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600">{item.description}</p>
                              </div>
                              <div className="flex items-center justify-between sm:justify-end gap-4">
                                <div className="text-base font-medium text-gray-900">{item.price}</div>
                              </div>
                            </div>
                          </div>
                        ))}
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
      <CTASection />
      <ContactSection/>
    </main>
  );
} 