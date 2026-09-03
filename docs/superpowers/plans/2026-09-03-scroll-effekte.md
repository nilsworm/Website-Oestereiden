# Scroll-Effekte Startseite — Implementierungsplan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Die Startseite bekommt die Bildsprache und vier Scroll-Effekte der Referenz phenomenonstudio.com, in den bestehenden Vereinsfarben.

**Architecture:** Effekt-Layer auf den Bestand. Zwei neue Motion-Komponenten nach dem Muster des vorhandenen `FadeIn`, eine neue Sektion für den Abteilungs-Stack, ein CSS-Block für Flächen und Rundungen. Keine neue Abhängigkeit. Die sieben Unterseiten bleiben unverändert.

**Tech Stack:** Next.js 16.2.9 (App Router), React 19.2.4, TypeScript, Tailwind CSS 3.4.19, framer-motion 12.41, Jest + Testing Library.

**Spec:** `docs/superpowers/specs/2026-09-03-scroll-effekte-design.md`

---

## Für alle Tasks verbindlich

**Das `useInView`-Muster, nicht `whileInView`.** Der Projekt-Mock unter `__mocks__/framer-motion.tsx` entfernt aus den Props nur `initial`, `animate`, `exit`, `transition`, `variants`, `whileTap`, `whileHover` und `layout`. `whileInView` und `viewport` stehen **nicht** auf dieser Liste und würden im Test als unbekannte DOM-Attribute durchschlagen. Alle neuen Komponenten benutzen deshalb `useInView(ref, { once: true, margin: '-10%' })` plus `animate`, exakt wie `src/components/motion/FadeIn.tsx`.

**Easing überall gleich:** `[0.25, 0.1, 0.25, 1] as const`. Derselbe Wert wie in `FadeIn` und `HeroSection`.

**Jeder Task endet mit einem Commit.** Testlauf: `npx jest <pfad>`. Typecheck: `npx tsc --noEmit`.

**Vorbestehende Fehler:** `npx tsc --noEmit` meldet heute schon zwei Fehler in `__mocks__/framer-motion.tsx` (TS2769 und TS2503, Zeile 7). Die gehören nicht zu dieser Arbeit. Sie dürfen bleiben, aber es dürfen **keine neuen** dazukommen.

---

## Dateiübersicht

| Datei | Was | Task |
|---|---|---|
| `src/components/motion/RevealText.tsx` | neu — Wort-für-Wort-Reveal | 1 |
| `__tests__/components/RevealText.test.tsx` | neu | 1 |
| `src/components/motion/RevealImage.tsx` | neu — Clip-Reveal für Bilder | 2 |
| `__tests__/components/RevealImage.test.tsx` | neu | 2 |
| `src/app/globals.css` | ändern — Farbvariable, vier Utilities | 3 |
| `src/components/sections/AbteilungenStack.tsx` | neu — Sticky-Stack | 4 |
| `__tests__/components/AbteilungenStack.test.tsx` | neu | 4 |
| `src/components/ui/HeroSection.tsx` | ändern — `variant`-Prop | 5 |
| `src/app/page.tsx` | ändern — neuer Rhythmus | 6 |

Tasks 1, 2 und 3 berühren keine gemeinsame Datei und können parallel laufen. Task 4 braucht 1, 2 und 3. Tasks 5 und 6 laufen zuletzt und sequenziell.

---

## Task 1: RevealText

**Files:**
- Create: `src/components/motion/RevealText.tsx`
- Test: `__tests__/components/RevealText.test.tsx`

Die Komponente zerlegt einen String in Wörter und lässt jedes Wort aus einem abschneidenden Kasten nach oben einfahren. Der entscheidende Punkt für die Barrierefreiheit: ein Screenreader darf die Überschrift nicht als Kette von Einzelwörtern vorlesen. Deshalb trägt das äußere Element `aria-label` mit dem ungeteilten Text, und alle Wort-Spans sind `aria-hidden`.

- [ ] **Step 1: Den fehlschlagenden Test schreiben**

