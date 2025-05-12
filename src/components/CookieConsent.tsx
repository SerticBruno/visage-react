'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type GtagCommand = 'config' | 'event' | 'consent' | 'set';
type GtagParams = {
  [key: string]: string | number | boolean | object;
};

declare global {
  interface Window {
    gtag: (command: GtagCommand, ...args: (string | GtagParams)[]) => void;
  }
}

const SCROLL_THRESHOLD = 100; // pixels to scroll before auto-accepting

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        acceptAll();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    
    // Update GTM consent state
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'consent_update',
      'consent_state': {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'functionality_storage': 'granted',
        'personalization_storage': 'granted',
        'security_storage': 'granted'
      }
    });
  };

  const acceptEssential = () => {
    localStorage.setItem('cookie-consent', 'essential');
    setIsVisible(false);
    
    // Update GTM consent state
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'consent_update',
      'consent_state': {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'functionality_storage': 'granted',
        'personalization_storage': 'denied',
        'security_storage': 'granted'
      }
    });
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            opacity: { duration: 0.3 }
          }}
          className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-50"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-700">
              <p className="text-sm md:text-base">
                Koristimo kolačiće za poboljšanje vašeg iskustva na našoj web stranici. 
                Možete prihvatiti sve kolačiće ili samo nužne.
              </p>
            </div>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={acceptEssential}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-300 cursor-pointer"
              >
                Samo nužni
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={acceptAll}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-all duration-300 cursor-pointer"
              >
                Prihvati sve
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent; 