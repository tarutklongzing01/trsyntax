'use client';

import Link from 'next/link';
import { LoaderCircle, LockKeyhole } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useFirebaseUser } from '@/hooks/use-firebase-user';
import { getFirebase } from '@/lib/firebase/client';
import { AdminShell } from './admin-shell';

export function AdminGate() {
  const { user, loading } = useFirebaseUser();
  const [role, setRole] = useState<string | null>(null);
  const [checkingRole, setCheckingRole] = useState(true);

  useEffect(() => {
    if (!user) return;
    const firebase = getFirebase();
    if (!firebase) return;
    void getDoc(doc(firebase.db, 'users', user.uid)).then((snapshot) => setRole(snapshot.data()?.role || 'user')).catch(() => setRole('user')).finally(() => setCheckingRole(false));
  }, [user]);

  if (loading || (user && checkingRole)) return <AdminState loading title="กำลังตรวจสอบสิทธิ์ผู้ดูแล..." />;
  if (!user) return <AdminState title="กรุณาเข้าสู่ระบบก่อน" action="เข้าสู่ระบบ" />;
  if (role !== 'admin') return <AdminState title="บัญชีนี้ไม่มีสิทธิ์ผู้ดูแล" description="ต้องกำหนด role เป็น admin ในเอกสารผู้ใช้บน Firestore" action="กลับไปบัญชีของฉัน" href="/account" />;
  return <AdminShell />;
}

function AdminState({ loading, title, description, action, href = '/login' }: { loading?: boolean; title: string; description?: string; action?: string; href?: string }) {
  return <main className="auth-page"><div className="empty-state admin-state">{loading ? <LoaderCircle className="spin" /> : <LockKeyhole />}<h2>{title}</h2>{description && <p>{description}</p>}{action && <Link href={href} className="btn btn-primary">{action}</Link>}</div></main>;
}
