'use client';

import { Download, LoaderCircle, LockKeyhole } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFirebaseUser } from '@/hooks/use-firebase-user';

export function DownloadButton({ downloadUrl, returnTo, className = '' }: { downloadUrl: string; returnTo: string; className?: string }) {
  const router = useRouter();
  const { user, loading } = useFirebaseUser();

  const handleDownload = () => {
    if (!user) {
      router.push(`/login?next=${encodeURIComponent(returnTo)}`);
      return;
    }

    window.open(downloadUrl, '_blank', 'noopener,noreferrer');
  };

  return <button type="button" className={`btn btn-primary ${className}`.trim()} onClick={handleDownload} disabled={loading}>
    {loading ? <LoaderCircle className="spin" aria-hidden="true" /> : user ? <Download aria-hidden="true" /> : <LockKeyhole aria-hidden="true" />}
    {loading ? 'กำลังตรวจสอบ...' : user ? 'ดาวน์โหลด' : 'เข้าสู่ระบบเพื่อโหลด'}
  </button>;
}
