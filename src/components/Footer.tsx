'use client'
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_ENABLED } from '@/lib/config';
import { legalPaths } from '@/data/legal';
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center gap-3 group">
                <div className="relative">
                  <Image
                    src="/images/LogoV-white.webp"
                    alt="VISAGE Studio"
                    width={40}
                    height={40}
                    className="h-10 w-auto relative transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span
                  className="inline-flex items-baseline gap-2 text-2xl font-bold leading-none whitespace-nowrap transform group-hover:translate-x-0.5 transition-transform duration-300 uppercase"
                  style={{ fontFamily: 'Versailles' }}
                >
                  <span>VISAGE</span>
                  <span>STUDIO</span>
                </span>
              </div>
            </Link>
            <p className="text-gray-300 mb-6">
              Estetski studio specijaliziran za nekirurške estetske tretmane lica koji su prilagođeni vašim potrebama.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/visage.estheticstudio"
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
                href="https://www.facebook.com/profile.php?id=61555201097471"
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
            <h3 className="text-lg font-bold mb-4 text-white">
              Brzi linkovi
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link 
                  href="/usluge" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Usluge
                </Link>
              </li>
              <li>
                <Link 
                  href="/katalog" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Katalog
                </Link>
              </li>
              <li>
                <Link 
                  href="/cjenik" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Cjenik
                </Link>
              </li>
              {BLOG_ENABLED && (
                <li>
                  <Link 
                    href="/blog" 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              )}
              <li>
                <Link 
                  href="/o-nama" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  O nama
                </Link>
              </li>
              <li>
                <Link 
                  href="/kontakt" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">
              Pravne informacije
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href={legalPaths.seller}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Podaci o prodavatelju
                </Link>
              </li>
              <li>
                <Link
                  href={legalPaths.termsOfSale}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Uvjeti kupnje
                </Link>
              </li>
              <li>
                <Link
                  href={legalPaths.generalTerms}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Opći uvjeti poslovanja
                </Link>
              </li>
              <li>
                <Link
                  href={legalPaths.privacy}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Politika privatnosti
                </Link>
              </li>
              <li>
                <Link
                  href={legalPaths.cookies}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Politika kolačića
                </Link>
              </li>
              <li>
                <Link
                  href={legalPaths.delivery}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Uvjeti dostave
                </Link>
              </li>
              <li>
                <Link
                  href={legalPaths.returns}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Povrat i reklamacije
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Kontakt</h3>
            <div className="space-y-2.5 text-sm">
              <a
                href="mailto:info@visagestudio.hr"
                className="flex items-center gap-2.5 text-gray-300 hover:text-white transition-colors"
              >
                <FaEnvelope className="text-slate-400 shrink-0" size={15} aria-hidden />
                <span className="break-all">info@visagestudio.hr</span>
              </a>
              <a
                href="https://wa.me/385911105020"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-gray-300 hover:text-white transition-colors"
              >
                <FaWhatsapp className="text-slate-400 shrink-0" size={15} aria-hidden />
                <span>091 110 50 20</span>
              </a>
              <a
                href="tel:+385911105020"
                className="flex items-center gap-2.5 text-gray-300 hover:text-white transition-colors"
              >
                <FaPhone className="text-slate-400 shrink-0" size={15} aria-hidden />
                <span>091 110 50 20</span>
              </a>
              <p className="text-gray-400 leading-snug pt-1">
                Ulica Stjepana i Antuna Radića 49
                <br />
                44 000, Sisak
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700/80">
              <h4 className="text-sm font-semibold text-white mb-1">Newsletter</h4>
              <p className="text-gray-400 text-xs mb-3 leading-relaxed">
                Ponude i novosti na vaš e-mail.
              </p>
              <form onSubmit={handleSubmit} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail adresa"
                  className="w-full px-3 py-2 text-sm rounded-lg bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-600 border border-gray-700 transition-colors hover:border-gray-600"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 text-sm text-gray-800 rounded-lg font-medium bg-gray-100 hover:bg-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Slanje...' : 'Prijavi se'}
                </button>
                {submitStatus === 'success' && (
                  <p className="text-green-400 text-xs">{submitMessage}</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-400 text-xs">{submitMessage}</p>
                )}
              </form>
            </div>
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