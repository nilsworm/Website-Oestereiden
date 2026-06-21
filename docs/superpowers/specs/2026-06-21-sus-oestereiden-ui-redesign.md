# SuS Oestereiden — UI/UX Redesign Spec (Phase 1.5)

**Datum:** 2026-06-21
**Projekt:** Neue Website SuS Oestereiden e.V. 1922
**Scope:** Vollständiges visuelles Redesign der bestehenden Phase-1-Implementierung
**Stack:** Next.js 15 · TypeScript · Tailwind CSS · CSS Custom Properties

---

## Ziel

Die bestehende Phase-1-Website funktioniert technisch korrekt, verwendet aber Grün als Primärfarbe — was nicht der echten Vereinsfarbe entspricht. Das Vereinslogo zeigt eindeutig **Royal Blue** als Vereinsfarbe. Dieses Redesign bringt die Website auf Premium-Niveau: FC Bayern / Red Bull Digital als Referenz, nicht generische Sportverein-WordPress-Optik.

**Stil-Richtung:** Premium-Sportverein — clean, hell mit strategisch dunklen Sektionen, geometrisch-moderne Typografie, subtile Micro-Animationen.

---

## Farbpalette

```css
:root {
  --color-navy:       #0a0e1a;  /* Off-Black — Hero, Footer, dunkle Sektionen */
  --color-club:       #0f1f6e;  /* Club Navy — mittlere Sektionen, Vorstand */
  --color-royal:      #1a35c8;  /* Royal Blue — CTAs, Highlights, aktive States */
  --color-ice:        #e8ecff;  /* Ice Blue — helle Sektions-Hintergründe */
  --color-white:      #ffffff;  /* Reines Weiß — Content-Hintergründe */
  --color-text-dark:  #12172e;  /* Ink — Texte auf hellem Hintergrund */
  --color-text-light: #f0f2ff;  /* Near-White — Texte auf dunklem Hintergrund */
  --color-muted:      #2a3670;  /* Divider, subtile Borders auf dunklem Hintergrund */
}
```

**Kein Grün mehr.** Die bisherigen `sus-green`-Klassen werden vollständig durch die obige Palette ersetzt.

### Abteilungs-Farbkodierung

Erscheint ausschließlich als Akzent (Border-Left, Badge) — nie als Flächenfarbe:

```
Fußball      → #1a35c8  (Royal Blue)
Volleyball   → #0d7a6e  (Deep Teal)
Tennis       → #c47d0e  (Warm Amber)
Breitensport → #6b4faa  (Soft Purple)
Allgemein    → #2a3670  (Muted Navy)
```

---

## Typografie

**Schriftart:** `Inter` (Google Fonts) — einheitlich für alles, Hierarchie durch Gewicht und Größe.

| Rolle | Größe (desktop) | Größe (mobile) | Gewicht |
|-------|----------------|----------------|---------|
| Display / Hero H1 | `clamp(40px, 6vw, 80px)` | 40px | 900 |
| Section H2 | `clamp(28px, 4vw, 48px)` | 28px | 700 |
| Card H3 | 20px | 18px | 700 |
| Body | 18px | 16px | 400 |
| Label / Tag | 12px, uppercase, `letter-spacing: 0.1em` | 11px | 600 |

Fluid Type via `clamp()` — keine abrupten Breakpoint-Sprünge.

---

## Layer-System (Sektions-Rhythmus)

Jede Seite wechselt zwischen drei visuellen Ebenen. Kein Abschnitt grenzt an denselben Ebenentyp.

| Ebene | Hintergrund | Text | Verwendung |
|-------|------------|------|-----------|
| **DUNKEL** | `#0a0e1a` | `#f0f2ff` | Hero, emotionale Momente, Footer |
| **MITTEL** | `#0f1f6e` | `#f0f2ff` | Sponsoren, CTAs, Vorstand |
| **HELL** | `#ffffff` | `#12172e` | Content, Karten, Formulare |

### Sektions-Übergänge

Diagonale Clips statt gerader horizontaler Linien:

```css
.section-clip-bottom {
  clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
  padding-bottom: 10%;
}
```

---

## Komponenten

### Navbar

- **Verhalten:** Startet transparent über dem dunklen Hero. Nach 80px Scroll: Glassmorphism — `backdrop-blur(16px)` + `background: rgba(10, 14, 26, 0.85)` + `border-bottom: 1px solid #2a3670`
- **Logo:** Text-basiert „SuS Oestereiden 1922", links, `font-weight: 700`
- **Links:** `color: #f0f2ff`, Hover-Underline wächst von links (`transform: scaleX`), kein Farbwechsel
- **CTA:** „Mitglied werden" als Button — `bg: #1a35c8`, weiß, `border-radius: 6px` — einziges Farbelement in der Nav
- **Mobile:** Hamburger → Fullscreen-Overlay (`bg: #0a0e1a`), Links zentriert 36px, Stagger-Animation (50ms pro Link)
- **Typ:** `'use client'`, `useEffect` für Scroll-Listener

### HeroSection

- **Props:** `title: string`, `subtitle: string`, `description?: string`, `children?: ReactNode` (Statistik-Bar Slot)
- **Hintergrund:** `#0a0e1a`
- **Logo-Animation:** Vereinswappen rechts, `64px`–`120px`, CSS `@keyframes` Float (`translateY 0 → -8px → 0`, 4s infinite ease-in-out)
- **Statistik-Bar:** Horizontale Reihe unter dem Hero-Content: `1922 · 860+ Mitglieder · 4 Abteilungen · Rüthen` — `bg: #0f1f6e`, Padding `16px 32px`

### EventCard

