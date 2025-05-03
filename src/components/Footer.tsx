import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <p className="mb-2">Ulica Stjepana i Antuna Radića 37,</p>
            <p className="mb-2">44 000, Sisak</p>
            <p className="mb-2">contact@visagestudio.hr</p>
            <p>091 110 50 20</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Brzi linkovi</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/usluge" className="hover:text-gray-300">
                  Usluge
                </Link>
              </li>
              <li>
                <Link href="/katalog" className="hover:text-gray-300">
                  Katalog
                </Link>
              </li>
              <li>
                <Link href="/cjenik" className="hover:text-gray-300">
                  Cjenik
                </Link>
              </li>
              <li>
                <Link href="/o-nama" className="hover:text-gray-300">
                  O nama
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Pratite nas</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/visagestudio"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                Facebook
              </a>
              <a
                href="https://wa.me/385911105020"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>© {new Date().getFullYear()} VISAGE Studio. Sva prava pridržana.</p>
          <p className="mt-2 text-sm text-gray-400">
            Načini plaćanja: Gotovina, Kartice
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 