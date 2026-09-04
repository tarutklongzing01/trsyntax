import type { Metadata } from 'next';
import { ArrowUpRight, CalendarDays, Eye, HardDriveDownload, Settings, SlidersHorizontal, TriangleAlert } from 'lucide-react';

export const metadata: Metadata={title:'คู่มือ / Guide',description:'คู่มือการติดตั้งและใช้งานโปรแกรม TR-SYNTAX'};
const guides=[
  ['วิธีติดตั้ง TR File Tools บน Windows 11','Installation','28 ส.ค. 2026','1,248',HardDriveDownload],
  ['เริ่มจัดระเบียบไฟล์ด้วย TR File Tools','How To Use','25 ส.ค. 2026','986',Settings],
  ['ตั้งค่า Preset ให้ทำงานซ้ำได้เร็วขึ้น','Productivity','18 ส.ค. 2026','2,403',SlidersHorizontal],
  ['แก้ปัญหาโปรแกรมมองไม่เห็น K-Line','Troubleshooting','12 ส.ค. 2026','752',TriangleAlert],
];
export default function Guides(){return <main className="page-shell"><div className="shell page-hero"><p className="eyebrow">KNOWLEDGE BASE</p><h1>คู่มือ / Guide</h1><p>เริ่มต้นได้เร็วขึ้นด้วยขั้นตอนที่ชัดเจน ตั้งแต่ติดตั้ง ใช้งาน ไปจนถึงแก้ปัญหา</p></div><section className="shell content-section"><div className="guide-categories">{['ทั้งหมด','Installation','How To Use','Productivity','Troubleshooting','Update Guide'].map((x,i)=><button className={i===0?'active':''} key={x}>{x}</button>)}</div><div className="guides-grid">{guides.map(([title,category,date,views,Icon],i)=><article className="guide-card" key={String(title)}><div className={`guide-visual guide-${i}`}><Icon/><span>0{i+1}</span></div><div className="guide-content"><p className="eyebrow">{String(category)}</p><h2>{String(title)}</h2><div><span><CalendarDays/>{String(date)}</span><span><Eye/>{String(views)}</span><ArrowUpRight/></div></div></article>)}</div></section></main>}
