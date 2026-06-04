import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Kupci · Admin' },
};

export default function AdminCustomersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
