import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          // Exclude /echo-N landing variants (echo-1, echo-2, etc.)
          // echo-b2b is intentionally NOT excluded
          '/en/echo-1',
          '/en/echo-2',
          '/en/echo-3',
          '/en/echo-4',
          '/en/echo-5',
          '/es/echo-1',
          '/es/echo-2',
          '/pt_br/echo-1',
          '/pt_br/echo-2',
        ],
      },
    ],
    sitemap: 'https://www.jvl.ca/sitemap.xml',
  }
}
