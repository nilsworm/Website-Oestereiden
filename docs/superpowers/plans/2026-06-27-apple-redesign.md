# Apple Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Vollständiges Apple-Like Redesign der SuS Oestereiden Website — weiße Basis, Royal Blue als Akzent, Bottom Tab Bar auf Mobile, große Typografie.

**Architecture:** Tailwind-Tokens werden zuerst aktualisiert, dann Komponenten von innen nach außen (Leaf-Komponenten zuerst, dann Sections, dann Layout). Die Bottom Tab Bar ist eine neue `'use client'`-Komponente, die in `layout.tsx` eingeklinkt wird. Kein neues Routing, keine Datenänderungen außer `heroImage` in departments.ts.

**Tech Stack:** Next.js 14+, Tailwind CSS, Framer Motion, Lucide React, Inter (Google Fonts)

---

## File Map

| Aktion | Datei | Inhalt |
|--------|-------|--------|
| Create | `src/components/layout/BottomTabBar.tsx` | Mobile Bottom Navigation |
| Create | `src/components/layout/MoreSheet.tsx` | Framer Motion Sheet für "Mehr"-Tab |
| Modify | `tailwind.config.ts` | surface-Farbe, neue Textfarben |
| Modify | `src/app/globals.css` | Safe-Area, clip-diagonal entfernen |
| Modify | `src/lib/types.ts` | heroImage? zu DepartmentInfo |
| Modify | `src/data/departments.ts` | heroImage Werte hinzufügen |
| Modify | `src/app/layout.tsx` | BottomTabBar einbinden, main pb-20 |
| Modify | `src/components/layout/Navbar.tsx` | Helles Theme, kein Hamburger |
| Modify | `src/components/ui/HeroSection.tsx` | Weißer Text-Block + Foto unten |
| Modify | `src/components/motion/AnimatedStats.tsx` | Helle Zahlenreihe |
| Modify | `src/components/sections/QuoteSection.tsx` | Mobile-Layout |
| Modify | `src/components/ui/DepartmentCard.tsx` | Foto oben, Apple-Card-Stil |
| Modify | `src/components/ui/EventCard.tsx` | rounded-2xl, kein border-l |
| Modify | `src/components/ui/BoardMember.tsx` | Farben für hellen Hintergrund |
| Modify | `src/app/page.tsx` | Section-Farben + Mobile Scroll Shelfs |
| Modify | `src/components/sections/StandortSection.tsx` | Heller Hintergrund |
| Modify | `src/components/sections/VereinsinfoSection.tsx` | Weißer Hintergrund |
| Modify | `src/components/layout/Footer.tsx` | #1d1d1f Hintergrund, Logo |
| Modify | `src/app/fussball/page.tsx` | bg-sus-ice → Apple-Card |

---

## Task 1: Design Tokens — Tailwind + globals.css

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

- [ ] **Schritt 1: tailwind.config.ts aktualisieren**

Ersetze die `sus`-Farbpalette und ergänze Apple-Farben:

```ts
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
```

- [ ] **Schritt 2: globals.css aktualisieren**

Entferne `clip-diagonal`, füge Safe-Area-Utility hinzu:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply text-apple-text bg-white antialiased;
    font-feature-settings: 'kern', 'liga', 'calt';
  }

  h1 { @apply font-black tracking-tight; }
  h2 { @apply font-bold tracking-tight; }
  h3 { @apply font-bold; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-8px); }
}

