# SuS Oestereiden UI/UX Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Vollständiges visuelles Redesign der Phase-1-Website — Royal Blue statt Grün, Layer-System (dunkel/hell/mittel), Inter-Typografie, Glassmorphism-Navbar, Micro-Animationen.

**Architecture:** Reine CSS/Tailwind-Änderungen plus ein neuer `useScrollReveal`-Hook. Keine neuen Routen, keine Datenänderungen, keine neuen Libraries. Alle TypeScript-Interfaces und Datendateien bleiben unberührt.

**Tech Stack:** Next.js 16 · TypeScript · Tailwind CSS v3 · @tailwindcss/typography · Inter (Google Fonts)

**Spec:** `docs/superpowers/specs/2026-06-21-sus-oestereiden-ui-redesign.md`

---

## File Map

```
Modify:  tailwind.config.ts                        — neue Farbpalette (sus.*, dept.*)
Modify:  src/app/globals.css                       — Base-Styles, float-Animation, clip-diagonal
Modify:  src/app/layout.tsx                        — Inter statt Geist, main pt-16

Create:  src/hooks/useScrollReveal.ts              — IntersectionObserver Hook

Modify:  src/components/layout/Navbar.tsx          — fixed, transparent→glassmorphism, CTA, mobile overlay
Modify:  src/components/layout/Footer.tsx          — neue Farben
Modify:  src/components/layout/CookieBanner.tsx    — floating card

Modify:  src/components/ui/HeroSection.tsx         — dunkel, diagonal, visual-prop, children slot
Modify:  src/components/ui/EventCard.tsx           — border-left dept-Farbe, neues Hover
Modify:  src/components/ui/DepartmentCard.tsx      — neues Icon-Container, Blue-Glow hover
Modify:  src/components/ui/BoardMember.tsx         — Club-Navy Avatar
Modify:  src/components/ui/SponsorGrid.tsx         — grayscale filter, dunkle Karten
Modify:  src/components/ui/HallSchedule.tsx        — Tages-Tabs, neue dept-Farben

Modify:  src/app/page.tsx                          — Layer-System, Stats-Bar, ScrollReveal
Modify:  src/app/fussball/page.tsx                 — Layer-System
Modify:  src/app/volleyball/page.tsx               — Layer-System
Modify:  src/app/tennis/page.tsx                   — Layer-System
Modify:  src/app/breitensport/page.tsx             — Layer-System
Modify:  src/app/hallenbelegung/page.tsx           — Layer-System
Modify:  src/app/mitgliedschaft/page.tsx           — Layer-System, dunkler Hero
Modify:  src/app/impressum/page.tsx                — Farbanpassung
Modify:  src/app/datenschutz/page.tsx              — Farbanpassung
```

---

## Task 1: Tailwind Config + globals.css + Font

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: tailwind.config.ts ersetzen**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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

- [ ] **Step 2: src/app/globals.css ersetzen**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply text-sus-ink bg-white antialiased;
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

@layer utilities {
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }

  .clip-diagonal {
    clip-path: polygon(0 0, 100% 0, 100% 94%, 0 100%);
    padding-bottom: 8%;
  }
}
```

- [ ] **Step 3: src/app/layout.tsx — Inter-Font + main pt-16**

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/layout/CookieBanner'
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
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Build prüfen**

```bash
npm run build
```

Erwartet: Build erfolgreich. Alle Seiten nutzen jetzt Inter-Font, body-Farbe ist `sus-ink`.

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts src/app/globals.css src/app/layout.tsx
git commit -m "feat: switch to Royal Blue palette, Inter font, float/clip-diagonal utilities"
```

---

## Task 2: Vereinslogo herunterladen

**Files:**
- Create: `public/images/logo.png`

- [ ] **Step 1: Logo herunterladen**

```bash
curl -L "https://www.sus-oestereiden.de/wp-content/uploads/2016/02/Logo-SUS_200px.png" \
  -o "public/images/logo.png"
```

- [ ] **Step 2: Prüfen**

```bash
ls -la public/images/logo.png
```

Erwartet: Datei existiert, Größe ~24 KB.

- [ ] **Step 3: Commit**

```bash
git add public/images/logo.png
git commit -m "feat: add club logo to public/images"
```

---

## Task 3: useScrollReveal Hook

**Files:**
- Create: `src/hooks/useScrollReveal.ts`

- [ ] **Step 1: Verzeichnis anlegen + Hook erstellen**

```bash
mkdir -p src/hooks
```

Datei `src/hooks/useScrollReveal.ts`:

```ts
'use client'

import { useEffect, useRef, useState } from 'react'

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const revealClass = visible
    ? 'opacity-100 translate-y-0 transition-all duration-500 ease-out'
    : 'opacity-0 translate-y-6'

  return { ref, revealClass }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useScrollReveal.ts
git commit -m "feat: add useScrollReveal hook with IntersectionObserver"
```

---

## Task 4: Navbar Redesign

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Navbar komplett ersetzen**

```tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '/fussball', label: 'Fußball' },
  { href: '/volleyball', label: 'Volleyball' },
  { href: '/tennis', label: 'Tennis' },
  { href: '/breitensport', label: 'Breitensport' },
  { href: '/hallenbelegung', label: 'Hallenbelegung' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-[16px] bg-[rgba(10,14,26,0.85)] border-b border-sus-muted shadow-lg'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="text-sus-light font-bold text-lg tracking-tight hover:opacity-80 transition-opacity"
            >
              SuS Oestereiden <span className="font-normal opacity-60">1922</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-2 text-sm font-medium text-sus-light/80 hover:text-sus-light transition-colors group"
                >
                  {link.label}
                  <span className="absolute bottom-1 left-3 right-3 h-px bg-sus-royal scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </Link>
              ))}
              <Link
                href="/mitgliedschaft"
                className="ml-3 px-4 py-2 bg-sus-royal text-white text-sm font-semibold rounded-md hover:bg-sus-royal/90 transition-colors"
              >
                Mitglied werden
              </Link>
            </div>

            <button
              className="md:hidden text-sus-light p-2 hover:bg-white/10 rounded-md transition-colors"
              onClick={() => setMenuOpen(true)}
              aria-label="Menü öffnen"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 bg-sus-navy z-50 flex flex-col items-center justify-center gap-8 md:hidden">
          <button
            className="absolute top-4 right-4 text-sus-light p-2 hover:bg-white/10 rounded-md"
            onClick={() => setMenuOpen(false)}
            aria-label="Menü schließen"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {[...navLinks, { href: '/mitgliedschaft', label: 'Mitglied werden' }].map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sus-light text-3xl font-bold hover:text-sus-royal transition-colors"
              style={{ transitionDelay: `${i * 40}ms` }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
```

- [ ] **Step 2: Build prüfen**

```bash
npm run build
```

Erwartet: Kein TypeScript-Fehler.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: redesign Navbar — fixed, transparent→glassmorphism, CTA button, mobile overlay"
```

---

## Task 5: HeroSection Redesign

**Files:**
- Modify: `src/components/ui/HeroSection.tsx`

- [ ] **Step 1: HeroSection ersetzen**

```tsx
import Image from 'next/image'

interface HeroSectionProps {
  title: string
  subtitle: string
  description?: string
  icon?: string
  children?: React.ReactNode
}

