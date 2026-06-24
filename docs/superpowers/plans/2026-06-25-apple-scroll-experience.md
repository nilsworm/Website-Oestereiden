# Apple Scroll Experience — Implementierungsplan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Alle Seiten der SuS-Website bekommen ein Apple-like Scroll-Erlebnis: Framer-Motion-Animationen, min-h-[70vh] Sections, interaktive Hover-States, drei neue Homepage-Sections (Zitat, Standort, Vereinsinfo).

**Architecture:** Framer Motion wird für scroll-triggered Animationen eingesetzt. Neue Utilities (`FadeIn`, `AnimatedGrid`, `CountUp`) sind Client Components die in Server Components als children-Wrapper nutzbar sind. Neue Sections (`QuoteSection`, `StandortSection`, `VereinsinfoSection`) sind eigenständige Client Components. `page.tsx` bleibt Server Component.

**Tech Stack:** Next.js 16, React 19, Framer Motion, Tailwind CSS, Jest + React Testing Library

---

### Task 1: Framer Motion installieren + Jest-Mock anlegen

**Files:**
- Modify: `package.json` (via npm install)
- Create: `__mocks__/framer-motion.tsx`

- [ ] **Framer Motion installieren**

```bash
cd "/Users/nilsworm/Library/Mobile Documents/com~apple~CloudDocs/Projects/Website-Oestereiden"
npm install framer-motion
```

- [ ] **Jest-Mock erstellen** (`__mocks__/framer-motion.tsx`)

Framer Motion nutzt Browser-APIs (`IntersectionObserver`, `requestAnimationFrame`) die in JSDOM nicht existieren. Dieser Mock ersetzt alle motion-Elemente durch einfache divs.

```tsx
import React from 'react'

const motion = new Proxy({} as Record<string, React.FC<Record<string, unknown>>>, {
  get: (_, tag: string) => {
    const Component = ({ children, ...rest }: Record<string, unknown>) => {
      const { initial, animate, exit, transition, variants, whileTap, whileHover, layout, ...props } = rest
      return React.createElement(tag as keyof JSX.IntrinsicElements, props as object, children as React.ReactNode)
    }
    Component.displayName = `motion.${tag}`
    return Component
  },
})

const AnimatePresence = ({ children }: { children: React.ReactNode }) => <>{children}</>
const useInView = () => true
const useReducedMotion = () => false

export { motion, AnimatePresence, useInView, useReducedMotion }
```

- [ ] **Bestehende Tests laufen lassen**

```bash
npm test -- --passWithNoTests 2>&1 | tail -20
```

Erwartetes Ergebnis: alle bestehenden Tests grün.

- [ ] **Committen**

```bash
git add package.json package-lock.json __mocks__/framer-motion.tsx
git commit -m "feat: install framer-motion, add jest mock"
```

---

### Task 2: `FadeIn` Motion-Utility

**Files:**
- Create: `src/components/motion/FadeIn.tsx`
- Create: `__tests__/components/FadeIn.test.tsx`

- [ ] **Test schreiben** (`__tests__/components/FadeIn.test.tsx`)

```tsx
import { render, screen } from '@testing-library/react'
import FadeIn from '@/components/motion/FadeIn'

describe('FadeIn', () => {
  it('renders children', () => {
    render(<FadeIn><p>Test</p></FadeIn>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('passes className to wrapper', () => {
    const { container } = render(<FadeIn className="my-class"><span /></FadeIn>)
    expect(container.firstChild).toHaveClass('my-class')
  })
})
```

- [ ] **Test ausführen — muss scheitern**

```bash
npm test -- FadeIn 2>&1 | tail -10
```

- [ ] **Komponente implementieren** (`src/components/motion/FadeIn.tsx`)

```tsx
'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Test ausführen — muss grün sein**

```bash
npm test -- FadeIn 2>&1 | tail -10
```

- [ ] **Committen**

```bash
git add src/components/motion/FadeIn.tsx __tests__/components/FadeIn.test.tsx
git commit -m "feat: add FadeIn motion utility"
```

---

### Task 3: `AnimatedGrid` Motion-Utility

**Files:**
- Create: `src/components/motion/AnimatedGrid.tsx`
- Create: `__tests__/components/AnimatedGrid.test.tsx`

- [ ] **Test schreiben** (`__tests__/components/AnimatedGrid.test.tsx`)

```tsx
import { render, screen } from '@testing-library/react'
import AnimatedGrid from '@/components/motion/AnimatedGrid'

