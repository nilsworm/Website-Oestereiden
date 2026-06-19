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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-sm text-gray-700 mb-4">
          Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten.
          Funktionale Cookies sind für den Betrieb der Website notwendig.
        </p>

        {expanded && (
          <div className="mb-4 space-y-2 bg-gray-50 rounded-md p-3">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked disabled readOnly className="accent-sus-green" />
              <span className="font-medium">Funktional</span>
              <span className="text-gray-500 text-xs">(immer aktiv)</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={consent.statistics}
                onChange={e => setConsent(c => ({ ...c, statistics: e.target.checked }))}
                className="accent-sus-green"
              />
              <span className="font-medium">Statistiken</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={consent.marketing}
                onChange={e => setConsent(c => ({ ...c, marketing: e.target.checked }))}
                className="accent-sus-green"
              />
              <span className="font-medium">Marketing</span>
            </label>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => save({ functional: true, statistics: true, marketing: true })}
            className="px-4 py-2 bg-sus-green text-white text-sm font-medium rounded-md hover:bg-sus-green-light transition-colors"
          >
            Alle akzeptieren
          </button>
          <button
            onClick={() => save({ functional: true, statistics: false, marketing: false })}
            className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
          >
            Nur notwendige
          </button>
          {expanded ? (
            <button
              onClick={() => save(consent)}
              className="px-4 py-2 border border-sus-green text-sus-green text-sm font-medium rounded-md hover:bg-sus-green-pale transition-colors"
            >
              Einstellungen speichern
            </button>
          ) : (
            <button
              onClick={() => setExpanded(true)}
              className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
            >
              Einstellungen
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
