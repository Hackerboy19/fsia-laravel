import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Award, CalendarDays, Crown, Facebook, Instagram, MapPin, Quote, ShieldCheck, Sparkles as SparkIcon, Tv, Youtube } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import home from '../content/home.json';
import team from '../content/team.json';
import { LIVE, awards, more, pageants, type NavLink } from '../content/site';
import { CountUp, Reveal, Sparkles, Stagger, StaggerItem, Tilt } from '../components/motion';
import { Button, SectionHeading, SmartLink } from '../components/ui';

function Hero() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % home.hero.images.length), 6000);
    return () => clearInterval(t);
  }, [reduce]);
  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink pt-28 text-cream">
      <motion.div className="absolute inset-0 -z-10" style={{ y: reduce ? 0 : y }}>
        <AnimatePresence>
          <motion.img
            key={i}
            src={home.hero.images[i]}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 0.55, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.4 }, scale: { duration: 7, ease: 'linear' } }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(55%_60%_at_15%_20%,rgba(212,175,55,.28),transparent_60%),radial-gradient(45%_55%_at_85%_30%,rgba(194,24,91,.30),transparent_60%)]" />
      </motion.div>
      <Sparkles count={28} />
      <motion.div style={{ opacity: reduce ? 1 : fade }} className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.25fr_.75fr]">
        <div>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[.3em] text-gold-soft">
            <span className="h-2 w-2 animate-pulse rounded-full bg-gold" /> {home.hero.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
            className="font-display text-[2.6rem] font-bold leading-[1.02] sm:text-6xl lg:text-7xl"
          >
            Your city.
            <br />
            Your crown.
            <br />
            <span className="bg-gradient-to-r from-gold-soft via-gold to-gold-soft bg-[length:200%_auto] bg-clip-text text-transparent animate-shine">The national stage.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            {home.hero.text}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-9 flex flex-wrap gap-3">
            <Button href={`${LIVE}/quickapply`} external>Quick apply · 2026</Button>
            <Button href={`${LIVE}/nominate-yourself`} variant="ghost" external>Nominate for awards</Button>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}>
          <Tilt className="rounded-3xl border border-white/15 bg-white/[.07] p-6 shadow-2xl backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-[.3em] text-gold-soft">Grand Finale & Award Ceremony</p>
            <p className="mt-3 font-display text-3xl font-bold">8 – 10 Jan 2027</p>
            <p className="mt-2 flex items-center gap-2 text-white/75"><MapPin className="h-4 w-4 text-gold" /> The Fern Nest by Marriott, Jaipur</p>
            <div className="my-5 h-px bg-white/10" />
            <ul className="grid gap-3 text-sm text-white/80">
              <li className="flex gap-3"><Crown className="h-5 w-5 shrink-0 text-gold" /> Miss, Mrs and Teen India titles from 4,000+ cities</li>
              <li className="flex gap-3"><Award className="h-5 w-5 shrink-0 text-gold" /> Super Woman, Super Hero and Business awards</li>
              <li className="flex gap-3"><Tv className="h-5 w-5 shrink-0 text-gold" /> Coronation streamed live on FSIA channels</li>
            </ul>
          </Tilt>
        </motion.div>
      </motion.div>
      <div aria-hidden className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[.3em] text-white/50 md:flex">
        Scroll
        <motion.span className="h-8 w-px bg-gradient-to-b from-gold to-transparent" animate={reduce ? undefined : { scaleY: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    ...home.stats.map((s) => ({ big: <CountUp value={s.value} suffix={s.suffix} />, label: s.label })),
    { big: 'Class 41', label: 'Government registered trademark' },
    { big: 'Live', label: 'Crowning ceremonies streamed on our channels' },
  ];
  return (
    <section className="relative z-10 -mt-14 px-4 sm:px-6">
      <Stagger className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-3xl bg-gold/20 shadow-2xl md:grid-cols-4">
        {items.map((s, k) => (
          <StaggerItem key={k} className="bg-white p-6 text-center sm:p-8">
            <p className="font-display text-3xl font-bold text-ink sm:text-4xl">{s.big}</p>
            <p className="mt-2 text-sm text-ink/60">{s.label}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function Titles() {
  const tabs: { id: string; label: string; items: NavLink[] }[] = [
    { id: 'pageants', label: 'Pageants', items: pageants },
    { id: 'awards', label: 'Awards', items: awards },
    { id: 'more', label: 'Fashion & more', items: more },
  ];
  const [tab, setTab] = useState('pageants');
  const cur = tabs.find((t) => t.id === tab)!;
  return (
    <section className="px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="Titles & awards" title="Find the stage that fits you" text="Pageants for women, teens and kids, awards for achievers and entrepreneurs, and platforms for fashion talent. Apply from any city of India." />
      <div className="mx-auto mb-10 flex w-fit gap-1 rounded-full bg-ink/5 p-1" role="tablist">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)} className="relative rounded-full px-5 py-2.5 text-sm font-semibold">
            {tab === t.id && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            <span className={`relative ${tab === t.id ? 'text-cream' : 'text-ink/60'}`}>{t.label}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cur.items.map((t, k) => (
            <SmartLink key={t.label} link={t} className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-glow">
              <span aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-gold/25 to-rose-brand/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />
              <span className="relative flex items-start justify-between gap-4">
                <span>
                  <span className="block text-[11px] font-semibold uppercase tracking-[.25em] text-gold-deep">{String(k + 1).padStart(2, '0')}</span>
                  <span className="mt-2 block font-display text-xl font-bold text-ink">{t.label}</span>
                  <span className="mt-1 block text-sm text-ink/60">{t.note ?? 'Applications open for the 2026 season'}</span>
                </span>
                <Crown className="h-6 w-6 shrink-0 text-gold transition-transform duration-300 group-hover:rotate-12" />
              </span>
            </SmartLink>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function Dates() {
  const fmt = (d: string) => new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  return (
    <section className="bg-white px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="Season calendar" title="Key dates for 2026–27" text="City auditions and award screenings run across India through the season. These are the fixed dates on the calendar." />
      <div className="relative mx-auto max-w-3xl">
        <div aria-hidden className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-gold via-gold/40 to-transparent sm:left-1/2" />
        {home.events.map((e, k) => (
          <Reveal key={e.title} delay={k * 0.1} className={`relative mb-10 pl-14 sm:w-1/2 sm:pl-0 ${k % 2 ? 'sm:ml-auto sm:pl-12' : 'sm:pr-12 sm:text-right'}`}>
            <span className={`absolute left-[14px] top-2 h-3 w-3 rounded-full bg-gold ring-4 ring-gold/20 sm:top-2 ${k % 2 ? 'sm:-left-1.5' : 'sm:left-auto sm:-right-1.5'}`} />
            <p className="text-xs font-semibold uppercase tracking-[.25em] text-gold-deep">{e.type}</p>
            <p className="mt-1 flex items-center gap-2 font-display text-2xl font-bold sm:justify-[inherit]">
              <CalendarDays className="h-5 w-5 text-gold" /> {fmt(e.date)}{'end' in e && e.end ? ` – ${fmt(e.end as string)}` : ''}
            </p>
            <p className="mt-2 font-semibold text-ink">{e.title}</p>
            <p className="mt-1 text-sm text-ink/60">{e.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Winners() {
  return (
    <section className="relative overflow-hidden bg-ink px-4 py-24 text-cream sm:px-6">
      <Sparkles count={16} />
      <SectionHeading light eyebrow="Winner success stories" title="From a city audition to the crown" text="Crowned titleholders of the 2025 season, in their own words." />
      {/* phones: a swipeable row; larger screens: a grid */}
      <Stagger className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-auto sm:grid sm:max-w-7xl sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-3">
        {home.winners.map((w) => (
          <StaggerItem key={w.name} className="w-[82%] shrink-0 snap-center sm:w-auto">
            <figure className="group relative h-[440px] overflow-hidden rounded-3xl">
              <img src={w.img} alt={`${w.name}, ${w.title}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[.25em] text-gold-soft">{w.title}</p>
                <p className="mt-1 font-display text-2xl font-bold">{w.name}</p>
                {w.quote && (
                  <p className="mt-3 max-h-40 overflow-hidden text-sm leading-relaxed text-white/80 transition-all duration-500 sm:max-h-0 sm:opacity-0 sm:group-hover:max-h-40 sm:group-hover:opacity-100 sm:group-focus-within:max-h-40 sm:group-focus-within:opacity-100">
                    <Quote className="mb-1 h-4 w-4 text-gold" />
                    {w.quote}
                  </p>
                )}
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
      <div className="mt-10 text-center">
        <Button href={`${LIVE}/pageant-winner`} variant="ghost" external>See all winners</Button>
      </div>
    </section>
  );
}

function Jury() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="Celebrity jury & guests" title="Crowned by icons" text="Bollywood names, national jury members and state dignitaries on the grand stage." />
      <Stagger className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {home.jury.map((j) => (
          <StaggerItem key={j.name}>
            <Tilt className="h-full overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm">
              <div className="aspect-[4/3] overflow-hidden bg-ink/5">
                {j.img ? (
                  <img src={j.img} alt={j.name} loading="lazy" className="h-full w-full object-cover object-top" />
                ) : (
                  <span className="grid h-full place-items-center bg-gradient-to-br from-ink via-ink-3 to-[#3a0f26] font-display text-6xl font-bold text-gold-soft">
                    {j.name.split(' ').map((w) => w[0]).join('')}
                  </span>
                )}
              </div>
              <div className="p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[.25em] text-gold-deep">{j.role}</p>
                <p className="mt-1 font-display text-2xl font-bold">{j.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{j.text}</p>
              </div>
            </Tilt>
          </StaggerItem>
        ))}
      </Stagger>
      <Stagger className="mx-auto mt-6 grid max-w-6xl gap-6 md:grid-cols-2">
        {home.trust.map((t) => (
          <StaggerItem key={t.title} className="flex gap-4 rounded-3xl bg-gradient-to-br from-cream to-white p-6 ring-1 ring-gold/30">
            <ShieldCheck className="h-8 w-8 shrink-0 text-gold-deep" />
            <div>
              <p className="font-semibold">{t.title}</p>
              <p className="mt-1 text-sm text-ink/65">{t.text}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function Partners() {
  const row = [...home.partners, ...home.partners];
  return (
    <section className="overflow-hidden bg-white py-20">
      <SectionHeading eyebrow="Official partners" title="Brands and media on our stage" />
      <div className="relative [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused] motion-reduce:animate-none">
          {row.map((p, k) => (
            <div key={k} className="flex h-24 w-44 shrink-0 items-center justify-center rounded-2xl border border-ink/10 bg-white p-3" title={p.name}>
              {p.logo ? <img src={p.logo} alt={p.name} loading="lazy" className="max-h-full max-w-full object-contain grayscale transition hover:grayscale-0" /> : <span className="text-sm font-semibold">{p.name}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Founder() {
  const f = team.leadership[0];
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto grid max-w-6xl items-center gap-10 overflow-hidden rounded-[2rem] bg-ink p-6 text-cream sm:p-10 md:grid-cols-[.8fr_1.2fr]">
        <Reveal>
          <div className="relative">
            <div aria-hidden className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-gold to-rose-brand opacity-60 blur-xl" />
            <img src={f.img ?? ''} alt={f.name} loading="lazy" className="relative aspect-[4/5] w-full rounded-[1.5rem] object-cover object-top" />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <SparkIcon className="h-8 w-8 text-gold" />
          <p className="mt-4 font-display text-3xl font-bold leading-snug sm:text-4xl">“{f.quote}”</p>
          <p className="mt-6 text-white/70">{f.bio}</p>
          <p className="mt-6 font-semibold">{f.name}</p>
          <p className="text-sm text-gold-soft">{f.role}</p>
          <div className="mt-8">
            <Button to="/our-teams.php" variant="ghost">Meet the team</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Socials() {
  const icon = (n: string) => ({ Instagram: Instagram, Facebook: Facebook, YouTube: Youtube }[n] ?? SparkIcon);
  return (
    <section className="px-4 pb-24 sm:px-6">
      <SectionHeading eyebrow="Connect with FSIA" title="Watch every crowning live" text="Ceremonies, masterclasses and winner announcements on our official channels." />
      <Stagger className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {home.socials.map((s) => {
          const I = icon(s.name);
          return (
            <StaggerItem key={s.name}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col items-center gap-2 rounded-2xl border border-ink/10 bg-white p-5 text-center transition hover:-translate-y-1 hover:border-gold hover:shadow-glow">
                <I className="h-7 w-7 text-gold-deep transition-transform group-hover:scale-110" />
                <span className="text-sm font-semibold">{s.name}</span>
                <span className="text-xs text-ink/55">{s.handle}</span>
              </a>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ink via-ink-3 to-[#3a0f26] px-4 py-24 text-center text-cream sm:px-6">
      <Sparkles count={20} />
      <Reveal className="relative mx-auto max-w-3xl">
        <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">Step onto the national stage</h2>
        <p className="mt-5 text-lg text-white/75">Join India's talent and achievement movement across 4,000+ cities. Secure your city audition, train with mentors, and walk the grand finale stage in Jaipur.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href={`${LIVE}/quickapply`} external>Quick apply · 2026 season</Button>
          <Button href="tel:+919983286999" variant="ghost">Call +91-99832-86999</Button>
        </div>
      </Reveal>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Titles />
      <Dates />
      <Winners />
      <Jury />
      <Partners />
      <Founder />
      <Socials />
      <FinalCta />
    </>
  );
}
