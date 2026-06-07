import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Napuštene košarice · Admin' },
};

export default function AdminAbandonedCartsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
