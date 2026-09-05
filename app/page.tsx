import Link from 'next/link';
import { ArrowRight, BriefcaseBusiness, CheckCircle2, Download, Files, Headphones, ShieldCheck, Sparkles, Wrench } from 'lucide-react';
import { ProgramCard } from '@/components/software/program-card';
import { categories, programs } from '@/lib/mock-data';

const categoryIcons = [Files, BriefcaseBusiness, Download, Headphones, Wrench, ArrowRight];

export default function Home() {
  return <main>
    <section className="hero"><div className="hero-grid" aria-hidden="true" /><div className="shell hero-inner">
      <div className="hero-copy"><p className="kicker"><span /> TOOLS FOR EVERYDAY WORK</p><h1><span>TR-SYNTAX</span>SOFTWARE<br />STORE</h1>
        <p className="hero-lead">รวมโปรแกรมใช้งานจริง <strong>ครบ จบ ใช้ง่าย</strong></p><p className="hero-sub">เครื่องมือสำหรับจัดการไฟล์ รูปภาพ ดาวน์โหลด งานเสียง และงานประจำวัน พัฒนาโดยคนไทย</p>
        <div className="hero-actions"><Link className="btn btn-primary btn-lg" href="/software">เลือกดูโปรแกรมทั้งหมด <ArrowRight size={18} /></Link><Link className="btn btn-outline btn-lg" href="#featured">ดูตัวอย่างโปรแกรม</Link></div>
        <div className="trust-line"><span><CheckCircle2 size={15} /> ไฟล์สะอาด</span><span><CheckCircle2 size={15} /> ไม่มีโฆษณา</span><span><CheckCircle2 size={15} /> อัปเดตต่อเนื่อง</span></div>
      </div>
      <div className="app-showcase" aria-label="ตัวอย่างหน้าต่างโปรแกรม TR-SYNTAX DL"><div className="showcase-top"><span className="mini-brand">TR</span><b>TR-SYNTAX DL v1.4.0</b><div className="window-dots"><i /><i /><i /></div></div>
        <div className="showcase-body"><div className="tool-rail"><i /><i /><i /><i /></div><div className="tuning-panel"><div className="panel-head"><span>DOWNLOAD QUEUE</span><small>LIVE PROGRESS</small></div><div className="chart-bars">{[48,70,58,88,74,96,81,66,77,53,69,42].map((h,i)=><i key={i} style={{height:`${h}%`}} />)}</div><div className="data-row"><span>FORMAT<strong>MP4</strong></span><span>QUALITY<strong>1080p</strong></span><span>PROGRESS<strong>100%</strong></span></div></div></div>
        <div className="showcase-status"><span><i /> DOWNLOAD COMPLETE</span><b>READY TO USE</b></div>
      </div>
    </div></section>
    <section className="feature-strip"><div className="shell feature-grid">{[[ShieldCheck,'ใช้งานง่าย','ไม่มีโฆษณา'],[CheckCircle2,'ปลอดภัย','ไฟล์สะอาด 100%'],[Sparkles,'อัปเดตต่อเนื่อง','พัฒนาตลอด'],[Headphones,'พร้อมช่วยเหลือ','มีคู่มือและ Support']].map(([Icon,title,sub])=><div className="feature" key={String(title)}><Icon /><span><strong>{String(title)}</strong><small>{String(sub)}</small></span></div>)}</div></section>
    <section className="section shell" id="categories"><div className="section-head"><div><p className="eyebrow">EXPLORE BY CATEGORY</p><h2>เลือกเครื่องมือที่ใช่</h2></div><Link href="/software">ดูทั้งหมด <ArrowRight size={17} /></Link></div>
      <div className="category-grid">{categories.map(([title,desc],i)=>{const Icon=categoryIcons[i];return <Link href={title==='All Programs'?'/software':`/software?category=${encodeURIComponent(title)}`} className="category-card" key={title}><span className="category-icon"><Icon /></span><div><h3>{title}</h3><p>{desc}</p></div><ArrowRight className="category-arrow" /></Link>})}</div>
    </section>
    <section className="section shell" id="featured"><div className="section-head"><div><p className="eyebrow">FEATURED SOFTWARE</p><h2>โปรแกรมแนะนำ</h2><p>เครื่องมือที่สร้างมาเพื่อให้งานเร็วขึ้นและแม่นยำกว่าเดิม</p></div><Link href="/software">โปรแกรมทั้งหมด <ArrowRight size={17} /></Link></div><div className="program-grid">{programs.map(p=><ProgramCard key={p.id} program={p} />)}</div></section>
    <section className="cta-section shell" id="contact"><div><p className="eyebrow">TR-SYNTAX SUPPORT</p><h2>ติดตั้งไม่เป็น หรือใช้งานติดขัด?</h2><p>ดูคู่มือแบบทีละขั้นตอน หรือติดต่อทีมพัฒนาได้โดยตรง</p></div><div><Link className="btn btn-outline btn-lg" href="/guides">เปิดคู่มือ / Guide</Link><a className="btn btn-primary btn-lg" href="mailto:support@trsyntax.dev">ติดต่อเรา</a></div></section>
    <footer><div className="shell footer-inner"><div><strong>TR-SYNTAX</strong><span>SOFTWARE STORE</span></div><p>© 2026 TR-SYNTAX. Tools for everyday work.</p></div></footer>
  </main>;
}