Datei `__tests__/components/RevealText.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import RevealText from '@/components/motion/RevealText'

describe('RevealText', () => {
  it('behält den vollständigen Text als zugänglichen Namen, trotz Wortzerlegung', () => {
    render(<RevealText as="h2">Unsere Abteilungen</RevealText>)
    expect(
      screen.getByRole('heading', { level: 2, name: 'Unsere Abteilungen' })
    ).toBeInTheDocument()
  })

  it('rendert den über `as` gewählten Tag', () => {
    render(<RevealText as="h1">Der Verein</RevealText>)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('reicht className an das äußere Element durch', () => {
    const { container } = render(<RevealText className="section-title">Test</RevealText>)
    expect(container.firstChild).toHaveClass('section-title')
  })
})
```

Der erste Test ist der wichtige: er würde fehlschlagen, sobald jemand das `aria-label` entfernt und die Wortzerlegung damit an den Screenreader durchreicht.

- [ ] **Step 2: Test laufen lassen, Fehlschlag bestätigen**

Run: `npx jest __tests__/components/RevealText.test.tsx`
Expected: FAIL — `Cannot find module '@/components/motion/RevealText'`

- [ ] **Step 3: Die Komponente schreiben**

Datei `src/components/motion/RevealText.tsx`:

```tsx
'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface RevealTextProps {
  /** Nur String — der Text wird an Leerzeichen in Wörter zerlegt. */
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  delay?: number
}

const ease = [0.25, 0.1, 0.25, 1] as const

export default function RevealText({
  children,
  as = 'h2',
  className,
  delay = 0,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const prefersReduced = useReducedMotion()
  const Component = as as React.ElementType

  if (prefersReduced) {
    return <Component className={className}>{children}</Component>
  }

  const words = children.split(' ')

  return (
    <Component ref={ref} className={className} aria-label={children}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true">
          {/* pb/-mb verhindert, dass overflow-hidden die Unterlängen von g, j, p abschneidet */}
          <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: '100%' }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.6, delay: delay + i * 0.06, ease }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </Component>
  )
}
```

Drei Details, die leicht falsch gemacht werden:

Das Leerzeichen steht **außerhalb** des abschneidenden Spans. Läge es innerhalb, könnten lange Überschriften nicht mehr umbrechen.

`pb-[0.12em] -mb-[0.12em]` ist kein Schönheitsfehler-Fix, sondern nötig: ohne das schneidet `overflow: hidden` bei deutschen Wörtern wie „Abteilungen" oder „Jugend" die Unterlängen ab.

Alle drei Hooks stehen **vor** dem `if (prefersReduced)`. Das ist Absicht — sie müssen bei jedem Render in gleicher Reihenfolge laufen.

- [ ] **Step 4: Test laufen lassen, Erfolg bestätigen**

Run: `npx jest __tests__/components/RevealText.test.tsx`
Expected: PASS, 3 Tests

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit`
Expected: nur die zwei bekannten Fehler in `__mocks__/framer-motion.tsx`, keine neuen

- [ ] **Step 6: Commit**

```bash
git add src/components/motion/RevealText.tsx __tests__/components/RevealText.test.tsx
git commit -m "feat(motion): add RevealText for word-by-word headline reveal"
```

---

## Task 2: RevealImage

**Files:**
- Create: `src/components/motion/RevealImage.tsx`
- Test: `__tests__/components/RevealImage.test.tsx`

Wrapper um `next/image`. Der äußere Kasten legt das Bild per `clip-path` von unten frei, der innere zoomt gleichzeitig von `scale(1.16)` auf `1`.

- [ ] **Step 1: Den fehlschlagenden Test schreiben**

Datei `__tests__/components/RevealImage.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import RevealImage from '@/components/motion/RevealImage'

describe('RevealImage', () => {
  it('reicht src und alt an next/image durch', () => {
    render(
      <RevealImage
        src="/images/hero/Tennis-2.jpg"
        alt="Tennisanlage des SuS Oestereiden"
        width={400}
        height={300}
      />
    )
    const img = screen.getByAltText('Tennisanlage des SuS Oestereiden')
    expect(img).toBeInTheDocument()
    expect(img.tagName).toBe('IMG')
  })

  it('setzt wrapperClassName auf den äußeren Kasten', () => {
    const { container } = render(
      <RevealImage
        src="/images/hero/Tennis-2.jpg"
        alt="Tennisanlage"
        width={400}
        height={300}
        wrapperClassName="relative h-72"
      />
    )
    expect(container.firstChild).toHaveClass('relative', 'h-72')
  })
})
```

- [ ] **Step 2: Test laufen lassen, Fehlschlag bestätigen**

Run: `npx jest __tests__/components/RevealImage.test.tsx`
Expected: FAIL — `Cannot find module '@/components/motion/RevealImage'`

- [ ] **Step 3: Die Komponente schreiben**

Datei `src/components/motion/RevealImage.tsx`:

```tsx
'use client'

