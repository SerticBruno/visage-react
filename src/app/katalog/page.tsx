'use client';

import { useState, useRef, useEffect, Fragment, Suspense } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import HeroSection from '@/components/sections/HeroSection';
import ContactSection from '@/components/sections/ContactSection';
import { products, productTypes, skinTypes, skinConcerns, brands, type Product } from '@/data/products';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaFire, FaGem, FaSun, FaMoon, FaCrown } from 'react-icons/fa6';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import ProductModal from '@/components/ui/ProductModal';
import NewsletterCTASection from '@/components/sections/NewsletterCTASection';

function KatalogContent() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>([]);
  const [selectedSkinConcerns, setSelectedSkinConcerns] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  
  // Accordion states for filter sections
  const [expandedSections, setExpandedSections] = useState({
    productTypes: true,
    skinTypes: false,
    skinConcerns: false,
    brands: false,
    badges: false
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Dynamic products per page based on screen size
  const productsPerPage = isMobile ? 6 : 9;
  const productsRef = useRef<HTMLDivElement>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.marka.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProductType = selectedProductTypes.length === 0 || 
      (product.productType && selectedProductTypes.includes(product.productType)) ||
      (product.category && selectedProductTypes.includes(product.category));
    const matchesSkinType = selectedSkinTypes.length === 0 || 
      (product.skinType && product.skinType.some(skinType => selectedSkinTypes.includes(skinType)));
    const matchesSkinConcern = selectedSkinConcerns.length === 0 || 
      (product.skinConcern && product.skinConcern.some(concern => selectedSkinConcerns.includes(concern)));
    const matchesBrands = selectedBrands.length === 0 || 
      selectedBrands.includes(product.marka);
    const matchesBadges = selectedBadges.length === 0 || 
      (selectedBadges.includes('popular') && product.isPopular) ||
      (selectedBadges.includes('bestseller') && product.isBestseller) ||
      (selectedBadges.includes('day') && product.isForDay) ||
      (selectedBadges.includes('night') && product.isForNight) ||
      (selectedBadges.includes('recommended') && product.isRecommended);
    return matchesSearch && matchesProductType && matchesSkinType && matchesSkinConcern && matchesBrands && matchesBadges;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  // Ensure current page is within bounds
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages || 1);
  if (validCurrentPage !== currentPage) {
    setCurrentPage(validCurrentPage);
  }
  
  const startIndex = (validCurrentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedProductTypes, selectedSkinTypes, selectedSkinConcerns, selectedBrands, selectedBadges]);

  // Handle URL parameter for auto-opening product modal
  useEffect(() => {
    const productParam = searchParams.get('product');
    if (productParam) {
      // Direct product ID (like '2' for Purifying Cleanser)
      const product = products.find(p => p.id === productParam);
      if (product) {
        setSelectedProduct(product);
        setIsModalOpen(true);
        // Scroll to products grid
        setTimeout(() => {
          scrollToProducts();
        }, 100);
        // Clean up the URL parameter
        const url = new URL(window.location.href);
        url.searchParams.delete('product');
        window.history.replaceState({}, '', url.toString());
      }
    }
  }, [searchParams]);

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

  const scrollToProducts = () => {
    const navbarHeight = 80;
    const productsTop = productsRef.current?.offsetTop || 0;
    const scrollPosition = productsTop - navbarHeight - 30;

    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth' as ScrollBehavior
    });
  };

  const handlePageChange = (newPage: number) => {
    console.log('handlePageChange called with:', newPage, 'currentPage:', currentPage, 'totalPages:', totalPages);
    
    // Validate that the new page is within bounds
    if (newPage >= 1 && newPage <= totalPages && newPage !== validCurrentPage) {
      console.log('Setting page to:', newPage);
      setIsTransitioning(true);
      setIsScrolling(true);
      
      // Fade out first
      setTimeout(() => {
        setCurrentPage(newPage);
        
        // Use requestAnimationFrame to ensure DOM is updated before scrolling
        requestAnimationFrame(() => {
          scrollToProducts();
          setTimeout(() => {
            setIsScrolling(false);
          }, 500);
        });
      }, 150); // Half of the transition duration
    } else {
      console.log('Page change rejected:', { newPage, validCurrentPage, totalPages });
    }
  };

  const toggleProductType = (productType: string) => {
    setIsTransitioning(true);
    setIsFiltering(true);
    
    // Fade out first
    setTimeout(() => {
      setSelectedProductTypes(prev => 
        prev.includes(productType)
          ? prev.filter(p => p !== productType)
          : [...prev, productType]
      );
      
      // Use requestAnimationFrame to ensure DOM is updated before scrolling
      requestAnimationFrame(scrollToProducts);
    }, 150); // Half of the transition duration
  };

  const toggleSkinType = (skinType: string) => {
    setIsTransitioning(true);
    setIsFiltering(true);
    
    // Fade out first
    setTimeout(() => {
      setSelectedSkinTypes(prev => 
        prev.includes(skinType)
          ? prev.filter(s => s !== skinType)
          : [...prev, skinType]
      );
      
      // Use requestAnimationFrame to ensure DOM is updated before scrolling
      requestAnimationFrame(scrollToProducts);
    }, 150); // Half of the transition duration
  };

  const toggleSkinConcern = (skinConcern: string) => {
    setIsTransitioning(true);
    setIsFiltering(true);
    
    // Fade out first
    setTimeout(() => {
      setSelectedSkinConcerns(prev => 
        prev.includes(skinConcern)
          ? prev.filter(c => c !== skinConcern)
          : [...prev, skinConcern]
      );
      
      // Use requestAnimationFrame to ensure DOM is updated before scrolling
      requestAnimationFrame(scrollToProducts);
    }, 150); // Half of the transition duration
  };

  const toggleBrand = (brand: string) => {
    setIsTransitioning(true);
    setIsFiltering(true);
    
    // Fade out first
    setTimeout(() => {
      setSelectedBrands(prev => 
        prev.includes(brand)
          ? prev.filter(b => b !== brand)
          : [...prev, brand]
      );
      
      // Use requestAnimationFrame to ensure DOM is updated before scrolling
      requestAnimationFrame(scrollToProducts);
    }, 150); // Half of the transition duration
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
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
      
      // Use requestAnimationFrame to ensure DOM is updated before scrolling
      requestAnimationFrame(scrollToProducts);
    }, 150); // Half of the transition duration
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsFiltering(true);
    
    // Use requestAnimationFrame to ensure DOM is updated before scrolling
    requestAnimationFrame(scrollToProducts);
  };

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleProductChange = (productId: string) => {
    const newProduct = products.find(p => p.id === productId);
    if (newProduct) {
      setSelectedProduct(newProduct);
    }
  };

  return (
    <>
      <HeroSection
        title="Katalog proizvoda"
        description="Otkrijte široku ponudu proizvoda za njegu lica i tijela"
        image="/images/pages/katalog/katalog-visage-estetski-studio-sisak.webp"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Naši proizvodi
          </h2>
          <p className="text-xl text-gray-600">
            Visokokvalitetni proizvodi za njegu lica i tijela
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar with Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 pr-3 ps-7 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto space-y-3 scrollbar-spaced" style={{ scrollbarGutter: 'stable' }}>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Filtriraj proizvode</h3>

              {/* Search */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Pretraži proizvode
                </label>
                <div className="relative">
                  <input
                    id="search"
                    type="text"
                    placeholder="Naziv, opis ili marka..."
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
                          requestAnimationFrame(scrollToProducts);
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

              {/* Product Types Section */}
              <div className="border-t border-gray-200 pt-3 pb-0 mb-0">
                <button
                  onClick={() => toggleSection('productTypes')}
                  className="flex items-center justify-between w-full text-left mb-2 focus:outline-none cursor-pointer"
                >
                  <label className="block text-sm font-medium text-gray-700 cursor-pointer">
                    Tip proizvoda
                  </label>
                  {expandedSections.productTypes ? (
                    <FaChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <FaChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    expandedSections.productTypes 
                      ? 'max-h-40 opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="relative">
                    <div className="space-y-2 max-h-36 overflow-y-auto scrollbar-spaced pr-2">
                      {productTypes.map((productType, index) => (
                        <label 
                          key={productType} 
                          className={`flex items-baseline space-x-2 cursor-pointer group ${
                            index === productTypes.length - 1 ? 'pb-2' : ''
                          }`}
                        >
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedProductTypes.includes(productType)}
                              onChange={() => toggleProductType(productType)}
                              className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                              style={{ transform: 'translateY(2px)' }}
                            />
                          </div>
                          <span className="text-sm text-gray-700 group-hover:text-gray-900">{productType}</span>
                        </label>
                      ))}
                    </div>
                    <div className="absolute bottom-0 left-0 right-2 h-4 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </div>

              {/* Skin Types Section */}
              <div className="border-t border-gray-200 pt-3 pb-0 mb-0">
                <button
                  onClick={() => toggleSection('skinTypes')}
                  className="flex items-center justify-between w-full text-left mb-2 focus:outline-none cursor-pointer"
                >
                  <label className="block text-sm font-medium text-gray-700 cursor-pointer">
                    Tip kože
                  </label>
                  {expandedSections.skinTypes ? (
                    <FaChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <FaChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    expandedSections.skinTypes 
                      ? 'max-h-32 opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="relative">
                    <div className="space-y-2 max-h-28 overflow-y-auto scrollbar-spaced pr-2">
                      {skinTypes.map((skinType, index) => (
                        <label 
                          key={skinType} 
                          className={`flex items-baseline space-x-2 cursor-pointer group ${
                            index === skinTypes.length - 1 ? 'pb-2' : ''
                          }`}
                        >
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedSkinTypes.includes(skinType)}
                              onChange={() => toggleSkinType(skinType)}
                              className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                              style={{ transform: 'translateY(2px)' }}
                            />
                          </div>
                          <span className="text-sm text-gray-700 group-hover:text-gray-900">{skinType}</span>
                        </label>
                      ))}
                    </div>
                    <div className="absolute bottom-0 left-0 right-2 h-4 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </div>

              {/* Skin Concerns Section */}
              <div className="border-t border-gray-200 pt-3 pb-0 mb-0">
                <button
                  onClick={() => toggleSection('skinConcerns')}
                  className="flex items-center justify-between w-full text-left mb-2 focus:outline-none cursor-pointer"
                >
                  <label className="block text-sm font-medium text-gray-700 cursor-pointer">
                    Problematika kože
                  </label>
                  {expandedSections.skinConcerns ? (
                    <FaChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <FaChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    expandedSections.skinConcerns 
                      ? 'max-h-48 opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="relative">
                    <div className="space-y-2 max-h-44 overflow-y-auto scrollbar-spaced pr-2">
                      {skinConcerns.map((skinConcern, index) => (
                        <label 
                          key={skinConcern} 
                          className={`flex items-baseline space-x-2 cursor-pointer group ${
                            index === skinConcerns.length - 1 ? 'pb-2' : ''
                          }`}
                        >
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedSkinConcerns.includes(skinConcern)}
                              onChange={() => toggleSkinConcern(skinConcern)}
                              className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                              style={{ transform: 'translateY(2px)' }}
                            />
                          </div>
                          <span className="text-sm text-gray-700 group-hover:text-gray-900">{skinConcern}</span>
                        </label>
                      ))}
                    </div>
                    <div className="absolute bottom-0 left-0 right-2 h-4 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </div>

              {/* Brands Section */}
              <div className="border-t border-gray-200 pt-3 pb-0 mb-0">
                <button
                  onClick={() => toggleSection('brands')}
                  className="flex items-center justify-between w-full text-left mb-2 focus:outline-none cursor-pointer"
                >
                  <label className="block text-sm font-medium text-gray-700 cursor-pointer">
                    Marke
                  </label>
                  {expandedSections.brands ? (
                    <FaChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <FaChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    expandedSections.brands 
                      ? 'max-h-32 opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="relative">
                    <div className="space-y-2 max-h-28 overflow-y-auto scrollbar-spaced pr-2">
                      {brands.map((brand, index) => (
                        <label 
                          key={brand} 
                          className={`flex items-baseline space-x-2 cursor-pointer group ${
                            index === brands.length - 1 ? 'pb-2' : ''
                          }`}
                        >
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedBrands.includes(brand)}
                              onChange={() => toggleBrand(brand)}
                              className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                              style={{ transform: 'translateY(2px)' }}
                            />
                          </div>
                          <span className="text-sm text-gray-700 group-hover:text-gray-900">{brand}</span>
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
                        checked={selectedBadges.includes('bestseller')}
                        onChange={() => toggleBadge('bestseller')}
                        className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700 flex items-center gap-1">
                        <FaGem className="w-3 h-3 text-gray-600" />
                        Bestseller
                      </span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBadges.includes('day')}
                        onChange={() => toggleBadge('day')}
                        className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700 flex items-center gap-1">
                        <FaSun className="w-3 h-3 text-gray-600" />
                        Za dan
                      </span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBadges.includes('night')}
                        onChange={() => toggleBadge('night')}
                        className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700 flex items-center gap-1">
                        <FaMoon className="w-3 h-3 text-gray-600" />
                        Za noć
                      </span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer pb-2">
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
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </div>

              {/* Clear Filters Button */}
              {(searchTerm || selectedProductTypes.length > 0 || selectedSkinTypes.length > 0 || selectedSkinConcerns.length > 0 || selectedBrands.length > 0 || selectedBadges.length > 0) && (
                <div className="border-t border-gray-200 pt-4">
                  <button
                    onClick={() => {
                      setIsTransitioning(true);
                      setIsFiltering(true);
                      
                      // Fade out first, then clear all filters
                      setTimeout(() => {
                        setSearchTerm('');
                        setSelectedProductTypes([]);
                        setSelectedSkinTypes([]);
                        setSelectedSkinConcerns([]);
                        setSelectedBrands([]);
                        setSelectedBadges([]);
                        requestAnimationFrame(scrollToProducts);
                      }, 150); // Half of the transition duration
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
                  Pronađeno proizvoda: <span className="font-semibold">{filteredProducts.length}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1" ref={productsRef}>
            {/* Products Grid */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-opacity duration-300 ${isScrolling || isFiltering || isTransitioning ? 'opacity-25' : 'opacity-100'}`}>
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className={`
                    group bg-gradient-to-b from-white to-slate-50 rounded-xl shadow-sm overflow-hidden
                    ${product.isPopular ? 'ring-1 ring-slate-200/50' : ''}
                    hover:shadow-2xl hover:bg-gradient-to-b hover:from-white hover:to-slate-100
                    transition-all duration-300 ease-out
                    flex flex-col h-full cursor-pointer relative border border-transparent hover:border-slate-200
                    transform-gpu will-change-transform
                  `}
                  style={{
                    transform: 'translateZ(0)', // Force hardware acceleration
                  }}
                  onClick={() => openProductModal(product)}
                >
                  <div className="relative h-48 bg-slate-50 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className={`object-contain p-2 transition-transform duration-300 transform-gpu ${product.imageNeedsResize ? 'scale-75' : 'group-hover:scale-105'}`}
                      loading="lazy"
                      style={{
                        transform: 'translateZ(0)', // Force hardware acceleration
                      }}
                    />
                    {/* Product Badges */}
                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                      {product.isPopular && (
                        <span className="bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                          <FaFire className="w-3 h-3" />
                          Popularno
                        </span>
                      )}
                      {product.isBestseller && (
                        <span className="bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                          <FaGem className="w-3 h-3" />
                          Bestseller
                        </span>
                      )}
                      {product.isForDay && (
                        <span className="bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                          <FaSun className="w-3 h-3" />
                          Za dan
                        </span>
                      )}
                      {product.isForNight && (
                        <span className="bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                          <FaMoon className="w-3 h-3" />
                          Za noć
                        </span>
                      )}
                      {product.isRecommended && (
                        <span className="bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                          <FaCrown className="w-3 h-3" />
                          Preporuka
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900">{product.title}</h3>
                      </div>
                    </div>
                    <div className="text-slate-600 text-sm mb-4 flex-grow">
                      <p className="overflow-hidden" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        textOverflow: 'ellipsis'
                      }}>
                        {product.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col h-12 justify-center">
                          {product.isOnSale && product.oldPrice ? (
                            <>
                              <span className="text-sm text-slate-400 line-through">{product.oldPrice}</span>
                              <span className="text-xl font-bold text-rose-500">{product.price}</span>
                            </>
                          ) : (
                            <span className="text-xl font-bold text-slate-900">{product.price}</span>
                          )}
                        </div>
                        {product.isOnSale && product.oldPrice && (
                          <span className="bg-rose-500 text-white text-xs font-bold w-10 h-10 rounded-full shadow-lg transform -rotate-12 flex items-center justify-center">
                            -{Math.round((1 - parseFloat(product.price) / parseFloat(product.oldPrice)) * 100)}%
                          </span>
                        )}
                      </div>
                      <button 
                        className="px-4 py-2 bg-slate-700 text-white rounded-lg text-sm font-medium shadow-sm cursor-pointer
                                   hover:bg-slate-800 hover:shadow-md transition-all duration-200 ease-out
                                   group-hover:bg-slate-800 group-hover:shadow-lg transform-gpu"
                        onClick={(e) => {
                          e.stopPropagation();
                          openProductModal(product);
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
                    handlePageChange(Math.max(validCurrentPage - 1, 1));
                  }}
                  disabled={validCurrentPage === 1}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer hover:border-slate-300 hover:shadow-sm"
                  aria-label="Prethodna stranica"
                >
                  <span className="hidden sm:inline">Prethodna</span>
                  <FaChevronLeft className="sm:hidden w-4 h-4" />
                </button>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => {
                        handlePageChange(page);
                      }}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 text-sm sm:text-base ${
                        validCurrentPage === page
                          ? 'bg-slate-800 text-white shadow-md'
                          : 'text-slate-600 hover:bg-slate-50 hover:border hover:border-slate-200 hover:shadow-sm'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    handlePageChange(Math.min(validCurrentPage + 1, totalPages));
                  }}
                  disabled={validCurrentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer hover:border-slate-300 hover:shadow-sm"
                  aria-label="Sljedeća stranica"
                >
                  <span className="hidden sm:inline">Sljedeća</span>
                  <FaChevronRight className="sm:hidden w-4 h-4" />
                </button>
              </div>
            )}

            {currentProducts.length === 0 && (
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Nema pronađenih proizvoda
                </h3>
                <p className="text-gray-600">
                  Pokušajte promijeniti kriterije pretraživanja
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Product Modal */}
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={selectedProduct}
          onProductChange={handleProductChange}
        />
      </div>
      <NewsletterCTASection></NewsletterCTASection>
      <ContactSection hasTopPadding={true} />
    </>
  );
}

export default function KatalogPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <KatalogContent />
    </Suspense>
  );
} 