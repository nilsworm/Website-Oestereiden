'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'

type ConsentState = {
  functional: true
  statistics: boolean
  marketing: boolean
}

const STORAGE_KEY = 'sus-cookie-consent'
const subscribeToConsent = () => () => {}
const hasStoredConsent = () => Boolean(window.localStorage.getItem(STORAGE_KEY))
const hasNoStoredConsentOnServer = () => false

export default function CookieBanner() {
  const hasConsent = useSyncExternalStore(subscribeToConsent, hasStoredConsent, hasNoStoredConsentOnServer)
  const [forceVisible, setForceVisible] = useState(false)
  const [hasSavedInSession, setHasSavedInSession] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [consent, setConsent] = useState<ConsentState>({
    functional: true,
    statistics: false,
    marketing: false,
  })

  useEffect(() => {
    const handler = () => setForceVisible(true)
    window.addEventListener('open-cookie-banner', handler)
    return () => {
      window.removeEventListener('open-cookie-banner', handler)
    }
  }, [])

  const save = (state: ConsentState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    setHasSavedInSession(true)
    setForceVisible(false)
    setExpanded(false)
  }

  if ((hasConsent || hasSavedInSession) && !forceVisible) return null

  return (
    <div className="fixed bottom-6 left-6 z-50 w-full max-w-md">
      <div className="rounded-2xl border divider bg-ui-raised/95 backdrop-blur-[16px] p-5 shadow-lg">
        <p className="text-sm text-ui-muted leading-relaxed mb-4">
          Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung zu bieten.
          Funktionale Cookies sind für den Betrieb notwendig.
        </p>

        {expanded && (
          <div className="mb-4 space-y-2 bg-ui-surface rounded-lg p-3">
            <label className="flex items-center gap-2 text-sm text-ui-muted">
              <input type="checkbox" checked disabled readOnly className="accent-sus-royal" />
              <span className="font-medium">Funktional</span>
              <span className="text-xs opacity-60">(immer aktiv)</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-ui-text cursor-pointer">
              <input
                type="checkbox"
                checked={consent.statistics}
                onChange={e => setConsent(c => ({ ...c, statistics: e.target.checked }))}
                className="accent-sus-royal"
              />
              <span className="font-medium">Statistiken</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-ui-text cursor-pointer">
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
            className="px-4 py-2 bg-ui-accent text-white text-sm font-semibold rounded-lg hover:bg-ui-accent-strong transition-colors"
          >
            Alle akzeptieren
          </button>
          <button
            onClick={() => save({ functional: true, statistics: false, marketing: false })}
            className="px-4 py-2 border divider text-ui-muted text-sm font-medium rounded-lg hover:text-ui-text transition-colors"
          >
            Nur notwendige
          </button>
          {expanded ? (
            <button
              onClick={() => save(consent)}
              className="px-4 py-2 border border-ui-accent text-ui-accent text-sm font-medium rounded-lg hover:bg-ui-accent/10 transition-colors"
            >
              Einstellungen speichern
            </button>
          ) : (
            <button
              onClick={() => setExpanded(true)}
              className="px-4 py-2 border divider text-ui-muted text-sm font-medium rounded-lg hover:text-ui-text transition-colors"
            >
              Einstellungen
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