@keyframes ticker {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@layer utilities {
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .animate-ticker {
    animation: ticker 32s linear infinite;
  }

  .animate-ticker:hover {
    animation-play-state: paused;
  }

  .pb-safe {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
```

- [ ] **Schritt 3: Dev-Server starten und Build prüfen**

```bash
npm run dev
```

Erwartung: Server startet ohne TypeScript-Fehler auf http://localhost:3000.

- [ ] **Schritt 4: Commit**

```bash
git add tailwind.config.ts src/app/globals.css
git commit -m "feat: add Apple design tokens and safe-area utility"
```

---

## Task 2: Data Layer — heroImage zu departments

**Files:**
- Modify: `src/lib/types.ts:35-40`
- Modify: `src/data/departments.ts`

- [ ] **Schritt 1: DepartmentInfo type erweitern**

In `src/lib/types.ts`, ergänze `heroImage?` zu `DepartmentInfo`:

```ts
export interface DepartmentInfo {
  id: Department
  label: string
  description: string
  head: string
  heroImage?: string
}
```

- [ ] **Schritt 2: departments.ts mit heroImage befüllen**

Ersetze den gesamten Inhalt von `src/data/departments.ts`:

```ts
import type { DepartmentInfo } from '@/lib/types'

export const departments: DepartmentInfo[] = [
  {
    id: 'fussball',
    label: 'Fußball',
    description: 'Von der E-Jugend bis zu den Senioren – Fußball für jedes Alter. Gemeinsam mit der SG Haarstrang.',
    head: 'Rolf Benteler',
    heroImage: '/images/hero/Fussball-30.jpg',
  },
  {
    id: 'volleyball',
    label: 'Volleyball',
    description: 'Hallenvolleyball für Damen, Herren und Jugend – von den Minis bis zur 1. Mannschaft.',
    head: 'Doris Witthaut',
    heroImage: '/images/hero/Verein-allgemein-16.jpg',
  },
  {
    id: 'tennis',
    label: 'Tennis',
    description: 'Moderne Tennisanlage mit mehreren Plätzen, Jugendförderung und eigenem Trainer.',
    head: 'Gerrit Keil',
    heroImage: '/images/hero/Tennis-2.jpg',
  },
  {
    id: 'breitensport',
    label: 'Breitensport',
    description: 'Kindertanzen, Kinderturnen, Fitness, Fit Mix, Nordic Walking – Sport für die ganze Familie.',
    head: 'Carina Kaltschmidt',
    heroImage: '/images/hero/Kindertanzen-6.jpg',
  },
]
```

- [ ] **Schritt 3: TypeScript-Check**

```bash
npx tsc --noEmit
```

Erwartung: Keine Fehler.

- [ ] **Schritt 4: Commit**

```bash
git add src/lib/types.ts src/data/departments.ts
git commit -m "feat: add heroImage field to DepartmentInfo"
```

---

## Task 3: MoreSheet — iOS-Sheet von unten

**Files:**
- Create: `src/components/layout/MoreSheet.tsx`

- [ ] **Schritt 1: MoreSheet erstellen**

Erstelle `src/components/layout/MoreSheet.tsx`:

```tsx
'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'

const moreLinks = [
  { href: '/volleyball', label: 'Volleyball' },
  { href: '/tennis', label: 'Tennis' },
  { href: '/breitensport', label: 'Breitensport' },
  { href: '/mitgliedschaft', label: 'Mitglied werden' },
]

interface MoreSheetProps {
  open: boolean
  onClose: () => void
}

export default function MoreSheet({ open, onClose }: MoreSheetProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl rounded-t-3xl md:hidden"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 4.5rem)' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          >
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
              <p className="font-semibold text-[#1d1d1f] text-[15px]">Mehr</p>
              <button onClick={onClose} className="p-1 text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="px-6 py-2">
              {moreLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`flex items-center justify-between py-4 border-b border-gray-100 last:border-0 text-[15px] font-medium transition-colors ${
                    pathname === link.href || pathname.startsWith(link.href + '/')
                      ? 'text-[#1a35c8]'
                      : 'text-[#1d1d1f]'
                  }`}
                >
                  {link.label}
                  <span className="text-[#6e6e73] text-lg leading-none">›</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Schritt 2: TypeScript-Check**

```bash
npx tsc --noEmit
```

Erwartung: Keine Fehler.

- [ ] **Schritt 3: Commit**

```bash
git add src/components/layout/MoreSheet.tsx
git commit -m "feat: add MoreSheet — iOS-style bottom sheet for mobile nav"
```

---

## Task 4: BottomTabBar — Mobile Navigation

**Files:**
- Create: `src/components/layout/BottomTabBar.tsx`

- [ ] **Schritt 1: BottomTabBar erstellen**

Erstelle `src/components/layout/BottomTabBar.tsx`:

```tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Target, Calendar, UserPlus, Grid2x2 } from 'lucide-react'
import MoreSheet from './MoreSheet'

const mainTabs = [
  { href: '/', label: 'Start', icon: Home },
  { href: '/fussball', label: 'Fußball', icon: Target },
  { href: '/hallenbelegung', label: 'Halle', icon: Calendar },
  { href: '/mitgliedschaft', label: 'Mitglied', icon: UserPlus },
]

const moreHrefs = ['/volleyball', '/tennis', '/breitensport']

export default function BottomTabBar() {
  const [sheetOpen, setSheetOpen] = useState(false)
  const pathname = usePathname()

  const isMoreActive = moreHrefs.some(h => pathname === h || pathname.startsWith(h + '/'))

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/80 backdrop-blur-xl border-t border-gray-200/60"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-stretch">
          {mainTabs.map(tab => {
            const isActive =
              tab.href === '/'
                ? pathname === '/'
                : pathname === tab.href || pathname.startsWith(tab.href + '/')
            const Icon = tab.icon
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 min-h-[52px]"
              >
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2 : 1.5}
                  className={isActive ? 'text-[#1a35c8]' : 'text-[#6e6e73]'}
                />
                <span className={`text-[10px] font-medium leading-none ${isActive ? 'text-[#1a35c8]' : 'text-[#6e6e73]'}`}>
                  {tab.label}
                </span>
              </Link>
            )
          })}

          <button
            onClick={() => setSheetOpen(true)}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 min-h-[52px]"
          >
            <Grid2x2
              size={22}
              strokeWidth={isMoreActive || sheetOpen ? 2 : 1.5}
              className={isMoreActive || sheetOpen ? 'text-[#1a35c8]' : 'text-[#6e6e73]'}
            />
            <span className={`text-[10px] font-medium leading-none ${isMoreActive || sheetOpen ? 'text-[#1a35c8]' : 'text-[#6e6e73]'}`}>
              Mehr
            </span>
          </button>
        </div>
      </nav>

      <MoreSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </>
  )
}
```

- [ ] **Schritt 2: TypeScript-Check**

```bash
npx tsc --noEmit
```

Erwartung: Keine Fehler.

- [ ] **Schritt 3: Commit**

```bash
git add src/components/layout/BottomTabBar.tsx
git commit -m "feat: add BottomTabBar — iOS-style mobile navigation"
```

---

## Task 5: Layout — BottomTabBar einbinden

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Schritt 1: layout.tsx aktualisieren**

Ersetze den gesamten Inhalt von `src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/layout/CookieBanner'
import BottomTabBar from '@/components/layout/BottomTabBar'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: 'SuS Oestereiden e.V. 1922',
    template: '%s | SuS Oestereiden',
  },
  description: 'Spiel- und Sportverein Oestereiden e.V. — gegründet 1922 in Rüthen. Fußball, Volleyball, Tennis und Breitensport.',
  keywords: ['SuS Oestereiden', 'Sportverein', 'Rüthen', 'Fußball', 'Volleyball', 'Tennis', 'Breitensport'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} h-full antialiased`}>
      <body className="font-sans min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 pt-14 pb-20 md:pb-0">
          {children}
        </main>
        <Footer />
        <BottomTabBar />
        <CookieBanner />
      </body>
    </html>
  )
}
```

- [ ] **Schritt 2: Visuell prüfen**

Öffne http://localhost:3000 auf einem mobilen Viewport (Chrome DevTools, iPhone-Größe). Die Bottom Tab Bar muss unten sichtbar sein, mit 5 Tabs: Start, Fußball, Halle, Mitglied, Mehr.

- [ ] **Schritt 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: wire BottomTabBar into root layout"
```

---

## Task 6: Navbar — helles Apple-Theme

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

- [ ] **Schritt 1: Navbar komplett ersetzen**

Ersetze den gesamten Inhalt von `src/components/layout/Navbar.tsx`:

```tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/fussball', label: 'Fußball' },
  { href: '/volleyball', label: 'Volleyball' },
  { href: '/tennis', label: 'Tennis' },
  { href: '/breitensport', label: 'Breitensport' },
  { href: '/hallenbelegung', label: 'Hallenbelegung' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-white/80 border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">

          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/images/logo.png"
              alt="SuS Oestereiden"
              width={28}
              height={28}
            />
            <span className="text-[#1d1d1f] text-[13px] font-semibold group-hover:text-[#1a35c8] transition-colors duration-150">
              SuS Oestereiden
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map(link => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-[13px] font-medium transition-colors duration-150 ${
                    isActive
                      ? 'text-[#1a35c8]'
                      : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link
              href="/mitgliedschaft"
              className="ml-3 px-4 py-1.5 rounded-full bg-[#1a35c8] text-white text-[13px] font-semibold hover:bg-[#1a35c8]/90 transition-colors duration-150"
            >
              Mitglied werden
            </Link>
          </div>

        </div>
      </div>
    </nav>
  )
}
```

- [ ] **Schritt 2: Visuell prüfen**

http://localhost:3000 — Navbar muss weiß/transluzent sein. Auf Mobile: nur Logo sichtbar, kein Hamburger. Auf Desktop: alle Links sichtbar, blauer "Mitglied werden" Button.

- [ ] **Schritt 3: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: Navbar — light Apple theme, remove mobile hamburger"
```

---

## Task 7: HeroSection — weißer Text-Block + Foto unten

**Files:**
- Modify: `src/components/ui/HeroSection.tsx`

- [ ] **Schritt 1: HeroSection komplett ersetzen**

Ersetze den gesamten Inhalt von `src/components/ui/HeroSection.tsx`:

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface HeroSectionProps {
  title: string
  subtitle: string
  description?: string
  bgImage?: string
  icon?: string // backwards-compatible: accepted but not rendered (other subpages may still pass it)
  children?: React.ReactNode
}

const ease = [0.25, 0.1, 0.25, 1] as const

export default function HeroSection({ title, subtitle, description, bgImage, children }: HeroSectionProps) {
  return (
    <section>
      {/* Weißer Text-Block */}
      <div className="bg-white px-4 pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.p
            className="text-[#1a35c8] font-semibold text-xs uppercase tracking-[0.15em] mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease }}
          >
            Seit 1922
          </motion.p>
          <motion.h1
            className="text-[clamp(44px,8vw,96px)] font-black tracking-tight leading-[0.95] mb-5 text-[#1d1d1f]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-[#6e6e73] font-light mb-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease }}
          >
            {subtitle}
          </motion.p>
          {description && (
            <motion.p
              className="text-base text-[#6e6e73] max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45, ease }}
            >
              {description}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55, ease }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>

      {/* Fullbleed Foto */}
      {bgImage && (
        <div className="relative w-full aspect-[4/3] md:aspect-[16/7] overflow-hidden">
          <Image
            src={bgImage}
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      )}
    </section>
  )
}
```

- [ ] **Schritt 2: Visuell prüfen**

http://localhost:3000 — Hero muss weißen Text-Block oben zeigen (großer Titel, grauer Untertitel) und darunter das Vereinsfoto fullbleed ohne Overlay.

Subseite prüfen: http://localhost:3000/fussball — gleiches Muster: weißer Block oben, Fußball-Foto unten.

- [ ] **Schritt 3: Commit**

```bash
git add src/components/ui/HeroSection.tsx
git commit -m "feat: HeroSection — white text block + fullbleed photo below"
```

---

## Task 8: AnimatedStats — helle Zahlenreihe

**Files:**
- Modify: `src/components/motion/AnimatedStats.tsx`

- [ ] **Schritt 1: AnimatedStats ersetzen**

Ersetze den gesamten Inhalt von `src/components/motion/AnimatedStats.tsx`:

```tsx
'use client'

import CountUp from '@/components/motion/CountUp'
import FadeIn from '@/components/motion/FadeIn'

const stats = [
  { label: 'Gegründet', value: '1922' },
  { label: 'Mitglieder', value: '860+' },
  { label: 'Abteilungen', value: '4' },
  { label: 'Standort', value: 'Rüthen' },
]

export default function AnimatedStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
      {stats.map((stat, i) => (
        <FadeIn key={stat.label} delay={i * 0.08}>
          <div className="text-center">
            <div className="text-[clamp(36px,5vw,64px)] font-black text-[#1a35c8] leading-none mb-2">
              <CountUp target={stat.value} />
            </div>
            <div className="text-sm text-[#6e6e73] font-medium">{stat.label}</div>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}
```

- [ ] **Schritt 2: Visuell prüfen**

http://localhost:3000 — beim Scrollen zur Stats-Section müssen 4 große blaue Zahlen auf weißem Hintergrund erscheinen (keine dunklen Kacheln mehr).

- [ ] **Schritt 3: Commit**

```bash
git add src/components/motion/AnimatedStats.tsx
git commit -m "feat: AnimatedStats — large blue numbers on white background"
```

---

## Task 9: QuoteSection — Mobile-Layout

**Files:**
- Modify: `src/components/sections/QuoteSection.tsx`

- [ ] **Schritt 1: QuoteSection ersetzen**

Ersetze den gesamten Inhalt von `src/components/sections/QuoteSection.tsx`:

```tsx
'use client'

import Image from 'next/image'
import FadeIn from '@/components/motion/FadeIn'

export default function QuoteSection() {
  return (
    <section className="py-20 md:py-28 px-4 bg-[#0a0e1a] flex items-center">
      <div className="max-w-7xl mx-auto w-full">

        {/* Mobile: kleines rundes Foto zentriert + Zitat darunter */}
        <div className="md:hidden flex flex-col items-center text-center">
          <FadeIn>
            <div className="relative w-20 h-20 rounded-full overflow-hidden mb-6 ring-2 ring-white/20">
              <Image
                src="/images/board/ulrich-mehn.jpg"
                alt="Ulrich Mehn"
                fill
                className="object-cover object-top"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <blockquote>
              <p className="text-[clamp(18px,4vw,24px)] font-light text-[#f0f2ff] leading-relaxed mb-6">
                „Seit über 100 Jahren sind wir mehr als ein Sportverein —
                wir sind ein Stück Heimat für über 860 Menschen in Rüthen."
              </p>
              <footer className="border-t border-white/20 pt-5">
                <p className="font-semibold text-[#f0f2ff] text-sm">Ulrich Mehn</p>
                <p className="text-[#1a35c8] text-xs mt-0.5">Vereinsvorsitzender, SuS Oestereiden e.V.</p>
              </footer>
            </blockquote>
          </FadeIn>
        </div>

        {/* Desktop: 2-Spalten */}
        <div className="hidden md:grid grid-cols-2 gap-20 items-center">
          <FadeIn>
            <div className="relative aspect-square rounded-2xl overflow-hidden max-w-sm shadow-2xl">
              <Image
                src="/images/board/ulrich-mehn.jpg"
                alt="Ulrich Mehn, Vereinsvorsitzender"
                fill
                sizes="40vw"
                className="object-cover object-top"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <blockquote>
              <p className="text-[#1a35c8] text-xs font-semibold uppercase tracking-[0.15em] mb-6">
                Vereinsvorsitzender
              </p>
              <p className="text-[clamp(18px,2.2vw,28px)] font-light text-[#f0f2ff] leading-relaxed mb-8">
                „Seit über 100 Jahren sind wir mehr als ein Sportverein —
                wir sind ein Stück Heimat für über 860 Menschen in Rüthen."
              </p>
              <footer className="border-t border-white/20 pt-6">
                <p className="font-semibold text-[#f0f2ff]">Ulrich Mehn</p>
                <p className="text-[#1a35c8]/70 text-sm mt-0.5">
                  Vereinsvorsitzender, SuS Oestereiden e.V.
                </p>
              </footer>
            </blockquote>
          </FadeIn>
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Schritt 2: Visuell prüfen (Mobile)**

http://localhost:3000 auf mobilem Viewport — QuoteSection muss kleines rundes Foto (80px) zentriert über dem Zitat zeigen. Kein großes quadratisches Bild.

- [ ] **Schritt 3: Commit**

```bash
git add src/components/sections/QuoteSection.tsx
git commit -m "feat: QuoteSection — compact mobile layout with small circular photo"
```

---

## Task 10: DepartmentCard — Foto oben, Apple-Card-Stil

**Files:**
- Modify: `src/components/ui/DepartmentCard.tsx`

- [ ] **Schritt 1: DepartmentCard ersetzen**

Ersetze den gesamten Inhalt von `src/components/ui/DepartmentCard.tsx`:

```tsx
import Link from 'next/link'
import Image from 'next/image'
import { Target, Globe, Disc, Activity, Award } from 'lucide-react'
import type { DepartmentInfo, Department } from '@/lib/types'

const DEPT_ICONS: Record<Department, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  fussball:     Target,
  volleyball:   Globe,
  tennis:       Disc,
  breitensport: Activity,
  allgemein:    Award,
}

