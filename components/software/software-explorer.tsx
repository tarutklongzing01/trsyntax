'use client';

import { Search, SlidersHorizontal } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { visiblePrograms, visibleProgramSlugs } from '@/lib/mock-data';
import { getPublishedPrograms } from '@/lib/firebase/programs';
import type { SoftwareProgram } from '@/types';
import { ProgramCard } from './program-card';

const filters = ['ทั้งหมด', 'File Tools', 'PDF Tools', 'Downloader', 'Music Tools'];

export function SoftwareExplorer() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('ทั้งหมด');
  const [availablePrograms, setAvailablePrograms] = useState<SoftwareProgram[]>(visiblePrograms);

  useEffect(() => {
    void getPublishedPrograms().then((items) => {
      setAvailablePrograms(items.filter((program) => visibleProgramSlugs.has(program.slug)));
    });
  }, []);

  const found = useMemo(() => availablePrograms.filter((p) => {
    const text = `${p.name} ${p.description} ${p.category}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (category === 'ทั้งหมด' || p.category === category);
  }), [availablePrograms, query, category]);

  return <>
    <div className="explorer-toolbar">
      <label className="search-field"><Search size={19} /><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="ค้นหาชื่อโปรแกรม หมวดหมู่ หรือความสามารถ..." aria-label="ค้นหาโปรแกรม" /></label>
      <div className="filter-label"><SlidersHorizontal size={17} /> หมวดหมู่</div>
      <div className="filter-pills">{filters.map(f=><button key={f} className={category===f?'active':''} onClick={()=>setCategory(f)}>{f}</button>)}</div>
    </div>
    <div className="result-line"><strong>{found.length}</strong> โปรแกรมที่พบ</div>
    {found.length ? <div className="program-grid listing-grid">{found.map(p=><ProgramCard key={p.id} program={p} />)}</div> : <div className="empty-state"><Search /><h2>ไม่พบโปรแกรม</h2><p>ลองใช้คำค้นอื่นหรือเลือกหมวดหมู่ “ทั้งหมด”</p></div>}
  </>;
}
