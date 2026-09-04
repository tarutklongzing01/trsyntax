import type { Metadata } from 'next';
import { AdminGate } from '@/components/admin/admin-gate';
export const metadata:Metadata={title:'Admin Dashboard'};
export default function Admin(){return <AdminGate/>}