const DEPT_COLOR: Record<Department, string> = {
  fussball:     'text-[#1a35c8]',
  volleyball:   'text-[#0d7a6e]',
  tennis:       'text-[#c47d0e]',
  breitensport: 'text-[#6b4faa]',
  allgemein:    'text-[#1a35c8]',
}

interface DepartmentCardProps {
  department: DepartmentInfo
}

export default function DepartmentCard({ department }: DepartmentCardProps) {
  const Icon = DEPT_ICONS[department.id]

  return (
    <Link href={`/${department.id}`} className="group block h-full">
      <div className="bg-white rounded-2xl overflow-hidden h-full shadow-[0_2px_20px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-200">
        {department.heroImage ? (
          <div className="relative h-40 w-full overflow-hidden">
            <Image
              src={department.heroImage}
              alt={department.label}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="h-40 flex items-center justify-center bg-gray-50">
            <Icon size={48} strokeWidth={1.25} className={DEPT_COLOR[department.id]} />
          </div>
        )}
        <div className="p-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-base text-[#1d1d1f] group-hover:text-[#1a35c8] transition-colors">
              {department.label}
            </h3>
            <span className="text-[#6e6e73] text-lg leading-none group-hover:translate-x-0.5 transition-transform">›</span>
          </div>
          <p className="text-[#6e6e73] text-sm leading-relaxed">{department.description}</p>
        </div>
      </div>
    </Link>
  )
}
```

- [ ] **Schritt 2: Visuell prüfen**

http://localhost:3000 — Abteilungs-Cards müssen oben ein Foto zeigen (Fußball: Fußball-Foto, Tennis: Tennis-Foto etc.), darunter Name + Beschreibung. Hover: Foto zoomt leicht rein.

- [ ] **Schritt 3: Commit**

```bash
git add src/components/ui/DepartmentCard.tsx
git commit -m "feat: DepartmentCard — photo top, Apple card style with hover zoom"
```

---

## Task 11: EventCard — Apple Card Stil

**Files:**
- Modify: `src/components/ui/EventCard.tsx`

- [ ] **Schritt 1: EventCard ersetzen**

Ersetze den gesamten Inhalt von `src/components/ui/EventCard.tsx`:

```tsx
import type { Event, Department } from '@/lib/types'

