import type { NextConfig } from 'next'

// ponytail: statische CSP mit 'unsafe-inline'. Der Build enthält 30 Inline-Skripte
// (Next Flight-Payload) und Inline-Styles von framer-motion; der Nonce-Weg verlangt
// dynamisches Rendering über proxy.ts und gäbe das Prerendering dieser Seite auf.
// Upgrade-Pfad: sobald die Seite ohnehin dynamisch rendert, auf Nonces umstellen.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  // Einzige Fremd-Einbettung: OSM-Karte in StandortSection, lädt erst nach Klick.
  'frame-src https://www.openstreetmap.org',
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ')

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  // All images are local, already-sized editorial assets. Serve them directly so
  // production does not depend on the Next image optimization endpoint.
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        // Deckt laut Docs auch /public und /_next/* ab: Header werden vor dem
        // Dateisystem geprüft.
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          // preload bewusst weggelassen — erst nach bestätigtem HTTPS-only
          // auf allen Subdomains ergänzen.
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value:
              'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
          },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        ],
      },
    ]
  },
}

export default nextConfig
