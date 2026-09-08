'use client';

import { useState } from 'react';
import { BarChart3, BookOpen, Boxes, Download, FolderTree, KeyRound, LayoutDashboard, ListRestart, Plus, Settings, Users } from 'lucide-react';
import { programs } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { HwidManager } from './hwid-manager';
import { UserManager } from './user-manager';

const nav = [
  ['Dashboard', LayoutDashboard, 'dashboard'], ['Programs', Boxes, ''], ['Categories', FolderTree, ''],
  ['Versions', ListRestart, ''], ['Guides', BookOpen, ''], ['Users', Users, 'users'],
  ['HWID', KeyRound, 'hwid'], ['Downloads', Download, ''], ['Settings', Settings, ''],
] as const;

export function AdminShell({ initialView = 'dashboard' }: { initialView?: 'dashboard' | 'users' | 'hwid' }) {
  const [view, setView] = useState<'dashboard' | 'users' | 'hwid'>(initialView);
  function changeView(target: 'dashboard' | 'users' | 'hwid') {
    setView(target);
    window.history.replaceState(null, '', target === 'dashboard' ? '/admin' : `/admin/${target}`);
  }
  return <div className="admin-app">
    <aside className="admin-sidebar">
      <div className="admin-logo"><span className="brand-mark">TR</span><div><strong>TR-SYNTAX</strong><small>ADMIN CONSOLE</small></div></div>
      <nav>{nav.map(([label, Icon, target]) => <button className={view === target ? 'active' : ''} key={label} onClick={() => target && changeView(target)}><Icon/>{label}</button>)}</nav>
      <div className="admin-user"><span>TS</span><div><strong>TR-SYNTAX Admin</strong><small>Firebase Admin</small></div></div>
    </aside>
    <main className="admin-main">{view === 'hwid' ? <HwidManager/> : view === 'users' ? <UserManager/> : <Dashboard/>}</main>
  </div>;
}

function Dashboard() {
  return <>
      <header><div><p>ยินดีต้อนรับกลับ</p><h1>Dashboard Overview</h1></div><Button className="admin-add"><Plus/> เพิ่มโปรแกรม</Button></header>
      <section className="stat-grid">{[
        ['Programs', '4', '+1 เดือนนี้', Boxes], ['Users', '1,284', '+86 เดือนนี้', Users],
        ['Downloads', '8,492', '+14.2%', Download], ['Paid Software', '2', '50% ของทั้งหมด', KeyRound],
        ['Free Software', '2', '50% ของทั้งหมด', BarChart3],
      ].map(([label, value, sub, Icon]) => <article key={String(label)}><Icon/><p>{String(label)}</p><strong>{String(value)}</strong><small>{String(sub)}</small></article>)}</section>
      <div className="admin-grid">
        <section className="admin-panel program-table"><div className="panel-title"><h2>Programs</h2><button>ดูทั้งหมด</button></div><div className="table-scroll"><table><thead><tr><th>Program</th><th>Version</th><th>Type</th><th>Status</th><th>Downloads</th></tr></thead><tbody>{programs.map((program, index) => <tr key={program.id}><td><span className="table-icon">{program.name.slice(0, 2)}</span><strong>{program.name}</strong></td><td>{program.version}</td><td>{program.type}</td><td><i className="published">Published</i></td><td>{[3240, 1854, 2210, 1188][index].toLocaleString()}</td></tr>)}</tbody></table></div></section>
        <section className="admin-panel"><div className="panel-title"><h2>Latest Updates</h2></div><div className="activity-list">{programs.slice(0, 3).map((program) => <div key={program.id}><span>{program.name.slice(0, 2)}</span><p><strong>{program.name}</strong><small>{program.version} · {program.updatedAt}</small></p></div>)}</div></section>
      </div>
  </>;
}
