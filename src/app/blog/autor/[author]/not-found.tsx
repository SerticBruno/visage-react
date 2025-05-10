import Link from 'next/link';

export default function AuthorNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Autor nije pronađen
        </h1>
        <p className="text-slate-600 mb-8">
          Nažalost, traženi autor ne postoji ili je uklonjen.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-br from-slate-700 to-slate-800 text-white rounded-lg hover:from-slate-800 hover:to-slate-900 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          Povratak na blog
        </Link>
      </div>
    </div>
  );
} 