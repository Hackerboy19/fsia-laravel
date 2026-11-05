import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ChevronDown, Mail, Menu, MessageCircle, Phone, X } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { contact, footerColumns, legal, mainNav } from '../content/site';
import LogoMark from './LogoMark';
import { SmartLink } from './ui';

function Logo({ light = true, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="Forever Star India home">
      {/* The red star from the live fsia.in header, redrawn as SVG so it stays sharp. */}
      <LogoMark
        className={`shrink-0 drop-shadow-[0_4px_14px_rgba(220,38,38,.45)] transition-all duration-500 group-hover:rotate-[72deg] group-hover:scale-110 motion-reduce:group-hover:rotate-0 ${compact ? 'h-10 w-10' : 'h-12 w-12'}`}
      />
      <span className="leading-tight">
        <span className={`block whitespace-nowrap font-display font-bold uppercase tracking-wide ${compact ? 'text-base' : 'text-lg'} ${light ? 'text-cream' : 'text-ink'}`}>Forever Star India</span>
        <span className={`block whitespace-nowrap text-[10px] font-semibold uppercase ${compact ? 'tracking-[.16em]' : 'tracking-[.25em]'} ${light ? 'text-gold-soft' : 'text-gold-deep'}`}>Beauty Pageants & Awards</span>
      </span>
    </Link>
  );
}

/** Says plainly that this is not the live site. Shown on every page. */
function PreviewBar() {
  return (
    <div className="relative z-[60] flex h-[30px] items-center justify-center bg-gradient-to-r from-rose-brand via-[#8e1446] to-rose-brand px-4 text-center text-[12px] font-medium text-white">
      <span className="sm:hidden">Design preview · not the live site</span>
      <span className="hidden sm:inline">Design preview of the new fsia.in · not the live site · hidden from search engines</span>
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const loc = useLocation();
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [loc.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header className={`fixed inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'top-0 bg-ink/85 shadow-lg backdrop-blur-xl' : 'top-[30px] bg-transparent'}`}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-[height] duration-300 sm:px-6 ${scrolled ? 'h-16' : 'h-[72px]'}`}>
        <Logo compact={scrolled} />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {mainNav.map((n) =>
            n.to ? (
              <RouterNavLink
                key={n.label}
                to={n.to}
                end
                className={({ isActive }) => `rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${isActive ? 'text-gold-soft' : 'text-white/80 hover:text-white'}`}
              >
                {n.label}
              </RouterNavLink>
            ) : (
              <div key={n.label} className="relative" onMouseEnter={() => setMenu(n.label)} onMouseLeave={() => setMenu(null)}>
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-white/80 hover:text-white"
                  aria-expanded={menu === n.label}
                  onClick={() => setMenu(menu === n.label ? null : n.label)}
                >
                  {n.label}
                  <ChevronDown className={`h-4 w-4 transition-transform ${menu === n.label ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {menu === n.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 ${n.groups ? 'w-[520px]' : 'w-72'}`}
                    >
                      <div className="rounded-2xl border border-white/10 bg-ink-2/95 p-3 shadow-2xl backdrop-blur-xl">
                        {n.items && (
                          <ul className="grid gap-0.5">
                            {n.items.map((i) => (
                              <li key={i.label}>
                                <SmartLink link={i} className="block rounded-xl px-3 py-2 hover:bg-white/5">
                                  <span className="block text-sm font-medium text-cream">{i.label}</span>
                                  {i.note && <span className="block text-xs text-white/50">{i.note}</span>}
                                </SmartLink>
                              </li>
                            ))}
                          </ul>
                        )}
                        {n.groups && (
                          <div className="grid grid-cols-2 gap-3">
                            {n.groups.map((g) => (
                              <div key={g.title}>
                                <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[.25em] text-gold-soft">{g.title}</p>
                                {g.items.map((i) => (
                                  <SmartLink key={i.label} link={i} className="block rounded-xl px-3 py-2 text-sm text-cream hover:bg-white/5" />
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ),
          )}
        </nav>
        <div className="flex items-center gap-2">
          <a href={contact.phoneHref} className="hidden items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-sm font-semibold text-gold-soft hover:bg-gold/10 xl:flex">
            <Phone className="h-4 w-4" /> {contact.phone}
          </a>
          <button type="button" className="grid h-11 w-11 place-items-center rounded-full text-cream hover:bg-white/10 lg:hidden" aria-label="Open menu" onClick={() => setOpen(true)}>
            <Menu />
          </button>
        </div>
      </div>

      {/* Rendered on <body>: the blurred header would otherwise trap this fixed drawer inside its own box. */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div className="fixed inset-0 z-[70] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
              <motion.aside
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 320, damping: 34 }}
                className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col overflow-y-auto bg-ink-2 px-4 py-5 text-cream min-[360px]:w-[86%] min-[360px]:px-5"
                aria-label="Menu"
              >
                <div className="mb-6 flex items-center justify-between gap-2">
                  <Logo compact />
                  <button type="button" className="grid h-10 w-10 shrink-0 place-items-center rounded-full hover:bg-white/10" aria-label="Close menu" onClick={() => setOpen(false)}>
                    <X />
                  </button>
                </div>
                {mainNav.map((n) =>
                  n.to ? (
                    <Link key={n.label} to={n.to} className="border-b border-white/5 py-3 text-base font-medium">
                      {n.label}
                    </Link>
                  ) : (
                    <details key={n.label} className="group border-b border-white/5 py-3">
                      <summary className="flex cursor-pointer list-none items-center justify-between text-base font-medium">
                        {n.label}
                        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="mt-2 grid gap-1 pl-2">
                        {(n.items ?? n.groups?.flatMap((g) => g.items) ?? []).map((i) => (
                          <SmartLink key={i.label} link={i} className="py-1.5 text-sm text-white/70" />
                        ))}
                      </div>
                    </details>
                  ),
                )}
                <a href={contact.phoneHref} className="mt-6 flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 font-semibold text-ink">
                  <Phone className="h-4 w-4" /> {contact.phone}
                </a>
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white/70">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">India's platform for beauty pageants and award shows. Auditions and nominations from every city of India.</p>
          <div className="mt-6 grid gap-3 text-sm">
            <a href={contact.phoneHref} className="flex items-center gap-3 hover:text-gold-soft"><Phone className="h-4 w-4 text-gold" />{contact.phone} · {contact.hours}</a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-3 hover:text-gold-soft"><Mail className="h-4 w-4 text-gold" />{contact.email} · we reply within 24 hours</a>
            <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-gold-soft"><MessageCircle className="h-4 w-4 text-gold" />Chat on WhatsApp</a>
          </div>
        </div>
        {footerColumns.map((c) => (
          <div key={c.title}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[.3em] text-gold-soft">{c.title}</p>
            <ul className="grid gap-2 text-sm">
              {c.items.map((i) => (
                <li key={i.label}>
                  <SmartLink link={i} className="hover:text-cream" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Forever Star India Pvt. Ltd.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {legal.map((l) => (
              <SmartLink key={l.label} link={l} className="hover:text-cream" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[80] h-[3px] origin-left bg-gradient-to-r from-rose-brand via-gold to-gold-soft" style={{ scaleX: x }} />;
}

export default function Layout({ children }: { children: ReactNode }) {
  const loc = useLocation();
  const reduce = useReducedMotion();
  // Braces matter: newer browsers return a Promise from scrollTo, and React would call it as a cleanup.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [loc.pathname]);
  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <PreviewBar />
      <Header />
      <AnimatePresence mode="wait">
        <motion.main key={loc.pathname} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.25 }}>
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
