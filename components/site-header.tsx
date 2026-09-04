'use client';

import Link from 'next/link';
import { Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import { useFirebaseUser } from '@/hooks/use-firebase-user';

const links = [
  ['หน้าแรก', '/'], ['โปรแกรมทั้งหมด', '/software'], ['หมวดหมู่', '/#categories'],
  ['คู่มือ / Guide', '/guides'], ['อัปเดต', '/updates'], ['ติดต่อเรา', '/#contact'],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user } = useFirebaseUser();
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="TR-SYNTAX Software Store">
          <span className="brand-mark">TR</span><span><strong>TR-SYNTAX</strong><small>SOFTWARE STORE</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="เมนูหลัก">
          {links.map(([label, href]) => <Link key={href + label} href={href}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <Link href="/software" className="icon-button" aria-label="ค้นหา"><Search size={19} /></Link>
          <Link href={user ? '/account' : '/login'} className="icon-button desktop-only" aria-label={user ? 'บัญชีของฉัน' : 'เข้าสู่ระบบ'} title={user?.displayName || user?.email || 'เข้าสู่ระบบ'}><UserRound size={19} /></Link>
          <Link href="/account/software" className="cart-button"><ShoppingBag size={18} /><span>My Software</span></Link>
          <button className="menu-button" aria-label={open ? 'ปิดเมนู' : 'เปิดเมนู'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && <nav className="mobile-nav" aria-label="เมนูมือถือ">{links.map(([label, href]) => <Link key={href + label} href={href} onClick={() => setOpen(false)}>{label}</Link>)}</nav>}
    </header>
  );
}
