import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import '@fontsource/ibm-plex-sans-thai/400.css';
import '@fontsource/ibm-plex-sans-thai/500.css';
import '@fontsource/ibm-plex-sans-thai/600.css';
import '@fontsource/ibm-plex-sans-thai/700.css';
import '@fontsource/chakra-petch/500.css';
import '@fontsource/chakra-petch/600.css';
import '@fontsource/chakra-petch/700.css';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'TR-SYNTAX Software Store', template: '%s | TR-SYNTAX' },
  description: 'รวมโปรแกรมและเครื่องมือจาก TR-SYNTAX',
  openGraph: { title: 'TR-SYNTAX Software Store', description: 'รวมโปรแกรมและเครื่องมือจาก TR-SYNTAX', type: 'website' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="th"><body><SiteHeader />{children}</body></html>;
}
