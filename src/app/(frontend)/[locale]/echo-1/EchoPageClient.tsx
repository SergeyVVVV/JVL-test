'use client'

import React, { useEffect, useRef, useState } from 'react'

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
  countertop: {
    tagLabel: string
    title: string
    image: string | null
  }
  product: {
    title: string
    image: string | null
    buttonText: string
    buttonUrl: string
  }
}

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
      <div style={{ position: 'absolute', bottom: 80, left: 0, right: 0, padding: '0 5vw' }}>
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

          {/* CTA */}
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
    </section>
  )
}

// ─── Legacy Timeline ─────────────────────────────────────────────────────────

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

// ─── QuoteBlock ───────────────────────────────────────────────────────────────

interface QuoteBlockProps {
  text: string
  author?: string
  theme?: 'dark' | 'light'
}

function QuoteBlock({ text, author, theme = 'dark' }: QuoteBlockProps) {
  const isDark = theme === 'dark'
  return (
    <div style={{
      position: 'relative',
      background: isDark ? '#101213' : '#F4F3EC',
      borderLeft: '3px solid #FB671F',
      borderRadius: 4,
      padding: '36px 40px 36px 48px',
      overflow: 'hidden',
    }}>
      {/* Giant decorative " */}
      <span style={{
        position: 'absolute',
        top: -10,
        left: 12,
        fontSize: 120,
        lineHeight: 1,
        fontFamily: 'Georgia, serif',
        color: '#FB671F',
        opacity: 0.18,
        userSelect: 'none',
        pointerEvents: 'none',
      }}>&ldquo;</span>

      {/* Quote text */}
      <p style={{
        position: 'relative',
        margin: 0,
        fontSize: 'clamp(1.1rem, 2vw, 1.45rem)',
        fontStyle: 'italic',
        fontWeight: 300,
        lineHeight: 1.65,
        color: isDark ? '#F4F3EC' : '#101213',
        letterSpacing: '0.01em',
      }}>
        &ldquo;{text}&rdquo;
      </p>

      {/* Author */}
      {author && (
        <p style={{
          position: 'relative',
          margin: '20px 0 0',
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#FB671F',
        }}>
          — {author}
        </p>
      )}
    </div>
  )
}

// ─── Legacy Section ───────────────────────────────────────────────────────────

