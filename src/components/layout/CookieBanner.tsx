'use client'

import { useState, useEffect } from 'react'

type ConsentState = {
  functional: true
  statistics: boolean
  marketing: boolean
}

const STORAGE_KEY = 'sus-cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [consent, setConsent] = useState<ConsentState>({
    functional: true,
    statistics: false,
    marketing: false,
  })

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) setVisible(true)

    const handler = () => setVisible(true)
    window.addEventListener('open-cookie-banner', handler)
    return () => window.removeEventListener('open-cookie-banner', handler)
  }, [])

  const save = (state: ConsentState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    setVisible(false)
    setExpanded(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-6 left-6 z-50 w-full max-w-md">
      <div className="rounded-2xl border border-sus-muted bg-[rgba(10,14,26,0.92)] backdrop-blur-[16px] p-5 shadow-2xl">
        <p className="text-sm text-sus-light/70 leading-relaxed mb-4">
          Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung zu bieten.
          Funktionale Cookies sind für den Betrieb notwendig.
        </p>

        {expanded && (
          <div className="mb-4 space-y-2 bg-sus-muted/20 rounded-lg p-3">
            <label className="flex items-center gap-2 text-sm text-sus-light/60">
              <input type="checkbox" checked disabled readOnly className="accent-sus-royal" />
              <span className="font-medium">Funktional</span>
              <span className="text-xs opacity-60">(immer aktiv)</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-sus-light cursor-pointer">
              <input
                type="checkbox"
                checked={consent.statistics}
                onChange={e => setConsent(c => ({ ...c, statistics: e.target.checked }))}
                className="accent-sus-royal"
              />
              <span className="font-medium">Statistiken</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-sus-light cursor-pointer">
              <input
                type="checkbox"
                checked={consent.marketing}
                onChange={e => setConsent(c => ({ ...c, marketing: e.target.checked }))}
                className="accent-sus-royal"
              />
              <span className="font-medium">Marketing</span>
            </label>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => save({ functional: true, statistics: true, marketing: true })}
            className="px-4 py-2 bg-sus-royal text-white text-sm font-semibold rounded-lg hover:bg-sus-royal/90 transition-colors"
          >
            Alle akzeptieren
          </button>
          <button
            onClick={() => save({ functional: true, statistics: false, marketing: false })}
            className="px-4 py-2 border border-sus-muted text-sus-light/70 text-sm font-medium rounded-lg hover:text-sus-light hover:border-sus-light/40 transition-colors"
          >
            Nur notwendige
          </button>
          {expanded ? (
            <button
              onClick={() => save(consent)}
              className="px-4 py-2 border border-sus-royal text-sus-royal text-sm font-medium rounded-lg hover:bg-sus-royal/10 transition-colors"
            >
              Einstellungen speichern
            </button>
          ) : (
            <button
              onClick={() => setExpanded(true)}
              className="px-4 py-2 border border-sus-muted text-sus-light/70 text-sm font-medium rounded-lg hover:text-sus-light hover:border-sus-light/40 transition-colors"
            >
              Einstellungen
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
