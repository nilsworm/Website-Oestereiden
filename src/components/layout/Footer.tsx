'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">SuS Oestereiden</h3>
            <p className="text-sm leading-relaxed">
              Spiel- und Sportverein Oestereiden e.V. 1922<br />
              Im Kirchfeld 1<br />
              59602 Rüthen
            </p>
            <p className="text-sm mt-3">
              <a href="tel:+4929549245900" className="hover:text-white transition-colors">
                +49 2954 924590
              </a>
              <br />
              <a href="mailto:info@sus-oestereiden.de" className="hover:text-white transition-colors">
                info@sus-oestereiden.de
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-3">Abteilungen</h3>
            <ul className="space-y-1 text-sm">
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
            <h3 className="text-white font-bold text-lg mb-3">Rechtliches</h3>
            <ul className="space-y-1 text-sm">
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

        <div className="border-t border-zinc-700 mt-8 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} SuS Oestereiden e.V. 1922 · Alle Rechte vorbehalten
        </div>
      </div>
    </footer>
  )
}
