import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Narudžba · Admin' },
};

export default function AdminOrderDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
