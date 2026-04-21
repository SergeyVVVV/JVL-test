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
    ]
  },
}

export default withPayload(nextConfig)