import { useRef } from 'react'
import Image, { type ImageProps } from 'next/image'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface RevealImageProps extends ImageProps {
  /**
   * Klassen für den äußeren Kasten. Bei `fill` muss hier `relative`
   * und eine Höhe drinstehen — sonst hat das Bild keinen Bezugsrahmen.
   */
  wrapperClassName?: string
}

const ease = [0.25, 0.1, 0.25, 1] as const

export default function RevealImage({ wrapperClassName, ...imageProps }: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return (
      <div className={wrapperClassName}>
        <Image {...imageProps} />
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={wrapperClassName}
      initial={{ clipPath: 'inset(100% 0 0 0)' }}
      animate={isInView ? { clipPath: 'inset(0% 0 0 0)' } : {}}
      transition={{ duration: 0.9, ease }}
    >
      <motion.div
        className="relative h-full w-full"
        initial={{ scale: 1.16 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.9, ease }}
      >
        <Image {...imageProps} />
      </motion.div>
    </motion.div>
  )
}
```

Der innere Kasten trägt `relative`, weil `clip-path` am äußeren Kasten einen eigenen Containing Block aufspannt. Ohne das `relative` würde ein Bild mit `fill` sich am falschen Element ausrichten.

- [ ] **Step 4: Test laufen lassen, Erfolg bestätigen**

Run: `npx jest __tests__/components/RevealImage.test.tsx`
Expected: PASS, 2 Tests

- [ ] **Step 5: Commit**

```bash
git add src/components/motion/RevealImage.tsx __tests__/components/RevealImage.test.tsx
git commit -m "feat(motion): add RevealImage with clip-path reveal"
```

---

## Task 3: CSS für Flächen, Rundungen und Stack

**Files:**
- Modify: `src/app/globals.css`

Kein JavaScript. Drei Einfügungen an genau bezeichneten Stellen.

- [ ] **Step 1: Die Farbvariable im Light Mode ergänzen**

In `src/app/globals.css`, im `:root`-Block innerhalb von `@layer base`, direkt nach der Zeile `--ui-club: 27 37 60;` einfügen:

```css
    --ui-block: 20 28 48;
```

- [ ] **Step 2: Die Farbvariable im Dark Mode ergänzen**

Im Block `@media (prefers-color-scheme: dark)`, direkt nach der Zeile `--ui-club: 18 24 37;` einfügen:

```css
      --ui-block: 34 50 88;
