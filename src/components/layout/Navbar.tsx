'use client'

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
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-white/80 border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">

          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/images/logo.png"
              alt="SuS Oestereiden"
              width={28}
              height={28}
            />
            <span className="text-[#1d1d1f] text-[13px] font-semibold group-hover:text-[#1a35c8] transition-colors duration-150">
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
                      ? 'text-[#1a35c8]'
                      : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link
              href="/mitgliedschaft"
              className="ml-3 px-4 py-1.5 rounded-full bg-[#1a35c8] text-white text-[13px] font-semibold hover:bg-[#1a35c8]/90 transition-colors duration-150"
            >
              Mitglied werden
            </Link>
          </div>

        </div>
      </div>
    </nav>
  )
}
