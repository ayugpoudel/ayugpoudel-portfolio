'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, MotionConfig } from 'motion/react';
import { ArrowUpRight, FileDown, X } from 'lucide-react';
import { site } from '@/data/site';

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`reveal ${className}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-35px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
export function ConfiguredLink({
  href,
  label,
  className = '',
  icon = true,
  children,
}: {
  href: string | null;
  label: string;
  className?: string;
  icon?: boolean;
  children?: React.ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  if (href)
    return (
      <a
        className={className}
        href={href}
        target={href.startsWith('mailto:') ? undefined : '_blank'}
        rel="noopener noreferrer"
      >
        {children ? (
          <>
            <span className="sr-only">{label}</span>
            {children}
          </>
        ) : (
          label
        )}
        {icon && <ArrowUpRight size={15} aria-hidden="true" />}
      </a>
    );
  return (
    <>
      <button type="button" className={className} onClick={() => dialog.current?.showModal()}>
        {children ? (
          <>
            <span className="sr-only">{label}</span>
            {children}
          </>
        ) : (
          label
        )}
        {icon && <ArrowUpRight size={15} aria-hidden="true" />}
        <span className="sr-only"> (details coming soon)</span>
      </button>
      <dialog
        ref={dialog}
        className="link-dialog"
        aria-label={`${label} availability`}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div className="dialog-top">
          <span className="eyebrow">Connection pending</span>
          <button
            className="icon-button"
            onClick={() => dialog.current?.close()}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>
        <h2>{label}, soon.</h2>
        <p>
          This link hasn’t been added yet. You can explore the projects and engineering background
          here in the meantime.
        </p>
        <form method="dialog">
          <button className="button primary">Back to exploring</button>
        </form>
      </dialog>
    </>
  );
}
const navigation = [
  { id: 'work', label: 'Projects', coordinate: '01' },
  { id: 'experience', label: 'Experience', coordinate: '02' },
  { id: 'about', label: 'About', coordinate: '03' },
  { id: 'contact', label: 'Contact', coordinate: '04' },
];
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const pathname = usePathname();
  useEffect(() => {
    if (pathname !== '/') return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-10% 0px -25% 0px', threshold: 0 },
    );
    navigation.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [pathname]);
  return (
    <header className="nav-shell">
      <nav className="nav container" aria-label="Main navigation">
        <Link href="/" className="brand" aria-label="Ayug Poudel home">
          <span className="monogram" aria-hidden="true">
            a<span>p</span>
            <i />
          </span>
          <span className="wordmark">
            ayug<span className="wordmark-slash">/</span>poudel
            <small>Engineering observatory</small>
          </span>
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Close' : 'Menu'}
          <span aria-hidden="true">{open ? '−' : '+'}</span>
        </button>
        <div id="nav-links" className={`nav-links ${open ? 'is-open' : ''}`}>
          {navigation.map((item) => (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              className={`nav-coordinate ${(pathname.startsWith('/projects/') ? item.id === 'work' : active === item.id) ? 'is-current' : ''}`}
              aria-current={
                (pathname.startsWith('/projects/') ? item.id === 'work' : active === item.id)
                  ? 'location'
                  : undefined
              }
              onClick={() => {
                setOpen(false);
                setActive(item.id);
              }}
            >
              <span aria-hidden="true">{item.coordinate}</span>
              {item.label}
              <i aria-hidden="true" />
            </Link>
          ))}
        </div>
        <ConfiguredLink href={site.resume} label="Résumé.pdf" className="nav-document" icon={false}>
          <FileDown size={15} />
          <span aria-hidden="true">Résumé.pdf</span>
        </ConfiguredLink>
      </nav>
    </header>
  );
}
export function SectionHeading({
  number,
  label,
  title,
  description,
}: {
  number: string;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="section-heading">
      <div>
        <div className="eyebrow section-label">
          <span>{number}</span>
          <span className="short-rule" />
          {label}
        </div>
        <h2>{title}</h2>
      </div>
      {description && <p>{description}</p>}
    </Reveal>
  );
}
