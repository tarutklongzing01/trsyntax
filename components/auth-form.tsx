'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoaderCircle, LockKeyhole, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { loginWithEmail, loginWithGoogle, registerWithEmail } from '@/lib/firebase/auth';

const authMessages: Record<string, string> = {
  'auth/email-already-in-use': 'อีเมลนี้ถูกใช้งานแล้ว',
  'auth/invalid-credential': 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
  'auth/invalid-email': 'รูปแบบอีเมลไม่ถูกต้อง',
  'auth/weak-password': 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร',
  'auth/popup-closed-by-user': 'ยกเลิกการเข้าสู่ระบบด้วย Google',
  'auth/operation-not-allowed': 'ยังไม่ได้เปิดผู้ให้บริการเข้าสู่ระบบใน Firebase',
};

export function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const run = async (action: () => Promise<unknown>) => {
    setLoading(true); setMessage('');
    try { await action(); router.push('/account'); }
    catch (error) {
      const code = typeof error === 'object' && error && 'code' in error ? String(error.code) : '';
      setMessage(authMessages[code] || 'เชื่อมต่อ Firebase ไม่สำเร็จ กรุณาลองอีกครั้ง');
    } finally { setLoading(false); }
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    void run(() => mode === 'login' ? loginWithEmail(email, password) : registerWithEmail(name, email, password));
  };

  return <form className="auth-card" onSubmit={submit}><div className="auth-brand"><span className="brand-mark">TR</span><div><strong>{mode==='login'?'เข้าสู่ระบบ':'สร้างบัญชีใหม่'}</strong><p>{mode==='login'?'เข้าถึงโปรแกรมและ License ของคุณ':'เริ่มใช้งานเครื่องมือจาก TR-SYNTAX'}</p></div></div>
    {mode==='register'&&<label>ชื่อที่แสดง<input required value={name} onChange={(e)=>setName(e.target.value)} autoComplete="name" placeholder="ชื่อของคุณ" /></label>}
    <label>อีเมล<div className="input-with-icon"><Mail/><input required value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete="email" type="email" placeholder="name@example.com" /></div></label>
    <label>รหัสผ่าน<div className="input-with-icon"><LockKeyhole/><input required value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete={mode==='login'?'current-password':'new-password'} type="password" minLength={6} placeholder="อย่างน้อย 6 ตัวอักษร" /></div></label>
    <Button className="auth-submit" type="submit" disabled={loading}>{loading?<LoaderCircle className="spin"/>:null}{mode==='login'?'เข้าสู่ระบบ':'สมัครสมาชิก'}</Button>
    <div className="auth-or"><span>หรือ</span></div><Button className="google-button" type="button" variant="outline" disabled={loading} onClick={()=>void run(loginWithGoogle)}><span aria-hidden="true">G</span> ดำเนินการด้วย Google</Button>
    {message&&<output className="form-message">{message}</output>}
    <p className="auth-switch">{mode==='login'?'ยังไม่มีบัญชี?':'มีบัญชีแล้ว?'} <Link href={mode==='login'?'/register':'/login'}>{mode==='login'?'สมัครสมาชิก':'เข้าสู่ระบบ'}</Link></p>
  </form>;
}
