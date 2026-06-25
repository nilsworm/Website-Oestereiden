'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/fussball', label: 'Fußball' },
  { href: '/volleyball', label: 'Volleyball' },
  { href: '/tennis', label: 'Tennis' },
  { href: '/breitensport', label: 'Breitensport' },
  { href: '/hallenbelegung', label: 'Hallenbelegung' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-2xl bg-sus-navy/[0.72] border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">

            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/images/logo.png"
                alt="SuS Oestereiden"
                width={28}
                height={28}
              />
              <span className="text-sus-light text-[13px] font-medium group-hover:text-sus-royal transition-colors duration-150">
                SuS Oestereiden
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map(link => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 text-[13px] font-medium transition-colors duration-150 ${
                      isActive
                        ? 'text-sus-royal'
                        : 'text-sus-light/55 hover:text-sus-light'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <Link
                href="/mitgliedschaft"
                className="ml-3 px-3 py-1 rounded-full border border-sus-royal/40 text-sus-royal text-[13px] font-medium hover:border-sus-royal hover:bg-sus-royal/10 transition-all duration-150"
              >
                Mitglied werden
              </Link>
            </div>

            <button
              className="md:hidden text-sus-light/60 p-2 hover:text-sus-light transition-colors"
              onClick={() => setMenuOpen(true)}
              aria-label="Menü öffnen"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 backdrop-blur-2xl bg-sus-navy/[0.96] z-50 flex flex-col md:hidden">
          <div className="flex items-center justify-between px-4 h-12 border-b border-white/[0.07]">
            <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
              <Image src="/images/logo.png" alt="SuS Oestereiden" width={26} height={26} />
              <span className="text-sus-light text-[13px] font-medium">SuS Oestereiden</span>
            </Link>
            <button
              className="text-sus-light/60 hover:text-sus-light transition-colors p-1"
              onClick={() => setMenuOpen(false)}
              aria-label="Menü schließen"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col px-6 py-4 flex-1 overflow-auto">
            {navLinks.map(link => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between py-4 border-b border-white/[0.07] text-[15px] font-medium transition-colors ${
                    isActive ? 'text-sus-royal' : 'text-sus-light/80 hover:text-sus-light'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-sus-royal" />}
                </Link>
              )
            })}
          </div>

          <div className="px-6 pb-10 pt-4">
            <Link
              href="/mitgliedschaft"
              className="block w-full py-3 text-center rounded-full border border-sus-royal/50 text-sus-royal text-[13px] font-medium hover:bg-sus-royal/10 transition-all duration-150"
              onClick={() => setMenuOpen(false)}
            >
              Mitglied werden
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
