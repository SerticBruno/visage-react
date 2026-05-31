import HeroSection from '@/components/sections/HeroSection';
import Link from 'next/link';
import { ReactNode } from 'react';
import {
  LEGAL_LAST_UPDATED,
  legalPaths,
  legalSeller,
  formatSellerAddress,
} from '@/data/legal';
import { legalPanelBase } from '@/components/legal/legal-styles';

interface LegalPageLayoutProps {
  title: string;
  description: string;
  titleIcon?: ReactNode;
  children: ReactNode;
  showSellerBox?: boolean;
}

export function LegalPageLayout({
  title,
  description,
  titleIcon,
  children,
  showSellerBox = true,
}: LegalPageLayoutProps) {
  return (
    <>
      <HeroSection
        title={title}
        description={description}
        titleIcon={titleIcon}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {showSellerBox && (
            <aside className={`${legalPanelBase} mb-10`}>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Podaci o prodavatelju
              </h2>
              <dl className="space-y-2.5 text-slate-700 text-sm">
                <div>
                  <dt className="sr-only">Pravni naziv</dt>
                  <dd className="font-medium text-slate-900">{legalSeller.legalName}</dd>
                </div>
                {legalSeller.oib && (
                  <div>
                    <dt className="inline font-medium">OIB: </dt>
                    <dd className="inline">{legalSeller.oib}</dd>
                  </div>
                )}
                {legalSeller.mbs && (
                  <div>
                    <dt className="inline font-medium">MBS: </dt>
                    <dd className="inline">{legalSeller.mbs}</dd>
                  </div>
                )}
                {legalSeller.court && (
                  <div>
                    <dt className="inline font-medium">Sud registra: </dt>
                    <dd className="inline">{legalSeller.court}</dd>
                  </div>
                )}
                <div>
                  <dt className="sr-only">Adresa</dt>
                  <dd>{formatSellerAddress()}</dd>
                </div>
                <div>
                  <dt className="inline font-medium">E-mail: </dt>
                  <dd className="inline">
                    <a
                      href={`mailto:${legalSeller.email}`}
                      className="text-slate-900 underline hover:no-underline"
                    >
                      {legalSeller.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="inline font-medium">Telefon: </dt>
                  <dd className="inline">
                    <a
                      href={`tel:${legalSeller.phone}`}
                      className="text-slate-900 underline hover:no-underline"
                    >
                      {legalSeller.phoneDisplay}
                    </a>
                  </dd>
                </div>
                {!legalSeller.oib && (
                  <p className="text-amber-800 text-xs pt-2">
                    Napomena vlasniku webshopa: unesite OIB i ostale registarske podatke u{' '}
                    <code className="text-xs bg-amber-100 px-1 rounded">.env.local</code>{' '}
                    (vidi .env.example).
                  </p>
                )}
              </dl>
              <p className="mt-5 text-sm">
                <Link href={legalPaths.seller} className="text-slate-900 underline hover:no-underline">
                  Svi podaci o prodavatelju
                </Link>
              </p>
            </aside>
          )}

          <div className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-h2:mt-10 prose-h2:mb-5 prose-h3:mt-8 prose-h3:mb-3 prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700 prose-ul:my-5 prose-ol:my-5 prose-a:text-slate-900">
            <p className="text-sm text-slate-600 not-prose mb-8">
              <strong>Posljednje ažuriranje:</strong> {LEGAL_LAST_UPDATED}
            </p>
            {children}
          </div>

          <nav
            className="mt-12 pt-8 border-t border-slate-200 not-prose"
            aria-label="Povezane pravne stranice"
          >
            <h2 className="text-sm font-semibold text-slate-900 mb-3">Povezani dokumenti</h2>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <li>
                <Link href={legalPaths.termsOfSale} className="text-slate-700 underline hover:text-slate-900">
                  Uvjeti kupnje
                </Link>
              </li>
              <li>
                <Link href={legalPaths.generalTerms} className="text-slate-700 underline hover:text-slate-900">
                  Opći uvjeti poslovanja
                </Link>
              </li>
              <li>
                <Link href={legalPaths.privacy} className="text-slate-700 underline hover:text-slate-900">
                  Politika privatnosti
                </Link>
              </li>
              <li>
                <Link href={legalPaths.cookies} className="text-slate-700 underline hover:text-slate-900">
                  Politika kolačića
                </Link>
              </li>
              <li>
                <Link href={legalPaths.delivery} className="text-slate-700 underline hover:text-slate-900">
                  Uvjeti dostave
                </Link>
              </li>
              <li>
                <Link href={legalPaths.returns} className="text-slate-700 underline hover:text-slate-900">
                  Povrat i reklamacije
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
