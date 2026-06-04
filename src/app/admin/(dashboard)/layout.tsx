import type { Metadata } from 'next';
import AdminDashboardShell from '@/components/admin/AdminDashboardShell';

export const metadata: Metadata = {
  title: 'Proizvodi',
};

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return <AdminDashboardShell>{children}</AdminDashboardShell>;
}
