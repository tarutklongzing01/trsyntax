import Link from 'next/link';
import { ArrowUpRight, Download, Monitor } from 'lucide-react';
import type { SoftwareProgram } from '@/types';

export function ProgramCard({ program }: { program: SoftwareProgram }) {
  const hasImage = Boolean(program.image);

  return (
    <article className="program-card">
      <div className={`program-visual${hasImage ? ' has-image' : ''}`} style={{ '--accent': program.accent } as React.CSSProperties}>
        {hasImage ? <img className="program-screenshot" src={program.image} alt={`หน้าจอโปรแกรม ${program.name}`} /> : <><div className="window-dots"><i /><i /><i /></div><span className="program-code">{program.name.slice(0, 2).toUpperCase()}</span><div className="visual-lines"><i /><i /><i /></div></>}
        <span className={`status-badge ${program.status.toLowerCase()}`}>{program.status}</span>
      </div>
      <div className="program-content">
        <div className="program-heading"><div><p className="eyebrow">{program.category}</p><h3>{program.name}</h3></div><span className="version">{program.version}</span></div>
        <p className="program-description">{program.description}</p>
        <div className="compat"><Monitor size={15} /> {program.platform}</div>
        <div className="price-row"><strong>{program.price === 0 ? 'ดาวน์โหลดฟรี' : `${program.price.toLocaleString('th-TH')} THB`}</strong></div>
        <div className="card-actions">
          <Link className="btn btn-primary" href={`/software/${program.slug}`}>{program.type === 'FREE' ? <Download size={17} /> : <span aria-hidden="true">฿</span>} {program.type === 'FREE' ? 'ดาวน์โหลด' : 'ซื้อเลย'}</Link>
          <Link className="btn btn-ghost" href={`/software/${program.slug}`}>รายละเอียด <ArrowUpRight size={16} /></Link>
        </div>
      </div>
    </article>
  );
}
