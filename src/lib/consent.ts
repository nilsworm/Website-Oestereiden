'use client'

import { useSyncExternalStore } from 'react'

// ponytail: einzige Einwilligungskategorie ist "Externe Medien" (OpenStreetMap).
// Die Entscheidung liegt in localStorage; das ist als Speicherung der Einwilligung
// selbst technisch erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG) und braucht keine Einwilligung.
// Kommt ein Analysedienst dazu, hier eine Kategorie ergänzen und KEY hochzählen.
const KEY = 'sus-consent-v1'

type Choice = { media: boolean }

const listeners = new Set<() => void>()
let reopened = false

function read(): string {
  try {
    return localStorage.getItem(KEY) ?? ''
  } catch {
    return ''
  }
}

function emit() {
  listeners.forEach(l => l())
}

export function saveConsent(choice: Choice) {
  try {
    localStorage.setItem(KEY, JSON.stringify(choice))
  } catch {
    // Speicher gesperrt: Entscheidung gilt nur bis zum Neuladen.
  }
  reopened = false
  emit()
}

export function reopenConsent() {
  reopened = true
  emit()
}

function parse(raw: string): Choice | null {
  try {
    const v = JSON.parse(raw)
    return typeof v?.media === 'boolean' ? { media: v.media } : null
  } catch {
    return null
  }
}

// Snapshot ist ein String, damit useSyncExternalStore stabile Werte bekommt.
const snapshot = () => `${reopened ? 1 : 0}|${read()}`
const serverSnapshot = () => 'ssr'
const subscribe = (cb: () => void) => {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

export function useConsent() {
  const s = useSyncExternalStore(subscribe, snapshot, serverSnapshot)
  if (s === 'ssr') return { ready: false, choice: null, reopened: false }
  const [r, raw] = [s[0] === '1', s.slice(2)]
  return { ready: true, choice: parse(raw), reopened: r }
}
