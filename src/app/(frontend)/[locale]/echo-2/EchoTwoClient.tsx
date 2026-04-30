'use client'

import React, { Component, useEffect, useRef, useState } from 'react'

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

  const trustChips = [
    '149 Games Built-in',
    'No Wi-Fi Needed',
    '1-Year Warranty',
    'Made in the USA',
  ]

  return (
    <section className="echo-hero" style={{ position: 'relative', width: '100%', background: '#080a0b', overflow: 'hidden' }}>
      {data.desktopPoster && (
        <img src={data.desktopPoster} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
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
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.0) 70%)' }} />

      <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, padding: '0 5vw', maxWidth: 800 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FB671F', margin: '0 0 20px 0' }}>
          Home Arcade by JVL
        </p>
        <h1 className="echo-hero-h1" style={{
          fontFamily: 'inherit', fontSize: 'clamp(2rem, 3.6vw, 3.8rem)',
          fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.02em',
          color: '#fff', margin: '0 0 20px 0',
        }}>
          Premium Home Arcade Machine for Your{' '}
          <em style={{ fontStyle: 'italic', color: '#FB671F' }}>Home Bar, Game Room, or Family Room</em>
        </h1>
        <p style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', color: 'rgba(244,243,236,0.75)', lineHeight: 1.6, margin: '0 0 24px 0', maxWidth: 560 }}>
          149 built-in arcade-style games. No Wi-Fi, no downloads, no subscriptions. A 22&quot; touchscreen bartop arcade machine built for effortless play at home.
        </p>

        {/* Trust chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {trustChips.map(chip => (
            <span key={chip} style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'rgba(244,243,236,0.7)', border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 20, padding: '5px 12px', background: 'rgba(255,255,255,0.05)',
            }}>
              {chip}
            </span>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.15)' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 5vw', maxWidth: 1440, margin: '0 auto', width: '100%' }}>
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
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <a href="/en/contact-us" className="btn-amazon" style={{ padding: '14px 28px', textTransform: 'uppercase' }}>
              Buy ECHO for Home
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href={data.buttonUrl} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '14px 28px' }}>
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
    <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FB671F', margin: '0 0 20px 0' }}>
      {label}
    </p>
  )
}

// ─── Product Section ──────────────────────────────────────────────────────────

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
          <div style={{ width: '100%', aspectRatio: '1 / 1', display: 'flex', flexDirection: 'column' }}>
            <ModelViewerErrorBoundary>
              <ModelViewer3D />
            </ModelViewerErrorBoundary>
          </div>
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
                  Buy ECHO for Home
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

// ─── Game Categories ──────────────────────────────────────────────────────────

const GAME_CATEGORIES = [
  {
    label: 'Action',
    img: '/api/storage/3458/Action.jpg',
    video: '/api/storage/3459/Action.mp4',
    desc: 'Dive into the fan-favorite Gone Fishing, outmaneuver opponents in Bumper Wars, battle crazy creatures in Monster Mash, and crush levels in Bonbon Deluxe.',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h.01M8 10v4M6 12h4"/><circle cx="16" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="18" cy="10" r="1" fill="currentColor" stroke="none"/></svg>,
  },
  {
    label: 'Strategy',
    img: '/api/storage/3460/Strategy.jpg',
    video: '/api/storage/3461/Strategy.mp4',
    desc: 'ECHO is packed with timeless strategy games! Outmaneuver rivals in Backgammon and Battle Ships, or dive into classic match-3 and math games.',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M8 16V8c0-1.1.9-2 2-2h4M12 6V4M9 20h6M12 16v4"/><rect x="9" y="8" width="6" height="8" rx="1"/></svg>,
  },
  {
    label: 'Cards',
    img: '/api/storage/3462/Cards.jpg',
    video: '/api/storage/3463/Cards.mp4',
    desc: "From casinos to coffee tables, card games never go out of style! Hit 21 in Blackjack, go all-in with Texas Hold'em, or keep it classic with Solitaire.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="14" height="18" rx="2"/><path d="M8 7v2M8 11v2"/><rect x="8" y="2" width="14" height="18" rx="2" fill="rgba(244,243,236,0.1)" stroke="currentColor"/></svg>,
  },
  {
    label: 'Puzzle',
    img: '/api/storage/3464/Puzzle.jpg',
    video: '/api/storage/3465/Puzzle.mp4',
    desc: 'Challenge your brain in classic logic games like Sudoku, Mine Sweeper, and Mahjong. Perfect for solo challenges or friendly competition.',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M19.5 12c0-.23-.01-.45-.03-.68l2.03-1.58a.5.5 0 0 0 .12-.61l-2-3.46a.5.5 0 0 0-.61-.22l-2.39.96a7 7 0 0 0-1.17-.68l-.36-2.54A.5.5 0 0 0 14.5 3h-4a.5.5 0 0 0-.5.42l-.36 2.54a7 7 0 0 0-1.17.68L6.08 5.68a.5.5 0 0 0-.61.22l-2 3.46a.5.5 0 0 0 .12.61l2.03 1.58C5.51 11.55 5.5 11.78 5.5 12s.01.45.03.68L3.5 14.26a.5.5 0 0 0-.12.61l2 3.46a.5.5 0 0 0 .61.22l2.39-.96c.37.26.76.48 1.17.68l.36 2.54a.5.5 0 0 0 .5.42h4c.24 0 .44-.17.49-.42l.36-2.54a7 7 0 0 0 1.17-.68l2.39.96a.5.5 0 0 0 .61-.22l2-3.46a.5.5 0 0 0-.12-.61l-2.03-1.58c.02-.23.03-.45.03-.68z"/><circle cx="12" cy="12" r="2.5"/></svg>,
  },
  {
    label: 'Quiz',
    img: '/api/storage/3466/Quiz.jpg',
    video: '/api/storage/3467/Quiz.mp4',
    desc: "Whether you're a trivia master or a word wizard, ECHO's quiz games will put your skills to the test! Answer exciting questions in Double Quiz or build winning words in Word Chase.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>,
  },
  {
    label: 'Adult',
    img: '/api/storage/3468/Erotic.jpg',
    video: null,
    desc: 'For those who like it hot, ECHO offers a fun selection of spicy, adult-themed games. You can easily enable, disable, or schedule access to adult content in the settings.',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 12h6M12 9v6"/></svg>,
  },
]

function GamesSectionDark() {
  const [activeTab, setActiveTab] = useState(0)
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const cat = GAME_CATEGORIES[activeTab]

  function switchTab(i: number) {
    setPlaying(false)
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0 }
    setActiveTab(i)
  }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid #1e2022', borderBottom: '1px solid #1e2022', marginBottom: 56 }}>
        {[
          { value: '149', label: 'Pre-installed games', size: 'clamp(2.2rem, 3.5vw, 3rem)' },
          { value: 'Solo & 2-Player', label: 'Player Modes', size: 'clamp(1.5rem, 2.4vw, 2rem)' },
          { value: '∞', label: 'Hours of Fun', size: 'clamp(3rem, 5vw, 4rem)' },
        ].map((s, i) => (
          <div key={s.label} style={{
            padding: '28px 24px', textAlign: 'center',
            borderLeft: i > 0 ? '1px solid #1e2022' : 'none',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}>
            <div style={{ fontSize: s.size, fontWeight: 700, color: '#F4F3EC', lineHeight: 1.1, marginBottom: 8 }}>{s.value}</div>
            <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(244,243,236,0.45)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="echo-games-grid">
        <div className="echo-cat-vert">
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(244,243,236,0.35)', marginBottom: 20 }}>
            Game Categories
          </div>
          {GAME_CATEGORIES.map((c, i) => (
            <button
              key={c.label}
              onClick={() => switchTab(i)}
              className="echo-cat-btn"
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                padding: '14px 0', borderTop: '1px solid #1e2022',
                color: activeTab === i ? '#FB671F' : 'rgba(244,243,236,0.75)',
                transition: 'color 0.2s', textAlign: 'left', fontFamily: 'inherit',
              }}
            >
              <span style={{ flexShrink: 0 }}>{c.icon}</span>
              <span style={{ fontSize: 18, fontWeight: activeTab === i ? 600 : 400 }}>{c.label}</span>
            </button>
          ))}
        </div>

        <div>
          <div style={{ position: 'relative', borderRadius: 6, overflow: 'hidden', marginBottom: 20, background: '#000' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cat.img} alt={cat.label} style={{ width: '100%', display: 'block', opacity: playing ? 0 : 1, transition: 'opacity 0.2s' }} />
            {cat.video && (
              <video
                ref={videoRef}
                src={cat.video}
                controls
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: playing ? 1 : 0, transition: 'opacity 0.2s' }}
              />
            )}
            {cat.video && !playing && (
              <button
                onClick={() => { setPlaying(true); videoRef.current?.play() }}
                style={{
                  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                  background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
                  border: 'none', cursor: 'pointer', borderRadius: '50%',
                  width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
            )}
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#F4F3EC', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{cat.label}</div>
          <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.75, color: 'rgba(244,243,236,0.65)', margin: 0 }}>{cat.desc}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Specs Section ────────────────────────────────────────────────────────────

const SPECS_ITEMS = [
  {
    label: 'Product Information',
    img: '/api/storage/3449/Tech-Specs.jpg',
    table: [
      ['Dimensions', '15"L × 19.5"W × 18.5"H'],
      ['Weight', '39.4 Pounds'],
      ['Controller', 'Touchscreen'],
      ['Screen Size', '22 Inches'],
      ['Display Type', 'LCD'],
      ['Power Source', 'Corded Electric'],
      ['Setup Complexity', 'Plug-n-Play, no setup needed'],
    ],
  },
  {
    label: 'Premium Build',
    img: '/api/storage/3450/Premium-Build.jpg',
    text: 'Built to withstand the toughest arcade and bar environments, ECHO features a reinforced plastic case and precision-built frame.',
  },
  {
    label: 'Swivel Base',
    img: '/api/storage/3451/Swivel-Base.jpg',
    text: "360° Swivel Base for Shared Play. ECHO's rotating base lets players on both sides take control — perfect for head-to-head action!",
  },
  {
    label: 'Dynamic Multi-color Halo',
    img: '/api/storage/3452/Halo.jpg',
    text: "ECHO's 360° multi-color halo turns up the energy, surrounding your game with a brilliant, ever-changing glow for a fully immersive experience.",
  },
  {
    label: 'Security and Customization',
    img: '/api/storage/3453/Key-Access.jpg',
    text: 'ECHO keeps your game settings, tournaments, and leaderboard data safe with built-in security features. Customization and system access are physically protected by secure key access.',
  },
  {
    label: 'No Internet Needed',
    img: '/api/storage/3457/Offline.jpg',
    text: 'ECHO works 100% offline. Everything is built-in — 149 preloaded games, leaderboards, and tournaments run offline. No waiting, no disconnects.',
  },
  {
    label: 'Multilingual Support',
    img: '/api/storage/3455/Multi-Lang.jpg',
    text: 'ECHO supports seven languages — English, Spanish, Italian, French, German, Polish, and Russian — all easily switchable directly through the interface.',
  },
]

function SpecsSectionLight() {
  const [open, setOpen] = useState(0)
  const wrap = { maxWidth: 1200, margin: '0 auto', padding: '0 6vw' }

  return (
    <section style={{ background: '#F4F3EC', padding: '96px 0', borderTop: '1px solid #E0DDD4' }}>
      <div style={wrap}>
        <div style={{ marginBottom: 52 }}>
          <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FB671F', margin: '0 0 14px' }}>
            Specifications
          </p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#101213', maxWidth: 700, margin: '0 0 20px' }}>
            Product Specifications
          </h2>
          <p style={{ fontSize: 17, fontWeight: 300, lineHeight: 1.75, color: '#4B4B4B', margin: 0, maxWidth: 560 }}>
            Every detail refined. Every feature designed to deliver performance, beauty, and timeless play.
          </p>
        </div>

        <div className="echo-specs-grid">
          <div className="echo-specs-img">
            <img
              key={Math.max(open, 0)}
              src={SPECS_ITEMS[Math.max(open, 0)].img}
              alt={SPECS_ITEMS[Math.max(open, 0)].label}
              style={{ width: '100%', display: 'block', borderRadius: 4 }}
            />
          </div>
          <div>
            {SPECS_ITEMS.map((item, i) => (
              <div key={item.label} style={{ borderTop: '1px solid #D0CEC6' }}>
                <button
                  onClick={() => setOpen(i === open ? -1 : i)}
                  style={{
                    width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '18px 0', fontSize: 15, fontWeight: 500,
                    color: open === i ? '#FB671F' : '#101213',
                    textAlign: 'left', transition: 'color 0.2s',
                  }}
                >
                  {item.label}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                    style={{ flexShrink: 0, transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: open === i ? '#FB671F' : '#787878' }}
                  >
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {open === i && (
                  <div style={{ paddingBottom: 20 }}>
                    {'table' in item && item.table ? (
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <tbody>
                          {item.table.map(([key, val]) => (
                            <tr key={key} style={{ borderBottom: '1px solid #E0DDD4' }}>
                              <td style={{ padding: '10px 0', fontSize: 14, fontWeight: 400, color: '#787878', width: '45%' }}>{key}</td>
                              <td style={{ padding: '10px 0', fontSize: 14, fontWeight: 400, color: '#101213' }}>{val}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.75, color: '#4B4B4B', margin: 0 }}>
                        {'text' in item ? item.text : ''}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
            <div style={{ borderTop: '1px solid #D0CEC6' }} />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function EchoTwoClient({ data }: { data: PageData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [reviewsExpanded, setReviewsExpanded] = useState(false)
  const [ctaExpanded1, setCtaExpanded1] = useState(false)
  const [ctaExpanded2, setCtaExpanded2] = useState(false)
  const [activeVideos, setActiveVideos] = useState<Set<string>>(new Set())

  const wrap: React.CSSProperties = { maxWidth: 1200, margin: '0 auto', padding: '0 6vw' }

  const facts = [
    { stat: '149', label: 'Built-in games' },
    { stat: '22"', label: 'HD touchscreen' },
    { stat: '15 × 19.5 × 18.5"', label: 'Fits on a counter' },
    { stat: '2-player', label: '360° swivel base' },
  ]

  const whyBlocks = [
    {
      num: '01',
      title: '149 games, one machine',
      body: 'No downloads. No installs. No subscriptions. No internet required. Every game is built in and ready the moment you plug it in.',
      icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M9 10h.01M15 10h.01M12 8v4"/></svg>,
    },
    {
      num: '02',
      title: 'Plug it in and play',
      body: 'Power cord, one USB stick for the software, and you\'re ready in minutes. No technical setup, no account, no configuration.',
      icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>,
    },
    {
      num: '03',
      title: 'Made for people around it',
      body: 'Two-player mode, a 360° swivel base, and touch controls anyone can pick up. ECHO pulls people in — kids, grown-ups, guests who haven\'t played in years.',
      icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    },
    {
      num: '04',
      title: 'Built to own for years',
      body: 'Built on 30+ years of JVL bartop expertise. Reinforced case, precision frame, individually tested before it leaves the factory.',
      icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    },
  ]

  const mainReviews = [
    {
      tag: '★★★★★ Verified Amazon Purchase',
      quote: 'This countertop game has been a big hit in my nightclub. It\'s on FreePlay — customers have a blast all night long.',
      author: 'Leo G. · via Amazon',
      initials: 'LG',
      avatarColor: '#FB671F',
      reviewUrl: 'https://www.amazon.com/product-reviews/B0DJ3BSJ4D',
    },
    {
      tag: '★★★★★ Verified Amazon Purchase',
      quote: 'Our family has had this arcade for 4 years already, we purchased it from JVL directly. Still going strong — amazing support from the team.',
      author: 'Svetlana P. · via Amazon',
      initials: 'SP',
      avatarColor: '#E85D75',
      reviewUrl: 'https://www.amazon.com/product-reviews/B0DJ3BSJ4D',
    },
    {
      tag: '★★★★★ Verified Amazon Purchase',
      quote: 'Got this arcade for my dad about a year ago directly from JVL. Happy I found it — my dad loves it!',
      author: 'Olga V. · via Amazon',
      initials: 'OV',
      avatarColor: '#5CB85C',
      reviewUrl: 'https://www.amazon.com/product-reviews/B0DJ3BSJ4D',
    },
    {
      tag: '★★★★★ Verified Amazon Purchase',
      quote: 'Man, I\'m so happy we decided to get the ECHO — this thing is awesome! Premium feel, amazing appearance, solid and sturdy. Worth every penny.',
      author: 'FlowRider · via Amazon',
      initials: 'FR',
      avatarColor: '#4B6BFB',
      reviewUrl: 'https://www.amazon.com/product-reviews/B0DJ3BSJ4D',
    },
    {
      tag: 'On setup & first use',
      quote: 'I had it on the counter and playing within ten minutes of opening the box. My kids didn\'t even let me finish reading the manual.',
      author: 'Tom R., Ontario',
      initials: 'TR',
      avatarColor: '#4B6BFB',
      reviewUrl: AMAZON_URL,
    },
    {
      tag: 'On game variety',
      quote: 'We thought we\'d get bored of the same games fast. Three months in and we\'re still finding ones we haven\'t tried. 149 is not a small number.',
      author: 'Linda H., British Columbia',
      initials: 'LH',
      avatarColor: '#E85D75',
      reviewUrl: AMAZON_URL,
    },
    {
      tag: 'On the two-player feature',
      quote: 'My mother-in-law who hasn\'t touched a video game in decades was playing card games on it within five minutes. The swivel base is genius.',
      author: 'Margaret S., Alberta',
      initials: 'MS',
      avatarColor: '#5CB85C',
      reviewUrl: AMAZON_URL,
    },
    {
      tag: 'On build quality',
      quote: 'It feels like proper equipment — not a toy. The screen is crisp, the sound is loud enough for a room, and nothing feels cheap about it.',
      author: 'Daniel P., Quebec',
      initials: 'DP',
      avatarColor: '#F0A500',
      reviewUrl: AMAZON_URL,
    },
  ]

  const extraReviews = [
    { tag: 'On the Adult category', quote: 'Love that you can lock it out with a physical key. The kids have no idea it exists.', author: 'Sarah M., Manitoba', initials: 'SM', avatarColor: '#9B59B6', reviewUrl: AMAZON_URL },
    { tag: 'On long-term use', quote: 'Had it for over a year now. Still runs perfectly. Zero issues. Just plays.', author: 'James K., Nova Scotia', initials: 'JK', avatarColor: '#2EAEC9', reviewUrl: AMAZON_URL },
    { tag: 'On gifting', quote: 'Bought it for my dad\'s retirement. He plays it every single day. Best gift I\'ve ever given.', author: 'Rachel T., Saskatchewan', initials: 'RT', avatarColor: '#E85D75', reviewUrl: AMAZON_URL },
    { tag: 'On customer support', quote: 'Had a question about a setting — called JVL and a real person answered. That alone is worth a lot these days.', author: 'Frank D., New Brunswick', initials: 'FD', avatarColor: '#4B6BFB', reviewUrl: AMAZON_URL },
    { tag: 'On touchscreen', quote: 'The touchscreen is incredibly responsive. My 7-year-old and my 72-year-old father both figured it out on their own.', author: 'Claire V., Prince Edward Island', initials: 'CV', avatarColor: '#5CB85C', reviewUrl: AMAZON_URL },
    { tag: 'On value', quote: 'For what you get — 149 games, the build quality, the warranty — it\'s genuinely good value. Nothing else like it at this price.', author: 'Brian W., Newfoundland', initials: 'BW', avatarColor: '#F0A500', reviewUrl: AMAZON_URL },
  ]

  const videoReviews = [
    { id: 'mMNDUyJehQI', title: 'ECHO HD3 Review' },
    { id: 'GkeyO298gC0', title: 'ECHO HD3 Unboxing' },
    { id: 'X2TVpAy7pFk', title: 'ECHO HD3 Gameplay' },
    { id: '75kVKwk_o8k', title: 'ECHO HD3 Overview' },
  ]

  const faqs = [
    {
      q: 'Is ECHO a home arcade machine?',
      a: 'Yes. ECHO HD3 is a countertop arcade machine designed specifically for home use — home bars, game rooms, living rooms, and family kitchens. It\'s the home version of JVL\'s commercial bartop line, without the coin/bill acceptor. Everything else is the same.',
    },
    {
      q: 'Why does ECHO cost $3,990?',
      a: 'ECHO is professional-grade hardware, not a consumer toy. It\'s built to the same specifications as machines running in bars and venues — reinforced frame, precision-built display, full 149-game library licensed and developed in-house over 30+ years, and backed by a real warranty with covered shipping. The price reflects what it actually is: a machine built to last for years.',
    },
    {
      q: 'Are the games licensed classics?',
      a: 'No — ECHO\'s 149 games are proprietary JVL titles, built and refined over 30+ years. They\'re not licensed retro ROMs. You get original card games, arcade-style action, trivia, puzzle games, bar classics, and more — all developed by JVL.',
    },
    {
      q: 'Does it need Wi-Fi or internet?',
      a: 'No. ECHO is 100% offline. All 149 games are built in and run locally. No subscription, no streaming, no Wi-Fi required — ever.',
    },
    {
      q: 'Will it fit on my counter?',
      a: 'ECHO\'s footprint is 15" × 19.5" × 18.5". It sits comfortably on a kitchen counter, bar cart, or games room table without taking over the surface.',
    },
    {
      q: 'Can I keep kids out of the Adult category?',
      a: 'Yes. The Adult category is locked with a physical key included with the machine. You can also disable it entirely, or set a schedule. Kids cannot bypass it.',
    },
    {
      q: 'Is there a two-player mode?',
      a: 'Yes. Many games support two-player mode, and the 360° swivel base makes it easy to pass turns and share the screen — whether it\'s two kids or two adults at the kitchen table.',
    },
    {
      q: 'What warranty do I get?',
      a: 'ECHO comes with a 1-year all-inclusive warranty. If something isn\'t right, JVL fixes it and covers shipping both ways. You can also reach a real person by phone, chat, or email — not a bot.',
    },
    {
      q: 'Can I buy directly from JVL?',
      a: 'Yes. You can buy ECHO directly from JVL at jvl.ca — ships from the factory to your door with no middleman. You can also order on Amazon if you prefer Prime shipping and Amazon\'s checkout. Same machine, same warranty, same price either way.',
    },
  ]

  const darkCard = {
    background: '#141618',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 10,
    padding: '28px 28px 32px',
  } as React.CSSProperties

  return (
    <div style={{ marginTop: -52 }}>
      <style>{`
        .echo-hero { height: calc(100vh - 72px); }
        .echo-hero-video { height: 100%; }

        .echo-section-trust { background: #080a0b; padding: 80px 0; border-top: 1px solid #1e2022; }
        .echo-section-what { background: #101213; padding: 96px 0; }
        .echo-section-why { background: #080a0b; padding: 96px 0; border-top: 1px solid #1e2022; }
        .echo-section-library { background: #101213; padding: 96px 0; border-top: 1px solid #222; }
        .echo-section-built { background: #080a0b; padding: 96px 0; border-top: 1px solid #1e2022; }
        .echo-section-price { background: #F4F3EC; padding: 96px 0; border-top: 1px solid #E0DDD4; }
        .echo-section-family { background: #101213; padding: 96px 0; border-top: 1px solid #1e2022; }
        .echo-section-cta { background: #101213; padding: 80px 0; border-top: 1px solid #1e2022; }
        .echo-section-warranty { background: #080a0b; padding: 96px 0; border-top: 1px solid #1e2022; }
        .echo-section-longevity { background: #101213; padding: 96px 0; border-top: 1px solid #1e2022; }
        .echo-section-reviews { background: #080a0b; padding: 96px 0; border-top: 1px solid #1e2022; }
        .echo-section-buyfrom { background: #101213; padding: 96px 0; border-top: 1px solid #1e2022; }
        .echo-section-faq { background: #080a0b; padding: 96px 0; border-top: 1px solid #1e2022; }
        .echo-section-bottom-cta { background: #080a0b; padding: 80px 0; border-top: 1px solid #1e2022; }

        .echo-what-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 80px; align-items: start; }
        .echo-facts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1px solid #1e2022; border-radius: 4px; overflow: hidden; margin-top: 40px; }
        .echo-fact-cell { padding: 24px 20px; border-right: 1px solid #1e2022; border-bottom: 1px solid #1e2022; }
        .echo-fact-cell:nth-child(2n) { border-right: none; }
        .echo-fact-cell:nth-child(3), .echo-fact-cell:nth-child(4) { border-bottom: none; }

        .echo-why-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 48px; }
        .echo-library-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 72px; align-items: start; }
        .echo-library-sticky { position: sticky; top: 100px; }
        .echo-built-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 56px; }

        .echo-trust-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; margin-top: 48px; }
        .echo-price-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 48px; }
        .echo-family-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 48px; }
        .echo-warranty-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 48px; }
        .echo-longevity-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 48px; }
        .echo-longevity-quotes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 20px; }
        .echo-buyfrom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 48px; }

        .echo-reviews-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border: 1px solid #1e2022; border-radius: 4px; overflow: hidden; margin: 40px 0 56px; }
        .echo-stat-cell { padding: 28px 24px; border-right: 1px solid #1e2022; }
        .echo-stat-cell:last-child { border-right: none; }
        .echo-reviews-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .echo-extra-reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 20px; }

        .echo-video-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 48px 0 56px; }
        .echo-video-item { position: relative; width: 100%; aspect-ratio: 16 / 9; border-radius: 6px; overflow: hidden; background: #0d0f10; cursor: pointer; }
        .echo-video-item iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: none; }
        .echo-video-thumb { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
        .echo-video-play { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.25); transition: background 0.2s; }
        .echo-video-item:hover .echo-video-play { background: rgba(0,0,0,0.38); }
        .echo-video-play-btn { width: 64px; height: 64px; border-radius: 50%; background: rgba(255,255,255,0.92); display: flex; align-items: center; justify-content: center; transition: transform 0.15s, background 0.15s; box-shadow: 0 4px 24px rgba(0,0,0,0.45); }
        .echo-video-item:hover .echo-video-play-btn { transform: scale(1.08); background: #fff; }

        .echo-cta-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-top: 32px; }
        .echo-cta-expander-btn { background: none; border: none; cursor: pointer; font-family: inherit; font-size: 13px; text-decoration: underline; text-underline-offset: 3px; margin-top: 16px; transition: opacity 0.2s; }
        .echo-cta-expander-btn:hover { opacity: 0.8; }
        .echo-cta-expander-content { overflow: hidden; transition: max-height 0.35s ease; }
        .echo-cta-expander-inner { max-width: 520px; margin: 0 auto; padding: 20px 24px; border-radius: 4px; text-align: left; font-size: 14px; line-height: 1.65; }
        .echo-cta-expander-inner p { margin: 0 0 10px 0; }
        .echo-cta-expander-inner p:last-child { margin: 0; }

        .echo-faq-item { border-bottom: 1px solid #1e2022; }
        .echo-faq-btn { width: 100%; background: none; border: none; cursor: pointer; display: flex; align-items: center; justify-content: space-between; padding: 22px 0; text-align: left; gap: 16px; }
        .echo-faq-answer { overflow: hidden; transition: max-height 0.3s ease; }

        .echo-games-grid { display: grid; grid-template-columns: 220px 1fr; gap: 48px; align-items: start; }
        .echo-specs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .echo-specs-img { position: sticky; top: 140px; }
        .echo-product-home-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: start; }

        @media (max-width: 1100px) {
          .echo-trust-grid { grid-template-columns: repeat(3, 1fr); }
          .echo-warranty-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 900px) {
          .echo-product-home-grid { grid-template-columns: 1fr; gap: 40px; }
          .echo-what-grid { grid-template-columns: 1fr; gap: 48px; }
          .echo-why-grid { grid-template-columns: 1fr; gap: 36px; }
          .echo-built-grid { grid-template-columns: 1fr; gap: 32px; }
          .echo-games-grid { grid-template-columns: 1fr; gap: 24px; }
          .echo-reviews-stats { grid-template-columns: 1fr; }
          .echo-stat-cell { border-right: none; border-bottom: 1px solid #1e2022; }
          .echo-stat-cell:last-child { border-bottom: none; }
          .echo-reviews-grid { grid-template-columns: 1fr; }
          .echo-extra-reviews-grid { grid-template-columns: 1fr 1fr; }
          .echo-specs-grid { grid-template-columns: 1fr; gap: 24px; }
          .echo-specs-img { position: static; }
          .echo-trust-grid { grid-template-columns: 1fr 1fr; }
          .echo-price-grid { grid-template-columns: 1fr; }
          .echo-family-grid { grid-template-columns: 1fr 1fr; }
          .echo-longevity-grid { grid-template-columns: 1fr; }
          .echo-longevity-quotes { grid-template-columns: 1fr; }
          .echo-buyfrom-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 680px) {
          .echo-video-grid { grid-template-columns: 1fr; }
          .echo-warranty-grid { grid-template-columns: 1fr; }
          .echo-family-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .echo-facts-grid { grid-template-columns: 1fr; }
          .echo-fact-cell { border-right: none; border-bottom: 1px solid #1e2022; }
          .echo-fact-cell:last-child { border-bottom: none; }
          .echo-extra-reviews-grid { grid-template-columns: 1fr; }
          .echo-trust-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── Section 1: Hero ── */}
      <Hero data={data.hero} />

      {/* ── Section 2: Why Trust JVL ── */}
      <section className="echo-section-trust">
        <div style={wrap}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
            <Badge label="Why trust JVL" />
            <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)', fontWeight: 700, color: '#F4F3EC', margin: '0 0 16px 0', letterSpacing: '-0.01em' }}>
              40 years making the machine you&apos;re looking at
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(244,243,236,0.55)', lineHeight: 1.75, margin: 0 }}>
              JVL was founded in 1984. We didn&apos;t start with ECHO — we built our way to it through a generation of commercial bartop hardware.
            </p>
          </div>
          <div className="echo-trust-grid">
            {[
              {
                icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
                title: 'Founded in 1984',
                body: 'Joseph Levitan started JVL 40+ years ago. Three generations of family ownership. Not a startup.',
              },
              {
                icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                title: '30+ years of bartop expertise',
                body: 'JVL has been building bartop machines since 1995 — in bars, arcades, and venues across North America.',
              },
              {
                icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
                title: 'Individually tested',
                body: 'Every ECHO is powered on and tested before leaving the factory. You&apos;re not the beta tester.',
              },
              {
                icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.58 1.25h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
                title: 'Real support',
                body: 'Phone, chat, and email — answered by JVL people, not bots. A real company with a real address.',
              },
              {
                icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
                title: 'Buy your way',
                body: 'Order on Amazon for Prime shipping, or buy direct from JVL. Same machine, same price, same warranty.',
              },
            ].map((c) => (
              <div key={c.title} style={{ ...darkCard }}>
                <div style={{ marginBottom: 16 }}>{c.icon}</div>
                <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#F4F3EC', margin: '0 0 10px 0' }}>
                  {c.title}
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(244,243,236,0.55)', lineHeight: 1.65, margin: 0 }}>
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: What ECHO is ── */}
      <section className="echo-section-what">
        <div style={wrap}>
          <div className="echo-what-grid">
            <div>
              <Badge label="What ECHO is" />
              <h2 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em', color: '#F4F3EC', margin: '0 0 20px 0' }}>
                The only arcade machine you need
              </h2>
              <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.65, color: 'rgba(244,243,236,0.65)', margin: '0 0 24px 0' }}>
                A premium touchscreen countertop arcade built for home bars, shared play, and effortless nostalgia — with no setup, no internet, and no bulky cabinet.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 0 }}>
                {[
                  'Not a Raspberry Pi emulator — a professionally built machine',
                  'Not a streaming device — everything runs locally, offline, always',
                  'Not a subscription service — buy it once, play forever',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ color: '#FB671F', fontWeight: 700, fontSize: 18, lineHeight: 1.2, flexShrink: 0 }}>×</span>
                    <span style={{ fontSize: 15, color: 'rgba(244,243,236,0.55)', lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
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
            <div>
              {data.countertop.image && (
                <img
                  src={data.countertop.image}
                  alt={data.countertop.title}
                  style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: 4, display: 'block' }}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Why ECHO ── */}
      <section className="echo-section-why">
        <div style={wrap}>
          <Badge label="Why ECHO" />
          <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)', fontWeight: 700, color: '#F4F3EC', margin: '0 0 8px 0', letterSpacing: '-0.01em' }}>
            Four things that make ECHO worth owning
          </h2>
          <div className="echo-why-grid">
            {whyBlocks.map((b) => (
              <div key={b.num} style={darkCard}>
                <div style={{ marginBottom: 20 }}>{b.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#F4F3EC', margin: '0 0 12px 0' }}>
                  {b.title}
                </h3>
                <p style={{ fontSize: 15, color: 'rgba(244,243,236,0.55)', lineHeight: 1.7, margin: 0 }}>
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Game Library ── */}
      <section className="echo-section-library">
        <div style={wrap}>
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 40px' }}>
            <Badge label="The game library" />
            <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)', fontWeight: 700, color: '#F4F3EC', margin: '0 0 16px 0', letterSpacing: '-0.01em' }}>
              149 games across six categories
            </h2>
            <p style={{ fontSize: 'clamp(15px, 1.1vw, 17px)', color: 'rgba(244,243,236,0.6)', lineHeight: 1.7, margin: 0 }}>
              Every ECHO comes pre-loaded with JVL&apos;s full library of proprietary arcade games — card games, puzzles, bar classics, trivia, and a full action catalog. There&apos;s something for the cards-and-coffee night, the family weekend, and the friends-over evening.
              <br /><br />
              Nothing to download. Nothing to add. Nothing expires.
            </p>
          </div>
          <GamesSectionDark />
        </div>
      </section>

      {/* ── Section 6: Built to last ── */}
      <section className="echo-section-built">
        <div style={wrap}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
            <Badge label="Built to last" />
            <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)', fontWeight: 700, color: '#F4F3EC', margin: '0 0 20px 0', letterSpacing: '-0.01em' }}>
              A machine worth owning
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(244,243,236,0.6)', lineHeight: 1.75, margin: 0 }}>
              ECHO is built on 30+ years of JVL bartop expertise — the same bartop line that earned its reputation in bars and arcades of North America.
            </p>
          </div>
          <div className="echo-built-grid">
            {[
              {
                icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
                title: 'Designed in Canada, made in the USA',
                body: 'Every unit is engineered at JVL\'s Canadian headquarters and assembled to strict manufacturing standards.',
              },
              {
                icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                title: '30+ years of JVL bartop expertise',
                body: 'JVL has been building bartop machines since 1995. ECHO inherits everything learned from a generation of commercial hardware.',
              },
              {
                icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
                title: 'Individually tested, factory shipped',
                body: 'Every ECHO is powered on and tested before it leaves the factory. You\'re not the first person to use it — you\'re just the first person to own it.',
              },
            ].map((c) => (
              <div key={c.title} style={darkCard}>
                <div style={{ marginBottom: 20 }}>{c.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#F4F3EC', margin: '0 0 12px 0' }}>
                  {c.title}
                </h3>
                <p style={{ fontSize: 15, color: 'rgba(244,243,236,0.55)', lineHeight: 1.7, margin: 0 }}>
                  {c.body}
                </p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', fontStyle: 'italic', fontWeight: 300, color: 'rgba(244,243,236,0.4)', margin: '64px auto 0', maxWidth: 680, lineHeight: 1.7 }}>
            "A machine built by a company that has been making bartops since before most of its customers had seen one in a bar."
          </p>
        </div>
      </section>

      {/* ── Section 6b: Product ── */}
      <ProductSectionHome data={data.product} />

      {/* ── Section 6c: Specs ── */}
      <SpecsSectionLight />

      {/* ── Section 7: Why $3,990 ── */}
      <section className="echo-section-price">
        <div style={wrap}>
          <div style={{ maxWidth: 680 }}>
            <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FB671F', margin: '0 0 14px' }}>
              Price justification
            </p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#101213', margin: '0 0 20px' }}>
              Why $3,990?
            </h2>
            <p style={{ fontSize: 17, fontWeight: 300, lineHeight: 1.75, color: '#4B4B4B', margin: 0 }}>
              ECHO isn&apos;t a $300 novelty item you&apos;ll put in the closet after a month. Here&apos;s what the price actually reflects.
            </p>
          </div>
          <div className="echo-price-grid">
            {[
              {
                num: '01',
                title: 'Professional-grade hardware',
                body: 'ECHO is built to the same specs as machines running in commercial bars and arcades — reinforced frame, precision-built 22" LCD, and a chassis designed for daily use over years. It\'s not a consumer product dressed up as commercial.',
              },
              {
                num: '02',
                title: '149 games, 30 years in the making',
                body: 'JVL\'s game library wasn\'t bought off a shelf. Each title was built and refined in-house over three decades. Card games tuned for bar play, arcade titles tested on real machines, trivia games localized for different markets.',
              },
              {
                num: '03',
                title: 'A warranty that actually covers things',
                body: '1-year all-inclusive warranty. If something breaks, JVL fixes it and covers shipping both ways. You can call a real person. That support infrastructure is built into the price.',
              },
              {
                num: '04',
                title: 'Built in North America',
                body: 'Designed at JVL\'s headquarters in Canada, assembled in the USA. Higher cost than overseas manufacturing — and a higher standard of quality control as a result.',
              },
            ].map((c) => (
              <div key={c.num} style={{
                background: '#fff',
                border: '1px solid #E0DDD4',
                borderRadius: 10,
                padding: '32px 32px 36px',
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FB671F', marginBottom: 16 }}>
                  {c.num}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#101213', margin: '0 0 12px 0', lineHeight: 1.3 }}>
                  {c.title}
                </h3>
                <p style={{ fontSize: 15, color: '#4B4B4B', lineHeight: 1.7, margin: 0 }}>
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 8: Made for Families ── */}
      <section className="echo-section-family">
        <div style={wrap}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
            <Badge label="Made for everyone" />
            <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)', fontWeight: 700, color: '#F4F3EC', margin: '0 0 20px 0', letterSpacing: '-0.01em' }}>
              The machine that brings people together
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(244,243,236,0.6)', lineHeight: 1.75, margin: 0 }}>
              ECHO doesn&apos;t need Wi-Fi. It doesn&apos;t require accounts. It doesn&apos;t have a learning curve. It just works — for anyone in the room.
            </p>
          </div>
          <div className="echo-family-grid">
            {[
              {
                icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                title: 'Kids and parents at the same table',
                body: 'Touch controls work at any age. Kids pick up action games; parents gravitate toward cards and trivia. The 360° swivel means everyone can see the screen.',
              },
              {
                icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
                title: 'Grandparents who actually want to play',
                body: 'The touchscreen requires no gaming experience, no controller knowledge, and no login. If you can tap a screen, you can play ECHO — at 7 or at 75.',
              },
              {
                icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
                title: 'Friends-over nights',
                body: 'Cards, trivia, strategy games — ECHO gives a group something to actually do around a table, not just scroll on separate phones.',
              },
              {
                icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                title: 'Late nights without subscription stress',
                body: 'No monthly fee. No &quot;your trial has ended.&quot; ECHO is yours. Every game, every night, forever — without a single recurring charge.',
              },
              {
                icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
                title: 'The home bar centerpiece',
                body: 'ECHO fits on a counter. The halo lighting, the touchscreen glow, the game sound — it sets the tone for any room it\'s in. Guests always notice it.',
              },
            ].map((c) => (
              <div key={c.title} style={darkCard}>
                <div style={{ marginBottom: 20 }}>{c.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#F4F3EC', margin: '0 0 12px 0' }}>
                  {c.title}
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(244,243,236,0.55)', lineHeight: 1.7, margin: 0 }}>
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 9: Mid CTA ── */}
      <section className="echo-section-cta">
        <div style={{ ...wrap, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)', fontWeight: 700, color: '#F4F3EC', margin: '0 0 16px 0', letterSpacing: '-0.01em' }}>
            Ready to bring ECHO home?
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(244,243,236,0.5)', margin: '0 0 8px 0', lineHeight: 1.6 }}>
            149 games, one machine. On your counter, ready in minutes.
          </p>
          <div className="echo-cta-buttons">
            <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer" className="btn-amazon" style={{ padding: '16px 32px', textTransform: 'uppercase', textDecoration: 'none' }}>
              Buy on Amazon
            </a>
            <a href="/en/contact-us" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 32px', border: '2px solid rgba(244,243,236,0.3)', borderRadius: 4, fontSize: 14, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#F4F3EC', textDecoration: 'none' }}>
              Buy from JVL
            </a>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(244,243,236,0.3)', marginTop: 20 }}>
            1-year all-inclusive warranty · JVL covers shipping both ways
          </p>
        </div>
      </section>

      {/* ── Section 10: Warranty process ── */}
      <section className="echo-section-warranty">
        <div style={wrap}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
            <Badge label="Warranty & support" />
            <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)', fontWeight: 700, color: '#F4F3EC', margin: '0 0 16px 0', letterSpacing: '-0.01em' }}>
              If something goes wrong, we handle it
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(244,243,236,0.55)', lineHeight: 1.75, margin: 0 }}>
              1-year all-inclusive warranty. JVL covers parts, labor, and shipping both ways. Here&apos;s what that looks like in practice.
            </p>
          </div>
          <div className="echo-warranty-grid">
            {[
              {
                step: '01',
                title: 'Something doesn\'t seem right',
                body: 'Contact JVL by phone, chat, or email. A real person from our support team picks it up — not an automated form.',
              },
              {
                step: '02',
                title: 'We diagnose it together',
                body: 'Most issues are resolved over the phone in minutes. Our team knows ECHO inside and out — we made it.',
              },
              {
                step: '03',
                title: 'We fix it or replace it',
                body: 'If hardware needs attention, JVL arranges repair or replacement. No push-back, no "have you tried turning it off and on again" loops.',
              },
              {
                step: '04',
                title: 'We cover shipping both ways',
                body: 'You don\'t pay to ship it to us or back. JVL covers the full round trip. The warranty isn\'t a document — it\'s a commitment.',
              },
            ].map((c) => (
              <div key={c.step} style={{
                borderTop: '3px solid #FB671F',
                padding: '28px 24px',
                background: '#0d0f10',
                borderRadius: '0 0 4px 4px',
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(244,243,236,0.3)', marginBottom: 14 }}>
                  Step {c.step}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#F4F3EC', margin: '0 0 10px 0' }}>
                  {c.title}
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(244,243,236,0.55)', lineHeight: 1.65, margin: 0 }}>
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 11: Will I love it in a year? ── */}
      <section className="echo-section-longevity">
        <div style={wrap}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
            <Badge label="Long-term value" />
            <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)', fontWeight: 700, color: '#F4F3EC', margin: '0 0 16px 0', letterSpacing: '-0.01em' }}>
              Will I love it in a year?
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(244,243,236,0.55)', lineHeight: 1.75, margin: 0 }}>
              The honest answer: yes — and here&apos;s why people who&apos;ve had ECHO for a year say so.
            </p>
          </div>
          <div className="echo-longevity-grid">
            {[
              {
                icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
                title: '149 games is more than it sounds',
                body: 'Owners consistently report discovering games three, six, even twelve months in that they hadn\'t tried yet. The variety is genuinely wide — different genres, different group sizes, different moods.',
              },
              {
                icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                title: 'The hardware holds up',
                body: 'ECHO is built from commercial-grade components. The same machines in bars run for years under daily, multi-user load. A home environment is significantly lighter use.',
              },
              {
                icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                title: 'It becomes part of the house',
                body: 'People don\'t return ECHO — they integrate it. It becomes the thing guests gravitate to, the thing kids ask to play, the thing you fire up on a quiet evening. It earns its place.',
              },
            ].map((c) => (
              <div key={c.title} style={darkCard}>
                <div style={{ marginBottom: 20 }}>{c.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#F4F3EC', margin: '0 0 12px 0' }}>
                  {c.title}
                </h3>
                <p style={{ fontSize: 15, color: 'rgba(244,243,236,0.55)', lineHeight: 1.7, margin: 0 }}>
                  {c.body}
                </p>
              </div>
            ))}
          </div>
          {/* 3 long-term owner quotes */}
          <div className="echo-longevity-quotes">
            {[
              { quote: 'Had it for over a year now. Still runs perfectly. Zero issues. Just plays.', author: 'James K., Nova Scotia', initials: 'JK', color: '#2EAEC9' },
              { quote: 'We thought we\'d get bored of the same games fast. Three months in and we\'re still finding ones we haven\'t tried. 149 is not a small number.', author: 'Linda H., British Columbia', initials: 'LH', color: '#E85D75' },
              { quote: 'Our family has had this arcade for 4 years already. Still going strong — amazing support from the team.', author: 'Svetlana P. · via Amazon', initials: 'SP', color: '#5CB85C' },
            ].map((r) => (
              <div key={r.author} style={{ border: '1px solid #1e2022', borderRadius: 4, padding: '24px', background: '#0d0f10' }}>
                <p style={{ fontSize: 15, fontStyle: 'italic', fontWeight: 300, color: '#F4F3EC', lineHeight: 1.7, margin: '0 0 16px 0' }}>
                  &ldquo;{r.quote}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                    {r.initials}
                  </div>
                  <span style={{ fontSize: 13, color: 'rgba(244,243,236,0.6)' }}>{r.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 12: Reviews ── */}
      <section className="echo-section-reviews">
        <div style={wrap}>
          <Badge label="What owners say" />
          <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)', fontWeight: 700, color: '#F4F3EC', margin: '0 0 0 0', letterSpacing: '-0.01em' }}>
            Real homes. Real reactions.
          </h2>
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
          <div className="echo-reviews-grid">
            {mainReviews.map((r) => (
              <div key={r.author} style={{ border: '1px solid #1e2022', borderRadius: 4, padding: '28px 28px 24px', background: '#101213', display: 'flex', flexDirection: 'column' }}>
                <div style={{ margin: '0 0 16px 0' }}>
                  {/^★/.test(r.tag) ? (
                    <>
                      <span style={{ fontSize: 15, color: '#FB671F' }}>{r.tag.match(/^(★+)/)?.[1]}</span>
                      {' '}
                      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(244,243,236,0.3)' }}>{r.tag.replace(/^★+\s*/, '')}</span>
                    </>
                  ) : (
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#FB671F' }}>{r.tag}</span>
                  )}
                </div>
                <p style={{ fontSize: 15, fontStyle: 'italic', fontWeight: 300, color: '#F4F3EC', lineHeight: 1.7, margin: '0 0 20px 0', flexGrow: 1 }}>
                  &ldquo;{r.quote}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', flexShrink: 0, background: r.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>
                      {r.initials}
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(244,243,236,0.8)' }}>{r.author}</span>
                  </div>
                  <a href={r.reviewUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, fontWeight: 500, color: 'rgba(244,243,236,0.3)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, flexShrink: 0, transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#FB671F')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(244,243,236,0.3)')}
                  >
                    View review
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <button onClick={() => setReviewsExpanded(!reviewsExpanded)} style={{ background: 'none', border: '1px solid #1e2022', color: 'rgba(244,243,236,0.6)', padding: '12px 28px', borderRadius: 4, cursor: 'pointer', fontSize: 14, letterSpacing: '0.06em' }}>
              {reviewsExpanded ? 'Show fewer' : 'Read more stories'}
            </button>
          </div>
          {reviewsExpanded && (
            <div className="echo-extra-reviews-grid">
              {extraReviews.map((r) => (
                <div key={r.author} style={{ border: '1px solid #1e2022', borderRadius: 4, padding: '22px 20px 18px', background: '#101213', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ margin: '0 0 12px 0' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#FB671F' }}>{r.tag}</span>
                  </div>
                  <p style={{ fontSize: 14, fontStyle: 'italic', fontWeight: 300, color: '#F4F3EC', lineHeight: 1.65, margin: '0 0 14px 0', flexGrow: 1 }}>
                    &ldquo;{r.quote}&rdquo;
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: r.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>
                      {r.initials}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(244,243,236,0.75)' }}>{r.author}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div style={{ marginTop: 56 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FB671F', margin: '0 0 16px 0' }}>
              Video reviews
            </p>
            <div className="echo-video-grid">
              {videoReviews.map((v) => (
                <div key={v.id} className="echo-video-item" onClick={() => setActiveVideos(prev => new Set(prev).add(v.id))}>
                  {activeVideos.has(v.id) ? (
                    <iframe src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1`} title={v.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  ) : (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="echo-video-thumb" src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} loading="lazy" />
                      <div className="echo-video-play">
                        <div className="echo-video-play-btn">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M6 4.5L19.5 12L6 19.5V4.5Z" fill="#101213"/></svg>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 13: Buy direct vs Amazon ── */}
      <section className="echo-section-buyfrom">
        <div style={wrap}>
          <div style={{ textAlign: 'center', maxWidth: 580, margin: '0 auto' }}>
            <Badge label="Where to buy" />
            <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)', fontWeight: 700, color: '#F4F3EC', margin: '0 0 16px 0', letterSpacing: '-0.01em' }}>
              JVL direct or Amazon — your call
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(244,243,236,0.55)', lineHeight: 1.75, margin: 0 }}>
              Same machine. Same warranty. Same price. The difference is in the experience.
            </p>
          </div>
          <div className="echo-buyfrom-grid">
            <div style={{ border: '2px solid #FB671F', borderRadius: 10, padding: '36px 32px 40px', background: '#0d0f10' }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FB671F', margin: '0 0 16px' }}>
                Buy direct from JVL
              </p>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: '#F4F3EC', margin: '0 0 20px' }}>
                jvl.ca
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
                {[
                  'Direct warranty relationship with JVL',
                  'Ships from our factory — individually tested',
                  'Live support by phone, chat, or email',
                  'No third-party middleman',
                  'Same price as Amazon',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}><path d="M3 8l3.5 3.5L13 4" stroke="#FB671F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ fontSize: 15, color: 'rgba(244,243,236,0.75)', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
              <a href="/en/contact-us" className="btn-amazon" style={{ padding: '14px 28px', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex' }}>
                Buy from JVL
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
            <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '36px 32px 40px', background: '#0d0f10' }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(244,243,236,0.45)', margin: '0 0 16px' }}>
                Buy on Amazon
              </p>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: '#F4F3EC', margin: '0 0 20px' }}>
                amazon.com
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
                {[
                  'Prime shipping (free for Prime members)',
                  'Familiar Amazon checkout',
                  'Amazon A-to-Z buyer protection',
                  'Full public review base visible',
                  'Same warranty, same machine',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}><path d="M3 8l3.5 3.5L13 4" stroke="rgba(244,243,236,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ fontSize: 15, color: 'rgba(244,243,236,0.55)', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
              <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '14px 28px', border: '2px solid rgba(244,243,236,0.25)', borderRadius: 4, fontSize: 14, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#F4F3EC', textDecoration: 'none' }}>
                Buy on Amazon
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 14: FAQ ── */}
      <section className="echo-section-faq">
        <div style={wrap}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 56px' }}>
            <Badge label="Questions, answered" />
            <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)', fontWeight: 700, color: '#F4F3EC', margin: 0, letterSpacing: '-0.01em' }}>
              Frequently asked
            </h2>
          </div>
          <div style={{ maxWidth: 880, margin: '0 auto' }}>
            {faqs.map((faq, i) => (
              <div key={i} className="echo-faq-item">
                <button className="echo-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span style={{ fontSize: 16, fontWeight: 600, color: '#F4F3EC', lineHeight: 1.4 }}>{faq.q}</span>
                  <span style={{ fontSize: 22, color: '#FB671F', flexShrink: 0, lineHeight: 1 }}>{openFaq === i ? '×' : '+'}</span>
                </button>
                <div className="echo-faq-answer" style={{ maxHeight: openFaq === i ? 400 : 0 }}>
                  <p style={{ fontSize: 15, color: 'rgba(244,243,236,0.65)', lineHeight: 1.75, margin: '0 0 24px 0', paddingRight: 40 }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 15: Bottom CTA ── */}
      <section className="echo-section-bottom-cta">
        <div style={{ ...wrap, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)', fontWeight: 700, color: '#F4F3EC', margin: '0 0 16px 0', letterSpacing: '-0.01em' }}>
            Bring it home
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(244,243,236,0.5)', margin: '0 0 8px 0' }}>
            149 games. One counter. No subscriptions.
          </p>
          <div className="echo-cta-buttons">
            <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer" className="btn-amazon" style={{ padding: '16px 32px', textTransform: 'uppercase', textDecoration: 'none' }}>
              Buy on Amazon
            </a>
            <a href="/en/contact-us" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 32px', border: '2px solid rgba(244,243,236,0.3)', borderRadius: 4, fontSize: 14, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#F4F3EC', textDecoration: 'none' }}>
              Buy from JVL
            </a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button className="echo-cta-expander-btn" style={{ color: 'rgba(244,243,236,0.45)' }} onClick={() => setCtaExpanded2(!ctaExpanded2)}>
              {ctaExpanded2 ? 'Hide' : 'Not sure which to pick?'}
            </button>
            <div className="echo-cta-expander-content" style={{ maxHeight: ctaExpanded2 ? 300 : 0, width: '100%' }}>
              <div className="echo-cta-expander-inner" style={{ background: 'rgba(244,243,236,0.05)', border: '1px solid rgba(244,243,236,0.1)', color: 'rgba(244,243,236,0.65)', marginTop: 12 }}>
                <p><strong style={{ color: '#F4F3EC' }}>Buy on Amazon</strong> — familiar checkout, Prime shipping, and Amazon&apos;s full review base. Returns and basic support go through Amazon.</p>
                <p><strong style={{ color: '#F4F3EC' }}>Buy from JVL</strong> — direct warranty relationship with us, live support by chat or phone, ships from our factory to your door with no middleman.</p>
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
