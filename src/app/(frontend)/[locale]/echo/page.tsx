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
  // Load all landing blocks in parallel
  const [heroBlock, superBlock, productBlock, screensBlock] = await Promise.all([
    getLandingBlock('top_landing_block'),
    getLandingBlock('superiority_landing_block'),
    getLandingBlock('premium_purchase_landing_block'),
    getLandingBlock('screens_landing_block'),
  ])

  // Load media for each block
  const [desktopVideo, mobileVideo, desktopPoster, mobilePoster] = heroBlock
    ? await Promise.all([
        getMediaUrl('App\\Models\\TopLandingBlock', heroBlock.id, 'desktop_video'),
        getMediaUrl('App\\Models\\TopLandingBlock', heroBlock.id, 'phone_video'),
        getMediaUrl('App\\Models\\TopLandingBlock', heroBlock.id, 'desktop_poster'),
        getMediaUrl('App\\Models\\TopLandingBlock', heroBlock.id, 'phone_poster'),
      ])
    : [null, null, null, null]

  const superImage = superBlock
    ? await getMediaUrl('App\\Models\\SuperiorityLandingBlock', superBlock.id, 'desktop_image')
    : null

  const product3dPoster = productBlock
    ? await getMediaUrl('App\\Models\\PremiumPurchaseLandingBlock', productBlock.id, '3d_poster')
    : null

  const b2bImage = screensBlock
    ? await getMediaUrl('App\\Models\\ScreensLandingBlock', screensBlock.id, 'background_image')
    : null

  return [
    // 1. Hero
    {
      blockType: 'hero',
      headline: heroBlock?.title ?? 'JVL ECHO HD3 –\nPREMIUM TABLETOP ARCADE MACHINE\nFOR HOME & BUSINESS',
      cta: {
        label: heroBlock?.button_text ?? 'Explore on Amazon',
        url: heroBlock?.button_url ?? 'https://www.amazon.com/dp/B0DJ3BSJ4D',
      },
      desktopVideo: desktopVideo ?? undefined,
      mobileVideo: mobileVideo ?? undefined,
      desktopPoster: desktopPoster ?? undefined,
      mobilePoster: mobilePoster ?? undefined,
    },

    // 2. Countertop Classics
    {
      blockType: 'media-copy',
      layout: 'centered',
      background: 'light',
      tagLabel: superBlock?.tag_label ?? 'Countertop Classics',
      headline: superBlock?.title ?? 'THE ULTIMATE HOME ARCADE MACHINE WITH BUILT-IN GAMES',
      desktopImageUrl: superImage ?? undefined,
      body: "ECHO ruled bars across the U.S. in the '90s and early 2000s — now, it's back, reimagined for home.\n\nTransform your living room or basement into your own personal arcade. Plug-and-play fun — no downloads, no Wi-Fi. From poker to puzzles, it's classic charm meets modern simplicity.",
      quote: "It's like owning a piece of arcade history — built for your home.",
    },

    // 3. Product showcase
    {
      blockType: 'product-cards',
      background: 'light',
      headline: productBlock?.title ?? 'HOME ARCADE MACHINE FOR SALE –\nBACKED BY AMAZON & JVL WARRANTY',
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
          cta: { label: productBlock?.button_text ?? 'Buy on Amazon', url: productBlock?.button_url ?? 'https://www.amazon.com/dp/B0DJ3BSJ4D' },
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
          cta: { label: 'Buy on Amazon', url: 'https://www.amazon.com/dp/B0DJ3BSJ4D' },
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

    // 5. Trust stats
    {
      blockType: 'trust',
      background: 'blue',
      variant: 'stats',
      headline: 'A LIFETIME IN GAMING',
      items: [
        { stat: '40+',   label: 'Years of Experience' },
        { stat: '100K+', label: 'Machines Deployed' },
        { stat: '3',     label: 'Global Markets' },
      ],
    },

    // 6. Feature grid
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
