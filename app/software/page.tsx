import type { Metadata } from 'next';
import { SoftwareExplorer } from '@/components/software/software-explorer';

export const metadata: Metadata = { title: 'โปรแกรมทั้งหมด', description: 'เลือกดาวน์โหลดและซื้อโปรแกรมจาก TR-SYNTAX' };
export default function SoftwarePage(){return <main className="page-shell"><div className="shell page-hero"><p className="eyebrow">SOFTWARE CATALOG</p><h1>โปรแกรมทั้งหมด</h1><p>เครื่องมือสำหรับงาน ECU, Tuning, ดาวน์โหลด และเสียง — ค้นหาโปรแกรมที่เหมาะกับงานของคุณ</p></div><section className="shell content-section"><SoftwareExplorer/></section></main>}
