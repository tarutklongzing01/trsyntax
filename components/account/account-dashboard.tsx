'use client';

import Link from 'next/link';
import { Clock3, Download, KeyRound, LoaderCircle, LogOut, UserRound } from 'lucide-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState, type ReactNode } from 'react';
import { useFirebaseUser } from '@/hooks/use-firebase-user';
import { getFirebase } from '@/lib/firebase/client';
import { logout } from '@/lib/firebase/auth';
import { Button } from '@/components/ui/button';

export function AccountDashboard() {
  const { user, loading, configured } = useFirebaseUser();
  const [licenseCount, setLicenseCount] = useState(0);
  const [downloadCount, setDownloadCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    const firebase = getFirebase();
    if (!firebase) return;
    void Promise.all([
      getDocs(query(collection(firebase.db, 'licenses'), where('userId', '==', user.uid))),
      getDocs(query(collection(firebase.db, 'downloads'), where('userId', '==', user.uid))),
    ]).then(([licenses, downloads]) => {
      setLicenseCount(licenses.size);
      setDownloadCount(downloads.size);
    }).catch(() => {
      setLicenseCount(0);
      setDownloadCount(0);
    });
  }, [user]);

  if (loading) return <AccountState icon={<LoaderCircle className="spin" />} title="กำลังตรวจสอบบัญชี..." />;
  if (!configured) return <AccountState title="ยังไม่ได้ตั้งค่า Firebase" description="เพิ่ม Firebase Web config แล้วสร้างเว็บไซต์ใหม่อีกครั้ง" />;
  if (!user) return <AccountState title="เข้าสู่ระบบเพื่อดูบัญชีของคุณ" description="License และประวัติการดาวน์โหลดจะแสดงเฉพาะเจ้าของบัญชี" action="เข้าสู่ระบบ" />;

  const initials = (user.displayName || user.email || 'TR').slice(0, 2).toUpperCase();
  const links = [
    [UserRound, 'Profile', 'ข้อมูลส่วนตัวและการเข้าสู่ระบบ', '/account'],
    [Download, 'My Software', 'โปรแกรมที่ซื้อและดาวน์โหลดได้', '/account/software'],
    [KeyRound, 'Licenses', `${licenseCount} License ในบัญชี`, '/account/software'],
    [Clock3, 'Download History', `${downloadCount} รายการดาวน์โหลด`, '/account/software'],
  ] as const;

  return <section className="shell content-section account-grid">
    <aside className="profile-card"><span>{initials}</span><h2>{user.displayName || 'TR-SYNTAX User'}</h2><p>{user.email}</p><i>Firebase Account</i><Button className="account-logout" variant="outline" onClick={() => void logout()}><LogOut /> ออกจากระบบ</Button></aside>
    <div className="account-links">{links.map(([Icon, title, desc, href]) => <Link href={href} key={title}><Icon/><div><h2>{title}</h2><p>{desc}</p></div><span>→</span></Link>)}</div>
  </section>;
}

function AccountState({ icon, title, description, action }: { icon?: ReactNode; title: string; description?: string; action?: string }) {
  return <section className="shell content-section"><div className="empty-state account-state">{icon || <UserRound />}<h2>{title}</h2>{description && <p>{description}</p>}{action && <Link className="btn btn-primary" href="/login">{action}</Link>}</div></section>;
}
