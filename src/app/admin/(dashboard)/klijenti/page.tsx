'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { formatDateTime } from '@/lib/admin-labels';

type Client = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
  source: string;
  created_at: string;
};

const PAGE_SIZE = 20;

export default function AdminKlijentiPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<string>('');

  const fetchClients = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '500' });
      if (search) params.set('q', search);
      const res = await fetch(`/api/admin/clients?${params}`);
      const data = await res.json();
      setClients(data.clients ?? []);
      setPage(1);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const timeout = setTimeout(fetchClients, 250);
    return () => clearTimeout(timeout);
  }, [fetchClients]);

  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return clients.slice(start, start + PAGE_SIZE);
  }, [clients, page]);

  const totalPages = Math.max(1, Math.ceil(clients.length / PAGE_SIZE));

  async function importFromOrders() {
    setImporting(true);
    setImportResult('');
    try {
      const res = await fetch('/api/admin/clients/import-from-orders', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setImportResult(`Uvezeno: ${data.imported} novih klijenata (${data.skipped} već postojalo)`);
        fetchClients();
      } else {
        setImportResult(`Greška: ${data.error}`);
      }
    } catch {
      setImportResult('Greška pri uvozu');
    } finally {
      setImporting(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Klijenti</h1>
          <p className="text-sm text-gray-500 mt-0.5">{clients.length} klijenata ukupno</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={importFromOrders}
            disabled={importing}
            className="text-sm text-gray-600 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
          >
            {importing ? 'Uvoz...' : 'Uvezi iz narudžbi'}
          </button>
          <Link
            href="/admin/termini"
            className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            + Novi termin
          </Link>
        </div>
      </div>

      {importResult && (
        <div className="mb-4 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg px-4 py-3 text-sm">
          {importResult}
        </div>
      )}

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pretraži po imenu, emailu ili telefonu..."
            className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Ime</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Telefon</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Izvor</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Dodano</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Akcije</th>
            </tr>
          </thead>
          <tbody>
            {loading &&
              Array.from({ length: 8 }).map((_, i) => (
                <tr key={i} className="border-b border-gray-100">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <td key={j} className="px-5 py-3">
                      <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))}
            {!loading && paged.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-gray-400">
                  {search ? 'Nema rezultata za tu pretragu' : 'Nema klijenata. Uvezi ih iz narudžbi ili dodaj termin.'}
                </td>
              </tr>
            )}
            {!loading &&
              paged.map((c) => (
                <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-900">{c.name}</td>
                  <td className="px-5 py-3 text-gray-600">{c.email ?? <span className="text-gray-300">—</span>}</td>
                  <td className="px-5 py-3 text-gray-600">{c.phone ?? <span className="text-gray-300">—</span>}</td>
                  <td className="px-5 py-3">
                    <span className="text-xs bg-gray-100 text-gray-600 rounded px-2 py-0.5">
                      {c.source === 'manual' ? 'ručno' : c.source === 'order_import' ? 'narudžba' : c.source}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-400 text-xs">{formatDateTime(c.created_at)}</td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/admin/klijenti/${c.id}`}
                      className="text-gray-600 hover:text-gray-900 underline text-xs"
                    >
                      Profil
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <span>Stranica {page} / {totalPages}</span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40"
            >
              ←
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
