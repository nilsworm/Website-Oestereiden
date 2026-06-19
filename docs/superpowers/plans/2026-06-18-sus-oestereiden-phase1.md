# SuS Oestereiden Phase 1 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete Phase 1 static website for SuS Oestereiden e.V. 1922 — 9 pages, all content hardcoded in `src/data/`, deployable to Coolify via Nixpacks/Docker.

**Architecture:** Next.js App Router with TypeScript and Tailwind CSS. All data in `src/data/*.ts`; components import directly. No database, no auth. Phase 2 replaces data imports with Prisma queries without touching component code.

**Tech Stack:** Next.js 15 · TypeScript · Tailwind CSS · Jest + React Testing Library · Coolify (Nixpacks)

---

## File Map

```
src/lib/types.ts                          — shared TypeScript interfaces
src/data/board.ts                         — Vorstandsmitglieder
src/data/events.ts                        — Veranstaltungen
src/data/sponsors.ts                      — Sponsoren
src/data/departments.ts                   — Abteilungsinfos
src/data/hallenbelegung.ts                — Hallenbelegungsplan

src/components/layout/Navbar.tsx          — Client: Logo, Links, Hamburger
src/components/layout/Footer.tsx          — Server: Links, Kontakt, Cookie-Link
src/components/layout/CookieBanner.tsx    — Client: DSGVO Cookie-Consent

src/components/ui/HeroSection.tsx         — Server: Hero-Banner
src/components/ui/EventCard.tsx           — Server: Event-Karte
src/components/ui/BoardMember.tsx         — Server: Vorstandsmitglied
src/components/ui/DepartmentCard.tsx      — Server: Abteilungs-Karte
src/components/ui/SponsorGrid.tsx         — Server: Sponsoren-Grid
src/components/ui/HallSchedule.tsx        — Client: Interaktive Wochentabelle

src/app/layout.tsx                        — Root Layout
src/app/page.tsx                          — Startseite /
src/app/fussball/page.tsx                 — /fussball
src/app/volleyball/page.tsx               — /volleyball
src/app/tennis/page.tsx                   — /tennis
src/app/breitensport/page.tsx             — /breitensport
src/app/hallenbelegung/page.tsx           — /hallenbelegung
src/app/mitgliedschaft/page.tsx           — /mitgliedschaft
src/app/impressum/page.tsx                — /impressum
src/app/datenschutz/page.tsx              — /datenschutz

Dockerfile                                — Coolify deployment
__tests__/data/types.test.ts              — Datenstruktur-Tests
__tests__/components/CookieBanner.test.tsx
__tests__/components/HallSchedule.test.tsx
__tests__/components/EventCard.test.tsx
```

---

## Task 1: Project Initialization

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json` (via create-next-app)
- Create: `jest.config.ts`, `jest.setup.ts`

- [ ] **Step 1: Initialize Next.js project**

Run inside `/Users/nilsworm/Library/Mobile Documents/com~apple~CloudDocs/Projects/Website-Oestereiden/`:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

When prompted "The directory contains files that could conflict", choose **Continue**. Answer all other prompts with defaults (No to Turbopack if asked, Yes to `src/` directory, Yes to App Router).

- [ ] **Step 2: Install testing dependencies**

```bash
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @types/jest
```

- [ ] **Step 3: Create jest.config.ts**

```ts
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathPattern: '__tests__',
}

export default createJestConfig(config)
```

- [ ] **Step 4: Create jest.setup.ts**

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Add test script to package.json**

In `package.json`, ensure scripts contains:
```json
"test": "jest",
"test:watch": "jest --watch"
```

- [ ] **Step 6: Verify setup**

```bash
npm run build
```

Expected: Build completes with no errors.

- [ ] **Step 7: Commit**

```bash
git init
git add .
git commit -m "chore: initialize Next.js 15 project with TypeScript, Tailwind, Jest"
```

---

## Task 2: Types

**Files:**
- Create: `src/lib/types.ts`
- Create: `__tests__/data/types.test.ts`

- [ ] **Step 1: Write failing type validation test**

Create `__tests__/data/types.test.ts`:

```ts
import type { BoardMember, Event, HallSlot, Sponsor, DepartmentInfo, Department } from '@/lib/types'

