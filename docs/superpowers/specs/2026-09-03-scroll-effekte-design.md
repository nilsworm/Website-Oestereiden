# Scroll-Effekte und Bildsprache für die Startseite — Restumfang

**Datum:** 2026-09-03, gekürzt am 2026-09-04
**Status:** umgesetzter Teil entfernt, hier steht nur noch das Offene

Umgesetzt und deshalb aus dieser Spec entfernt: `RevealText`, `RevealImage`, der CSS-Block in
`globals.css` (`--ui-block`, `.section-dark`, `.clip-lg`, `.section-pad`, `.stack-item`), der
`variant`-Prop an `HeroSection`, `AbteilungenStack` mit Sticky-Stack, sowie Hero, Termine,
Verein und Vorstand auf der Startseite samt Tests.

## Offen

| # | Sektion | Was fehlt |
|---|---|---|
| 4 | Foto-Ticker | Die Bilder sind nacktes `<Image>`. Laut Spec `RevealImage`. |
| 5 | Zitat des Vorsitzenden | Nur `FadeIn`. Laut Spec `RevealText` auf dem Zitat. |
| 8 | Standort | Titel „So findest du uns" ist ein normales `<h2>`, kein `RevealText`. |
| 9 | Vereinsinfos | Titel „Alles auf einen Blick" ist ein normales `<h2>`, kein `RevealText`. |

Dazu: `QuoteSection`, `StandortSection` und `VereinsinfoSection` stehen weiter auf
`py-20 md:py-28` statt auf `.section-pad` (200px / mobil 100px). Der Luftsprung fehlt dort also.

## Beim Umsetzen beachten

- `RevealText` nimmt nur einen String, keine Nodes. Das Zitat enthält typografische
  Anführungszeichen und einen Gedankenstrich — als ein String übergeben, nicht zerlegen.
- `position: sticky` bricht still, sobald ein Vorfahr `overflow: hidden` bekommt. Die Kette
  `body` → `main` → Sektion muss frei davon bleiben.
- Sichtprüfung steht noch aus: Hell-Dunkel-Rhythmus in beiden Themes, Sticky-Stack klebt,
  `prefers-reduced-motion` schaltet alle Effekte ab.
