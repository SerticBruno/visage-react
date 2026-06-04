import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kupci',
};

export default function AdminCustomersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
