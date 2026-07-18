import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/layout/CookieBanner'
import BottomTabBar from '@/components/layout/BottomTabBar'
import './globals.css'

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
    <html lang="de" className="h-full">
      <body className="font-sans min-h-screen flex flex-col bg-ui-canvas">
        <Navbar />
        <main className="flex-1 pt-14 pb-20 md:pb-0">
          {children}
        </main>
        <Footer />
        <BottomTabBar />
        <CookieBanner />
      </body>
    </html>
  )
}
