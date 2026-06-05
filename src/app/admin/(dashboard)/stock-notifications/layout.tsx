import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Obavijesti o zalihama · Admin' },
};

export default function AdminStockNotificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
