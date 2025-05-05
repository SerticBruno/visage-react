import Link from 'next/link';

export default function AuthorNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Autor nije pronađen
        </h1>
        <p className="text-gray-600 mb-8">
          Nažalost, traženi autor ne postoji ili je uklonjen.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Povratak na blog
        </Link>
      </div>
    </div>
  );
} 