# Scroll-Effekte und Bildsprache für die Startseite

**Datum:** 2026-09-03
**Status:** freigegeben, bereit für Implementierungsplan
**Referenz:** https://phenomenonstudio.com/

## Ziel

Die Startseite bekommt die Formensprache und die Scroll-Effekte der Referenzseite — in den bestehenden Vereinsfarben. Die sieben Unterseiten bleiben optisch unverändert und erhalten später höchstens die Basis-Effekte.

## Analyse der Referenz

Im DOM der Referenzseite nachgesehen, damit die Umsetzung nicht auf Vermutungen beruht:

- **Kein GSAP, kein Lenis, kein WebGL, kein Canvas.** WordPress-Theme mit eigenem JS (`fine-min.js`, `common-min.js`). Die Effekte sind CSS plus IntersectionObserver.
- Effekt-Vokabular an den CSS-Klassen ablesbar: `a-word` / `animated-text` (Wort-Reveal), `fadein` / `slidetop` / `isview` (Viewport-Trigger), `next_block_sticky` / `sticked` / `row sticky` (gestapelte Sektionen), `clipped-top` / `clipped-bottom` / `radius-80` (Rundungen), `animated-media` (Bild-Reveal), `widget-counter` (Count-Up).
- Optik: Near-Black `rgb(8,13,16)` im Wechsel mit Weiß, Orange als Akzent, *Bricolage Grotesque*, Sektionsabstände von 200px.

Die Konsequenz für uns: alles Gewünschte ist mit dem vorhandenen `framer-motion` plus CSS erreichbar. Keine neue Abhängigkeit.

## Entscheidungen

| Frage | Entscheidung |
|---|---|
| Wie weit geht die Referenz? | Formensprache übernehmen, Farben bleiben Royal Blue. Kein Agentur-Schwarz/Orange. |
| Umfang | Nur die Startseite. Unterseiten unverändert. |
| Schrift | System-Schrift bleibt. Kein Webfont, kein Layout-Shift, kein DSGVO-Thema. |
| Effekte | Wort-Reveal, Sticky-Stack, Rundungen/Clip, Bild-Reveal. **Kein** Scroll-Slider, **kein** Custom Cursor. |
| Technik | Effekt-Layer auf das Bestehende. Kein GSAP/Lenis. |

## Zwei Randbedingungen aus dem Bestand

**`HeroSection` ist geteilt.** Sieben Seiten importieren `src/components/ui/HeroSection.tsx` (`page`, `fussball`, `volleyball`, `tennis`, `breitensport`, `mitgliedschaft`, `hallenbelegung`). Ein dunkler Hero darf deshalb nicht der neue Default werden. Die Komponente bekommt einen optionalen Prop `variant?: 'light' | 'dark'` mit Default `'light'`, der das heutige Rendering bitgenau beibehält. Nur `src/app/page.tsx` setzt `variant="dark"`.

**Der Dark Mode hebt den Rhythmus auf.** `globals.css` definiert unter `prefers-color-scheme: dark` die Werte `--ui-canvas: 20 21 24` und `--ui-club: 18 24 37`. Diese beiden Töne sind visuell fast identisch — der Hell-Dunkel-Wechsel, von dem die ganze Bildsprache lebt, wäre im Dark Mode unsichtbar.

Lösung: die dunklen Blöcke bekommen eine eigene Variable, die im Light Mode dunkler und im Dark Mode **heller** als die Umgebung ist.

```css
:root                                  { --ui-block: 20 28 48; }   /* dunkler als canvas */
@media (prefers-color-scheme: dark) {
  :root                                { --ui-block: 34 50 88; }   /* heller als canvas */
}
```

Kontrast zur jeweiligen Umgebung, nachgerechnet: im Light Mode `rgb(247,248,250)` gegen `rgb(20,28,48)` ≈ **14.9:1**, im Dark Mode `rgb(20,21,24)` gegen `rgb(34,50,88)` ≈ **1.45:1**.

Der Dark-Mode-Wert ist bewusst niedrig. Hier geht es nicht um Textkontrast, für den WCAG 4.5:1 verlangt, sondern um die Wahrnehmbarkeit einer Kante zwischen zwei großen Flächen — dafür reicht deutlich weniger. Höher zu gehen würde bedeuten, den Block auf etwa `rgb(40,58,100)` aufzuhellen, und das liest sich nachts nicht mehr als dunkle Sektion, sondern als blauer Kasten. Text auf `.section-dark` ist in beiden Themes weiß und erfüllt 4.5:1 mit großem Abstand.

## Neue Komponenten

Beide folgen dem Muster des vorhandenen `src/components/motion/FadeIn.tsx`, damit sie sich im Projekt nicht fremd anfühlen. Beide sind Client Components.

### `src/components/motion/RevealText.tsx`

Zerlegt einen String an Leerzeichen in Wörter. Jedes Wort steckt in einem `span` mit `overflow: hidden`, darin ein `motion.span`, das von `y: '100%'` auf `y: 0` fährt. Staffelung 60 ms, Dauer 600 ms, Easing `[0.25, 0.1, 0.25, 1]` (dasselbe wie in `HeroSection`). Trigger über `whileInView` mit `viewport={{ once: true, margin: '-10%' }}`.

```ts
interface RevealTextProps {
  children: string                    // nur String — wird zerlegt, keine Nodes
  as?: 'h1' | 'h2' | 'h3' | 'p'       // Default 'h2'
  className?: string
  delay?: number
}
```

Bei `useReducedMotion()` wird der Text ohne Wortzerlegung und ohne Animation gerendert.

