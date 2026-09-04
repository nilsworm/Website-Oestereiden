# Apple-Like Scroll Experience — Design Spec
**Datum:** 2026-06-25  
**Status:** Approved

## Ziel

Alle Seiten der SuS-Oestereiden-Website bekommen ein Apple-like Scroll-Erlebnis: längere, großzügigere Sections, Framer-Motion-Animationen beim Scrollen, interaktive Hover-States auf allen Karten. Vereinsfarben (Royal Blue `#1a35c8`, Navy `#0a0e1a`) bleiben vollständig erhalten.

---

## Technischer Ansatz

**Library:** `framer-motion` (~30KB gzipped) — einzige neue Dependency.

**Basisbausteine** in `src/components/motion/`:
- `FadeIn.tsx` — Element blendet beim Scroll-Eintritt ins Viewport rein (`opacity 0→1`, `translateY 20px→0`, `duration 0.6s`)
- `StaggerContainer.tsx` — Wrapper der Kindknoten gestaffelt animiert (0.1s Delay zwischen Kindern)

**Regeln:**
- Nur Teile die animiert werden sind `'use client'`. Server Components bleiben Server Components.
- `prefers-reduced-motion` wird respektiert (`useReducedMotion()`-Hook von Framer Motion).
- Kein Parallax, kein Scroll-Hijacking — performant auf Mobile.
- Map: OpenStreetMap via `<iframe>` — keine Cookies, DSGVO-konform.

---

## Homepage-Struktur

Alle Sections: `min-h-[70vh]`, Padding `py-32`. Farben bleiben im bestehenden Layer-System (DUNKEL/HELL/MITTEL).

### ① Hero *(bestehend, erweitert)*
- Vereinsfarben: `bg-sus-navy`
- Headline, Subtitle, Stats-Bar animieren gestaffelt rein (0.2s Stagger)
- Vereinswappen: `animate-float` CSS Keyframe (sanftes Schweben, 3s Loop)

### ② Termine & Neuigkeiten *(bestehend, erweitert)*
- Section-Header + 3 Karten gleiten von unten rein (`StaggerContainer`)
- Karten: `hover:-translate-y-1 hover:shadow-xl transition-all duration-200`

### ③ Seit über 100 Jahren *(bestehend, erweitert)*
- Zahlen (1922, 860+, 4, Rüthen) zählen per Count-Up-Animation hoch wenn Section ins Viewport scrollt
- Intersection Observer triggert den Zähler einmalig

### ④ Vorsitzender-Zitat *(neu)*
- Hintergrund: `bg-sus-navy`
- Layout Desktop: Links Foto Ulrich Mehn quadratisch `rounded-2xl` (~40% Breite), Rechts: großes Zitat `text-2xl font-light text-sus-light`, darunter Name + Rolle in `text-sus-royal`
- Layout Mobile: Bild oben, Text unten
- Zitat-Inhalt: Placeholder — muss vom Verein geliefert werden. Fallback: "Seit 1922 sind wir mehr als ein Sportverein — wir sind ein Stück Heimat für über 860 Menschen in Rüthen."
- `FadeIn` auf gesamte Section

### ⑤ Unsere Abteilungen *(bestehend, erweitert)*
- Karten: `aspect-[4/3]` statt aktuellem Format
- Hover-State: Scale `1.02` + Box-Shadow in jeweiliger Abteilungsfarbe (dept.fussball, dept.volleyball etc.)
- Karten animieren gestaffelt rein

### ⑥ Vereinsvorstand *(bestehend, Kontrast-Fix)*
- Hintergrund bleibt `bg-sus-club`
- Fotos: quadratisch mit `rounded-xl` (aktueller Stand nach Fix)
- Text: `text-sus-light` für Namen, `text-sus-royal/70` für Rollen — lesbarer Kontrast
- Fotos animieren gestaffelt rein

### ⑦ Standort *(neu)*
- Hintergrund: `bg-sus-navy`
- Desktop: 60% OpenStreetMap-iframe (Rüthen, Im Kirchfeld 1), 40% Adresse + Kontakt
- Adresse, Telefon, E-Mail jeweils als klickbarer Link (`tel:`, `mailto:`)
- iframe: `loading="lazy"`, `title="Vereinshalle SuS Oestereiden"`
- Mobile: Stack (iframe oben, Kontakt unten)

### ⑧ Infos zum Verein *(neu)*
- Hintergrund: `bg-sus-ice` (hellster Ton der Palette)
- Drei gleichgroße Kacheln:
  1. **Mitglied werden** — 3-Schritte-Prozess (Formular → Vorstand → Willkommen), CTA-Button
  2. **Unsere Abteilungen** — Icons + kurze Beschreibung jeder Abteilung, Links
  3. **Kontakt** — Name, Telefon, E-Mail, direkte Links
- Kacheln animieren gestaffelt rein

### ⑨ Sponsoren *(bestehend, unverändert)*

---

## Unterseiten

### Abteilungsseiten (Fußball, Volleyball, Tennis, Breitensport)
- Hero: Titel + Subtitle animieren gestaffelt rein; Sport-Emoji schwebt (`animate-float`)
- Abteilungsvorstand-Grid: quadratische Fotos, gestaffeltes Fade-in
- Hover auf Team-Karten: Scale `1.02` + Schatten
- Breitensport: Kursangebot-Kacheln animieren gestaffelt rein

### Hallenbelegung
- Hero: gestaffelt rein wie Abteilungsseiten
- Filter-Tabs (Sport + Wochentag): `whileTap={{ scale: 0.95 }}` via Framer Motion
- Schedule-Karten: `AnimatePresence` + `layout`-Prop für smooth Reflow bei Filter-Wechsel

### Impressum / Datenschutz / Mitgliedschaft
- Nur Hero-Fade-in, kein weiterer Animationsaufwand

---

## Offene Punkte vor der Umsetzung

1. **Zitat von Ulrich Mehn** — muss vom Verein geliefert werden, bis dahin Placeholder-Text
2. **OpenStreetMap-Koordinaten** — Im Kirchfeld 1, 59602 Rüthen (zu verifizieren)
3. **Mitglied-werden-Schritte** — konkrete Schritte (z.B. Formular ausfüllen → Vorstand bestätigt → Aufnahmegebühr) müssen inhaltlich abgestimmt werden; bis dahin generischer Placeholder
4. **`animate-float`** — wird als CSS `@keyframes` in `globals.css` definiert, nicht als Framer-Motion-Animation (Performance auf Safari)
