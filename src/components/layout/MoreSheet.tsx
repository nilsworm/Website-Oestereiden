'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'

const moreLinks = [
  { href: '/volleyball', label: 'Volleyball' },
  { href: '/tennis', label: 'Tennis' },
  { href: '/breitensport', label: 'Breitensport' },
  { href: '/mitgliedschaft', label: 'Mitglied werden' },
]

interface MoreSheetProps {
  open: boolean
  onClose: () => void
}

export default function MoreSheet({ open, onClose }: MoreSheetProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl rounded-t-3xl md:hidden"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 4.5rem)' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          >
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
              <p className="font-semibold text-[#1d1d1f] text-[15px]">Mehr</p>
              <button onClick={onClose} className="p-1 text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="px-6 py-2">
              {moreLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`flex items-center justify-between py-4 border-b border-gray-100 last:border-0 text-[15px] font-medium transition-colors ${
                    pathname === link.href || pathname.startsWith(link.href + '/')
                      ? 'text-[#1a35c8]'
                      : 'text-[#1d1d1f]'
                  }`}
                >
                  {link.label}
                  <span className="text-[#6e6e73] text-lg leading-none">›</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
