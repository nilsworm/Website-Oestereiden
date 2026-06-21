'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-sus-navy text-sus-light/70 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="text-sus-light font-bold text-lg mb-1">SuS Oestereiden</p>
            <p className="text-sus-royal text-xs font-semibold uppercase tracking-[0.1em] mb-4">e.V. 1922</p>
            <p className="text-sm leading-relaxed">
              Im Kirchfeld 1<br />
              59602 Rüthen
            </p>
            <p className="text-sm mt-3 space-y-1">
              <a href="tel:+4929549245900" className="block hover:text-sus-light transition-colors">
                +49 2954 924590
              </a>
              <a href="mailto:info@sus-oestereiden.de" className="block hover:text-sus-light transition-colors">
                info@sus-oestereiden.de
              </a>
            </p>
          </div>

          <div>
            <p className="text-sus-light font-bold text-sm uppercase tracking-[0.1em] mb-4">Abteilungen</p>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/fussball', label: 'Fußball' },
                { href: '/volleyball', label: 'Volleyball' },
                { href: '/tennis', label: 'Tennis' },
                { href: '/breitensport', label: 'Breitensport' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-sus-light transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sus-light font-bold text-sm uppercase tracking-[0.1em] mb-4">Rechtliches</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/impressum" className="hover:text-sus-light transition-colors">Impressum</Link>
              </li>
              <li>
                <Link href="/datenschutz" className="hover:text-sus-light transition-colors">Datenschutzerklärung</Link>
              </li>
              <li>
                <button
                  onClick={() => window.dispatchEvent(new Event('open-cookie-banner'))}
                  className="hover:text-sus-light transition-colors text-left"
                >
                  Cookie-Einstellungen
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sus-muted mt-12 pt-6 text-center text-xs text-sus-light/30">
          © {new Date().getFullYear()} SuS Oestereiden e.V. 1922 · Alle Rechte vorbehalten
        </div>
      </div>
    </footer>
  )
}
