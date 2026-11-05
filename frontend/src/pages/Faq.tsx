import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import faq from '../content/faq.json';
import { contact } from '../content/site';
import { PageHero } from '../components/ui';

export default function Faq() {
  const [cat, setCat] = useState(faq[0].category);
  const [q, setQ] = useState('');
  const [open, setOpen] = useState<string | null>(null);
  const items = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return faq.find((c) => c.category === cat)!.items.map((i) => ({ ...i, cat }));
    return faq.flatMap((c) => c.items.filter((i) => (i.q + ' ' + i.a).toLowerCase().includes(s)).map((i) => ({ ...i, cat: c.category })));
  }, [cat, q]);

  return (
    <>
      <PageHero eyebrow="Help centre" title="Frequently asked questions" text="Eligibility, fees, auditions and awards. Can't find an answer? Our helpline is open Monday to Saturday.">
        <label className="relative mt-8 block max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search, for example “age limit” or “fee”"
            aria-label="Search the questions"
            className="w-full rounded-full border border-white/15 bg-white/10 py-4 pl-12 pr-5 text-cream placeholder:text-white/50 focus:border-gold focus:outline-none"
          />
        </label>
      </PageHero>
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[260px_1fr]">
          <nav aria-label="Topics" className={`flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-32 lg:flex-col lg:self-start ${q ? 'opacity-40' : ''}`}>
            {faq.map((c) => (
              <button
                key={c.category}
                type="button"
                onClick={() => { setCat(c.category); setQ(''); setOpen(null); }}
                className={`shrink-0 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${!q && cat === c.category ? 'bg-ink text-cream' : 'bg-white text-ink/70 hover:bg-gold/10'}`}
              >
                {c.category} <span className="opacity-60">· {c.items.length}</span>
              </button>
            ))}
          </nav>
          <div>
            {q && <p className="mb-4 text-sm text-ink/60">{items.length} answer{items.length === 1 ? '' : 's'} for “{q}”</p>}
            <div className="grid gap-3">
              {items.map((i) => {
                const id = i.cat + i.q;
                const isOpen = open === id;
                return (
                  <div key={id} className={`overflow-hidden rounded-2xl border bg-white transition ${isOpen ? 'border-gold shadow-glow' : 'border-ink/10'}`}>
                    <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : id)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold">
                      <span>
                        {q && <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[.2em] text-gold-deep">{i.cat}</span>}
                        {i.q}
                      </span>
                      <ChevronDown className={`h-5 w-5 shrink-0 text-gold-deep transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                          <p className="px-5 pb-5 text-sm leading-relaxed text-ink/70">{i.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              {!items.length && <p className="rounded-2xl bg-white p-6 text-center text-ink/60">No answer found. Call {contact.phone} or write to {contact.email}.</p>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
