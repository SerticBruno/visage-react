'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { services } from '@/data/services';
import { FaChevronDown } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { BLOG_ENABLED } from '@/lib/config';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

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

  // Prevent body scroll when menu is open and handle page scroll to close menu
  useEffect(() => {
    if (isMenuOpen) {
      // Prevent body scroll when menu is open
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      
      // Close menu if user tries to scroll the page (touchmove on body/window)
      const handleTouchMove = (e: TouchEvent) => {
        // If touch is not within the menu, prevent scroll and close menu
        if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
          e.preventDefault();
          setIsMenuOpen(false);
          setIsServicesOpen(false);
        }
      };
      
      // Close menu on wheel scroll (mouse wheel) if not scrolling within menu
      const handleWheel = (e: WheelEvent) => {
        // If wheel event is not within the menu, close menu
        if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
          setIsMenuOpen(false);
          setIsServicesOpen(false);
        }
      };
      
      // Also close on window scroll (for programmatic scrolls or other cases)
      let scrollTimeout: NodeJS.Timeout;
      const handleScroll = () => {
        // Debounce scroll events
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          // Only close if scroll happened outside the menu
          // This handles cases where page scrolls programmatically
          if (mobileMenuRef.current) {
            const menuRect = mobileMenuRef.current.getBoundingClientRect();
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            // If we scrolled significantly and menu is still visible, close it
            if (scrollY > 0 && menuRect.top < window.innerHeight) {
              setIsMenuOpen(false);
              setIsServicesOpen(false);
            }
          }
        }, 100);
      };
      
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('wheel', handleWheel, { passive: true });
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        document.body.style.overflow = originalStyle;
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(scrollTimeout);
      };
    }
  }, [isMenuOpen]);

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
                width={48}
                height={48}
                className="h-12 w-auto relative transform group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <div className="flex flex-col items-center justify-center h-12 leading-none">
              <span className="text-black text-2xl font-bold leading-none transform group-hover:translate-x-0.5 transition-transform duration-300" style={{ fontFamily: 'Versailles' }}>VISAGE</span>
              <span className="text-black text-base md:text-lg font-medium leading-none transform group-hover:translate-x-0.5 transition-transform duration-300" style={{ fontFamily: 'Noto Serif Display' }}>studio</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <Link 
              href="/" 
              className={`text-gray-700 hover:text-gray-900 transition-all duration-300 relative group text-lg ${
                isActive('/') ? 'text-gray-900 font-bold' : 'font-medium'
              }`}
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
                  className={`text-gray-700 hover:text-gray-900 transition-all duration-300 relative group text-lg ${
                    isActive('/usluge') ? 'text-gray-900 font-bold' : 'font-medium'
                  }`}
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
              className={`text-gray-700 hover:text-gray-900 transition-all duration-300 relative group text-lg ${
                isActive('/katalog') ? 'text-gray-900 font-bold' : 'font-medium'
              }`}
              onClick={(e) => handleLinkClick(e, '/katalog')}
            >
              Katalog
            </Link>
            
            <Link 
              href="/cjenik" 
              className={`text-gray-700 hover:text-gray-900 transition-all duration-300 relative group text-lg ${
                isActive('/cjenik') ? 'text-gray-900 font-bold' : 'font-medium'
              }`}
              onClick={(e) => handleLinkClick(e, '/cjenik')}
            >
              Cjenik
            </Link>
            
            {BLOG_ENABLED && (
              <Link 
                href="/blog" 
                className={`text-gray-700 hover:text-gray-900 transition-all duration-300 relative group text-lg ${
                  isActive('/blog') ? 'text-gray-900 font-bold' : 'font-medium'
                }`}
                onClick={(e) => handleLinkClick(e, '/blog')}
              >
                Blog
              </Link>
            )}
            
            <Link 
              href="/o-nama" 
              className={`text-gray-700 hover:text-gray-900 transition-all duration-300 relative group text-lg ${
                isActive('/o-nama') ? 'text-gray-900 font-bold' : 'font-medium'
              }`}
              onClick={(e) => handleLinkClick(e, '/o-nama')}
            >
              O nama
            </Link>
            
            <Link 
              href="/kontakt" 
              className={`text-gray-700 hover:text-gray-900 transition-all duration-300 relative group text-lg ${
                isActive('/kontakt') ? 'text-gray-900 font-bold' : 'font-medium'
              }`}
              onClick={(e) => handleLinkClick(e, '/kontakt')}
            >
              Kontakt
            </Link>
          </nav>

          {/* Mobile Navigation Button */}
          <button
            ref={menuButtonRef}
            className="lg:hidden text-gray-700 hover:text-gray-900 transition-colors duration-300 p-2 rounded-lg hover:bg-gray-100"
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

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden fixed top-20 left-0 right-0 bg-white border-t border-gray-100 overflow-y-auto max-h-[calc(100vh-5rem)]"
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
                    className="px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-300"
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