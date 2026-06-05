import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Narudžbenice · Admin' },
};

export default function AdminPurchaseOrdersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
