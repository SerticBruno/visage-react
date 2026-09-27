import { Metadata } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import type { CjenikManifest } from '@/lib/cjenikExport';
import { createEmptyManifest } from '@/lib/cjenikExport';

export const metadata: Metadata = {
  title: 'Digitalni cjenici | VISAGE Studio Sisak',
  description:
    'Strojno čitljivi cjenici proizvoda i usluga VISAGE Studija u CSV formatu, uključujući arhivu zadnjih 30 dana.',
  alternates: {
    canonical: 'https://visagestudio.hr/cjenici',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const dynamic = 'force-dynamic';

function loadManifest(): CjenikManifest {
  const manifestPath = path.join(process.cwd(), 'public', 'cjenici', 'index.json');
  if (!fs.existsSync(manifestPath)) return createEmptyManifest();
  try {
    return JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as CjenikManifest;
  } catch {
    return createEmptyManifest();
  }
}

function formatHrDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat('hr-HR', {
      timeZone: 'Europe/Zagreb',
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function CjeniciPage() {
  const manifest = loadManifest();
  const products = [...manifest.entries]
    .filter((e) => e.kind === 'products')
    .sort((a, b) => b.generatedAt.localeCompare(a.generatedAt));
  const services = [...manifest.entries]
    .filter((e) => e.kind === 'services')
    .sort((a, b) => b.generatedAt.localeCompare(a.generatedAt));

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Digitalni cjenici</h1>
        <p className="mt-4 text-slate-600 leading-relaxed">
          Strojno čitljivi cjenici proizvoda i usluga u CSV formatu, u skladu s Odlukom o objavi
          cjenika. Datoteke su javno dostupne za automatsko preuzimanje. Arhiva se čuva 30 dana.
        </p>

        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Trenutni cjenici</h2>
          <ul className="space-y-3">
            <li>
              <a
                href="/cjenici/proizvodi.csv"
                className="text-slate-800 underline underline-offset-2 hover:text-slate-600"
              >
                Cjenik proizvoda (CSV)
              </a>
              <span className="ml-2 text-sm text-slate-500">/cjenici/proizvodi.csv</span>
            </li>
            <li>
              <a
                href="/cjenici/usluge.csv"
                className="text-slate-800 underline underline-offset-2 hover:text-slate-600"
              >
                Cjenik usluga (CSV)
              </a>
              <span className="ml-2 text-sm text-slate-500">/cjenici/usluge.csv</span>
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Arhiva proizvoda</h2>
          {products.length === 0 ? (
            <p className="text-slate-500 text-sm">Još nema arhiviranih cjenika proizvoda.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {products.map((entry) => (
                <li key={entry.filename} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <a
                    href={`/cjenici/${entry.filename}`}
                    className="text-slate-800 underline underline-offset-2 hover:text-slate-600 break-all"
                  >
                    {entry.filename}
                  </a>
                  <span className="text-slate-500">{formatHrDate(entry.generatedAt)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Arhiva usluga</h2>
          {services.length === 0 ? (
            <p className="text-slate-500 text-sm">Još nema arhiviranih cjenika usluga.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {services.map((entry) => (
                <li key={entry.filename} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <a
                    href={`/cjenici/${entry.filename}`}
                    className="text-slate-800 underline underline-offset-2 hover:text-slate-600 break-all"
                  >
                    {entry.filename}
                  </a>
                  <span className="text-slate-500">{formatHrDate(entry.generatedAt)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <p className="mt-12 text-sm text-slate-500">
          Pregled cijena za kupce:{' '}
          <Link href="/katalog" className="underline underline-offset-2">
            Katalog
          </Link>
          {' · '}
          <Link href="/cjenik" className="underline underline-offset-2">
            Cjenik usluga
          </Link>
        </p>
      </div>
    </main>
  );
}
