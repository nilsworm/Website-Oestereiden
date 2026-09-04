import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ui: {
          canvas: token('ui-canvas'),
          surface: token('ui-surface'),
          raised: token('ui-raised'),
          text: token('ui-text'),
          muted: token('ui-muted'),
          line: token('ui-line'),
          accent: token('ui-accent'),
          'accent-strong': token('ui-accent-strong'),
          inverse: token('ui-inverse'),
        },
        sus: {
          navy: token('ui-navy'),
          club: token('ui-club'),
          royal: token('ui-accent'),
          ice: token('ui-accent-soft'),
          ink: token('ui-text'),
          light: token('ui-inverse'),
          muted: token('ui-muted'),
        },
        dept: {
          fussball:     '#1a35c8',
          volleyball:   '#0d7a6e',
          tennis:       '#c47d0e',
          breitensport: '#6b4faa',
          allgemein:    '#2a3670',
        },
        apple: {
          text:      token('ui-text'),
          secondary: token('ui-muted'),
          surface:   token('ui-surface'),
          dark:      token('ui-navy'),
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [typography],
}

export default config
