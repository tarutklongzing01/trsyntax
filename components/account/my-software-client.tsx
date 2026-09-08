'use client';

import Link from 'next/link';
import { Download, KeyRound, LoaderCircle, UserRound } from 'lucide-react';
import { collection, getDocs, query, where, type Timestamp } from 'firebase/firestore';
import { useEffect, useState, type ReactNode } from 'react';
import { useFirebaseUser } from '@/hooks/use-firebase-user';
import { getFirebase } from '@/lib/firebase/client';
import { getPublishedPrograms } from '@/lib/firebase/programs';
import type { SoftwareProgram } from '@/types';

type Order = { productId?: string; programId?: string; licenseKey?: string; key?: string; status?: string };
type OwnedLicense = { programId: string; licenseKey: string; licenseType: 'trial' | 'full'; status: string; expiresAt: Date | null };

function asDate(value: unknown) {
  return value && typeof value === 'object' && 'toDate' in value ? (value as Timestamp).toDate() : null;
}

export function MySoftwareClient() {
  const { user, loading } = useFirebaseUser();
  const [programs, setPrograms] = useState<SoftwareProgram[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [licenses, setLicenses] = useState<OwnedLicense[]>([]);
  const [libraryLoading, setLibraryLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const firebase = getFirebase();
    if (!firebase) return;
    void Promise.all([
      getPublishedPrograms(),
      getDocs(query(collection(firebase.db, 'orders'), where('userId', '==', user.uid))),
      getDocs(query(collection(firebase.db, 'hwidLicenses'), where('email', '==', (user.email || '').toLowerCase()))),
    ]).then(([nextPrograms, orderSnapshot, licenseSnapshot]) => {
      setPrograms(nextPrograms);
      setOrders(orderSnapshot.docs.map((item) => item.data() as Order));
      setLicenses(licenseSnapshot.docs.map((item) => {
        const data = item.data();
        return { programId: String(data.programId || data.productId || ''), licenseKey: String(data.licenseKey || data.key || item.id), licenseType: data.licenseType === 'trial' ? 'trial' : 'full', status: data.status === 'disabled' ? 'disabled' : 'active', expiresAt: asDate(data.expiresAt) };
      }));
    }).catch(() => setPrograms([])).finally(() => setLibraryLoading(false));
  }, [user]);

  if (loading || (user && libraryLoading)) return <LibraryState icon={<LoaderCircle className="spin" />} title="กำลังโหลดคลังโปรแกรม..." />;
  if (!user) return <LibraryState icon={<UserRound />} title="เข้าสู่ระบบเพื่อดู My Software" description="รายการโปรแกรมแบบเสียเงินจะแสดงเมื่อบัญชีมี License ที่ใช้งานได้" action />;

  const activeLicenses = licenses.filter((license) => license.status === 'active' && (!license.expiresAt || license.expiresAt.getTime() >= Date.now()));
  const allowed = programs.filter((program) => program.type === 'FREE' || activeLicenses.some((license) => license.programId === program.id) || orders.some((order) => {
    const productId = order.productId || order.programId;
    return productId === program.id && !['cancelled', 'refunded'].includes(order.status || '');
  }));
  if (!allowed.length) return <LibraryState icon={<Download />} title="ยังไม่มีโปรแกรมในคลัง" description="โปรแกรมฟรีและโปรแกรมที่ซื้อแล้วจะปรากฏที่นี่" />;

  return <div className="license-list">{allowed.map((program) => {
    const order = orders.find((item) => (item.productId || item.programId) === program.id);
    const ownedLicense = activeLicenses.find((item) => item.programId === program.id);
    const licenseLabel = ownedLicense ? `${ownedLicense.licenseType === 'trial' ? 'TRIAL' : 'FULL'} · ${ownedLicense.licenseKey}` : program.type === 'FREE' ? 'FREE LICENSE' : (order?.licenseKey || order?.key || 'PURCHASED');
    return <article key={program.id}><span className="license-icon">{program.name.slice(0, 2)}</span><div><p>{program.category}</p><h2>{program.name}</h2><small>Latest Version: {program.version}</small></div><div className="license-status"><KeyRound/><span>{licenseLabel}</span></div>{program.downloadUrl ? <a className="btn btn-primary" href={program.downloadUrl} target="_blank" rel="noopener noreferrer"><Download/> Download</a> : <Link className="btn btn-primary" href={`/software/${program.slug}`}><Download/> Download</Link>}</article>;
  })}</div>;
}

function LibraryState({ icon, title, description, action }: { icon: ReactNode; title: string; description?: string; action?: boolean }) {
  return <div className="empty-state account-state">{icon}<h2>{title}</h2>{description && <p>{description}</p>}{action && <Link className="btn btn-primary" href="/login">เข้าสู่ระบบ</Link>}</div>;
}
