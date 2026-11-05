import { Eye, Flag, Target } from 'lucide-react';
import { LIVE, about } from '../content/site';
import { Reveal, Stagger, StaggerItem } from '../components/motion';
import { Button, PageHero } from '../components/ui';

const blocks = [
  { title: 'Our Mission', icon: Target, items: about.mission },
  { title: 'Our Goals', icon: Flag, items: about.goals },
  { title: 'Our Vision', icon: Eye, items: about.vision },
];

export default function About() {
  return (
    <>
      <PageHero eyebrow="About FSIA" title="Talent should receive opportunity before it is judged" text={about.intro} />
      <section className="px-4 py-24 sm:px-6">
        <Stagger className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {blocks.map((b) => (
            <StaggerItem key={b.title} className="rounded-3xl border border-ink/10 bg-white p-8 shadow-sm">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold-deep to-gold-soft">
                <b.icon className="h-6 w-6 text-ink" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold">{b.title}</h2>
              <ul className="mt-4 grid gap-3">
                {b.items.map((t) => (
                  <li key={t} className="flex gap-3 text-sm leading-relaxed text-ink/70">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {t}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
      <section className="px-4 pb-24 sm:px-6">
        <Reveal className="mx-auto max-w-4xl rounded-[2rem] bg-ink p-10 text-center text-cream">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Your story begins here</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">
            Join 1,00,000+ dreamers who trusted Forever Star India as their stage. Whether you are aiming for Miss Universe, Miss India, Mrs India, Super Woman or Super Hero Awards, auditions and nominations are open for the 2026 season.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={`${LIVE}/quickapply`} external>Apply now</Button>
            <Button to="/contact.php" variant="ghost">Talk to us</Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