describe('Type exports', () => {
  it('Department type includes all departments', () => {
    const departments: Department[] = ['fussball', 'volleyball', 'tennis', 'breitensport', 'allgemein']
    expect(departments).toHaveLength(5)
  })

  it('BoardMember has required fields', () => {
    const member: BoardMember = {
      name: 'Test Name',
      role: 'Vorsitzender',
      department: 'vorstand',
    }
    expect(member.name).toBeDefined()
    expect(member.role).toBeDefined()
  })

  it('Event has required fields', () => {
    const event: Event = {
      date: '2026-07-19',
      title: 'Sommerfest',
      description: 'Beschreibung',
      department: 'allgemein',
    }
    expect(event.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('HallSlot has required fields', () => {
    const slot: HallSlot = {
      day: 'mo',
      startTime: '18:00',
      endTime: '20:00',
      group: 'Fußball Senioren',
      department: 'fussball',
    }
    expect(slot.startTime).toMatch(/^\d{2}:\d{2}$/)
    expect(slot.endTime).toMatch(/^\d{2}:\d{2}$/)
  })
})
```

- [ ] **Step 2: Run test — expect fail**

```bash
npm test -- __tests__/data/types.test.ts
```

Expected: FAIL — `Cannot find module '@/lib/types'`

- [ ] **Step 3: Create src/lib/types.ts**

```ts
export type Department =
  | 'fussball'
  | 'volleyball'
  | 'tennis'
  | 'breitensport'
  | 'allgemein'

export interface BoardMember {
  name: string
  role: string
  department: 'vorstand' | Department
  image?: string
}

export interface Event {
  date: string
  title: string
  description: string
  department: Department
}

export interface HallSlot {
  day: 'mo' | 'di' | 'mi' | 'do' | 'fr' | 'sa' | 'so'
  startTime: string
  endTime: string
  group: string
  department: Department
}

export interface Sponsor {
  name: string
  logo?: string
}

export interface DepartmentInfo {
  id: Department
  label: string
  description: string
  head: string
}
```

- [ ] **Step 4: Run test — expect pass**

```bash
npm test -- __tests__/data/types.test.ts
```

Expected: PASS — 4 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/lib/types.ts __tests__/data/types.test.ts jest.config.ts jest.setup.ts
git commit -m "feat: add shared TypeScript interfaces"
```

---

## Task 3: Static Data Files

**Files:**
- Create: `src/data/board.ts`, `src/data/events.ts`, `src/data/sponsors.ts`, `src/data/departments.ts`

- [ ] **Step 1: Create src/data/board.ts**

```ts
import type { BoardMember } from '@/lib/types'

export const mainBoard: BoardMember[] = [
  { name: 'Ulrich Mehn', role: 'Vereinsvorsitzender', department: 'vorstand', image: '/images/board/ulrich-mehn.jpg' },
  { name: 'Michael Witthaut', role: 'Geschäftsführer', department: 'vorstand', image: '/images/board/michael-witthaut.jpg' },
  { name: 'Volker Körn', role: 'Stellvertretender Vorsitzender', department: 'vorstand', image: '/images/board/volker-koern.jpg' },
  { name: 'Klaus Rossa', role: 'Kassierer', department: 'vorstand', image: '/images/board/klaus-rossa.jpg' },
  { name: 'Pascal Rückert', role: 'Stellvertretender Vorsitzender', department: 'vorstand', image: '/images/board/pascal-rueckert.jpg' },
  { name: 'Robin Heidel', role: 'Stellvertretender Vorsitzender', department: 'vorstand', image: '/images/board/robin-heidel.jpg' },
]

export const advisoryBoard: BoardMember[] = [
  { name: 'Carina Kaltschmidt', role: 'Abteilungsvorsitzende Breitensport', department: 'breitensport', image: '/images/board/carina-kaltschmidt.jpg' },
  { name: 'Walter Hanemann', role: 'Abteilungsvorsitzender Tennis', department: 'tennis', image: '/images/board/walter-hanemann.jpg' },
  { name: 'Markus Biermann', role: 'Stellv. Abteilungsvorsitzender Fußball', department: 'fussball', image: '/images/board/markus-biermann.jpg' },
  { name: 'Doris Witthaut', role: 'Abteilungsvorsitzende Volleyball', department: 'volleyball', image: '/images/board/doris-witthaut.jpg' },
]

export const fussballBoard: BoardMember[] = [
  { name: 'Rolf Benteler', role: 'Abteilungsleiter', department: 'fussball' },
  { name: 'Markus Biermann', role: 'Stellvertretender Abteilungsleiter', department: 'fussball', image: '/images/board/markus-biermann.jpg' },
  { name: 'Reinhard Mehn', role: 'Stellvertretender Abteilungsleiter', department: 'fussball' },
  { name: 'Guido Horstschäfer', role: 'Geschäftsführer', department: 'fussball' },
  { name: 'Thomas Mertens', role: 'Kassierer', department: 'fussball' },
  { name: 'David Levening', role: 'Beisitzer Herren', department: 'fussball' },
  { name: 'Markus Belda', role: 'Koordinator A- bis D-Junioren', department: 'fussball' },
  { name: 'Matthias Lübke', role: 'Koordinator E- bis G-Junioren', department: 'fussball' },
  { name: 'Josef Eickhoff', role: 'Ehren-Beisitzer', department: 'fussball' },
]

export const volleyballBoard: BoardMember[] = [
  { name: 'Doris Witthaut', role: 'Abteilungsleiterin', department: 'volleyball', image: '/images/board/doris-witthaut.jpg' },
  { name: 'Katrin Rossa', role: 'Kassiererin', department: 'volleyball' },
  { name: 'Anja Mehn', role: 'Beisitzerin', department: 'volleyball' },
]

export const tennisBoard: BoardMember[] = [
  { name: 'Gerrit Keil', role: 'Abteilungsleiter', department: 'tennis' },
  { name: 'Ann-Catrin Dahlhoff', role: 'Geschäftsführerin / Schatzmeisterin', department: 'tennis' },
  { name: 'Jan Wirsdörfer', role: 'Platzwart', department: 'tennis' },
  { name: 'Anna Schiller', role: 'Jugendwart', department: 'tennis' },
  { name: 'Carsten Luig', role: 'Sportwart', department: 'tennis' },
]

export const breitensportBoard: BoardMember[] = [
  { name: 'Carina Kaltschmidt', role: 'Abteilungsleiterin', department: 'breitensport', image: '/images/board/carina-kaltschmidt.jpg' },
  { name: 'Katja Molerus', role: 'Geschäftsführerin', department: 'breitensport' },
  { name: 'Sandra Heiermeier', role: 'Kassiererin', department: 'breitensport' },
]
```

- [ ] **Step 2: Create src/data/events.ts**

```ts
import type { Event } from '@/lib/types'

export const events: Event[] = [
  {
    date: '2026-07-19',
    title: 'Sommerfest SuS Oestereiden',
    description: 'Unser jährliches Sommerfest mit Grillen, Getränken und Programm für die ganze Familie. Alle Mitglieder und Gäste sind herzlich willkommen.',
    department: 'allgemein',
  },
  {
    date: '2026-06-28',
    title: 'Heimspiel: SuS Oestereiden vs. TSV Lippstadt',
    description: 'Kreisliga A Spiel auf unserem Vereinsgelände. Anpfiff um 15:00 Uhr. Eintritt frei.',
    department: 'fussball',
  },
  {
    date: '2026-07-05',
    title: 'Vereinsturnier Tennis',
    description: 'Internes Vereinsturnier für alle aktiven Tennismitglieder. Anmeldung bis 28. Juni über den Abteilungsvorstand.',
    department: 'tennis',
  },
]
```

- [ ] **Step 3: Create src/data/sponsors.ts**

```ts
import type { Sponsor } from '@/lib/types'

export const sponsors: Sponsor[] = [
  { name: 'VBI' },
  { name: 'Witthaut' },
  { name: 'Sparkasse Lippstadt' },
  { name: 'Warsteiner' },
  { name: 'Eickhoff' },
  { name: 'Cormed' },
  { name: 'Gerrits' },
  { name: 'Risseglas' },
  { name: 'Knepper' },
  { name: 'Volksbank Brilon-Büren-Salzkotten' },
]
```

- [ ] **Step 4: Create src/data/departments.ts**

```ts
import type { DepartmentInfo } from '@/lib/types'

export const departments: DepartmentInfo[] = [
  {
    id: 'fussball',
    label: 'Fußball',
    description: 'Von der E-Jugend bis zu den Senioren – Fußball für jedes Alter. Gemeinsam mit der SG Haarstrang.',
    head: 'Rolf Benteler',
  },
  {
    id: 'volleyball',
    label: 'Volleyball',
    description: 'Hallenvolleyball für Damen, Herren und Jugend – von den Minis bis zur 1. Mannschaft.',
    head: 'Doris Witthaut',
  },
  {
    id: 'tennis',
    label: 'Tennis',
    description: 'Moderne Tennisanlage mit mehreren Plätzen, Jugendförderung und eigenem Trainer.',
    head: 'Gerrit Keil',
  },
  {
    id: 'breitensport',
    label: 'Breitensport',
    description: 'Kindertanzen, Kinderturnen, Fitness, Fit Mix, Nordic Walking – Sport für die ganze Familie.',
    head: 'Carina Kaltschmidt',
  },
]
```

- [ ] **Step 5: Commit**

```bash
git add src/data/
git commit -m "feat: add static data files for board, events, sponsors, departments"
```

---

## Task 4: Hallenbelegung Data

**Files:**
- Create: `src/data/hallenbelegung.ts`

- [ ] **Step 1: Create src/data/hallenbelegung.ts**

```ts
import type { HallSlot } from '@/lib/types'

export const hallSlots: HallSlot[] = [
  { day: 'mo', startTime: '18:00', endTime: '20:00', group: 'Fußball Senioren', department: 'fussball' },
  { day: 'mo', startTime: '20:00', endTime: '22:00', group: 'Volleyball 1. Mannschaft', department: 'volleyball' },
  { day: 'di', startTime: '17:00', endTime: '18:30', group: 'Breitensport Kinderturnen', department: 'breitensport' },
  { day: 'di', startTime: '18:30', endTime: '20:00', group: 'Breitensport Fitness', department: 'breitensport' },
  { day: 'mi', startTime: '17:00', endTime: '19:00', group: 'Fußball Junioren U14/U16', department: 'fussball' },
  { day: 'mi', startTime: '19:00', endTime: '21:00', group: 'Volleyball Herren', department: 'volleyball' },
  { day: 'do', startTime: '18:00', endTime: '20:00', group: 'Breitensport Fit Mix', department: 'breitensport' },
  { day: 'do', startTime: '20:00', endTime: '21:30', group: 'Volleyball B-Junioren U18', department: 'volleyball' },
  { day: 'fr', startTime: '17:00', endTime: '19:00', group: 'Fußball Junioren U7–U12', department: 'fussball' },
  { day: 'fr', startTime: '19:00', endTime: '21:00', group: 'Fußball Alte Herren', department: 'fussball' },
  { day: 'sa', startTime: '10:00', endTime: '12:00', group: 'Fußball Junioren Training', department: 'fussball' },
]
```

Note: Diese Daten sind Platzhalter. Der tatsächliche Hallenbelegungsplan 2024 liegt als PDF auf der bestehenden Website. Echte Daten von Ulrich Mehn / Michael Witthaut erfragen und hier ersetzen.

- [ ] **Step 2: Commit**

```bash
git add src/data/hallenbelegung.ts
git commit -m "feat: add hall schedule placeholder data"
```

---

## Task 5: Download Assets from Existing Website

**Files:**
- Create: `public/images/board/` (10 Vorstandsfotos)

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p public/images/board public/images/sponsors
```

- [ ] **Step 2: Find board member image URLs**

```bash
curl -s https://www.sus-oestereiden.de/vereinsvorstand/ | grep -oE 'https?://[^"]+\.(jpg|jpeg|png|webp)' | sort -u
```

This prints all image URLs on the Vorstand page. Identify the 10 board member photos.

- [ ] **Step 3: Download each photo**

For each URL found in Step 2, run (replace URL and filename):

```bash
curl -L "https://www.sus-oestereiden.de/wp-content/uploads/XXXX/photo.jpg" \
  -o "public/images/board/ulrich-mehn.jpg"
```

Download all 10 photos with these filenames:
- `ulrich-mehn.jpg`
- `michael-witthaut.jpg`
- `volker-koern.jpg`
- `klaus-rossa.jpg`
- `pascal-rueckert.jpg`
- `robin-heidel.jpg`
- `carina-kaltschmidt.jpg`
- `walter-hanemann.jpg`
- `markus-biermann.jpg`
- `doris-witthaut.jpg`

- [ ] **Step 4: Verify downloads**

```bash
ls -la public/images/board/
```

Expected: 10 image files, each > 5KB.

- [ ] **Step 5: Commit**

```bash
git add public/images/
git commit -m "feat: add board member photos from existing website"
```

---

## Task 6: Tailwind Config + Global Styles

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update tailwind.config.ts**

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
          green: '#1a5c2a',
          'green-light': '#2d8a40',
          'green-pale': '#e8f5eb',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Update src/app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply text-zinc-800 bg-white;
  }

  h1 {
    @apply text-3xl font-bold tracking-tight;
  }

  h2 {
    @apply text-2xl font-bold tracking-tight;
  }

  h3 {
    @apply text-xl font-semibold;
  }
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Build completes without CSS errors.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts src/app/globals.css
git commit -m "feat: configure Tailwind with SuS Oestereiden brand colors"
```

---

## Task 7: CookieBanner Component

**Files:**
- Create: `src/components/layout/CookieBanner.tsx`
- Create: `__tests__/components/CookieBanner.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `__tests__/components/CookieBanner.test.tsx`:

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import CookieBanner from '@/components/layout/CookieBanner'

const mockLocalStorage = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    clear: () => { store = {} },
  }
})()

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage })

beforeEach(() => mockLocalStorage.clear())

describe('CookieBanner', () => {
  it('shows banner when no consent stored', () => {
    render(<CookieBanner />)
    expect(screen.getByText('Alle akzeptieren')).toBeInTheDocument()
  })

  it('hides banner when consent already stored', () => {
    mockLocalStorage.setItem('sus-cookie-consent', JSON.stringify({ functional: true, statistics: false, marketing: false }))
    render(<CookieBanner />)
    expect(screen.queryByText('Alle akzeptieren')).not.toBeInTheDocument()
  })

  it('saves all-accept to localStorage and hides', () => {
    render(<CookieBanner />)
    fireEvent.click(screen.getByText('Alle akzeptieren'))
    const stored = JSON.parse(mockLocalStorage.getItem('sus-cookie-consent') ?? '{}')
    expect(stored).toEqual({ functional: true, statistics: true, marketing: true })
    expect(screen.queryByText('Alle akzeptieren')).not.toBeInTheDocument()
  })

  it('saves necessary-only to localStorage', () => {
    render(<CookieBanner />)
    fireEvent.click(screen.getByText('Nur notwendige'))
    const stored = JSON.parse(mockLocalStorage.getItem('sus-cookie-consent') ?? '{}')
    expect(stored).toEqual({ functional: true, statistics: false, marketing: false })
  })

  it('shows category checkboxes when Einstellungen clicked', () => {
    render(<CookieBanner />)
    fireEvent.click(screen.getByText('Einstellungen'))
    expect(screen.getByText('Statistiken')).toBeInTheDocument()
    expect(screen.getByText('Marketing')).toBeInTheDocument()
  })

  it('re-opens when open-cookie-banner event fired', () => {
    mockLocalStorage.setItem('sus-cookie-consent', JSON.stringify({ functional: true, statistics: false, marketing: false }))
    render(<CookieBanner />)
    expect(screen.queryByText('Alle akzeptieren')).not.toBeInTheDocument()
    fireEvent(window, new Event('open-cookie-banner'))
    expect(screen.getByText('Alle akzeptieren')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests — expect fail**

```bash
npm test -- __tests__/components/CookieBanner.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Create src/components/layout/CookieBanner.tsx**

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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-sm text-gray-700 mb-4">
          Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten.
          Funktionale Cookies sind für den Betrieb der Website notwendig.
        </p>

        {expanded && (
          <div className="mb-4 space-y-2 bg-gray-50 rounded-md p-3">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked disabled readOnly className="accent-sus-green" />
              <span className="font-medium">Funktional</span>
              <span className="text-gray-500 text-xs">(immer aktiv)</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={consent.statistics}
                onChange={e => setConsent(c => ({ ...c, statistics: e.target.checked }))}
                className="accent-sus-green"
              />
              <span className="font-medium">Statistiken</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={consent.marketing}
                onChange={e => setConsent(c => ({ ...c, marketing: e.target.checked }))}
                className="accent-sus-green"
              />
              <span className="font-medium">Marketing</span>
            </label>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => save({ functional: true, statistics: true, marketing: true })}
            className="px-4 py-2 bg-sus-green text-white text-sm font-medium rounded-md hover:bg-sus-green-light transition-colors"
          >
            Alle akzeptieren
          </button>
          <button
            onClick={() => save({ functional: true, statistics: false, marketing: false })}
            className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
          >
            Nur notwendige
          </button>
          {expanded ? (
            <button
              onClick={() => save(consent)}
              className="px-4 py-2 border border-sus-green text-sus-green text-sm font-medium rounded-md hover:bg-sus-green-pale transition-colors"
            >
              Einstellungen speichern
            </button>
          ) : (
            <button
              onClick={() => setExpanded(true)}
              className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
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

- [ ] **Step 4: Run tests — expect pass**

```bash
npm test -- __tests__/components/CookieBanner.test.tsx
```

Expected: PASS — 6 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/CookieBanner.tsx __tests__/components/CookieBanner.test.tsx
git commit -m "feat: add DSGVO CookieBanner with localStorage persistence"
```

---

## Task 8: Navbar Component

**Files:**
- Create: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Create src/components/layout/Navbar.tsx**

```tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '/fussball', label: 'Fußball' },
  { href: '/volleyball', label: 'Volleyball' },
  { href: '/tennis', label: 'Tennis' },
  { href: '/breitensport', label: 'Breitensport' },
  { href: '/hallenbelegung', label: 'Hallenbelegung' },
  { href: '/mitgliedschaft', label: 'Mitgliedschaft' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-sus-green text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-lg font-bold tracking-tight hover:opacity-90 transition-opacity">
              SuS Oestereiden <span className="font-normal opacity-80">1922</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-sus-green-light transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden flex items-center px-3 hover:bg-sus-green-light rounded-md transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-3 space-y-1 border-t border-sus-green-light pt-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-sus-green-light transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Verify dev server renders Navbar**

```bash
npm run dev
```

Open http://localhost:3000 — Navbar should appear at top with green background.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: add responsive Navbar with mobile hamburger menu"
```

---

## Task 9: Footer Component

**Files:**
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Create src/components/layout/Footer.tsx**

```tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">SuS Oestereiden</h3>
            <p className="text-sm leading-relaxed">
              Spiel- und Sportverein Oestereiden e.V. 1922<br />
              Im Kirchfeld 1<br />
              59602 Rüthen
            </p>
            <p className="text-sm mt-3">
              <a href="tel:+4929549245900" className="hover:text-white transition-colors">
                +49 2954 924590
              </a>
              <br />
              <a href="mailto:info@sus-oestereiden.de" className="hover:text-white transition-colors">
                info@sus-oestereiden.de
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-3">Abteilungen</h3>
            <ul className="space-y-1 text-sm">
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
            <h3 className="text-white font-bold text-lg mb-3">Rechtliches</h3>
            <ul className="space-y-1 text-sm">
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

        <div className="border-t border-zinc-700 mt-8 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} SuS Oestereiden e.V. 1922 · Alle Rechte vorbehalten
        </div>
      </div>
    </footer>
  )
}
```

Note: The `onClick` on the button requires this to be a Client Component. Add `'use client'` at the top of the file.

- [ ] **Step 2: Add 'use client' directive**

Add `'use client'` as the first line of `src/components/layout/Footer.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: add Footer with contact info, navigation, and cookie settings link"
```

---

## Task 10: Root Layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace src/app/layout.tsx**

```tsx
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/layout/CookieBanner'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })

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
    <html lang="de">
      <body className={`${geist.variable} font-sans min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open http://localhost:3000 — should see Navbar + placeholder content + Footer + CookieBanner on first load.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add root layout with Navbar, Footer, CookieBanner"
```

---

## Task 11: UI Components — Server Components

**Files:**
- Create: `src/components/ui/HeroSection.tsx`
- Create: `src/components/ui/EventCard.tsx`
- Create: `src/components/ui/BoardMember.tsx`
- Create: `src/components/ui/DepartmentCard.tsx`
- Create: `src/components/ui/SponsorGrid.tsx`
- Create: `__tests__/components/EventCard.test.tsx`

- [ ] **Step 1: Write failing EventCard test**

Create `__tests__/components/EventCard.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import EventCard from '@/components/ui/EventCard'
import type { Event } from '@/lib/types'

const mockEvent: Event = {
  date: '2026-07-19',
  title: 'Sommerfest SuS Oestereiden',
  description: 'Beschreibung des Sommerfests',
  department: 'allgemein',
}

describe('EventCard', () => {
  it('renders event title', () => {
    render(<EventCard event={mockEvent} />)
    expect(screen.getByText('Sommerfest SuS Oestereiden')).toBeInTheDocument()
  })

  it('renders formatted date', () => {
    render(<EventCard event={mockEvent} />)
    expect(screen.getByText(/19\. Juli 2026/)).toBeInTheDocument()
  })

  it('renders description', () => {
    render(<EventCard event={mockEvent} />)
    expect(screen.getByText('Beschreibung des Sommerfests')).toBeInTheDocument()
  })

  it('renders department badge', () => {
    render(<EventCard event={mockEvent} />)
    expect(screen.getByText('Allgemein')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — expect fail**

```bash
npm test -- __tests__/components/EventCard.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Create src/components/ui/HeroSection.tsx**

```tsx
interface HeroSectionProps {
  title: string
  subtitle: string
  description?: string
}

export default function HeroSection({ title, subtitle, description }: HeroSectionProps) {
  return (
    <section className="bg-sus-green text-white py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3">{title}</h1>
        <p className="text-xl md:text-2xl font-light opacity-90 mb-4">{subtitle}</p>
        {description && (
          <p className="text-base md:text-lg opacity-75 max-w-2xl mx-auto">{description}</p>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create src/components/ui/EventCard.tsx**

```tsx
import type { Event } from '@/lib/types'

const DEPT_LABELS: Record<string, string> = {
  fussball: 'Fußball',
  volleyball: 'Volleyball',
  tennis: 'Tennis',
  breitensport: 'Breitensport',
  allgemein: 'Allgemein',
}

const DEPT_COLORS: Record<string, string> = {
  fussball: 'bg-green-100 text-green-800',
  volleyball: 'bg-blue-100 text-blue-800',
  tennis: 'bg-yellow-100 text-yellow-800',
  breitensport: 'bg-purple-100 text-purple-800',
  allgemein: 'bg-gray-100 text-gray-700',
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
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-3">
        <time className="text-sm font-medium text-gray-500">{formatDate(event.date)}</time>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${DEPT_COLORS[event.department]}`}>
          {DEPT_LABELS[event.department]}
        </span>
      </div>
      <h3 className="font-bold text-lg text-zinc-800 mb-2">{event.title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
    </div>
  )
}
```

- [ ] **Step 5: Run EventCard tests — expect pass**

```bash
npm test -- __tests__/components/EventCard.test.tsx
```

Expected: PASS — 4 tests pass.

- [ ] **Step 6: Create src/components/ui/BoardMember.tsx**

```tsx
import Image from 'next/image'
import type { BoardMember as BoardMemberType } from '@/lib/types'

interface BoardMemberProps {
  member: BoardMemberType
}

export default function BoardMember({ member }: BoardMemberProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-sus-green-pale mb-3 flex items-center justify-center">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-3xl text-sus-green font-bold">
            {member.name.charAt(0)}
          </span>
        )}
      </div>
      <p className="font-semibold text-zinc-800 text-sm">{member.name}</p>
      <p className="text-gray-500 text-xs mt-0.5">{member.role}</p>
    </div>
  )
}
```

- [ ] **Step 7: Create src/components/ui/DepartmentCard.tsx**

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
    <Link href={`/${department.id}`} className="group block">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg hover:border-sus-green transition-all h-full">
        <div className="text-4xl mb-3">{DEPT_ICONS[department.id]}</div>
        <h3 className="font-bold text-lg text-zinc-800 mb-2 group-hover:text-sus-green transition-colors">
          {department.label}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">{department.description}</p>
        <p className="text-xs text-gray-400">Leitung: {department.head}</p>
      </div>
    </Link>
  )
}
```

- [ ] **Step 8: Create src/components/ui/SponsorGrid.tsx**

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
          className="flex items-center justify-center bg-white rounded-lg border border-gray-200 p-4 h-20 hover:shadow-md transition-shadow"
        >
          <span className="text-sm font-medium text-gray-600 text-center leading-tight">
            {sponsor.name}
          </span>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 9: Commit**

```bash
git add src/components/ui/ __tests__/components/EventCard.test.tsx
git commit -m "feat: add UI components (HeroSection, EventCard, BoardMember, DepartmentCard, SponsorGrid)"
```

---

## Task 12: HallSchedule Component

**Files:**
- Create: `src/components/ui/HallSchedule.tsx`
- Create: `__tests__/components/HallSchedule.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `__tests__/components/HallSchedule.test.tsx`:

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import HallSchedule from '@/components/ui/HallSchedule'
import type { HallSlot } from '@/lib/types'

const mockSlots: HallSlot[] = [
  { day: 'mo', startTime: '18:00', endTime: '20:00', group: 'Fußball Senioren', department: 'fussball' },
  { day: 'di', startTime: '17:00', endTime: '18:30', group: 'Kinderturnen', department: 'breitensport' },
]

describe('HallSchedule', () => {
  it('renders all day columns', () => {
    render(<HallSchedule slots={mockSlots} />)
    expect(screen.getByText('Montag')).toBeInTheDocument()
    expect(screen.getByText('Dienstag')).toBeInTheDocument()
  })

  it('renders slot group names', () => {
    render(<HallSchedule slots={mockSlots} />)
    expect(screen.getByText('Fußball Senioren')).toBeInTheDocument()
    expect(screen.getByText('Kinderturnen')).toBeInTheDocument()
  })

  it('renders slot times', () => {
    render(<HallSchedule slots={mockSlots} />)
    expect(screen.getByText('18:00–20:00')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests — expect fail**

```bash
npm test -- __tests__/components/HallSchedule.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Create src/components/ui/HallSchedule.tsx**

```tsx
'use client'

import { useState } from 'react'
import type { HallSlot } from '@/lib/types'

const DAYS = ['mo', 'di', 'mi', 'do', 'fr', 'sa', 'so'] as const
const DAY_LABELS: Record<string, string> = {
  mo: 'Montag', di: 'Dienstag', mi: 'Mittwoch',
  do: 'Donnerstag', fr: 'Freitag', sa: 'Samstag', so: 'Sonntag',
}

const DEPT_COLORS: Record<string, string> = {
  fussball: 'bg-green-100 border-l-4 border-sus-green text-green-900',
  volleyball: 'bg-blue-50 border-l-4 border-blue-500 text-blue-900',
  tennis: 'bg-yellow-50 border-l-4 border-yellow-500 text-yellow-900',
  breitensport: 'bg-purple-50 border-l-4 border-purple-500 text-purple-900',
  allgemein: 'bg-gray-50 border-l-4 border-gray-400 text-gray-800',
}

interface HallScheduleProps {
  slots: HallSlot[]
}

export default function HallSchedule({ slots }: HallScheduleProps) {
  const [tooltip, setTooltip] = useState<HallSlot | null>(null)

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-7 gap-2 min-w-[700px]">
        {DAYS.map(day => {
          const daySlots = slots.filter(s => s.day === day)
          return (
            <div key={day}>
              <div className="text-center text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 py-1 border-b border-gray-200">
                {DAY_LABELS[day]}
              </div>
              <div className="space-y-1.5">
                {daySlots.length === 0 ? (
                  <div className="text-center text-xs text-gray-300 py-4">–</div>
                ) : (
                  daySlots.map((slot, i) => (
                    <div
                      key={i}
                      className={`rounded p-2 cursor-default text-xs relative ${DEPT_COLORS[slot.department]}`}
                      onMouseEnter={() => setTooltip(slot)}
                      onMouseLeave={() => setTooltip(null)}
                    >
                      <div className="font-semibold truncate">{slot.group}</div>
                      <div className="opacity-70 mt-0.5">{slot.startTime}–{slot.endTime}</div>

                      {tooltip === slot && (
                        <div className="absolute z-10 bottom-full left-0 mb-1 bg-zinc-800 text-white text-xs rounded-md px-3 py-2 w-48 shadow-lg pointer-events-none">
                          <div className="font-semibold">{slot.group}</div>
                          <div className="opacity-80 mt-0.5">{slot.startTime} – {slot.endTime} Uhr</div>
                          <div className="capitalize opacity-70 mt-0.5">{slot.department}</div>
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

- [ ] **Step 4: Run tests — expect pass**

```bash
npm test -- __tests__/components/HallSchedule.test.tsx
```

Expected: PASS — 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/HallSchedule.tsx __tests__/components/HallSchedule.test.tsx
git commit -m "feat: add interactive HallSchedule component with hover tooltips"
```

---

## Task 13: Startseite

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace src/app/page.tsx**

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

export default function HomePage() {
  return (
    <>
      <HeroSection
        title="SuS Oestereiden e.V."
        subtitle="Der Verein für die Region seit 1922"
        description="Über 860 Mitglieder, vier Abteilungen, eine Gemeinschaft — in Rüthen-Oestereiden."
      />

      {/* Aktuelles */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-zinc-800 mb-8">Aktuelles & Termine</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event, i) => (
              <EventCard key={i} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Über den Verein */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-zinc-800 mb-4">Über unseren Verein</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Der Spiel- und Sportverein Oestereiden e.V. wurde 1922 gegründet und ist heute mit
                über 860 Mitgliedern der größte Verein im Stadtgebiet Rüthen.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Mit vier aktiven Abteilungen — Fußball, Volleyball, Tennis und Breitensport —
                bieten wir Sport und Gemeinschaft für jedes Alter.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Gegründet', value: '1922' },
                { label: 'Mitglieder', value: '860+' },
                { label: 'Abteilungen', value: '4' },
                { label: 'Standort', value: 'Rüthen' },
              ].map(stat => (
                <div key={stat.label} className="bg-sus-green-pale rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-sus-green">{stat.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Abteilungen */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-zinc-800 mb-8">Unsere Abteilungen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map(dept => (
              <DepartmentCard key={dept.id} department={dept} />
            ))}
          </div>
        </div>
      </section>

      {/* Vorstand */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-zinc-800 mb-8">Vereinsvorstand</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 mb-12">
            {mainBoard.map(member => (
              <BoardMember key={member.name} member={member} />
            ))}
          </div>
          <h3 className="text-lg font-semibold text-zinc-700 mb-6">Beisitzende</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {advisoryBoard.map(member => (
              <BoardMember key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Sponsoren */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-zinc-800 mb-8">Unsere Sponsoren</h2>
          <SponsorGrid sponsors={sponsors} />
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open http://localhost:3000 — all sections should render correctly.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: build Startseite with all sections"
```

---

## Task 14: Abteilungsseiten

**Files:**
- Create: `src/app/fussball/page.tsx`
- Create: `src/app/volleyball/page.tsx`
- Create: `src/app/tennis/page.tsx`
- Create: `src/app/breitensport/page.tsx`

- [ ] **Step 1: Create src/app/fussball/page.tsx**

```tsx
import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'
import BoardMember from '@/components/ui/BoardMember'
import { fussballBoard } from '@/data/board'

export const metadata: Metadata = { title: 'Fußball' }

export default function FussballPage() {
  return (
    <>
      <HeroSection title="Fußball" subtitle="SuS Oestereiden" />

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-sus-green-pale rounded-lg p-6 mb-10">
            <h2 className="font-semibold text-sus-green mb-2">Spielgemeinschaft Haarstrang</h2>
            <p className="text-gray-700 text-sm">
              Im Seniorenbereich spielen wir gemeinsam mit Partnerklubs in der SG Haarstrang.
              Mehr Infos unter{' '}
              <a
                href="https://www.sg-haarstrang.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sus-green underline hover:no-underline"
              >
                www.sg-haarstrang.de
              </a>
            </p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-800 mb-8">Abteilungsvorstand</h2>
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

- [ ] **Step 2: Create src/app/volleyball/page.tsx**

```tsx
import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'
import BoardMember from '@/components/ui/BoardMember'
import { volleyballBoard } from '@/data/board'

export const metadata: Metadata = { title: 'Volleyball' }

export default function VolleyballPage() {
  return (
    <>
      <HeroSection title="Volleyball" subtitle="SuS Oestereiden" />
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-zinc-800 mb-8">Abteilungsvorstand</h2>
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

- [ ] **Step 3: Create src/app/tennis/page.tsx**

```tsx
import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'
import BoardMember from '@/components/ui/BoardMember'
import { tennisBoard } from '@/data/board'

export const metadata: Metadata = { title: 'Tennis' }

export default function TennisPage() {
  return (
    <>
      <HeroSection title="Tennis" subtitle="SuS Oestereiden" />
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-zinc-800 mb-8">Abteilungsvorstand</h2>
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

- [ ] **Step 4: Create src/app/breitensport/page.tsx**

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
      <HeroSection title="Breitensport" subtitle="SuS Oestereiden" />
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-zinc-800 mb-8">Abteilungsvorstand</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-16">
            {breitensportBoard.map(member => (
              <BoardMember key={member.name} member={member} />
            ))}
          </div>

          <h2 className="text-2xl font-bold text-zinc-800 mb-6">Kursangebot</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {kursangebot.map(kurs => (
              <div key={kurs.gruppe} className="bg-sus-green-pale rounded-lg p-4">
                <div className="font-semibold text-zinc-800 text-sm">{kurs.gruppe}</div>
                <div className="text-gray-500 text-xs mt-1">Leitung: {kurs.leitung}</div>
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
git add src/app/fussball/ src/app/volleyball/ src/app/tennis/ src/app/breitensport/
git commit -m "feat: add department pages (Fußball, Volleyball, Tennis, Breitensport)"
```

---

## Task 15: Hallenbelegung Page

**Files:**
- Create: `src/app/hallenbelegung/page.tsx`

- [ ] **Step 1: Create src/app/hallenbelegung/page.tsx**

```tsx
import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'
import HallSchedule from '@/components/ui/HallSchedule'
import { hallSlots } from '@/data/hallenbelegung'

export const metadata: Metadata = { title: 'Hallenbelegung' }

export default function HallenbelegungPage() {
  return (
    <>
      <HeroSection title="Hallenbelegung" subtitle="Wochenbelegungsplan der Vereinshalle" />
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4 flex-wrap mb-8 text-xs">
            {[
              { label: 'Fußball', color: 'border-sus-green bg-green-100' },
              { label: 'Volleyball', color: 'border-blue-500 bg-blue-50' },
              { label: 'Tennis', color: 'border-yellow-500 bg-yellow-50' },
              { label: 'Breitensport', color: 'border-purple-500 bg-purple-50' },
            ].map(item => (
              <span key={item.label} className={`flex items-center gap-1.5 px-3 py-1 rounded-full border-l-4 ${item.color}`}>
                {item.label}
              </span>
            ))}
          </div>
          <HallSchedule slots={hallSlots} />
          <p className="text-xs text-gray-400 mt-6">
            Stand: Saison 2024/25. Änderungen vorbehalten. Kontakt: info@sus-oestereiden.de
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/hallenbelegung/
git commit -m "feat: add Hallenbelegung page with interactive schedule"
```

---

## Task 16: Mitgliedschaft, Impressum, Datenschutz Pages

**Files:**
- Create: `src/app/mitgliedschaft/page.tsx`
- Create: `src/app/impressum/page.tsx`
- Create: `src/app/datenschutz/page.tsx`

- [ ] **Step 1: Create src/app/mitgliedschaft/page.tsx**

```tsx
import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'

export const metadata: Metadata = { title: 'Mitgliedschaft' }

const distribution = [
  { abteilung: 'Breitensport', anteil: 35 },
  { abteilung: 'Fußball', anteil: 33 },
  { abteilung: 'Tennis', anteil: 20 },
  { abteilung: 'Volleyball', anteil: 12 },
]

export default function MitgliedschaftPage() {
  return (
    <>
      <HeroSection
        title="Mitgliedschaft"
        subtitle="Werden Sie Teil unseres Vereins"
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-zinc max-w-none">
            <h2>Über uns</h2>
            <p>
              Der SuS Oestereiden e.V. ist mit über 860 Mitgliedern der größte Verein im
              Stadtgebiet Rüthen. Seit 1922 fördern wir Sport und Gemeinschaft in der Region.
            </p>

            <h2>Mitgliederverteilung</h2>
            <div className="not-prose space-y-3 mb-8">
              {distribution.map(d => (
                <div key={d.abteilung}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{d.abteilung}</span>
                    <span className="text-gray-500">{d.anteil} %</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-sus-green rounded-full"
                      style={{ width: `${d.anteil}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <h2>Aufnahme</h2>
            <p>
              Zur Aufnahme füllen Sie bitte den Aufnahmeantrag aus und senden ihn an:
            </p>
            <address className="not-italic bg-sus-green-pale rounded-lg p-4 text-sm not-prose">
              <strong>SuS Oestereiden e.V.</strong><br />
              z. Hd. Michael Witthaut<br />
              Im Kirchfeld 1<br />
              59602 Rüthen<br /><br />
              <a href="mailto:info@sus-oestereiden.de" className="text-sus-green underline">
                info@sus-oestereiden.de
              </a>
            </address>

            <div className="not-prose mt-6">
              <a
                href="/downloads/aufnahmeantrag.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 bg-sus-green text-white font-medium rounded-lg hover:bg-sus-green-light transition-colors"
              >
                Aufnahmeantrag herunterladen (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
```

Note: Place the actual PDF at `public/downloads/aufnahmeantrag.pdf`. Download from the existing website if available.

- [ ] **Step 2: Create src/app/impressum/page.tsx**

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Impressum' }

export default function ImpressumPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-zinc-800 mb-8">Impressum</h1>

      <div className="prose prose-zinc max-w-none">
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

- [ ] **Step 3: Create src/app/datenschutz/page.tsx**

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Datenschutzerklärung' }

export default function DatenschutzPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-zinc-800 mb-8">Datenschutzerklärung</h1>

      <div className="prose prose-zinc max-w-none">
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
          Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren Betrieb der Website).
        </p>

        <h2>4. Cookies</h2>
        <p>
          Wir verwenden ausschließlich technisch notwendige Cookies sowie optionale Cookies
          nach Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Ihre Cookie-Einwilligung
          speichern wir lokal in Ihrem Browser (localStorage). Sie können Ihre Einwilligung
          jederzeit über den Link „Cookie-Einstellungen" im Footer widerrufen.
        </p>

        <h2>5. Ihre Rechte</h2>
        <p>Sie haben jederzeit das Recht auf:</p>
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
          Bei Fragen zum Datenschutz wenden Sie sich an:<br />
          SuS Oestereiden e.V.<br />
          Im Kirchfeld 1, 59602 Rüthen<br />
          <a href="mailto:info@sus-oestereiden.de">info@sus-oestereiden.de</a>
        </p>

        <p className="text-sm text-gray-500 mt-8">Stand: Juni 2026</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/mitgliedschaft/ src/app/impressum/ src/app/datenschutz/
git commit -m "feat: add Mitgliedschaft, Impressum, Datenschutz pages"
```

---

## Task 17: Coolify Deployment

**Files:**
- Create: `Dockerfile`
- Modify: `next.config.ts`

- [ ] **Step 1: Update next.config.ts**

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
}

export default nextConfig
```

- [ ] **Step 2: Create Dockerfile**

```dockerfile
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

- [ ] **Step 3: Test Docker build locally**

```bash
docker build -t sus-oestereiden .
docker run -p 3000:3000 sus-oestereiden
```

Open http://localhost:3000 — site should render correctly.

- [ ] **Step 4: Run full test suite**

```bash
npm test
```

Expected: All tests pass.

- [ ] **Step 5: Final commit**

```bash
git add Dockerfile next.config.ts
git commit -m "feat: add Dockerfile for Coolify deployment with standalone output"
```

---

## Task 18: Coolify Setup

- [ ] **Step 1: Push to Git remote**

```bash
git remote add origin <your-git-repo-url>
git push -u origin main
```

- [ ] **Step 2: Configure in Coolify**

In Coolify dashboard:
1. New Resource → Application → Git Repository
2. Select your repo and branch (`main`)
3. Build Pack: **Dockerfile** (selects `Dockerfile` automatically)
4. Port: **3000**
5. Domain: configure your domain
6. Enable "Auto Deploy on Push" for CI/CD
7. Deploy

- [ ] **Step 3: Verify deployment**

Open your Coolify domain — all 9 pages should load correctly, including mobile navigation and cookie banner.

---

## Self-Review Checklist

- [x] Spec section "Seitenstruktur" → Tasks 13–16 cover all 9 routes
- [x] Spec section "Komponentenhierarchie" → Tasks 7–12 cover all 8 components
- [x] Spec section "Datenstruktur" → Tasks 2–4 implement all interfaces and data files
- [x] Spec section "Cookie-Banner" → Task 7 (localStorage, 3 Kategorien, re-open from Footer)
- [x] Spec section "Assets" → Task 5 (download from existing site)
- [x] Spec section "Hallenbelegung interaktiv" → Task 12 (HallSchedule with hover tooltip)
- [x] Spec "Phase-2-Schnitt" → interfaces in types.ts, data in data/*.ts, no coupling
- [x] Deployment → Task 17–18 (Dockerfile + Coolify)
- [x] Hallenbelegung placeholder data note included (Task 4)
- [x] Mitgliedschaft PDF placeholder note included (Task 16)
