'use client'

import { useState } from 'react'
import { events } from '@/data/events'
import { hallSlots } from '@/data/hallenbelegung'
import { departments } from '@/data/departments'
import { mainBoard } from '@/data/board'

// ponytail: reine Optik-Demo. Das Passwort steht im Client-Bundle und nichts wird
// gespeichert oder an einen Server gesendet. Echtes Backend: Branch feat/admin-backend.
const DEMO_PASSWORD = 'oestereiden-demo'

const input =
  'w-full rounded-xl border divider bg-ui-raised px-3 py-2 text-sm text-ui-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-ui-accent'
const label = 'block text-xs font-semibold uppercase tracking-wider text-ui-muted mb-1.5'
const card = 'rounded-2xl border divider bg-ui-raised p-5'

const tabs = ['Termine & News', 'Hallenbelegung', 'Seitentexte', 'Bilder'] as const
type Tab = (typeof tabs)[number]

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)
  const [tab, setTab] = useState<Tab>(tabs[0])
  const [toast, setToast] = useState('')

  const save = () => {
    setToast('Demo-Modus: Änderungen werden nicht gespeichert.')
    setTimeout(() => setToast(''), 3000)
  }

  if (!authed) {
    return (
      <div className="fixed inset-0 z-[70] overflow-auto bg-ui-canvas flex items-center justify-center p-4">
        <form
          onSubmit={e => {
            e.preventDefault()
            if (pw === DEMO_PASSWORD) setAuthed(true)
            else setError(true)
          }}
          className={`${card} w-full max-w-sm space-y-4`}
        >
          <div>
            <p className="eyebrow mb-1">Vereinsverwaltung</p>
            <h1 className="text-2xl font-bold text-ui-text">Anmelden</h1>
          </div>
          <div>
            <label htmlFor="user" className={label}>Benutzer</label>
            <input id="user" className={input} defaultValue="vorstand@sus-oestereiden.de" readOnly />
          </div>
          <div>
            <label htmlFor="pw" className={label}>Passwort</label>
            <input
              id="pw"
              type="password"
              className={input}
              value={pw}
              onChange={e => { setPw(e.target.value); setError(false) }}
              autoFocus
            />
            {error && <p className="mt-2 text-sm text-red-600" role="alert">Passwort falsch.</p>}
          </div>
          <button className="button-primary w-full">Anmelden</button>
          <p className="text-xs text-ui-muted text-center">Demo-Version – keine echten Daten</p>
        </form>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[70] overflow-auto bg-ui-canvas">
      <div className="bg-ui-accent text-white text-xs text-center py-1.5">
        Vorschau-Modus: Alle Änderungen sind nur Beispiel und werden nicht gespeichert.
      </div>
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <header className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <p className="eyebrow mb-1">SuS Oestereiden e.V.</p>
            <h1 className="text-2xl md:text-3xl font-bold text-ui-text">Verwaltung</h1>
          </div>
          <div className="flex items-center gap-3 text-sm text-ui-muted">
            <span className="hidden sm:inline">Angemeldet als Vorstand</span>
            <button className="button-secondary" onClick={() => setAuthed(false)}>Abmelden</button>
          </div>
        </header>

        <nav className="flex gap-1 overflow-x-auto border-b divider mb-6" aria-label="Bereiche">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              aria-current={tab === t}
              className={`whitespace-nowrap px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${
                tab === t ? 'border-ui-accent text-ui-accent' : 'border-transparent text-ui-muted hover:text-ui-text'
              }`}
            >
              {t}
            </button>
          ))}
        </nav>

        {tab === 'Termine & News' && <News onSave={save} />}
        {tab === 'Hallenbelegung' && <Hall onSave={save} />}
        {tab === 'Seitentexte' && <Texts onSave={save} />}
        {tab === 'Bilder' && <Images onSave={save} />}
      </div>

      {toast && (
        <div role="status" className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-ui-navy text-white text-sm px-5 py-2.5 shadow-xl">
          {toast}
        </div>
      )}
    </div>
  )
}

