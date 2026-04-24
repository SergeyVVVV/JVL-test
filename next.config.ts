import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.jvl.ca',
      },
    ],
  },
  async redirects() {
    return [
      // Non-English locales → /en (site is English-only)
      { source: '/es/:path*',    destination: '/en/:path*', permanent: true },
      { source: '/pt_br/:path*', destination: '/en/:path*', permanent: true },
      // Laravel-style pagination → Next.js query param pagination
      {
        source: '/:locale/blog-and-news/page-:num',
        destination: '/:locale/blog-and-news?page=:num',
        permanent: true,
      },
      {
        source: '/:locale/games/page-:num',
        destination: '/:locale/games?page=:num',
        permanent: true,
      },
      // Partners page hidden — redirect to homepage
      {
        source: '/:locale/partners',
        destination: '/:locale',
        permanent: true,
      },
    ]
  },
}

export default withPayload(nextConfig)
