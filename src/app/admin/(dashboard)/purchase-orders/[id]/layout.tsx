import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Narudžbenica · Admin' },
};

export default function AdminPurchaseOrderDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