const DEPT_LABELS: Record<string, string> = {
  fussball: 'Fußball',
  volleyball: 'Volleyball',
  tennis: 'Tennis',
  breitensport: 'Breitensport',
  allgemein: 'Allgemein',
}

const DEPT_TAG: Record<Department, string> = {
  fussball:     'text-[#1a35c8] bg-[#1a35c8]/10',
  volleyball:   'text-[#0d7a6e] bg-[#0d7a6e]/10',
  tennis:       'text-[#c47d0e] bg-[#c47d0e]/10',
  breitensport: 'text-[#6b4faa] bg-[#6b4faa]/10',
  allgemein:    'text-[#6e6e73] bg-[#6e6e73]/10',
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6 h-full hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)] transition-all duration-200">
      <div className="flex items-start justify-between gap-3 mb-4">
        <time className="text-xs font-semibold text-[#6e6e73] uppercase tracking-[0.08em]">
          {formatDate(event.date)}
        </time>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${DEPT_TAG[event.department]}`}>
          {DEPT_LABELS[event.department]}
        </span>
      </div>
      <h3 className="font-bold text-[#1d1d1f] text-base mb-2 leading-snug">{event.title}</h3>
      <p className="text-[#6e6e73] text-sm leading-relaxed">{event.description}</p>
    </div>
  )
}
```

