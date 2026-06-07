'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { href: '/admin', label: 'Proizvodi', match: (path: string) => path === '/admin' },
  {
    href: '/admin/termini',
    label: 'Termini',
    match: (path: string) => path.startsWith('/admin/termini'),
  },
  {
    href: '/admin/klijenti',
    label: 'Klijenti',
    match: (path: string) => path.startsWith('/admin/klijenti'),
  },
  {
    href: '/admin/orders',
    label: 'Narudžbe',
    match: (path: string) => path.startsWith('/admin/orders'),
  },
  {
    href: '/admin/customers',
    label: 'Kupci',
    match: (path: string) => path.startsWith('/admin/customers'),
  },
  {
    href: '/admin/purchase-orders',
    label: 'Narudžbenice',
    match: (path: string) => path.startsWith('/admin/purchase-orders'),
  },
  {
    href: '/admin/stock-notifications',
    label: 'Obavijesti',
    match: (path: string) => path.startsWith('/admin/stock-notifications'),
  },
  {
    href: '/admin/abandoned-carts',
    label: 'Napuštene košarice',
    match: (path: string) => path.startsWith('/admin/abandoned-carts'),
  },
  {
    href: '/admin/postavke',
    label: 'Postavke',
    match: (path: string) => path.startsWith('/admin/postavke'),
  },
] as const;

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 border-b border-gray-200 mb-6" aria-label="Admin sekcije">
      {TABS.map(({ href, label, match }) => {
        const active = match(pathname);
        return (
          <Link
            key={href}
            href={href}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              active
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
