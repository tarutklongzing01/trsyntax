'use client';

import Link from 'next/link';
import { Download, KeyRound, LoaderCircle, UserRound } from 'lucide-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState, type ReactNode } from 'react';
import { useFirebaseUser } from '@/hooks/use-firebase-user';
import { getFirebase } from '@/lib/firebase/client';
import { getPublishedPrograms } from '@/lib/firebase/programs';
import type { SoftwareProgram } from '@/types';

type Order = { productId?: string; programId?: string; licenseKey?: string; key?: string; status?: string };

export function MySoftwareClient() {
  const { user, loading } = useFirebaseUser();
  const [programs, setPrograms] = useState<SoftwareProgram[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [libraryLoading, setLibraryLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const firebase = getFirebase();
    if (!firebase) return;
    void Promise.all([
      getPublishedPrograms(),
      getDocs(query(collection(firebase.db, 'orders'), where('userId', '==', user.uid))),
    ]).then(([nextPrograms, orderSnapshot]) => {
      setPrograms(nextPrograms);
      setOrders(orderSnapshot.docs.map((item) => item.data() as Order));
    }).catch(() => setPrograms([])).finally(() => setLibraryLoading(false));
  }, [user]);

  if (loading || (user && libraryLoading)) return <LibraryState icon={<LoaderCircle className="spin" />} title="กำลังโหลดคลังโปรแกรม..." />;
  if (!user) return <LibraryState icon={<UserRound />} title="เข้าสู่ระบบเพื่อดู My Software" description="รายการโปรแกรมแบบเสียเงินจะแสดงเมื่อบัญชีมี License ที่ใช้งานได้" action />;

  const allowed = programs.filter((program) => program.type === 'FREE' || orders.some((order) => {
    const productId = order.productId || order.programId;
    return productId === program.id && !['cancelled', 'refunded'].includes(order.status || '');
  }));
  if (!allowed.length) return <LibraryState icon={<Download />} title="ยังไม่มีโปรแกรมในคลัง" description="โปรแกรมฟรีและโปรแกรมที่ซื้อแล้วจะปรากฏที่นี่" />;

  return <div className="license-list">{allowed.map((program) => {
    const order = orders.find((item) => (item.productId || item.programId) === program.id);
    const licenseLabel = program.type === 'FREE' ? 'FREE LICENSE' : (order?.licenseKey || order?.key || 'PURCHASED');
    return <article key={program.id}><span className="license-icon">{program.name.slice(0, 2)}</span><div><p>{program.category}</p><h2>{program.name}</h2><small>Latest Version: {program.version}</small></div><div className="license-status"><KeyRound/><span>{licenseLabel}</span></div><Link className="btn btn-primary" href={`/software/${program.slug}`}><Download/> Download</Link></article>;
  })}</div>;
}

function LibraryState({ icon, title, description, action }: { icon: ReactNode; title: string; description?: string; action?: boolean }) {
  return <div className="empty-state account-state">{icon}<h2>{title}</h2>{description && <p>{description}</p>}{action && <Link className="btn btn-primary" href="/login">เข้าสู่ระบบ</Link>}</div>;
}
