'use client';

import { useState, useRef, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import HeroSection from '@/components/sections/HeroSection';
import ContactSection from '@/components/sections/ContactSection';
import CTASection from '@/components/sections/CTASection';
import { pricingData, pricingCategories, type PricingItem } from '@/data/pricing';
import { FaSearch, FaStar, FaTimes, FaSpinner, FaBox } from 'react-icons/fa';
import Image from 'next/image';

export default function PricingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<PricingItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const itemsPerPage = 9;
  const itemsRef = useRef<HTMLDivElement>(null);

  const filteredItems = pricingData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
    return matchesSearch && matchesCategory;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
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

  const scrollToItems = () => {
    const navbarHeight = 80;
    const itemsTop = itemsRef.current?.offsetTop || 0;
    const scrollPosition = itemsTop - navbarHeight - 30;

    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth' as ScrollBehavior
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage !== currentPage) {
      setIsScrolling(true);
      setCurrentPage(newPage);
      
      // Use requestAnimationFrame to ensure DOM is updated before scrolling
      requestAnimationFrame(() => {
        scrollToItems();
        setTimeout(() => {
          setIsScrolling(false);
        }, 500);
      });
    }
  };

  const toggleCategory = (category: string) => {
    setIsFiltering(true);
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );

    // Use requestAnimationFrame to ensure DOM is updated before scrolling
    requestAnimationFrame(scrollToItems);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFiltering(true);
    setSearchTerm(e.target.value);

    // Use requestAnimationFrame to ensure DOM is updated before scrolling
    requestAnimationFrame(scrollToItems);
  };

  const openItemModal = (item: PricingItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <main>
      <HeroSection
        title="Cjenik usluga"
        description="Pronađite savršenu uslugu za vaše potrebe. Naš cjenik je transparentan i jasno prikazuje sve naše usluge i njihove cijene."
        image="/images/services/cjenik-hero.webp"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Naše usluge
          </h2>
          <p className="text-xl text-gray-600">
            Visokokvalitetne usluge za njegu lica i tijela
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar with Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtriraj usluge</h3>
              
              {/* Search */}
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

              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategorije
                </label>
                <div className="space-y-2">
                  {pricingCategories.map((category) => (
                    <label key={category} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Pronađeno usluga: <span className="font-semibold">{filteredItems.length}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Items Grid */}
          <div className="flex-1" ref={itemsRef}>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-opacity duration-300 ${isScrolling || isFiltering ? 'opacity-25' : 'opacity-100'}`}>
              {currentItems.map((item) => (
                <div
                  key={item.id}
                  className={`
                    bg-gradient-to-b from-white to-slate-50 rounded-xl shadow-sm overflow-hidden
                    ${item.isPopular ? 'ring-1 ring-slate-200/50' : ''}
                    hover:shadow-xl transition-all duration-300
                    flex flex-col h-full cursor-pointer relative
                  `}
                  onClick={() => openItemModal(item)}
                >
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                      {item.isPopular && (
                        <span className="flex items-center text-amber-500">
                          <FaStar className="mr-1" />
                          Popularno
                        </span>
                      )}
                      {item.isPackage && (
                        <span className="flex items-center text-green-500">
                          <FaBox className="mr-1" />
                          Paket
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-grow">{item.description}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col h-12 justify-center">
                          <span className="text-xl font-bold text-slate-900">{item.price}</span>
                          {item.duration && (
                            <span className="text-sm text-slate-400">{item.duration}</span>
                          )}
                        </div>
                      </div>
                      <button 
                        className="px-4 py-2 bg-gradient-to-br from-slate-700 to-slate-800 text-white rounded-lg hover:from-slate-800 hover:to-slate-900 transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          openItemModal(item);
                        }}
                      >
                        Detalji
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center space-x-2">
                <button
                  onClick={() => {
                    handlePageChange(Math.max(currentPage - 1, 1));
                  }}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer hover:border-slate-300 hover:shadow-sm"
                >
                  Prethodna
                </button>
                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => {
                        handlePageChange(page);
                      }}
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
                  onClick={() => {
                    handlePageChange(Math.min(currentPage + 1, totalPages));
                  }}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer hover:border-slate-300 hover:shadow-sm"
                >
                  Sljedeća
                </button>
              </div>
            )}

            {currentItems.length === 0 && (
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Nema pronađenih usluga
                </h3>
                <p className="text-gray-600">
                  Pokušajte promijeniti kriterije pretraživanja
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Item Modal */}
        <Transition appear show={isModalOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50"
            onClose={() => setIsModalOpen(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 backdrop-blur-sm bg-white/30" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-gradient-to-b from-white to-slate-50 p-4 shadow-2xl transition-all border border-slate-200">
                    <div className="flex justify-between items-start mb-3 pb-3 border-b border-slate-100">
                      <Dialog.Title as="h2" className="text-xl font-bold text-slate-900">
                        {selectedItem?.title}
                      </Dialog.Title>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="text-slate-400 hover:text-slate-600 focus:outline-none transition-colors cursor-pointer p-1 hover:bg-slate-100 rounded-full"
                      >
                        <FaTimes size={20} />
                      </button>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-2/5">
                        <div className="bg-slate-50 rounded-xl p-6">
                          <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold text-slate-900">{selectedItem?.price}</span>
                              {selectedItem?.duration && (
                                <span className="text-sm text-slate-500">{selectedItem.duration}</span>
                              )}
                            </div>
                            {selectedItem?.isPackage && selectedItem?.packageDetails && (
                              <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg">
                                <div className="flex items-center gap-2">
                                  <FaBox className="w-4 h-4" />
                                  <span className="font-medium">Paket: {selectedItem.packageDetails}</span>
                                </div>
                              </div>
                            )}
                            {selectedItem?.isPopular && (
                              <div className="bg-amber-50 text-amber-700 px-4 py-2 rounded-lg">
                                <div className="flex items-center gap-2">
                                  <FaStar className="w-4 h-4" />
                                  <span className="font-medium">Popularna usluga</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-full md:w-3/5 space-y-3">
                        <div className="bg-slate-50 rounded-xl p-3">
                          <h3 className="text-sm font-semibold text-slate-900 mb-1">Opis</h3>
                          <p className="text-sm text-slate-600 leading-relaxed">{selectedItem?.description}</p>
                        </div>

                        {selectedItem?.features && (
                          <div className="bg-slate-50 rounded-xl p-3">
                            <h3 className="text-sm font-semibold text-slate-900 mb-1">Značajke</h3>
                            <ul className="list-disc list-inside text-sm text-slate-600 space-y-0.5">
                              {selectedItem.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
      <CTASection />
      <ContactSection />
    </main>
  );
} 