'use client'

import React, { Component, useEffect, useRef, useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface PageData {
  hero: {
    title: string
    buttonText: string
    buttonUrl: string
    desktopVideo: string | null
    desktopPoster: string | null
    mobileVideo: string | null
    mobilePoster: string | null
  }
  countertop: { tagLabel: string; title: string; image: string | null }
  product: { title: string; image: string | null; buttonText: string; buttonUrl: string }
}

const AMAZON_URL = 'https://www.amazon.com/JVL-Echo-Touchscreen-Arcade-Machine/dp/B0DJ3BSJ4D?maas=maas_adg_3E0066E64D67202DECABE629027A7FD0_afap_abs&ref_=aa_maas&tag=maas'

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero({ data }: { data: PageData['hero'] }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  return (
    <section className="echo-hero" style={{ position: 'relative', width: '100%', background: '#080a0b', overflow: 'hidden' }}>
      {/* Poster */}
      {data.desktopPoster && (
        <img src={data.desktopPoster} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      )}

      {/* Video */}
      {data.desktopVideo && (
        <video
          ref={videoRef}
          src={data.desktopVideo}
          poster={data.desktopPoster ?? undefined}
          autoPlay muted loop playsInline
          className="echo-hero-video"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}

      {/* Gradient overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.0) 60%)' }} />

      {/* Headline */}
      <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, padding: '0 5vw' }}>
        <h1 className="echo-hero-h1" style={{
          fontFamily: 'inherit',
          fontSize: 'clamp(2rem, 3.5vw, 3.8rem)',
          fontWeight: 600,
          lineHeight: 1.1,
          letterSpacing: '-0.01em',
          textTransform: 'uppercase',
          color: '#fff',
          margin: 0,
        }}>
          {data.title}
        </h1>
      </div>

      {/* Bottom bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.15)' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 5vw', maxWidth: 1440, margin: '0 auto', width: '100%' }}>
          {/* Controls */}
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <button
              onClick={() => { if (videoRef.current) { playing ? videoRef.current.pause() : videoRef.current.play(); setPlaying(!playing) } }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', padding: 0, display: 'flex' }}
            >
              {playing
                ? <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                : <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              }
            </button>
            <button
              onClick={() => { if (videoRef.current) { videoRef.current.muted = !muted; setMuted(!muted) } }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', padding: 0, display: 'flex' }}
            >
              {muted
                ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
              }
            </button>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <a
              href="/en/contact-us"
              className="btn-amazon"
              style={{ padding: '14px 28px', textTransform: 'uppercase' }}
            >
              Buy Directly from JVL
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a
              href={data.buttonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ padding: '14px 28px' }}
            >
              {data.buttonText}
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Badge ────────────────────────────────────────────────────────────────────

function Badge({ label }: { label: string }) {
  return (
    <p style={{
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: '#FB671F',
      margin: '0 0 20px 0',
    }}>
      {label}
    </p>
  )
}

// ─── Product Section (Home only, no tabs) ────────────────────────────────────

const HOME_PRODUCT = {
  heading: 'ECHO Touchscreen Countertop',
  subtitle: 'Free Play Home version, without Bill Validator and Quarters Acceptor',
  price: '$3,990',
  features: [
    { icon: 'shipping', text: 'FREE Prime Shipping' },
    { icon: 'return',   text: 'FREE 30-day refund/replacement' },
    { icon: 'finance',  text: 'Pay over time — up to 24 months, 0% APR' },
    { icon: 'secure',   text: 'Secure Amazon checkout' },
  ],
}

function Icon({ type }: { type: string }) {
  const s = { width: 16, height: 16, flexShrink: 0, color: '#6B6B6B' } as React.CSSProperties
  if (type === 'shipping') return <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
  if (type === 'return')   return <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>
  if (type === 'finance')  return <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
  if (type === 'secure')   return <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  return null
}

const MODEL_POSTER = '/api/storage/3372/echo_3d_01.jpg'

class ModelViewerErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={MODEL_POSTER} alt="JVL Echo HD3" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    }
    return this.props.children
  }
}

