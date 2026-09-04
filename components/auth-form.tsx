'use client';

import Link from 'next/link';
import { useState } from 'react';
import { LockKeyhole, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const [message,setMessage]=useState('');
  const submit=(e:React.FormEvent)=>{e.preventDefault();setMessage('โหมดตัวอย่างพร้อมใช้งาน — เชื่อม Firebase ผ่าน Environment Variables เพื่อเปิดระบบบัญชีจริง');};
  return <form className="auth-card" onSubmit={submit}><div className="auth-brand"><span className="brand-mark">TR</span><div><strong>{mode==='login'?'เข้าสู่ระบบ':'สร้างบัญชีใหม่'}</strong><p>{mode==='login'?'เข้าถึงโปรแกรมและ License ของคุณ':'เริ่มใช้งานเครื่องมือจาก TR-SYNTAX'}</p></div></div>
    {mode==='register'&&<label>ชื่อที่แสดง<input required placeholder="ชื่อของคุณ" /></label>}
    <label>อีเมล<div className="input-with-icon"><Mail/><input required type="email" placeholder="name@example.com" /></div></label>
    <label>รหัสผ่าน<div className="input-with-icon"><LockKeyhole/><input required type="password" minLength={6} placeholder="อย่างน้อย 6 ตัวอักษร" /></div></label>
    <Button className="auth-submit" type="submit">{mode==='login'?'เข้าสู่ระบบ':'สมัครสมาชิก'}</Button>
    <div className="auth-or"><span>หรือ</span></div><Button className="google-button" type="button" variant="outline" onClick={()=>setMessage('Google Login จะพร้อมใช้งานเมื่อเชื่อม Firebase')}><span aria-hidden="true">G</span> ดำเนินการด้วย Google</Button>
    {message&&<output className="form-message">{message}</output>}
    <p className="auth-switch">{mode==='login'?'ยังไม่มีบัญชี?':'มีบัญชีแล้ว?'} <Link href={mode==='login'?'/register':'/login'}>{mode==='login'?'สมัครสมาชิก':'เข้าสู่ระบบ'}</Link></p>
  </form>;
}
