import { Building2, Handshake, Mail, MapPin, Megaphone, MessageCircle, Phone } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { LIVE, contact } from '../content/site';
import { Reveal, Stagger, StaggerItem } from '../components/motion';
import { PageHero } from '../components/ui';

const cards = [
  { icon: Phone, title: 'Phone / WhatsApp', value: contact.phone, href: contact.phoneHref, note: contact.hours },
  { icon: Mail, title: 'Email', value: contact.email, href: `mailto:${contact.email}`, note: 'We reply within 24 hours' },
  { icon: MapPin, title: 'Headquarters', value: 'Nirman Nagar, Jaipur', href: contact.map, note: 'Forever Star India Pvt. Ltd.' },
];
const more = [
  { icon: Megaphone, title: 'Brand sponsorships', text: 'Product placements, runway branding and digital exposure to millions of viewers.' },
  { icon: Building2, title: 'Press & media', text: 'Press kits, media passes for live events, and interviews with our directors.' },
  { icon: Handshake, title: 'Become a franchise partner', text: 'State-wise franchise for people who want to start their own career with FSIA.', href: `${LIVE}/online-franchise-application` },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <>
      <PageHero eyebrow="Contact" title="Connect with FSIA" text="Pageant and award applications, sponsorships or media enquiries. Our team is ready to help." />
      <section className="px-4 py-20 sm:px-6">
        <Stagger className="mx-auto -mt-32 grid max-w-6xl gap-4 md:grid-cols-3">
          {cards.map((c) => (
            <StaggerItem key={c.title}>
              <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="group flex h-full gap-4 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-ink/5 transition hover:-translate-y-1 hover:ring-gold">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ink text-gold transition group-hover:scale-110"><c.icon className="h-5 w-5" /></span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[.2em] text-ink/50">{c.title}</span>
                  <span className="mt-1 block font-semibold">{c.value}</span>
                  <span className="block text-sm text-ink/55">{c.note}</span>
                </span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mx-auto mt-16 grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <Reveal>
            <form onSubmit={submit} className="rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
              <h2 className="font-display text-3xl font-bold">Send a message</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[['Full name', 'text', 'name'], ['Mobile number', 'tel', 'tel'], ['Email', 'email', 'email'], ['City', 'text', 'address-level2']].map(([l, t, a]) => (
                  <label key={l} className="grid gap-1.5 text-sm font-medium">
                    {l}
                    <input required type={t} autoComplete={a} className="rounded-xl border border-ink/15 bg-cream px-4 py-3 font-normal focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/20" />
                  </label>
                ))}
                <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">
                  Message
                  <textarea required rows={4} className="rounded-xl border border-ink/15 bg-cream px-4 py-3 font-normal focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/20" />
                </label>
              </div>
              <button type="submit" className="mt-6 w-full rounded-full bg-ink py-3.5 font-semibold text-cream transition hover:bg-ink-3">Submit message</button>
              {sent && (
                <p role="status" className="mt-4 rounded-xl bg-gold/15 px-4 py-3 text-sm text-ink">
                  This is a design preview, so the message was not sent. Please call {contact.phone} or WhatsApp us.
                </p>
              )}
            </form>
          </Reveal>
          <Reveal delay={0.1} className="grid content-start gap-4">
            <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-3xl bg-[#128c4a] p-6 text-white transition hover:-translate-y-1">
              <MessageCircle className="h-8 w-8" />
              <span><span className="block font-semibold">Chat on WhatsApp</span><span className="text-sm text-white/80">Fastest response</span></span>
            </a>
            {more.map((m) => (
              <div key={m.title} className="rounded-3xl border border-ink/10 bg-white p-6">
                <m.icon className="h-6 w-6 text-gold-deep" />
                <p className="mt-3 font-semibold">{m.title}</p>
                <p className="mt-1 text-sm text-ink/65">{m.text}</p>
                {m.href && <a href={m.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-gold-deep underline">Apply for franchise</a>}
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
