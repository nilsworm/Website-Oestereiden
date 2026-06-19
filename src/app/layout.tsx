import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/layout/CookieBanner'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: {
    default: 'SuS Oestereiden e.V. 1922',
    template: '%s | SuS Oestereiden',
  },
  description: 'Spiel- und Sportverein Oestereiden e.V. — gegründet 1922 in Rüthen. Fußball, Volleyball, Tennis und Breitensport.',
  keywords: ['SuS Oestereiden', 'Sportverein', 'Rüthen', 'Fußball', 'Volleyball', 'Tennis', 'Breitensport'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${geist.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="font-sans min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}
