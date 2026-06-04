import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Prijava',
};

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Učitavanje…</div>}>{children}</Suspense>;
}