```

Der Wert ist im Dark Mode **heller** als `--ui-canvas` (`20 21 24`), im Light Mode **dunkler** als `--ui-canvas` (`247 248 250`). Das ist Absicht: nur so bleibt der Hell-Dunkel-Wechsel in beiden Themes als Kante sichtbar. Nachgerechnet ergibt das 14.9:1 im Light Mode und 1.45:1 im Dark Mode. Der niedrige Wert reicht für eine Flächenkante; für Text gilt er nicht, denn Text auf `.section-dark` ist weiß.

- [ ] **Step 3: Die vier Utilities ergänzen**

In `@layer utilities`, direkt nach der `.section-title`-Regel einfügen:

```css
  .section-dark {
    background: rgb(var(--ui-block));
    color: #ffffff;
  }
  .section-dark h1,
  .section-dark h2,
  .section-dark h3,
  .section-dark .text-ui-text,
  .section-dark .text-primary { color: #ffffff; }
  .section-dark .text-ui-muted,
  .section-dark .text-secondary { color: rgba(255, 255, 255, 0.62); }
  .section-dark .eyebrow { color: #7ba3ff; }
  .section-dark .divider { border-color: rgba(255, 255, 255, 0.14); }

  /* Schiebt die Sektion mit dicker Rundung über die vorige. Farbneutral —
     funktioniert hell-über-dunkel genauso wie dunkel-über-hell. */
  .clip-lg {
    position: relative;
    border-radius: 32px 32px 0 0;
    margin-top: -32px;
  }

  .section-pad { padding-block: 100px; }

  /* Auf Mobil bewusst nicht sticky: der Stack würde zu viel Höhe fressen. */
  .stack-item { position: static; }

  @media (min-width: 768px) {
    .clip-lg { border-radius: 80px 80px 0 0; margin-top: -80px; }
    .section-pad { padding-block: 200px; }
    .stack-item { position: sticky; top: 88px; }
  }
```

`top: 88px` setzt sich zusammen aus dem `pt-14` (56px) am `<main>` plus 32px Luft.

**Nicht verletzen:** `position: sticky` bricht still, sobald ein *Vorfahr* `overflow: hidden` trägt. Die Kette `body` → `main` → Sektion ist heute frei davon. Wer hier später ein `overflow-hidden` ergänzt, schaltet den Stack lautlos ab.

- [ ] **Step 4: Build prüfen**

Run: `npx next build`
Expected: erfolgreicher Build, keine CSS-Fehler

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(css): add section-dark, clip-lg, section-pad and stack-item utilities"
```

---

## Task 4: Der Abteilungs-Stack

**Files:**
- Create: `src/components/sections/AbteilungenStack.tsx`
- Test: `__tests__/components/AbteilungenStack.test.tsx`

**Braucht:** Task 1, 2 und 3.

Ersetzt auf der Startseite das 2×4-Grid durch vier volle Breitband-Zeilen, die beim Scrollen übereinander kleben. `DepartmentCard.tsx` wird **nicht** angefasst — die Unterseiten benutzen es weiter.

Die Komponente ist bewusst **kein** Client Component. Sie rendert nur und importiert die beiden Client-Komponenten; das spart JavaScript im Browser.

- [ ] **Step 1: Den fehlschlagenden Test schreiben**

Datei `__tests__/components/AbteilungenStack.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import AbteilungenStack from '@/components/sections/AbteilungenStack'
import { departments } from '@/data/departments'

describe('AbteilungenStack', () => {
  it('rendert eine Zeile je Abteilung', () => {
    render(<AbteilungenStack />)
    expect(screen.getAllByRole('link')).toHaveLength(departments.length)
  })

  it('verlinkt jede Abteilung auf ihre eigene Seite', () => {
    render(<AbteilungenStack />)
    expect(screen.getByRole('link', { name: /Fußball/ })).toHaveAttribute('href', '/fussball')
    expect(screen.getByRole('link', { name: /Tennis/ })).toHaveAttribute('href', '/tennis')
  })

  it('trägt die Sprungmarke #abteilungen für den Hero-Button', () => {
    const { container } = render(<AbteilungenStack />)
    expect(container.querySelector('#abteilungen')).toBeInTheDocument()
  })
})
```

Der dritte Test sichert etwas Konkretes ab: der Hero-Button `href="#abteilungen"` in `page.tsx` zeigt heute auf die alte Sektion. Verliert die neue Sektion die ID, läuft der Button ins Leere.

- [ ] **Step 2: Test laufen lassen, Fehlschlag bestätigen**

Run: `npx jest __tests__/components/AbteilungenStack.test.tsx`
Expected: FAIL — `Cannot find module '@/components/sections/AbteilungenStack'`

- [ ] **Step 3: Die Komponente schreiben**

Datei `src/components/sections/AbteilungenStack.tsx`:

```tsx
import Link from 'next/link'
import RevealText from '@/components/motion/RevealText'
import RevealImage from '@/components/motion/RevealImage'
import { departments } from '@/data/departments'

export default function AbteilungenStack() {
  return (
    <section id="abteilungen" className="page-surface clip-lg section-pad px-4">
      <div className="max-w-7xl mx-auto w-full">
        <p className="eyebrow mb-3">Sport</p>
        <RevealText as="h2" className="section-title mb-12">
          Unsere Abteilungen
        </RevealText>

        <div className="space-y-6">
          {departments.map((dept, i) => (
            <div
              key={dept.id}
              className="stack-item"
              style={{ top: `calc(88px + ${i * 16}px)` }}
            >
              <Link
                href={`/${dept.id}`}
                className="group grid grid-cols-1 md:grid-cols-2 surface-raised rounded-[28px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.10)]"
              >
                {dept.heroImage ? (
                  <RevealImage
                    wrapperClassName="relative h-56 md:h-80"
                    src={dept.heroImage}
                    alt={dept.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-56 md:h-80 bg-ui-surface" />
                )}

                <div className="p-7 md:p-12 flex flex-col justify-center">
                  <h3 className="text-[clamp(24px,3vw,40px)] font-bold tracking-tight text-ui-text mb-3">
                    {dept.label}
                  </h3>
                  <p className="text-ui-muted leading-relaxed">{dept.description}</p>
                  <span className="mt-6 text-ui-accent font-semibold text-sm inline-flex items-center gap-1.5">
                    Zur Abteilung
                    <span className="transition-transform group-hover:translate-x-1">›</span>
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

Der wachsende `top`-Versatz — 88, 104, 120, 136px — lässt von jeder liegengebliebenen Karte einen 16px-Streifen stehen. Ohne das verschwinden die unteren Karten restlos hinter der obersten und der Stapel ist nicht mehr als Stapel erkennbar.

Das `overflow-hidden` sitzt am `Link`, also **unterhalb** des `.stack-item`. Das ist erlaubt: `position: sticky` stört nur ein `overflow: hidden` bei einem *Vorfahren*.

Das `heroImage`-Ternary ist nötig, weil `DepartmentInfo.heroImage` optional getypt ist. Aktuell haben alle vier Abteilungen ein Bild, aber der Typ lässt das Fehlen zu.

- [ ] **Step 4: Test laufen lassen, Erfolg bestätigen**

Run: `npx jest __tests__/components/AbteilungenStack.test.tsx`
Expected: PASS, 3 Tests

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/AbteilungenStack.tsx __tests__/components/AbteilungenStack.test.tsx
git commit -m "feat(sections): add sticky-stacking Abteilungen section"
```

---

## Task 5: `variant`-Prop für HeroSection

**Files:**
- Modify: `src/components/ui/HeroSection.tsx`

`HeroSection` wird von sieben Seiten importiert: `page`, `fussball`, `volleyball`, `tennis`, `breitensport`, `mitgliedschaft`, `hallenbelegung`. Der Default muss deshalb bitgenau das heutige Verhalten behalten. Nur die Startseite schaltet auf `dark`.

- [ ] **Step 1: Das Interface erweitern**

In `src/components/ui/HeroSection.tsx`, im `HeroSectionProps`-Interface nach der Zeile `bgImage?: string` einfügen:

```tsx
  /** 'dark' nur auf der Startseite. Default hält das bisherige Rendering unverändert. */
  variant?: 'light' | 'dark'
```

- [ ] **Step 2: Den Prop annehmen und die Fläche umschalten**

Die Signatur ändern von:

```tsx
export default function HeroSection({ title, subtitle, description, bgImage, children }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion()
```

zu:

```tsx
export default function HeroSection({ title, subtitle, description, bgImage, children, variant = 'light' }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion()
  const isDark = variant === 'dark'
```

Dann die Zeile:

```tsx
      <div className="page-surface px-4 pt-16 pb-12 md:pt-24 md:pb-20">
```

ersetzen durch:

```tsx
      <div className={`${isDark ? 'section-dark' : 'page-surface'} px-4 pt-16 pb-12 md:pt-24 md:pb-20`}>
```

- [ ] **Step 3: Die Headline im dunklen Modus über RevealText rendern**

Import oben ergänzen:

```tsx
import RevealText from '@/components/motion/RevealText'
```

Den bestehenden `motion.h1`-Block ersetzen durch:

```tsx
          {isDark ? (
            <RevealText
              as="h1"
              className="text-[clamp(44px,8vw,96px)] font-bold tracking-[-0.035em] leading-[0.98] mb-5"
              delay={0.2}
            >
              {title}
            </RevealText>
          ) : (
            <motion.h1
              className="text-[clamp(44px,8vw,96px)] font-bold tracking-[-0.035em] leading-[0.98] mb-5 text-ui-text"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
            >
              {title}
            </motion.h1>
          )}
```

Der `light`-Zweig ist Zeichen für Zeichen der bisherige Code. Damit ändert sich auf den sechs Unterseiten garantiert nichts.

- [ ] **Step 4: Bestehende Tests laufen lassen**

Run: `npx jest`
Expected: alle bisherigen Tests weiterhin PASS

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit`
Expected: keine neuen Fehler

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/HeroSection.tsx
git commit -m "feat(hero): add opt-in dark variant, default rendering unchanged"
```

---

## Task 6: Die Startseite umbauen

**Files:**
- Modify: `src/app/page.tsx`

**Braucht:** alle vorigen Tasks.

- [ ] **Step 1: Imports anpassen**

`AnimatedGrid` wird für die Abteilungen nicht mehr gebraucht, für Termine und Vorstand schon. `DepartmentCard` wird auf dieser Seite nicht mehr benutzt — der Import fliegt raus, die Datei bleibt (die Unterseiten brauchen sie).

Entfernen:

```tsx
import DepartmentCard from '@/components/ui/DepartmentCard'
import { departments } from '@/data/departments'
```

Ergänzen:

```tsx
import RevealText from '@/components/motion/RevealText'
import RevealImage from '@/components/motion/RevealImage'
import AbteilungenStack from '@/components/sections/AbteilungenStack'
```

- [ ] **Step 2: Hero auf dunkel schalten**

Am `<HeroSection>`-Aufruf `variant="dark"` ergänzen:

```tsx
      <HeroSection
        title="SuS Oestereiden e.V."
        subtitle="Der Verein für die Region"
        description="Über 860 Mitglieder, vier Abteilungen, eine Gemeinschaft."
        bgImage="/images/hero/Verein-allgemein-7.jpg"
        variant="dark"
      >
```

- [ ] **Step 3: Termine-Sektion — Rundung, Abstand, Wort-Reveal**

Die öffnende Zeile der Aktuelles-Sektion ändern von:

```tsx
      <section className="py-20 md:py-28 page-surface-muted">
```

zu:

```tsx
      <section className="page-surface-muted clip-lg section-pad">
```

und darin den Titel ersetzen von:

```tsx
            <h2 className="section-title mb-10">Termine & Neuigkeiten</h2>
```

zu:

```tsx
            <RevealText as="h2" className="section-title mb-10">Termine &amp; Neuigkeiten</RevealText>
```

- [ ] **Step 4: Verein-Sektion — Abstand und Wort-Reveal**

Öffnende Zeile ändern von `<section className="py-20 md:py-28 px-4 page-surface">` zu:

```tsx
      <section className="px-4 page-surface section-pad">
```

Den zweizeiligen Titel ersetzen von:

```tsx
              <h2 className="section-title mb-6">
                Seit über 100 Jahren<br />für die Region
              </h2>
```

zu:

```tsx
              <RevealText as="h2" className="section-title mb-6">
                Seit über 100 Jahren für die Region
              </RevealText>
```

Der harte `<br />` fällt weg — `RevealText` nimmt nur einen String. Der Umbruch entsteht jetzt durch den natürlichen Zeilenfluss, und `h2 { text-wrap: balance }` aus `globals.css` verteilt die Zeilen ohnehin gleichmäßig.

- [ ] **Step 5: Foto-Ticker dunkel rahmen**

Die Ticker-Zeile ändern von:

```tsx
          <div className="overflow-hidden bg-[#0a0e1a]">
```

zu:

```tsx
          <div className="overflow-hidden section-dark clip-lg">
```

**Der Ticker bekommt bewusst kein `RevealImage` — und sonst bekommt es auf dieser Seite auch nichts weiter.** Die Spec sieht den Effekt für Sektion 4 vor; das war ein Fehler in meiner eigenen Spec. Die Ticker-Bilder laufen als Endlos-Marquee dauerhaft seitwärts, und ein Reveal, der beim Eintritt in den Viewport einmalig von unten freilegt, kämpft sichtbar gegen diese Bewegung.

Der andere Kandidat wäre das Hero-Foto — das steckt aber in `HeroSection` und bleibt dort unangetastet, damit die sechs Unterseiten nicht betroffen sind. Einziger Einsatzort von `RevealImage` auf der Startseite ist damit `AbteilungenStack` aus Task 4. Das ist Absicht, nicht vergessen.

- [ ] **Step 6: Abteilungen durch den Stack ersetzen**

Den kompletten Block von `{/* Abteilungen */}` bis zum schließenden `</section>` — im Original die Zeilen 134 bis 147 — ersetzen durch:

```tsx
      {/* Abteilungen — Sticky-Stack */}
      <AbteilungenStack />
```

- [ ] **Step 7: Vorstand-Sektion — Abstand und Wort-Reveal**

Öffnende Zeile ändern von `<section className="py-16 px-4 page-surface">` zu:

```tsx
      <section className="px-4 page-surface section-pad">
```

Titel ersetzen von:

```tsx
            <h2 className="text-[clamp(22px,3vw,36px)] font-bold text-ui-text mb-10">Vereinsvorstand</h2>
```

zu:

```tsx
            <RevealText as="h2" className="text-[clamp(22px,3vw,36px)] font-bold text-ui-text mb-10">Vereinsvorstand</RevealText>
```

- [ ] **Step 8: Alle Tests und den Build laufen lassen**

Run: `npx jest`
Expected: alle Tests PASS

Run: `npx tsc --noEmit`
Expected: nur die zwei bekannten Mock-Fehler

Run: `npx next build`
Expected: erfolgreicher Build

- [ ] **Step 9: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(home): apply dark/light rhythm, word reveals and sticky department stack"
```

---

## Task 7: Sichtprüfung im Browser

**Files:** keine

Automatisierte Tests können nicht prüfen, ob etwas *gut aussieht* oder ob `position: sticky` tatsächlich klebt. Dieser Task ist manuell.

- [ ] **Step 1: Dev-Server starten**

Run: `npm run dev`
Öffnen: `http://localhost:3000`

- [ ] **Step 2: Diese sechs Punkte durchgehen**

1. Die Überschriften fahren wortweise ein, wenn sie in den Viewport kommen — nicht alle gleichzeitig, sondern gestaffelt.
2. Bei „Unsere Abteilungen" und „Vereinsvorstand" sind die Unterlängen von g und j **nicht** abgeschnitten.
3. Die vier Abteilungskarten kleben und stapeln sich, von jeder liegengebliebenen bleibt oben ein Streifen sichtbar.
4. Der Hell-Dunkel-Wechsel ist als Kante erkennbar — und zwar **in beiden Themes**. Dark Mode über die Systemeinstellung umschalten und erneut prüfen. Das ist der Punkt, der am ehesten daneben geht.
5. Unter 768px Breite wird nicht gestapelt, sondern normal gescrollt.
6. Reduced Motion: unter macOS in *Systemeinstellungen → Bedienungshilfen → Anzeige → Bewegung reduzieren* aktivieren, Seite neu laden. Alle vier Effekte müssen aus sein, alle Inhalte trotzdem sichtbar.

- [ ] **Step 3: Ergebnis melden**

Auffälligkeiten berichten statt still zu korrigieren — besonders bei Punkt 4, weil der Farbwert dann nachjustiert werden muss.

---

## Selbstprüfung des Plans

**Spec-Abdeckung:** Wort-Reveal → Task 1. Bild-Reveal → Task 2. Rundungen, Abstände, dunkle Flächen, Sticky → Task 3. Sticky-Stack → Task 4. Geteilter Hero → Task 5. Rhythmus der Startseite → Task 6. Dark-Mode-Kontrast → Task 3 Step 2, geprüft in Task 7. Reduced Motion → in Task 1, 2 und 5 eingebaut, geprüft in Task 7.

**Eine bewusste Abweichung von der Spec:** Der Foto-Ticker bekommt kein `RevealImage` (Begründung in Task 6, Step 5). Die Spec-Tabelle sieht es vor, der Effekt kollidiert aber mit der Dauerbewegung des Marquees.

**Typkonsistenz:** `RevealText` heißt in allen Tasks `RevealText`, Prop `as`, Werte `'h1' | 'h2' | 'h3' | 'p'`. `RevealImage` nimmt `wrapperClassName` plus alle `ImageProps`. `AbteilungenStack` ist ohne Props. `HeroSection` bekommt `variant?: 'light' | 'dark'`. Die Utility-Klassen heißen durchgängig `.section-dark`, `.clip-lg`, `.section-pad`, `.stack-item`.