function SaveBar({ onSave, onAdd, addLabel }: { onSave: () => void; onAdd: () => void; addLabel: string }) {
  return (
    <div className="flex flex-wrap gap-2 justify-between mb-4">
      <button className="button-secondary" onClick={onAdd}>+ {addLabel}</button>
      <button className="button-primary" onClick={onSave}>Änderungen speichern</button>
    </div>
  )
}

function News({ onSave }: { onSave: () => void }) {
  // Neueste zuerst, wie auf der Startseite.
  const [items, setItems] = useState(() =>
    [...events].sort((a, b) => b.date.localeCompare(a.date)).map((e, i) => ({ ...e, id: i })),
  )
  const patch = (id: number, p: Partial<(typeof items)[number]>) =>
    setItems(items.map(i => (i.id === id ? { ...i, ...p } : i)))
  return (
    <>
      <SaveBar
        onSave={onSave}
        addLabel="Neuer Eintrag"
        onAdd={() =>
          setItems([{ id: Date.now(), date: new Date().toISOString().slice(0, 10), title: '', description: '', department: 'allgemein' }, ...items])
        }
      />
      <div className="space-y-4">
        {items.map(i => (
          <div key={i.id} className={`${card} grid gap-4 md:grid-cols-[10rem_1fr_11rem]`}>
            <div>
              <label className={label}>Datum</label>
              <input type="date" className={input} value={i.date} onChange={e => patch(i.id, { date: e.target.value })} />
            </div>
            <div>
              <label className={label}>Titel</label>
              <input className={input} value={i.title} placeholder="Titel" onChange={e => patch(i.id, { title: e.target.value })} />
            </div>
            <div>
              <label className={label}>Abteilung</label>
              <select className={input} value={i.department} onChange={e => patch(i.id, { department: e.target.value as typeof i.department })}>
                <option value="allgemein">Verein</option>
                {departments.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
              </select>
            </div>
            <div className="md:col-span-3">
              <label className={label}>Text</label>
              <textarea rows={3} className={input} value={i.description} onChange={e => patch(i.id, { description: e.target.value })} />
            </div>
            <div className="md:col-span-3 text-right">
              <button className="text-sm text-red-600 hover:underline" onClick={() => setItems(items.filter(x => x.id !== i.id))}>
                Löschen
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function Hall({ onSave }: { onSave: () => void }) {
  const [slots, setSlots] = useState(() => hallSlots.map((s, i) => ({ ...s, id: i })))
  const patch = (id: number, p: Partial<(typeof slots)[number]>) =>
    setSlots(slots.map(s => (s.id === id ? { ...s, ...p } : s)))
  const days = ['mo', 'di', 'mi', 'do', 'fr', 'sa', 'so'] as const
  return (
    <>
      <SaveBar
        onSave={onSave}
        addLabel="Neue Belegung"
        onAdd={() => setSlots([...slots, { id: Date.now(), day: 'mo', startTime: '18:00', endTime: '19:00', group: '', department: 'allgemein' }])}
      />
      <div className={`${card} overflow-x-auto p-0`}>
        <table className="w-full text-sm min-w-[44rem]">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-ui-muted border-b divider">
              {['Tag', 'Von', 'Bis', 'Gruppe', 'Abteilung', ''].map(h => <th key={h} className="p-3 font-semibold">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {slots.map(s => (
              <tr key={s.id} className="border-b divider last:border-0">
                <td className="p-2">
                  <select className={input} value={s.day} onChange={e => patch(s.id, { day: e.target.value as typeof s.day })}>
                    {days.map(d => <option key={d} value={d}>{d.toUpperCase()}</option>)}
                  </select>
                </td>
                <td className="p-2"><input type="time" className={input} value={s.startTime} onChange={e => patch(s.id, { startTime: e.target.value })} /></td>
                <td className="p-2"><input type="time" className={input} value={s.endTime} onChange={e => patch(s.id, { endTime: e.target.value })} /></td>
                <td className="p-2"><input className={input} value={s.group} onChange={e => patch(s.id, { group: e.target.value })} /></td>
                <td className="p-2">
                  <select className={input} value={s.department} onChange={e => patch(s.id, { department: e.target.value as typeof s.department })}>
                    <option value="allgemein">Verein</option>
                    {departments.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
                  </select>
                </td>
                <td className="p-2 text-right">
                  <button aria-label="Zeile löschen" className="text-red-600 px-2" onClick={() => setSlots(slots.filter(x => x.id !== s.id))}>✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

const textGroups = [
  { title: 'Startseite – Hero', fields: [
    ['Überschrift', 'Der Verein für die Region'],
    ['Unterzeile', 'Über 860 Mitglieder, vier Abteilungen, eine Gemeinschaft.'],
  ] },
  { title: 'Startseite – Der Verein', fields: [
    ['Überschrift', 'Seit über 100 Jahren für die Region'],
    ['Absatz 1', 'Der Spiel- und Sportverein Oestereiden e.V. wurde 1922 gegründet und ist heute mit über 860 Mitgliedern der größte Verein im Stadtgebiet Rüthen.'],
    ['Absatz 2', 'Mit vier aktiven Abteilungen bieten wir Sport und Gemeinschaft für jedes Alter.'],
  ] },
  { title: 'Zitat des Vorsitzenden', fields: [
    ['Zitat', 'Seit über 100 Jahren sind wir mehr als ein Sportverein — wir sind ein Stück Heimat'],
    ['Name & Rolle', 'Ulrich Mehn, Vereinsvorsitzender'],
  ] },
  { title: 'Kontakt & Standort', fields: [
    ['Adresse', 'Im Kirchfeld 1, 59602 Rüthen'],
    ['Telefon', '+49 2954 924590'],
    ['E-Mail', 'info@sus-oestereiden.de'],
  ] },
  { title: 'Abteilungen', fields: departments.map(d => [d.label, d.description]) },
] as const

function Texts({ onSave }: { onSave: () => void }) {
  return (
    <div className="space-y-5">
      <div className="flex justify-end"><button className="button-primary" onClick={onSave}>Änderungen speichern</button></div>
      {textGroups.map(g => (
        <section key={g.title} className={card}>
          <h2 className="font-bold text-ui-text mb-4">{g.title}</h2>
          <div className="grid gap-4">
            {g.fields.map(([name, value]) => (
              <div key={name}>
                <label className={label}>{name}</label>
                {value.length > 70
                  ? <textarea rows={3} className={input} defaultValue={value} />
                  : <input className={input} defaultValue={value} />}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

const images = [
  ...departments.filter(d => d.heroImage).map(d => ({ name: `Abteilung ${d.label}`, src: d.heroImage! })),
  ...mainBoard.filter(m => m.image).map(m => ({ name: `Vorstand ${m.name}`, src: m.image! })),
  { name: 'Vereinslogo', src: '/images/logo.png' },
]

function Images({ onSave }: { onSave: () => void }) {
  // Vorschau nur lokal im Browser (data:-URL), es wird nichts hochgeladen.
  const [previews, setPreviews] = useState<Record<string, string>>({})
  const pick = (name: string, file?: File) => {
    if (!file) return
    const r = new FileReader()
    r.onload = () => setPreviews(p => ({ ...p, [name]: String(r.result) }))
    r.readAsDataURL(file)
  }
  return (
    <>
      <div className="flex justify-end mb-4"><button className="button-primary" onClick={onSave}>Änderungen speichern</button></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map(img => (
          <div key={img.name} className={card}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previews[img.name] ?? img.src} alt={img.name} className="w-full h-44 object-cover rounded-xl bg-ui-surface" />
            <p className="mt-3 text-sm font-semibold text-ui-text">{img.name}</p>
            <label className="button-secondary mt-3 w-full cursor-pointer">
              Bild ersetzen
              <input type="file" accept="image/*" className="sr-only" onChange={e => pick(img.name, e.target.files?.[0])} />
            </label>
          </div>
        ))}
      </div>
    </>
  )
}
