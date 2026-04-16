import { getLandingBlock, getLandingInlineEntities, getMediaUrl } from '@/lib/db'
import Link from 'next/link'
import EchoB2bHero from '@/components/EchoB2bHero'
import { VenuesSection, FeaturesSection } from '@/components/EchoB2bSections'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  return {
    title: 'JVL Echo Amusement — Commercial Tabletop Arcade Machine for Business',
    description: 'Free Play and commercial-grade tabletop arcade machine engineered for bars, lounges, and amusement venues. 40+ years of proven performance.',
  }
}

// Icon SVGs for support cards (mapped by inline entity sort order)
const SUPPORT_ICONS = [
  '/api/storage/3500/jvl-prime.svg',
  '/api/storage/3501/discounts.svg',
  '/api/storage/3502/account-manager.svg',
  '/api/storage/3503/replacements.svg',
]

// Strip HTML tags for plain text
function stripHtml(html: string | null): string | null {
  if (!html) return null
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()
}

export default async function EchoB2bPage() {
  const [heroBlock, supBlock, supportBlock, screensBlock, engineeredBlock, bottomBlock] = await Promise.all([
    getLandingBlock('top_echo2b2_block'),
    getLandingBlock('superiority_echo2b2_block'),
    getLandingBlock('support_echo2b2_block'),
    getLandingBlock('screens_echo2b2_block'),
    getLandingBlock('engineered_echo_b2b_block'),
    getLandingBlock('support_bottom_echo_b2b_landing_block'),
  ])

  const [supportItems, venueItems, featureItems, bottomLinks, heroVideoDb, heroPosterDb] = await Promise.all([
    supportBlock ? getLandingInlineEntities(supportBlock.id) : Promise.resolve([]),
    screensBlock ? getLandingInlineEntities(screensBlock.id) : Promise.resolve([]),
    engineeredBlock ? getLandingInlineEntities(engineeredBlock.id) : Promise.resolve([]),
    bottomBlock ? getLandingInlineEntities(bottomBlock.id) : Promise.resolve([]),
    getMediaUrl('App\\Models\\TopEcho2b2Block', 15, 'desktop_video'),
    getMediaUrl('App\\Models\\TopEcho2b2Block', 15, 'desktop_poster'),
  ])

  // Fallback to known production storage IDs when DB media not yet linked
  const heroVideo = heroVideoDb ?? '/api/storage/3657/15.mp4'
  const heroPoster = heroPosterDb ?? '/api/storage/3653/15.jpg'

  // Venue card images
  const VENUE_IMAGE_FALLBACKS = [
    '/api/storage/3558/1920x1080_Lounge.jpg',
    '/api/storage/3560/Bar_scene_4.jpg',
    '/api/storage/3562/1920x1080_Game-Room.jpg',
  ]
  const venueImagesRaw = await Promise.all(
    venueItems.map(v => getMediaUrl('App\\Models\\LandingInlineEntity', v.id, 'image'))
  )
  const venueImages = venueImagesRaw.map((img, i) => img ?? VENUE_IMAGE_FALLBACKS[i] ?? null)

  // Feature images (known production storage by sort order)
  const FEATURE_IMAGES: Record<number, string> = {
    1: '/api/storage/3564/Bills-and-Quarters.jpeg',
    2: '/api/storage/3565/Secure-Bank.jpg',
    3: '/api/storage/3566/Credit-Value.jpg',
    4: '/api/storage/3567/Idle-Ad-Screens.jpg',
    5: '/api/storage/3568/Bad-Words-Filter.jpg',
    6: '/api/storage/3569/How-to-Play-(1).jpg',
  }

  const heroTitle = heroBlock?.title ?? 'JVL ECHO HD3 – FREE PLAY and COMMERCIAL PREMIUM TABLETOP ARCADE MACHINE'
  const heroBtnText = heroBlock?.button_text ?? 'Explore on Amazon'
  const heroBtnUrl = heroBlock?.button_url ?? 'https://www.amazon.com/dp/B0FHWY5P1L'
  const heroSub = supBlock?.title ?? 'A premier arcade solution for home and commercial use — engineered with 40+ years of proven performance and quality.'

  // Build venue items for the tabs component
  const venueData = (venueItems.length > 0 ? venueItems : [
    { id: 808, title: 'Premium Lounges', text: 'Elevate your premium lounge with a high-impact revenue driver.', sort: 1, landing_block_id: 0, type: '', icon_class: null },
    { id: 809, title: 'Bars and Restaurants', text: 'A powerful entertainment upgrade that keeps guests engaged — and spending.', sort: 2, landing_block_id: 0, type: '', icon_class: null },
    { id: 810, title: 'Man Caves and Game Rooms', text: 'A refined showpiece for sophisticated collectors, built to elevate any space.', sort: 3, landing_block_id: 0, type: '', icon_class: null },
  ]).map((item, i) => ({
    title: item.title ?? '',
    text: item.text ?? '',
    image: venueImages[i] ?? null,
  }))

  // Build feature items for the accordion component
  const featureData = (featureItems.length > 0 ? featureItems : [
    { id: 0, title: 'Bill Validator / Coin Acceptor', text: 'Accepts $1, $5, $10, and $20 bills with 500-bill capacity, plus a quarter acceptor and bank.', sort: 1, landing_block_id: 0, type: '', icon_class: null },
    { id: 1, title: 'Secure Quarters and Bills Bank', text: 'Unlocks with a secure physical key. Reinforced, vandal-resistant design protects your revenue.', sort: 2, landing_block_id: 0, type: '', icon_class: null },
    { id: 2, title: 'Credit Value and Free Play', text: 'Flexible credit settings — per game, by category, or one value across all titles. Free Play mode included.', sort: 3, landing_block_id: 0, type: '', icon_class: null },
    { id: 3, title: 'Customizable Idle Ad Screens', text: 'Display animated ads and promotions while idle — created directly on the unit.', sort: 4, landing_block_id: 0, type: '', icon_class: null },
    { id: 4, title: 'Flexible Game Setup and Bad Words Filter', text: 'Enable or disable any title. Built-in filter keeps content family-friendly across all locations.', sort: 5, landing_block_id: 0, type: '', icon_class: null },
    { id: 5, title: '"How to Play" Instructions', text: 'Every game includes built-in instructions for instant onboarding and a smooth first-time experience.', sort: 6, landing_block_id: 0, type: '', icon_class: null },
  ]).map(item => ({
    title: item.title ?? '',
    text: stripHtml(item.text) ?? '',
    image: FEATURE_IMAGES[item.sort] ?? null,
  }))

  return (
    <main id="echo-b2b-page" style={{ background: '#080a0b', color: '#F4F3EC', fontFamily: 'inherit', marginTop: -124 }}>

      {/* ── 1. Hero ── */}
      <EchoB2bHero
        title={heroTitle}
        buttonText={heroBtnText}
        buttonUrl={heroBtnUrl}
        videoSrc={heroVideo}
        posterSrc={heroPoster}
      />

      {/* ── 2. B2B Promise ── */}
      <section style={{ background: '#101213', borderTop: '1px solid #1e2022', padding: '96px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 6vw' }}>
          <div className="eb2b-promise-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px 80px', alignItems: 'start' }}>
            {/* Left: badge + heading, then description + CTA in same row */}
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FB671F', margin: '0 0 14px' }}>
                B2B Partners
              </p>
              <h2 style={{
                fontFamily: 'inherit', fontSize: 'clamp(1.7rem, 2.5vw, 2.8rem)',
                fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.01em',
                textTransform: 'uppercase', color: '#F4F3EC', margin: '0 0 24px',
              }}>
                {supportBlock?.title ?? "JVL's Promise to B2B Partners"}
              </h2>
              <div className="eb2b-promise-desc-row" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                <p style={{ flex: 1, fontSize: 15, color: 'rgba(244,243,236,0.62)', lineHeight: 1.7, margin: 0 }}>
                  {supportBlock?.text ?? 'Consistent support, fast response, and a team you can count on.'}
                </p>
                {supportBlock?.button_url && (
                  <Link
                    href={supportBlock.button_url}
                    className="btn-amazon"
                    style={{ padding: '12px 24px', textTransform: 'uppercase', display: 'inline-flex', whiteSpace: 'nowrap', flexShrink: 0 }}
                  >
                    {supportBlock.button_text ?? 'Reach Out to JVL'}
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 6 }}>
                      <path d="M1.5 6H10.5M6 1.5L10.5 6L6 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                )}
              </div>
            </div>

            {/* Right: 2x2 feature cards */}
            <div className="eb2b-support-cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {(supportItems.length > 0 ? supportItems : [
                { id: 0, landing_block_id: 0, type: '', icon_class: null, sort: 1, title: 'Amazon B2B Prime', text: 'A special offer through Amazon Business Prime — enjoy free shipping, flexible payment terms, and hassle-free ordering.' },
                { id: 1, landing_block_id: 0, type: '', icon_class: null, sort: 2, title: 'Personalized Discounts', text: 'A transparent, volume-based discount structure with customized programs for long-term partners.' },
                { id: 2, landing_block_id: 0, type: '', icon_class: null, sort: 3, title: 'Your Account, Your Manager', text: 'A dedicated account manager as your single point of contact — always reachable and ready to support you.' },
                { id: 3, landing_block_id: 0, type: '', icon_class: null, sort: 4, title: 'Fast Maintenance', text: 'We prioritize uptime with fast support, a clear replacement policy, and parts always in stock.' },
              ]).map((item, i) => (
                <div key={item.id} style={{
                  background: '#181a1b', border: '1px solid #252729', borderRadius: 4,
                  padding: '24px 20px',
                }}>
                  {SUPPORT_ICONS[i] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={SUPPORT_ICONS[i]} alt="" style={{ width: 40, height: 40, marginBottom: 16, objectFit: 'contain' }} />
                  )}
                  <p style={{ fontSize: 16, fontWeight: 700, color: '#F4F3EC', margin: '0 0 10px', lineHeight: 1.3, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: 14, color: 'rgba(244,243,236,0.58)', lineHeight: 1.65, margin: 0 }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Places / Venues (tab-based, matches /echo UseCasesSection) ── */}
      <VenuesSection items={venueData} />

      {/* ── 4. Features (accordion with sticky image, matches /echo SpecsSection) ── */}
      <FeaturesSection
        heading={engineeredBlock?.title ?? 'ECHO Features Built for Business'}
        description={engineeredBlock?.text ?? 'Advanced controls and customizable settings to optimize each ECHO unit for any venue.'}
        buttonText={engineeredBlock?.button_text ?? 'Buy on Amazon'}
        buttonUrl={engineeredBlock?.button_url ?? null}
        items={featureData}
      />

      {/* ── 5. Bottom CTA ── */}
      <section style={{ background: '#080a0b', borderTop: '1px solid #1e2022', padding: '96px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 6vw' }}>
          <div className="eb2b-bottom-grid">
            {/* Left: title + description */}
            <div>
              <h2 style={{
                fontFamily: 'inherit', fontSize: 'clamp(1.9rem, 3vw, 3.2rem)',
                fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.01em',
                textTransform: 'uppercase', color: '#F4F3EC', margin: '0 0 20px',
              }}>
                {bottomBlock?.title ?? 'Bring ECHO to your business'}
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(244,243,236,0.58)', lineHeight: 1.65, margin: 0, maxWidth: 420 }}>
                {bottomBlock?.text ?? 'Join our partner network and introduce ECHO to venues nationwide.'}
              </p>
            </div>

            {/* Right: 3 actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Contact */}
              <div style={{ borderTop: '1px solid #1e2022', paddingTop: 24 }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(244,243,236,0.45)', margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Become a partner
                </p>
                <Link
                  href="/en/contact-us"
                  className="btn-amazon"
                  style={{ padding: '13px 24px', textTransform: 'uppercase' }}
                >
                  Reach Out to JVL
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M1.5 6H10.5M6 1.5L10.5 6L6 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>

              {/* Amazon */}
              <div style={{ borderTop: '1px solid #1e2022', paddingTop: 24 }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(244,243,236,0.45)', margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {bottomLinks.find(l => l.icon_class === 'amazon_link')?.title ?? 'Ready to place an order?'}
                </p>
                <a
                  href={engineeredBlock?.button_url ?? 'https://www.amazon.com/dp/B0FHWY5P1L'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ padding: '13px 24px' }}
                >
                  Buy on Amazon
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>

              {/* Echo details */}
              <div style={{ borderTop: '1px solid #1e2022', paddingTop: 24 }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(244,243,236,0.45)', margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Interested in exploring more details?
                </p>
                <Link
                  href="/en/echo"
                  className="btn-outline"
                  style={{ padding: '13px 24px' }}
                >
                  View ECHO Details Page
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M1.5 6H10.5M6 1.5L10.5 6L6 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>

              {/* Manual */}
              <div style={{ borderTop: '1px solid #1e2022', paddingTop: 24 }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(244,243,236,0.45)', margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  ECHO User Manual
                </p>
                <a
                  href="/api/storage/3491/ECHO_user-manual.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ padding: '13px 24px' }}
                >
                  Download Manual
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1.5V8.5M2.5 6L6 9.5L9.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .eb2b-bottom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        @media (max-width: 767px) {
          .eb2b-promise-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .eb2b-promise-desc-row { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }
          .eb2b-support-cards { grid-template-columns: 1fr !important; }
          .eb2b-bottom-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </main>
  )
}