- [ ] **Schritt 2: Visuell prüfen**

http://localhost:3000 — Event-Cards müssen weiß sein ohne linken farbigen Rand, mit `rounded-2xl` und sanftem Schatten.

- [ ] **Schritt 3: Commit**

```bash
git add src/components/ui/EventCard.tsx
git commit -m "feat: EventCard — Apple card style, remove left border"
```

---

## Task 12: BoardMember — Farben für hellen Hintergrund

**Files:**
- Modify: `src/components/ui/BoardMember.tsx`

- [ ] **Schritt 1: BoardMember aktualisieren**

Ersetze den gesamten Inhalt von `src/components/ui/BoardMember.tsx`:

```tsx
import Image from 'next/image'
import type { BoardMember as BoardMemberType } from '@/lib/types'

interface BoardMemberProps {
  member: BoardMemberType
}

export default function BoardMember({ member }: BoardMemberProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[#f5f5f7] mb-2.5 flex-shrink-0 ring-2 ring-gray-200">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="64px"
            className="object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xl font-semibold text-[#6e6e73]">
              {member.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <p className="font-semibold text-[#1d1d1f] text-xs leading-snug">{member.name}</p>
      <p className="text-[#6e6e73] text-[10px] mt-0.5 leading-snug">{member.role}</p>
    </div>
  )
}
```

- [ ] **Schritt 2: Commit**

```bash
git add src/components/ui/BoardMember.tsx
git commit -m "feat: BoardMember — light background colors"
```

---

## Task 13: page.tsx — Sections + Mobile Scroll Shelfs

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Schritt 1: page.tsx komplett ersetzen**

Ersetze den gesamten Inhalt von `src/app/page.tsx`:

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import HeroSection from '@/components/ui/HeroSection'
import EventCard from '@/components/ui/EventCard'
import BoardMember from '@/components/ui/BoardMember'
import DepartmentCard from '@/components/ui/DepartmentCard'
import SponsorGrid from '@/components/ui/SponsorGrid'
import FadeIn from '@/components/motion/FadeIn'
import AnimatedGrid from '@/components/motion/AnimatedGrid'
import AnimatedStats from '@/components/motion/AnimatedStats'
import QuoteSection from '@/components/sections/QuoteSection'
import StandortSection from '@/components/sections/StandortSection'
import VereinsinfoSection from '@/components/sections/VereinsinfoSection'
import { mainBoard, advisoryBoard } from '@/data/board'
import { events } from '@/data/events'
import { sponsors } from '@/data/sponsors'
import { departments } from '@/data/departments'

export const metadata: Metadata = {
  title: 'SuS Oestereiden e.V. 1922 — Der Verein für die Region',
}

