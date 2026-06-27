import type { Config } from 'tailwindcss'

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
        sus: {
          navy:  '#0a0e1a',
          club:  '#0f1f6e',
          royal: '#1a35c8',
          ice:   '#e8ecff',
          ink:   '#12172e',
          light: '#f0f2ff',
          muted: '#2a3670',
        },
        dept: {
          fussball:     '#1a35c8',
          volleyball:   '#0d7a6e',
          tennis:       '#c47d0e',
          breitensport: '#6b4faa',
          allgemein:    '#2a3670',
        },
        apple: {
          text:      '#1d1d1f',
          secondary: '#6e6e73',
          surface:   '#f5f5f7',
          dark:      '#1d1d1f',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
