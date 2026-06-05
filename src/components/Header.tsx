'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useLockBackgroundScroll } from '@/hooks/useLockBackgroundScroll';
import { services } from '@/data/services';
import { FaChevronDown, FaShoppingCart } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { BLOG_ENABLED } from '@/lib/config';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();

  // Cart bump animation state
  const [cartBumped, setCartBumped] = useState(false);
  const [plusKey, setPlusKey] = useState(0);
  const [showPlus, setShowPlus] = useState(false);
  const prevTotalRef = useRef(0);

  useEffect(() => {
    if (totalItems > prevTotalRef.current) {
      setCartBumped(true);
      setShowPlus(true);
      setPlusKey((k) => k + 1);
      setTimeout(() => setCartBumped(false), 600);
      setTimeout(() => setShowPlus(false), 900);
    }
    prevTotalRef.current = totalItems;
  }, [totalItems]);

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && 
          mobileMenuRef.current && 
          !mobileMenuRef.current.contains(event.target as Node) &&
          menuButtonRef.current &&
          !menuButtonRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setIsServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  }, []);

  useLockBackgroundScroll(isMenuOpen, {
    scrollContainerRef: mobileMenuRef,
    onBlockedScroll: closeMenu,
  });

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const toggleMenu = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    
    // If opening menu and on a service subpage, auto-open services dropdown
    if (newMenuState && currentPath.startsWith('/usluge/')) {
      setIsServicesOpen(true);
    } else if (!newMenuState) {
      setIsServicesOpen(false);
    }
  };

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const closeAllMenus = () => {
    // Clear any existing timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

  const handleServicesMouseEnter = () => {
    // Clear any existing timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsServicesOpen(true);
  };

  const handleServicesMouseLeave = () => {
    // Set a timeout to close the menu after 500ms delay
    closeTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 100);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  const desktopNavLinkClass = (path: string) =>
    `text-gray-700 hover:text-gray-900 transition-colors duration-300 relative text-lg after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-gray-900 after:transition-transform after:duration-300 hover:after:scale-x-100 ${
      isActive(path) ? 'text-gray-900 font-bold after:scale-x-100' : 'font-medium'
    }`;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (isActive(path) && path !== '/usluge' && path !== '/blog') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    closeAllMenus();
  };

  return (
    <header className="fixed w-full bg-[linear-gradient(to_right,#f9fafb,#f9fafb,#f3f4f6)] shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link 
            href="/" 
            className="group flex items-center gap-3 text-gray-800 hover:text-gray-900 transition-all duration-300"
            onClick={(e) => handleLinkClick(e, '/')}
          >
            <div className="relative flex items-center">
              <Image
                src="/images/LogoV.png"
                alt="VISAGE Studio"
                width={40}
                height={40}
                className="h-10 w-auto relative transform group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <span
              className="inline-flex items-baseline gap-2 text-black text-2xl font-bold leading-none whitespace-nowrap transform group-hover:translate-x-0.5 transition-transform duration-300 uppercase"
              style={{ fontFamily: 'Versailles' }}
            >
              <span>VISAGE</span>
              <span>STUDIO</span>
            </span>
          </Link>

          {/* Nav + cart grouped on the right */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link 
              href="/" 
              className={desktopNavLinkClass('/')}
              onClick={(e) => handleLinkClick(e, '/')}
            >
              Početna
            </Link>
            
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <div className="flex items-center gap-1">
                <Link 
                  href="/usluge" 
                  className={desktopNavLinkClass('/usluge')}
                  onClick={(e) => handleLinkClick(e, '/usluge')}
                >
                  Usluge
                </Link>
                <button
                  type="button"
                  onClick={toggleServices}
                  className="text-gray-700 hover:text-gray-900 transition-all duration-300 cursor-pointer"
                  aria-expanded={isServicesOpen}
                  aria-controls="services-menu"
                >
                  <FaChevronDown 
                    className={`w-3 h-3 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} 
                    aria-hidden="true"
                  />
                </button>
              </div>
              
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div 
                    id="services-menu"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-3 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100"
                  >
                    {Object.entries(services).map(([pageName, service]) => (
                      <Link
                        key={pageName}
                        href={`/usluge/${pageName}`}
                        className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-black transition-all duration-300 ${
                          isActive(`/usluge/${pageName}`) ? 'text-gray-900 font-bold bg-gray-200' : ''
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLinkClick(e, `/usluge/${pageName}`);
                        }}
                      >
                        {service.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <Link 
              href="/katalog" 
              className={desktopNavLinkClass('/katalog')}
              onClick={(e) => handleLinkClick(e, '/katalog')}
            >
              Katalog
            </Link>
            
            <Link 
              href="/cjenik" 
              className={desktopNavLinkClass('/cjenik')}
              onClick={(e) => handleLinkClick(e, '/cjenik')}
            >
              Cjenik
            </Link>
            
            {BLOG_ENABLED && (
              <Link 
                href="/blog" 
                className={desktopNavLinkClass('/blog')}
                onClick={(e) => handleLinkClick(e, '/blog')}
              >
                Blog
              </Link>
            )}
            
            <Link 
              href="/o-nama" 
              className={desktopNavLinkClass('/o-nama')}
              onClick={(e) => handleLinkClick(e, '/o-nama')}
            >
              O nama
            </Link>
            
            <Link 
              href="/kontakt" 
              className={desktopNavLinkClass('/kontakt')}
              onClick={(e) => handleLinkClick(e, '/kontakt')}
            >
              Kontakt
            </Link>
            
          </nav>

          <button
            type="button"
            onClick={openCart}
            aria-label="Košarica"
            className="group relative flex items-center justify-center p-2.5 rounded-xl text-gray-700 transition-all duration-300 cursor-pointer hover:text-gray-900 hover:bg-white hover:shadow-md hover:ring-1 hover:ring-gray-200/90 active:scale-95"
          >
            {/* Floating +1 */}
            <AnimatePresence>
              {showPlus && (
                <motion.span
                  key={plusKey}
                  initial={{ opacity: 1, y: 0, scale: 1 }}
                  animate={{ opacity: 0, y: -28, scale: 1.1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.75, ease: 'easeOut' }}
                  className="absolute -top-1 left-1/2 -translate-x-1/2 text-xs font-bold text-green-600 pointer-events-none select-none"
                  style={{ zIndex: 100 }}
                >
                  +1
                </motion.span>
              )}
            </AnimatePresence>

            {/* Cart icon with bump */}
            <motion.div
              className="transition-transform duration-300 group-hover:scale-110"
              animate={cartBumped ? { rotate: [0, -15, 15, -10, 10, 0], scale: [1, 1.2, 1.15, 1.1, 1] } : {}}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <FaShoppingCart className="h-5 w-5" />
            </motion.div>

            {/* Badge */}
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  className="absolute -top-0.5 -right-0.5 bg-gray-900 text-white text-xs font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            ref={menuButtonRef}
            type="button"
            className="lg:hidden text-gray-700 hover:text-gray-900 transition-all duration-300 p-2.5 rounded-xl hover:bg-white hover:shadow-md hover:ring-1 hover:ring-gray-200/90 cursor-pointer"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden fixed top-20 left-0 right-0 bg-white border-t border-gray-100 overflow-y-auto overscroll-contain max-h-[calc(100vh-5rem)]"
          >
            <motion.div 
              className="px-2 pt-2 pb-3 space-y-1"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/"
                className={`block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-300 text-lg ${
                  isActive('/') ? 'text-gray-900 font-bold' : 'font-medium'
                }`}
                onClick={(e) => handleLinkClick(e, '/')}
              >
                Početna
              </Link>
              
              <div className="relative">
                <div className="flex items-center justify-between">
                  <Link
                    href="/usluge"
                    className={`flex-grow px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-300 text-lg ${
                      isActive('/usluge') ? 'text-gray-900 font-bold' : 'font-medium'
                    }`}
                    onClick={(e) => handleLinkClick(e, '/usluge')}
                  >
                    Usluge
                  </Link>
                  <button
                    type="button"
                    onClick={toggleServices}
                    className="px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-300 cursor-pointer"
                    aria-expanded={isServicesOpen}
                    aria-label="Toggle services submenu"
                  >
                    <motion.div
                      animate={{ rotate: isServicesOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaChevronDown className="w-3 h-3" aria-hidden="true" />
                    </motion.div>
                  </button>
                </div>
                
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 space-y-1">
                        {Object.entries(services).map(([pageName, service]) => (
                          <motion.div
                            key={pageName}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Link
                              href={`/usluge/${pageName}`}
                              className={`block px-3 py-2 text-gray-700 hover:text-black hover:bg-gray-200 rounded-md transition-all duration-300 text-base ${
                                isActive(`/usluge/${pageName}`) ? 'text-gray-900 font-bold bg-gray-200' : ''
                              }`}
                              onClick={(e) => handleLinkClick(e, `/usluge/${pageName}`)}
                            >
                              {service.title}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/katalog"
                className={`block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-300 text-lg ${
                  isActive('/katalog') ? 'text-gray-900 font-bold' : 'font-medium'
                }`}
                onClick={(e) => handleLinkClick(e, '/katalog')}
              >
                Katalog
              </Link>
              
              <Link
                href="/cjenik"
                className={`block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-300 text-lg ${
                  isActive('/cjenik') ? 'text-gray-900 font-bold' : 'font-medium'
                }`}
                onClick={(e) => handleLinkClick(e, '/cjenik')}
              >
                Cjenik
              </Link>
              
              {BLOG_ENABLED && (
                <Link
                  href="/blog"
                  className={`block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-300 text-lg ${
                    isActive('/blog') ? 'text-gray-900 font-bold' : 'font-medium'
                  }`}
                  onClick={(e) => handleLinkClick(e, '/blog')}
                >
                  Blog
                </Link>
              )}
              
              <Link
                href="/o-nama"
                className={`block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-300 text-lg ${
                  isActive('/o-nama') ? 'text-gray-900 font-bold' : 'font-medium'
                }`}
                onClick={(e) => handleLinkClick(e, '/o-nama')}
              >
                O nama
              </Link>
              
              <Link
                href="/kontakt"
                className={`block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-300 text-lg ${
                  isActive('/kontakt') ? 'text-gray-900 font-bold' : 'font-medium'
                }`}
                onClick={(e) => handleLinkClick(e, '/kontakt')}
              >
                Kontakt
              </Link>
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 