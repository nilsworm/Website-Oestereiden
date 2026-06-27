# Apple-Like Redesign — SuS Oestereiden Website

**Datum:** 2026-06-27
**Branch:** feat/ui-redesign-royal-blue
**Ziel:** Vollständiges Design-Refactoring zu Apple.com-Ästhetik mit Fokus auf Mobile

---

## 1. Designprinzipien

- **Weiß dominiert.** Sektionen wechseln zwischen `#ffffff` und `#f5f5f7` — kein Navy als Hintergrundfarbe, außer einer einzigen Ausnahme.
- **Typografie spricht.** Sehr große Headlines (clamp-basiert), viel Weißraum, wenig Dekoration.
- **Blau als Akzent, nicht als Fläche.** Royal Blue (`#1a35c8`) bleibt als Markenfarbe — nur für CTAs, aktive Elemente, Icons und Zahlen.
- **Mobile First.** Bottom Tab Bar ersetzt Hamburger-Menü. Horizontale Scroll-Shelfs statt Grid-Overload auf kleinen Bildschirmen.

---

## 2. Design System

### Farben

| Token | Wert | Verwendung |
|-------|------|------------|
| `white` | `#ffffff` | Primäre Canvas |
| `surface` | `#f5f5f7` | Sekundäre Sections (Apple's Almostwhite) |
| `text-primary` | `#1d1d1f` | Headlines, Fließtext |
| `text-secondary` | `#6e6e73` | Untertitel, Beschreibungen |
| `accent` | `#1a35c8` | CTAs, Icons, Zahlen, aktive Nav-Elemente |
| `dark` | `#0a0e1a` | NUR Quote-Section |
| `footer` | `#1d1d1f` | Footer-Hintergrund |

**Entfernt:** `sus-navy`, `sus-club`, `sus-ice` als Sektionshintergründe.

### Typografie

| Rolle | Größe | Gewicht | Farbe |
|-------|-------|---------|-------|
| Hero-Headline | `clamp(52px, 9vw, 104px)` | Black (900) | `#1d1d1f` |
| Section-Headline | `clamp(36px, 5vw, 64px)` | Bold (700) | `#1d1d1f` |
| Body | 17px | Regular (400) | `#6e6e73` |
| Eyebrow | 11px, letter-spacing 0.15em | SemiBold (600) | `#1a35c8` |
| Footer/Labels | 12px | Medium (500) | `#6e6e73` |

### Abstände

- Section-Padding: `py-32 md:py-48`
- Card-Padding: `p-7 md:p-8`
- Card-Radius: `rounded-2xl` (20px)
- Card-Shadow: `shadow-[0_2px_20px_rgba(0,0,0,0.06)]`

### Animationen

- Alle FadeIn-Komponenten: `translateY(24px) → 0`, `opacity: 0 → 1`
- Easing: `[0.25, 0.1, 0.25, 1]` (cubic-bezier)
- Gestaffelt: 80ms Delay zwischen Geschwister-Elementen
- Trigger: `useInView` mit `once: true, margin: "-80px"`

---

## 3. Navigation

### Desktop-Navbar

- Hintergrund: `bg-white/80 backdrop-blur-xl border-b border-gray-200/50`
- Links: `#1d1d1f` (inaktiv: `#6e6e73`)
- Aktiver Link: `#1a35c8`
- CTA-Button „Mitglied werden": `bg-sus-royal text-white rounded-full`
- Höhe: `h-14` (statt h-12)

### Mobile: Bottom Tab Bar (neu)

Ersetzt vollständig das Hamburger-Menü auf `< md`.

```
[ Home ] [ Fußball ] [ Halle ] [ Kontakt ] [ Mehr ]
```

- Styling: `fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200/60`
- Safe Area: `padding-bottom: env(safe-area-inset-bottom)`
- Tabs: 5 Stück — Home (House), Fußball (Target), Halle (Calendar), Kontakt (Mail), Mehr (Grid)
- „Mehr" öffnet ein Sheet von unten (Framer Motion `AnimatePresence`) mit: Volleyball, Tennis, Breitensport, Mitgliedschaft
- Aktiver Tab: Royal Blue Icon + Label, inaktiv: `#6e6e73`
- Alle Seiten bekommen `pb-20 md:pb-0` für Abstand zur Tab Bar

---

## 4. Homepage — Sektionen

### 4.1 Hero

Komplett neu: kein Hintergrundbild mit Overlay, stattdessen zwei Teile.

**Teil A — Text (weiß):**
- Eyebrow: „Seit 1922"
- Headline: „SuS Oestereiden e.V." — maximale Typgröße
- Subline: „Der Verein für die Region" in grau
- Zwei CTAs: [Mitglied werden ●] (gefüllt, blau) + [Abteilungen →] (Ghost)
- Padding: `pt-24 pb-16`

**Teil B — Foto (fullbleed):**
- Kein Padding, kein Radius, kein Text-Overlay
- `aspect-ratio: 16/9` Desktop, `aspect-ratio: 4/3` Mobile
- `object-cover object-center`

### 4.2 Events / Aktuelles

- Hintergrund: `#f5f5f7`
- Mobile: horizontaler Scroll-Shelf (`overflow-x-auto`, `-mx-4 px-4`, `snap-x snap-mandatory`)
- Desktop: 3-Spalten Grid
- Cards: weiß, `rounded-2xl`, leichter Schatten, kein Border

### 4.3 Über den Verein + Stats

- Hintergrund: `#ffffff`
- Stats: 4 Zahlen in einer Reihe, zentriert
  - Zahl: `64-80px`, Inter Black, `#1a35c8`
  - Label: 13px, `#6e6e73`
  - Mobile: 2×2 Grid
- CountUp-Animation bleibt

### 4.4 Foto-Ticker

- Behält bestehenden dunklen Hintergrund (`#0a0e1a`)
- Ticker-Logik unverändert

### 4.5 Vorsitzender-Zitat

- Hintergrund: `#0a0e1a` (einzige dunkle Section)
- Desktop: 2 Spalten (Foto links, Zitat rechts) — unverändert
- Mobile: Foto kreisförmig, klein (80px), zentriert oben — darunter das Zitat
- Kein großes quadratisches Foto auf Mobile

### 4.6 Abteilungen

- Hintergrund: `#f5f5f7`
- Mobile: 2×2 Grid
- Cards: Foto oben (Abteilungsbild), Name, Pfeil-CTA
- Desktop: 4-Spalten Grid

### 4.7 Vorstand

- Hintergrund: `#ffffff`
- Mobile: horizontaler Scroll
- Avatare: kreisförmig (unverändert)
- Namen: `#1d1d1f`, Rolle: `#6e6e73`

### 4.8 Standort

- Hintergrund: `#f5f5f7`
- Map-Card auf weißem Hintergrund mit Radius
- Kontaktinfo rechts daneben

### 4.9 Vereinsinfos

- Hintergrund: `#ffffff`
- 3 Cards horizontal auf Desktop, vertikal gestapelt auf Mobile
- Cards: weiß, Icon in Blau, CTA-Button beibehalten

### 4.10 Sponsoren

- Hintergrund: `#f5f5f7`
- Ticker-Logik unverändert, hellerer Hintergrund

### 4.11 Footer

- Hintergrund: `#1d1d1f`
- Logo + Name + Navigation-Links + Copyright
- Text: `#6e6e73`, Links on hover: `#ffffff`

---

## 5. Unterseiten

Alle Unterseiten (Fußball, Volleyball, Tennis, Breitensport, Hallenbelegung, Mitgliedschaft) erhalten:
- Gleiche HeroSection, aber mit weißer Text-Section oben + Foto unten
- Gleiche Card-Patterns
- Bottom Tab Bar zeigt aktiven Tab hervorgehoben

---

## 6. Komponenten-Änderungen (Übersicht)

| Komponente | Änderung |
|------------|---------|
| `Navbar.tsx` | Hintergrund hell, Hamburger auf Mobile entfernen |
| `BottomTabBar.tsx` | Neu erstellen |
| `MoreSheet.tsx` | Neu erstellen (Sheet für „Mehr"-Tab) |
| `HeroSection.tsx` | Aufteilen in TextBlock + FotoBlock |
| `AnimatedStats.tsx` | Dunkle Kacheln → helle Zahlen-Reihe |
| `DepartmentCard.tsx` | Foto oben ergänzen |
| `QuoteSection.tsx` | Mobile-Layout anpassen |
| `BoardMember.tsx` | Horizontal-Scroll Container auf Mobile |
| `StandortSection.tsx` | Hintergrund hell |
| `VereinsinfoSection.tsx` | Hintergrund weiß |
| `Footer.tsx` | Neu gestalten |
| `globals.css` | `pb-20 md:pb-0` Body-Klasse, Safe-Area |
| `tailwind.config.ts` | `surface`-Farbe `#f5f5f7` ergänzen |

---

## 7. Nicht im Scope

- Inhalte, Texte, Daten — unverändert
- Foto-Assets — unverändert
- Routing / Next.js-Struktur — unverändert
- Cookie-Banner — unverändert
