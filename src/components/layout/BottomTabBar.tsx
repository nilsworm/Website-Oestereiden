'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Target, Calendar, UserPlus, Grid2x2 } from 'lucide-react'
import MoreSheet from './MoreSheet'

const mainTabs = [
  { href: '/', label: 'Start', icon: Home },
  { href: '/fussball', label: 'Fußball', icon: Target },
  { href: '/hallenbelegung', label: 'Halle', icon: Calendar },
  { href: '/mitgliedschaft', label: 'Mitglied', icon: UserPlus },
]

const moreHrefs = ['/volleyball', '/tennis', '/breitensport']

export default function BottomTabBar() {
  const [sheetOpen, setSheetOpen] = useState(false)
  const pathname = usePathname()

  const isMoreActive = moreHrefs.some(h => pathname === h || pathname.startsWith(h + '/'))

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-ui-canvas/85 backdrop-blur-xl border-t divider"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-stretch">
          {mainTabs.map(tab => {
            const isActive =
              tab.href === '/'
                ? pathname === '/'
                : pathname === tab.href || pathname.startsWith(tab.href + '/')
            const Icon = tab.icon
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 min-h-[52px]"
              >
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2 : 1.5}
                  className={isActive ? 'text-ui-accent' : 'text-ui-muted'}
                />
                <span className={`text-[10px] font-medium leading-none ${isActive ? 'text-ui-accent' : 'text-ui-muted'}`}>
                  {tab.label}
                </span>
              </Link>
            )
          })}

          <button
            onClick={() => setSheetOpen(true)}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 min-h-[52px]"
          >
            <Grid2x2
              size={22}
              strokeWidth={isMoreActive || sheetOpen ? 2 : 1.5}
              className={isMoreActive || sheetOpen ? 'text-ui-accent' : 'text-ui-muted'}
            />
            <span className={`text-[10px] font-medium leading-none ${isMoreActive || sheetOpen ? 'text-ui-accent' : 'text-ui-muted'}`}>
              Mehr
            </span>
          </button>
        </div>
      </nav>

      <MoreSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </>
  )
}
