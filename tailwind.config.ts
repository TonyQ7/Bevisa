import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--ink-rgb) / <alpha-value>)',
        arkiv: 'rgb(var(--arkiv-rgb) / <alpha-value>)',
        sigill: 'rgb(var(--sigill-rgb) / <alpha-value>)',
        expiry: 'rgb(var(--expiry-rgb) / <alpha-value>)',
        saknas: 'rgb(var(--saknas-rgb) / <alpha-value>)',
        graphite: 'rgb(var(--graphite-rgb) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Familjen Grotesk"', 'sans-serif'],
        body: ['"Instrument Sans"', 'sans-serif'],
        mono: ['"Spline Sans Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config
