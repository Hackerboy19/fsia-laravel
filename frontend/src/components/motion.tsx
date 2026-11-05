/* Motion building blocks. Everything respects the visitor's "reduce motion" setting. */
import { animate, motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import { useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from 'react';

const ease = [0.2, 0.7, 0.2, 1] as const;

/* True once the element has reached the lower part of the screen, or anything above it.
   A plain in-view check can miss blocks during a fast flick scroll and leave them invisible;
   checking position on every scroll frame cannot. */
function useShown(ref: RefObject<HTMLElement>) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    let raf = 0;
    // Page position of the element's top, refreshed every frame in case content above it changes size.
    let top = el.getBoundingClientRect().top + window.scrollY;
    const reached = () => window.scrollY + window.innerHeight * 0.92 > top;
    const measure = () => {
      raf = 0;
      top = el.getBoundingClientRect().top + window.scrollY;
      if (reached()) setShown(true);
    };
    // Cheap comparison on every scroll event, so even a flick down and back up counts.
    const onScroll = () => {
      if (reached()) setShown(true);
      else if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, shown]);
  return shown;
}

/** Fades and lifts its children in when they scroll into view. */
export function Reveal({ children, delay = 0, y = 24, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const shown = useShown(ref);
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={shown || reduce ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

const staggerParent: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const staggerChild: Variants = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };

/** A grid or list whose items arrive one after another. Wrap each item in <StaggerItem>. */
export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const shown = useShown(ref);
  return (
    <motion.div ref={ref} className={className} variants={staggerParent} initial={reduce ? false : 'hidden'} animate={shown || reduce ? 'show' : 'hidden'}>
      {children}
    </motion.div>
  );
}
export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

/** Counts from 0 to `value` once it is on screen, in Indian number format. */
export function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, value, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, value]);
  return (
    <span ref={ref} className="tabular-nums">
      {n.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

/** Soft gold specks that twinkle behind a section. Purely decorative. */
export function Sparkles({ count = 22, className = '' }: { count?: number; className?: string }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${(i * 37) % 100}%`,
        top: `${(i * 53) % 100}%`,
        size: 3 + ((i * 7) % 6),
        delay: `${((i * 0.41) % 3.5).toFixed(2)}s`,
      })),
    [count],
  );
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-gold-soft animate-twinkle motion-reduce:hidden"
          style={{ left: d.left, top: d.top, width: d.size, height: d.size, animationDelay: d.delay, boxShadow: '0 0 12px 2px rgba(243,227,161,.6)' }}
        />
      ))}
    </div>
  );
}

/** Card that leans toward the pointer a little (desktop only). */
export function Tilt({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [r, setR] = useState({ x: 0, y: 0 });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ transformPerspective: 900 }}
      animate={{ rotateX: r.x, rotateY: r.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
        const b = ref.current.getBoundingClientRect();
        setR({ x: (0.5 - (e.clientY - b.top) / b.height) * 6, y: ((e.clientX - b.left) / b.width - 0.5) * 8 });
      }}
      onPointerLeave={() => setR({ x: 0, y: 0 })}
    >
      {children}
    </motion.div>
  );
}
