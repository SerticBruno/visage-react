import Link from 'next/link';

export default function CategoryNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center bg-white rounded-lg shadow-md p-8 max-w-md mx-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Kategorija nije pronađena
        </h1>
        <p className="text-gray-600 mb-8">
          Nažalost, tražena kategorija ne postoji ili je uklonjena.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200"
        >
          Povratak na blog
        </Link>
      </div>
    </div>
  );
} 