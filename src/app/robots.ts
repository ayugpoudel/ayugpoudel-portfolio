import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
export default function robots(): MetadataRoute.Robots {
  return {
    rules:
      process.env.VERCEL_ENV === 'preview'
        ? { userAgent: '*', disallow: '/' }
        : { userAgent: '*', allow: '/' },
    ...(site.url ? { sitemap: `${site.url}/sitemap.xml` } : {}),
  };
}
