import SectionRenderer from '@/components/SectionRenderer'
import { getLandingBlock, getMediaUrl } from '@/lib/db'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'JVL Echo HD3 — Premium Tabletop Arcade Machine',
    description: 'The ultimate tabletop arcade machine for home and business. 40+ years of gaming excellence.',
    robots: { index: false, follow: false },
  }
}

export default async function EchoPage() {
  // Try to load real content from production DB
  const sections = await buildSections()

  return (
    <div>
      {sections.map((section, i) => (
        <SectionRenderer key={i} section={section as any} />
      ))}
    </div>
  )
}

async function buildSections() {
  // ── Hero ──────────────────────────────────────────────────────────────────
  const heroBlock = await getLandingBlock('top_landing_block')
  const heroId = heroBlock?.id ?? 0

  const [desktopVideo, mobileVideo, desktopPoster, mobilePoster] = await Promise.all([
    getMediaUrl('App\\Models\\TopLandingBlock', heroId, 'desktop_video'),
    getMediaUrl('App\\Models\\TopLandingBlock', heroId, 'phone_video'),
    getMediaUrl('App\\Models\\TopLandingBlock', heroId, 'desktop_poster'),
    getMediaUrl('App\\Models\\TopLandingBlock', heroId, 'phone_poster'),
  ])

  // ── Superiority / Countertop Classics ─────────────────────────────────────
  const superBlock = await getLandingBlock('superiority_landing_block')
  const superId = superBlock?.id ?? 0

  const [superImage] = await Promise.all([
    getMediaUrl('App\\Models\\SuperiorityLandingBlock', superId, 'desktop_image'),
  ])

  // ── Premium Purchase / Product showcase ───────────────────────────────────
  const productBlock = await getLandingBlock('premium_purchase_landing_block')
  const productId = productBlock?.id ?? 0

  const [product3dPoster] = await Promise.all([
    getMediaUrl('App\\Models\\PremiumPurchaseLandingBlock', productId, '3d_poster'),
  ])

  // ── Screens / B2B lifestyle ───────────────────────────────────────────────
  const screensBlock = await getLandingBlock('screens_landing_block')
  const screensId = screensBlock?.id ?? 0

  const b2bImage = await getMediaUrl('App\\Models\\ScreensLandingBlock', screensId, 'background_image')

  // ─────────────────────────────────────────────────────────────────────────

  return [
    // 1. Hero
    {
      blockType: 'hero',
      headline: 'JVL ECHO HD3 –\nPREMIUM TABLETOP ARCADE MACHINE\nFOR HOME & BUSINESS',
      cta: { label: 'Explore on Amazon', url: 'https://www.amazon.com/dp/B0C9RQJM7K' },
      desktopVideo: desktopVideo ?? undefined,
      mobileVideo: mobileVideo ?? undefined,
      desktopPoster: desktopPoster ?? undefined,
      mobilePoster: mobilePoster ?? undefined,
    },

    // 2. Countertop Classics — light centered
    {
      blockType: 'media-copy',
      layout: 'centered',
      background: 'light',
      tagLabel: 'Countertop Classics',
      headline: 'THE ULTIMATE HOME ARCADE MACHINE WITH BUILT-IN GAMES',
      desktopImageUrl: superImage ?? undefined,
      body: "ECHO ruled bars across the U.S. in the '90s and early 2000s — now, it's back, reimagined for home.\n\nTransform your living room or basement into your own personal arcade. Plug-and-play fun — no downloads, no Wi-Fi. From poker to puzzles, it's classic charm meets modern simplicity.",
      quote: "It's like owning a piece of arcade history — built for your home.",
    },

    // 3. Product showcase — Home / Amusement tabs
    {
      blockType: 'product-cards',
      background: 'light',
      headline: 'HOME ARCADE MACHINE FOR SALE –\nBACKED BY AMAZON & JVL WARRANTY',
      productImage: product3dPoster ?? undefined,
      items: [
        {
          title: 'Echo Home',
          subtitle: 'Free Play Home version, without Bill Validator and Quarters Acceptor',
          price: '$3,990',
          features: [
            { icon: 'shipping', text: 'FREE Prime Shipping' },
            { icon: 'return',   text: 'FREE 30-day refund/replacement' },
            { icon: 'finance',  text: 'Pay over time for up to 24 months with 0% APR' },
            { icon: 'secure',   text: 'Your transaction is secure' },
          ],
          cta: { label: 'Buy on Amazon', url: 'https://www.amazon.com/dp/B0C9RQJM7K' },
          ctaSecondary: { label: 'Get in touch with us!', url: '/en/contact-us' },
        },
        {
          title: 'Echo Amusement',
          subtitle: 'Bill Validator ($1, $5, $10, $20) and Quarters Acceptor',
          price: '$4,250',
          features: [
            { icon: 'shipping', text: 'FREE Prime Shipping' },
            { icon: 'return',   text: 'FREE 30-day refund/replacement' },
            { icon: 'finance',  text: 'Pay over time for up to 24 months with 0% APR' },
            { icon: 'secure',   text: 'Your transaction is secure' },
          ],
          cta: { label: 'Buy on Amazon', url: 'https://www.amazon.com' },
          ctaSecondary: { label: 'Get in touch with us!', url: '/en/contact-us' },
        },
      ],
    },

    // 4. B2B
    {
      blockType: 'media-copy',
      layout: 'centered',
      background: 'light',
      headline: 'INTERESTED IN BRINGING ECHO TO YOUR BUSINESS?',
      desktopImageUrl: b2bImage ?? undefined,
      body: "ECHO Home and ECHO Amusement are strong revenue-driving additions for resellers, operators, and distributors. Whether you're looking to expand your portfolio or offer something fresh to your customers, we're here to support you.",
      cta: { label: 'Explore ECHO B2B Programs', url: '/en/echo-b2b' },
    },

    // 5. Trust stats — dark
    {
      blockType: 'trust',
      background: 'dark',
      variant: 'stats',
      headline: 'A LIFETIME IN GAMING',
      items: [
        { stat: '40+',   label: 'Years of Experience' },
        { stat: '100K+', label: 'Machines Deployed' },
        { stat: '3',     label: 'Global Markets' },
      ],
    },

    // 6. Feature grid — dark
    {
      blockType: 'feature-grid',
      background: 'dark',
      tagLabel: 'Built Different',
      headline: 'WHY OPERATORS CHOOSE ECHO',
      columns: '3',
      items: [
        { title: 'Premium Games Library', body: 'Poker, puzzle, and arcade — 149 titles and growing.' },
        { title: '24/7 Remote Support',   body: 'Our team monitors and supports your machines around the clock.' },
        { title: 'Revenue Ready',          body: 'Built-in payment and revenue tracking for amusement operators.' },
        { title: 'Built to Last',          body: 'Commercial-grade hardware engineered for continuous use.' },
        { title: 'Global Reach',           body: 'Deployed across North America, Europe, and beyond.' },
        { title: 'Custom Branding',        body: 'White-label options available for enterprise operators.' },
      ],
    },

    // 7. CTA banner
    {
      blockType: 'cta',
      layout: 'banner',
      background: 'brand',
      headline: 'READY TO BRING ECHO TO YOUR VENUE?',
      subheadline: 'Talk to our team and find the right solution for your business.',
      primaryCta:   { label: 'Contact Us',  url: '/en/contact-us' },
      secondaryCta: { label: 'Learn More',  url: '/en/echo-b2b' },
    },
  ]
}
