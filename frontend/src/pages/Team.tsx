import { AnimatePresence, motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useState } from 'react';
import team from '../content/team.json';
import { Reveal, Tilt } from '../components/motion';
import { PageHero, SectionHeading } from '../components/ui';

const groups = ['All', 'Core Team', 'Mentors & Experts', 'Anchors', 'Photography & Video'];

function initials(n: string) {
  return n.split(' ').map((p) => p[0]).slice(0, 2).join('');
}

export default function Team() {
  const [g, setG] = useState('All');
  const list = team.members.filter((m) => g === 'All' || m.group === g);
  return (
    <>
      <PageHero eyebrow="Our team" title="The people who take you to the stage" text="Founders, mentors, core team, choreographers, anchors and storytellers." />
      <section className="px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="Leadership" title="Leading Forever Star India" />
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {team.leadership.map((l, k) => (
            <Reveal key={l.name} delay={k * 0.1}>
              <Tilt className="h-full overflow-hidden rounded-3xl bg-ink text-cream">
                <div className="grid sm:grid-cols-[.9fr_1.1fr]">
                  {l.img && <img src={l.img} alt={l.name} loading="lazy" className="aspect-[4/5] h-full w-full object-cover object-top" />}
                  <div className="p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[.25em] text-gold-soft">{l.role}</p>
                    <p className="mt-1 font-display text-2xl font-bold">{l.name}</p>
                    <p className="mt-4 text-sm italic text-white/80"><Quote className="mb-1 h-4 w-4 text-gold" />{l.quote}</p>
                    <p className="mt-3 text-sm leading-relaxed text-white/65">{l.bio}</p>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-white px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="Mentors, makers & voices" title="The experts behind every season" text="They train, film, host and run every Forever Star India season." />
        <div className="mx-auto mb-10 flex max-w-4xl flex-wrap justify-center gap-2" role="group" aria-label="Filter team">
          {groups.map((x) => {
            const n = x === 'All' ? team.members.length : team.members.filter((m) => m.group === x).length;
            return (
              <button key={x} type="button" aria-pressed={g === x} onClick={() => setG(x)} className={`rounded-full border px-4 py-2 text-sm font-medium transition ${g === x ? 'border-ink bg-ink text-cream' : 'border-ink/15 text-ink/70 hover:border-gold'}`}>
                {x} <span className="opacity-60">{n}</span>
              </button>
            );
          })}
        </div>
        <motion.div layout className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence>
            {list.map((m) => (
              <motion.article key={m.name} layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.3 }} className="group overflow-hidden rounded-2xl border border-ink/10 bg-cream">
                <div className="aspect-square overflow-hidden bg-ink/5">
                  {m.img ? (
                    <img src={m.img} alt={m.name} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <span className="grid h-full place-items-center font-display text-4xl text-gold-deep">{initials(m.name)}</span>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-semibold">{m.name}</p>
                  <p className="text-xs text-ink/60">{m.role || m.group}</p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </>
  );
}