function LegacySection() {
  const [active, setActive] = useState(0)
  const item = TIMELINE[active]

  return (
    <section style={{ background: '#101213', padding: '96px 0 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5vw' }}>

        {/* Eyebrow */}
        <p style={{ textAlign: 'center', fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FB671F', margin: '0 0 12px' }}>
          JVL Countertops Family
        </p>

        {/* Centered heading */}
        <h2 style={{
          fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          lineHeight: 1.05,
          color: '#F4F3EC',
          textAlign: 'center',
          maxWidth: 840,
          margin: '0 auto 28px',
        }}>
          Touchscreen Arcade Machine with 30+ Years of Innovation
        </h2>

        {/* Centered description */}
        <div style={{ maxWidth: 600, margin: '0 auto 80px', textAlign: 'center' }}>
          <p style={{ fontSize: 16, fontWeight: 300, color: 'rgba(244,243,236,0.65)', margin: '0 0 16px', lineHeight: 1.7 }}>
            Explore the JVL legacy in gaming — from ENCORE to ECHO HD3.
          </p>
          <p style={{ fontSize: 16, fontWeight: 300, color: 'rgba(244,243,236,0.8)', margin: '0 0 16px', lineHeight: 1.7 }}>
            For over 30 years, JVL has led the world in touchscreen arcade entertainment. The Echo HD3 continues that legacy — elegant hardware, intelligent software, timeless gameplay.
          </p>
          <p style={{ fontSize: 16, fontWeight: 300, fontStyle: 'italic', color: 'rgba(244,243,236,0.45)', margin: 0 }}>
            &ldquo;Designed in US. Built for the world.&rdquo;
          </p>
        </div>

        {/* Product display */}
        <div className="echo-legacy-grid">
          {/* Text left */}
          <div className="echo-legacy-text">
            <h3 style={{
              fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#F4F3EC',
              margin: '0 0 16px',
            }}>
              {item.name}
            </h3>
            <p className="echo-legacy-desc" style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.75, color: 'rgba(244,243,236,0.6)', margin: 0 }}>
              {item.desc}
            </p>
          </div>
          {/* Image right */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <img
              key={item.year}
              src={item.img}
              alt={`JVL ${item.name}`}
              style={{ maxHeight: 340, maxWidth: '100%', objectFit: 'contain', display: 'block' }}
            />
          </div>
        </div>
      </div>

      {/* Timeline bar */}
      <div style={{ marginTop: 24, borderTop: '1px solid rgba(244,243,236,0.12)', background: 'rgba(0,0,0,0.35)', paddingBottom: 40 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5vw' }}>
          <div style={{ display: 'flex', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {TIMELINE.map((t, i) => (
              <button
                key={t.year}
                onClick={() => setActive(i)}
                className="echo-timeline-btn"
                style={{
                  flex: '0 0 calc(100% / 11)',
                  minWidth: 80,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '20px 0',
                  fontSize: 14,
                  fontWeight: active === i ? 700 : 400,
                  color: active === i ? '#FB671F' : 'rgba(244,243,236,0.45)',
                  borderTop: `2px solid ${active === i ? '#FB671F' : 'transparent'}`,
                  transition: 'color 0.2s, border-color 0.2s',
                  textAlign: 'center',
                  letterSpacing: '0.01em',
                  marginTop: -1,
                }}
              >
                {t.year}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Countertop Classics ──────────────────────────────────────────────────────

function CountertopSection({ data }: { data: PageData['countertop'] }) {
  return (
    <section className="echo-countertop-section" style={{ background: '#F4F3EC', padding: '80px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 6vw' }}>
        {/* Eyebrow */}
        <p style={{ textAlign: 'center', fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FB671F', margin: '0 0 12px' }}>
          {data.tagLabel}
        </p>

        {/* Heading */}
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          color: '#101213',
          maxWidth: 840,
          margin: '0 auto 40px',
        }}>
          {data.title}
        </h2>

        {/* Image */}
        {data.image && (
          <div style={{ borderRadius: 4, overflow: 'hidden', marginBottom: 40 }}>
            <img src={data.image} alt="" style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
          </div>
        )}

        {/* Body */}
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.75, color: '#4B4B4B', margin: '0 0 16px' }}>
            ECHO ruled bars across the U.S. in the '90s and early 2000s — now, it's back, reimagined for home.
            Transform your living room or basement into your own personal arcade. Plug-and-play fun — no downloads, no Wi-Fi.
          </p>
          <p style={{ fontSize: 15, fontWeight: 300, fontStyle: 'italic', color: '#9A9790', margin: 0 }}>
            &ldquo;It&rsquo;s like owning a piece of arcade history — built for your home.&rdquo;
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Product Section ──────────────────────────────────────────────────────────

const TABS = [
  {
    key: 'home',
    label: 'HOME',
    heading: 'ECHO Touchscreen Countertop',
    subtitle: 'Free Play Home version, without Bill Validator and Quarters Acceptor',
    price: '$3,990',
    amazonUrl: 'https://www.amazon.com/JVL-Echo-Touchscreen-Arcade-Machine/dp/B0DJ3BSJ4D',
    features: [
      { icon: 'shipping', text: 'FREE Prime Shipping' },
      { icon: 'return',   text: 'FREE 30-day refund/replacement' },
      { icon: 'finance',  text: 'Pay over time — up to 24 months, 0% APR' },
      { icon: 'secure',   text: 'Secure Amazon checkout' },
    ],
  },
  {
    key: 'amusement',
    label: 'AMUSEMENT',
    heading: 'ECHO for Commercial Spaces',
    subtitle: 'Bill Validator ($1, $5, $10, $20) and Quarters Acceptor included',
    price: '$4,250',
    amazonUrl: 'https://www.amazon.com/JVL-Echo-Touchscreen-Arcade-Machine/dp/B0DJ3BSJ4D',
    features: [
      { icon: 'shipping', text: 'FREE Prime Shipping' },
      { icon: 'return',   text: 'FREE 30-day refund/replacement' },
      { icon: 'finance',  text: 'Pay over time — up to 24 months, 0% APR' },
      { icon: 'secure',   text: 'Secure Amazon checkout' },
    ],
  },
]

function Icon({ type }: { type: string }) {
  const s = { width: 16, height: 16, flexShrink: 0, color: '#6B6B6B' } as React.CSSProperties
  if (type === 'shipping') return <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
  if (type === 'return')   return <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>
  if (type === 'finance')  return <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
  if (type === 'secure')   return <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  return null
}

// ─── 3D Model Viewer ─────────────────────────────────────────────────────────

function ModelViewer3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Inject model-viewer script once
    const scriptId = 'model-viewer-script'
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.id = scriptId
      script.type = 'module'
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js'
      document.head.appendChild(script)
    }

    // Create element via innerHTML so boolean attrs like camera-controls are correct
    if (containerRef.current) {
      containerRef.current.innerHTML = `
        <model-viewer
          src="/api/storage/3486/3.glb"
          poster="/api/storage/3372/echo_3d_01.jpg"
          alt="JVL Echo HD3"
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          tone-mapping="neutral"
          shadow-intensity="1"
          environment-image="legacy"
          style="width:100%;height:100%;background:transparent;"
        ></model-viewer>
      `
    }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}

// ─── Product Section ──────────────────────────────────────────────────────────

function ProductSection({ data }: { data: PageData['product'] }) {
  const [tab, setTab] = useState(0)
  const active = TABS[tab]

  return (
    <section className="echo-product-section" style={{ background: '#F4F3EC', padding: '80px 0', borderTop: '1px solid #E0DDD4' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 6vw' }}>
        {/* Heading */}
        <h2 style={{
          fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          color: '#101213',
          textAlign: 'center',
          maxWidth: 840,
          margin: '0 auto 40px',
        }}>
          {data.title}
        </h2>

        {/* Two columns */}
        <div className="echo-product-grid">
          {/* 3D Model Viewer */}
          <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1' }}>
            {/* 3D badge */}
            <div style={{
              position: 'absolute', top: 16, left: 16, zIndex: 2,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 44, height: 44, borderRadius: '50%',
              border: '1.5px solid #C8C5BC',
              background: 'rgba(244,243,236,0.9)',
            }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', color: '#101213' }}>3D</span>
            </div>
            <ModelViewer3D />
          </div>

          {/* Details */}
          <div>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: 32, borderBottom: '1px solid #D8D5CC', marginBottom: 24 }}>
              {TABS.map((t, i) => (
                <button
                  key={t.key}
                  onClick={() => setTab(i)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    padding: '0 0 12px',
                    fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                    color: tab === i ? '#101213' : '#9A9790',
                    borderBottom: tab === i ? '2px solid #101213' : '2px solid transparent',
                    marginBottom: -1,
                    transition: 'color 0.2s',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Product heading */}
            <h3 style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#101213', margin: '0 0 10px' }}>
              {active.heading}
            </h3>

            {/* Subtitle */}
            <p style={{ fontSize: 15, color: '#6B6B6B', marginBottom: 24, lineHeight: 1.6 }}>{active.subtitle}</p>

            {/* Features */}
            <div style={{ borderTop: '1px solid #E0DDD4' }}>
              {active.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #E0DDD4' }}>
                  <Icon type={f.icon} />
                  <span style={{ fontSize: 15, color: '#4B4B4B' }}>{f.text}</span>
                </div>
              ))}
            </div>

            {/* Price + Amazon CTA in one row */}
            <div className="echo-price-cta">
              <div className="echo-price-val" style={{ fontSize: 36, fontWeight: 600, color: '#101213', flexShrink: 0 }}>
                {active.price}
              </div>
              <a
                href={active.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-amazon"
                style={{ padding: '14px 28px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}
              >
                Buy on Amazon
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>

            {/* Secondary CTA */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <a
                href="/en/contact-us"
                style={{ fontSize: 14, color: '#101213', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 500, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#059FFF')}
                onMouseLeave={e => (e.currentTarget.style.color = '#101213')}
              >
                Get in touch with us
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M1.5 6H10.5M6 1.5L10.5 6L6 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Use Cases Section ───────────────────────────────────────────────────────

const USE_CASES = [
  {
    label: 'Perfect Gift',
    img: '/api/storage/3477/005_720_01.jpg',
    text: 'Surprise the ones who have everything with unforgettable fun for all ages.',
  },
  {
    label: 'Game Lounge',
    img: '/api/storage/3475/jvl-echo-poker-luxury-man-cave-setup.jpg',
    text: 'Bring arcade excitement to your high-end sports lounge.',
  },
  {
    label: 'Travel Ready',
    img: '/api/storage/3483/jvl-echo-rv-motorhome-portable-gaming.jpg',
    text: 'Perfect for your RV lifestyle — play anywhere, no internet required.',
  },
  {
    label: 'Party Ready',
    img: '/api/storage/3481/002_1920_01.jpg',
    text: 'The ultimate entertainment centerpiece — bring the fun anywhere your crew goes.',
  },
]

function UseCasesSection() {
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)
  const [displayed, setDisplayed] = useState(0)

  function switchTo(i: number) {
    if (i === active) return
    setFading(true)
    setTimeout(() => {
      setDisplayed(i)
      setActive(i)
      setFading(false)
    }, 280)
  }

  const item = USE_CASES[displayed]

  return (
    <section className="echo-uc-section" style={{ position: 'relative', width: '100%', height: 'clamp(500px, 75vh, 70vw)', overflow: 'hidden' }}>
      {/* Background image with fade */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${item.img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.28s ease',
      }} />

      {/* Gradients */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%)' }} />

      {/* Tab bar */}
      <div className="echo-uc-outer" style={{ position: 'absolute', top: 30, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <div className="echo-uc-tabs">
          {USE_CASES.map((uc, i) => (
            <button
              key={uc.label}
              onClick={() => switchTo(i)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                borderLeft: i === 0 ? 'none' : '1px solid rgba(244,243,236,0.4)',
                padding: '5px 20px',
                fontSize: 16, fontWeight: 400,
                lineHeight: 1.2,
                color: active === i ? '#059FFF' : '#F4F3EC',
                opacity: active === i ? 1 : 0.4,
                transition: 'color 0.2s, opacity 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {uc.label}
            </button>
          ))}
        </div>
      </div>

      {/* Text */}
      <div className="echo-uc-text-wrap" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '50px 5vw 70px',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.28s ease',
      }}>
        <p className="echo-uc-desc" style={{ maxWidth: 600, margin: 0 }}>
          {item.text}
        </p>
      </div>
    </section>
  )
}

// ─── B2B Section ─────────────────────────────────────────────────────────────

// ─── Designed Section ────────────────────────────────────────────────────────

const DESIGN_CARDS = [
  { label: 'Compact Footprint', desc: 'Fits any premium interior — modern or classic. Compact and sleek, designed specifically for bartops and countertops.', img: '/api/storage/3409/jvl-echo-game-room-entertainment-system.jpg' },
  { label: '22" HD Touchscreen', desc: 'Arcade action in a brilliant 22" high-definition touchscreen. No joysticks, no trackballs — no problems.', img: '/api/storage/3410/jvl-echo-touchscreen-game-selection-menu.jpg' },
  { label: 'Immersive Audio', desc: '25-watt, 4-speaker high-fidelity tri-band sound system with a dedicated subwoofer for the rich audio.', img: '/api/storage/3414/jvl-echo-speaker-led-lighting-detail.jpg' },
  { label: '1 & 2-Player Modes', desc: 'Enjoy solo play or head-to-head matchups in 2-player mode. ECHO provides competitive games for all.', img: '/api/storage/3412/2_player_modes.jpg' },
  { label: 'Tournaments & Leaderboards', desc: 'Host tournaments, track high scores, and battle for the top spot in the ultimate Hall of Fame.', img: '/api/storage/3413/Leaderboards.jpg' },
]

function DesignedSection() {
  return (
    <section className="echo-designed-section" style={{ background: '#fff', padding: '80px 0' }}>
      <style>{`
        .ds-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          grid-auto-rows: clamp(200px, 21vw, 280px);
          gap: 8px;
        }
        .ds-hero { grid-row: span 2; }
        @media (max-width: 960px) {
          .ds-grid { grid-template-columns: 1fr 1fr; grid-auto-rows: clamp(180px, 28vw, 260px); }
          .ds-hero { grid-row: span 1; }
        }
        @media (max-width: 600px) {
          .ds-grid { grid-template-columns: 1fr; grid-auto-rows: 260px; }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 6vw' }}>

        {/* ── Heading ── */}
        <h2 style={{
          fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          color: '#101213',
          maxWidth: 840,
          margin: '0 0 28px',
        }}>
          Premium Countertop Arcade Machine Designed for Modern Game Rooms
        </h2>

        {/* ── Text left + CTA right ── */}
        <div className="echo-ds-hdr">
          <div>
            <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.75, color: '#4B4B4B', margin: '0 0 12px' }}>
              Every curve, light, and pixel was designed to feel exceptional.
            </p>
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: '#9A9790', fontStyle: 'italic', margin: 0 }}>
              Compact yet powerful — redefining what a mini arcade cabinet can be.
            </p>
          </div>
          <a
            href="https://www.amazon.com/JVL-Echo-Touchscreen-Arcade-Machine/dp/B0DJ3BSJ4D"
            target="_blank" rel="noopener noreferrer"
            className="btn-amazon"
            style={{ padding: '11px 22px', whiteSpace: 'nowrap' }}
          >
            Explore on Amazon
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* ── Card grid: hero left (spans 2 rows) + 2×2 right ── */}
        <div className="ds-grid">
          {DESIGN_CARDS.map((card, i) => (
            <div
              key={card.label}
              className={i === 0 ? 'ds-hero' : ''}
              style={{ position: 'relative', borderRadius: 4, overflow: 'hidden' }}
            >
              <img
                src={card.img}
                alt={card.label}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Stronger overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: i === 0
                  ? 'linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0) 70%)'
                  : 'linear-gradient(to top, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0) 80%)',
              }} />
              {/* Text */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: i === 0 ? '32px 28px' : '20px 20px',
              }}>
                <div className="echo-ds-card-title" style={{
                  fontSize: i === 0 ? 19 : 14,
                  fontWeight: 600,
                  color: '#fff',
                  lineHeight: 1.2,
                  marginBottom: i === 0 ? 10 : 7,
                  letterSpacing: '-0.01em',
                }}>
                  {card.label}
                </div>
                <div className="echo-ds-card-text" style={{
                  fontSize: i === 0 ? 13 : 12,
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.80)',
                  lineHeight: 1.6,
                  display: '-webkit-box',
                  WebkitLineClamp: i === 0 ? 4 : 3,
                  WebkitBoxOrient: 'vertical' as const,
                  overflow: 'hidden',
                }}>
                  {card.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── Games Section ────────────────────────────────────────────────────────────

const GAME_CATEGORIES = [
  {
    label: 'Action',
    img: '/api/storage/3458/Action.jpg',
    video: '/api/storage/3459/Action.mp4',
    desc: 'Dive into the fan-favorite Gone Fishing, outmaneuver opponents in Bumper Wars, battle crazy creatures in Monster Mash, and crush levels in Bonbon Deluxe.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2"/>
        <path d="M12 12h.01M8 10v4M6 12h4"/><circle cx="16" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="18" cy="10" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'Strategy',
    img: '/api/storage/3460/Strategy.jpg',
    video: '/api/storage/3461/Strategy.mp4',
    desc: 'ECHO is packed with timeless strategy games! Outmaneuver rivals in Backgammon and Battle Ships, or dive into classic match-3 and math games.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 16V8c0-1.1.9-2 2-2h4M12 6V4M9 20h6M12 16v4"/><rect x="9" y="8" width="6" height="8" rx="1"/>
      </svg>
    ),
  },
  {
    label: 'Cards',
    img: '/api/storage/3462/Cards.jpg',
    video: '/api/storage/3463/Cards.mp4',
    desc: 'From casinos to coffee tables, card games never go out of style! Hit 21 in Blackjack, go all-in with Texas Hold\'em, or keep it classic with Solitaire.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="14" height="18" rx="2"/><path d="M8 7v2M8 11v2"/><rect x="8" y="2" width="14" height="18" rx="2" fill="#F4F3EC" stroke="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'Puzzle',
    img: '/api/storage/3464/Puzzle.jpg',
    video: '/api/storage/3465/Puzzle.mp4',
    desc: 'Challenge your brain in classic logic games like Sudoku, Mine Sweeper, and Mahjong. Perfect for solo challenges or friendly competition.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19.5 12c0-.23-.01-.45-.03-.68l2.03-1.58a.5.5 0 0 0 .12-.61l-2-3.46a.5.5 0 0 0-.61-.22l-2.39.96a7 7 0 0 0-1.17-.68l-.36-2.54A.5.5 0 0 0 14.5 3h-4a.5.5 0 0 0-.5.42l-.36 2.54a7 7 0 0 0-1.17.68L6.08 5.68a.5.5 0 0 0-.61.22l-2 3.46a.5.5 0 0 0 .12.61l2.03 1.58C5.51 11.55 5.5 11.78 5.5 12s.01.45.03.68L3.5 14.26a.5.5 0 0 0-.12.61l2 3.46a.5.5 0 0 0 .61.22l2.39-.96c.37.26.76.48 1.17.68l.36 2.54a.5.5 0 0 0 .5.42h4c.24 0 .44-.17.49-.42l.36-2.54a7 7 0 0 0 1.17-.68l2.39.96a.5.5 0 0 0 .61-.22l2-3.46a.5.5 0 0 0-.12-.61l-2.03-1.58c.02-.23.03-.45.03-.68z"/><circle cx="12" cy="12" r="2.5"/>
      </svg>
    ),
  },
  {
    label: 'Quiz',
    img: '/api/storage/3466/Quiz.jpg',
    video: '/api/storage/3467/Quiz.mp4',
    desc: "Whether you're a trivia master or a word wizard, ECHO's quiz games will put your skills to the test! Answer exciting questions in Double Quiz or build winning words in Word Chase.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>
      </svg>
    ),
  },
  {
    label: 'Adult',
    img: '/api/storage/3468/Erotic.jpg',
    video: null,
    desc: 'For those who like it hot, ECHO offers a fun selection of spicy, adult-themed games. Prefer to keep things family-friendly? You can easily enable, disable, or schedule access to adult content in the settings.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 12h6M12 9v6"/>
      </svg>
    ),
  },
]

function GamesSection() {
  const [activeTab, setActiveTab] = useState(0)
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const cat = GAME_CATEGORIES[activeTab]

  function switchTab(i: number) {
    setPlaying(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    setActiveTab(i)
  }

  function handlePlay() {
    setPlaying(true)
    videoRef.current?.play()
  }

  return (
    <section className="echo-games-section" style={{ background: '#F4F3EC', padding: '80px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 6vw' }}>

        {/* Heading */}
        <h2 style={{
          fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          color: '#101213',
          textAlign: 'center',
          maxWidth: 840,
          margin: '0 auto 14px',
        }}>
          Home Arcade Machine with Multiple Games
        </h2>

        {/* Subheading */}
        <p style={{
          fontSize: 18,
          fontWeight: 400,
          color: '#4B4B4B',
          textAlign: 'center',
          maxWidth: 560,
          margin: '0 auto 20px',
          lineHeight: 1.4,
          letterSpacing: '0.01em',
        }}>
          149 Classic Titles, No Downloads Needed
        </p>

        {/* Supporting text */}
        <div style={{ maxWidth: 560, margin: '0 auto 40px', textAlign: 'center' }}>
          <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.75, color: '#4B4B4B', margin: 0 }}>
            With ECHO HD3, you get 149 built-in timeless games covering every genre — from action and puzzles to strategy-packed poker.
            No downloads, no installs, no subscriptions — just non-stop entertainment.
          </p>
        </div>

        {/* Stats row */}
        <div className="echo-stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid #D0CEC6', borderBottom: '1px solid #D0CEC6', marginBottom: 56 }}>
          {[
            { value: '149', label: 'Pre-installed games', size: 'clamp(2.2rem, 3.5vw, 3rem)' },
            { value: 'Solo & 2-Player', label: 'Player Modes', size: 'clamp(1.5rem, 2.4vw, 2rem)' },
            { value: '∞', label: 'Hours of Fun', size: 'clamp(3rem, 5vw, 4rem)' },
          ].map((s, i) => (
            <div key={s.label} style={{
              padding: '28px 24px',
              textAlign: 'center',
              borderLeft: i > 0 ? '1px solid #D0CEC6' : 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: s.size, fontWeight: 700, color: '#101213', lineHeight: 1.1, width: '100%', marginBottom: 8 }}>{s.value}</div>
              <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#787878' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Game categories */}
        <div className="echo-games-grid">

          {/* Category list */}
          <div className="echo-cat-vert">
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#787878', marginBottom: 20, width: '100%' }}>
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
                  padding: '14px 0',
                  borderTop: '1px solid #D0CEC6',
                  color: activeTab === i ? '#FB671F' : '#101213',
                  transition: 'color 0.2s',
                  textAlign: 'left',
                }}
              >
                <span style={{ flexShrink: 0 }}>{c.icon}</span>
                <span style={{ fontSize: 18, fontWeight: activeTab === i ? 500 : 400 }}>{c.label}</span>
              </button>
            ))}
          </div>

          {/* Video + description */}
          <div>
            <div style={{ position: 'relative', borderRadius: 4, overflow: 'hidden', marginBottom: 20, background: '#000' }}>
              <img
                src={cat.img}
                alt={cat.label}
                style={{ width: '100%', display: 'block', opacity: playing ? 0 : 1, transition: 'opacity 0.2s' }}
              />
              {cat.video && (
                <video
                  ref={videoRef}
                  src={cat.video}
                  controls
                  style={{
                    position: 'absolute', inset: 0, width: '100%', height: '100%',
                    objectFit: 'cover',
                    opacity: playing ? 1 : 0,
                    transition: 'opacity 0.2s',
                  }}
                />
              )}
              {cat.video && !playing && (
                <button
                  onClick={handlePlay}
                  style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
                    border: 'none', cursor: 'pointer', borderRadius: '50%',
                    width: 56, height: 56,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
              )}
            </div>
            <div style={{ fontSize: 16, fontWeight: 500, color: '#101213', marginBottom: 10 }}>{cat.label}</div>
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.75, color: '#4B4B4B', margin: 0 }}>{cat.desc}</p>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── Specs Section ───────────────────────────────────────────────────────────

const SPECS_ITEMS = [
  {
    label: 'Product Information',
    img: '/api/storage/3449/Tech-Specs.jpg',
    table: [
      ['Dimensions', '15"L x 19.5"W x 18.5"H'],
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
    text: '360° Swivel Base for Shared Play. ECHO\'s rotating base lets players on both sides take control — perfect for head-to-head action!',
  },
  {
    label: 'Dynamic Multi-color Halo',
    img: '/api/storage/3452/Halo.jpg',
    text: 'ECHO\'s 360° multi-color halo turns up the energy, surrounding your game with a brilliant, ever-changing glow for a fully immersive experience.',
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

function SpecsSection() {
  const [open, setOpen] = useState(0)

  return (
    <section style={{ background: '#F4F3EC', padding: '80px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 6vw' }}>

        {/* Heading + desc + CTA */}
        <div style={{ marginBottom: 52 }}>
          <h2 style={{
            fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: '#101213',
            maxWidth: 840,
            margin: '0 0 20px',
          }}>
            Mini Arcade Cabinet with Games – Compact Power, Endless Fun
          </h2>
          <div className="echo-specs-hdr">
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.75, color: '#4B4B4B', margin: 0 }}>
              Every detail refined. Every feature designed to deliver performance, beauty, and timeless play.
            </p>
            <a
              href="https://www.amazon.com/JVL-Echo-Touchscreen-Arcade-Machine/dp/B0DJ3BSJ4D"
              target="_blank" rel="noopener noreferrer"
              className="btn-amazon"
              style={{ padding: '10px 20px', whiteSpace: 'nowrap' }}
            >
              Buy on Amazon
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Two-col: image left, accordion right */}
        <div className="echo-specs-grid">

          {/* Image */}
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
                      <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.75, color: '#4B4B4B', margin: 0 }}>
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

// ─── Support Section ─────────────────────────────────────────────────────────

const SUPPORT_CARDS = [
  {
    title: 'Real Human Support',
    desc: 'Knowledgeable, responsive, and genuinely here to help — no bots, no scripts, just real people.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    title: '1-Year Warranty',
    desc: "Enjoy full coverage with our 1-year manufacturer warranty. If troubleshooting doesn't solve the issue, we'll replace your unit — no questions asked.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    title: 'Fast Delivery',
    desc: 'Get it quick with Amazon Prime — FREE, fast shipping means minimal wait, maximum playtime.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    title: 'No Setup Needed',
    desc: 'Just plug it in, power it on, and start playing — no assembly, no hassle.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FB671F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
]

function SupportSection() {
  return (
    <section style={{ background: '#101213', padding: '80px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 6vw' }}>

        {/* Heading + desc + CTA */}
        <div style={{ marginBottom: 52 }}>
          <h2 style={{
            fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: '#F4F3EC',
            maxWidth: 840,
            margin: '0 0 20px',
          }}>
            Secure Amazon Checkout, Warranty & Support You Can Trust
          </h2>
          <div className="echo-sup-hdr">
            <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.75, color: 'rgba(244,243,236,0.65)', margin: 0 }}>
              Buy securely through Amazon with official JVL warranty and North American support. Fast delivery, verified authenticity, and peace of mind included.
            </p>
            <a href="/en/contact-us" className="btn-amazon" style={{ padding: '10px 20px', whiteSpace: 'nowrap' }}>
              Contact Us!
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M1.5 6H10.5M6 1.5L10.5 6L6 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        {/* 4 cards */}
        <div className="echo-sup-cards">
          {SUPPORT_CARDS.map((card) => (
            <div key={card.title} className="echo-sup-card" style={{ background: '#181a1b', border: '1px solid #2a2a2a', borderRadius: 4, padding: 24 }}>
              <div className="echo-sup-card-icon" style={{ marginBottom: 20 }}>{card.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#F4F3EC', marginBottom: 12, lineHeight: 1.3 }}>
                {card.title}
              </div>
              <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: 'rgba(244,243,236,0.6)', margin: 0 }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── B2B Section ─────────────────────────────────────────────────────────────

function B2BSection() {
  return (
    <section className="echo-b2b-section" style={{ background: '#F4F3EC', padding: '80px 0 96px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 6vw' }}>

        {/* B2B icon */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <img src="https://www.jvl.ca/img/icons/b2b.svg" alt="JVL Echo B2B" width={48} height={48} />
        </div>

        {/* Photo */}
        <div style={{ borderRadius: 4, overflow: 'hidden', marginBottom: 48 }}>
          <img
            src="/api/storage/3544/12.png"
            alt="Interested in bringing ECHO to your business?"
            style={{ width: '100%', display: 'block', objectFit: 'cover' }}
          />
        </div>

        {/* Text */}
        <div style={{ textAlign: 'center' }}>
          <h3 style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.4rem)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            lineHeight: 1.3,
            color: '#101213',
            margin: '0 0 20px',
          }}>
            Interested in bringing Echo to your business?
          </h3>
          <p style={{
            fontSize: 15,
            fontWeight: 300,
            lineHeight: 1.75,
            color: '#4B4B4B',
            maxWidth: 560,
            margin: '0 auto 32px',
          }}>
            ECHO Home and ECHO Amusement are strong revenue-driving additions for resellers,
            operators, and distributors. Whether you&apos;re looking to expand your portfolio or offer
            something fresh to your customers, we&apos;re here to support you.
          </p>
          <a
            href="/en/echo-b2b"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 14, fontWeight: 600, color: '#101213',
              textDecoration: 'none', letterSpacing: '0.02em', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#059FFF')}
            onMouseLeave={e => (e.currentTarget.style.color = '#101213')}
          >
            Explore ECHO B2B Programs
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
              <path d="M1.5 6H10.5M6 1.5L10.5 6L6 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Stats ────────────────────────────────────────────────────────────────────

function StatsSection() {
  const stats = [
    { value: '40+', label: 'Years of Experience' },
    { value: '100K+', label: 'Machines Deployed' },
    { value: '3', label: 'Global Markets' },
  ]

  return (
    <section style={{ background: '#059FFF', padding: '72px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 6vw' }}>
        <p style={{ textAlign: 'center', fontSize: 13, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 48 }}>
          A Lifetime in Gaming
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              textAlign: 'center', padding: '0 24px',
              borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.25)' : 'none',
            }}>
              <div style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 600, color: '#fff', lineHeight: 1, marginBottom: 12 }}>{s.value}</div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Feature Grid ─────────────────────────────────────────────────────────────

const FEATURES = [
  { title: 'Premium Games Library', body: '149 titles — poker, puzzles, arcade. New games added regularly.' },
  { title: '24/7 Remote Support', body: 'Our team monitors and supports your machines around the clock.' },
  { title: 'Revenue Ready', body: 'Built-in bill validator and coin acceptor for amusement operators.' },
  { title: 'Built to Last', body: 'Commercial-grade hardware engineered for years of continuous use.' },
  { title: 'Global Reach', body: 'Deployed across North America, Europe, and growing.' },
  { title: 'White Label Options', body: 'Custom branding available for enterprise operators and distributors.' },
]

function FeatureGrid() {
  return (
    <section style={{ background: '#101213', padding: '80px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 6vw' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ display: 'block', fontSize: 13, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#059FFF', marginBottom: 16 }}>
            Built Different
          </span>
          <h2 style={{
            fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            color: '#F4F3EC',
            maxWidth: 840,
            margin: '0 auto',
          }}>
            Why Operators Choose Echo
          </h2>
        </div>

        {/* Grid */}
        <div className="echo-feat-grid">
          {FEATURES.map((f, i) => (
            <div key={i} className="echo-feat-item" style={{
              borderRight: (i + 1) % 3 !== 0 ? '1px solid #222' : 'none',
              borderBottom: i < 3 ? '1px solid #222' : 'none',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 4,
                background: 'rgba(5, 159, 255, 0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20,
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {i === 0 && <><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h.01M8 10v4M6 12h4"/><circle cx="16" cy="12" r="1" fill="#059FFF"/><circle cx="18" cy="10" r="1" fill="#059FFF"/></>}
                  {i === 1 && <><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/><path d="M12 16v-4M12 8h.01"/></>}
                  {i === 2 && <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>}
                  {i === 3 && <><polyline points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>}
                  {i === 4 && <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>}
                  {i === 5 && <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>}
                </svg>
              </div>
              <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#F4F3EC', margin: '0 0 10px' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: '#787878', margin: 0 }}>
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────

function CTABanner() {
  return (
    <section style={{ background: '#059FFF', padding: '80px 6vw', textAlign: 'center' }}>
      <h2 style={{
        fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '-0.02em',
        color: '#fff',
        maxWidth: 840,
        margin: '0 auto 16px',
      }}>
        Ready to Bring Echo to Your Venue?
      </h2>
      <p style={{ fontSize: 18, fontWeight: 300, color: 'rgba(255,255,255,0.85)', margin: '0 0 40px' }}>
        Talk to our team and find the right solution for your business.
      </p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href="/en/contact-us" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#101213', color: '#fff',
          fontWeight: 700, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '16px 36px', textDecoration: 'none',
        }}>
          Contact Us
        </a>
        <a href="/en/echo-b2b" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'transparent', color: '#fff',
          fontWeight: 700, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '16px 36px', textDecoration: 'none',
          border: '2px solid rgba(255,255,255,0.5)',
        }}>
          Learn More
        </a>
      </div>
    </section>
  )
}

// ─── Footer CTA ──────────────────────────────────────────────────────────────

function FooterCTA() {
  return (
    <section style={{
      position: 'relative',
      backgroundImage: 'url(/api/storage/3485/jvl-echo-bartop-arcade-machine-office.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '80px 0',
    }}>
      {/* Overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />

      <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '0 6vw' }}>
        <div className="echo-footer-grid">

          {/* Col 1: Be Part of the Experience */}
          <div style={{
            background: 'rgba(16,18,19,0.72)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 4, padding: '36px 32px',
            display: 'flex', flexDirection: 'column', gap: 20,
          }}>
            <h3 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1.1, color: '#F4F3EC', margin: 0 }}>
              Be Part of the Experience
            </h3>
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.75, color: 'rgba(244,243,236,0.7)', margin: 0 }}>
              Stay in the loop — join us on social media for product updates, exclusive offers and discounts.
            </p>
            <div style={{ display: 'flex', gap: 16, marginTop: 'auto' }}>
              {[
                { label: 'Instagram', href: 'https://www.instagram.com/jvl_echo/', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg> },
                { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61573956107914', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#F4F3EC', textDecoration: 'none', fontSize: 15, fontWeight: 500, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#059FFF')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#F4F3EC')}
                >
                  {s.icon} {s.label}
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Support */}
          <div style={{
            background: 'rgba(16,18,19,0.72)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 4, padding: '36px 32px',
            display: 'flex', flexDirection: 'column', gap: 28,
          }}>
            <h3 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1.1, color: '#F4F3EC', margin: 0 }}>
              Support
            </h3>
            {[
              { label: 'ECHO Manual', btn: 'Download manual', href: '/api/storage/3491/ECHO_user-manual.pdf', external: true },
              { label: 'Warranty Registration', btn: 'Fill out the form', href: '/en/warranty' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ fontSize: 15, fontWeight: 500, color: '#F4F3EC' }}>{item.label}</div>
                <a
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 16px',
                    border: '1px solid rgba(244,243,236,0.25)',
                    color: '#F4F3EC', textDecoration: 'none', fontSize: 15, fontWeight: 400,
                    borderRadius: 2, transition: 'border-color 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#059FFF'; e.currentTarget.style.color = '#059FFF' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(244,243,236,0.25)'; e.currentTarget.style.color = '#F4F3EC' }}
                >
                  {item.btn}
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M1.5 6H10.5M6 1.5L10.5 6L6 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 15, fontWeight: 500, color: '#F4F3EC' }}>Repair & Support</div>
              <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(244,243,236,0.6)', margin: '0 0 8px', lineHeight: 1.6 }}>
                Reach out for repair parts, warranty questions, or general inquiries.
              </p>
              <a
                href="/en/contact-us"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 16px',
                  border: '1px solid rgba(244,243,236,0.25)',
                  color: '#F4F3EC', textDecoration: 'none', fontSize: 15, fontWeight: 400,
                  borderRadius: 2, transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#059FFF'; e.currentTarget.style.color = '#059FFF' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(244,243,236,0.25)'; e.currentTarget.style.color = '#F4F3EC' }}
              >
                Get in touch with us!
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M1.5 6H10.5M6 1.5L10.5 6L6 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </div>

          {/* Col 3: Bring ECHO to your business */}
          <div style={{
            background: 'rgba(16,18,19,0.72)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 4, padding: '36px 32px',
            display: 'flex', flexDirection: 'column', gap: 20,
          }}>
            <h3 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1.1, color: '#F4F3EC', margin: 0 }}>
              Bring Echo to Your Business
            </h3>
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.75, color: 'rgba(244,243,236,0.7)', margin: 0 }}>
              Bring the timeless appeal of modern arcade entertainment to your business. We offer tailored purchasing options, reseller-friendly pricing, and dedicated support built for professional environments.
            </p>
            <a
              href="/en/echo-b2b"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px', marginTop: 'auto',
                border: '1px solid rgba(244,243,236,0.25)',
                color: '#F4F3EC', textDecoration: 'none', fontSize: 15, fontWeight: 400,
                borderRadius: 2, transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#059FFF'; e.currentTarget.style.color = '#059FFF' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(244,243,236,0.25)'; e.currentTarget.style.color = '#F4F3EC' }}
            >
              Explore ECHO B2B Programs
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M1.5 6H10.5M6 1.5L10.5 6L6 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EchoPageClient({ data }: { data: PageData }) {
  return (
    <div id="echo1-page">
      <style>{`
        /* ── Product Section ── */
        .echo-product-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        @media (max-width: 767px) {
          .echo-product-grid { grid-template-columns: 1fr; gap: 32px; }
        }

        /* ── Legacy product display ── */
        .echo-legacy-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; min-height: 360px; margin-bottom: 0; }
        .echo-legacy-text { text-align: right; padding-right: 32px; }
        .echo-legacy-desc { }
        @media (max-width: 767px) {
          .echo-legacy-grid { grid-template-columns: 1fr; gap: 24px; min-height: unset; }
          .echo-legacy-text { text-align: left; padding-right: 0; }
          .echo-legacy-desc { }
        }

        /* ── Games Section ── */
        .echo-games-grid { display: grid; grid-template-columns: 220px 1fr; gap: 48px; align-items: start; }
        @media (max-width: 767px) {
          .echo-games-grid { grid-template-columns: 1fr; gap: 24px; }
        }

        /* ── Specs Section ── */
        .echo-specs-hdr { display: grid; grid-template-columns: 1fr auto; gap: 48px; align-items: center; }
        .echo-specs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .echo-specs-img { position: sticky; top: 140px; }
        @media (max-width: 767px) {
          .echo-specs-hdr { grid-template-columns: 1fr; gap: 20px; }
          .echo-specs-hdr > a { justify-self: start; width: auto !important; }
          .echo-specs-grid { grid-template-columns: 1fr; gap: 24px; }
          .echo-specs-img { position: static; }
          .echo-specs-img img { border-radius: 4px; }
        }

        /* ── Support Section ── */
        .echo-sup-hdr { display: grid; grid-template-columns: 1fr auto; gap: 48px; align-items: center; }
        .echo-sup-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        @media (max-width: 767px) {
          .echo-sup-hdr { grid-template-columns: 1fr; gap: 20px; }
          .echo-sup-cards { grid-template-columns: repeat(2, 1fr); }
        }

        /* ── Feature Grid ── */
        .echo-feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid #222; }
        .echo-feat-item { padding: 36px 32px; }
        @media (max-width: 767px) {
          .echo-feat-grid { grid-template-columns: 1fr; }
          .echo-feat-item { border-right: none !important; border-bottom: 1px solid #222 !important; }
          .echo-feat-item:last-child { border-bottom: none !important; }
        }
        @media (min-width: 768px) {
          .echo-feat-item { border-right: var(--echo-feat-br, none); border-bottom: var(--echo-feat-bb, none); }
        }

        /* ── Footer CTA grid ── */
        .echo-footer-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 767px) {
          .echo-footer-grid { grid-template-columns: 1fr; }
        }

        /* ── Designed Section header row ── */
        .echo-ds-hdr { display: grid; grid-template-columns: 1fr auto; gap: 48px; align-items: center; margin-bottom: 48px; }
        @media (max-width: 767px) {
          .echo-ds-hdr { grid-template-columns: 1fr; gap: 20px; }
          .echo-ds-hdr > a { justify-self: start; width: auto !important; }
        }

        /* ── Use Cases tab bar ── */
        .echo-uc-tabs { display: inline-flex; align-items: center; background: rgba(16,18,19,0.6); backdrop-filter: blur(5px); padding: 15px 20px; }
        @media (max-width: 640px) {
          .echo-uc-tabs { display: flex; width: 100%; padding: 10px 0; overflow-x: auto; scrollbar-width: none; justify-content: center; }
          .echo-uc-tabs button { padding: 5px 14px !important; font-size: 14px !important; }
        }

        /* ── Stats row ── */
        @media (max-width: 480px) {
          .echo-stats-row { grid-template-columns: 1fr !important; }
          .echo-stats-row > div { border-left: none !important; border-top: 1px solid #D0CEC6; }
          .echo-stats-row > div:first-child { border-top: none; }
        }

        /* ── Hero ── */
        .echo-hero { height: calc(100svh - 124px); min-height: 520px; }
        @media (max-width: 767px) {
          .echo-hero { height: 58vh; min-height: 380px; max-height: 520px; margin-top: -52px; }
          .echo-hero-h1 { font-size: clamp(1.15rem, 5vw, 1.5rem) !important; line-height: 1.15 !important; }
          .echo-hero-video { object-position: 70% center !important; }
          .echo-countertop-section { padding: 40px 0 !important; }
        }

        /* ── H2 sizes on mobile ── */
        @media (max-width: 767px) {
          #echo1-page section h2 { font-size: clamp(1.35rem, 5vw, 2rem) !important; }
        }

        /* ── Price + CTA row ── */
        .echo-price-cta { display: flex; align-items: center; gap: 24px; margin: 24px 0 16px; }
        @media (max-width: 767px) {
          .echo-price-cta { gap: 12px; justify-content: space-between; margin: 20px 0 12px; }
          .echo-price-val { font-size: 26px !important; }
          .echo-price-cta .btn-amazon { padding: 11px 16px !important; font-size: 12px !important; }
        }

        /* ── Section paddings on mobile ── */
        @media (max-width: 767px) {
          .echo-product-section { padding: 48px 0 !important; }
          .echo-b2b-section { padding: 40px 0 56px !important; }
          .echo-games-section { padding: 48px 0 !important; }
          .echo-designed-section { padding: 48px 0 !important; }
        }

        /* ── Legacy timeline buttons ── */
        @media (max-width: 767px) {
          .echo-timeline-btn { flex: 0 0 auto !important; min-width: unset !important; padding: 18px 12px !important; font-size: 13px !important; }
        }

        /* ── UseCases tab bar ── */
        @media (max-width: 767px) {
          .echo-uc-tabs { width: 100%; overflow-x: auto; justify-content: flex-start; padding: 8px 16px; }
          .echo-uc-tabs button { padding: 5px 12px !important; font-size: 13px !important; border-left-width: 1px !important; }
        }

        /* ── Designed section cards ── */
        @media (max-width: 767px) {
          .echo-ds-card-text { line-height: 1.5 !important; -webkit-line-clamp: 4 !important; font-size: 12px !important; }
          .echo-ds-card-title { font-size: 17px !important; }
        }

        /* ── Use Cases section height on mobile ── */
        @media (max-width: 767px) {
          .echo-uc-section { height: 420px !important; }
        }

        /* ── Support cards less padding on mobile ── */
        @media (max-width: 767px) {
          .echo-sup-card { padding: 16px !important; }
          .echo-sup-card-icon { margin-bottom: 14px !important; }
        }

        /* ── Games categories horizontal on mobile ── */
        @media (max-width: 767px) {
          .echo-cat-vert { display: flex !important; flex-wrap: wrap; }
          .echo-cat-btn { width: 50% !important; padding: 12px 8px !important; }
          .echo-cat-btn span:last-child { font-size: 14px !important; }
        }

        /* ── Use Cases ── */
        .echo-uc-desc { font-size: 24px; font-weight: 400; line-height: 1.15; color: #F4F3EC; margin: 0; }
        @media (max-width: 767px) {
          .echo-uc-desc { font-size: 15px !important; line-height: 1.45 !important; }
          .echo-uc-text-wrap { padding: 20px 5vw 36px !important; }

          /* 2×2 grid tabs on mobile */
          .echo-uc-outer { padding: 0 16px !important; }
          .echo-uc-tabs {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            width: 100%;
            padding: 0 !important;
            backdrop-filter: blur(6px);
          }
          .echo-uc-tabs button {
            padding: 8px 6px !important;
            font-size: 13px !important;
            border-left: none !important;
            border-bottom: 1px solid rgba(244,243,236,0.18) !important;
            justify-content: center;
          }
          .echo-uc-tabs button:nth-child(odd) {
            border-right: 1px solid rgba(244,243,236,0.18) !important;
          }
          .echo-uc-tabs button:nth-child(3),
          .echo-uc-tabs button:nth-child(4) {
            border-bottom: none !important;
          }
        }

        /* ── Specs / Support section Amazon button fix ── */
        @media (max-width: 767px) {
          .echo-specs-hdr > a,
          .echo-sup-hdr > a { justify-self: start; width: auto !important; }
        }
      `}</style>
      <Hero data={data.hero} />
      <CountertopSection data={data.countertop} />
      <ProductSection data={data.product} />
      <B2BSection />
      <LegacySection />
      <UseCasesSection />
      <DesignedSection />
      <GamesSection />
      <SpecsSection />
      <SupportSection />
      <FooterCTA />
    </div>
  )
}