**Barrierefreiheit:** Die Wortzerlegung darf den Screenreader nicht in Einzelwörter zerhacken. Der äußere Tag trägt `aria-label` mit dem ungeteilten Text, die Wort-Spans bekommen `aria-hidden="true"`.

### `src/components/motion/RevealImage.tsx`

Wrapper um `next/image`. Der Wrapper animiert `clipPath` von `inset(100% 0 0 0)` auf `inset(0% 0 0 0)`, das Bild darin gleichzeitig von `scale(1.16)` auf `scale(1)`. Dauer 900 ms, gleiches Easing, Trigger wie oben. Reicht alle `next/image`-Props durch. Bei `prefers-reduced-motion` ohne Animation.

## CSS in `globals.css`

Kein JavaScript beteiligt.

- `--ui-block` in beiden Themes (siehe oben)
- `.section-dark` — `background: rgb(var(--ui-block))`, Text und Überschriften weiß, gedämpfter Text auf `rgba(255,255,255,.62)`
- `.clip-lg` — `border-radius: 80px 80px 0 0` (mobil 32px), `margin-top: -80px` und `position: relative`, damit sich die folgende Sektion über die vorige schiebt. Farbneutral: die Klasse wird sowohl auf helle Sektionen über dunklen als auch umgekehrt gesetzt
- `.section-pad` — `padding-block: 200px`, mobil `100px` (heute 80/112px)
- `.stack-item` — `position: sticky; top: 88px`

`top: 88px` ergibt sich aus der Navbar: `main` hat `pt-14` (56px) plus 32px Luft.

**Bekanntes Risiko:** `position: sticky` bricht still, sobald ein Vorfahr `overflow: hidden` hat. Die Kette `body` → `main` → Sektion ist heute frei davon. Bei der Implementierung ist das zu prüfen und nicht zu verletzen.

## Umbau der Startseite

`src/app/page.tsx`, Rhythmus von oben nach unten:

| # | Sektion | Fläche | Effekt |
|---|---|---|---|
| 1 | Hero | dunkel | `RevealText` auf der Headline |
| 2 | Termine & Neuigkeiten | hell, `.clip-lg` | `RevealText` auf dem Titel |
| 3 | Verein + Stats | hell | Count-Up, existiert bereits |
| 4 | Foto-Ticker | dunkel, `.clip-lg` | `RevealImage` |
| 5 | Zitat des Vorsitzenden | dunkel, läuft durch | `RevealText` |
| 6 | **Abteilungen** | hell, `.clip-lg` | **Sticky-Stack** |
| 7 | Vorstand | hell | `RevealText` |
| 8 | Standort | hell | `RevealText` |
| 9 | Vereinsinfos | hell | `RevealText` |
| 10 | Sponsoren | hell | unverändert |

### Der Sticky-Stack (Sektion 6)

Der einzige echte Layout-Eingriff. Heute ist das ein `grid-cols-2 lg:grid-cols-4` mit vier `DepartmentCard`. Als Stack werden daraus vier Zeilen über die volle Breite, die beim Scrollen übereinander kleben.

Neue Datei `src/components/sections/AbteilungenStack.tsx`. Sie liest `departments` aus `src/data/departments.ts` und rendert pro Abteilung eine breite Zeile: Bild links, Label und Beschreibung rechts, verlinkt auf `/{id}`. Jede Zeile ist ein `.stack-item` mit leicht wachsendem `top`-Offset, damit die Kanten der darunterliegenden Karten sichtbar bleiben.

`DepartmentCard.tsx` wird **nicht** angefasst — die Unterseiten und das Grid dort bleiben funktionsfähig.

Unter `md` wird nicht gestapelt, sondern normal untereinander gescrollt. Sticky-Stacking auf kleinen Viewports frisst zu viel Höhe.

## Was nicht gebaut wird

- Scroll-Slider und Custom Cursor — bewusst abgewählt
- Webfont
- Änderungen an den sieben Unterseiten
- Änderungen an `DepartmentCard`, `EventCard`, `BoardMember`, `SponsorGrid`
- Smooth Scrolling / Scroll Hijacking

## Prüfung

Die bestehende Jest-Konfiguration mockt `framer-motion` bereits (`__mocks__/framer-motion.tsx`). Die neuen Komponenten sind darüber testbar.

- `RevealText` rendert den vollständigen Text als zugänglichen Namen und den korrekten Tag laut `as`
- `RevealImage` reicht `src` und `alt` an `next/image` durch
- `AbteilungenStack` rendert eine Zeile je Eintrag aus `departments` mit korrektem `href`
- `npx tsc --noEmit` ist sauber. Vorbestehend schlagen zwei Fehler in `__mocks__/framer-motion.tsx` fehl; die gehören nicht zu dieser Arbeit und werden hier nicht mitrepariert.
- Sichtprüfung: Hell-Dunkel-Rhythmus in beiden Themes, Sticky-Stack klebt, `prefers-reduced-motion` schaltet alle vier Effekte ab

## Aufteilung auf Subagents

Drei Pakete ohne gemeinsame Dateien:

- **A** — `RevealText.tsx` und `RevealImage.tsx` samt Tests
- **B** — `AbteilungenStack.tsx` samt Test
- **C** — der CSS-Block in `globals.css`

Die Integration in `page.tsx` und der `variant`-Prop in `HeroSection.tsx` erfolgen danach sequenziell, nicht parallel: beide Dateien würden sonst von mehreren Agents gleichzeitig beschrieben.
