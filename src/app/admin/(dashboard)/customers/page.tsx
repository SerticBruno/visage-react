'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/price-utils';
import { formatDateTime } from '@/lib/admin-labels';

type AdminCustomer = {
  email: string;
  name: string;
  phone: string | null;
  orderCount: number;
  totalSpentCents: number;
  lastOrderAt: string;
};

type SortField = 'name' | 'email' | 'orderCount' | 'totalSpentCents' | 'lastOrderAt';
type SortDir = 'asc' | 'desc';

const PAGE_SIZE = 15;

function compareCustomers(
  a: AdminCustomer,
  b: AdminCustomer,
  field: SortField,
  dir: SortDir
): number {
  let cmp = 0;

  switch (field) {
    case 'name':
      cmp = a.name.localeCompare(b.name, 'hr');
      break;
    case 'email':
      cmp = a.email.localeCompare(b.email, 'hr');
      break;
    case 'orderCount':
      cmp = a.orderCount - b.orderCount;
      break;
    case 'totalSpentCents':
      cmp = a.totalSpentCents - b.totalSpentCents;
      break;
    case 'lastOrderAt':
      cmp = new Date(a.lastOrderAt).getTime() - new Date(b.lastOrderAt).getTime();
      break;
  }

  return dir === 'asc' ? cmp : -cmp;
}

function matchesSearch(customer: AdminCustomer, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const haystack = [customer.name, customer.email, customer.phone ?? ''].join(' ').toLowerCase();
  return haystack.includes(q);
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('lastOrderAt');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [searchQuery, setSearchQuery] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/customers');
    if (!res.ok) {
      setError('Ne mogu učitati kupce');
      setLoading(false);
      return;
    }
    const data = await res.json();
    setCustomers(data.customers ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filteredCustomers = useMemo(
    () => customers.filter((c) => matchesSearch(c, searchQuery)),
    [customers, searchQuery]
  );

  const sortedCustomers = useMemo(
    () => [...filteredCustomers].sort((a, b) => compareCustomers(a, b, sortField, sortDir)),
    [filteredCustomers, sortField, sortDir]
  );

  const totalPages = Math.max(1, Math.ceil(sortedCustomers.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const paginatedCustomers = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return sortedCustomers.slice(start, start + PAGE_SIZE);
  }, [sortedCustomers, safePage]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir(field === 'lastOrderAt' || field === 'totalSpentCents' ? 'desc' : 'asc');
    }
    setPage(1);
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold">Kupci</h2>
          <p className="text-sm text-gray-500 mt-1">
            {loading ? 'Učitavanje…' : `${filteredCustomers.length} kupaca`}
          </p>
        </div>
        <div className="relative">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pretraži ime, e-mail, telefon…"
            className="w-full sm:w-72 rounded-md border border-gray-300 bg-white pl-3 pr-8 py-2 text-sm"
            aria-label="Pretraži kupce"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer text-lg leading-none"
              aria-label="Očisti pretragu"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left border-b border-gray-200">
            <tr>
              <th className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => handleSort('name')}
                  className="font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  Ime
                </button>
              </th>
              <th className="px-4 py-3 hidden sm:table-cell">
                <button
                  type="button"
                  onClick={() => handleSort('email')}
                  className="font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  E-mail
                </button>
              </th>
              <th className="px-4 py-3 hidden md:table-cell">Telefon</th>
              <th className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => handleSort('orderCount')}
                  className="font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  Narudžbe
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => handleSort('totalSpentCents')}
                  className="font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  Ukupno potrošeno
                </button>
              </th>
              <th className="px-4 py-3 hidden lg:table-cell">
                <button
                  type="button"
                  onClick={() => handleSort('lastOrderAt')}
                  className="font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  Zadnja narudžba
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={6} className="px-4 py-3">
                    <div className="h-8 bg-gray-100 rounded animate-pulse" />
                  </td>
                </tr>
              ))}
            {!loading && paginatedCustomers.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                  Nema kupaca koji odgovaraju pretrazi.
                </td>
              </tr>
            )}
            {!loading &&
              paginatedCustomers.map((customer) => (
                <tr key={customer.email} className="hover:bg-gray-50/80">
                  <td className="px-4 py-3 font-medium text-gray-900">{customer.name}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <Link
                      href={`/admin/orders?email=${encodeURIComponent(customer.email)}`}
                      className="text-gray-600 hover:text-gray-900 hover:underline"
                    >
                      {customer.email}
                    </Link>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-600">
                    {customer.phone ?? '-'}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{customer.orderCount}</td>
                  <td className="px-4 py-3 text-right font-medium whitespace-nowrap">
                    {formatPrice(customer.totalSpentCents)}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-gray-600 whitespace-nowrap">
                    {formatDateTime(customer.lastOrderAt)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {!loading && totalPages > 1 && (
        <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="Paginacija">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage <= 1}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Prethodna
          </button>
          <span className="text-sm text-gray-500 px-2">
            {safePage} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage >= totalPages}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Sljedeća
          </button>
        </nav>
      )}
    </>
  );
}