function ModelViewer3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)
  const [mode, setMode] = useState<'2d' | '3d'>('2d')

  useEffect(() => {
    if (mode !== '3d' || !containerRef.current) return
    const scriptId = 'model-viewer-script'
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.id = scriptId
      script.type = 'module'
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js'
      script.onerror = () => setFailed(true)
      document.head.appendChild(script)
    }
    containerRef.current.innerHTML = `
      <model-viewer src="/api/storage/3486/3.glb" poster="${MODEL_POSTER}" alt="JVL Echo HD3"
        loading="eager" reveal="auto" ar-modes="webxr scene-viewer quick-look"
        camera-controls tone-mapping="neutral" shadow-intensity="1"
        environment-image="legacy" style="width:100%;height:100%;background:transparent;">
      </model-viewer>`
    const mv = containerRef.current.querySelector('model-viewer')
    if (mv) mv.addEventListener('error', () => setFailed(true))
  }, [mode])

  const showPoster = mode === '2d' || failed

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#E8E6DE', borderRadius: 8, padding: 4, width: 'fit-content', marginBottom: 12 }}>
        {(['2d', '3d'] as const).map((m) => {
          const isActive = mode === m && !failed
          return (
            <button key={m} onClick={() => setMode(m)} style={{
              background: isActive ? '#fff' : 'transparent', border: 'none', borderRadius: 6,
              padding: '5px 16px', fontSize: 13, fontWeight: 600, letterSpacing: '0.04em',
              color: isActive ? '#101213' : 'rgba(16,18,19,0.45)', cursor: isActive ? 'default' : 'pointer',
              transition: 'all 0.18s ease', boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
              userSelect: 'none', textTransform: 'uppercase',
            }}>{m}</button>
          )
        })}
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        {showPoster
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={MODEL_POSTER} alt="JVL Echo HD3" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
          : <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
        }
      </div>
    </div>
  )
}

