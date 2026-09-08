'use client';

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ZoomIn } from 'lucide-react';
import type { SoftwareProgram } from '@/types';

export function ScreenshotGallery({ name, screenshots }: { name: string; screenshots?: SoftwareProgram['screenshots'] }) {
  if (screenshots?.length) {
    return <div className="screenshot-grid">{screenshots.map((screenshot) => <Dialog key={screenshot.src}>
      <DialogTrigger className="screenshot-trigger real-screenshot-trigger" aria-label={`เปิดภาพ ${screenshot.label}`}>
        <img className="gallery-thumbnail" src={screenshot.src} alt={screenshot.alt} />
        <span className="gallery-overlay"><ZoomIn aria-hidden="true" />{screenshot.label}</span>
      </DialogTrigger>
      <DialogContent className="gallery-dialog real-gallery-dialog">
        <DialogTitle>{name} — {screenshot.label}</DialogTitle>
        <DialogDescription>ภาพหน้าจอจริงของ {name}</DialogDescription>
        <img className="gallery-full-image" src={screenshot.src} alt={screenshot.alt} />
      </DialogContent>
    </Dialog>)}</div>;
  }

  const labels = ['Main Workspace', 'Live Data View', 'Settings & Logs'];
  return <div className="screenshot-grid">{labels.map((label,i)=><Dialog key={label}>
    <DialogTrigger className="screenshot-trigger" aria-label={`เปิดภาพ ${label}`}>
      <MockScreenshot name={name} label={label} variant={i} />
    </DialogTrigger>
    <DialogContent className="gallery-dialog">
      <DialogTitle>{name} — {label}</DialogTitle><DialogDescription>ตัวอย่างหน้าจอโปรแกรมสำหรับรอบ Mock Data</DialogDescription>
      <MockScreenshot name={name} label={label} variant={i} />
    </DialogContent>
  </Dialog>)}</div>;
}

function MockScreenshot({ name, label, variant }: { name:string; label:string; variant:number }) {
  return <div className={`mock-shot shot-${variant}`}><div className="mock-bar"><i/><i/><i/><b>{name}</b></div><div className="mock-body"><aside><i/><i/><i/><i/></aside><section><small>{label}</small><h4>{variant===1?'LIVE DATA STREAM':variant===2?'APPLICATION SETTINGS':'PROJECT WORKSPACE'}</h4><div className="mock-metrics"><i/><i/><i/></div><div className="mock-graph">{[35,65,45,85,60,92,72,50].map((h,n)=><i key={n} style={{height:`${h}%`}}/>)}</div></section></div></div>;
}
