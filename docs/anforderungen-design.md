# Anforderungen an Design und Scroll-Effekte

Referenz: <https://phenomenonstudio.com/> — Formensprache übernehmen, Farben bleiben Royal Blue.
Volle Fassung: `docs/superpowers/specs/2026-09-03-scroll-effekte-design.md`

## Entscheidungen

| Frage | Entscheidung |
|---|---|
| Wie nah an der Referenz? | Formensprache ja, Agentur-Schwarz/Orange nein |
| Umfang | Nur die Startseite. Die 7 Unterseiten bleiben unverändert |
| Schrift | System-Schrift. Kein Webfont (Ladezeit, DSGVO) |
| Effekte | Wort-Reveal, Sticky-Stack, Rundungen/Clip, Bild-Reveal |
| Technik | Effekt-Layer auf dem Bestehenden (framer-motion + CSS). Kein GSAP, kein Lenis, keine neue Abhängigkeit |

## Sektionsrhythmus der Startseite

Hell und dunkel im Wechsel, die folgende Sektion schiebt sich mit 80px-Rundung über die vorige.

| # | Sektion | Fläche | Effekt |
|---|---|---|---|
| 1 | Hero | dunkel | Wort-Reveal auf der Headline |
| 2 | Termine & Neuigkeiten | hell, `.clip-lg` | Wort-Reveal |
| 3 | Verein + Stats | hell | Count-Up (bestand schon) |
| 4 | Foto-Ticker | dunkel, `.clip-lg` | Bild-Reveal |
| 5 | Zitat des Vorsitzenden | dunkel, läuft durch | Wort-Reveal |
| 6 | Abteilungen | hell, `.clip-lg` | **Sticky-Stack** — der Showcase |
| 7 | Vorstand | hell | Wort-Reveal |
| 8 | Standort | hell | Wort-Reveal |
| 9 | Vereinsinfos | hell | Wort-Reveal |
| 10 | Sponsoren | hell | unverändert |

Sektionsabstände 200px, mobil 100px. Unter `md` wird nicht gestapelt, sondern normal gescrollt.

## Randbedingungen

- **`HeroSection` ist von 7 Seiten geteilt.** Dunkel ist ein optionaler Prop `variant="dark"`, Default bleibt `light`. Nur `src/app/page.tsx` schaltet ihn an.
- **Dark Mode:** `--ui-canvas` und `--ui-club` sind nachts fast identisch — der Hell-Dunkel-Wechsel wäre unsichtbar. Deshalb eigene Variable `--ui-block`: im Light Mode dunkler, im Dark Mode heller als die Umgebung.
- **`position: sticky` bricht still**, sobald ein Vorfahr `overflow: hidden` hat. Die Kette `body` → `main` → Sektion muss frei davon bleiben.
- **Barrierefreiheit:** Wort-Reveal darf den Screenreader nicht zerhacken (`aria-label` außen, Wort-Spans `aria-hidden`). `prefers-reduced-motion` schaltet alle Effekte ab.

## Was ausdrücklich nicht gebaut wird

Scroll-Slider · Custom Cursor · Webfont · Smooth Scrolling / Scroll Hijacking · Änderungen an den Unterseiten · Änderungen an `DepartmentCard`, `EventCard`, `BoardMember`, `SponsorGrid`
