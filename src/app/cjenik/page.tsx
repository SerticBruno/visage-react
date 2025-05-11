'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { pricingData, pricingCategories, PricingItem } from '@/data/pricing';
import { FaSearch, FaStar, FaBox } from 'react-icons/fa';
import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import ContactSection from '@/components/sections/ContactSection';
import CTASection from '@/components/sections/CTASection';
import { services } from '@/data/services';

export default function PricingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [showGradient, setShowGradient] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  const filteredItems = useMemo(() => {
    return pricingData.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategories]);

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFiltering(true);
    setSearchTerm(e.target.value);
    requestAnimationFrame(scrollToContent);
  };

  const handleCategoriesScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    // Show gradient if we're not at the bottom (with a small threshold)
    setShowGradient(scrollHeight - scrollTop - clientHeight > 10);
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
        image="/images/services/cjenik-hero.webp"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar with Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtriraj usluge</h3>
              
              {/* Search - Always visible */}
              <div className="mb-6">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Pretraži usluge
                </label>
                <div className="relative">
                  <input
                    id="search"
                    type="text"
                    placeholder="Naziv ili opis..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>

              {/* Categories - Scrollable */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategorije
                </label>
                <div className="relative">
                  <div 
                    ref={categoriesRef}
                    onScroll={handleCategoriesScroll}
                    className="max-h-[300px] overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                  >
                    {pricingCategories.map((category) => (
                      <label key={category} className="flex items-start space-x-2 cursor-pointer group">
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
                  {/* Gradient overlay to indicate scrollable content */}
                  <div 
                    className={`absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none transition-opacity duration-200 ${
                      showGradient ? 'opacity-100' : 'opacity-0'
                    }`} 
                  />
                </div>
              </div>

              {/* Results Count - Always visible */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Pronađeno usluga: <span className="font-semibold">{filteredItems.length}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1" ref={contentRef}>
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
      <ContactSection/>
    </main>
  );
} 