import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Admin' },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 [&_a]:cursor-pointer [&_button:not(:disabled)]:cursor-pointer [&_button:disabled]:cursor-not-allowed [&_label:has(input[type=checkbox])]:cursor-pointer">
      {children}
    </div>
  );
}
