import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LIVE, type NavLink } from '../content/site';
import { Reveal } from './motion';

/** One link component for both rebuilt pages (router) and pages still on the live site. */
export function SmartLink({ link, className, children }: { link: NavLink; className?: string; children?: ReactNode }) {
  if (link.live) {
    return (
      <a href={LIVE + link.to} className={className} target="_blank" rel="noopener noreferrer" title="Opens the current fsia.in page">
        {children ?? link.label}
      </a>
    );
  }
  return (
    <Link to={link.to} className={className}>
      {children ?? link.label}
    </Link>
  );
}

type BtnProps = { children: ReactNode; href?: string; to?: string; variant?: 'gold' | 'ghost' | 'dark'; className?: string; external?: boolean };
export function Button({ children, href, to, variant = 'gold', className = '', external }: BtnProps) {
  const base =
    'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-transform duration-200 active:scale-[.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold';
  const styles = {
    gold: 'bg-gradient-to-r from-gold-deep via-gold to-gold-soft text-ink shadow-glow hover:-translate-y-0.5',
    ghost: 'border border-white/25 text-white hover:bg-white/10',
    dark: 'bg-ink text-cream hover:-translate-y-0.5',
  }[variant];
  const inner = (
    <>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative">{children}</span>
      {external ? <ArrowUpRight className="relative h-4 w-4" /> : <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
    </>
  );
  if (to) return <Link to={to} className={`${base} ${styles} ${className}`}>{inner}</Link>;
  return (
    <a href={href} className={`${base} ${styles} ${className}`} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {inner}
    </a>
  );
}

export function SectionHeading({ eyebrow, title, text, light, center = true }: { eyebrow?: string; title: string; text?: string; light?: boolean; center?: boolean }) {
  return (
    <Reveal className={`mx-auto mb-12 max-w-3xl ${center ? 'text-center' : ''}`}>
      {eyebrow && <p className={`mb-3 text-xs font-semibold uppercase tracking-[.3em] ${light ? 'text-gold-soft' : 'text-gold-deep'}`}>{eyebrow}</p>}
      <h2 className={`font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl ${light ? 'text-cream' : 'text-ink'}`}>{title}</h2>
      {text && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? 'text-white/70' : 'text-ink/65'}`}>{text}</p>}
    </Reveal>
  );
}

/** Page header used by every inner page. */
export function PageHero({ eyebrow, title, text, children }: { eyebrow: string; title: string; text?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-36 text-cream sm:pt-40">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_80%_at_20%_0%,rgba(212,175,55,.22),transparent_60%),radial-gradient(50%_70%_at_90%_10%,rgba(194,24,91,.25),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[.35em] text-gold-soft">{eyebrow}</p>
          <h1 className="max-w-4xl font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">{title}</h1>
          {text && <p className="mt-5 max-w-2xl text-lg text-white/70">{text}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
