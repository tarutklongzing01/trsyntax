import type { MetadataRoute } from 'next';
import { programs } from '@/lib/mock-data';
export const dynamic = 'force-static';
export default function sitemap():MetadataRoute.Sitemap{const base=process.env.NEXT_PUBLIC_SITE_URL||'https://trsyntax.vercel.app';return ['', '/software','/guides','/updates','/login','/register',...programs.map(p=>`/software/${p.slug}`)].map((path)=>({url:`${base}${path}`,lastModified:new Date(),changeFrequency:path.startsWith('/software')?'weekly':'monthly',priority:path===''?1:.8}));}
