import type { Metadata } from 'next';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/ibm-plex-mono/400.css';
import './globals.css';
import './observatory.css';
import './engineering.css';
import { site } from '@/data/site';
import { MotionProvider, Navbar } from '@/components/ui';
import { ContactFooter } from '@/components/sections';
export const metadata: Metadata = {
  metadataBase: new URL(site.url || 'http://localhost:3000'),
  title: { default: site.title, template: '%s — Ayug Poudel' },
  description: site.description,
  ...(site.url ? { alternates: { canonical: '/' } } : {}),
  openGraph: {
    title: site.title,
    description: site.description,
    type: 'website',
    locale: 'en_US',
    siteName: 'The Systems Atlas',
    ...(site.url ? { url: site.url } : {}),
  },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description },
  robots: { index: process.env.VERCEL_ENV !== 'preview', follow: true },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body id="top">
        <noscript>
          <style>{`.reveal { opacity: 1 !important; transform: none !important; } @media(max-width:600px){.menu-toggle{display:none!important}.nav{height:auto;padding-block:15px;flex-wrap:wrap}.nav-links{display:flex!important;position:static!important;flex-direction:row!important;flex-wrap:wrap;gap:18px!important;padding:10px 0 0!important;background:transparent!important;border:0!important;width:100%}.nav-links>a,.nav-resume{font-size:11px!important;min-height:30px!important;padding:5px 0!important}}`}</style>
        </noscript>
        <MotionProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <ContactFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
