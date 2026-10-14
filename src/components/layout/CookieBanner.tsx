'use client'

import Link from 'next/link'
import { useState } from 'react'
import { saveConsent, useConsent } from '@/lib/consent'

export default function CookieBanner() {
  const { ready, choice, reopened } = useConsent()
  const [details, setDetails] = useState(false)
  const [picked, setPicked] = useState<boolean | null>(null)

  if (!ready || (choice && !reopened)) return null

  const media = picked ?? choice?.media ?? false
  const showDetails = details || reopened

  return (
    <div
      role="dialog"
      aria-label="Datenschutz-Einstellungen"
      className="fixed z-[60] inset-x-3 bottom-24 md:bottom-6 md:left-auto md:right-6 md:w-[26rem] rounded-2xl border divider bg-ui-raised p-5 shadow-2xl"
    >
      <p className="font-semibold text-ui-text mb-2">Datenschutz-Einstellungen</p>
      <p className="text-sm text-ui-muted leading-relaxed">
        Diese Website setzt keine Cookies und keine Tracking- oder Analysedienste ein. Optional
        können Sie die Karte von OpenStreetMap freigeben; dabei wird Ihre IP-Adresse an den
        Anbieter übertragen. Mehr dazu in der{' '}
        <Link href="/datenschutz" className="underline hover:text-ui-text">
          Datenschutzerklärung
        </Link>
        .
      </p>

      {showDetails && (
        <div className="mt-4 space-y-3 text-sm">
          <label className="flex items-start gap-3 opacity-70">
            <input type="checkbox" checked disabled className="mt-1 h-4 w-4" />
            <span>
              <span className="font-medium text-ui-text">Notwendig</span>
              <span className="block text-ui-muted">
                Speichert Ihre Auswahl hier im Browser. Immer aktiv.
              </span>
            </span>
          </label>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={media}
              onChange={e => setPicked(e.target.checked)}
              className="mt-1 h-4 w-4 accent-[rgb(var(--ui-accent))]"
            />
            <span>
              <span className="font-medium text-ui-text">Externe Medien</span>
              <span className="block text-ui-muted">
                Karte von OpenStreetMap (OpenStreetMap Foundation, UK).
              </span>
            </span>
          </label>
        </div>
      )}

      {/* Beide Hauptbuttons gleich gestaltet: Ablehnen muss so leicht sein wie Zustimmen. */}
      <div className="mt-5 flex flex-wrap gap-2">
        <button className="button-secondary flex-1" onClick={() => saveConsent({ media: false })}>
          Nur notwendige
        </button>
        <button className="button-secondary flex-1" onClick={() => saveConsent({ media: true })}>
          Alle akzeptieren
        </button>
      </div>
      <div className="mt-3 text-center">
        {showDetails ? (
          <button
            className="text-sm underline text-ui-muted hover:text-ui-text"
            onClick={() => saveConsent({ media })}
          >
            Auswahl speichern
          </button>
        ) : (
          <button
            className="text-sm underline text-ui-muted hover:text-ui-text"
            onClick={() => setDetails(true)}
          >
            Einstellungen
          </button>
        )}
      </div>
    </div>
  )
}
