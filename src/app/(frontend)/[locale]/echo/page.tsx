import { getPayload } from 'payload'
import config from '@payload-config'
import SectionRenderer from '@/components/SectionRenderer'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'JVL Echo HD3 — Premium Tabletop Arcade Machine',
    description: 'The ultimate tabletop arcade machine for home and business. 40+ years of gaming excellence.',
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
    // DB not available (e.g. Vercel build) — use fallback
  }

  if (!page) {
    // Return a seeded fallback with real JVL Echo content for the prototype
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

// Helper to proxy images through our Next.js API (avoids CORS/hotlink issues)
function img(url: string) {
  return `/api/img?url=${encodeURIComponent(url)}`
}

// Fallback with real seeded content using production media URLs
function EchoFallback() {
  const sections = [
    {
      blockType: 'hero',
      layout: 'full-video',
      headline: 'A GIFT\nTHAT STAYS',
      subheadline: 'JVL Echo HD3 — Premium Tabletop Arcade Machine for Home & Business',
      cta: { label: 'Explore on Amazon', url: 'https://www.amazon.com', style: 'primary' },
      desktopVideo: 'https://www.jvl.ca/storage/3681/1.mp4',
      mobileVideo: 'https://www.jvl.ca/storage/3683/1.mp4',
      desktopPoster: img('https://www.jvl.ca/image-transform/storage/width=1920,format=webp,quality=80/3680/1.jpg'),
      mobilePoster: img('https://www.jvl.ca/image-transform/storage/width=768,format=webp,quality=80/3682/1.jpg'),
    },
    {
      blockType: 'media-copy',
      mediaPosition: 'right',
      tagLabel: 'Superiority',
      headline: 'ENGINEERED FOR THOSE WHO DEMAND MORE',
      body: null,
      mediaType: 'image',
      // Images loaded from jvl.ca server — replace with local paths once developer exports them
      // desktopImageUrl: img('https://www.jvl.ca/image-transform/storage/width=1280,format=webp,quality=80/3685/1.jpg'),
      background: 'dark',
    },
    {
      blockType: 'product-cards',
      headline: 'CHOOSE YOUR ECHO',
      items: [
        {
          title: 'Echo Home',
          subtitle: 'For the living room',
          // mediaUrl: img('https://www.jvl.ca/image-transform/storage/width=600,format=webp,quality=80/3690/1.jpg'),
          price: '$3,999',
          features: [
            { text: '40+ built-in games' },
            { text: 'HD touchscreen display' },
            { text: 'Multiplayer ready' },
            { text: 'Wi-Fi connected' },
          ],
          cta: { label: 'Buy Now', url: 'https://www.amazon.com' },
        },
        {
          title: 'Echo Amusement',
          subtitle: 'For venues & operators',
          // mediaUrl: img('https://www.jvl.ca/image-transform/storage/width=600,format=webp,quality=80/3691/1.jpg'),
          price: 'Contact for pricing',
          features: [
            { text: 'Commercial grade hardware' },
            { text: 'Revenue tracking built-in' },
            { text: '24/7 support included' },
            { text: 'Custom branding options' },
          ],
          cta: { label: 'Get in Touch', url: '/en/contact-us' },
        },
      ],
    },
    {
      blockType: 'trust',
      headline: 'A LIFETIME IN GAMING',
      variant: 'stats',
      items: [
        { stat: '40+', label: 'Years of Experience' },
        { stat: '100K+', label: 'Machines Deployed' },
        { stat: '3', label: 'Global Markets' },
      ],
    },
    {
      blockType: 'feature-grid',
      tagLabel: 'Built Different',
      headline: 'WHY OPERATORS CHOOSE ECHO',
      columns: '3',
      background: 'dark',
      items: [
        { title: 'Premium Games Library', body: 'Poker, puzzle, and arcade — 40+ titles and growing.' },
        { title: '24/7 Remote Support', body: 'Our team monitors and supports your machines around the clock.' },
        { title: 'Revenue Ready', body: 'Built-in payment and revenue tracking for amusement operators.' },
        { title: 'Built to Last', body: 'Commercial-grade hardware engineered for continuous use.' },
        { title: 'Global Reach', body: 'Deployed across North America, Europe, and beyond.' },
        { title: 'Custom Branding', body: 'White-label options available for enterprise operators.' },
      ],
    },
    {
      blockType: 'cta',
      layout: 'banner',
      headline: 'READY TO BRING ECHO TO YOUR VENUE?',
      subheadline: 'Talk to our team and find the right solution for your business.',
      primaryCta: { label: 'Contact Us', url: '/en/contact-us' },
      secondaryCta: { label: 'Learn More', url: '/en/echo' },
      background: 'brand',
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