describe('AnimatedGrid', () => {
  it('renders all children', () => {
    render(
      <AnimatedGrid className="grid grid-cols-3 gap-4">
        <div>Alpha</div>
        <div>Beta</div>
        <div>Gamma</div>
      </AnimatedGrid>
    )
    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.getByText('Beta')).toBeInTheDocument()
    expect(screen.getByText('Gamma')).toBeInTheDocument()
  })

  it('applies className to container', () => {
    const { container } = render(
      <AnimatedGrid className="my-grid"><div>X</div></AnimatedGrid>
    )
    expect(container.firstChild).toHaveClass('my-grid')
  })
})
```

- [ ] **Test ausführen — muss scheitern**

```bash
npm test -- AnimatedGrid 2>&1 | tail -10
```

- [ ] **Komponente implementieren** (`src/components/motion/AnimatedGrid.tsx`)

Jedes Kindelement wird in ein `motion.div` eingebettet und mit gestaffelter Verzögerung eingeblendet. Die parent-div ist der Grid-Container.

```tsx
'use client'

import { useRef, Children } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface AnimatedGridProps {
  children: React.ReactNode
  className: string
  stagger?: number
}

export default function AnimatedGrid({ children, className, stagger = 0.08 }: AnimatedGridProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const prefersReduced = useReducedMotion()

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, i) => (
        <motion.div
          key={i}
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * stagger, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ display: 'contents' }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}
```

Hinweis: `display: contents` auf dem motion.div sorgt dafür, dass das Grid-Layout nicht gestört wird — das motion.div "verschwindet" im Layout und das eigentliche Kind ist das Grid-Item.

- [ ] **Test ausführen — muss grün sein**

```bash
npm test -- AnimatedGrid 2>&1 | tail -10
```

- [ ] **Committen**

```bash
git add src/components/motion/AnimatedGrid.tsx __tests__/components/AnimatedGrid.test.tsx
git commit -m "feat: add AnimatedGrid stagger utility"
```

---

### Task 4: `CountUp` Motion-Utility

**Files:**
- Create: `src/components/motion/CountUp.tsx`
- Create: `__tests__/components/CountUp.test.tsx`

- [ ] **Test schreiben** (`__tests__/components/CountUp.test.tsx`)

```tsx
import { render, screen } from '@testing-library/react'
import CountUp from '@/components/motion/CountUp'

describe('CountUp', () => {
  it('renders numeric target with suffix', () => {
    render(<CountUp target="860+" />)
    expect(screen.getByText(/860\+/)).toBeInTheDocument()
  })

  it('renders non-numeric target as-is', () => {
    render(<CountUp target="Rüthen" />)
    expect(screen.getByText('Rüthen')).toBeInTheDocument()
  })

  it('renders "4" target', () => {
    render(<CountUp target="4" />)
    expect(screen.getByText('4')).toBeInTheDocument()
  })
})
```

- [ ] **Test ausführen — muss scheitern**

```bash
npm test -- CountUp 2>&1 | tail -10
```

- [ ] **Komponente implementieren** (`src/components/motion/CountUp.tsx`)

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface CountUpProps {
  target: string
  className?: string
}

function parse(target: string): { value: number; suffix: string } | null {
  const match = target.match(/^(\d+)(.*)$/)
  if (!match) return null
  return { value: parseInt(match[1], 10), suffix: match[2] }
}

export default function CountUp({ target, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const parsed = parse(target)
  const [displayed, setDisplayed] = useState(parsed ? String(parsed.value > 100 ? parsed.value - 50 : 0) + parsed.suffix : target)

  useEffect(() => {
    if (!isInView || !parsed) return
    const { value, suffix } = parsed
    const startValue = value > 100 ? value - 50 : 0
    const duration = 1200
    const startTime = Date.now()

    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(startValue + (value - startValue) * eased)
      setDisplayed(current + suffix)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!parsed) return <span ref={ref} className={className}>{target}</span>
  return <span ref={ref} className={className}>{displayed}</span>
}
```

