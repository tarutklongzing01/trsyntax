import Link from 'next/link';
import { ArrowRight, CheckCircle2, Download, Gauge, Headphones, ShieldCheck, Sparkles, Wrench } from 'lucide-react';
import { ProgramCard } from '@/components/software/program-card';
import { categories, programs } from '@/lib/mock-data';

const categoryIcons = [Gauge, Wrench, Download, Headphones, Sparkles, ArrowRight];

export default function Home() {
  return <main>
    <section className="hero"><div className="hero-grid" aria-hidden="true" /><div className="shell hero-inner">
      <div className="hero-copy"><p className="kicker"><span /> TOOLS FOR REAL PERFORMANCE</p><h1><span>TR-SYNTAX</span>SOFTWARE<br />STORE</h1>
        <p className="hero-lead">รวมโปรแกรมสายแต่ง <strong>สายใช้งานจริง</strong></p><p className="hero-sub">พัฒนาโดยคนไทย เพื่อสายซิ่ง สายแต่ง และทุกการใช้งานของคุณ</p>
        <div className="hero-actions"><Link className="btn btn-primary btn-lg" href="/software">เลือกดูโปรแกรมทั้งหมด <ArrowRight size={18} /></Link><Link className="btn btn-outline btn-lg" href="#featured">ดูตัวอย่างโปรแกรม</Link></div>
        <div className="trust-line"><span><CheckCircle2 size={15} /> ไฟล์สะอาด</span><span><CheckCircle2 size={15} /> ไม่มีโฆษณา</span><span><CheckCircle2 size={15} /> อัปเดตต่อเนื่อง</span></div>
      </div>
      <div className="app-showcase" aria-label="ตัวอย่างหน้าต่างโปรแกรม TR ECU Editor"><div className="showcase-top"><span className="mini-brand">TR</span><b>TR ECU EDITOR</b><div className="window-dots"><i /><i /><i /></div></div>
        <div className="showcase-body"><div className="tool-rail"><i /><i /><i /><i /></div><div className="tuning-panel"><div className="panel-head"><span>FUEL MAP / RPM</span><small>LIVE VIEW</small></div><div className="chart-bars">{[48,70,58,88,74,96,81,66,77,53,69,42].map((h,i)=><i key={i} style={{height:`${h}%`}} />)}</div><div className="data-row"><span>RPM<strong>8,450</strong></span><span>AFR<strong>12.8</strong></span><span>LOAD<strong>87%</strong></span></div></div></div>
        <div className="showcase-status"><span><i /> ECU CONNECTED</span><b>READY TO TUNE</b></div>
      </div>
    </div></section>
    <section className="feature-strip"><div className="shell feature-grid">{[[ShieldCheck,'ใช้งานง่าย','ไม่มีโฆษณา'],[CheckCircle2,'ปลอดภัย','ไฟล์สะอาด 100%'],[Sparkles,'อัปเดตต่อเนื่อง','พัฒนาตลอด'],[Headphones,'พร้อมช่วยเหลือ','มีคู่มือและ Support']].map(([Icon,title,sub])=><div className="feature" key={String(title)}><Icon /><span><strong>{String(title)}</strong><small>{String(sub)}</small></span></div>)}</div></section>
    <section className="section shell" id="categories"><div className="section-head"><div><p className="eyebrow">EXPLORE BY CATEGORY</p><h2>เลือกเครื่องมือที่ใช่</h2></div><Link href="/software">ดูทั้งหมด <ArrowRight size={17} /></Link></div>
      <div className="category-grid">{categories.map(([title,desc],i)=>{const Icon=categoryIcons[i];return <Link href={title==='All Programs'?'/software':`/software?category=${encodeURIComponent(title)}`} className="category-card" key={title}><span className="category-icon"><Icon /></span><div><h3>{title}</h3><p>{desc}</p></div><ArrowRight className="category-arrow" /></Link>})}</div>
    </section>
    <section className="section shell" id="featured"><div className="section-head"><div><p className="eyebrow">FEATURED SOFTWARE</p><h2>โปรแกรมแนะนำ</h2><p>เครื่องมือที่สร้างมาเพื่อให้งานเร็วขึ้นและแม่นยำกว่าเดิม</p></div><Link href="/software">โปรแกรมทั้งหมด <ArrowRight size={17} /></Link></div><div className="program-grid">{programs.map(p=><ProgramCard key={p.id} program={p} />)}</div></section>
    <section className="cta-section shell" id="contact"><div><p className="eyebrow">TR-SYNTAX SUPPORT</p><h2>ติดตั้งไม่เป็น หรือใช้งานติดขัด?</h2><p>ดูคู่มือแบบทีละขั้นตอน หรือติดต่อทีมพัฒนาได้โดยตรง</p></div><div><Link className="btn btn-outline btn-lg" href="/guides">เปิดคู่มือ / Guide</Link><a className="btn btn-primary btn-lg" href="mailto:support@trsyntax.dev">ติดต่อเรา</a></div></section>
    <footer><div className="shell footer-inner"><div><strong>TR-SYNTAX</strong><span>SOFTWARE STORE</span></div><p>© 2026 TR-SYNTAX. Tools for real performance.</p></div></footer>
  </main>;
}
