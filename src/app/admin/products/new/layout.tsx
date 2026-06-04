import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Novi proizvod · Admin' },
};

export default function NewProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