export default function HomePage() {
  return (
    <>
      <HeroSection
        title="SuS Oestereiden e.V."
        subtitle="Der Verein für die Region"
        description="Über 860 Mitglieder, vier Abteilungen, eine Gemeinschaft."
        bgImage="/images/hero/Verein-allgemein-7.jpg"
      >
        <div className="flex flex-wrap gap-3 mt-8">
          <Link
            href="/mitgliedschaft"
            className="px-6 py-3 bg-[#1a35c8] text-white text-sm font-semibold rounded-full hover:bg-[#1a35c8]/90 transition-colors"
          >
            Mitglied werden
          </Link>
          <Link
            href="#abteilungen"
            className="px-6 py-3 border border-[#1d1d1f]/20 text-[#1d1d1f] text-sm font-semibold rounded-full hover:bg-[#1d1d1f]/5 transition-colors"
          >
            Abteilungen
          </Link>
        </div>
      </HeroSection>

      {/* Aktuelles */}
      <section className="py-20 md:py-28 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto w-full px-4">
          <FadeIn>
            <p className="text-xs font-semibold text-[#1a35c8] uppercase tracking-[0.15em] mb-3">Aktuell</p>
            <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-[#1d1d1f] mb-10">Termine & Neuigkeiten</h2>
          </FadeIn>
        </div>
        {/* Mobile: horizontaler Scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto px-4 pb-4 snap-x snap-mandatory">
          {events.map((event, i) => (
            <div key={i} className="flex-shrink-0 w-[300px] snap-start">
              <EventCard event={event} />
            </div>
          ))}
        </div>
        {/* Desktop: Grid */}
        <div className="hidden md:block max-w-7xl mx-auto px-4">
          <AnimatedGrid className="grid grid-cols-3 gap-6">
            {events.map((event, i) => (
              <EventCard key={i} event={event} />
            ))}
          </AnimatedGrid>
        </div>
      </section>

      {/* Über den Verein + Stats */}
      <section className="py-20 md:py-28 px-4 bg-white">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p className="text-xs font-semibold text-[#1a35c8] uppercase tracking-[0.15em] mb-3">Der Verein</p>
              <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-[#1d1d1f] mb-6">
                Seit über 100 Jahren<br />für die Region
              </h2>
              <p className="text-[#6e6e73] leading-relaxed mb-4 text-lg">
                Der Spiel- und Sportverein Oestereiden e.V. wurde 1922 gegründet und ist heute mit
                über 860 Mitgliedern der größte Verein im Stadtgebiet Rüthen.
              </p>
              <p className="text-[#6e6e73] leading-relaxed">
                Mit vier aktiven Abteilungen bieten wir Sport und Gemeinschaft für jedes Alter.
              </p>
            </FadeIn>
            <AnimatedStats />
          </div>
        </div>
      </section>

      {/* Foto-Ticker */}
      {(() => {
        const photos = [
          { src: '/images/hero/Fussball-30.jpg',          label: 'Fußball' },
          { src: '/images/hero/Verein-allgemein-7.jpg',   label: 'Vereinsleben' },
          { src: '/images/hero/Tennis-2.jpg',             label: 'Tennis' },
          { src: '/images/hero/Kindertanzen-6.jpg',       label: 'Breitensport' },
          { src: '/images/hero/Verein-allgemein-16.jpg',  label: 'Der Verein' },
        ]
        const track = [...photos, ...photos]
        return (
          <div className="overflow-hidden bg-[#0a0e1a]">
            <div className="flex animate-ticker w-max" style={{ animationDuration: '48s' }}>
              {track.map((photo, i) => (
                <div key={i} className="relative h-64 w-96 flex-shrink-0 overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.label}
                    className="w-full h-full object-cover brightness-90"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-5 py-4">
                    <span className="text-white/90 text-[11px] font-semibold uppercase tracking-[0.15em]">
                      {photo.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })()}

      {/* Vorsitzender-Zitat */}
      <QuoteSection />

      {/* Abteilungen */}
      <section id="abteilungen" className="py-20 md:py-28 px-4 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto w-full">
          <FadeIn>
            <p className="text-xs font-semibold text-[#1a35c8] uppercase tracking-[0.15em] mb-3">Sport</p>
            <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-[#1d1d1f] mb-10">Unsere Abteilungen</h2>
          </FadeIn>
          <AnimatedGrid className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {departments.map(dept => (
              <DepartmentCard key={dept.id} department={dept} />
            ))}
          </AnimatedGrid>
        </div>
      </section>

      {/* Vorstand */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto w-full">
          <FadeIn>
            <p className="text-xs font-semibold text-[#1a35c8] uppercase tracking-[0.15em] mb-2">Team</p>
            <h2 className="text-[clamp(22px,3vw,36px)] font-bold text-[#1d1d1f] mb-10">Vereinsvorstand</h2>
          </FadeIn>
          {/* Mobile: horizontaler Scroll */}
          <div className="md:hidden flex gap-6 overflow-x-auto pb-4 snap-x">
            {mainBoard.map(member => (
              <div key={member.name} className="flex-shrink-0 w-20 snap-start">
                <BoardMember member={member} />
              </div>
            ))}
          </div>
          {/* Desktop: Grid */}
          <AnimatedGrid className="hidden md:grid grid-cols-6 gap-6 mb-10">
            {mainBoard.map(member => (
              <BoardMember key={member.name} member={member} />
            ))}
          </AnimatedGrid>
          <div className="border-t border-gray-200 pt-8 mt-8">
            <FadeIn>
              <p className="text-[10px] font-semibold text-[#6e6e73] uppercase tracking-[0.15em] mb-6">Beisitzende</p>
            </FadeIn>
            {/* Mobile: horizontaler Scroll */}
            <div className="md:hidden flex gap-6 overflow-x-auto pb-4 snap-x">
              {advisoryBoard.map(member => (
                <div key={member.name} className="flex-shrink-0 w-20 snap-start">
                  <BoardMember member={member} />
                </div>
              ))}
            </div>
            {/* Desktop: Grid */}
            <AnimatedGrid className="hidden md:grid grid-cols-4 gap-6">
              {advisoryBoard.map(member => (
                <BoardMember key={member.name} member={member} />
              ))}
            </AnimatedGrid>
          </div>
        </div>
      </section>

      {/* Standort */}
      <StandortSection />

      {/* Vereinsinfos */}
      <VereinsinfoSection />

      {/* Sponsoren */}
      <section className="py-12 px-4 bg-[#f5f5f7] border-t border-gray-200/60">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] font-semibold text-[#6e6e73] uppercase tracking-[0.15em] text-center mb-8">
            Unsere Sponsoren
          </p>
          <SponsorGrid sponsors={sponsors} />
        </div>
      </section>
    </>
  )
}
```

- [ ] **Schritt 2: Visuell prüfen (Desktop)**

http://localhost:3000 auf Desktop:
- Hero: weißer Block + Foto
- Events: grauer Hintergrund, 3 Spalten
- Stats: weiß, große blaue Zahlen
- Abteilungen: grauer Hintergrund, 4 Spalten mit Fotos
- Vorstand: weiß, 6 Spalten

- [ ] **Schritt 3: Visuell prüfen (Mobile)**

http://localhost:3000 auf mobilem Viewport:
- Events: horizontal scrollbar, Cards 300px breit
- Abteilungen: 2×2 Grid
- Vorstand: horizontaler Scroll

- [ ] **Schritt 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: homepage — Apple section colors, mobile scroll shelfs, hero CTAs"
```

---

## Task 14: StandortSection — heller Hintergrund

**Files:**
- Modify: `src/components/sections/StandortSection.tsx`

- [ ] **Schritt 1: StandortSection ersetzen**

Ersetze den gesamten Inhalt von `src/components/sections/StandortSection.tsx`:

```tsx
'use client'

import FadeIn from '@/components/motion/FadeIn'

export default function StandortSection() {
  return (
    <section className="py-20 md:py-28 px-4 bg-[#f5f5f7]">
      <div className="max-w-7xl mx-auto w-full">
        <FadeIn>
          <p className="text-xs font-semibold text-[#1a35c8] uppercase tracking-[0.15em] mb-3">Standort</p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-[#1d1d1f] mb-12">So findest du uns</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <FadeIn className="md:col-span-2">
            <div className="rounded-2xl overflow-hidden h-[360px] md:h-full min-h-[300px] shadow-[0_2px_20px_rgba(0,0,0,0.08)]">
              <iframe
                title="Vereinshalle SuS Oestereiden"
                src="https://www.openstreetmap.org/export/embed.html?bbox=8.414%2C51.490%2C8.460%2C51.510&layer=mapnik&marker=51.4985%2C8.4370"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.2} className="flex flex-col justify-center">
            <div className="space-y-8">
              <div>
                <p className="text-[#1a35c8] text-xs font-semibold uppercase tracking-[0.15em] mb-2">Adresse</p>
                <p className="font-semibold text-[#1d1d1f]">Im Kirchfeld 1</p>
                <p className="text-[#6e6e73]">59602 Rüthen</p>
              </div>
              <div>
                <p className="text-[#1a35c8] text-xs font-semibold uppercase tracking-[0.15em] mb-2">Telefon</p>
                <a
                  href="tel:+492954924590"
                  className="font-semibold text-[#1d1d1f] hover:text-[#1a35c8] transition-colors"
                >
                  +49 2954 924590
                </a>
              </div>
              <div>
                <p className="text-[#1a35c8] text-xs font-semibold uppercase tracking-[0.15em] mb-2">E-Mail</p>
                <a
                  href="mailto:info@sus-oestereiden.de"
                  className="font-semibold text-[#1d1d1f] hover:text-[#1a35c8] transition-colors"
                >
                  info@sus-oestereiden.de
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Schritt 2: Commit**

```bash
git add src/components/sections/StandortSection.tsx
git commit -m "feat: StandortSection — light background, Apple text colors"
```

---

## Task 15: VereinsinfoSection — weißer Hintergrund

**Files:**
- Modify: `src/components/sections/VereinsinfoSection.tsx`

- [ ] **Schritt 1: Hintergrund + Farben aktualisieren**

Ändere in `src/components/sections/VereinsinfoSection.tsx`:
- Zeile 16: `className="py-20 md:py-28 px-4 bg-sus-ice"` → `className="py-20 md:py-28 px-4 bg-white"`
- Zeile 19: `text-sus-royal` → `text-[#1a35c8]`
- Zeile 20: `text-sus-ink` → `text-[#1d1d1f]`
- Alle `bg-sus-royal/10 text-sus-royal` → `bg-[#1a35c8]/10 text-[#1a35c8]`
- Alle `text-sus-ink` → `text-[#1d1d1f]`
- Alle `text-sus-ink/60` → `text-[#6e6e73]`
- `bg-sus-royal text-white` (CTA-Button) → `bg-[#1a35c8] text-white`
- `border-sus-royal/30 text-sus-royal` → `border-[#1a35c8]/30 text-[#1a35c8]`
- `hover:bg-sus-royal hover:text-white` → `hover:bg-[#1a35c8] hover:text-white`

Der vollständige Datei-Inhalt nach den Änderungen:

```tsx
'use client'

import Link from 'next/link'
import { UserPlus, LayoutGrid, Mail } from 'lucide-react'
import FadeIn from '@/components/motion/FadeIn'

const abteilungen = [
  { label: 'Fußball', href: '/fussball' },
  { label: 'Volleyball', href: '/volleyball' },
  { label: 'Tennis', href: '/tennis' },
  { label: 'Breitensport', href: '/breitensport' },
]

export default function VereinsinfoSection() {
  return (
    <section className="py-20 md:py-28 px-4 bg-white">
      <div className="max-w-7xl mx-auto w-full">
        <FadeIn>
          <p className="text-xs font-semibold text-[#1a35c8] uppercase tracking-[0.15em] mb-3">Der Verein</p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-[#1d1d1f] mb-12">Alles auf einen Blick</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <FadeIn delay={0}>
            <div className="bg-[#f5f5f7] rounded-2xl p-8 h-full flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[#1a35c8]/10 text-[#1a35c8] flex items-center justify-center mb-5">
                <UserPlus size={24} strokeWidth={1.75} />
              </div>
              <h3 className="font-bold text-[#1d1d1f] text-xl mb-3">Mitglied werden</h3>
              <p className="text-[#6e6e73] text-sm leading-relaxed mb-6 flex-1">
                Werde Teil unserer Gemeinschaft. Füll das Aufnahmeformular aus und der Vorstand meldet sich bei dir.
              </p>
              <Link
                href="/mitgliedschaft"
                className="inline-block px-5 py-2.5 bg-[#1a35c8] text-white text-sm font-semibold rounded-xl hover:bg-[#1a35c8]/90 transition-colors text-center"
              >
                Jetzt beitreten
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-[#f5f5f7] rounded-2xl p-8 h-full flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[#1a35c8]/10 text-[#1a35c8] flex items-center justify-center mb-5">
                <LayoutGrid size={24} strokeWidth={1.75} />
              </div>
              <h3 className="font-bold text-[#1d1d1f] text-xl mb-3">Unsere Abteilungen</h3>
              <p className="text-[#6e6e73] text-sm leading-relaxed mb-6 flex-1">
                Fußball, Volleyball, Tennis und Breitensport — für jedes Alter und jedes Niveau etwas dabei.
              </p>
              <div className="flex flex-wrap gap-2">
                {abteilungen.map(a => (
                  <Link
                    key={a.href}
                    href={a.href}
                    className="px-3 py-1 border border-[#1a35c8]/30 text-[#1a35c8] text-sm rounded-full hover:bg-[#1a35c8] hover:text-white transition-colors"
                  >
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-[#f5f5f7] rounded-2xl p-8 h-full flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[#1a35c8]/10 text-[#1a35c8] flex items-center justify-center mb-5">
                <Mail size={24} strokeWidth={1.75} />
              </div>
              <h3 className="font-bold text-[#1d1d1f] text-xl mb-3">Kontakt</h3>
              <p className="text-[#6e6e73] text-sm leading-relaxed mb-6 flex-1">
                Fragen? Wir sind für euch da.
              </p>
              <div className="space-y-3 text-sm">
                <p className="text-[#6e6e73]">Im Kirchfeld 1, 59602 Rüthen</p>
                <a href="tel:+492954924590" className="block text-[#1a35c8] font-semibold hover:underline">
                  +49 2954 924590
                </a>
                <a href="mailto:info@sus-oestereiden.de" className="block text-[#1a35c8] font-semibold hover:underline">
                  info@sus-oestereiden.de
                </a>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
```

- [ ] **Schritt 2: Commit**

```bash
git add src/components/sections/VereinsinfoSection.tsx
git commit -m "feat: VereinsinfoSection — white background, Apple text colors"
```

---

## Task 16: Footer — Redesign

**Files:**
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Schritt 1: Footer ersetzen**

Ersetze den gesamten Inhalt von `src/components/layout/Footer.tsx`:

```tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#1d1d1f] text-[#6e6e73] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <Image src="/images/logo.png" alt="SuS Oestereiden" width={28} height={28} />
              <div>
                <p className="text-white font-semibold text-sm leading-tight">SuS Oestereiden</p>
                <p className="text-[#1a35c8] text-[11px] font-semibold uppercase tracking-[0.1em]">e.V. 1922</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Im Kirchfeld 1<br />
              59602 Rüthen
            </p>
            <div className="mt-3 space-y-1 text-sm">
              <a href="tel:+492954924590" className="block hover:text-white transition-colors">
                +49 2954 924590
              </a>
              <a href="mailto:info@sus-oestereiden.de" className="block hover:text-white transition-colors">
                info@sus-oestereiden.de
              </a>
            </div>
          </div>

          <div>
            <p className="text-white font-semibold text-sm mb-4">Abteilungen</p>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/fussball', label: 'Fußball' },
                { href: '/volleyball', label: 'Volleyball' },
                { href: '/tennis', label: 'Tennis' },
                { href: '/breitensport', label: 'Breitensport' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold text-sm mb-4">Rechtliches</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
              </li>
              <li>
                <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutzerklärung</Link>
              </li>
              <li>
                <button
                  onClick={() => window.dispatchEvent(new Event('open-cookie-banner'))}
                  className="hover:text-white transition-colors text-left"
                >
                  Cookie-Einstellungen
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 mt-12 pt-6 text-center text-xs">
          © {new Date().getFullYear()} SuS Oestereiden e.V. 1922 · Alle Rechte vorbehalten
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Schritt 2: Visuell prüfen**

http://localhost:3000 — Footer muss `#1d1d1f` Hintergrund haben, Logo + Name oben links, 3 Spalten Links.

- [ ] **Schritt 3: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: Footer — dark Apple style with logo and clean columns"
```

---

## Task 17: Fußball-Seite — Info-Box aufhellen

**Files:**
- Modify: `src/app/fussball/page.tsx`

- [ ] **Schritt 1: Info-Box farben aktualisieren**

In `src/app/fussball/page.tsx`, ersetze die SG-Haarstrang Info-Box:

Alte Klassen: `bg-sus-ice rounded-2xl p-6 mb-14 border-l-4 border-sus-royal`
Neue Klassen: `bg-[#f5f5f7] rounded-2xl p-6 mb-14 border-l-4 border-[#1a35c8]`

Alte `text-sus-royal`: → `text-[#1a35c8]`
Alte `text-sus-ink`: → `text-[#1d1d1f]`
Alte `text-sus-ink/60`: → `text-[#6e6e73]`

Vollständiger Datei-Inhalt nach Änderung:

```tsx
import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'
import BoardMember from '@/components/ui/BoardMember'
import { fussballBoard } from '@/data/board'

export const metadata: Metadata = { title: 'Fußball' }

export default function FussballPage() {
  return (
    <>
      <HeroSection title="Fußball" subtitle="SuS Oestereiden" bgImage="/images/hero/Fussball-30.jpg" />

      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#f5f5f7] rounded-2xl p-6 mb-14 border-l-4 border-[#1a35c8]">
            <p className="text-xs font-semibold text-[#1a35c8] uppercase tracking-[0.1em] mb-1">Spielgemeinschaft</p>
            <h2 className="font-bold text-[#1d1d1f] mb-2">SG Haarstrang</h2>
            <p className="text-[#6e6e73] text-sm leading-relaxed">
              Im Seniorenbereich spielen wir gemeinsam mit Partnerklubs in der SG Haarstrang.
              Mehr Infos unter{' '}
              <a
                href="https://www.sg-haarstrang.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a35c8] underline hover:no-underline font-semibold"
              >
                www.sg-haarstrang.de
              </a>
            </p>
          </div>

          <p className="text-xs font-semibold text-[#1a35c8] uppercase tracking-[0.15em] mb-3">Team</p>
          <h2 className="text-[clamp(24px,3vw,40px)] font-bold text-[#1d1d1f] mb-10">Abteilungsvorstand</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {fussballBoard.map(member => (
              <BoardMember key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Schritt 2: TypeScript-Check + finaler Build**

```bash
npx tsc --noEmit
```

Erwartung: Keine Fehler.

- [ ] **Schritt 3: Visuell Gesamtcheck**

Prüfe folgende URLs auf Desktop und Mobile:
- http://localhost:3000 — Homepage vollständig
- http://localhost:3000/fussball — Hero + Info-Box + Board
- http://localhost:3000/hallenbelegung — Halle funktioniert
- http://localhost:3000/mitgliedschaft — CTA-Seite

Bottom Tab Bar: aktiver Tab muss blau hervorgehoben sein. "Mehr" öffnet das Sheet.

- [ ] **Schritt 4: Commit**

```bash
git add src/app/fussball/page.tsx
git commit -m "feat: fussball page — update colors to Apple design system"
```

---

## Abschluss

Nach Task 17 ist das Redesign vollständig. Empfohlener nächster Schritt: Branch auf `main` mergen oder PR öffnen.

```bash
git log --oneline feat/ui-redesign-royal-blue ^main
```

Alle Commits seit Branch-Abzweigung werden im PR gebündelt.
