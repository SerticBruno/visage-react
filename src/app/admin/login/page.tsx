'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/admin';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? 'Prijava nije uspjela');
      setLoading(false);
      return;
    }

    router.push(next);
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-sm border border-gray-200">
        <h1 className="text-xl font-semibold tracking-tight">Admin prijava</h1>
        <p className="mt-1 text-sm text-gray-500">Prijavite se za upravljanje katalogom</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {error && (
            <p className="rounded-md bg-red-50 text-red-700 px-3 py-2 text-sm">{error}</p>
          )}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Korisničko ime</span>
            <input
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Lozinka</span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-gray-900 text-white py-2.5 text-sm font-medium hover:bg-gray-800 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? 'Prijava…' : 'Prijava'}
          </button>
        </form>
      </div>
    </div>
  );
}
