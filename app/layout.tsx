import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'TR-SYNTAX Software Store', template: '%s | TR-SYNTAX' },
  description: 'รวมโปรแกรมและเครื่องมือจาก TR-SYNTAX',
  openGraph: { title: 'TR-SYNTAX Software Store', description: 'รวมโปรแกรมและเครื่องมือจาก TR-SYNTAX', type: 'website' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="th"><body><SiteHeader />{children}</body></html>;
}
