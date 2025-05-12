'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { services } from '@/data/services';
import { FaChevronDown } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 200);
  };

  const handleMobileLinkClick = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="fixed w-full bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link 
            href="/" 
            className="group flex items-center gap-3 text-gray-800 hover:text-gray-900 transition-all duration-300"
          >
            <div className="relative">
              <Image
                src="/images/LogoV.webp"
                alt="VISAGE Studio"
                width={40}
                height={40}
                className="h-10 w-auto relative transform group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold leading-none transform group-hover:translate-x-0.5 transition-transform duration-300">VISAGE</span>
              <span className="text-sm text-gray-600 font-medium transform group-hover:translate-x-0.5 transition-transform duration-300">Studio</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`text-gray-700 hover:text-gray-900 transition-all duration-300 relative group text-lg ${
                isActive('/') ? 'text-gray-900 font-bold' : 'font-medium'
              }`}
            >
              Početna
            </Link>
            
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              ref={dropdownRef}
            >
              <Link
                href="/usluge"
                className={`text-gray-700 hover:text-gray-900 transition-all duration-300 flex items-center gap-1 cursor-pointer relative group text-lg ${
                  isActive('/usluge') ? 'text-gray-900 font-bold' : 'font-medium'
                }`}
                onClick={() => setIsServicesOpen(false)}
              >
                Usluge
                <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </Link>
              
              {isServicesOpen && (
                <div 
                  className="absolute left-0 mt-3 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100 transform transition-all duration-300 origin-top"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {Object.entries(services).map(([pageName, service]) => (
                    <Link
                      key={pageName}
                      href={`/usluge/${pageName}`}
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300 transform hover:translate-x-1 ${
                        isActive(`/usluge/${pageName}`) ? 'text-gray-900 font-bold bg-gray-50' : ''
                      }`}
                      onClick={() => setIsServicesOpen(false)}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link 
              href="/katalog" 
              className={`text-gray-700 hover:text-gray-900 transition-all duration-300 relative group text-lg ${
                isActive('/katalog') ? 'text-gray-900 font-bold' : 'font-medium'
              }`}
            >
              Katalog
            </Link>
            
            <Link 
              href="/cjenik" 
              className={`text-gray-700 hover:text-gray-900 transition-all duration-300 relative group text-lg ${
                isActive('/cjenik') ? 'text-gray-900 font-bold' : 'font-medium'
              }`}
            >
              Cjenik
            </Link>
            
            <Link 
              href="/blog" 
              className={`text-gray-700 hover:text-gray-900 transition-all duration-300 relative group text-lg ${
                isActive('/blog') ? 'text-gray-900 font-bold' : 'font-medium'
              }`}
            >
              Blog
            </Link>
            
            <Link 
              href="/o-nama" 
              className={`text-gray-700 hover:text-gray-900 transition-all duration-300 relative group text-lg ${
                isActive('/o-nama') ? 'text-gray-900 font-bold' : 'font-medium'
              }`}
            >
              O nama
            </Link>
            
            <Link 
              href="/kontakt" 
              className={`text-gray-700 hover:text-gray-900 transition-all duration-300 relative group text-lg ${
                isActive('/kontakt') ? 'text-gray-900 font-bold' : 'font-medium'
              }`}
            >
              Kontakt
            </Link>
          </nav>

          {/* Mobile Navigation Button */}
          <button
            className="md:hidden text-gray-700 hover:text-gray-900 transition-colors duration-300 p-2 rounded-lg hover:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(!isMenuOpen);
            }}
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
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed top-20 left-0 right-0 bg-white border-t border-gray-100 overflow-hidden"
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
                className={`block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-300 transform hover:translate-x-1 text-lg ${
                  isActive('/') ? 'text-gray-900 font-bold' : 'font-medium'
                }`}
                onClick={handleMobileLinkClick}
              >
                Početna
              </Link>
              
              <div className="relative">
                <div className="flex items-center">
                  <Link
                    href="/usluge"
                    className={`flex-grow px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-300 text-lg ${
                      isActive('/usluge') ? 'text-gray-900 font-bold' : 'font-medium'
                    }`}
                    onClick={handleMobileLinkClick}
                  >
                    Usluge
                  </Link>
                  <button
                    className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-300"
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                  >
                    <motion.div
                      animate={{ rotate: isServicesOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaChevronDown className="w-3 h-3" />
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
                              className={`block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-300 transform hover:translate-x-1 text-base ${
                                isActive(`/usluge/${pageName}`) ? 'text-gray-900 font-bold' : ''
                              }`}
                              onClick={handleMobileLinkClick}
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

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href="/katalog"
                  className={`block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-300 transform hover:translate-x-1 text-lg ${
                    isActive('/katalog') ? 'text-gray-900 font-bold' : 'font-medium'
                  }`}
                  onClick={handleMobileLinkClick}
                >
                  Katalog
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <Link
                  href="/cjenik"
                  className={`block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-300 transform hover:translate-x-1 text-lg ${
                    isActive('/cjenik') ? 'text-gray-900 font-bold' : 'font-medium'
                  }`}
                  onClick={handleMobileLinkClick}
                >
                  Cjenik
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.2 }}
              >
                <Link
                  href="/blog"
                  className={`block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-300 transform hover:translate-x-1 text-lg ${
                    isActive('/blog') ? 'text-gray-900 font-bold' : 'font-medium'
                  }`}
                  onClick={handleMobileLinkClick}
                >
                  Blog
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.3 }}
              >
                <Link
                  href="/o-nama"
                  className={`block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-300 transform hover:translate-x-1 text-lg ${
                    isActive('/o-nama') ? 'text-gray-900 font-bold' : 'font-medium'
                  }`}
                  onClick={handleMobileLinkClick}
                >
                  O nama
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.4 }}
              >
                <Link
                  href="/kontakt"
                  className={`block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-300 transform hover:translate-x-1 text-lg ${
                    isActive('/kontakt') ? 'text-gray-900 font-bold' : 'font-medium'
                  }`}
                  onClick={handleMobileLinkClick}
                >
                  Kontakt
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 