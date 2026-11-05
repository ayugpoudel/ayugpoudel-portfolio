import type { NextConfig } from 'next';
const config: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Local environment files are build inputs, never deployed function assets.
  outputFileTracingExcludes: { '/*': ['./.env*', './.vercel/.env*'] },
};
export default config;