- [ ] **Test ausführen — muss grün sein**

```bash
npm test -- CountUp 2>&1 | tail -10
```

- [ ] **Committen**

```bash
git add src/components/motion/CountUp.tsx __tests__/components/CountUp.test.tsx
git commit -m "feat: add CountUp animation utility"
```

---

### Task 5: `HeroSection` animieren

**Files:**
- Modify: `src/components/ui/HeroSection.tsx`

Die HeroSection wird zu einem Client Component. Text-Elemente animieren gestaffelt beim Seitenlade. Das Icon/Logo schwingt bereits via CSS (`animate-float`).

- [ ] **`HeroSection.tsx` ersetzen**

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface HeroSectionProps {
  title: string
  subtitle: string
  description?: string
  icon?: string
  children?: React.ReactNode
}

const ease = [0.25, 0.1, 0.25, 1] as const

export default function HeroSection({ title, subtitle, description, icon, children }: HeroSectionProps) {
  return (
    <section className="relative bg-sus-navy text-sus-light clip-diagonal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <motion.p
              className="text-sus-royal font-semibold text-xs uppercase tracking-[0.15em] mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease }}
            >
              Seit 1922
            </motion.p>
            <motion.h1
              className="text-[clamp(40px,6vw,80px)] font-black tracking-tight leading-none mb-4 text-sus-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
            >
              {title}
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-sus-light/70 font-light mb-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease }}
            >
              {subtitle}
            </motion.p>
            {description && (
              <motion.p
                className="text-base text-sus-light/50 max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45, ease }}
              >
                {description}
              </motion.p>
            )}
          </div>

          <motion.div
            className="flex-shrink-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {icon ? (
              <span className="text-[80px] md:text-[100px] leading-none animate-float">{icon}</span>
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
          </motion.div>
        </div>
      </div>

      {children && (
        <motion.div
          className="bg-sus-club/80 py-4 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </motion.div>
      )}
    </section>
  )
}
```

- [ ] **Dev-Server prüfen** — alle Abteilungsseiten und Startseite öffnen, Hero animiert beim Laden

- [ ] **Committen**

```bash
git add src/components/ui/HeroSection.tsx
git commit -m "feat: animate HeroSection on page load with Framer Motion"
```

---

### Task 6: Homepage-Sections erweitern + FadeIn

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/motion/AnimatedStats.tsx`

Sections bekommen `min-h-[70vh] py-32`. Section-Header werden in `FadeIn` gewrappt. Karten-Grids nutzen `AnimatedGrid`. Die Stats-Zahlen bekommen `CountUp`.

- [ ] **`AnimatedStats.tsx` erstellen** (`src/components/motion/AnimatedStats.tsx`)

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
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, i) => (
        <FadeIn key={stat.label} delay={i * 0.1}>
          <div className="bg-sus-club/50 rounded-2xl p-8 text-center border border-sus-muted/40">
            <div className="text-4xl font-black text-sus-royal mb-1">
              <CountUp target={stat.value} />
            </div>
            <div className="text-sm text-sus-light/50 font-medium">{stat.label}</div>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}
