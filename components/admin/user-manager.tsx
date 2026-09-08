'use client';

import { collection, getDocs, type Timestamp } from 'firebase/firestore';
import { LoaderCircle, Mail, RefreshCw, Search, ShieldCheck, UserRound, Users } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { getFirebase } from '@/lib/firebase/client';

type UserRecord = {
  id: string;
  displayName: string;
  email: string;
  provider: string;
  createdAt: Date | null;
  lastLoginAt: Date | null;
  updatedAt: Date | null;
};

function asDate(value: unknown) {
  return value && typeof value === 'object' && 'toDate' in value ? (value as Timestamp).toDate() : null;
}

function formatDate(value: Date | null) {
  return value ? new Intl.DateTimeFormat('th-TH', { dateStyle: 'medium', timeStyle: 'short' }).format(value) : '—';
}

function activityTime(user: UserRecord) {
  return (user.lastLoginAt || user.updatedAt || user.createdAt)?.getTime() || 0;
}

export function UserManager() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [queryText, setQueryText] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const loadUsers = useCallback(async () => {
    const firebase = getFirebase();
    if (!firebase) {
      setMessage('ยังไม่ได้ตั้งค่า Firebase');
      setLoading(false);
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      const snapshot = await getDocs(collection(firebase.db, 'users'));
      const nextUsers = snapshot.docs.map((item) => {
        const data = item.data();
        return {
          id: item.id,
          displayName: String(data.displayName || ''),
          email: String(data.email || ''),
          provider: String(data.provider || 'password'),
          createdAt: asDate(data.createdAt),
          lastLoginAt: asDate(data.lastLoginAt),
          updatedAt: asDate(data.updatedAt),
        };
      }).sort((a, b) => activityTime(b) - activityTime(a));
      setUsers(nextUsers);
    } catch {
      setMessage('โหลดรายชื่อผู้ใช้ไม่สำเร็จ กรุณาตรวจสอบสิทธิ์ Firestore');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadUsers(), 0);
    return () => window.clearTimeout(timer);
  }, [loadUsers]);

  const filteredUsers = useMemo(() => users.filter((user) => `${user.displayName} ${user.email} ${user.id}`.toLowerCase().includes(queryText.toLowerCase())), [queryText, users]);
  const googleUsers = users.filter((user) => user.provider === 'google.com').length;

  return <>
    <header className="users-header"><div><p>USER MANAGEMENT</p><h1>ผู้ใช้งานระบบ</h1><small>ดูสมาชิกที่สมัครและเข้าสู่ระบบผ่าน Firebase Authentication</small></div><Button variant="outline" onClick={() => void loadUsers()} disabled={loading}><RefreshCw className={loading ? 'spin' : ''}/> รีเฟรช</Button></header>
    <section className="user-stats">
      <article><Users/><div><p>ผู้ใช้ทั้งหมด</p><strong>{users.length}</strong></div></article>
      <article><span className="google-mark">G</span><div><p>Google</p><strong>{googleUsers}</strong></div></article>
      <article><Mail/><div><p>อีเมล / รหัสผ่าน</p><strong>{users.length - googleUsers}</strong></div></article>
    </section>
    {message && <p className="hwid-message error">{message}</p>}
    <section className="admin-panel user-panel">
      <div className="user-toolbar"><label><Search/><input value={queryText} onChange={(event) => setQueryText(event.target.value)} placeholder="ค้นหาชื่อ อีเมล หรือ UID..." aria-label="ค้นหาผู้ใช้" /></label><span>{filteredUsers.length} บัญชี</span></div>
      <div className="table-scroll"><table className="user-table"><thead><tr><th>ผู้ใช้</th><th>วิธีเข้าสู่ระบบ</th><th>สมัครเมื่อ</th><th>เข้าใช้ล่าสุด</th><th>UID</th></tr></thead><tbody>
        {loading ? <tr><td colSpan={5} className="user-empty"><LoaderCircle className="spin"/> กำลังโหลดผู้ใช้...</td></tr> : filteredUsers.length ? filteredUsers.map((user) => <tr key={user.id}>
          <td><span className="user-avatar">{(user.displayName || user.email || 'U').slice(0, 1).toUpperCase()}</span><div><strong>{user.displayName || 'ยังไม่ได้ตั้งชื่อ'}</strong><small>{user.email || 'ไม่มีอีเมล'}</small></div></td>
          <td><i className={`provider-badge ${user.provider === 'google.com' ? 'google' : 'email'}`}>{user.provider === 'google.com' ? 'Google' : 'Email'}</i></td>
          <td>{formatDate(user.createdAt)}</td><td>{formatDate(user.lastLoginAt || user.updatedAt)}</td><td><code>{user.id}</code></td>
        </tr>) : <tr><td colSpan={5} className="user-empty"><UserRound/> ไม่พบผู้ใช้งาน</td></tr>}
      </tbody></table></div>
      <div className="user-security-note"><ShieldCheck/> แสดงเฉพาะข้อมูลโปรไฟล์ที่ผู้ใช้บันทึกใน Firestore โดยไม่แสดงรหัสผ่าน</div>
    </section>
  </>;
}
