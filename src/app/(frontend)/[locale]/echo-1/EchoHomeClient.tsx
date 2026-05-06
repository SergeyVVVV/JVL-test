'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  Truck, RotateCcw, ShieldCheck, Phone, Zap, Power, Users, Shield,
  Puzzle, Spade, HelpCircle, Gamepad2, Swords,
} from 'lucide-react'

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
  const mobileVideoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
    mobileVideoRef.current?.play().catch(() => {})
  }, [])

  return (
    <section className="echo-hero" style={{ position: 'relative', width: '100%', background: '#080a0b', overflow: 'hidden' }}>
      {/* Poster */}
      {data.desktopPoster && (
        <img src={data.desktopPoster} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      )}

      {/* Desktop video — only gets echo-hero-video-desk (hidden on mobile) when a mobile video also exists */}
      {data.desktopVideo && (
        <video
          ref={videoRef}
          src={data.desktopVideo}
          poster={data.desktopPoster ?? undefined}
          autoPlay muted loop playsInline
          className={`echo-hero-video${data.mobileVideo ? ' echo-hero-video-desk' : ''}`}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}

      {/* Mobile video */}
      {data.mobileVideo && (
        <video
          ref={mobileVideoRef}
          src={data.mobileVideo}
          poster={data.mobilePoster ?? undefined}
          autoPlay muted loop playsInline
          className="echo-hero-video echo-hero-video-mob"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}

      {/* Gradient overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.0) 70%)' }} />

      {/* Headline */}
      <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, padding: '0 5vw', maxWidth: 760 }}>
        <h1 className="echo-hero-h1" style={{
          fontFamily: 'inherit',
          fontSize: 'clamp(2.2rem, 4vw, 4.2rem)',
          fontWeight: 400,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: '#fff',
          margin: '0 0 20px 0',
        }}>
          The classics, back{' '}
          <em style={{ fontStyle: 'italic', color: '#FB671F' }}>where they belong</em>
        </h1>
        <p style={{
          fontSize: 'clamp(15px, 1.3vw, 18px)',
          color: 'rgba(244,243,236,0.75)',
          lineHeight: 1.6,
          margin: '0 0 24px 0',
          maxWidth: 660,
        }}>
          Echo HD3 – a premium 22-inch touchscreen bartop arcade with 149 pre-installed games. Built for home.
        </p>

        {/* Trust chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['Plug and Play', 'No Wi-Fi Needed', '1-Year Warranty', 'Made in the USA'].map(chip => (
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

      {/* Bottom bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.15)' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 5vw', paddingBottom: 'max(16px, env(safe-area-inset-bottom, 16px))', maxWidth: 1440, margin: '0 auto', width: '100%' }}>
          {/* Controls */}
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <button
              onClick={() => {
                const vd = videoRef.current
                const vm = mobileVideoRef.current
                if (playing) { vd?.pause(); vm?.pause() } else { vd?.play(); vm?.play() }
                setPlaying(!playing)
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', padding: 0, display: 'flex' }}
            >
              {playing
                ? <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                : <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              }
            </button>
            <button
              onClick={() => {
                const newMuted = !muted
                if (videoRef.current) videoRef.current.muted = newMuted
                if (mobileVideoRef.current) mobileVideoRef.current.muted = newMuted
                setMuted(newMuted)
              }}
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
              href={data.buttonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-amazon"
              style={{ padding: '14px 28px', textTransform: 'uppercase' }}
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
  price: '$3,990',
  features: [
    { icon: 'shipping',  text: 'FREE Prime Shipping' },
    { icon: 'return',    text: 'FREE 30-day refund/replacement' },
    { icon: 'warranty',  text: '1-year warranty' },
    { icon: 'support',   text: '1-year support' },
    { icon: 'amazon',    text: 'Secure Amazon checkout' },
  ],
  payOverTime: 'Pay over time — up to 24 months, 0% APR',
}

const GALLERY_THUMBS = [
  { src: '/api/storage/3797/jvl-echo-frontside-view.png', alt: 'JVL Echo HD3 — front view' },
  { src: '/api/storage/3797/jvl-echo-backside-view.png', alt: 'JVL Echo HD3 — back view' },
  { src: '/api/storage/3797/jvl-echo-frontside-view-racing-game.png', alt: 'JVL Echo HD3 — racing game' },
  { src: '/api/storage/3797/jvl-echo-speakers.png', alt: 'JVL Echo HD3 — speakers' },
  { src: '/api/storage/3797/jvl-echo-speakers-1.png', alt: 'JVL Echo HD3 — speakers detail' },
  { src: '/api/storage/3797/jvl-echo-metal-emblem.png', alt: 'JVL Echo HD3 — metal emblem' },
]

function Icon({ type }: { type: string }) {
  const p = { size: 18, strokeWidth: 1.75, color: '#6B6B6B', flexShrink: 0 } as const
  if (type === 'shipping') return <Truck {...p} />
  if (type === 'return')   return <RotateCcw {...p} />
  if (type === 'warranty') return <ShieldCheck {...p} />
  if (type === 'support')  return <Phone {...p} />
  if (type === 'amazon')   return (
    <svg width="18" height="18" viewBox="0 0 191 197" fill="none" style={{ flexShrink: 0 }} xmlns="http://www.w3.org/2000/svg">
      <path d="M166.954 161.47C85.9942 200 35.7498 167.763 3.58669 148.183C1.59645 146.949 -1.78626 148.472 1.14871 151.843C11.8638 164.835 46.9796 196.15 92.8158 196.15C138.684 196.15 165.971 171.123 169.384 166.757C172.775 162.428 170.38 160.04 166.953 161.47H166.954ZM189.691 148.913C187.517 146.082 176.471 145.554 169.52 146.408C162.557 147.238 152.107 151.493 153.015 154.048C153.481 155.005 154.433 154.575 159.216 154.145C164.012 153.667 177.447 151.971 180.247 155.631C183.06 159.316 175.962 176.87 174.666 179.701C173.413 182.533 175.144 183.263 177.497 181.377C179.817 179.492 184.017 174.611 186.836 167.703C189.636 160.758 191.344 151.069 189.691 148.913Z" fill="#FF9900"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M112.518 82.8499C112.518 92.9595 112.773 101.391 107.663 110.369C103.539 117.669 97.0058 122.158 89.7065 122.158C79.7422 122.158 73.9392 114.566 73.9392 103.362C73.9392 81.2435 93.7569 77.2292 112.518 77.2292V82.8499ZM138.686 146.1C136.971 147.633 134.489 147.743 132.555 146.721C123.941 139.567 122.408 136.246 117.664 129.421C103.43 143.947 93.3561 148.29 74.8885 148.29C53.0629 148.29 36.0547 134.822 36.0547 107.851C36.0547 86.7919 47.4791 72.4479 63.7195 65.4409C77.8081 59.2355 97.4805 58.1408 112.518 56.426V53.0679C112.518 46.8994 112.992 39.6001 109.379 34.2718C106.203 29.4904 100.145 27.5194 94.8155 27.5194C84.9251 27.5194 76.0925 32.5923 73.9392 43.1036C73.5007 45.44 71.7859 47.7395 69.4502 47.8488L44.2664 45.1485C42.15 44.673 39.8144 42.9582 40.3983 39.7094C46.2013 9.19802 73.7561 0 98.4283 0C111.057 0 127.553 3.35809 137.518 12.9208C150.146 24.7091 148.941 40.4394 148.941 57.5569V97.9963C148.941 110.15 153.978 115.478 158.722 122.048C160.401 124.384 160.766 127.195 158.649 128.946C153.357 133.362 143.941 141.575 138.758 146.174L138.685 146.1" fill="#6B6B6B"/>
    </svg>
  )
  return null
}

function GalleryViewer() {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const mainSrc = GALLERY_THUMBS[active]?.src

  // Close lightbox on Escape
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <>
      <div className="echo-gallery-viewer">
        {/* Thumbnails column → horizontal strip on mobile */}
        <div className="echo-gallery-thumbs">
          {GALLERY_THUMBS.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: 64, height: 64, border: active === i ? '2px solid #101213' : '1px solid #E0DDD4',
                borderRadius: 4, background: '#F4F3EC', cursor: 'pointer', padding: 0, overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.src} alt={t.alt} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </button>
          ))}
        </div>
        {/* Main image */}
        <div
          className="echo-gallery-main"
          onClick={() => mainSrc && setLightbox(true)}
          style={{
            background: '#F0EEE6', borderRadius: 6, overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: mainSrc ? 'zoom-in' : 'default', position: 'relative',
          }}
        >
          {mainSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={mainSrc} alt="JVL Echo HD3" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && mainSrc && (
        <div
          onClick={() => setLightbox(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mainSrc}
            alt="JVL Echo HD3"
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: 4, cursor: 'default' }}
          />
          <button
            onClick={() => setLightbox(false)}
            style={{
              position: 'absolute', top: 20, right: 24,
              background: 'none', border: 'none', color: '#fff',
              fontSize: 32, lineHeight: 1, cursor: 'pointer', padding: 4, opacity: 0.7,
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </>
  )
}

function ProductSectionHome({ data }: { data: PageData['product'] }) {
  return (
    <section style={{ background: '#F4F3EC', padding: '80px 0', borderTop: '1px solid #E0DDD4' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 6vw' }}>
        {/* Badge + Title + Subtitle */}
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 48px' }}>
          <Badge label="Bring ECHO Home" />
          <h2 style={{
            fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 700,
            letterSpacing: '-0.02em', lineHeight: 1.15, color: '#101213',
            margin: '0 0 16px',
          }}>
            A premium arcade machine, ready for your home
          </h2>
          <p style={{ fontSize: 17, color: '#6B6B6B', lineHeight: 1.65, margin: 0 }}>
            Order the free-play ECHO Touchscreen Bartop — with Prime shipping, flexible payment options, and JVL warranty support.
          </p>
        </div>

        <div className="echo-product-home-grid">
          {/* Amazon-style gallery */}
          <GalleryViewer />

          {/* Details */}
          <div>
            <div style={{ borderTop: '1px solid #E0DDD4' }}>
              {HOME_PRODUCT.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0', borderBottom: '1px solid #E0DDD4' }}>
                  <Icon type={f.icon} />
                  <span style={{ fontSize: 16, color: '#4B4B4B' }}>{f.text}</span>
                </div>
              ))}
            </div>

            {/* Price + CTA */}
            <div style={{ marginTop: 24 }}>
              <div className="echo-price-cta-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                <div className="echo-price-tag" style={{ fontSize: 36, fontWeight: 600, color: '#101213', flexShrink: 0 }}>
                  {HOME_PRODUCT.price}
                </div>
                <a
                  href={data.buttonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-amazon"
                  style={{ padding: '16px 32px', textTransform: 'uppercase', whiteSpace: 'nowrap', textDecoration: 'none' }}
                >
                  Explore on Amazon
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
              <p className="echo-pay-over-time" style={{ fontSize: 13, color: '#9B9890', margin: '8px 0 0', lineHeight: 1.5, textAlign: 'right' }}>
                {HOME_PRODUCT.payOverTime}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Game Categories Data ─────────────────────────────────────────────────────

const GAME_CATEGORIES = [
  {
    label: 'Action',
    img: '/api/storage/3458/Action.jpg',
    video: '/api/storage/3796/arcades.mp4',
    desc: 'Dive into the fan-favorite Gone Fishing, outmaneuver opponents in Bumper Wars, battle crazy creatures in Monster Mash, and crush levels in Bonbon Deluxe.',
    icon: <Zap size={22} strokeWidth={1.75} />,
  },
  {
    label: 'Cards',
    img: '/api/storage/3462/Cards.jpg',
    video: '/api/storage/3796/cards.mp4',
    desc: "From casinos to coffee tables, card games never go out of style! Hit 21 in Blackjack, go all-in with Texas Hold'em, or keep it classic with Solitaire.",
    icon: <Spade size={22} strokeWidth={1.75} />,
  },
  {
    label: 'Puzzle',
    img: '/api/storage/3464/Puzzle.jpg',
    video: '/api/storage/3796/puzzle.mp4',
    desc: 'Challenge your brain in classic logic games like Sudoku, Mine Sweeper, and Mahjong. Perfect for solo challenges or friendly competition.',
    icon: <Puzzle size={22} strokeWidth={1.75} />,
  },
  {
    label: 'Strategy',
    img: '/api/storage/3460/Strategy.jpg',
    video: '/api/storage/3461/Strategy.mp4',
    desc: 'ECHO is packed with timeless strategy games! Outmaneuver rivals in Backgammon and Battle Ships, or dive into classic match-3 and math games.',
    icon: <Swords size={22} strokeWidth={1.75} />,
  },
  {
    label: 'Quiz',
    img: '/api/storage/3466/Quiz.jpg',
    video: '/api/storage/3796/trivia.mp4',
    desc: "Whether you're a trivia master or a word wizard, ECHO's quiz games will put your skills to the test! Answer exciting questions in Double Quiz or build winning words in Word Chase.",
    icon: <HelpCircle size={22} strokeWidth={1.75} />,
  },
  {
    label: 'Adult',
    img: '/api/storage/3468/Erotic.jpg',
    video: null,
    desc: 'For those who like it hot, ECHO offers a fun selection of spicy, adult-themed games. You can easily enable, disable, or schedule access to adult content in the settings.',
    icon: <Shield size={22} strokeWidth={1.75} />,
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
      {/* Stats row */}
      <div className="echo-games-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '1px solid #1e2022', borderRadius: 4, overflow: 'hidden', marginBottom: 56 }}>
        {[
          { value: '149',         label: 'BUILT-IN GAMES' },
          { value: '1–2 Players', label: 'TOURNAMENTS AND LEADERBOARDS' },
          { value: 'Instant Play', label: 'NO DOWNLOADS & SUBSCRIPTIONS' },
          { value: 'All Ages',    label: 'FUN FOR EVERY GENERATION' },
        ].map((s, i) => (
          <div key={s.label} style={{
            padding: '24px 20px',
            borderRight: i < 3 ? '1px solid #1e2022' : 'none',
          }}>
            <div style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)', fontWeight: 700, color: '#F4F3EC', lineHeight: 1.1 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: 'rgba(244,243,236,0.5)', marginTop: 6, letterSpacing: '0.04em' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Category tabs + video */}
      <div className="echo-games-grid">
        {/* Left: category list */}
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
                transition: 'color 0.2s', textAlign: 'left',
                fontFamily: 'inherit',
              }}
            >
              <span style={{ flexShrink: 0 }}>{c.icon}</span>
              <span style={{ fontSize: 18, fontWeight: activeTab === i ? 600 : 400 }}>{c.label}</span>
            </button>
          ))}

          {/* Parental control callout — only when Adult is active */}
          {GAME_CATEGORIES[activeTab].label === 'Adult' && (
            <div style={{
              marginTop: 20,
              padding: '14px 16px',
              background: 'rgba(244,243,236,0.04)',
              borderLeft: '3px solid #FB671F',
              borderRadius: '0 4px 4px 0',
            }}>
              <p style={{ fontSize: 13, color: 'rgba(244,243,236,0.6)', lineHeight: 1.65, margin: 0 }}>
                <strong style={{ color: '#F4F3EC', fontWeight: 600, display: 'block' }}>Full parental control.</strong>
                The Adult category can be turned off, scheduled, or locked with a physical key.
              </p>
            </div>
          )}
        </div>

        {/* Right: video + description */}
        <div>
          <div style={{ position: 'relative', borderRadius: 6, overflow: 'hidden', marginBottom: 20, background: '#000', aspectRatio: '16 / 9' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cat.img} alt={cat.label} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: playing ? 0 : 1, transition: 'opacity 0.2s' }} />
            {cat.video && (
              <video
                ref={videoRef}
                src={cat.video}
                controls
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', opacity: playing ? 1 : 0, transition: 'opacity 0.2s' }}
              />
            )}
            {cat.video && !playing && (
              <button
                onClick={() => { setPlaying(true); videoRef.current?.play() }}
                style={{
                  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                  background: 'rgba(251,103,31,0.85)', backdropFilter: 'blur(6px)',
                  border: '3px solid rgba(255,255,255,0.25)', cursor: 'pointer', borderRadius: '50%',
                  width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
                  transition: 'transform 0.15s, background 0.15s',
                }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 3 }}><path d="M8 5v14l11-7z"/></svg>
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

// ─── Timeline ────────────────────────────────────────────────────────────────

const TIMELINE = [
  { year: 'Present', name: 'ECHO HD3',    img: '/api/storage/3442/jvl-echo-countertop-arcade-racing-game.jpg', desc: "JVL's most advanced countertop yet — available in both Home and Commercial versions. Featuring a powerful new APU, crystal-clear audio, and a seamless P-CAP touchscreen." },
  { year: '2010',    name: 'ECHO HD2',    img: '/api/storage/3432/jvl-hd2-puzzle-game-touchscreen-display.jpg', desc: 'A classic with a full touchscreen interface and vibrant true HD display. Boasting an incredible 149-game collection, ECHO HD2 set a new standard for variety and replay value.' },
  { year: '2008',    name: 'Encore',      img: '/api/storage/3433/jvl-encore-bartop-machine.jpg', desc: "JVL's first high-definition touchscreen. With 12 true HD 3D games, an intuitive interface, hi-fi sound, and support for streaming music, ENCORE combined cutting-edge gameplay with multi-sensory appeal." },
  { year: '2006',    name: 'Retro',       img: '/api/storage/3434/Retro.jpg', desc: 'A bold blend of vintage style and modern tech, RETRO delivered standout performance with nostalgic flair. It quickly became a favorite among operators and players alike.' },
  { year: '2005',    name: 'Vortex',      img: '/api/storage/3435/Vortex.jpg', desc: "A sleek, compact unit with JVL's unique Power Pad for touch or button play. Paired with the iTouch8 software and 130 games, VORTEX offered unmatched versatility and standout performance for any venue." },
  { year: '2004',    name: 'Eclipse',     img: '/api/storage/3436/Eclipse.jpg', desc: 'A durable, flash-based touchscreen with no moving parts, ECLIPSE offered over 100 games and a crisp 15" swivel LCD. Known for its reliability it became a favorite in both home gamerooms and commercial settings.' },
  { year: '2003',    name: 'Orion',       img: '/api/storage/3444/Orion_2.jpg', desc: 'An upright unit that redefined touchscreen gaming with its sleek design, 19" display, and powerful audio. 80 games and built for both national and local tournaments.' },
  { year: '2001',    name: 'Conquest',    img: '/api/storage/3438/Conquest.jpg', desc: 'As the first North American countertop to feature real-time online rankings, CONQUEST powered the groundbreaking Touch & Win network. It set a new standard for connected gameplay.' },
  { year: '1999',    name: 'Concorde 3',  img: '/api/storage/3439/Concorde-3.jpg', desc: 'With fast CD-ROM upgrades, Pentium-class speed, and 60+ games, C3 delivered top-tier performance and reliability — earning strong praise from operators across North America.' },
  { year: '1997',    name: 'Concorde 2',  img: '/api/storage/3440/Concorde-2.jpg', desc: 'With 54 new games, 2-player support, and customizable settings, Concorde 2 delivered a flexible, high-performance upgrade built for competitive play and operator success.' },
  { year: '1995',    name: 'Concorde 1',  img: '/api/storage/3441/Concorde-1.jpg', desc: "JVL's first CD-ROM touchscreen, Concorde 1 set new standards with 42 games, sharp graphics, and dual cash inputs. Built on global R&D and real operator feedback, it became a breakout hit." },
]

function TimelineBlock() {
  const [active, setActive] = useState(0)
  const item = TIMELINE[active]
  return (
    <div style={{
      background: '#101213',
      borderTop: '1px solid #1e2022',
      marginTop: 80,
    }}>
      {/* Subheading */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 6vw 0', textAlign: 'center' }}>
        <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FB671F', margin: '0 0 12px' }}>Echo Evolution</p>
      </div>
      {/* Product display */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 6vw 0' }}>
        <div className="echo-legacy-grid">
          <div className="echo-legacy-text">
            <h3 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#F4F3EC', margin: '0 0 16px' }}>
              {item.name}
            </h3>
            <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.75, color: 'rgba(244,243,236,0.6)', margin: 0 }}>
              {item.desc}
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', minHeight: 340 }}>
            <img key={item.year} src={item.img} alt={`JVL ${item.name}`} style={{ maxHeight: 340, maxWidth: '100%', objectFit: 'contain', display: 'block' }} />
          </div>
        </div>
      </div>
      {/* Timeline bar */}
      <div style={{ marginTop: 24, borderTop: '1px solid rgba(244,243,236,0.12)', background: 'rgba(0,0,0,0.35)', paddingBottom: 20 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 6vw' }}>
          <div style={{ display: 'flex', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {TIMELINE.map((t, i) => (
              <button
                key={t.year}
                onClick={() => setActive(i)}
                className="echo-timeline-btn"
                style={{
                  flex: '0 0 calc(100% / 11)', minWidth: 80,
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '20px 0', fontSize: 14,
                  fontWeight: active === i ? 700 : 400,
                  color: active === i ? '#FB671F' : 'rgba(244,243,236,0.45)',
                  borderTop: `2px solid ${active === i ? '#FB671F' : 'transparent'}`,
                  transition: 'color 0.2s, border-color 0.2s',
                  textAlign: 'center', letterSpacing: '0.01em', marginTop: -1,
                  fontFamily: 'inherit',
                }}
              >
                {t.year}
              </button>
            ))}
          </div>
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
        {/* Heading */}
        <div style={{ marginBottom: 52 }}>
          <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FB671F', margin: '0 0 14px' }}>
            Technical Details
          </p>
          <h2 style={{
            fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: '#101213',
            maxWidth: 700,
            margin: '0 0 20px',
          }}>
            Product Specifications
          </h2>
          <p style={{ fontSize: 17, fontWeight: 300, lineHeight: 1.75, color: '#4B4B4B', margin: 0, maxWidth: 560 }}>
            Compact enough for a home bar or game room, engineered for years of everyday play.
          </p>
        </div>

        {/* Two-col: image left, accordion right */}
        <div className="echo-specs-grid">
          {/* Sticky image */}
          <div className="echo-specs-img">
            <img
              key={Math.max(open, 0)}
              src={SPECS_ITEMS[Math.max(open, 0)].img}
              alt={SPECS_ITEMS[Math.max(open, 0)].label}
              style={{ width: '100%', display: 'block', borderRadius: 4 }}
            />
          </div>

          {/* Accordion */}
          <div>
            {SPECS_ITEMS.map((item, i) => (
              <div key={item.label} style={{ borderTop: '1px solid #D0CEC6' }}>
                <button
                  onClick={() => setOpen(i === open ? -1 : i)}
                  style={{
                    width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '18px 0',
                    fontSize: 15, fontWeight: 500,
                    color: open === i ? '#FB671F' : '#101213',
                    textAlign: 'left',
                    transition: 'color 0.2s',
                  }}
                >
                  {item.label}
                  <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    style={{ flexShrink: 0, transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: open === i ? '#FB671F' : '#787878' }}
                  >
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <div className="echo-specs-answer" style={{ maxHeight: open === i ? 600 : 0 }}>
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
                </div>
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

export default function EchoHomeClient({ data }: { data: PageData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [ctaExpanded1, setCtaExpanded1] = useState(false)
  const [ctaExpanded2, setCtaExpanded2] = useState(false)
  const [activeVideos, setActiveVideos] = useState<Set<string>>(new Set())
  const [reviewsExpanded, setReviewsExpanded] = useState(false)

  const wrap: React.CSSProperties = {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 5vw',
  }

  // ─── Section 2 Facts ────────────────────────────────────────────────────────
  const facts = [
    { stat: "Plug'n'Play", label: 'No setup needed', small: false },
    { stat: '149', label: 'Built-in games', small: false },
    { stat: '22"', label: 'HD Touchscreen', small: false },
    { stat: 'Compact', label: 'Fits on a counter', small: false },
  ]

  const featureCards = [
    { label: 'Compact Footprint', desc: 'Fits any premium interior — modern or classic. Compact and sleek, designed specifically for bartops and countertops.', img: '/api/storage/3409/jvl-echo-game-room-entertainment-system.jpg' },
    { label: '22" HD Touchscreen', desc: 'A brilliant 22" high-definition touchscreen. No joysticks, no trackballs.', img: '/api/storage/3410/jvl-echo-touchscreen-game-selection-menu.jpg' },
    { label: 'Immersive Audio', desc: '25-watt, 4-speaker high-fidelity sound system with a dedicated subwoofer.', img: '/api/storage/3414/jvl-echo-speaker-led-lighting-detail.jpg' },
    { label: '1 & 2-Player Modes', desc: 'Enjoy solo play or head-to-head matchups in 2-player mode.', img: '/api/storage/3412/2_player_modes.jpg' },
    { label: 'Tournaments & Leaderboards', desc: 'Host tournaments, track high scores, and battle for the Hall of Fame.', img: '/api/storage/3413/Leaderboards.jpg' },
  ]

  // ─── Section 3 Why blocks ───────────────────────────────────────────────────
  const USE_CASES = [
    { label: 'Family Time',   img: '/api/storage/3795/m2_1.png?w=1600&f=webp&q=78',  imgMob: '/api/storage/3795/m2_1mob.png?w=800&f=webp&q=78',  headline: 'Everyone can join in',           text: 'Tap, choose a game, and take turns – kids, parents, and grandparents.' },
    { label: 'Game Night',    img: '/api/storage/3795/m2_2.png?w=1600&f=webp&q=78',  imgMob: '/api/storage/3795/m2_2mob.png?w=800&f=webp&q=78',  headline: 'Game night starts here',         text: 'One game turns into one more round, one more laugh, one more turn.' },
    { label: 'Nostalgia',     img: '/api/storage/3795/m2_3.png?w=1600&f=webp&q=78',  imgMob: '/api/storage/3795/m2_3mob.png?w=800&f=webp&q=78',  headline: 'The arcade feeling, at home',    text: 'Familiar bar-top fun, made simpler and cleaner for your home.' },
    { label: 'Guests',        img: '/api/storage/3795/m2_4.png?w=1600&f=webp&q=78',  imgMob: '/api/storage/3795/m2_4mob.png?w=800&f=webp&q=78',  headline: 'The room finds its center',      text: 'Place ECHO in the room, and people naturally gather around it.' },
    { label: 'Head-to-Head',  img: '/api/storage/3795/m2_5.png?w=1600&f=webp&q=78',  imgMob: '/api/storage/3795/m2_5mob.png?w=800&f=webp&q=78',  headline: 'Settle the score',               text: 'No remotes, no setup – just tap, play, and see who still has it.' },
  ]
  const [ucActive, setUcActive] = useState(0)
  const [ucFading, setUcFading] = useState(false)
  const [ucDisplayed, setUcDisplayed] = useState(0)
  const ucActiveRef = useRef(0)
  const ucIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const ucSectionRef = useRef<HTMLElement>(null)

  function ucStartAutoPlay() {
    if (ucIntervalRef.current) clearInterval(ucIntervalRef.current)
    ucIntervalRef.current = setInterval(() => {
      const next = (ucActiveRef.current + 1) % USE_CASES.length
      ucActiveRef.current = next
      setUcFading(true)
      setTimeout(() => { setUcDisplayed(next); setUcActive(next); setUcFading(false) }, 280)
    }, 3000)
  }

  function ucStopAutoPlay() {
    if (ucIntervalRef.current) { clearInterval(ucIntervalRef.current); ucIntervalRef.current = null }
  }

  useEffect(() => {
    const section = ucSectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { ucStartAutoPlay() } else { ucStopAutoPlay() } },
      { threshold: 0.3 }
    )
    observer.observe(section)
    return () => { observer.disconnect(); ucStopAutoPlay() }
  }, [])

  function ucSwitchTo(i: number) {
    if (i === ucActiveRef.current) return
    ucActiveRef.current = i
    setUcFading(true)
    setTimeout(() => { setUcDisplayed(i); setUcActive(i); setUcFading(false) }, 280)
    ucStopAutoPlay()
  }
  const ucItem = USE_CASES[ucDisplayed]

  const whyBlocks = [
    {
      num: '01',
      title: '149 games, one machine',
      body: 'No downloads. No installs. No subscriptions. No internet required. Every game is built in and ready the moment you plug it in.',
      icon: <Gamepad2 size={36} strokeWidth={1.5} color="#FB671F" />,
    },
    {
      num: '02',
      title: 'Plug it in and play',
      body: 'Power cord, one USB stick for the software, and you\'re ready in minutes. No technical setup, no account, no configuration.',
      icon: <Power size={36} strokeWidth={1.5} color="#FB671F" />,
    },
    {
      num: '03',
      title: 'Made for people around it',
      body: 'Two-player mode, a 360° swivel base, and touch controls anyone can pick up. ECHO pulls people in — kids, grown-ups, guests who haven\'t played in years.',
      icon: <Users size={36} strokeWidth={1.5} color="#FB671F" />,
    },
    {
      num: '04',
      title: 'Built to own for years',
      body: 'Built on 40+ years of JVL bartop expertise. Reinforced case, precision frame, individually tested before it leaves the factory.',
      icon: <Shield size={36} strokeWidth={1.5} color="#FB671F" />,
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
      tag: '★★★★★ Verified Amazon Purchase',
      quote: 'Our family has had this arcade for 4 years already, we purchased it from JVL directly. Still going strong — amazing support from the team.',
      author: 'S. Pachuashvili',
      location: 'Florida, US',
      initials: 'SP',
      avatarColor: '#E85D75',
      reviewUrl: 'https://www.amazon.com/gp/customer-reviews/R1UOXG3CXTPQ20/',
    },
    {
      tag: '★★★★★ Verified Amazon Purchase',
      quote: 'Got this arcade for my dad about a year ago directly from JVL. Happy I found it — my dad loves it!',
      author: 'Olga V.',
      location: 'California, US',
      initials: 'OV',
      avatarColor: '#5CB85C',
      reviewUrl: 'https://www.amazon.com/gp/customer-reviews/RE9UGIAOURFUN',
    },
    {
      tag: '★★★★★ Verified Amazon Purchase',
      quote: 'Man, I\'m so happy we decided to get the ECHO — this thing is awesome! Premium feel, amazing appearance, solid and sturdy. Worth every penny.',
      author: 'FlowRider',
      location: 'Florida, US',
      initials: 'FR',
      avatarColor: '#4B6BFB',
      reviewUrl: 'https://www.amazon.com/gp/customer-reviews/RQFTPRF1QX1D8',
    },
    {
      tag: '★★★★★ Verified Amazon Purchase',
      quote: 'This countertop game has been a big hit in my nightclub. It\'s on FreePlay — customers have a blast all night long.',
      author: 'Leo Getz',
      location: 'Texas, US',
      initials: 'LG',
      avatarColor: '#FB671F',
      reviewUrl: 'https://www.amazon.com/gp/customer-reviews/R2VND20OEXNOV5/',
    },
  ]

  const AMAZON_SELLER_URL = 'https://www.amazon.com/sp?ie=UTF8&seller=A1XUVE3EY6OE6R&asin=B0DJ3BSJ4D&ref_=dp_merchant_link'

  const extraReviews = [
    { tag: 'On customer service', quote: 'Honestly, I was really impressed with the customer service from JVL. Every time I reached out, they replied fast, like within an hour, not just copy-paste stuff. They sent video and walked me through things online. The same rep, Andrei, replied each time, it felt personal, like someone had my back. Great service, really made me feel like I was in good hands. Highly recommend!', author: 'FlowRider', location: 'Florida, US', initials: 'FR', avatarColor: '#4B6BFB', reviewUrl: AMAZON_SELLER_URL },
    { tag: 'On delivery & support', quote: 'Andrei was extremely helpful and we love the new game system. Exactly as described and came quick and in great condition!!', author: 'Kim', location: '', initials: 'KM', avatarColor: '#5CB85C', reviewUrl: AMAZON_SELLER_URL },
    { tag: 'On longevity', quote: 'I have Echo that I purchased in 2012. The machine has been spectacular. We have never had any problems with it at all.', author: 'Darcy', location: 'Minnesota, US', initials: 'DA', avatarColor: '#E85D75', reviewUrl: null },
    { tag: 'On family use', quote: 'The machine we have now is running perfectly fine. Our family has this in our game room for guests and family members to use.', author: 'Isabelle', location: 'Texas, US', initials: 'IS', avatarColor: '#9B59B6', reviewUrl: null },
    { tag: 'On setup', quote: 'It came in and started right up with no problems. Everything is working good.', author: 'Scott', location: 'Pennsylvania, US', initials: 'SC', avatarColor: '#F0A500', reviewUrl: null },
    { tag: 'On first impression', quote: 'I unpacked the unit today with zero damage, and it works great. We genuinely love it! It\'s a lot of fun, very intuitive...', author: 'Till', location: 'California, US', initials: 'TI', avatarColor: '#2EAEC9', reviewUrl: null },
    { tag: 'On game variety', quote: 'There are so many games on this machine....I can sit there for hours...finding new and exciting games to play!', author: 'Harold', location: 'Missouri, US', initials: 'HA', avatarColor: '#FB671F', reviewUrl: null },
  ]

  const videoReviews = [
    { id: 's9igT-8wLZM', title: 'ECHO HD3 Review' },
    { id: 'X2TVpAy7pFk', title: 'ECHO HD3 Gameplay' },
    { id: 'ST2Zz0Ym_OI', start: 1020, title: 'ECHO HD3 Bar Setup' },
    { id: 'qurGXFA6Eds', title: 'ECHO HD3 Bar Review' },
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
      a: 'No — ECHO\'s 149 games are proprietary JVL titles built and refined over 40+ years. They include original card games, arcade-style action titles, trivia, puzzle games, and more.',
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
      icon: <ShieldCheck size={32} strokeWidth={1.5} color="#FB671F" />,
      title: 'Warranty',
      body: '1-year all-inclusive. If something isn\'t right, we fix it.',
      highlight: 'JVL covers shipping both ways.',
    },
    {
      icon: <RotateCcw size={32} strokeWidth={1.5} color="#FB671F" />,
      title: 'Returns',
      body: 'Not what you hoped? Return within 30 days for a full refund.',
      highlight: null,
    },
    {
      icon: <Phone size={32} strokeWidth={1.5} color="#FB671F" />,
      title: 'Support',
      body: 'Live chat, email, and phone — answered by our team.',
      highlight: null,
    },
    {
      icon: <Truck size={32} strokeWidth={1.5} color="#FB671F" />,
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
        .echo-hero-video-mob { display: none; }

        .echo-section-what { background: #101213; padding: 96px 0; }
        .echo-section-why { background: #080a0b; padding: 96px 0; border-top: 1px solid #1e2022; }
        .echo-section-library { background: #101213; padding: 96px 0; border-top: 1px solid #222; }
        .echo-section-trust { background: #080a0b; padding: 80px 0; border-top: 1px solid #1e2022; }
        .echo-trust-row1 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-top: 48px; }
        .echo-trust-row2 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-top: 16px; }
        .echo-section-gather { border-top: 1px solid #1e2022; }
        .echo-gather-header { background: #080a0b; padding: 80px 0 48px; text-align: center; }
        .echo-uc1-tabs { display: inline-flex; align-items: center; background: rgba(16,18,19,0.6); backdrop-filter: blur(5px); padding: 15px 20px; border-radius: 4px; }
        .echo-uc1-bg { background-image: var(--bg-desk); background-size: cover; background-position: center; }
        .echo-uc1-headline { font-size: 28px; font-weight: 700; color: #F4F3EC; margin: 0 0 12px 0; line-height: 1.15; }
        .echo-uc1-desc { font-size: 20px; font-weight: 400; line-height: 1.5; color: rgba(244,243,236,0.85); margin: 0; max-width: 800px; }
        @media (max-width: 768px) {
          .echo-uc1-nav { padding: 0 16px !important; }
          .echo-uc1-tabs {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            width: 100%;
            padding: 0 !important;
            backdrop-filter: blur(6px);
            background: rgba(16,18,19,0.6) !important;
            border-radius: 4px !important;
            overflow: hidden;
          }
          .echo-uc1-tabs button {
            padding: 10px 8px !important;
            font-size: 13px !important;
            border-left: none !important;
            border: none !important;
            border-radius: 0 !important;
            border-bottom: 1px solid rgba(244,243,236,0.18) !important;
            justify-content: center;
            white-space: nowrap;
          }
          .echo-uc1-tabs button:nth-child(odd) {
            border-right: 1px solid rgba(244,243,236,0.18) !important;
          }
          .echo-uc1-tabs button:nth-child(5) {
            grid-column: span 2;
            border-bottom: none !important;
            border-right: none !important;
          }
          .echo-uc1-bg { background-image: var(--bg-mob); }
          .echo-uc1-headline { font-size: 1.15rem !important; }
          .echo-uc1-desc { font-size: 16px !important; max-width: 100% !important; }
        }
        .echo-section-built { background: #080a0b; padding: 96px 0 96px; border-top: 1px solid #1e2022; }
        .echo-section-cta { background: #101213; padding: 80px 0; border-top: 1px solid #1e2022; }
        .echo-section-reviews { background: #080a0b; padding: 96px 0; border-top: 1px solid #1e2022; }
        .echo-section-ownership { background: #101213; padding: 96px 0; border-top: 1px solid #1e2022; }
        .echo-section-faq { background: #080a0b; padding: 96px 0; border-top: 1px solid #1e2022; }
        .echo-section-bottom-cta { background: #080a0b; padding: 80px 0; border-top: 1px solid #1e2022; }

        /* Facts — 4-col single row */
        .echo-facts-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border: 1px solid #1e2022;
          border-radius: 4px;
          overflow: hidden;
          margin-top: 40px;
        }
        .echo-fact-cell {
          padding: 24px 20px;
          border-right: 1px solid #1e2022;
        }
        .echo-fact-cell:last-child { border-right: none; }

        /* Feature cards bento */
        .echo-feat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: clamp(288px, 29vw, 374px);
          gap: 8px;
          margin-top: 16px;
        }
        .echo-feat-first { grid-column: span 2; }
        .echo-feat-card {
          position: relative;
          border-radius: 6px;
          overflow: hidden;
        }
        .echo-feat-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .echo-feat-grad {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0) 80%);
        }
        .echo-feat-text {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 20px;
        }

        /* Why — 2x2 grid */
        .echo-why-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
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
          gap: 20px;
          margin-top: 56px;
          margin-bottom: 16px;
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
          padding: 24px 20px;
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

        /* Video reviews grid */
        .echo-video-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin: 48px 0 56px;
        }
        .echo-video-item { position: relative; width: 100%; aspect-ratio: 16 / 9; border-radius: 6px; overflow: hidden; background: #0d0f10; cursor: pointer; }
        .echo-video-item iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: none; }
        .echo-video-thumb { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
        .echo-video-play {
          position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.25); transition: background 0.2s;
        }
        .echo-video-item:hover .echo-video-play { background: rgba(0,0,0,0.38); }
        .echo-video-play-btn {
          width: 64px; height: 64px; border-radius: 50%;
          background: rgba(255,255,255,0.92); display: flex; align-items: center; justify-content: center;
          transition: transform 0.15s, background 0.15s; box-shadow: 0 4px 24px rgba(0,0,0,0.45);
        }
        .echo-video-item:hover .echo-video-play-btn { transform: scale(1.08); background: #fff; }

        @media (max-width: 680px) {
          .echo-video-grid { grid-template-columns: 1fr; }
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

        /* Specs accordion */
        .echo-specs-answer {
          overflow: hidden;
          transition: max-height 0.35s ease;
        }

        /* Timeline */
        .echo-legacy-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; min-height: 320px; }
        .echo-legacy-text { text-align: right; padding-right: 32px; }
        @media (max-width: 900px) {
          .echo-legacy-grid { grid-template-columns: 1fr; gap: 24px; min-height: unset; }
          .echo-legacy-text { text-align: left; padding-right: 0; }
        }
        @media (max-width: 480px) {
          .echo-timeline-btn { flex: 0 0 auto !important; min-width: unset !important; padding: 18px 12px !important; font-size: 13px !important; }
        }

        /* Games section */
        .echo-games-grid { display: grid; grid-template-columns: 220px 1fr; gap: 48px; align-items: start; }

        /* Specs section */
        .echo-specs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .echo-specs-img { position: sticky; top: 140px; }
        @media (max-width: 767px) {
          .echo-specs-grid { grid-template-columns: 1fr; gap: 24px; }
          .echo-specs-img { position: static; }
        }

        /* Gallery viewer — desktop: side thumbnails; mobile: main top, thumbs strip below */
        .echo-gallery-viewer { display: flex; gap: 12px; width: 100%; align-items: flex-start; overflow: hidden; }
        .echo-gallery-thumbs { display: flex; flex-direction: column; gap: 8px; flex-shrink: 0; width: 64px; }
        .echo-gallery-main { flex: 1; aspect-ratio: 1 / 1; }

        /* Why ECHO dot indicators — mobile only */
        .echo-uc1-dots { display: none; }
        .echo-uc1-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(244,243,236,0.35); border: none; cursor: pointer;
          padding: 0; transition: width 0.2s, border-radius 0.2s, background 0.2s; flex-shrink: 0;
        }
        .echo-uc1-dot.active { width: 24px; border-radius: 4px; background: #F4F3EC; }

        /* Product section home grid */
        .echo-product-home-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: start;
        }

        @media (max-width: 960px) {
          .echo-facts-grid { grid-template-columns: 1fr 1fr; }
          .echo-fact-cell:nth-child(2) { border-right: none; }
          .echo-fact-cell:nth-child(1),
          .echo-fact-cell:nth-child(2) { border-bottom: 1px solid #1e2022; }
          .echo-feat-grid { grid-template-columns: 1fr 1fr; grid-auto-rows: clamp(180px, 26vw, 240px); }
          .echo-feat-first { grid-column: span 2; }
        }
        @media (max-width: 768px) {
          /* Gallery: main image full-width on top, horizontal thumb strip below */
          .echo-gallery-viewer { flex-direction: column-reverse; }
          .echo-gallery-main { flex: none; width: 100%; }
          .echo-gallery-thumbs { flex-direction: row; width: 100%; overflow-x: auto; scrollbar-width: none; }
          .echo-gallery-thumbs::-webkit-scrollbar { display: none; }
        }
        @media (max-width: 600px) {
          .echo-facts-grid { grid-template-columns: 1fr 1fr; }
          .echo-feat-grid { grid-template-columns: 1fr; grid-auto-rows: 260px; }
        }
        @media (max-width: 900px) {
          .echo-product-home-grid { grid-template-columns: 1fr; gap: 40px; }
          .echo-what-grid { grid-template-columns: 1fr; gap: 48px; }
          .echo-why-grid { grid-template-columns: 1fr; gap: 36px; }
          .echo-built-grid { grid-template-columns: 1fr; gap: 32px; }
          .echo-games-grid { grid-template-columns: 1fr; gap: 24px; }
          .echo-library-grid { grid-template-columns: 1fr; gap: 40px; }
          .echo-library-sticky { position: static; }
          .echo-reviews-stats { grid-template-columns: 1fr; }
          .echo-trust-row1 { grid-template-columns: 1fr; }
          .echo-trust-row2 { grid-template-columns: 1fr 1fr; }
          .echo-stat-cell { border-right: none; border-bottom: 1px solid #1e2022; }
          .echo-stat-cell:last-child { border-bottom: none; }
          .echo-reviews-grid { grid-template-columns: 1fr; }
          .echo-extra-reviews-grid { grid-template-columns: 1fr 1fr; }
          .echo-ownership-grid { grid-template-columns: 1fr 1fr; }
          /* Amazon button full-width only inside product section */
          .echo-product-home-grid .btn-amazon { width: 100%; justify-content: center; box-sizing: border-box; }
        }
        @media (max-width: 480px) {
          .echo-facts-grid { grid-template-columns: 1fr; }
          .echo-fact-cell { border-right: none; border-bottom: 1px solid #1e2022; }
          .echo-fact-cell:last-child { border-bottom: none; }
          .echo-extra-reviews-grid { grid-template-columns: 1fr; }
          .echo-ownership-grid { grid-template-columns: 1fr; }
          .echo-trust-row2 { grid-template-columns: 1fr; }
        }

        /* ── Mobile-first overrides (must be last to win cascade) ── */
        @media (max-width: 767px) {
          /* Hero */
          .echo-hero { height: 100svh; }
          .echo-hero-video-desk { display: none; }
          .echo-hero-video-mob { display: block; }

          /* All sections: top padding 60px, horizontal breathing room */
          .echo-section-what    { padding: 60px 0 32px; }
          .echo-section-why     { padding: 60px 0; }
          .echo-section-library { padding: 60px 0; }
          .echo-section-reviews { padding: 60px 0 30px; }
          .echo-section-ownership { padding: 60px 0; }
          .echo-section-faq     { padding: 60px 0; }
          .echo-section-cta     { padding: 60px 0; }
          .echo-section-bottom-cta { padding: 60px 0; }
          .echo-section-built   { padding: 60px 0; }
          .echo-section-trust   { padding: 60px 0; }
          .echo-gather-header   { padding: 60px 5vw 40px; }

          /* What ECHO Is — facts 2×2 (override the 1-column 480px rule) */
          .echo-facts-grid { grid-template-columns: 1fr 1fr !important; }
          .echo-fact-cell { border-right: none !important; border-bottom: none !important; }
          .echo-fact-cell:nth-child(odd) { border-right: 1px solid #1e2022 !important; }
          .echo-fact-cell:nth-child(1),
          .echo-fact-cell:nth-child(2) { border-bottom: 1px solid #1e2022 !important; }
          .echo-fact-cell:last-child { border-bottom: none !important; }
          .echo-fact-value { font-size: 1.1rem !important; }
          .echo-fact-label { font-size: 11px !important; }

          /* Feature cards */
          .echo-feat-grid { gap: 16px; }
          .echo-feat-title { font-size: 18px !important; }

          /* Why ECHO — dots well above the headline text */
          .echo-uc1-dots { bottom: 155px; }

          /* Bring ECHO Home — price right, button + subtext centered */
          .echo-price-cta-row { flex-direction: column; align-items: stretch !important; gap: 12px; }
          .echo-price-tag { text-align: right; }
          .echo-product-home-grid .btn-amazon { width: 100% !important; justify-content: center; box-sizing: border-box; }
          .echo-pay-over-time { text-align: center !important; }

          /* Game Library — hide 4-cell stats, categories 2×3 */
          .echo-games-stats { display: none !important; }
          .echo-cat-vert { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
          .echo-cat-vert > div:first-child { grid-column: span 2; }
          .echo-cat-vert > div:last-child { grid-column: span 2; }

          /* CTA banner buttons — auto width centered (not full-width) */
          .echo-section-cta .btn-amazon,
          .echo-section-bottom-cta .btn-amazon { width: auto; }
        }
      `}</style>

      {/* ── Section 1: Hero ── */}
      <Hero data={data.hero} />

      {/* ── Section 2: What ECHO is ── */}
      <section className="echo-section-what">
        <div style={wrap}>
          {/* Heading — centred */}
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
            <Badge label="What ECHO is" />
            <h2 style={{
              fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              color: '#F4F3EC',
              margin: '0 0 20px 0',
            }}>
              A premium bartop arcade for your home
            </h2>
            <p style={{
              fontSize: 17,
              fontWeight: 300,
              lineHeight: 1.7,
              color: 'rgba(244,243,236,0.65)',
              margin: 0,
            }}>
              Built for home bars, game rooms, and shared play, ECHO delivers 149 built-in JVL games with no downloads, no internet, and no bulky cabinet.
            </p>
          </div>

          {/* Facts — 4 cells in 1 row */}
          <div className="echo-facts-grid">
            {facts.map((f) => (
              <div key={f.stat} className="echo-fact-cell">
                <div className="echo-fact-value" style={{ fontSize: f.small ? 'clamp(1.2rem, 1.8vw, 1.5rem)' : 'clamp(1.6rem, 2.5vw, 2rem)', fontWeight: 700, color: '#F4F3EC', lineHeight: 1.1, whiteSpace: f.small ? 'nowrap' : undefined }}>
                  {f.stat}
                </div>
                <div className="echo-fact-label" style={{ fontSize: 13, color: 'rgba(244,243,236,0.5)', marginTop: 6, letterSpacing: '0.04em' }}>
                  {f.label}
                </div>
              </div>
            ))}
          </div>

          {/* Feature cards — bento: large left + 2×2 right */}
          <div className="echo-feat-grid">
            {featureCards.map((c, i) => (
              <div key={c.label} className={`echo-feat-card${i === 0 ? ' echo-feat-first' : ''}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt={c.label} className="echo-feat-img" />
                <div className="echo-feat-grad" />
                <div className="echo-feat-text">
                  <div className="echo-feat-title" style={{ fontSize: 16, fontWeight: 700, color: '#F4F3EC', lineHeight: 1.2, marginBottom: 6 }}>
                    {c.label}
                  </div>
                  <div style={{
                    fontSize: 15,
                    color: 'rgba(255,255,255,0.80)',
                    lineHeight: 1.6,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical' as const,
                    overflow: 'hidden',
                  }}>
                    {c.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Why ECHO ── */}
      <section className="echo-section-gather" ref={ucSectionRef}>
        <div className="echo-gather-header">
          <Badge label="Why ECHO" />
          <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)', fontWeight: 700, color: '#F4F3EC', margin: '0 0 16px 0', letterSpacing: '-0.01em' }}>
            The machine people gather around
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(244,243,236,0.55)', lineHeight: 1.75, margin: '0 auto', maxWidth: 560 }}>
            More than a game machine – it becomes a part of the room, and part of the memories people make together.
          </p>
        </div>
        <div style={{ position: 'relative', width: '100%', height: 'clamp(520px, 80vh, 900px)', overflow: 'hidden' }}>
          <div
            className="echo-uc1-bg"
            style={{
              position: 'absolute', inset: 0,
              ['--bg-desk' as string]: `url(${ucItem.img})`,
              ['--bg-mob' as string]: `url(${ucItem.imgMob})`,
              opacity: ucFading ? 0 : 1, transition: 'opacity 0.28s ease',
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 100%)' }} />
          <div className="echo-uc1-nav" style={{ position: 'absolute', top: 30, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
            <div className="echo-uc1-tabs">
              {USE_CASES.map((uc, i) => (
                <button
                  key={uc.label}
                  onClick={() => ucSwitchTo(i)}
                  onMouseEnter={() => {
                    if (typeof window !== 'undefined') {
                      const img = new window.Image(); img.src = uc.img
                      const imgM = new window.Image(); imgM.src = uc.imgMob
                    }
                  }}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    borderLeft: i === 0 ? 'none' : '1px solid rgba(244,243,236,0.4)',
                    padding: '5px 20px', fontSize: 16, fontWeight: 400, lineHeight: 1.2,
                    color: ucActive === i ? '#059FFF' : '#F4F3EC',
                    opacity: ucActive === i ? 1 : 0.4,
                    transition: 'color 0.2s, opacity 0.2s', whiteSpace: 'nowrap',
                  }}
                >
                  {uc.label}
                </button>
              ))}
            </div>
          </div>
          {/* Mobile: dot/pill navigation */}
          <div className="echo-uc1-dots">
            {USE_CASES.map((uc, i) => (
              <button
                key={i}
                onClick={() => ucSwitchTo(i)}
                className={`echo-uc1-dot${ucActive === i ? ' active' : ''}`}
                aria-label={uc.label}
              />
            ))}
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '50px 5vw 70px', opacity: ucFading ? 0 : 1, transition: 'opacity 0.28s ease' }}>
            <p className="echo-uc1-headline">{ucItem.headline}</p>
            <p className="echo-uc1-desc">{ucItem.text}</p>
          </div>
        </div>
      </section>

      {/* ── Section 4: Buy Box ── */}
      <ProductSectionHome data={data.product} />

      {/* ── Section 4: The game library ── */}
      <section className="echo-section-library">
        <div style={wrap}>
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 40px' }}>
            <Badge label="The game library" />
            <h2 style={{
              fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)',
              fontWeight: 700,
              color: '#F4F3EC',
              margin: '0 0 16px 0',
              letterSpacing: '-0.01em',
            }}>
              149 games across six categories
            </h2>
            <p style={{
              fontSize: 'clamp(15px, 1.1vw, 17px)',
              color: 'rgba(244,243,236,0.6)',
              lineHeight: 1.7,
              margin: 0,
            }}>
              JVL&apos;s full arcade library is built in from day one — ready for solo play, family weekends, and friends-over nights.
            </p>
          </div>
          <GamesSectionDark />
        </div>
      </section>

      {/* ── Section 5: What owners say ── */}
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
            {[
              { stat: '40+',     label: 'Years of JVL bartop heritage' },
              { stat: '10,000+', label: 'Happy Echo owners' },
              { stat: '1 Year',  label: 'All-inclusive warranty' },
            ].map((s) => (
              <div key={s.stat} className="echo-stat-cell">
                <div style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2rem)', fontWeight: 700, color: '#F4F3EC', lineHeight: 1.1 }}>{s.stat}</div>
                <div style={{ fontSize: 13, color: 'rgba(244,243,236,0.5)', marginTop: 6, letterSpacing: '0.04em' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Main 2x2 reviews */}
          <div className="echo-reviews-grid">
            {mainReviews.map((r) => (
              <div key={r.author} style={{
                border: '1px solid #1e2022',
                borderRadius: 4,
                padding: '28px 28px 24px',
                background: '#101213',
                display: 'flex',
                flexDirection: 'column',
              }}>
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
                  "{r.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                      background: r.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: '0.04em',
                    }}>
                      {r.initials}
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(244,243,236,0.8)' }}>
                      {r.author}
                      <span style={{ fontWeight: 400, color: 'rgba(244,243,236,0.8)', marginLeft: 6 }}>· {r.location}</span>
                    </span>
                  </div>
                  <a
                    href={r.reviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 12, fontWeight: 500, color: 'rgba(244,243,236,0.3)',
                      textDecoration: 'none',
                      display: 'inline-flex', alignItems: 'center', gap: 4, flexShrink: 0,
                      transition: 'color 0.2s',
                    }}
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

          {/* Load more / extra reviews */}
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <button
              onClick={() => setReviewsExpanded(!reviewsExpanded)}
              style={{ background: 'none', border: '1px solid #1e2022', color: 'rgba(244,243,236,0.6)', padding: '12px 28px', borderRadius: 4, cursor: 'pointer', fontSize: 14, letterSpacing: '0.06em', fontFamily: 'inherit' }}
            >
              {reviewsExpanded ? 'Show fewer' : 'Load more reviews'}
            </button>
          </div>
          {reviewsExpanded && (
            <div className="echo-extra-reviews-grid" style={{ marginTop: 24 }}>
              {extraReviews.map((r) => (
                <div key={r.author} style={{ border: '1px solid #1e2022', borderRadius: 4, padding: '22px 20px 18px', background: '#101213', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ margin: '0 0 12px 0' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#FB671F' }}>{r.tag}</span>
                  </div>
                  <p style={{ fontSize: 14, fontStyle: 'italic', fontWeight: 300, color: '#F4F3EC', lineHeight: 1.65, margin: '0 0 14px 0', flexGrow: 1 }}>
                    &ldquo;{r.quote}&rdquo;
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: r.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                        {r.initials}
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(244,243,236,0.8)' }}>
                        {r.author}
                        {r.location && (
                          <span style={{ fontWeight: 400, color: 'rgba(244,243,236,0.8)' }}> · {r.location}</span>
                        )}
                      </span>
                    </div>
                    {r.reviewUrl && (
                      <a href={r.reviewUrl} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: 12, fontWeight: 500, color: 'rgba(244,243,236,0.3)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, flexShrink: 0, transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#FB671F')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(244,243,236,0.3)')}
                      >
                        View review
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Video reviews */}
          <div style={{ marginTop: 56 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FB671F', margin: '0 0 16px 0' }}>
              Video reviews
            </p>
            <div className="echo-video-grid">
              {videoReviews.map((v) => (
                <div key={v.id}>
                  <div className="echo-video-item">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1${'start' in v ? `&start=${v.start}` : ''}`}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(244,243,236,0.55)', margin: '10px 0 0 0' }}>{v.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 6: Banner — Ready to bring ECHO home? ── */}
      <section className="echo-section-cta" style={{ position: 'relative', backgroundImage: 'url(/api/storage/3409/jvl-echo-game-room-entertainment-system.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,10,11,0.82)' }} />
        <div style={{ ...wrap, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)', fontWeight: 700, color: '#F4F3EC', margin: '0 0 16px 0', letterSpacing: '-0.01em' }}>
            Ready to bring ECHO home?
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(244,243,236,0.5)', margin: '0 0 8px 0', lineHeight: 1.6 }}>
            149 games, one machine. On your counter, ready in minutes.
          </p>
          <div className="echo-cta-buttons">
            <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer" className="btn-amazon" style={{ padding: '16px 32px', textTransform: 'uppercase', textDecoration: 'none' }}>
              Explore on Amazon
            </a>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(244,243,236,0.3)', marginTop: 20 }}>
            1-year all-inclusive warranty · JVL covers shipping both ways
          </p>
        </div>
      </section>

      {/* ── Section 7: Why Trust JVL ── */}
      <section className="echo-section-trust">
        <div style={wrap}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
            <Badge label="Why trust JVL" />
            <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)', fontWeight: 700, color: '#F4F3EC', margin: '0 0 16px 0', letterSpacing: '-0.01em' }}>
              40 years making the machine you&apos;re looking at
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(244,243,236,0.55)', lineHeight: 1.75, margin: 0 }}>
              We didn&apos;t start with ECHO — we built our way to it through a generation of commercial bartop hardware.
            </p>
          </div>
          <div className="echo-trust-row1">
            <div style={{ background: '#141618', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '28px 28px 32px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: 16 }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#F4F3EC', margin: '0 0 10px 0' }}>Founded in 1984</h3>
              <p style={{ fontSize: 15, color: 'rgba(244,243,236,0.55)', lineHeight: 1.65, margin: '0 0 auto' }}>
                Joseph Levitan started JVL 40+ years ago. Three generations of family ownership. Not a startup.
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
                <a href="https://www.jvl.ca/en/about-jvl" style={{ fontSize: 14, fontWeight: 500, color: 'rgba(244,243,236,0.3)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = '#FB671F')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(244,243,236,0.3)')}>
                  About JVL
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/api/storage/2086/about-05.jpg" alt="Joseph Levitan, founder of JVL" style={{ width: '100%', height: '100%', minHeight: 220, objectFit: 'cover', objectPosition: 'top center', borderRadius: 10, display: 'block' }} />
            <div style={{ background: '#141618', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '28px 28px 32px' }}>
              <div style={{ marginBottom: 16 }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#F4F3EC', margin: '0 0 10px 0' }}>40+ years of bartop expertise</h3>
              <p style={{ fontSize: 15, color: 'rgba(244,243,236,0.55)', lineHeight: 1.65, margin: 0 }}>
                JVL has been building bartop machines since 1995 — in bars, arcades, and venues across North America.
              </p>
            </div>
          </div>
          <div className="echo-trust-row2">
            {[
              { icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>, title: 'Individually tested', body: 'Every ECHO is powered on and tested before leaving the factory. You\'re not the beta tester.' },
              { icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.58 1.25h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, title: 'Real support', body: 'Phone, chat, and email — answered by JVL people, not bots. A real company with a real address.' },
              { icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>, title: 'BUY WITH CONFIDENCE', body: 'Order ECHO through Amazon with a familiar checkout, Prime shipping, and Amazon\'s return/replacement process — backed by JVL warranty and real support.' },
            ].map((c) => (
              <div key={c.title} style={{ background: '#141618', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '28px 28px 32px' }}>
                <div style={{ marginBottom: 16 }}>{c.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#F4F3EC', margin: '0 0 10px 0' }}>{c.title}</h3>
                <p style={{ fontSize: 15, color: 'rgba(244,243,236,0.55)', lineHeight: 1.65, margin: 0 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
        <TimelineBlock />
      </section>

      {/* ── Section 8: Technical Details ── */}
      <SpecsSectionLight />

      {/* ── Section 9: Ownership made easy ── */}
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
                background: '#141618',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 10,
                padding: '28px 28px 32px',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <div style={{ marginBottom: 16 }}>{c.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#F4F3EC', margin: '0 0 10px 0' }}>
                  {c.title}
                </h3>
                <p style={{ fontSize: 15, color: 'rgba(244,243,236,0.55)', lineHeight: 1.65, margin: 0 }}>
                  {c.body}
                </p>
                {c.highlight && (
                  <p style={{ fontSize: 13, color: '#FB671F', margin: '14px 0 0 0', fontWeight: 600 }}>
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
              Frequently asked
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
      <section className="echo-section-bottom-cta" style={{ position: 'relative', backgroundImage: 'url(/api/storage/3475/jvl-echo-poker-luxury-man-cave-setup.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,10,11,0.80)' }} />
        <div style={{ ...wrap, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3vw, 3rem)',
            fontWeight: 700,
            color: '#F4F3EC',
            margin: '0 0 16px 0',
            letterSpacing: '-0.01em',
          }}>
            Bring it home
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
              Explore on Amazon
            </a>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(244,243,236,0.3)', marginTop: 20 }}>
            1-year all-inclusive warranty · JVL covers shipping both ways
          </p>
        </div>
      </section>
    </div>
  )
}
