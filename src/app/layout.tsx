import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const GA_ID = 'G-7FWN801MS4'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Tabletop Arcade Machine for Home — JVL Echo HD3',
    template: '%s | JVL',
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
      <body className="bg-jvl-dark text-jvl-light font-poppins antialiased">
        {children}
      </body>
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
    </html>
  )
}
