import { getPayload } from 'payload'
import config from '@payload-config'
import SectionRenderer from '@/components/SectionRenderer'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'JVL Echo HD3 — Premium Tabletop Arcade Machine',
    description: 'The ultimate tabletop arcade machine for home and business. 40+ years of gaming excellence.',
    robots: { index: false, follow: false },
  }
}

export default async function EchoPage() {
  let page: any = null

  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'echo' } },
      limit: 1,
    })
    page = docs[0]
  } catch {
    // DB not available — use fallback
  }

  if (!page) {
    return <EchoFallback />
  }

  return (
    <div>
      {page.sections?.map((section: any, i: number) => (
        <SectionRenderer key={i} section={section} />
      ))}
    </div>
  )
}

function img(url: string) {
  return `/api/img?url=${encodeURIComponent(url)}`
}

function EchoFallback() {
  const sections = [
    // ── 1. Hero ────────────────────────────────────────────────────────────────
    {
      blockType: 'hero',
      headline: 'JVL ECHO HD3 –\nPREMIUM TABLETOP ARCADE MACHINE\nFOR HOME & BUSINESS',
      cta: { label: 'Explore on Amazon', url: 'https://www.amazon.com/dp/B0C9RQJM7K' },
      desktopVideo: 'https://www.jvl.ca/storage/3681/1.mp4',
      mobileVideo: 'https://www.jvl.ca/storage/3683/1.mp4',
      desktopPoster: img('https://www.jvl.ca/image-transform/storage/width=1920,format=webp,quality=80/3680/1.jpg'),
      mobilePoster: img('https://www.jvl.ca/image-transform/storage/width=768,format=webp,quality=80/3682/1.jpg'),
    },

    // ── 2. Intro — "Countertop Classics" (light, centered) ────────────────────
    {
      blockType: 'media-copy',
      layout: 'centered',
      background: 'light',
      tagLabel: 'Countertop Classics',
      headline: 'THE ULTIMATE HOME ARCADE MACHINE WITH BUILT-IN GAMES',
      desktopImageUrl: img('https://www.jvl.ca/image-transform/storage/width=1280,format=webp,quality=80/3686/1.jpg'),
      body: 'ECHO ruled bars across the U.S. in the \'90s and early 2000s — now, it\'s back, reimagined for home.\n\nTransform your living room or basement into your own personal arcade. Plug-and-play fun — no downloads, no Wi-Fi. From poker to puzzles, it\'s classic charm meets modern simplicity.',
      quote: 'It\'s like owning a piece of arcade history — built for your home.',
    },

    // ── 3. Product showcase ────────────────────────────────────────────────────
    {
      blockType: 'product-cards',
      background: 'light',
      headline: 'HOME ARCADE MACHINE FOR SALE –\nBACKED BY AMAZON & JVL WARRANTY',
      items: [
        {
          title: 'Echo Home',
          subtitle: 'Free Play Home version, without Bill Validator and Quarters Acceptor',
          price: '$3,990',
          features: [
            { icon: 'shipping', text: 'FREE Prime Shipping' },
            { icon: 'return', text: 'FREE 30-day refund/replacement' },
            { icon: 'finance', text: 'Pay over time for up to 24 months with 0% APR' },
            { icon: 'secure', text: 'Your transaction is secure' },
          ],
          cta: { label: 'Buy on Amazon', url: 'https://www.amazon.com/dp/B0C9RQJM7K' },
          ctaSecondary: { label: 'Get in touch with us!', url: '/en/contact-us' },
        },
        {
          title: 'Echo Amusement',
          subtitle: 'Bill Validator (1$, 5$, 10$, 20$) and Quarters Acceptor',
          price: '$4,250',
          features: [
            { icon: 'shipping', text: 'FREE Prime Shipping' },
            { icon: 'return', text: 'FREE 30-day refund/replacement' },
            { icon: 'finance', text: 'Pay over time for up to 24 months with 0% APR' },
            { icon: 'secure', text: 'Your transaction is secure' },
          ],
          cta: { label: 'Buy on Amazon', url: 'https://www.amazon.com' },
          ctaSecondary: { label: 'Get in touch with us!', url: '/en/contact-us' },
        },
      ],
    },

    // ── 4. B2B CTA ─────────────────────────────────────────────────────────────
    {
      blockType: 'media-copy',
      layout: 'centered',
      background: 'light',
      headline: 'INTERESTED IN BRINGING ECHO TO YOUR BUSINESS?',
      desktopImageUrl: img('https://www.jvl.ca/image-transform/storage/width=1280,format=webp,quality=80/3688/1.jpg'),
      body: 'ECHO Home and ECHO Amusement are strong revenue-driving additions for resellers, operators, and distributors. Whether you\'re looking to expand your portfolio or offer something fresh to your customers, we\'re here to support you.',
      cta: { label: 'Explore ECHO B2B Programs', url: '/en/echo-b2b' },
    },

    // ── 5. Trust stats ─────────────────────────────────────────────────────────
    {
      blockType: 'trust',
      background: 'dark',
      variant: 'stats',
      headline: 'A LIFETIME IN GAMING',
      items: [
        { stat: '40+', label: 'Years of Experience' },
        { stat: '100K+', label: 'Machines Deployed' },
        { stat: '3', label: 'Global Markets' },
      ],
    },

    // ── 6. Feature grid ────────────────────────────────────────────────────────
    {
      blockType: 'feature-grid',
      background: 'dark',
      tagLabel: 'Built Different',
      headline: 'WHY OPERATORS CHOOSE ECHO',
      columns: '3',
      items: [
        { title: 'Premium Games Library', body: 'Poker, puzzle, and arcade — 149 titles and growing.' },
        { title: '24/7 Remote Support', body: 'Our team monitors and supports your machines around the clock.' },
        { title: 'Revenue Ready', body: 'Built-in payment and revenue tracking for amusement operators.' },
        { title: 'Built to Last', body: 'Commercial-grade hardware engineered for continuous use.' },
        { title: 'Global Reach', body: 'Deployed across North America, Europe, and beyond.' },
        { title: 'Custom Branding', body: 'White-label options available for enterprise operators.' },
      ],
    },

    // ── 7. CTA banner ──────────────────────────────────────────────────────────
    {
      blockType: 'cta',
      layout: 'banner',
      background: 'brand',
      headline: 'READY TO BRING ECHO TO YOUR VENUE?',
      subheadline: 'Talk to our team and find the right solution for your business.',
      primaryCta: { label: 'Contact Us', url: '/en/contact-us' },
      secondaryCta: { label: 'Learn More', url: '/en/echo-b2b' },
    },
  ]

  return (
    <div>
      {sections.map((section, i) => (
        <SectionRenderer key={i} section={section as any} />
      ))}
    </div>
  )
}