```

- [ ] **`page.tsx` aktualisieren** — vollständiger Ersatz:

```tsx
import type { Metadata } from 'next'
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

      {/* Aktuelles — HELL */}
      <section className="min-h-[70vh] py-32 px-4 bg-white flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <FadeIn>
            <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Aktuell</p>
            <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-sus-ink mb-10">Termine & Neuigkeiten</h2>
          </FadeIn>
          <AnimatedGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event, i) => (
              <EventCard key={i} event={event} />
            ))}
          </AnimatedGrid>
        </div>
      </section>

      {/* Über den Verein — DUNKEL */}
      <section className="min-h-[70vh] py-32 px-4 bg-sus-navy text-sus-light flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Der Verein</p>
              <h2 className="text-[clamp(28px,4vw,48px)] font-bold mb-6">Seit über 100 Jahren<br />für die Region</h2>
              <p className="text-sus-light/60 leading-relaxed mb-4 text-lg">
                Der Spiel- und Sportverein Oestereiden e.V. wurde 1922 gegründet und ist heute mit
                über 860 Mitgliedern der größte Verein im Stadtgebiet Rüthen.
              </p>
              <p className="text-sus-light/60 leading-relaxed">
                Mit vier aktiven Abteilungen bieten wir Sport und Gemeinschaft für jedes Alter.
              </p>
            </FadeIn>
            <AnimatedStats />
          </div>
        </div>
      </section>

      {/* Vorsitzender-Zitat — DUNKEL */}
      <QuoteSection />

      {/* Abteilungen — HELL */}
      <section className="min-h-[70vh] py-32 px-4 bg-white flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <FadeIn>
            <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Sport</p>
            <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-sus-ink mb-10">Unsere Abteilungen</h2>
          </FadeIn>
          <AnimatedGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map(dept => (
              <DepartmentCard key={dept.id} department={dept} />
            ))}
          </AnimatedGrid>
        </div>
      </section>

      {/* Vorstand — MITTEL */}
      <section className="min-h-[70vh] py-32 px-4 bg-sus-club flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <FadeIn>
            <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Team</p>
            <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-sus-light mb-12">Vereinsvorstand</h2>
          </FadeIn>
          <AnimatedGrid className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6 mb-16">
            {mainBoard.map(member => (
              <BoardMember key={member.name} member={member} />
            ))}
          </AnimatedGrid>
          <FadeIn>
            <p className="text-[11px] font-semibold text-sus-light/40 uppercase tracking-[0.15em] mb-6">Beisitzende</p>
          </FadeIn>
          <AnimatedGrid className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {advisoryBoard.map(member => (
              <BoardMember key={member.name} member={member} />
            ))}
          </AnimatedGrid>
        </div>
      </section>

      {/* Standort — DUNKEL */}
      <StandortSection />

      {/* Vereinsinfos — HELL */}
      <VereinsinfoSection />

      {/* Sponsoren — DUNKEL */}
      <section className="py-32 px-4 bg-sus-navy">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Partner</p>
            <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-sus-light mb-10">Unsere Sponsoren</h2>
          </FadeIn>
          <SponsorGrid sponsors={sponsors} />
        </div>
      </section>
    </>
  )
}
```

- [ ] **Dev-Server prüfen** — Startseite scrollt sichtbar länger, Sections blenden ein

- [ ] **Committen**

```bash
git add src/app/page.tsx src/components/motion/AnimatedStats.tsx
git commit -m "feat: expand homepage sections, add FadeIn and AnimatedGrid"
```

---

### Task 7: `DepartmentCard` — Abteilungsfarbe im Hover-Shadow

**Files:**
- Modify: `src/components/ui/DepartmentCard.tsx`

- [ ] **`DepartmentCard.tsx` aktualisieren**

```tsx
import Link from 'next/link'
import type { DepartmentInfo, Department } from '@/lib/types'

const DEPT_ICONS: Record<Department, string> = {
  fussball: '⚽',
  volleyball: '🏐',
  tennis: '🎾',
  breitensport: '🏃',
  allgemein: '🏅',
}

const DEPT_SHADOW: Record<Department, string> = {
  fussball:     'hover:shadow-[0_8px_40px_rgba(26,53,200,0.2)]',
  volleyball:   'hover:shadow-[0_8px_40px_rgba(13,122,110,0.2)]',
  tennis:       'hover:shadow-[0_8px_40px_rgba(196,125,14,0.2)]',
  breitensport: 'hover:shadow-[0_8px_40px_rgba(107,79,170,0.2)]',
  allgemein:    'hover:shadow-[0_8px_40px_rgba(42,54,112,0.15)]',
}

interface DepartmentCardProps {
  department: DepartmentInfo
}

