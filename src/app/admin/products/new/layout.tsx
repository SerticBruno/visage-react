import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Novi proizvod',
};

export default function NewProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
