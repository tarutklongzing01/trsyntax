import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Sites keeps the static export. Vercel needs its native output so `/api/*`
  // files are deployed as serverless functions alongside the storefront.
  output: process.env.VERCEL === '1' ? undefined : 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
