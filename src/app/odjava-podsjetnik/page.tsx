import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Odjava od podsjetnika – VISAGE Studio',
  robots: { index: false },
};

export default function OdjavaPodsjetnikPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">Odjava uspješna</h1>
        <p className="text-gray-500 mb-6">
          Nećete više primati podsjetnike o ovoj košarici. Vaša adresa nije dodana na nikakve
          mailing liste.
        </p>
        <Link
          href="/katalog"
          className="inline-block bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
        >
          Pregledaj katalog
        </Link>
      </div>
    </div>
  );
}
