import { useId } from 'react';

/*
 * The FSIA red star, redrawn as SVG from the live 94px logo.gif so it stays
 * sharp at any size. Each arm has a light and a dark half like the original,
 * and the "f" cycles gold → white → pink the way the GIF does.
 */

const C = { x: 50, y: 53 };
const R = 50;
const r = R * 0.382;
const pt = (deg: number, rad: number) => {
  const a = (deg * Math.PI) / 180;
  return `${(C.x + rad * Math.cos(a)).toFixed(2)},${(C.y + rad * Math.sin(a)).toFixed(2)}`;
};
const tips = [-90, -18, 54, 126, 198];
// Two triangles per arm: centre → tip → inner corner on each side.
const facets = tips.flatMap((t) => [
  { d: `M${C.x},${C.y} L${pt(t, R)} L${pt(t - 36, r)}Z`, light: true },
  { d: `M${C.x},${C.y} L${pt(t, R)} L${pt(t + 36, r)}Z`, light: false },
]);
const outline = tips.map((t) => `${pt(t, R)} ${pt(t + 36, r)}`).join(' ');

export default function LogoMark({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id={`${id}l`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff4d4d" />
          <stop offset="1" stopColor="#e00000" />
        </linearGradient>
        <linearGradient id={`${id}d`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b80000" />
          <stop offset="1" stopColor="#7a0000" />
        </linearGradient>
        <radialGradient id={`${id}c`} cx=".5" cy=".53" r=".5">
          <stop offset="0" stopColor="#5c0000" stopOpacity=".55" />
          <stop offset=".6" stopColor="#5c0000" stopOpacity="0" />
        </radialGradient>
      </defs>
      {facets.map((f, i) => (
        <path key={i} d={f.d} fill={`url(#${id}${f.light ? 'l' : 'd'})`} />
      ))}
      <polygon points={outline} fill={`url(#${id}c)`} />
      <polygon points={outline} fill="none" stroke="#ff8a8a" strokeOpacity=".35" strokeWidth=".8" strokeLinejoin="round" />
      <g className="fsia-mark-letters" textAnchor="middle" fontFamily='"Playfair Display", Georgia, serif'>
        <text x="50" y="66" fontSize="36" fontWeight="700">f</text>
        <text x="50" y="76.5" fontSize="9" fontWeight="600" letterSpacing=".4">sia</text>
      </g>
    </svg>
  );
}
