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
            {/* ponytail: inline SVGs — lucide-react v1 hat keine Brand-Icons mehr */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.instagram.com/sus_oestereiden_fussball/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SuS Oestereiden bei Instagram"
                className="hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07Zm0 5.68a4.16 4.16 0 1 0 0 8.32 4.16 4.16 0 0 0 0-8.32Zm0 6.86a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Zm5.3-7.02a.97.97 0 1 1-1.95 0 .97.97 0 0 1 1.95 0Z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/susoestereiden/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SuS Oestereiden bei Facebook"
                className="hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.5-3.9 3.77-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
                </svg>
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
