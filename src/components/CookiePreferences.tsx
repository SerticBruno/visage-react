'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCookieConsent, setCookieConsent, clearCookieConsent } from '@/lib/cookieConsent';

interface CookiePreferencesProps {
  isOpen: boolean;
  onClose: () => void;
}

const CookiePreferences = ({ isOpen, onClose }: CookiePreferencesProps) => {
  const [currentConsent, setCurrentConsent] = useState<'accepted' | 'essential' | null>(null);
  const [selectedConsent, setSelectedConsent] = useState<'accepted' | 'essential'>('accepted');

  useEffect(() => {
    if (isOpen) {
      const consent = getCookieConsent();
      setCurrentConsent(consent.status);
      setSelectedConsent(consent.status || 'accepted');
    }
  }, [isOpen]);

  const handleSave = () => {
    setCookieConsent(selectedConsent);
    setCurrentConsent(selectedConsent);
    onClose();
  };

  const handleClear = () => {
    clearCookieConsent();
    setCurrentConsent(null);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        onKeyDown={handleKeyDown}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-labelledby="cookie-preferences-title"
          aria-describedby="cookie-preferences-description"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 id="cookie-preferences-title" className="text-2xl font-bold text-gray-900">
                Postavke kolačića
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Zatvori"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div id="cookie-preferences-description" className="mb-6">
              <p className="text-gray-600 mb-4">
                Možete promijeniti svoje postavke kolačića u bilo kojem trenutku. 
                Vaše postavke će biti spremljene i primijenjene na svim stranicama.
              </p>
              
              {currentConsent && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-800">
                    <strong>Trenutna postavka:</strong> {currentConsent === 'accepted' ? 'Prihvaćeni svi kolačići' : 'Samo nužni kolačići'}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="consent"
                    value="accepted"
                    checked={selectedConsent === 'accepted'}
                    onChange={(e) => setSelectedConsent(e.target.value as 'accepted')}
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-2">Prihvati sve kolačiće</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Omogućava nam da koristimo analitičke i marketing kolačiće za poboljšanje vašeg iskustva.
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Analitički kolačići za razumijevanje korištenja stranice</li>
                      <li>• Marketing kolačići za personalizirane oglase</li>
                      <li>• Funkcionalni kolačići za dodatne funkcionalnosti</li>
                    </ul>
                  </div>
                </label>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="consent"
                    value="essential"
                    checked={selectedConsent === 'essential'}
                    onChange={(e) => setSelectedConsent(e.target.value as 'essential')}
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-2">Samo nužni kolačići</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Omogućava samo kolačiće potrebne za osnovno funkcioniranje stranice.
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Kolačići za sesiju i sigurnost</li>
                      <li>• Kolačići za osnovne funkcionalnosti</li>
                      <li>• Bez analitičkih ili marketing kolačića</li>
                    </ul>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={handleClear}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Obriši sve postavke
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Spremi postavke
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookiePreferences; 