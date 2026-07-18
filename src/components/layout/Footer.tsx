'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-ui-navy text-ui-muted mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <Image src="/images/logo.png" alt="SuS Oestereiden" width={28} height={28} />
              <div>
                <p className="text-white font-semibold text-sm leading-tight">SuS Oestereiden</p>
                <p className="text-[#1a35c8] text-[11px] font-semibold uppercase tracking-[0.1em]">e.V. 1922</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Im Kirchfeld 1<br />
              59602 Rüthen
            </p>
            <div className="mt-3 space-y-1 text-sm">
              <a href="tel:+492954924590" className="block hover:text-white transition-colors">
                +49 2954 924590
              </a>
              <a href="mailto:info@sus-oestereiden.de" className="block hover:text-white transition-colors">
                info@sus-oestereiden.de
              </a>
            </div>
          </div>

          <div>
            <p className="text-white font-semibold text-sm mb-4">Abteilungen</p>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/fussball', label: 'Fußball' },
                { href: '/volleyball', label: 'Volleyball' },
                { href: '/tennis', label: 'Tennis' },
                { href: '/breitensport', label: 'Breitensport' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold text-sm mb-4">Rechtliches</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
              </li>
              <li>
                <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutzerklärung</Link>
              </li>
              <li>
                <button
                  onClick={() => window.dispatchEvent(new Event('open-cookie-banner'))}
                  className="hover:text-white transition-colors text-left"
                >
                  Cookie-Einstellungen
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 mt-12 pt-6 text-center text-xs">
          © {new Date().getFullYear()} SuS Oestereiden e.V. 1922 · Alle Rechte vorbehalten
        </div>
      </div>
    </footer>
  )
}
