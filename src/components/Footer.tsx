import Link from 'next/link';
import { FaFacebook, FaWhatsapp, FaInstagram, FaEnvelope, FaCcVisa, FaCcMastercard, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4">Prijavite se na naš newsletter</h3>
            <p className="text-gray-300 mb-4">Budite u toku s najnovijim ponudama i akcijama</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Vaša email adresa"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-600 border border-gray-700"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white rounded-lg transition-all duration-300 font-medium transform hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
              >
                Prijavi se
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Kontakt</h3>
            <div className="space-y-3">
              <a 
                href="mailto:contact@visagestudio.hr"
                className="flex items-center gap-2 text-gray-300 hover:text-slate-300 transition-colors cursor-pointer"
              >
                <FaEnvelope className="text-slate-400" />
                contact@visagestudio.hr
              </a>
              <a 
                href="https://wa.me/385911105020"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-slate-300 transition-colors cursor-pointer"
              >
                <FaWhatsapp className="text-slate-400" />
                091 110 50 20
              </a>
              <a 
                href="tel:+385911105020"
                className="flex items-center gap-2 text-gray-300 hover:text-slate-300 transition-colors cursor-pointer"
              >
                <FaPhone className="text-slate-400" />
                091 110 50 20
              </a>
              <p className="text-gray-300">Ulica Stjepana i Antuna Radića 37,</p>
              <p className="text-gray-300">44 000, Sisak</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Brzi linkovi</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/usluge" className="text-gray-300 hover:text-slate-300 transition-colors">
                  Usluge
                </Link>
              </li>
              <li>
                <Link href="/katalog" className="text-gray-300 hover:text-slate-300 transition-colors">
                  Katalog
                </Link>
              </li>
              <li>
                <Link href="/cjenik" className="text-gray-300 hover:text-slate-300 transition-colors">
                  Cjenik
                </Link>
              </li>
              <li>
                <Link href="/o-nama" className="text-gray-300 hover:text-slate-300 transition-colors">
                  O nama
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex space-x-6">
              <a
                href="https://facebook.com/visagestudio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-slate-300 transition-colors"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://instagram.com/visagestudio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-slate-300 transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://wa.me/385911105020"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-slate-300 transition-colors"
              >
                <FaWhatsapp size={24} />
              </a>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">© {new Date().getFullYear()} VISAGE Studio. Sva prava pridržana.</p>
              <div className="flex items-center justify-center md:justify-end gap-2 mt-2">
                <span className="text-sm text-gray-500">Načini plaćanja:</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Gotovina, Kartice</span>
                  <div className="flex gap-2 ml-2">
                    <FaCcVisa className="text-gray-400" size={24} />
                    <FaCcMastercard className="text-gray-400" size={24} />
                  </div>
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