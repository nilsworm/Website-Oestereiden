'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '/fussball', label: 'Fußball' },
  { href: '/volleyball', label: 'Volleyball' },
  { href: '/tennis', label: 'Tennis' },
  { href: '/breitensport', label: 'Breitensport' },
  { href: '/hallenbelegung', label: 'Hallenbelegung' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-[16px] bg-[rgba(10,14,26,0.85)] border-b border-sus-muted shadow-lg'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="text-sus-light font-bold text-lg tracking-tight hover:opacity-80 transition-opacity"
            >
              SuS Oestereiden <span className="font-normal opacity-60">1922</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-2 text-sm font-medium text-sus-light/80 hover:text-sus-light transition-colors group"
                >
                  {link.label}
                  <span className="absolute bottom-1 left-3 right-3 h-px bg-sus-royal scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </Link>
              ))}
              <Link
                href="/mitgliedschaft"
                className="ml-3 px-4 py-2 bg-sus-royal text-white text-sm font-semibold rounded-md hover:bg-sus-royal/90 transition-colors"
              >
                Mitglied werden
              </Link>
            </div>

            <button
              className="md:hidden text-sus-light p-2 hover:bg-white/10 rounded-md transition-colors"
              onClick={() => setMenuOpen(true)}
              aria-label="Menü öffnen"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 bg-sus-navy z-50 flex flex-col items-center justify-center gap-8 md:hidden">
          <button
            className="absolute top-4 right-4 text-sus-light p-2 hover:bg-white/10 rounded-md"
            onClick={() => setMenuOpen(false)}
            aria-label="Menü schließen"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {[...navLinks, { href: '/mitgliedschaft', label: 'Mitglied werden' }].map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sus-light text-3xl font-bold hover:text-sus-royal transition-colors"
              style={{ transitionDelay: `${i * 40}ms` }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