function ProductSectionHome({ data }: { data: PageData['product'] }) {
  return (
    <section style={{ background: '#F4F3EC', padding: '80px 0', borderTop: '1px solid #E0DDD4' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 6vw' }}>
        <h2 style={{
          fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 600, textTransform: 'uppercase',
          letterSpacing: '-0.02em', lineHeight: 1.1, color: '#101213',
          textAlign: 'center', maxWidth: 840, margin: '0 auto 40px',
        }}>
          {data.title}
        </h2>

        <div className="echo-product-home-grid">
          {/* Image / 3D viewer */}
          <div style={{ width: '100%', aspectRatio: '1 / 1', display: 'flex', flexDirection: 'column' }}>
            <ModelViewerErrorBoundary>
              <ModelViewer3D />
            </ModelViewerErrorBoundary>
          </div>

          {/* Details */}
          <div>
            <h3 style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#101213', margin: '0 0 10px' }}>
              {HOME_PRODUCT.heading}
            </h3>
            <p style={{ fontSize: 17, color: '#6B6B6B', marginBottom: 24, lineHeight: 1.6 }}>
              {HOME_PRODUCT.subtitle}
            </p>

            <div style={{ borderTop: '1px solid #E0DDD4' }}>
              {HOME_PRODUCT.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #E0DDD4' }}>
                  <Icon type={f.icon} />
                  <span style={{ fontSize: 17, color: '#4B4B4B' }}>{f.text}</span>
                </div>
              ))}
            </div>

            {/* Price + dual CTAs */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 28, gap: 16, flexWrap: 'wrap' }}>
              <div style={{ fontSize: 36, fontWeight: 600, color: '#101213', flexShrink: 0 }}>
                {HOME_PRODUCT.price}
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a
                  href="/en/contact-us"
                  className="btn-amazon"
                  style={{ padding: '14px 24px', textTransform: 'uppercase', whiteSpace: 'nowrap', textDecoration: 'none' }}
                >
                  Buy Directly from JVL
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
                <a
                  href={data.buttonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '14px 24px', border: '2px solid #101213', borderRadius: 4,
                    fontSize: 14, fontWeight: 700, letterSpacing: '0.06em',
                    textTransform: 'uppercase', color: '#101213', textDecoration: 'none',
                    whiteSpace: 'nowrap', transition: 'background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#101213'; e.currentTarget.style.color = '#F4F3EC' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#101213' }}
                >
                  Buy on Amazon
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function EchoHomeClient({ data }: { data: PageData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [reviewsExpanded, setReviewsExpanded] = useState(false)
  const [ctaExpanded1, setCtaExpanded1] = useState(false)
  const [ctaExpanded2, setCtaExpanded2] = useState(false)

  const wrap: React.CSSProperties = {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 6vw',
  }

  // ─── Section 2 Facts ────────────────────────────────────────────────────────
  const facts = [
    { stat: '149', label: 'Built-in games' },
    { stat: '22"', label: 'HD touchscreen' },
    { stat: '15 × 19.5 × 18.5"', label: 'Fits on a counter' },
    { stat: '2-player', label: '360° swivel base' },
  ]

  // ─── Section 3 Why blocks ───────────────────────────────────────────────────
  const whyBlocks = [
    {
      num: '01',
      title: '149 games, one machine.',
      body: 'No downloads. No installs. No subscriptions. No internet required. Every game is built in and ready the moment you plug it in.',
    },
    {
      num: '02',
      title: 'Plug it in and play.',
      body: 'Power cord, one USB stick for the software, and you\'re ready in minutes. No technical setup, no account, no configuration.',
    },
    {
      num: '03',
      title: 'Made for people around it.',
      body: 'Two-player mode, a 360° swivel base, and touch controls anyone can pick up. ECHO pulls people in — kids, grown-ups, guests who haven\'t played in years.',
    },
    {
      num: '04',
      title: 'Built to own for years.',
      body: 'Built on 30+ years of JVL bartop expertise. Reinforced case, precision frame, individually tested before it leaves the factory.',
    },
  ]

  // ─── Section 4 Game categories ──────────────────────────────────────────────
  const categories = [
    { name: 'Cards', desc: 'Poker, blackjack, solitaire — designed for a relaxed evening' },
    { name: 'Classic', desc: 'Bar-era arcade: darts, billiards, shuffleboard, bowling and more' },
    { name: 'Action', desc: 'Score chasers, maze runners — the kind of games that made arcades what they were' },
    { name: 'Puzzle', desc: 'Logic puzzles, matching games, mini-golf — easy to dip into, hard to put down' },
    { name: 'Quiz', desc: 'Trivia, word puzzles, knowledge challenges across music, history, sports' },
    { name: 'Adult', desc: 'A separate category, fully lockable by physical key — can be disabled entirely' },
  ]

  // ─── Section 7 Reviews ──────────────────────────────────────────────────────
  const mainReviews = [
    {
      tag: 'On setup & first use',
      quote: 'I had it on the counter and playing within ten minutes of opening the box. My kids didn\'t even let me finish reading the manual.',
      author: 'Tom R., Ontario',
    },
    {
      tag: 'On game variety',
      quote: 'We thought we\'d get bored of the same games fast. Three months in and we\'re still finding ones we haven\'t tried. 149 is not a small number.',
      author: 'Linda H., British Columbia',
    },
    {
      tag: 'On the two-player feature',
      quote: 'My mother-in-law who hasn\'t touched a video game in decades was playing card games on it within five minutes. The swivel base is genius.',
      author: 'Margaret S., Alberta',
    },
    {
      tag: 'On build quality',
      quote: 'It feels like proper equipment — not a toy. The screen is crisp, the sound is loud enough for a room, and nothing feels cheap about it.',
      author: 'Daniel P., Quebec',
    },
  ]

  const extraReviews = [
    {
      tag: 'On the Adult category',
      quote: 'Love that you can lock it out with a physical key. The kids have no idea it exists.',
      author: 'Sarah M., Manitoba',
    },
    {
      tag: 'On long-term use',
      quote: 'Had it for over a year now. Still runs perfectly. Zero issues. Just plays.',
      author: 'James K., Nova Scotia',
    },
    {
      tag: 'On gifting',
      quote: 'Bought it for my dad\'s retirement. He plays it every single day. Best gift I\'ve ever given.',
      author: 'Rachel T., Saskatchewan',
    },
    {
      tag: 'On customer support',
      quote: 'Had a question about a setting — called JVL and a real person answered. That alone is worth a lot these days.',
      author: 'Frank D., New Brunswick',
    },
    {
      tag: 'On touchscreen',
      quote: 'The touchscreen is incredibly responsive. My 7-year-old and my 72-year-old father both figured it out on their own.',
      author: 'Claire V., Prince Edward Island',
    },
    {
      tag: 'On value',
      quote: 'For what you get — 149 games, the build quality, the warranty — it\'s genuinely good value. Nothing else like it at this price.',
      author: 'Brian W., Newfoundland',
    },
  ]

  // ─── Section 9 FAQ ──────────────────────────────────────────────────────────
  const faqs = [
    {
      q: 'How long does setup actually take?',
      a: 'About 10 minutes — mostly unboxing. Plug in the power cord, insert the USB stick, and you\'re playing. No account required, no internet needed, no technical knowledge assumed.',
    },
    {
      q: 'Will it fit on my counter?',
      a: 'ECHO\'s footprint is 15" × 19.5" × 18.5". It sits comfortably on a kitchen counter, bar cart, or games room table — without taking over the surface.',
    },
    {
      q: 'Does it need internet?',
      a: 'No. ECHO is 100% offline. All 149 games are built in and run locally. No subscription, no streaming, no Wi-Fi required — ever.',
    },
    {
      q: 'Can I keep kids out of the Adult category?',
      a: 'Yes. The Adult category is locked with a physical key included with the machine. You can also disable it entirely, or set a schedule. Kids cannot bypass it.',
    },
    {
      q: 'How is ECHO different from a full-size arcade cabinet?',
      a: 'A full-size cabinet can take up 8+ square feet of floor space. ECHO sits on your counter, weighs a fraction of the price, and delivers the same game variety without needing a dedicated room.',
    },
    {
      q: 'Are the games licensed classics?',
      a: 'No — ECHO\'s 149 games are proprietary JVL titles built and refined over 30+ years. They include original card games, arcade-style action titles, trivia, puzzle games, and more.',
    },
    {
      q: 'Is it loud? Can I control volume?',
      a: 'ECHO has a 25-watt, 4-speaker audio system with fully adjustable volume. You can bring it up for a party or dial it down for a quiet evening.',
    },
    {
      q: 'What if a game glitches or something fails with the hardware?',
      a: 'Call, chat, or email JVL — a real person from our team will help you. ECHO is covered by a 1-year all-inclusive warranty. If something needs fixing, we fix it — and we cover shipping both ways.',
    },
    {
      q: 'Is there a two-player mode?',
      a: 'Yes. Many games support two-player mode, and the 360° swivel base makes it easy to pass turns and share the screen — whether it\'s two kids or two adults at the kitchen table.',
    },
    {
      q: 'What languages does it support?',
      a: 'ECHO supports English, Spanish, Italian, French, German, Polish, and Russian.',
    },
    {
      q: 'Can older parents or younger kids use it?',
      a: 'Yes. The touchscreen interface requires no login, no controller, and no instructions. If you can tap a screen, you can play. We\'ve seen 6-year-olds and 80-year-olds both figure it out independently.',
    },
    {
      q: 'What\'s the difference between ECHO Home and ECHO Commercial?',
      a: 'ECHO Home is designed for free-play in a private setting — no coin or bill acceptor. ECHO Commercial adds a bill acceptor and coin mechanism for venues that charge per play. Same screen, same games, different payment setup.',
    },
  ]

  // ─── Section 8 Ownership cards ──────────────────────────────────────────────
  const ownershipCards = [
    {
      title: 'Warranty',
      body: '1-year all-inclusive. If something isn\'t right, we fix it.',
      highlight: 'JVL covers shipping both ways.',
    },
    {
      title: 'Returns',
      body: 'Not what you hoped? Return within 30 days for a full refund.',
      highlight: null,
    },
    {
      title: 'Support',
      body: 'Live chat, email, and phone — answered by our team.',
      highlight: null,
    },
    {
      title: 'Shipping',
      body: 'Ships directly from our factory. Individually tested, securely packed.',
      highlight: null,
    },
  ]

  return (
    <div style={{ marginTop: -52 }}>
      <style>{`
        .echo-hero { height: calc(100vh - 72px); }
        .echo-hero-video { height: 100%; }

        .echo-section-what { background: #101213; padding: 96px 0; }
        .echo-section-why { background: #080a0b; padding: 96px 0; border-top: 1px solid #1e2022; }
        .echo-section-library { background: #101213; padding: 96px 0; border-top: 1px solid #222; }
        .echo-section-built { background: #080a0b; padding: 96px 0; border-top: 1px solid #1e2022; }
        .echo-section-cta { background: #FB671F; padding: 80px 0; }
        .echo-section-reviews { background: #080a0b; padding: 96px 0; border-top: 1px solid #1e2022; }
        .echo-section-ownership { background: #101213; padding: 96px 0; border-top: 1px solid #1e2022; }
        .echo-section-faq { background: #080a0b; padding: 96px 0; border-top: 1px solid #1e2022; }
        .echo-section-bottom-cta { background: #080a0b; padding: 80px 0; border-top: 1px solid #1e2022; }

        /* What ECHO is — 2-col grid */
        .echo-what-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        /* Facts 2x2 */
        .echo-facts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border: 1px solid #1e2022;
          border-radius: 4px;
          overflow: hidden;
          margin-top: 40px;
        }
        .echo-fact-cell {
          padding: 24px 20px;
          border-right: 1px solid #1e2022;
          border-bottom: 1px solid #1e2022;
        }
        .echo-fact-cell:nth-child(2n) { border-right: none; }
        .echo-fact-cell:nth-child(3),
        .echo-fact-cell:nth-child(4) { border-bottom: none; }

        /* Why — 2x2 grid */
        .echo-why-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px 64px;
          margin-top: 48px;
        }

        /* Library — 2-col grid */
        .echo-library-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 72px;
          align-items: start;
        }
        .echo-library-sticky {
          position: sticky;
          top: 100px;
        }

        /* Built — 3-col */
        .echo-built-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          margin-top: 56px;
        }

        /* Reviews — 2x2 */
        .echo-reviews-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border: 1px solid #1e2022;
          border-radius: 4px;
          overflow: hidden;
          margin: 40px 0 56px;
        }
        .echo-stat-cell {
          padding: 28px 24px;
          border-right: 1px solid #1e2022;
        }
        .echo-stat-cell:last-child { border-right: none; }
        .echo-reviews-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .echo-extra-reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 20px;
        }

        /* Ownership — 4-col */
        .echo-ownership-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-top: 48px;
        }

        /* CTA buttons row */
        .echo-cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 32px;
        }

        /* CTA expander */
        .echo-cta-expander-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          font-size: 13px;
          text-decoration: underline;
          text-underline-offset: 3px;
          margin-top: 16px;
          transition: opacity 0.2s;
        }
        .echo-cta-expander-btn:hover { opacity: 0.8; }
        .echo-cta-expander-content {
          overflow: hidden;
          transition: max-height 0.35s ease;
        }
        .echo-cta-expander-inner {
          max-width: 520px;
          margin: 0 auto;
          padding: 20px 24px;
          border-radius: 4px;
          text-align: left;
          font-size: 14px;
          line-height: 1.65;
        }
        .echo-cta-expander-inner p { margin: 0 0 10px 0; }
        .echo-cta-expander-inner p:last-child { margin: 0; }

        /* FAQ */
        .echo-faq-item {
          border-bottom: 1px solid #1e2022;
        }
        .echo-faq-btn {
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 0;
          text-align: left;
          gap: 16px;
        }
        .echo-faq-answer {
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        /* Product section home grid */
        .echo-product-home-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .echo-product-home-grid { grid-template-columns: 1fr; gap: 40px; }
          .echo-what-grid { grid-template-columns: 1fr; gap: 48px; }
          .echo-why-grid { grid-template-columns: 1fr; gap: 36px; }
          .echo-library-grid { grid-template-columns: 1fr; gap: 48px; }
          .echo-library-sticky { position: static; }
          .echo-built-grid { grid-template-columns: 1fr; gap: 32px; }
          .echo-reviews-stats { grid-template-columns: 1fr; }
          .echo-stat-cell { border-right: none; border-bottom: 1px solid #1e2022; }
          .echo-stat-cell:last-child { border-bottom: none; }
          .echo-reviews-grid { grid-template-columns: 1fr; }
          .echo-extra-reviews-grid { grid-template-columns: 1fr 1fr; }
          .echo-ownership-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .echo-facts-grid { grid-template-columns: 1fr; }
          .echo-fact-cell { border-right: none; }
          .echo-fact-cell:nth-child(2n) { border-right: none; }
          .echo-fact-cell:last-child { border-bottom: none; }
          .echo-extra-reviews-grid { grid-template-columns: 1fr; }
          .echo-ownership-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── Section 1: Hero ── */}
      <Hero data={data.hero} />

      {/* ── Section 2: What ECHO is ── */}
      <section className="echo-section-what">
        <div style={wrap}>
          <div className="echo-what-grid">
            {/* Left: text */}
            <div>
              <Badge label="What ECHO is" />
              <p style={{
                fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.45,
                color: '#F4F3EC',
                margin: '0 0 40px 0',
              }}>
                "A 22-inch touchscreen bartop arcade with 149 pre-installed games, built for the home — and the only one of its kind on the market."
              </p>

              <div className="echo-facts-grid">
                {facts.map((f) => (
                  <div key={f.stat} className="echo-fact-cell">
                    <div style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2rem)', fontWeight: 700, color: '#F4F3EC', lineHeight: 1.1 }}>
                      {f.stat}
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(244,243,236,0.5)', marginTop: 6, letterSpacing: '0.04em' }}>
                      {f.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: image */}
            <div>
              {data.countertop.image && (
                <img
                  src={data.countertop.image}
                  alt={data.countertop.title}
                  style={{
                    width: '100%',
                    aspectRatio: '4/5',
                    objectFit: 'cover',
                    borderRadius: 4,
                    display: 'block',
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Why it belongs in your home ── */}
      <section className="echo-section-why">
        <div style={wrap}>
          <Badge label="Why ECHO" />
          <h2 style={{
            fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)',
            fontWeight: 700,
            color: '#F4F3EC',
            margin: '0 0 8px 0',
            letterSpacing: '-0.01em',
          }}>
            Four things that make ECHO worth owning.
          </h2>

          <div className="echo-why-grid">
            {whyBlocks.map((b) => (
              <div key={b.num}>
                <p style={{ fontSize: 13, fontStyle: 'italic', color: '#FB671F', margin: '0 0 12px 0', fontWeight: 500 }}>
                  {b.num}
                </p>
                <h3 style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)', fontWeight: 700, color: '#F4F3EC', margin: '0 0 12px 0' }}>
                  {b.title}
                </h3>
                <p style={{ fontSize: 15, color: 'rgba(244,243,236,0.65)', lineHeight: 1.7, margin: 0 }}>
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: The game library ── */}
      <section className="echo-section-library">
        <div style={wrap}>
          <div className="echo-library-grid">
            {/* Left: text */}
            <div>
              <Badge label="The game library" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)',
                fontWeight: 700,
                color: '#F4F3EC',
                margin: '0 0 28px 0',
                letterSpacing: '-0.01em',
              }}>
                149 games across six categories.
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(244,243,236,0.7)', lineHeight: 1.75, margin: '0 0 16px 0' }}>
                ECHO doesn't pull from a streaming library or a marketplace. Every game is built in, balanced, and tested — ready the moment you power it on.
              </p>
              <p style={{ fontSize: 16, color: 'rgba(244,243,236,0.7)', lineHeight: 1.75, margin: '0 0 36px 0' }}>
                Six categories cover the range of what people actually want to play — whether it's a quiet evening of cards or a competitive trivia night with the family.
              </p>

              {/* Category list */}
              <div style={{ borderTop: '1px solid #1e2022' }}>
                {categories.map((c) => (
                  <div key={c.name} style={{
                    display: 'flex',
                    gap: 24,
                    alignItems: 'baseline',
                    padding: '16px 0',
                    borderBottom: '1px solid #1e2022',
                  }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#F4F3EC', minWidth: 64, flexShrink: 0 }}>
                      {c.name}
                    </span>
                    <span style={{ fontSize: 14, color: 'rgba(244,243,236,0.55)', lineHeight: 1.6 }}>
                      {c.desc}
                    </span>
                  </div>
                ))}
              </div>

              {/* Parental note */}
              <div style={{
                marginTop: 32,
                borderLeft: '3px solid #FB671F',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '0 4px 4px 0',
                padding: '20px 24px',
              }}>
                <p style={{ fontSize: 14, color: 'rgba(244,243,236,0.75)', lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ color: '#F4F3EC' }}>Full parental control.</strong> The Adult category can be turned off, scheduled, or locked with a physical key.
                </p>
              </div>
            </div>

            {/* Right: sticky image */}
            <div className="echo-library-sticky">
              {(data.product.image) && (
                <img
                  src={data.product.image}
                  alt={data.product.title}
                  style={{
                    width: '100%',
                    aspectRatio: '1',
                    objectFit: 'cover',
                    borderRadius: 4,
                    display: 'block',
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: Built to last ── */}
      <section className="echo-section-built">
        <div style={wrap}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
            <Badge label="Built to last" />
            <h2 style={{
              fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)',
              fontWeight: 700,
              color: '#F4F3EC',
              margin: '0 0 20px 0',
              letterSpacing: '-0.01em',
            }}>
              A machine worth owning.
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(244,243,236,0.6)', lineHeight: 1.75, margin: 0 }}>
              ECHO is built on 30+ years of JVL bartop expertise — the same bartop line that earned its reputation in bars and arcades of North America.
            </p>
          </div>

          <div className="echo-built-grid">
            {/* Card 1 */}
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#F4F3EC', margin: '0 0 12px 0' }}>
                Designed in Canada, made in the USA.
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(244,243,236,0.55)', lineHeight: 1.7, margin: 0 }}>
                Every unit is engineered at JVL's Canadian headquarters and assembled to strict manufacturing standards.
              </p>
            </div>

            {/* Card 2 */}
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#F4F3EC', margin: '0 0 12px 0' }}>
                30+ years of JVL bartop expertise.
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(244,243,236,0.55)', lineHeight: 1.7, margin: 0 }}>
                JVL has been building bartop machines since 1995. ECHO inherits everything learned from a generation of commercial hardware.
              </p>
            </div>

            {/* Card 3 */}
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#F4F3EC', margin: '0 0 12px 0' }}>
                Individually tested, factory shipped.
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(244,243,236,0.55)', lineHeight: 1.7, margin: 0 }}>
                Every ECHO is powered on and tested before it leaves the factory. You're not the first person to use it — you're just the first person to own it.
              </p>
            </div>
          </div>

          {/* Heritage quote */}
          <p style={{
            textAlign: 'center',
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: 'rgba(244,243,236,0.4)',
            margin: '64px auto 0',
            maxWidth: 680,
            lineHeight: 1.7,
          }}>
            "A machine built by a company that has been making bartops since before most of its customers had seen one in a bar."
          </p>
        </div>
      </section>

      {/* ── Section 5b: Product spec ── */}
      <ProductSectionHome data={data.product} />

      {/* ── Section 6: CTA block ── */}
      <section className="echo-section-cta">
        <div style={{ ...wrap, textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3vw, 3rem)',
            fontWeight: 700,
            color: '#080a0b',
            margin: '0 0 16px 0',
            letterSpacing: '-0.01em',
          }}>
            Ready to bring ECHO home?
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(8,10,11,0.75)', margin: '0 0 8px 0', lineHeight: 1.6 }}>
            149 games, one machine. On your counter, ready in minutes.
          </p>
          <div className="echo-cta-buttons">
            <a
              href={AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-amazon"
              style={{ background: '#080a0b', color: '#F4F3EC', padding: '16px 32px', textTransform: 'uppercase', textDecoration: 'none' }}
            >
              Buy on Amazon
            </a>
            <a
              href="/en/contact-us"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '16px 32px',
                border: '2px solid #080a0b',
                borderRadius: 4,
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#080a0b',
                textDecoration: 'none',
              }}
            >
              Buy Direct from JVL
            </a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button
              className="echo-cta-expander-btn"
              style={{ color: 'rgba(8,10,11,0.65)' }}
              onClick={() => setCtaExpanded1(!ctaExpanded1)}
            >
              {ctaExpanded1 ? 'Hide' : 'Not sure which to pick?'}
            </button>
            <div
              className="echo-cta-expander-content"
              style={{ maxHeight: ctaExpanded1 ? 300 : 0, width: '100%' }}
            >
              <div className="echo-cta-expander-inner" style={{ background: 'rgba(8,10,11,0.1)', color: 'rgba(8,10,11,0.75)', marginTop: 12 }}>
                <p><strong style={{ color: '#080a0b' }}>Buy on Amazon</strong> — familiar checkout, Prime shipping, and Amazon's full review base. Returns and basic support go through Amazon.</p>
                <p><strong style={{ color: '#080a0b' }}>Buy Direct from JVL</strong> — direct warranty relationship with us, live support by chat or phone, ships from our factory to your door with no middleman.</p>
                <p>Either way: same machine, same warranty, same price.</p>
              </div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(8,10,11,0.55)', marginTop: 20 }}>
            1-year all-inclusive warranty · JVL covers shipping both ways
          </p>
        </div>
      </section>

      {/* ── Section 7: What owners say ── */}
      <section className="echo-section-reviews">
        <div style={wrap}>
          <Badge label="What owners say" />
          <h2 style={{
            fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)',
            fontWeight: 700,
            color: '#F4F3EC',
            margin: '0 0 0 0',
            letterSpacing: '-0.01em',
          }}>
            Real homes. Real reactions.
          </h2>

          {/* Stats row */}
          <div className="echo-reviews-stats">
            <div className="echo-stat-cell">
              <div style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2rem)', fontWeight: 700, color: '#F4F3EC' }}>30+</div>
              <div style={{ fontSize: 13, color: 'rgba(244,243,236,0.45)', marginTop: 6 }}>Years of JVL bartop heritage</div>
            </div>
            <div className="echo-stat-cell">
              <div style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2rem)', fontWeight: 700, color: '#F4F3EC' }}>4.3★</div>
              <div style={{ fontSize: 13, color: 'rgba(244,243,236,0.45)', marginTop: 6 }}>Current Amazon rating</div>
            </div>
            <div className="echo-stat-cell">
              <div style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2rem)', fontWeight: 700, color: '#F4F3EC' }}>1 yr</div>
              <div style={{ fontSize: 13, color: 'rgba(244,243,236,0.45)', marginTop: 6 }}>All-inclusive warranty</div>
            </div>
          </div>

          {/* Main 2x2 reviews */}
          <div className="echo-reviews-grid">
            {mainReviews.map((r) => (
              <div key={r.author} style={{
                border: '1px solid #1e2022',
                borderRadius: 4,
                padding: '28px 28px 24px',
                background: '#101213',
              }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#FB671F', margin: '0 0 16px 0' }}>
                  {r.tag}
                </p>
                <p style={{ fontSize: 15, fontStyle: 'italic', fontWeight: 300, color: '#F4F3EC', lineHeight: 1.7, margin: '0 0 20px 0' }}>
                  "{r.quote}"
                </p>
                <p style={{ fontSize: 13, color: 'rgba(244,243,236,0.4)', margin: 0 }}>
                  — {r.author}
                </p>
              </div>
            ))}
          </div>

          {/* Expand toggle */}
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <button
              onClick={() => setReviewsExpanded(!reviewsExpanded)}
              style={{
                background: 'none',
                border: '1px solid #1e2022',
                color: 'rgba(244,243,236,0.6)',
                padding: '12px 28px',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 14,
                letterSpacing: '0.06em',
              }}
            >
              {reviewsExpanded ? 'Show fewer' : 'Read more stories'}
            </button>
          </div>

          {/* Extra reviews */}
          {reviewsExpanded && (
            <div className="echo-extra-reviews-grid">
              {extraReviews.map((r) => (
                <div key={r.author} style={{
                  border: '1px solid #1e2022',
                  borderRadius: 4,
                  padding: '22px 20px 18px',
                  background: '#101213',
                }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#FB671F', margin: '0 0 12px 0' }}>
                    {r.tag}
                  </p>
                  <p style={{ fontSize: 14, fontStyle: 'italic', fontWeight: 300, color: '#F4F3EC', lineHeight: 1.65, margin: '0 0 14px 0' }}>
                    "{r.quote}"
                  </p>
                  <p style={{ fontSize: 12, color: 'rgba(244,243,236,0.4)', margin: 0 }}>
                    — {r.author}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Section 8: Ownership made easy ── */}
      <section className="echo-section-ownership">
        <div style={wrap}>
          <Badge label="Ownership" />
          <h2 style={{
            fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)',
            fontWeight: 700,
            color: '#F4F3EC',
            margin: '0 0 0 0',
            letterSpacing: '-0.01em',
          }}>
            Buy it. Own it. We stand behind it.
          </h2>

          <div className="echo-ownership-grid">
            {ownershipCards.map((c) => (
              <div key={c.title} style={{
                borderTop: '3px solid #FB671F',
                padding: '28px 24px',
                background: '#0d0f10',
                borderRadius: '0 0 4px 4px',
              }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#F4F3EC', margin: '0 0 12px 0' }}>
                  {c.title}
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(244,243,236,0.6)', lineHeight: 1.65, margin: 0 }}>
                  {c.body}
                </p>
                {c.highlight && (
                  <p style={{ fontSize: 13, color: '#FB671F', margin: '12px 0 0 0', fontWeight: 600 }}>
                    {c.highlight}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 9: FAQ ── */}
      <section className="echo-section-faq">
        <div style={wrap}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 56px' }}>
            <Badge label="Questions, answered" />
            <h2 style={{
              fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)',
              fontWeight: 700,
              color: '#F4F3EC',
              margin: 0,
              letterSpacing: '-0.01em',
            }}>
              Frequently asked.
            </h2>
          </div>

          <div style={{ maxWidth: 880, margin: '0 auto' }}>
            {faqs.map((faq, i) => (
              <div key={i} className="echo-faq-item">
                <button
                  className="echo-faq-btn"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span style={{ fontSize: 16, fontWeight: 600, color: '#F4F3EC', lineHeight: 1.4 }}>
                    {faq.q}
                  </span>
                  <span style={{ fontSize: 22, color: '#FB671F', flexShrink: 0, lineHeight: 1 }}>
                    {openFaq === i ? '×' : '+'}
                  </span>
                </button>
                <div
                  className="echo-faq-answer"
                  style={{ maxHeight: openFaq === i ? 400 : 0 }}
                >
                  <p style={{ fontSize: 15, color: 'rgba(244,243,236,0.65)', lineHeight: 1.75, margin: '0 0 24px 0', paddingRight: 40 }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 10: Bottom CTA ── */}
      <section className="echo-section-bottom-cta">
        <div style={{ ...wrap, textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3vw, 3rem)',
            fontWeight: 700,
            color: '#F4F3EC',
            margin: '0 0 16px 0',
            letterSpacing: '-0.01em',
          }}>
            Bring it home.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(244,243,236,0.5)', margin: '0 0 8px 0' }}>
            149 games. One counter. No subscriptions.
          </p>
          <div className="echo-cta-buttons">
            <a
              href={AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-amazon"
              style={{ padding: '16px 32px', textTransform: 'uppercase', textDecoration: 'none' }}
            >
              Buy on Amazon
            </a>
            <a
              href="/en/contact-us"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '16px 32px',
                border: '2px solid rgba(244,243,236,0.3)',
                borderRadius: 4,
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#F4F3EC',
                textDecoration: 'none',
              }}
            >
              Buy Direct from JVL
            </a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button
              className="echo-cta-expander-btn"
              style={{ color: 'rgba(244,243,236,0.45)' }}
              onClick={() => setCtaExpanded2(!ctaExpanded2)}
            >
              {ctaExpanded2 ? 'Hide' : 'Not sure which to pick?'}
            </button>
            <div
              className="echo-cta-expander-content"
              style={{ maxHeight: ctaExpanded2 ? 300 : 0, width: '100%' }}
            >
              <div className="echo-cta-expander-inner" style={{ background: 'rgba(244,243,236,0.05)', border: '1px solid rgba(244,243,236,0.1)', color: 'rgba(244,243,236,0.65)', marginTop: 12 }}>
                <p><strong style={{ color: '#F4F3EC' }}>Buy on Amazon</strong> — familiar checkout, Prime shipping, and Amazon's full review base. Returns and basic support go through Amazon.</p>
                <p><strong style={{ color: '#F4F3EC' }}>Buy Direct from JVL</strong> — direct warranty relationship with us, live support by chat or phone, ships from our factory to your door with no middleman.</p>
                <p>Either way: same machine, same warranty, same price.</p>
              </div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(244,243,236,0.3)', marginTop: 20 }}>
            1-year all-inclusive warranty · JVL covers shipping both ways
          </p>
        </div>
      </section>
    </div>
  )
}
