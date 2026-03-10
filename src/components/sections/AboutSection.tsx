import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

const defaultDescription = (
  <>
    <p className="text-lg text-gray-600 mb-4">
      VISAGE Studio je estetski studio u centru Siska specijaliziran za nekirurške estetske tretmane.
    </p>
    <p className="text-lg text-gray-600 mb-8">
      Kod nas možete, po prvi put u Sisku, obavljati neke od najpopularnijih neinvazivnih tretmana: <Link href="/usluge/mezoterapija" className="text-slate-700 underline hover:text-slate-900 transition-colors">mezoterapiju Mesoject Gunom i Dermapenom 4</Link> te bleferoplazmu <Link href="/usluge/plasmage" className="text-slate-700 underline hover:text-slate-900 transition-colors">Plasmage uređajem</Link>.
    </p>
  </>
);

export interface AboutSectionProps {
  title?: string;
  description?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  buttonText?: string;
  buttonHref?: string;
  onButtonClick?: () => void;
  /** When true, gradient goes from gray to white (top to bottom). Default is white to gray. */
  invertGradient?: boolean;
}

const AboutSection = ({
  title = 'O nama',
  description = defaultDescription,
  imageSrc = '/images/services/toskani-hero-visage-estetski-studio.webp',
  imageAlt = 'VISAGE Studio',
  buttonText = 'Saznajte više',
  buttonHref = '/o-nama',
  onButtonClick,
  invertGradient = false,
}: AboutSectionProps) => {
  const buttonClassName =
    'inline-flex items-center px-8 py-4 border border-slate-600 text-base font-medium rounded-xl shadow-lg text-white bg-slate-800 hover:bg-slate-700 transition-all duration-300 hover:shadow-xl';

  const backgroundStyle = invertGradient
    ? { background: 'linear-gradient(to bottom, #e5e7eb, #ffffff)' }
    : { background: 'linear-gradient(to bottom, #ffffff, #e5e7eb)' };

  return (
    <section className="pt-20" style={backgroundStyle}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">{title}</h2>
            {typeof description === 'string' ? (
              <p className="text-lg text-gray-600 mb-8 whitespace-pre-line">{description}</p>
            ) : (
              <div className="text-lg text-gray-600">{description}</div>
            )}
            {onButtonClick ? (
              <button type="button" onClick={onButtonClick} className={buttonClassName}>
                {buttonText}
              </button>
            ) : (
              <Link href={buttonHref} className={buttonClassName}>
                {buttonText}
              </Link>
            )}
          </div>
          <div className="relative h-96">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 