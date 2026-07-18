import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  // All images are local, already-sized editorial assets. Serve them directly so
  // production does not depend on the Next image optimization endpoint.
  images: {
    unoptimized: true,
  },
}

export default nextConfig
