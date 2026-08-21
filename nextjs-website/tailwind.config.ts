import { join } from 'path';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Newsreader', 'Instrument Serif', 'Playfair Display', 'serif'],
        sans: ['var(--font-sans)', 'Geist', 'SF Pro Display', 'Switzer', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Geist Mono', 'JetBrains Mono', 'SF Mono', 'monospace'],
      },
      colors: {
        'canvas': 'var(--bg-canvas)',
        'surface': 'var(--bg-surface)',
        'subtle': 'var(--bg-subtle)',
        'border': 'var(--border-color)',
        'border-hover': 'var(--border-hover)',
        'text-main': 'var(--text-main)',
        'text-body': 'var(--text-body)',
        'text-muted': 'var(--text-muted)',
        'pastel-blue': 'var(--pastel-blue-bg)',
        'pastel-blue-text': 'var(--pastel-blue-text)',
        'pastel-green': 'var(--pastel-green-bg)',
        'pastel-green-text': 'var(--pastel-green-text)',
        'pastel-yellow': 'var(--pastel-yellow-bg)',
        'pastel-yellow-text': 'var(--pastel-yellow-text)',
        'pastel-red': 'var(--pastel-red-bg)',
        'pastel-red-text': 'var(--pastel-red-text)',
      },
      spacing: {
        '3.5': '8.75px',
        '7': '28px',
        '14': '56px',
        '24': '96px',
        '32': '128px',
      },
    },
  },
  plugins: [],
};