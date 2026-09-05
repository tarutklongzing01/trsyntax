import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Clock3 } from 'lucide-react';
import { visiblePrograms } from '@/lib/mock-data';

export const metadata:Metadata={title:'อัปเดตโปรแกรม'};
export default function Updates(){return <main className="page-shell"><div className="shell page-hero"><p className="eyebrow">RELEASE NOTES</p><h1>อัปเดตล่าสุด</h1><p>ดูความเปลี่ยนแปลง ฟีเจอร์ใหม่ และการแก้ไขในแต่ละเวอร์ชัน</p></div><section className="shell content-section updates-list">{visiblePrograms.map((p,i)=><article className="update-item" key={p.id}><div className="timeline"><i/><span/></div><div><div className="update-meta"><span className="status-badge updated">{i===0?'NEW UPDATE':'UPDATED'}</span><span><Clock3/>{p.updatedAt}</span></div><h2>{p.name} <small>{p.version}</small></h2><ul>{p.changelog.map(c=><li key={c}><Check/>{c}</li>)}</ul><Link href={`/software/${p.slug}`}>ดูรายละเอียดเวอร์ชัน →</Link></div></article>)}</section></main>}
