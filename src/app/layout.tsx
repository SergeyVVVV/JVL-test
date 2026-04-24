import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import JsonLd from '@/components/JsonLd'
import AnalyticsEvents from '@/components/AnalyticsEvents'
import { buildOrganization, buildGraph } from '@/lib/jsonld'

// Analytics IDs — prefer env vars, fall back to Laravel-matching defaults
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? 'GTM-MXFJV2DZ'
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? 'G-7FWN801MS4'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Tabletop Arcade Machine for Home — JVL Echo HD3',
    template: '%s',
  },
  description: 'Discover JVL Echo HD3 – a premium countertop home arcade with 149 built-in games and HD touchscreen in a stylish bartop design.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'Tabletop Arcade Machine for Home — JVL Echo HD3',
    description: 'Discover JVL Echo HD3 – a premium countertop home arcade with 149 built-in games and HD touchscreen in a stylish bartop design.',
    url: 'https://www.jvl.ca/en/echo',
    siteName: 'JVL',
    images: [{ url: 'https://www.jvl.ca/storage/3522/194.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tabletop Arcade Machine for Home — JVL Echo HD3',
    description: 'Discover JVL Echo HD3 – a premium countertop home arcade with 149 built-in games.',
    images: ['https://www.jvl.ca/storage/3522/194.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        {/* Google Tag Manager — loads GA4, Meta Pixel, Twitter, and custom
            triggers from the GTM-MXFJV2DZ container (same as legacy jvl.ca) */}
        <Script id="gtm-init" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}</Script>

        {/* GA4 direct — kept as a safety net in case the GTM container is
            ever unavailable. Mirrors the Laravel setup. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}</Script>
      </head>
      <body className="bg-jvl-dark text-jvl-light font-poppins antialiased">
        {/* GTM noscript fallback for users with JS disabled */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {children}
        <JsonLd data={buildGraph([buildOrganization()])} />
        <AnalyticsEvents />
      </body>
    </html>
  )
}