- `border-left: 4px solid` in Abteilungsfarbe (ersetzt Badge-Background)
- Hover: `translateY(-4px)` + `box-shadow` intensiviert — 200ms ease
- Datum: `font-size: 12px`, uppercase, `letter-spacing: 0.1em`, muted
- Kein sichtbarer Rahmen auf weißem Hintergrund

### DepartmentCard

- Icon: Emoji in `64px` rundem Container, `bg: #e8ecff`
- Hover: `translateY(-4px)` + subtiler Royal-Blue-Glow (`box-shadow: 0 8px 32px rgba(26,53,200,0.15)`)
- Label: `font-weight: 700`, Hover-Farbe `#1a35c8`

### BoardMember

- Avatar: `96px` Kreis — Foto oder Fallback-Initial in `bg: #0f1f6e`, `color: #f0f2ff`
- Kein Ring, kein Border — nur `box-shadow: 0 4px 16px rgba(0,0,0,0.12)`
- Name: `font-weight: 600`, 14px — Rolle: `color: #2a3670`, 12px

### SponsorGrid

- Auf `MITTEL`-Ebene (`bg: #0f1f6e`) — Logos wirken wertiger auf dunklem Grund
- Logos: `filter: grayscale(100%) brightness(2)` default → `filter: none` bei Hover — 150ms
- Karten: `bg: rgba(255,255,255,0.08)`, `border-radius: 8px`, `backdrop-blur(4px)`

### HallSchedule

- Tages-Tabs: Pill-Buttons — `bg: transparent`, `border: 1px solid #2a3670` → `bg: #1a35c8`, `border-color: #1a35c8` bei Auswahl
- Slot-Karten: `border-left: 4px solid` in Abteilungsfarbe, `bg: #f8f9ff`, monochromatisch
- Zeit-Label: uppercase, `letter-spacing: 0.05em`, 11px

### CookieBanner

- Floating Card statt volle Breite — `max-width: 480px`, `border-radius: 16px`, positioniert `bottom: 24px left: 24px`
- `bg: rgba(10, 14, 26, 0.92)`, `backdrop-blur(16px)`, `border: 1px solid #2a3670`
- Buttons: Primary (`bg: #1a35c8`) + Ghost (`border: 1px solid #2a3670`, `color: #f0f2ff`)

### ScrollReveal Hook (`useScrollReveal`)

```ts
// Gibt ref + Klassen zurück, die per IntersectionObserver getriggert werden
// Initial: opacity-0 translate-y-6
// Sichtbar: opacity-100 translate-y-0 transition-all duration-500 ease-out
// Threshold: 0.15 — Element zu 15% sichtbar
```

Jede Section-Komponente nutzt diesen Hook. Kein schweres Library (kein Framer Motion).

---

## Seitenstruktur

### `/` Startseite

```
DUNKEL  → Hero: Titel + Statistik-Bar
HELL    → Aktuelles & Termine (3 EventCards)
DUNKEL  → Über den Verein (Text + Stats-Grid 2×2)
HELL    → Abteilungen (4 DepartmentCards)
MITTEL  → Vereinsvorstand (BoardMember Grid)
HELL    → Sponsoren (SponsorGrid auf #0f1f6e)
DUNKEL  → Footer
```

### `/fussball`, `/volleyball`, `/tennis`, `/breitensport`

```
DUNKEL  → Hero mit Abteilungs-Icon (80px) + Titel
HELL    → Beschreibung + Abteilungsvorstand-Grid
MITTEL  → (Fußball only) SG-Haarstrang Info-Box prominent
DUNKEL  → Footer
```

### `/hallenbelegung`

```
DUNKEL  → Hero
HELL    → Legende-Chips + Tages-Tabs + HallSchedule
DUNKEL  → Footer
```

### `/mitgliedschaft`

```
DUNKEL  → Hero: „Werde Teil von 860+"
HELL    → Mitgliederverteilung (Progress-Bars in Club Navy)
MITTEL  → Adresse + PDF-Download-Button (Royal Blue)
DUNKEL  → Footer
```

### `/impressum`, `/datenschutz`

```
HELL    → Prose-Content, kein Hero, max-width: 65ch, Inter 18px
DUNKEL  → Footer
```

---

## Tailwind-Konfiguration

Die bisherigen `sus-green`-Farben werden durch folgende ersetzt:

```ts
// tailwind.config.ts
colors: {
  sus: {
    navy:   '#0a0e1a',
    club:   '#0f1f6e',
    royal:  '#1a35c8',
    ice:    '#e8ecff',
    ink:    '#12172e',
    light:  '#f0f2ff',
    muted:  '#2a3670',
  },
  dept: {
    fussball:    '#1a35c8',
    volleyball:  '#0d7a6e',
    tennis:      '#c47d0e',
    breitensport:'#6b4faa',
    allgemein:   '#2a3670',
  },
}
```

---

## globals.css

```css
@layer base {
  body {
    @apply text-sus-ink bg-white;
    font-feature-settings: 'kern', 'liga', 'calt';
  }

  h1 { @apply font-black tracking-tight; }
  h2 { @apply font-bold tracking-tight; }
  h3 { @apply font-bold; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}
```

---

## Was sich NICHT ändert

- Alle TypeScript-Interfaces in `src/lib/types.ts` — unverändert
- Alle Datendateien in `src/data/` — unverändert
- Routing-Struktur — unverändert
- Tests — werden auf neue Klassen angepasst, Logik bleibt
- Dockerfile + next.config.ts — unverändert

---

## Out of Scope

- Neue Seiten oder Routen
- Datenbankanbindung
- Neue Daten-Felder
- JavaScript-Animations-Libraries (Framer Motion etc.)
- Dark-Mode-Toggle
