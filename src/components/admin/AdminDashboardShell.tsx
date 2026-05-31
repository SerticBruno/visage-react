'use client';

import { useRouter } from 'next/navigation';
import AdminNav from './AdminNav';

export default function AdminDashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="flex flex-wrap items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-semibold">Admin</h1>
          <p className="text-sm text-gray-500 mt-1">Upravljanje trgovinom</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-white cursor-pointer"
        >
          Odjava
        </button>
      </header>

      <AdminNav />
      {children}
    </div>
  );
}
