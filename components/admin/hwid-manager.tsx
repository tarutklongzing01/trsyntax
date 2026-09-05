'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Ban, Check, Copy, KeyRound, Link2, LoaderCircle, Monitor, Plus, RotateCcw, Search, Trash2 } from 'lucide-react';
import { visiblePrograms } from '@/lib/mock-data';
import { createHwidLicense, removeHwidLicense, resetHwidLicense, setHwidLicenseStatus, subscribeHwidLicenses, type HwidLicense } from '@/lib/firebase/hwid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

function generateLicenseKey() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  const body = Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join('');
  return `TRSYN-${body.slice(0, 4)}-${body.slice(4, 8)}-${body.slice(8, 12)}`;
}

function expired(license: HwidLicense) {
  return Boolean(license.expiresAt && new Date(license.expiresAt).getTime() < Date.now());
}

export function HwidManager() {
  const [licenses, setLicenses] = useState<HwidLicense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [machineFilter, setMachineFilter] = useState('all');
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState('');
  const [pendingDelete, setPendingDelete] = useState<HwidLicense | null>(null);
  const [form, setForm] = useState({ licenseKey: '', customerName: '', email: '', programId: visiblePrograms[0]?.id || '', expiresAt: '' });

  useEffect(() => {
    let unsubscribe = () => {};
    try {
      unsubscribe = subscribeHwidLicenses((items) => { setLicenses(items); setLoading(false); }, (reason) => { setError(reason.message || 'โหลดข้อมูลไลเซนส์ไม่สำเร็จ'); setLoading(false); });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'โหลดข้อมูลไลเซนส์ไม่สำเร็จ');
      setLoading(false);
    }
    return unsubscribe;
  }, []);

  const stats = useMemo(() => ({
    total: licenses.length,
    active: licenses.filter((license) => license.status === 'active' && !expired(license)).length,
    linked: licenses.filter((license) => Boolean(license.hwid)).length,
    blocked: licenses.filter((license) => license.status === 'disabled' || expired(license)).length,
  }), [licenses]);

  const filtered = useMemo(() => licenses.filter((license) => {
    const text = `${license.licenseKey} ${license.customerName} ${license.email} ${license.programName} ${license.hwid}`.toLowerCase();
    const matchesStatus = statusFilter === 'all' || (statusFilter === 'expired' ? expired(license) : license.status === statusFilter);
    const matchesMachine = machineFilter === 'all' || (machineFilter === 'linked' ? Boolean(license.hwid) : !license.hwid);
    return text.includes(query.toLowerCase()) && matchesStatus && matchesMachine;
  }), [licenses, machineFilter, query, statusFilter]);

  function startCreate() {
    setForm({ licenseKey: generateLicenseKey(), customerName: '', email: '', programId: visiblePrograms[0]?.id || '', expiresAt: '' });
    setMessage('');
    setOpen(true);
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    const program = visiblePrograms.find((item) => item.id === form.programId);
    if (!program) return;
    setBusy('create'); setError('');
    try {
      await createHwidLicense({ ...form, programName: program.name });
      setOpen(false); setMessage('เพิ่มไลเซนส์เรียบร้อยแล้ว');
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'เพิ่มไลเซนส์ไม่สำเร็จ'); }
    finally { setBusy(''); }
  }

  async function run(id: string, action: () => Promise<void>, success: string) {
    setBusy(id); setError('');
    try { await action(); setMessage(success); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'บันทึกข้อมูลไม่สำเร็จ'); }
    finally { setBusy(''); }
  }

  return <>
    <header className="hwid-header"><div><p>LICENSE MANAGEMENT</p><h1>จัดการ HWID</h1><small>สร้างไลเซนส์ ผูกเครื่อง และควบคุมสิทธิ์การใช้งาน</small></div><Button className="admin-add" onClick={startCreate}><Plus/> เพิ่มไลเซนส์</Button></header>
    <section className="hwid-stats"><article className="cyan"><span><KeyRound/></span><div><p>ไลเซนส์ทั้งหมด</p><strong>{stats.total}</strong></div></article><article className="green"><span><Check/></span><div><p>เปิดใช้งาน</p><strong>{stats.active}</strong></div></article><article className="violet"><span><Monitor/></span><div><p>ผูกเครื่องแล้ว</p><strong>{stats.linked}</strong></div></article><article className="red"><span><Ban/></span><div><p>ปิด / หมดอายุ</p><strong>{stats.blocked}</strong></div></article></section>
    {(error || message) && <div className={`hwid-message ${error ? 'error' : 'success'}`}>{error || message}</div>}
    <section className="admin-panel hwid-panel">
      <div className="hwid-panel-title"><div><h2>รายการไลเซนส์</h2><p>{filtered.length} รายการที่แสดง</p></div><span>Firestore · hwidLicenses</span></div>
      <div className="hwid-toolbar"><label><Search/><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ค้นหาคีย์ ชื่อลูกค้า อีเมล โปรแกรม หรือ HWID..." aria-label="ค้นหาไลเซนส์"/></label><NativeSelect value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="กรองสถานะ"><NativeSelectOption value="all">ทุกสถานะ</NativeSelectOption><NativeSelectOption value="active">เปิดใช้งาน</NativeSelectOption><NativeSelectOption value="disabled">ปิดใช้งาน</NativeSelectOption><NativeSelectOption value="expired">หมดอายุ</NativeSelectOption></NativeSelect><NativeSelect value={machineFilter} onChange={(event) => setMachineFilter(event.target.value)} aria-label="กรองการผูกเครื่อง"><NativeSelectOption value="all">ทุกเครื่อง</NativeSelectOption><NativeSelectOption value="linked">ผูกแล้ว</NativeSelectOption><NativeSelectOption value="unlinked">ยังไม่ผูก</NativeSelectOption></NativeSelect></div>
      <div className="table-scroll"><table className="hwid-table"><thead><tr><th>LICENSE KEY</th><th>ลูกค้า / โปรแกรม</th><th>เครื่องที่ผูก</th><th>หมดอายุ</th><th>สถานะ</th><th>จัดการ</th></tr></thead><tbody>
        {loading && <tr><td colSpan={6} className="hwid-empty"><LoaderCircle className="spin"/> กำลังโหลดไลเซนส์...</td></tr>}
        {!loading && filtered.length === 0 && <tr><td colSpan={6} className="hwid-empty">ยังไม่มีไลเซนส์ที่ตรงกับตัวกรอง</td></tr>}
        {filtered.map((license) => {
          const isExpired = expired(license); const isBusy = busy === license.id;
          return <tr key={license.id}><td><button className="license-key-copy" onClick={() => void navigator.clipboard.writeText(license.licenseKey)} title="คัดลอก License Key"><code>{license.licenseKey}</code><Copy/></button></td><td><strong>{license.customerName}</strong><small>{license.email || 'ไม่มีอีเมล'} · {license.programName}</small></td><td>{license.hwid ? <code className="hwid-code"><Link2/>{license.hwid}</code> : <span className="unlinked">ยังไม่ผูกเครื่อง</span>}</td><td>{license.expiresAt ? new Date(license.expiresAt).toLocaleDateString('th-TH') : 'ไม่หมดอายุ'}</td><td><span className={`hwid-status ${isExpired ? 'expired' : license.status}`}>{isExpired ? 'หมดอายุ' : license.status === 'active' ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}</span></td><td><div className="hwid-actions"><Button variant="outline" size="sm" disabled={isBusy || !license.hwid} onClick={() => void run(license.id, () => resetHwidLicense(license.id), 'รีเซ็ตเครื่องเรียบร้อยแล้ว')}><RotateCcw/> รีเซ็ต</Button><Button variant="outline" size="sm" disabled={isBusy} onClick={() => void run(license.id, () => setHwidLicenseStatus(license.id, license.status === 'active' ? 'disabled' : 'active'), 'อัปเดตสถานะเรียบร้อยแล้ว')}>{license.status === 'active' ? <Ban/> : <Check/>}{license.status === 'active' ? 'ปิด' : 'เปิด'}</Button><Button variant="destructive" size="icon-sm" disabled={isBusy} onClick={() => setPendingDelete(license)} aria-label={`ลบไลเซนส์ ${license.licenseKey}`}><Trash2/></Button></div></td></tr>;
        })}
      </tbody></table></div>
    </section>
    <Dialog open={open} onOpenChange={setOpen}><DialogContent className="hwid-dialog"><DialogHeader><DialogTitle>เพิ่มไลเซนส์ใหม่</DialogTitle><DialogDescription>สร้างคีย์สำหรับผูกกับเครื่องของลูกค้า</DialogDescription></DialogHeader><form onSubmit={submit} className="hwid-form"><label>License Key<Input required value={form.licenseKey} onChange={(event) => setForm({ ...form, licenseKey: event.target.value.trim().toUpperCase() })}/></label><div><label>ชื่อลูกค้า<Input required value={form.customerName} onChange={(event) => setForm({ ...form, customerName: event.target.value })} placeholder="ชื่อผู้ใช้งาน"/></label><label>อีเมล<Input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="name@example.com"/></label></div><div><label>โปรแกรม<NativeSelect value={form.programId} onChange={(event) => setForm({ ...form, programId: event.target.value })}>{visiblePrograms.map((program) => <NativeSelectOption value={program.id} key={program.id}>{program.name}</NativeSelectOption>)}</NativeSelect></label><label>วันหมดอายุ <small>(เว้นว่าง = ถาวร)</small><Input type="date" value={form.expiresAt} onChange={(event) => setForm({ ...form, expiresAt: event.target.value })}/></label></div><DialogFooter><Button type="button" variant="outline" onClick={() => setOpen(false)}>ยกเลิก</Button><Button type="submit" disabled={busy === 'create'}>{busy === 'create' ? <LoaderCircle className="spin"/> : <Plus/>} สร้างไลเซนส์</Button></DialogFooter></form></DialogContent></Dialog>
    <AlertDialog open={Boolean(pendingDelete)} onOpenChange={(next) => !next && setPendingDelete(null)}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>ลบไลเซนส์นี้หรือไม่?</AlertDialogTitle><AlertDialogDescription>คีย์ {pendingDelete?.licenseKey} จะไม่สามารถใช้งานได้อีก การดำเนินการนี้ย้อนกลับไม่ได้</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>ยกเลิก</AlertDialogCancel><AlertDialogAction variant="destructive" onClick={() => { if (!pendingDelete) return; const target = pendingDelete; setPendingDelete(null); void run(target.id, () => removeHwidLicense(target.id), 'ลบไลเซนส์เรียบร้อยแล้ว'); }}>ลบไลเซนส์</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
  </>;
}
