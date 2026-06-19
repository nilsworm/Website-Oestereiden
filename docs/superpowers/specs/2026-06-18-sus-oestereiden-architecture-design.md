# SuS Oestereiden — Architektur-Spec (Phase 1)

**Datum:** 2026-06-18  
**Projekt:** Neue Website SuS Oestereiden e. V. 1922  
**Phase:** 1 — Statische Website  
**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · Coolify (Docker/Nixpacks)

---

## Ziel

Neue öffentliche Website für den SuS Oestereiden e. V. 1922. Phase 1 ist vollständig statisch (keine Datenbank, kein Auth). Die Architektur ist so geschnitten, dass Phase 2 (Admin-Dashboard, PostgreSQL, Prisma, NextAuth) ohne Refactor der bestehenden Komponenten andocken kann.

---

## Deployment

- **Plattform:** Coolify (self-hosted auf Hetzner)
- **Build:** Nixpacks oder Dockerfile, `next build && next start`
- **SSL + Reverse-Proxy:** Coolify übernimmt automatisch
- **Kein PM2, kein Static Export** — Node-Prozess via Coolify

---

## Projektstruktur

```
Website-Oestereiden/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root Layout: Navbar + Footer + CookieBanner
│   │   ├── page.tsx                # Startseite /
│   │   ├── fussball/page.tsx       # /fussball
│   │   ├── volleyball/page.tsx     # /volleyball
│   │   ├── tennis/page.tsx         # /tennis
│   │   ├── breitensport/page.tsx   # /breitensport
│   │   ├── hallenbelegung/page.tsx # /hallenbelegung
│   │   ├── mitgliedschaft/page.tsx # /mitgliedschaft
│   │   ├── impressum/page.tsx      # /impressum
│   │   └── datenschutz/page.tsx    # /datenschutz
│   ├── components/
│   │   ├── layout/                 # Navbar, Footer, CookieBanner
│   │   └── ui/                     # EventCard, BoardMember, DepartmentCard,
│   │                               # SponsorGrid, HeroSection, HallSchedule
│   ├── data/                       # Statische Daten (Phase 1)
│   │   ├── board.ts
│   │   ├── events.ts
│   │   ├── hallenbelegung.ts
│   │   ├── sponsors.ts
│   │   └── departments.ts
│   └── lib/
│       └── types.ts                # Shared TypeScript-Interfaces
├── public/
│   └── images/                     # Vorstandsfotos, Sponsoren-Logos
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Seitenstruktur & Routing

| Route | Seite | Inhalt |
|-------|-------|--------|
| `/` | Startseite | Hero, Events, Vereinsinfo, Abteilungs-Cards, Vorstand, Sponsoren |
| `/fussball` | Fußball | Abteilungsvorstand, Mannschaften, Termine, SG-Haarstrang-Hinweis |
| `/volleyball` | Volleyball | Abteilungsvorstand, Mannschaften, Trainingszeiten |
| `/tennis` | Tennis | Abteilungsvorstand, Platzzeiten, Termine |
| `/breitensport` | Breitensport | Abteilungsvorstand, Kursangebot |
| `/hallenbelegung` | Hallenbelegung | Interaktive Wochentabelle |
| `/mitgliedschaft` | Mitgliedschaft | Infos, Mitgliederverteilung, PDF-Download |
| `/impressum` | Impressum | Pflichtangaben |
| `/datenschutz` | Datenschutz | DSGVO-konforme Erklärung |

**Phase-2-Erweiterung:** `app/admin/` wird als neuer Ordner angelegt — kein bestehender Code ändert sich.

---

## Komponentenhierarchie

### layout/
| Komponente | Typ | Beschreibung |
|-----------|-----|-------------|
| `Navbar` | Client | Logo, Links, Mobile-Hamburger-Menu |
| `Footer` | Server | Navigation, Kontakt, Impressum/Datenschutz-Links, Cookie-Einstellungen-Link |
| `CookieBanner` | Client | Kategorien (Funktional/Statistiken/Marketing), localStorage, DSGVO |

### ui/
| Komponente | Typ | Beschreibung |
|-----------|-----|-------------|
| `HeroSection` | Server | Vereinsname, Claim, Hintergrundbild |
| `EventCard` | Server | Datum, Titel, Beschreibung, Abteilung-Badge |
| `BoardMember` | Server | Foto, Name, Rolle |
| `DepartmentCard` | Server | Icon, Name, Kurztext, Link zur Abteilungsseite |
| `SponsorGrid` | Server | Logo-Grid, responsiv |
| `HallSchedule` | Client | Wochentabelle, Zeitslots — Hover zeigt Tooltip (Gruppe, Abteilung, Uhrzeit) |

Alle Seiten sind **Server Components** — kein `use client` außer den drei markierten Ausnahmen. Keine dynamischen Routen in Phase 1.

---

## Datenstruktur

Alle Interfaces in `src/lib/types.ts`. Datendateien in `src/data/` exportieren typisierte Arrays. In Phase 2 werden die Imports in den Komponenten durch `await prisma.X.findMany()` ersetzt — Interfaces bleiben unverändert, kein Komponenten-Refactor nötig.

```ts
// src/lib/types.ts

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
  date: string        // ISO 8601, z.B. "2026-07-12"
  title: string
  description: string
  department: Department
}

