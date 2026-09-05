import type { Metadata } from 'next';
import { AdminGate } from '@/components/admin/admin-gate';

export const metadata: Metadata = { title: 'HWID License Management' };

export default function AdminHwid() {
  return <AdminGate initialView="hwid" />;
}