export default function HeroSection({ title, subtitle, description, icon, children }: HeroSectionProps) {
  return (
    <section className="relative bg-sus-navy text-sus-light clip-diagonal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <p className="text-sus-royal font-semibold text-xs uppercase tracking-[0.15em] mb-4">
              Seit 1922
            </p>
            <h1 className="text-[clamp(40px,6vw,80px)] font-black tracking-tight leading-none mb-4 text-sus-light">
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-sus-light/70 font-light mb-3">{subtitle}</p>
            {description && (
              <p className="text-base text-sus-light/50 max-w-lg leading-relaxed">{description}</p>
            )}
          </div>

          <div className="flex-shrink-0 flex items-center justify-center">
            {icon ? (
              <span className="text-[80px] md:text-[100px] leading-none">{icon}</span>
            ) : (
              <Image
                src="/images/logo.png"
                alt="SuS Oestereiden Logo"
                width={140}
                height={140}
                className="animate-float opacity-90"
                priority
              />
            )}
          </div>
        </div>
      </div>

      {children && (
        <div className="bg-sus-club/80 py-4 px-4">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      )}
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/HeroSection.tsx
git commit -m "feat: redesign HeroSection — dark, diagonal clip, logo float, icon prop, stats slot"
```

---

## Task 6: Footer + CookieBanner Redesign

**Files:**
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/layout/CookieBanner.tsx`

- [ ] **Step 1: Footer ersetzen**

```tsx
'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-sus-navy text-sus-light/70 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="text-sus-light font-bold text-lg mb-1">SuS Oestereiden</p>
            <p className="text-sus-royal text-xs font-semibold uppercase tracking-[0.1em] mb-4">e.V. 1922</p>
            <p className="text-sm leading-relaxed">
              Im Kirchfeld 1<br />
              59602 Rüthen
            </p>
            <p className="text-sm mt-3 space-y-1">
              <a href="tel:+4929549245900" className="block hover:text-sus-light transition-colors">
                +49 2954 924590
              </a>
              <a href="mailto:info@sus-oestereiden.de" className="block hover:text-sus-light transition-colors">
                info@sus-oestereiden.de
              </a>
            </p>
          </div>

          <div>
            <p className="text-sus-light font-bold text-sm uppercase tracking-[0.1em] mb-4">Abteilungen</p>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/fussball', label: 'Fußball' },
                { href: '/volleyball', label: 'Volleyball' },
                { href: '/tennis', label: 'Tennis' },
                { href: '/breitensport', label: 'Breitensport' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-sus-light transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sus-light font-bold text-sm uppercase tracking-[0.1em] mb-4">Rechtliches</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/impressum" className="hover:text-sus-light transition-colors">Impressum</Link>
              </li>
              <li>
                <Link href="/datenschutz" className="hover:text-sus-light transition-colors">Datenschutzerklärung</Link>
              </li>
              <li>
                <button
                  onClick={() => window.dispatchEvent(new Event('open-cookie-banner'))}
                  className="hover:text-sus-light transition-colors text-left"
                >
                  Cookie-Einstellungen
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sus-muted mt-12 pt-6 text-center text-xs text-sus-light/30">
          © {new Date().getFullYear()} SuS Oestereiden e.V. 1922 · Alle Rechte vorbehalten
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: CookieBanner ersetzen**

```tsx
'use client'

import { useState, useEffect } from 'react'

type ConsentState = {
  functional: true
  statistics: boolean
  marketing: boolean
}

const STORAGE_KEY = 'sus-cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [consent, setConsent] = useState<ConsentState>({
    functional: true,
    statistics: false,
    marketing: false,
  })

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) setVisible(true)

    const handler = () => setVisible(true)
    window.addEventListener('open-cookie-banner', handler)
    return () => window.removeEventListener('open-cookie-banner', handler)
  }, [])

  const save = (state: ConsentState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    setVisible(false)
    setExpanded(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-6 left-6 z-50 w-full max-w-md">
      <div className="rounded-2xl border border-sus-muted bg-[rgba(10,14,26,0.92)] backdrop-blur-[16px] p-5 shadow-2xl">
        <p className="text-sm text-sus-light/70 leading-relaxed mb-4">
          Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung zu bieten.
          Funktionale Cookies sind für den Betrieb notwendig.
        </p>

        {expanded && (
          <div className="mb-4 space-y-2 bg-sus-muted/20 rounded-lg p-3">
            <label className="flex items-center gap-2 text-sm text-sus-light/60">
              <input type="checkbox" checked disabled readOnly className="accent-sus-royal" />
              <span className="font-medium">Funktional</span>
              <span className="text-xs opacity-60">(immer aktiv)</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-sus-light cursor-pointer">
              <input
                type="checkbox"
                checked={consent.statistics}
                onChange={e => setConsent(c => ({ ...c, statistics: e.target.checked }))}
                className="accent-sus-royal"
              />
              <span className="font-medium">Statistiken</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-sus-light cursor-pointer">
              <input
                type="checkbox"
                checked={consent.marketing}
                onChange={e => setConsent(c => ({ ...c, marketing: e.target.checked }))}
                className="accent-sus-royal"
              />
              <span className="font-medium">Marketing</span>
            </label>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => save({ functional: true, statistics: true, marketing: true })}
            className="px-4 py-2 bg-sus-royal text-white text-sm font-semibold rounded-lg hover:bg-sus-royal/90 transition-colors"
          >
            Alle akzeptieren
          </button>
          <button
            onClick={() => save({ functional: true, statistics: false, marketing: false })}
            className="px-4 py-2 border border-sus-muted text-sus-light/70 text-sm font-medium rounded-lg hover:text-sus-light hover:border-sus-light/40 transition-colors"
          >
            Nur notwendige
          </button>
          {expanded ? (
            <button
              onClick={() => save(consent)}
              className="px-4 py-2 border border-sus-royal text-sus-royal text-sm font-medium rounded-lg hover:bg-sus-royal/10 transition-colors"
            >
              Einstellungen speichern
            </button>
          ) : (
            <button
              onClick={() => setExpanded(true)}
              className="px-4 py-2 border border-sus-muted text-sus-light/70 text-sm font-medium rounded-lg hover:text-sus-light hover:border-sus-light/40 transition-colors"
            >
              Einstellungen
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Tests laufen lassen**

```bash
npm test -- __tests__/components/CookieBanner.test.tsx
```

Erwartet: PASS — alle 6 Tests grün. Die Tests prüfen Verhalten (localStorage, Klicks), nicht Klassen.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Footer.tsx src/components/layout/CookieBanner.tsx
git commit -m "feat: redesign Footer and CookieBanner — dark palette, floating card"
```

---

## Task 7: EventCard + DepartmentCard + BoardMember Redesign

**Files:**
- Modify: `src/components/ui/EventCard.tsx`
- Modify: `src/components/ui/DepartmentCard.tsx`
- Modify: `src/components/ui/BoardMember.tsx`

- [ ] **Step 1: EventCard ersetzen**

```tsx
import type { Event } from '@/lib/types'

const DEPT_LABELS: Record<string, string> = {
  fussball: 'Fußball',
  volleyball: 'Volleyball',
  tennis: 'Tennis',
  breitensport: 'Breitensport',
  allgemein: 'Allgemein',
}

const DEPT_BORDER: Record<string, string> = {
  fussball:     'border-l-[#1a35c8]',
  volleyball:   'border-l-[#0d7a6e]',
  tennis:       'border-l-[#c47d0e]',
  breitensport: 'border-l-[#6b4faa]',
  allgemein:    'border-l-sus-muted',
}

const DEPT_TAG: Record<string, string> = {
  fussball:     'text-[#1a35c8] bg-[#1a35c8]/10',
  volleyball:   'text-[#0d7a6e] bg-[#0d7a6e]/10',
  tennis:       'text-[#c47d0e] bg-[#c47d0e]/10',
  breitensport: 'text-[#6b4faa] bg-[#6b4faa]/10',
  allgemein:    'text-sus-muted bg-sus-muted/10',
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
    <div className={`bg-white rounded-xl shadow-sm border-l-4 ${DEPT_BORDER[event.department]} p-6 hover:-translate-y-1 hover:shadow-md transition-all duration-200`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <time className="text-xs font-semibold text-sus-ink/40 uppercase tracking-[0.08em]">
          {formatDate(event.date)}
        </time>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${DEPT_TAG[event.department]}`}>
          {DEPT_LABELS[event.department]}
        </span>
      </div>
      <h3 className="font-bold text-lg text-sus-ink mb-2 leading-snug">{event.title}</h3>
      <p className="text-sus-ink/60 text-sm leading-relaxed">{event.description}</p>
    </div>
  )
}
```

- [ ] **Step 2: EventCard-Tests laufen lassen**

```bash
npm test -- __tests__/components/EventCard.test.tsx
```

Erwartet: PASS — alle 4 Tests grün. Der Text-Inhalt (Titel, Datum, Description, Badge) ist unverändert.

- [ ] **Step 3: DepartmentCard ersetzen**

```tsx
import Link from 'next/link'
import type { DepartmentInfo } from '@/lib/types'

const DEPT_ICONS: Record<string, string> = {
  fussball: '⚽',
  volleyball: '🏐',
  tennis: '🎾',
  breitensport: '🏃',
}

interface DepartmentCardProps {
  department: DepartmentInfo
}

export default function DepartmentCard({ department }: DepartmentCardProps) {
  return (
    <Link href={`/${department.id}`} className="group block h-full">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-sus-ice h-full hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(26,53,200,0.12)] transition-all duration-200">
        <div className="w-16 h-16 rounded-2xl bg-sus-ice flex items-center justify-center text-3xl mb-4">
          {DEPT_ICONS[department.id]}
        </div>
        <h3 className="font-bold text-lg text-sus-ink mb-2 group-hover:text-sus-royal transition-colors">
          {department.label}
        </h3>
        <p className="text-sus-ink/60 text-sm leading-relaxed mb-4">{department.description}</p>
        <p className="text-xs text-sus-ink/30 font-medium">Leitung: {department.head}</p>
      </div>
    </Link>
  )
}
```

- [ ] **Step 4: BoardMember ersetzen**

```tsx
import Image from 'next/image'
import type { BoardMember as BoardMemberType } from '@/lib/types'

interface BoardMemberProps {
  member: BoardMemberType
}

export default function BoardMember({ member }: BoardMemberProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-sus-club mb-3 flex items-center justify-center shadow-md">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-3xl font-black text-sus-light">
            {member.name.charAt(0)}
          </span>
        )}
      </div>
      <p className="font-semibold text-sus-ink text-sm leading-tight">{member.name}</p>
      <p className="text-sus-ink/40 text-xs mt-0.5 leading-tight">{member.role}</p>
    </div>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/EventCard.tsx src/components/ui/DepartmentCard.tsx src/components/ui/BoardMember.tsx
git commit -m "feat: redesign EventCard, DepartmentCard, BoardMember — Royal Blue dept colors, Blue-Glow hover"
```

---

## Task 8: SponsorGrid + HallSchedule Redesign

**Files:**
- Modify: `src/components/ui/SponsorGrid.tsx`
- Modify: `src/components/ui/HallSchedule.tsx`

- [ ] **Step 1: SponsorGrid ersetzen**

```tsx
import type { Sponsor } from '@/lib/types'

interface SponsorGridProps {
  sponsors: Sponsor[]
}

export default function SponsorGrid({ sponsors }: SponsorGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {sponsors.map((sponsor) => (
        <div
          key={sponsor.name}
          className="group flex items-center justify-center bg-white/8 rounded-xl p-5 h-20 hover:bg-white/15 transition-all duration-200"
        >
          <span className="text-sus-light/50 group-hover:text-sus-light text-sm font-semibold text-center leading-tight transition-colors duration-200">
            {sponsor.name}
          </span>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: HallSchedule ersetzen**

```tsx
'use client'

import { useState } from 'react'
import type { HallSlot } from '@/lib/types'

const DAYS = ['mo', 'di', 'mi', 'do', 'fr', 'sa', 'so'] as const
const DAY_LABELS: Record<string, string> = {
  mo: 'Montag', di: 'Dienstag', mi: 'Mittwoch',
  do: 'Donnerstag', fr: 'Freitag', sa: 'Samstag', so: 'Sonntag',
}
const DAY_SHORT: Record<string, string> = {
  mo: 'Mo', di: 'Di', mi: 'Mi', do: 'Do', fr: 'Fr', sa: 'Sa', so: 'So',
}

const DEPT_SLOT: Record<string, string> = {
  fussball:     'border-l-[#1a35c8] bg-[#1a35c8]/5 text-[#1a35c8]',
  volleyball:   'border-l-[#0d7a6e] bg-[#0d7a6e]/5 text-[#0d7a6e]',
  tennis:       'border-l-[#c47d0e] bg-[#c47d0e]/5 text-[#c47d0e]',
  breitensport: 'border-l-[#6b4faa] bg-[#6b4faa]/5 text-[#6b4faa]',
  allgemein:    'border-l-sus-muted bg-sus-muted/5 text-sus-muted',
}

interface HallScheduleProps {
  slots: HallSlot[]
}

export default function HallSchedule({ slots }: HallScheduleProps) {
  const [activeDay, setActiveDay] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState<HallSlot | null>(null)

  const filteredDays = activeDay ? [activeDay] : DAYS

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveDay(null)}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
            activeDay === null
              ? 'bg-sus-royal text-white'
              : 'border border-sus-muted/30 text-sus-ink/50 hover:border-sus-ink/30 hover:text-sus-ink'
          }`}
        >
          Alle
        </button>
        {DAYS.map(day => (
          <button
            key={day}
            onClick={() => setActiveDay(activeDay === day ? null : day)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              activeDay === day
                ? 'bg-sus-royal text-white'
                : 'border border-sus-muted/30 text-sus-ink/50 hover:border-sus-ink/30 hover:text-sus-ink'
            }`}
          >
            <span className="sm:hidden">{DAY_SHORT[day]}</span>
            <span className="hidden sm:inline">{DAY_LABELS[day]}</span>
          </button>
        ))}
      </div>

      <div className={`grid gap-3 ${filteredDays.length > 1 ? 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-7' : 'grid-cols-1 max-w-sm'}`}>
        {filteredDays.map(day => {
          const daySlots = slots.filter(s => s.day === day)
          return (
            <div key={day}>
              <p className="text-xs font-bold text-sus-ink/30 uppercase tracking-[0.1em] mb-2">
                {DAY_LABELS[day]}
              </p>
              <div className="space-y-2">
                {daySlots.length === 0 ? (
                  <div className="text-center text-xs text-sus-ink/20 py-3">–</div>
                ) : (
                  daySlots.map((slot, i) => (
                    <div
                      key={i}
                      className={`relative rounded-lg border-l-4 p-2.5 text-xs cursor-default ${DEPT_SLOT[slot.department]}`}
                      onMouseEnter={() => setTooltip(slot)}
                      onMouseLeave={() => setTooltip(null)}
                    >
                      <div className="font-bold truncate text-sus-ink">{slot.group}</div>
                      <div className="text-sus-ink/50 mt-0.5 font-medium">{slot.startTime}–{slot.endTime}</div>

                      {tooltip === slot && (
                        <div className="absolute z-10 bottom-full left-0 mb-1.5 bg-sus-navy text-sus-light text-xs rounded-xl px-3 py-2.5 w-48 shadow-xl pointer-events-none border border-sus-muted">
                          <div className="font-bold">{slot.group}</div>
                          <div className="text-sus-light/60 mt-0.5">{slot.startTime} – {slot.endTime} Uhr</div>
                          <div className="capitalize text-sus-light/40 mt-0.5">{slot.department}</div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: HallSchedule-Tests laufen lassen**

```bash
npm test -- __tests__/components/HallSchedule.test.tsx
```

Erwartet: PASS — alle 3 Tests grün. Die Tests prüfen Tagesnamen und Zeiten, nicht Klassen.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/SponsorGrid.tsx src/components/ui/HallSchedule.tsx
git commit -m "feat: redesign SponsorGrid and HallSchedule — dept colors, day-filter tabs"
```

---

## Task 9: Startseite Redesign

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: page.tsx komplett ersetzen**

```tsx
import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'
import EventCard from '@/components/ui/EventCard'
import BoardMember from '@/components/ui/BoardMember'
import DepartmentCard from '@/components/ui/DepartmentCard'
import SponsorGrid from '@/components/ui/SponsorGrid'
import { mainBoard, advisoryBoard } from '@/data/board'
import { events } from '@/data/events'
import { sponsors } from '@/data/sponsors'
import { departments } from '@/data/departments'

export const metadata: Metadata = {
  title: 'SuS Oestereiden e.V. 1922 — Der Verein für die Region',
}

const statsBar = (
  <div className="flex flex-wrap items-center gap-6 text-sus-light/70 text-sm font-medium">
    {[
      { value: '1922', label: 'Gegründet' },
      { value: '860+', label: 'Mitglieder' },
      { value: '4', label: 'Abteilungen' },
      { value: 'Rüthen', label: 'Standort' },
    ].map(stat => (
      <div key={stat.label} className="flex items-baseline gap-1.5">
        <span className="text-sus-light font-bold text-lg">{stat.value}</span>
        <span>{stat.label}</span>
      </div>
    ))}
  </div>
)

export default function HomePage() {
  return (
    <>
      <HeroSection
        title="SuS Oestereiden e.V."
        subtitle="Der Verein für die Region"
        description="Über 860 Mitglieder, vier Abteilungen, eine Gemeinschaft."
      >
        {statsBar}
      </HeroSection>

      {/* Aktuelles */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Aktuell</p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-sus-ink mb-10">Termine & Neuigkeiten</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event, i) => (
              <EventCard key={i} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Über den Verein */}
      <section className="py-24 px-4 bg-sus-navy text-sus-light">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Der Verein</p>
              <h2 className="text-[clamp(28px,4vw,48px)] font-bold mb-6">Seit über 100 Jahren<br />für die Region</h2>
              <p className="text-sus-light/60 leading-relaxed mb-4 text-lg">
                Der Spiel- und Sportverein Oestereiden e.V. wurde 1922 gegründet und ist heute mit
                über 860 Mitgliedern der größte Verein im Stadtgebiet Rüthen.
              </p>
              <p className="text-sus-light/60 leading-relaxed">
                Mit vier aktiven Abteilungen bieten wir Sport und Gemeinschaft für jedes Alter.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Gegründet', value: '1922' },
                { label: 'Mitglieder', value: '860+' },
                { label: 'Abteilungen', value: '4' },
                { label: 'Standort', value: 'Rüthen' },
              ].map(stat => (
                <div key={stat.label} className="bg-sus-club/50 rounded-2xl p-8 text-center border border-sus-muted/40">
                  <div className="text-4xl font-black text-sus-royal mb-1">{stat.value}</div>
                  <div className="text-sm text-sus-light/50 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Abteilungen */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Sport</p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-sus-ink mb-10">Unsere Abteilungen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map(dept => (
              <DepartmentCard key={dept.id} department={dept} />
            ))}
          </div>
        </div>
      </section>

      {/* Vorstand */}
      <section className="py-24 px-4 bg-sus-club">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Team</p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-sus-light mb-10">Vereinsvorstand</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 mb-14">
            {mainBoard.map(member => (
              <BoardMember key={member.name} member={member} />
            ))}
          </div>
          <p className="text-xs font-semibold text-sus-light/40 uppercase tracking-[0.1em] mb-6">Beisitzende</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {advisoryBoard.map(member => (
              <BoardMember key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Sponsoren */}
      <section className="py-24 px-4 bg-sus-navy">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Partner</p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-sus-light mb-10">Unsere Sponsoren</h2>
          <SponsorGrid sponsors={sponsors} />
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Build + visuelle Prüfung**

```bash
npm run build
```

Erwartet: Build erfolgreich, alle 9 Routen statisch gerendert.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: redesign Startseite — Layer System, Stats-Bar, Royal Blue palette"
```

---

## Task 10: Abteilungsseiten Redesign

**Files:**
- Modify: `src/app/fussball/page.tsx`
- Modify: `src/app/volleyball/page.tsx`
- Modify: `src/app/tennis/page.tsx`
- Modify: `src/app/breitensport/page.tsx`

- [ ] **Step 1: src/app/fussball/page.tsx ersetzen**

```tsx
import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'
import BoardMember from '@/components/ui/BoardMember'
import { fussballBoard } from '@/data/board'

export const metadata: Metadata = { title: 'Fußball' }

export default function FussballPage() {
  return (
    <>
      <HeroSection title="Fußball" subtitle="SuS Oestereiden" icon="⚽" />

      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-sus-ice rounded-2xl p-6 mb-14 border-l-4 border-sus-royal">
            <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.1em] mb-1">Spielgemeinschaft</p>
            <h2 className="font-bold text-sus-ink mb-2">SG Haarstrang</h2>
            <p className="text-sus-ink/60 text-sm leading-relaxed">
              Im Seniorenbereich spielen wir gemeinsam mit Partnerklubs in der SG Haarstrang.
              Mehr Infos unter{' '}
              <a
                href="https://www.sg-haarstrang.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sus-royal underline hover:no-underline font-semibold"
              >
                www.sg-haarstrang.de
              </a>
            </p>
          </div>

          <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Team</p>
          <h2 className="text-[clamp(24px,3vw,40px)] font-bold text-sus-ink mb-10">Abteilungsvorstand</h2>
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

- [ ] **Step 2: src/app/volleyball/page.tsx ersetzen**

```tsx
import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'
import BoardMember from '@/components/ui/BoardMember'
import { volleyballBoard } from '@/data/board'

export const metadata: Metadata = { title: 'Volleyball' }

export default function VolleyballPage() {
  return (
    <>
      <HeroSection title="Volleyball" subtitle="SuS Oestereiden" icon="🏐" />
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Team</p>
          <h2 className="text-[clamp(24px,3vw,40px)] font-bold text-sus-ink mb-10">Abteilungsvorstand</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {volleyballBoard.map(member => (
              <BoardMember key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: src/app/tennis/page.tsx ersetzen**

```tsx
import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'
import BoardMember from '@/components/ui/BoardMember'
import { tennisBoard } from '@/data/board'

export const metadata: Metadata = { title: 'Tennis' }

export default function TennisPage() {
  return (
    <>
      <HeroSection title="Tennis" subtitle="SuS Oestereiden" icon="🎾" />
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Team</p>
          <h2 className="text-[clamp(24px,3vw,40px)] font-bold text-sus-ink mb-10">Abteilungsvorstand</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
            {tennisBoard.map(member => (
              <BoardMember key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 4: src/app/breitensport/page.tsx ersetzen**

```tsx
import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'
import BoardMember from '@/components/ui/BoardMember'
import { breitensportBoard } from '@/data/board'

export const metadata: Metadata = { title: 'Breitensport' }

const kursangebot = [
  { gruppe: 'Kindertanzen', leitung: 'Sandra Risse' },
  { gruppe: 'Kinderturnen (3–4 Jahre)', leitung: 'Carolin Kaup' },
  { gruppe: 'Kinderturnen (5–6 Jahre)', leitung: 'Sandra Risse' },
  { gruppe: 'Kinderturnen (Vorschule)', leitung: 'Paulin Herting' },
  { gruppe: 'Kinderturnen (allgemein)', leitung: 'Janina Luig' },
  { gruppe: 'Tischtennis', leitung: 'Wolfgang Schulte Schilawa' },
  { gruppe: 'Fitness (Bauch-Beine-Po)', leitung: 'Katja Molerus' },
  { gruppe: 'Fit Mix', leitung: 'Melanie Kussmann' },
  { gruppe: 'Nordic Walking', leitung: 'Melanie Kussmann' },
]

export default function BreitensportPage() {
  return (
    <>
      <HeroSection title="Breitensport" subtitle="SuS Oestereiden" icon="🏃" />
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Team</p>
          <h2 className="text-[clamp(24px,3vw,40px)] font-bold text-sus-ink mb-10">Abteilungsvorstand</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-20">
            {breitensportBoard.map(member => (
              <BoardMember key={member.name} member={member} />
            ))}
          </div>

          <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Angebot</p>
          <h2 className="text-[clamp(24px,3vw,40px)] font-bold text-sus-ink mb-8">Kursangebot</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {kursangebot.map(kurs => (
              <div key={kurs.gruppe} className="bg-sus-ice rounded-xl p-4 border-l-4 border-[#6b4faa]">
                <div className="font-semibold text-sus-ink text-sm">{kurs.gruppe}</div>
                <div className="text-sus-ink/40 text-xs mt-1">Leitung: {kurs.leitung}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add src/app/fussball/page.tsx src/app/volleyball/page.tsx src/app/tennis/page.tsx src/app/breitensport/page.tsx
git commit -m "feat: redesign department pages — dark hero with icon, Royal Blue palette"
```

---

## Task 11: Hallenbelegung + Mitgliedschaft + Impressum + Datenschutz

**Files:**
- Modify: `src/app/hallenbelegung/page.tsx`
- Modify: `src/app/mitgliedschaft/page.tsx`
- Modify: `src/app/impressum/page.tsx`
- Modify: `src/app/datenschutz/page.tsx`

- [ ] **Step 1: src/app/hallenbelegung/page.tsx ersetzen**

```tsx
import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'
import HallSchedule from '@/components/ui/HallSchedule'
import { hallSlots } from '@/data/hallenbelegung'

export const metadata: Metadata = { title: 'Hallenbelegung' }

export default function HallenbelegungPage() {
  return (
    <>
      <HeroSection
        title="Hallenbelegung"
        subtitle="Wochenbelegungsplan der Vereinshalle"
        icon="🏟️"
      />
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { label: 'Fußball',     color: '#1a35c8' },
              { label: 'Volleyball',  color: '#0d7a6e' },
              { label: 'Tennis',      color: '#c47d0e' },
              { label: 'Breitensport',color: '#6b4faa' },
            ].map(item => (
              <span
                key={item.label}
                className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border-l-4 bg-white shadow-sm"
                style={{ borderColor: item.color, color: item.color }}
              >
                {item.label}
              </span>
            ))}
          </div>
          <HallSchedule slots={hallSlots} />
          <p className="text-xs text-sus-ink/30 mt-8">
            Stand: Saison 2024/25. Änderungen vorbehalten. Kontakt: info@sus-oestereiden.de
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: src/app/mitgliedschaft/page.tsx ersetzen**

```tsx
import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'

export const metadata: Metadata = { title: 'Mitgliedschaft' }

const distribution = [
  { abteilung: 'Breitensport', anteil: 35, color: '#6b4faa' },
  { abteilung: 'Fußball',      anteil: 33, color: '#1a35c8' },
  { abteilung: 'Tennis',       anteil: 20, color: '#c47d0e' },
  { abteilung: 'Volleyball',   anteil: 12, color: '#0d7a6e' },
]

export default function MitgliedschaftPage() {
  return (
    <>
      <HeroSection
        title="Werde Teil von 860+"
        subtitle="Mitglied bei SuS Oestereiden"
        description="Der größte Sportverein im Stadtgebiet Rüthen — seit 1922."
        icon="🤝"
      />

      <section className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Der Verein</p>
          <h2 className="text-[clamp(24px,3vw,40px)] font-bold text-sus-ink mb-6">Über uns</h2>
          <p className="text-sus-ink/60 leading-relaxed mb-12 text-lg">
            Der SuS Oestereiden e.V. ist mit über 860 Mitgliedern der größte Verein im
            Stadtgebiet Rüthen. Seit 1922 fördern wir Sport und Gemeinschaft in der Region.
          </p>

          <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Verteilung</p>
          <h2 className="text-[clamp(24px,3vw,40px)] font-bold text-sus-ink mb-8">Mitglieder</h2>
          <div className="space-y-4 mb-16">
            {distribution.map(d => (
              <div key={d.abteilung}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-semibold text-sus-ink">{d.abteilung}</span>
                  <span className="text-sus-ink/40 font-medium">{d.anteil} %</span>
                </div>
                <div className="h-2 bg-sus-ice rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${d.anteil}%`, backgroundColor: d.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-sus-club">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Aufnahme</p>
          <h2 className="text-[clamp(24px,3vw,40px)] font-bold text-sus-light mb-6">Jetzt Mitglied werden</h2>
          <p className="text-sus-light/60 leading-relaxed mb-8">
            Zur Aufnahme füllen Sie bitte den Aufnahmeantrag aus und senden ihn an:
          </p>
          <div className="bg-sus-navy/50 rounded-2xl p-6 mb-8 border border-sus-muted text-sus-light/70 text-sm leading-loose">
            <strong className="text-sus-light">SuS Oestereiden e.V.</strong><br />
            z. Hd. Michael Witthaut<br />
            Im Kirchfeld 1<br />
            59602 Rüthen<br />
            <a href="mailto:info@sus-oestereiden.de" className="text-sus-royal hover:underline font-semibold">
              info@sus-oestereiden.de
            </a>
          </div>
          <a
            href="/downloads/aufnahmeantrag.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 bg-sus-royal text-white font-semibold rounded-xl hover:bg-sus-royal/90 transition-colors"
          >
            Aufnahmeantrag herunterladen (PDF)
          </a>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: src/app/impressum/page.tsx ersetzen**

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Impressum' }

export default function ImpressumPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Rechtliches</p>
      <h1 className="text-4xl font-black text-sus-ink mb-10">Impressum</h1>

      <div className="prose prose-zinc max-w-none prose-headings:font-bold prose-a:text-sus-royal">
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          Spiel- und Sportverein Oestereiden e.V. 1922<br />
          Im Kirchfeld 1<br />
          59602 Rüthen
        </p>
        <h2>Vertreten durch</h2>
        <p>
          Ulrich Mehn (Vereinsvorsitzender)<br />
          Michael Witthaut (Geschäftsführer)
        </p>
        <h2>Kontakt</h2>
        <p>
          Telefon: +49 2954 924590<br />
          E-Mail: <a href="mailto:info@sus-oestereiden.de">info@sus-oestereiden.de</a>
        </p>
        <h2>Vereinsregister</h2>
        <p>
          Registergericht: Amtsgericht Warstein<br />
          Registernummer: 0069
        </p>
        <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p>
          Robin Heidel<br />
          Nettelstädt 8<br />
          59602 Rüthen
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: src/app/datenschutz/page.tsx ersetzen**

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Datenschutzerklärung' }

export default function DatenschutzPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Rechtliches</p>
      <h1 className="text-4xl font-black text-sus-ink mb-10">Datenschutzerklärung</h1>

      <div className="prose prose-zinc max-w-none prose-headings:font-bold prose-a:text-sus-royal">
        <h2>1. Datenschutz auf einen Blick</h2>
        <p>
          Der Betreiber dieser Website nimmt den Schutz Ihrer persönlichen Daten sehr ernst.
          Diese Datenschutzerklärung erläutert, welche Daten wir erheben, wie wir sie verwenden
          und welche Rechte Sie haben.
        </p>
        <h2>2. Erhobene Daten</h2>
        <p>
          Beim Besuch dieser Website werden technisch notwendige Daten automatisch erhoben
          (Server-Logs: IP-Adresse, Browsertyp, Uhrzeit des Zugriffs). Diese Daten werden
          nicht mit anderen Datenquellen zusammengeführt und nach 7 Tagen gelöscht.
        </p>
        <p>
          Personenbezogene Daten (Name, E-Mail) werden nur erhoben, wenn Sie uns diese
          freiwillig mitteilen (z.B. per E-Mail-Kontakt).
        </p>
        <h2>3. Hosting</h2>
        <p>
          Diese Website wird auf einem Server in Deutschland gehostet (Hetzner Online GmbH,
          Industriestr. 25, 91710 Gunzenhausen). Die Verarbeitung erfolgt auf Grundlage von
          Art. 6 Abs. 1 lit. f DSGVO.
        </p>
        <h2>4. Cookies</h2>
        <p>
          Wir verwenden ausschließlich technisch notwendige Cookies sowie optionale Cookies
          nach Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Ihre Cookie-Einwilligung
          speichern wir lokal in Ihrem Browser (localStorage). Sie können Ihre Einwilligung
          jederzeit über den Link „Cookie-Einstellungen" im Footer widerrufen.
        </p>
        <h2>5. Ihre Rechte</h2>
        <ul>
          <li>Auskunft über Ihre gespeicherten personenbezogenen Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        </ul>
        <h2>6. Kontakt Datenschutz</h2>
        <p>
          SuS Oestereiden e.V., Im Kirchfeld 1, 59602 Rüthen<br />
          <a href="mailto:info@sus-oestereiden.de">info@sus-oestereiden.de</a>
        </p>
        <p className="text-sm text-sus-ink/30">Stand: Juni 2026</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add src/app/hallenbelegung/page.tsx src/app/mitgliedschaft/page.tsx src/app/impressum/page.tsx src/app/datenschutz/page.tsx
git commit -m "feat: redesign remaining pages — Layer System, Royal Blue, premium typography"
```

---

## Task 12: Abschluss-Verifikation

- [ ] **Step 1: Alle Tests laufen lassen**

```bash
npm test
```

Erwartet: 17 Tests in 4 Suites — alle PASS.

- [ ] **Step 2: Production Build**

```bash
npm run build
```

Erwartet: Build erfolgreich. Alle 12 Routen (inkl. `/_not-found`) statisch gerendert. Kein TypeScript-Fehler.

- [ ] **Step 3: Dev-Server für visuelle Prüfung**

```bash
npm run dev
```

Folgende Punkte visuell prüfen:
- Startseite: dunkler Hero mit Logo-Float-Animation, Stats-Bar, Sektionswechsel dunkel/hell
- Navbar: transparent auf Hero, Glassmorphism nach Scrollen (>80px)
- Mobile: Hamburger → Fullscreen-Overlay
- Abteilungsseiten: dunkler Hero mit Emoji-Icon
- Sponsoren-Sektion: dunkler Hintergrund, Text-Labels für Logos
- HallSchedule: Tages-Filter-Tabs funktionieren
- CookieBanner: floating card links unten
- Footer: dunkel, alle Links funktionieren

- [ ] **Step 4: Final Commit**

```bash
git add -A
git commit -m "chore: verify redesign complete — 17/17 tests pass, all 12 routes build"
```