export interface HallSlot {
  day: 'mo' | 'di' | 'mi' | 'do' | 'fr' | 'sa' | 'so'
  startTime: string   // "18:00"
  endTime: string     // "20:00"
  group: string
  department: Department
}

export interface Sponsor {
  name: string
  logo?: string       // Pfad relativ zu public/, z.B. "/images/sponsors/sparkasse.png"
}

export interface DepartmentInfo {
  id: Department
  label: string
  description: string
  head: string        // Name des Abteilungsleiters
}
```

---

## Statische Daten (Phase 1)

### board.ts — Vereinsvorstand

**Hauptvorstand:**
- Ulrich Mehn — Vereinsvorsitzender
- Michael Witthaut — Geschäftsführer
- Volker Körn — Stellv. Vorsitzender
- Klaus Rossa — Kassierer
- Pascal Rückert — Stellv. Vorsitzender
- Robin Heidel — Stellv. Vorsitzender

**Beisitzende:**
- Carina Kaltschmidt — Abteilungsvorsitzende Breitensport
- Walter Hanemann — Abteilungsvorsitzender Tennis (Beisitzer Hauptvorstand)
- Markus Biermann — Stellv. Abteilungsvorsitzender Fußball
- Doris Witthaut — Abteilungsvorsitzende Volleyball

### Abteilungsvorstände

**Fußball:** Rolf Benteler (Leiter), Markus Biermann (Stellv.), Reinhard Mehn (Stellv.), Guido Horstschäfer (GF), Thomas Mertens (Kassierer), David Levening, Markus Belda, Matthias Lübke, Josef Eickhoff

**Volleyball:** Doris Witthaut (Leiterin), Katrin Rossa (Kassiererin), Anja Mehn (Beisitzerin)

**Tennis:** Gerrit Keil (Leiter), Ann-Catrin Dahlhoff (GF/Schatzmeisterin), Jan Wirsdörfer (Platzwart), Anna Schiller (Jugendwart), Carsten Luig (Sportwart)

**Breitensport:** Carina Kaltschmidt (Leiterin), Katja Molerus (GF), Sandra Heiermeier (Kassiererin)

### sponsors.ts
VBI, Witthaut, Sparkasse Lippstadt, Warsteiner, Eickhoff, Cormed, Gerrits, Risseglas, Knepper, Volksbank Brilon-Büren-Salzkotten

### events.ts
Mindestens 3 Platzhalter-Events (realistisch, je Abteilung eine).

### hallenbelegung.ts
Wochentage × Zeitslots × Gruppe. Daten werden vom Nutzer geliefert oder als Platzhalter angelegt.

---

## Impressum-Daten

- **Vereinsname:** Spiel- und Sportverein Oestereiden e. V. 1922
- **Adresse:** Im Kirchfeld 1, 59602 Rüthen
- **Telefon:** +49-2954-924590
- **E-Mail:** info@sus-oestereiden.de
- **Registergericht:** Amtsgericht Warstein, Nr. 0069
- **Vertreter:** Ulrich Mehn, Michael Witthaut
- **Verantwortlich § 55 RStV:** Robin Heidel, Nettelstädt 8, 59602 Rüthen

---

## DSGVO Cookie-Banner

- Erscheint beim ersten Besuch
- Kategorien: Funktional (immer aktiv), Statistiken, Marketing
- Buttons: "Alle akzeptieren", "Nur notwendige", "Einstellungen" (klappt Kategorie-Checkboxen inline auf)
- Entscheidung in `localStorage` gespeichert — Banner danach nicht mehr angezeigt
- Footer-Link "Cookie-Einstellungen" öffnet Banner erneut

---

## Assets

Vorstandsfotos und Logos werden von der bestehenden Website `www.sus-oestereiden.de` heruntergeladen und in `public/images/` abgelegt.

---

## Nutzergruppen

| Gruppe | Journey |
|--------|---------|
| **Öffentlich (normal)** | Startseite → Navigation nach Bedarf |
| **Admin (Phase 2)** | `/admin` → Termine + Hallenbelegung verwalten |

Phase 1 bedient ausschließlich öffentliche Besucher.

---

## Phase-2-Schnittstellenpunkte

Folgende Stellen ändern sich in Phase 2 — alles andere bleibt:

1. **Daten-Imports** in Komponenten: `import { events } from '@/data/events'` → `await prisma.event.findMany()`
2. **`app/admin/`** wird neu angelegt (NextAuth + CRUD-UI)
3. **`src/lib/types.ts`** bleibt unverändert — Prisma-Models implementieren dieselben Interfaces
4. **Hallenbelegung** `HallSchedule`-Komponente bekommt Props statt direkten Import — kein Umbau nötig

---

## Out of Scope (Phase 1)

- Kontaktformular / Mailer
- Mitgliedschaftsformular online
- Admin-Dashboard
- Datenbankanbindung
- Newsletter
- KI-Assistent
- Fanshop
