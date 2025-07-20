'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FaFacebook, FaWhatsapp, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';
import { PaymentIcon } from 'react-svg-credit-card-payment-icons';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Uspješno ste se prijavili na newsletter!');
        setEmail('');
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || 'Došlo je do greške. Molimo pokušajte ponovno.');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Došlo je do greške. Molimo pokušajte ponovno.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="text-white" style={{ background: 'linear-gradient(to bottom, rgb(17, 24, 39), rgb(31, 41, 55))' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center gap-3 group">
                <div className="relative">
                  <Image
                    src="/images/LogoV-white.webp"
                    alt="VISAGE Studio"
                    width={48}
                    height={48}
                    className="h-12 w-auto relative transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col items-center justify-center h-12 leading-none">
                  <span className="text-2xl font-bold leading-none transform group-hover:translate-x-0.5 transition-transform duration-300" style={{ fontFamily: 'Versailles' }}>VISAGE</span>
                  <span className="text-base md:text-lg text-white font-medium leading-none transform group-hover:translate-x-0.5 transition-transform duration-300" style={{ fontFamily: 'Noto Serif Display' }}>studio</span>
                </div>
              </div>
            </Link>
            <p className="text-gray-300 mb-6">
              Estetski studio specijaliziran za nekirurške estetske tretmane lica koji su prilagođeni vašim potrebama.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/visagestudio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://wa.me/385911105020"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={24} />
              </a>
              <a
                href="https://facebook.com/visagestudio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">
              Brzi linkovi
            </h3>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/usluge" 
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-white transition-colors"></span>
                  Usluge
                </Link>
              </li>
              <li>
                <Link 
                  href="/katalog" 
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-white transition-colors"></span>
                  Katalog
                </Link>
              </li>
              <li>
                <Link 
                  href="/cjenik" 
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-white transition-colors"></span>
                  Cjenik
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-white transition-colors"></span>
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/o-nama" 
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-white transition-colors"></span>
                  O nama
                </Link>
              </li>
              <li>
                <Link 
                  href="/kontakt" 
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-white transition-colors"></span>
                  Kontakt
                </Link>
              </li>
              <li>
                <Link 
                  href="/privatnost" 
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-white transition-colors"></span>
                  Politika privatnosti
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">
              Kontakt
            </h3>
            <div className="space-y-4">
              <a 
                href="mailto:contact@visagestudio.hr"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
              >
                <div className="bg-gray-800/50 p-2 rounded-lg group-hover:bg-gray-700/50 transition-colors">
                  <FaEnvelope className="text-slate-400 group-hover:text-slate-300" />
                </div>
                <span>contact@visagestudio.hr</span>
              </a>
              <a 
                href="https://wa.me/385911105020"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
              >
                <div className="bg-gray-800/50 p-2 rounded-lg group-hover:bg-gray-700/50 transition-colors">
                  <FaWhatsapp className="text-slate-400 group-hover:text-slate-300" />
                </div>
                <span>091 110 50 20</span>
              </a>
              <a 
                href="tel:+385911105020"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
              >
                <div className="bg-gray-800/50 p-2 rounded-lg group-hover:bg-gray-700/50 transition-colors">
                  <FaPhone className="text-slate-400 group-hover:text-slate-300" />
                </div>
                <span>091 110 50 20</span>
              </a>
              <div className="space-y-1">
                <p className="text-gray-300">Ulica Stjepana i Antuna Radića 49,</p>
                <p className="text-gray-300">44 000, Sisak</p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">
              Newsletter
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Budite u toku s najnovijim ponudama i akcijama
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Vaša email adresa"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-600 border border-gray-700 transition-all duration-300 hover:border-gray-600"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 text-gray-800 rounded-lg transition-all duration-300 font-medium transform hover:-translate-y-0.5 hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group hover:bg-gray-100"
                  style={{ 
                    background: 'rgb(247, 247, 247)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Slanje...</span>
                  ) : (
                    <>
                      Prijavi se
                      <FaEnvelope className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
              {submitStatus === 'success' && (
                <p className="text-green-400 text-sm">{submitMessage}</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400 text-sm">{submitMessage}</p>
              )}
            </form>
          </div>
        </div>

        {/* Copyright & Payment Methods */}
        <div className="mt-16 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-400">© {new Date().getFullYear()} VISAGE Studio. Sva prava pridržana.</p>
            </div>
            <div className="flex items-center justify-center md:justify-end gap-3">
              <span className="text-sm text-gray-500">Načini plaćanja:</span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">Gotovina, Kartice</span>
                <div className="flex gap-3">
                  <PaymentIcon type="Visa" format="flatRounded" width={24} className="filter grayscale opacity-60 rounded-md" />
                  <PaymentIcon type="Mastercard" format="flatRounded" width={24} className="filter grayscale opacity-60 rounded-md" />
                  <PaymentIcon type="Diners" format="flatRounded" width={24} className="filter grayscale opacity-60 rounded-md" />
                  <PaymentIcon type="Maestro" format="flatRounded" width={24} className="filter grayscale opacity-60 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 