import type { Metadata } from 'next';
import { AdminGate } from '@/components/admin/admin-gate';

export const metadata: Metadata = { title: 'Users | Admin' };

export default function AdminUsersPage() {
  return <AdminGate initialView="users"/>;
}
