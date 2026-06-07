import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Termini · Admin' };

export default function TerminiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
