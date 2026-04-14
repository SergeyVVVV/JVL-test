import { getLandingBlock, getLandingInlineEntities, getMediaUrl } from '@/lib/db'
import Link from 'next/link'
import EchoB2bHero from '@/components/EchoB2bHero'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  return {
    title: 'JVL Echo Amusement — Commercial Tabletop Arcade Machine for Business',
    description: 'Free Play and commercial-grade tabletop arcade machine engineered for bars, lounges, and amusement venues. 40+ years of proven performance.',
  }
}

// Icon SVGs for support cards (mapped by inline entity sort order)
const SUPPORT_ICONS = [
  'https://www.jvl.ca/storage/3500/jvl-prime.svg',
  'https://www.jvl.ca/storage/3501/discounts.svg',
  'https://www.jvl.ca/storage/3502/account-manager.svg',
  'https://www.jvl.ca/storage/3503/replacements.svg',
]

// Venue card accent colors
const VENUE_ACCENTS = ['#059FFF', '#FB671F', '#5B8DEF']

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

  // Venue card images from inline entity media
  const venueImages = await Promise.all(
    venueItems.map(v => getMediaUrl('App\\Models\\LandingInlineEntity', v.id, 'image'))
  )

  const heroTitle = heroBlock?.title ?? 'JVL ECHO HD3 – FREE PLAY and COMMERCIAL PREMIUM TABLETOP ARCADE MACHINE'
  const heroBtnText = heroBlock?.button_text ?? 'Explore on Amazon'
  const heroBtnUrl = heroBlock?.button_url ?? 'https://www.amazon.com/dp/B0FHWY5P1L'
  const heroBadge = supBlock?.tag_label ?? 'Free Play and Commercial Arcade'
  const heroSub = supBlock?.title ?? 'A premier arcade solution for home and commercial use — engineered with 40+ years of proven performance and quality.'

  return (
    <main id="echo-b2b-page" style={{ background: '#080a0b', color: '#F4F3EC', fontFamily: 'inherit' }}>

      {/* ── 1. Hero ── */}
      <EchoB2bHero
        title={heroTitle}
        subtitle={heroSub}
        badge={heroBadge}
        buttonText={heroBtnText}
        buttonUrl={heroBtnUrl}
        videoSrc={heroVideo}
        posterSrc={heroPoster}
      />

      {/* ── 2. B2B Promise ── */}
      <section style={{ background: '#101213', borderTop: '1px solid #1e2022', padding: '96px 0' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 6vw' }}>
          <div className="eb2b-promise-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px 80px', alignItems: 'start' }}>
            {/* Left: badge + heading, then description + CTA in same row */}
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#059FFF', margin: '0 0 14px' }}>
                B2B Partners
              </p>
              <h2 style={{
                fontFamily: 'inherit', fontSize: 'clamp(1.7rem, 2.5vw, 2.8rem)',
                fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.01em',
                textTransform: 'uppercase', color: '#F4F3EC', margin: '0 0 24px',
              }}>
                {supportBlock?.title ?? "JVL's Promise to B2B Partners"}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {(supportItems.length > 0 ? supportItems : [
                { id: 0, landing_block_id: 0, type: '', icon_class: null, sort: 1, title: 'Amazon B2B Prime', text: 'A special offer through Amazon Business Prime - enjoy free shipping, flexible payment terms, and hassle-free ordering.' },
                { id: 1, landing_block_id: 0, type: '', icon_class: null, sort: 2, title: 'Personalized Discounts', text: 'A transparent, volume-based discount structure with customized programs for long-term partners.' },
                { id: 2, landing_block_id: 0, type: '', icon_class: null, sort: 3, title: 'Your Account, Your Manager', text: 'A dedicated account manager as your single point of contact — always reachable and ready to support you.' },
                { id: 3, landing_block_id: 0, type: '', icon_class: null, sort: 4, title: 'Fast Maintenance', text: 'We prioritize uptime with fast support, a clear replacement policy, and parts always in stock.' },
              ]).map((item, i) => (
                <div key={item.id} style={{
                  background: '#181a1b', border: '1px solid #252729', borderRadius: 12,
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

      {/* ── 3. Places / Venues ── */}
      <section style={{ background: '#080a0b', borderTop: '1px solid #1e2022', padding: '96px 0' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 6vw' }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#059FFF', margin: '0 0 14px' }}>
            Venues
          </p>
          <h2 style={{
            fontFamily: 'inherit', fontSize: 'clamp(1.7rem, 2.5vw, 2.8rem)',
            fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.01em',
            textTransform: 'uppercase', color: '#F4F3EC', margin: '0 0 48px',
          }}>
            {screensBlock?.title ?? 'Places'}
          </h2>

          <div className="eb2b-venues-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {(venueItems.length > 0 ? venueItems : [
              { id: 808, title: 'Premium Lounges', text: 'Elevate your premium lounge with a high-impact revenue driver.', sort: 1, landing_block_id: 0, type: '', icon_class: null },
              { id: 809, title: 'Bars and Restaurants', text: 'A powerful entertainment upgrade that keeps guests engaged — and spending.', sort: 2, landing_block_id: 0, type: '', icon_class: null },
              { id: 810, title: 'Man Caves and Game Rooms', text: 'A refined showpiece for sophisticated collectors, built to elevate any space.', sort: 3, landing_block_id: 0, type: '', icon_class: null },
            ]).map((item, i) => {
              const img = venueImages[i] ?? null
              const accent = VENUE_ACCENTS[i % VENUE_ACCENTS.length]
              return (
                <div key={item.id} style={{
                  position: 'relative', borderRadius: 16, overflow: 'hidden',
                  border: '1px solid #252729', minHeight: 320,
                  background: img ? '#080a0b' : `linear-gradient(135deg, #101213 0%, #0d1520 100%)`,
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                }}>
                  {img && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={img} alt={item.title ?? ''} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                  {/* Accent line top */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: accent }} />
                  {/* Gradient overlay */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.1) 60%)' }} />
                  <div style={{ position: 'relative', padding: '28px 24px' }}>
                    <p style={{ fontSize: 18, fontWeight: 700, color: '#F4F3EC', margin: '0 0 10px', lineHeight: 1.2, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                      {item.title}
                    </p>
                    <p style={{ fontSize: 14, color: 'rgba(244,243,236,0.65)', lineHeight: 1.65, margin: 0 }}>
                      {item.text}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 4. Features Built for Business ── */}
      <section style={{ background: '#101213', borderTop: '1px solid #1e2022', padding: '96px 0' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 6vw' }}>
          {/* Header row: title left | description + button right (same row) */}
          <div className="eb2b-features-header" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px 80px', alignItems: 'center', marginBottom: 56 }}>
            <h2 style={{
              fontFamily: 'inherit', fontSize: 'clamp(1.7rem, 2.5vw, 2.8rem)',
              fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.01em',
              textTransform: 'uppercase', color: '#F4F3EC', margin: 0,
            }}>
              {engineeredBlock?.title ?? 'ECHO Features Built for Business'}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
              <p style={{ flex: 1, fontSize: 15, color: 'rgba(244,243,236,0.62)', lineHeight: 1.7, margin: 0 }}>
                {engineeredBlock?.text ?? 'Advanced controls and customizable settings to optimize each ECHO unit for any venue.'}
              </p>
              {engineeredBlock?.button_url && (
                <a
                  href={engineeredBlock.button_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-amazon"
                  style={{ padding: '12px 24px', textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0 }}
                >
                  {engineeredBlock.button_text ?? 'Buy on Amazon'}
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* 6 features grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, border: '1px solid #252729', borderRadius: 16, overflow: 'hidden' }}>
            {(featureItems.length > 0 ? featureItems : [
              { id: 0, title: 'Bill Validator / Coin Acceptor', text: 'Accepts $1, $5, $10, and $20 bills with 500-bill capacity, plus a quarter acceptor and bank.', sort: 1, landing_block_id: 0, type: '', icon_class: null },
              { id: 1, title: 'Secure Quarters and Bills Bank', text: 'Unlocks with a secure physical key. Reinforced, vandal-resistant design protects your revenue.', sort: 2, landing_block_id: 0, type: '', icon_class: null },
              { id: 2, title: 'Credit Value and Free Play', text: 'Flexible credit settings — per game, by category, or one value across all titles. Free Play mode included.', sort: 3, landing_block_id: 0, type: '', icon_class: null },
              { id: 3, title: 'Customizable Idle Ad Screens', text: 'Display animated ads and promotions while idle — created directly on the unit.', sort: 4, landing_block_id: 0, type: '', icon_class: null },
              { id: 4, title: 'Flexible Game Setup and Bad Words Filter', text: 'Enable or disable any title. Built-in filter keeps content family-friendly across all locations.', sort: 5, landing_block_id: 0, type: '', icon_class: null },
              { id: 5, title: '"How to Play" Instructions', text: 'Every game includes built-in instructions for instant onboarding and a smooth first-time experience.', sort: 6, landing_block_id: 0, type: '', icon_class: null },
            ]).map((item, i) => (
              <div key={item.id} style={{
                background: '#181a1b',
                borderRight: (i + 1) % 3 !== 0 ? '1px solid #252729' : 'none',
                borderBottom: i < 3 ? '1px solid #252729' : 'none',
                padding: '32px 28px',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: 'rgba(5,159,255,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 16,
                }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#059FFF' }}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p style={{ fontSize: 16, fontWeight: 700, color: '#F4F3EC', margin: '0 0 12px', lineHeight: 1.3, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                  {item.title}
                </p>
                <p style={{ fontSize: 14, color: 'rgba(244,243,236,0.58)', lineHeight: 1.65, margin: 0 }}>
                  {stripHtml(item.text)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Bottom CTA ── */}
      <section style={{ background: '#080a0b', borderTop: '1px solid #1e2022', padding: '96px 0' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 6vw', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'inherit', fontSize: 'clamp(1.9rem, 3vw, 3.2rem)',
            fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.01em',
            textTransform: 'uppercase', color: '#F4F3EC', margin: '0 0 16px',
          }}>
            {bottomBlock?.title ?? 'Bring ECHO to your business'}
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(244,243,236,0.58)', lineHeight: 1.65, margin: '0 auto 48px', maxWidth: 520 }}>
            {bottomBlock?.text ?? 'Join our partner network and introduce ECHO to venues nationwide.'}
          </p>

          <div className="eb2b-bottom-links" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'stretch' }}>
            {/* Contact link */}
            <Link
              href="/en/contact-us"
              className="btn-amazon"
              style={{ padding: '14px 28px', textTransform: 'uppercase' }}
            >
              Reach Out to JVL
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 4 }}>
                <path d="M1.5 6H10.5M6 1.5L10.5 6L6 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            {/* Amazon link */}
            {bottomLinks.find(l => l.icon_class === 'amazon_link') && (
              <a
                href={engineeredBlock?.button_url ?? 'https://www.amazon.com/dp/B0FHWY5P1L'}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '14px 28px',
                  border: '1px solid rgba(255,255,255,0.22)',
                  borderRadius: 4,
                  color: '#F4F3EC', textDecoration: 'none',
                  fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                  transition: 'border-color 0.2s',
                }}
              >
                {bottomLinks.find(l => l.icon_class === 'amazon_link')?.title ?? 'Ready to place an order?'}
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            )}

            {/* Echo details link */}
            {bottomLinks.find(l => l.icon_class === 'product_page_link') && (
              <Link
                href="/en/echo"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '14px 28px',
                  border: '1px solid rgba(255,255,255,0.22)',
                  borderRadius: 4,
                  color: '#F4F3EC', textDecoration: 'none',
                  fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                }}
              >
                {bottomLinks.find(l => l.icon_class === 'product_page_link')?.title ?? 'Interested in exploring more details?'}
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                  <path d="M1.5 6H10.5M6 1.5L10.5 6L6 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 767px) {
          .eb2b-promise-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .eb2b-venues-grid { grid-template-columns: 1fr !important; }
          .eb2b-features-header { grid-template-columns: 1fr !important; }
          #echo-b2b-page section > div > div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
          .eb2b-bottom-links { flex-direction: column !important; align-items: stretch !important; }
          .eb2b-bottom-links a, .eb2b-bottom-links > * { text-align: center !important; justify-content: center !important; }
        }
      `}</style>
    </main>
  )
}
