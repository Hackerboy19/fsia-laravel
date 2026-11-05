/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0b0d17', 2: '#12152a', 3: '#1b1f3a' },
        gold: { DEFAULT: '#d4af37', soft: '#f3e3a1', deep: '#a8841f' },
        rose: { brand: '#c2185b' },
        cream: '#fbf7ee',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Outfit', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: { glow: '0 0 0 1px rgba(212,175,55,.25), 0 20px 60px -20px rgba(212,175,55,.35)' },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        shine: { from: { backgroundPosition: '200% 0' }, to: { backgroundPosition: '-200% 0' } },
        twinkle: { '0%,100%': { opacity: 0, transform: 'scale(.6)' }, '50%': { opacity: 1, transform: 'scale(1)' } },
      },
      animation: { marquee: 'marquee 40s linear infinite', shine: 'shine 6s linear infinite', twinkle: 'twinkle 3.5s ease-in-out infinite' },
    },
  },
  plugins: [],
};