export default function DepartmentCard({ department }: DepartmentCardProps) {
  return (
    <Link href={`/${department.id}`} className="group block h-full">
      <div className={`bg-white rounded-xl shadow-sm p-6 h-full hover:-translate-y-1 transition-all duration-200 ${DEPT_SHADOW[department.id]}`}>
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

- [ ] **Committen**

```bash
git add src/components/ui/DepartmentCard.tsx
git commit -m "feat: dept-color hover shadow on DepartmentCard"
```

---

### Task 8: `QuoteSection` erstellen

**Files:**
- Create: `src/components/sections/QuoteSection.tsx`

- [ ] **`QuoteSection.tsx` erstellen**

```tsx
'use client'

import Image from 'next/image'
import FadeIn from '@/components/motion/FadeIn'

export default function QuoteSection() {
  return (
    <section className="min-h-[70vh] py-32 px-4 bg-sus-navy flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          <FadeIn>
            <div className="relative aspect-square rounded-2xl overflow-hidden max-w-sm mx-auto md:mx-0 shadow-2xl">
              <Image
                src="/images/board/ulrich-mehn.jpg"
                alt="Ulrich Mehn, Vereinsvorsitzender"
                fill
                sizes="(max-width: 768px) 80vw, 40vw"
                className="object-cover object-top"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <blockquote>
              <p className="text-sus-royal text-xs font-semibold uppercase tracking-[0.15em] mb-6">
                Vereinsvorsitzender
              </p>
              <p className="text-[clamp(18px,2.2vw,28px)] font-light text-sus-light leading-relaxed mb-8">
                „Seit über 100 Jahren sind wir mehr als ein Sportverein —
                wir sind ein Stück Heimat für über 860 Menschen in Rüthen."
              </p>
              <footer className="border-t border-sus-muted/40 pt-6">
                <p className="font-semibold text-sus-light">Ulrich Mehn</p>
                <p className="text-sus-royal/70 text-sm mt-0.5">
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

- [ ] **Committen**

```bash
git add src/components/sections/QuoteSection.tsx
git commit -m "feat: add QuoteSection with Ulrich Mehn portrait"
```

---

### Task 9: `StandortSection` erstellen

**Files:**
- Create: `src/components/sections/StandortSection.tsx`

- [ ] **`StandortSection.tsx` erstellen**

```tsx
'use client'

import FadeIn from '@/components/motion/FadeIn'

export default function StandortSection() {
  return (
    <section className="min-h-[70vh] py-32 px-4 bg-sus-ink flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <FadeIn>
          <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Standort</p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-sus-light mb-12">So findest du uns</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <FadeIn className="md:col-span-2">
            <div className="rounded-2xl overflow-hidden h-[360px] md:h-full min-h-[300px]">
              <iframe
                title="Vereinshalle SuS Oestereiden"
                src="https://www.openstreetmap.org/export/embed.html?bbox=8.414%2C51.490%2C8.460%2C51.510&layer=mapnik&marker=51.4985%2C8.4370"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.2} className="flex flex-col justify-center">
            <div className="text-sus-light space-y-8">
              <div>
                <p className="text-sus-royal/70 text-xs font-semibold uppercase tracking-[0.15em] mb-2">Adresse</p>
                <p className="font-semibold text-sus-light">Im Kirchfeld 1</p>
                <p className="text-sus-light/60">59602 Rüthen</p>
              </div>
              <div>
                <p className="text-sus-royal/70 text-xs font-semibold uppercase tracking-[0.15em] mb-2">Telefon</p>
                <a
                  href="tel:+492954924590"
                  className="font-semibold text-sus-light hover:text-sus-royal transition-colors"
                >
                  +49 2954 924590
                </a>
              </div>
              <div>
                <p className="text-sus-royal/70 text-xs font-semibold uppercase tracking-[0.15em] mb-2">E-Mail</p>
                <a
                  href="mailto:info@sus-oestereiden.de"
                  className="font-semibold text-sus-light hover:text-sus-royal transition-colors"
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

- [ ] **Committen**

```bash
git add src/components/sections/StandortSection.tsx
git commit -m "feat: add StandortSection with OpenStreetMap embed"
```

---

### Task 10: `VereinsinfoSection` erstellen

**Files:**
- Create: `src/components/sections/VereinsinfoSection.tsx`

- [ ] **`VereinsinfoSection.tsx` erstellen**

```tsx
'use client'

import Link from 'next/link'
import FadeIn from '@/components/motion/FadeIn'

const abteilungen = [
  { label: 'Fußball', href: '/fussball' },
  { label: 'Volleyball', href: '/volleyball' },
  { label: 'Tennis', href: '/tennis' },
  { label: 'Breitensport', href: '/breitensport' },
]

export default function VereinsinfoSection() {
  return (
    <section className="min-h-[70vh] py-32 px-4 bg-sus-ice flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <FadeIn>
          <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Der Verein</p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-sus-ink mb-12">Alles auf einen Blick</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <FadeIn delay={0}>
            <div className="bg-white rounded-2xl p-8 h-full shadow-sm flex flex-col">
              <span className="text-3xl mb-4 block">🤝</span>
              <h3 className="font-bold text-sus-ink text-xl mb-3">Mitglied werden</h3>
              <p className="text-sus-ink/60 text-sm leading-relaxed mb-6 flex-1">
                Werde Teil unserer Gemeinschaft. Füll das Aufnahmeformular aus und der Vorstand meldet sich bei dir.
              </p>
              <Link
                href="/mitgliedschaft"
                className="inline-block px-5 py-2.5 bg-sus-royal text-white text-sm font-semibold rounded-xl hover:bg-sus-royal/90 transition-colors text-center"
              >
                Jetzt beitreten
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-white rounded-2xl p-8 h-full shadow-sm flex flex-col">
              <span className="text-3xl mb-4 block">🏅</span>
              <h3 className="font-bold text-sus-ink text-xl mb-3">Unsere Abteilungen</h3>
              <p className="text-sus-ink/60 text-sm leading-relaxed mb-6 flex-1">
                Fußball, Volleyball, Tennis und Breitensport — für jedes Alter und jedes Niveau etwas dabei.
              </p>
              <div className="flex flex-wrap gap-2">
                {abteilungen.map(a => (
                  <Link
                    key={a.href}
                    href={a.href}
                    className="px-3 py-1 border border-sus-royal/30 text-sus-royal text-sm rounded-full hover:bg-sus-royal hover:text-white transition-colors"
                  >
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-white rounded-2xl p-8 h-full shadow-sm flex flex-col">
              <span className="text-3xl mb-4 block">📬</span>
              <h3 className="font-bold text-sus-ink text-xl mb-3">Kontakt</h3>
              <p className="text-sus-ink/60 text-sm leading-relaxed mb-6 flex-1">
                Fragen? Wir sind für euch da.
              </p>
              <div className="space-y-3 text-sm">
                <p className="text-sus-ink/60">Im Kirchfeld 1, 59602 Rüthen</p>
                <a href="tel:+492954924590" className="block text-sus-royal font-semibold hover:underline">
                  +49 2954 924590
                </a>
                <a href="mailto:info@sus-oestereiden.de" className="block text-sus-royal font-semibold hover:underline">
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

- [ ] **Committen**

```bash
git add src/components/sections/VereinsinfoSection.tsx
git commit -m "feat: add VereinsinfoSection with 3 info tiles"
```

---

### Task 11: `HallSchedule` — Filter-Animationen

**Files:**
- Modify: `src/components/ui/HallSchedule.tsx`

- [ ] **`HallSchedule.tsx` aktualisieren** — `motion.button` mit `whileTap`, `AnimatePresence` + `motion.div` mit `layout` auf Slot-Karten

```tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { HallSlot, Department } from '@/lib/types'

const DAYS = ['mo', 'di', 'mi', 'do', 'fr', 'sa', 'so'] as const
type Day = typeof DAYS[number]

const DAY_LABELS: Record<Day, string> = {
  mo: 'Montag', di: 'Dienstag', mi: 'Mittwoch',
  do: 'Donnerstag', fr: 'Freitag', sa: 'Samstag', so: 'Sonntag',
}
const DAY_SHORT: Record<Day, string> = {
  mo: 'Mo', di: 'Di', mi: 'Mi', do: 'Do', fr: 'Fr', sa: 'Sa', so: 'So',
}

const DEPT_SLOT: Record<Department, string> = {
  fussball:     'border-l-[#1a35c8] bg-[#1a35c8]/5',
  volleyball:   'border-l-[#0d7a6e] bg-[#0d7a6e]/5',
  tennis:       'border-l-[#c47d0e] bg-[#c47d0e]/5',
  breitensport: 'border-l-[#6b4faa] bg-[#6b4faa]/5',
  allgemein:    'border-l-sus-muted bg-sus-muted/5',
}

interface HallScheduleProps {
  slots: HallSlot[]
}

export default function HallSchedule({ slots }: HallScheduleProps) {
  const [activeDay, setActiveDay] = useState<Day | null>(null)
  const [tooltip, setTooltip] = useState<HallSlot | null>(null)

  const filteredDays = activeDay ? [activeDay] : [...DAYS]

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveDay(null)}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
            activeDay === null
              ? 'bg-sus-royal text-white'
              : 'border border-sus-muted text-sus-ink/50 hover:border-sus-ink/30 hover:text-sus-ink'
          }`}
        >
          Alle
        </motion.button>
        {DAYS.map(day => (
          <motion.button
            key={day}
            whileTap={{ scale: 0.95 }}
            aria-label={DAY_LABELS[day]}
            onClick={() => setActiveDay(activeDay === day ? null : day)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              activeDay === day
                ? 'bg-sus-royal text-white'
                : 'border border-sus-muted text-sus-ink/50 hover:border-sus-ink/30 hover:text-sus-ink'
            }`}
          >
            {DAY_SHORT[day]}
          </motion.button>
        ))}
      </div>

      <motion.div
        layout
        className={`grid gap-3 ${filteredDays.length > 1 ? 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-7' : 'grid-cols-1 max-w-sm'}`}
      >
        {filteredDays.map(day => {
          const daySlots = slots.filter(s => s.day === day)
          return (
            <motion.div key={day} layout>
              <p className="text-xs font-bold text-sus-ink/30 uppercase tracking-[0.1em] mb-2">
                {DAY_LABELS[day]}
              </p>
              <div className="space-y-2">
                <AnimatePresence mode="popLayout">
                  {daySlots.length === 0 ? (
                    <div className="text-center text-xs text-sus-ink/20 py-3">–</div>
                  ) : (
                    daySlots.map((slot, i) => (
                      <motion.div
                        key={`${slot.group}-${slot.startTime}`}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`relative rounded-lg border-l-4 p-2.5 text-xs cursor-default ${DEPT_SLOT[slot.department]}`}
                        onMouseEnter={() => setTooltip(slot)}
                        onMouseLeave={() => setTooltip(null)}
                      >
                        <div className="font-bold truncate text-sus-ink">{slot.group}</div>
                        <div className="text-sus-ink/50 mt-0.5 font-medium uppercase tracking-[0.05em] text-[11px]">
                          {`${slot.startTime}–${slot.endTime}`}
                        </div>
                        {tooltip === slot && (
                          <div className="absolute z-10 bottom-full left-0 mb-1.5 bg-sus-navy text-sus-light text-xs rounded-xl px-3 py-2.5 w-48 shadow-xl pointer-events-none border border-sus-muted">
                            <div className="font-bold">{slot.group}</div>
                            <div className="text-sus-light/60 mt-0.5">{`${slot.startTime} – ${slot.endTime} Uhr`}</div>
                            <div className="capitalize text-sus-light/40 mt-0.5">{slot.department}</div>
                          </div>
                        )}
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
```

- [ ] **Bestehende HallSchedule-Tests laufen lassen**

```bash
npm test -- HallSchedule 2>&1 | tail -15
```

Erwartetes Ergebnis: alle Tests grün (mock rendert motion.button als button).

- [ ] **Committen**

```bash
git add src/components/ui/HallSchedule.tsx
git commit -m "feat: animate HallSchedule filter with Framer Motion"
```

---

### Task 12: Alle Tests final

- [ ] **Komplette Test-Suite ausführen**

```bash
npm test 2>&1 | tail -20
```

Erwartetes Ergebnis: alle Tests grün, 0 Failures.

- [ ] **Dev-Server vollständige Sichtprüfung**

Prüfe folgende Seiten im Browser auf http://localhost:3000:
- `/` — Hero animiert rein, Sections mit FadeIn, CountUp bei Stats, QuoteSection, StandortSection, VereinsinfoSection sichtbar
- `/fussball`, `/volleyball`, `/tennis`, `/breitensport` — Hero animiert rein
- `/hallenbelegung` — Filter-Buttons mit whileTap-Feedback, Karten animieren bei Filter-Wechsel

- [ ] **Final-Commit**

```bash
git add -A
git commit -m "feat: complete Apple scroll experience — all pages animated"
```
