import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Uredi proizvod · Admin' },
};

export default function EditProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
