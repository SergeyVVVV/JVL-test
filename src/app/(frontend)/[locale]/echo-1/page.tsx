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

// ─── Data fetcher ─────────────────────────────────────────────────────────────

async function fetchPageData(): Promise<PageData> {
  const res = await fetch('/api/echo-data', { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
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
    <section style={{ position: 'relative', width: '100%', height: 'calc(100svh - 124px)', minHeight: 520, background: '#080a0b', overflow: 'hidden' }}>
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
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}

      {/* Gradient overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.0) 60%)' }} />

      {/* Headline */}
      <div style={{ position: 'absolute', bottom: 80, left: 0, right: 0, padding: '0 5vw' }}>
        <h1 style={{
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
            style={{ padding: '12px 24px', textTransform: 'uppercase' }}
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

function LegacySection() {
  const [active, setActive] = useState(0)
  const item = TIMELINE[active]

  return (
    <section style={{ background: '#101213', padding: '96px 0 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5vw' }}>

        {/* Badge */}
        <div style={{ marginBottom: 40 }}>
          <span style={{
            display: 'inline-block',
            border: '1px solid rgba(244,243,236,0.3)',
            borderRadius: 999,
            padding: '6px 20px',
            fontSize: 13,
            color: '#F4F3EC',
            letterSpacing: '0.04em',
          }}>
            JVL Countertops Family
          </span>
        </div>

        {/* Two-column header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginBottom: 80, alignItems: 'start' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.8rem)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            color: '#F4F3EC',
            margin: 0,
          }}>
            Touchscreen Arcade Machine with 30+ Years of Innovation
          </h2>
          <div style={{ paddingTop: 8 }}>
            <p style={{ fontSize: 15, fontWeight: 300, color: 'rgba(244,243,236,0.65)', margin: '0 0 20px', lineHeight: 1.7 }}>
              Explore the JVL legacy in gaming — from ENCORE to ECHO HD3.
            </p>
            <p style={{ fontSize: 15, fontWeight: 300, color: 'rgba(244,243,236,0.8)', margin: '0 0 20px', lineHeight: 1.7 }}>
              For over 30 years, JVL <strong style={{ fontWeight: 700, color: '#F4F3EC' }}>has led the world in touchscreen arcade entertainment</strong>. The Echo HD3 continues that legacy — elegant hardware, intelligent software, timeless gameplay.
            </p>
            <p style={{ fontSize: 15, fontStyle: 'italic', color: 'rgba(244,243,236,0.5)', margin: 0 }}>
              &ldquo;Designed in US. Built for the world.&rdquo;
            </p>
          </div>
        </div>

        {/* Product display */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', minHeight: 360 }}>
          {/* Text left */}
          <div style={{ textAlign: 'right', paddingRight: 32 }}>
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
            <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.75, color: 'rgba(244,243,236,0.6)', margin: 0, maxWidth: 380, marginLeft: 'auto' }}>
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
      <div style={{ marginTop: 64, borderTop: '1px solid rgba(244,243,236,0.12)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5vw' }}>
          <div style={{ display: 'flex', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {TIMELINE.map((t, i) => (
              <button
                key={t.year}
                onClick={() => setActive(i)}
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
    <section style={{ background: '#F4F3EC', padding: '80px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 6vw' }}>
        {/* Tag */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span style={{
            display: 'inline-block',
            border: '1px solid #C8C5BC',
            borderRadius: 999,
            padding: '6px 20px',
            fontSize: 13,
            color: '#101213',
            letterSpacing: '0.04em',
          }}>
            {data.tagLabel}
          </span>
        </div>

        {/* Heading */}
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(1.6rem, 3.5vw, 3rem)',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          color: '#101213',
          margin: '0 0 48px',
        }}>
          {data.title}
        </h2>

        {/* Image */}
        {data.image && (
          <div style={{ borderRadius: 4, overflow: 'hidden', marginBottom: 48 }}>
            <img src={data.image} alt="" style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
          </div>
        )}

        {/* Body */}
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 17, fontWeight: 300, lineHeight: 1.75, color: '#4B4B4B', margin: '0 0 24px' }}>
            ECHO ruled bars across the U.S. in the '90s and early 2000s — now, it's back, reimagined for home.
            Transform your living room or basement into your own personal arcade. Plug-and-play fun — no downloads, no Wi-Fi.
          </p>
          <p style={{ fontSize: 18, fontWeight: 500, fontStyle: 'italic', color: '#101213', margin: 0 }}>
            "It's like owning a piece of arcade history — built for your home."
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
    <section style={{ background: '#F4F3EC', padding: '80px 0', borderTop: '1px solid #E0DDD4' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 6vw' }}>
        {/* Heading */}
        <h2 style={{
          fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          color: '#101213',
          margin: '0 0 56px',
          maxWidth: 640,
        }}>
          {data.title}
        </h2>

        {/* Two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
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
            <p style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 24, lineHeight: 1.6 }}>{active.subtitle}</p>

            {/* Features */}
            <div style={{ borderTop: '1px solid #E0DDD4' }}>
              {active.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #E0DDD4' }}>
                  <Icon type={f.icon} />
                  <span style={{ fontSize: 14, color: '#4B4B4B' }}>{f.text}</span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div style={{ fontSize: 36, fontWeight: 600, color: '#101213', margin: '24px 0' }}>
              {active.price}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
              <a
                href={active.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-amazon"
                style={{ padding: '14px 28px', textTransform: 'uppercase' }}
              >
                Buy on Amazon
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a
                href="/en/contact-us"
                style={{ fontSize: 14, color: '#101213', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 500 }}
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
    <section style={{ position: 'relative', width: '100%', height: 'clamp(500px, 75vh, 70vw)', overflow: 'hidden' }}>
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
      <div style={{ position: 'absolute', top: 30, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center',
          background: 'rgba(16,18,19,0.6)',
          backdropFilter: 'blur(5px)',
          padding: '15px 20px',
        }}>
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
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '50px 5vw 70px',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.28s ease',
      }}>
        <p style={{
          maxWidth: 600,
          fontSize: 24,
          fontWeight: 400,
          lineHeight: 1.15,
          color: '#F4F3EC',
          margin: 0,
        }}>
          {item.text}
        </p>
      </div>
    </section>
  )
}

// ─── B2B Section ─────────────────────────────────────────────────────────────

function B2BSection() {
  return (
    <section style={{ background: '#F4F3EC', padding: '80px 0 96px' }}>
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
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: '#101213',
            margin: '0 0 24px',
          }}>
            Interested in bringing Echo to your business?
          </h2>
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
              textDecoration: 'none', letterSpacing: '0.02em',
            }}
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
        <p style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 48 }}>
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
          <span style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#059FFF', marginBottom: 16 }}>
            Built Different
          </span>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            color: '#F4F3EC',
            margin: 0,
          }}>
            Why Operators Choose Echo
          </h2>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: '1px solid #222' }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              padding: '36px 32px',
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
              <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#F4F3EC', margin: '0 0 10px' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: '#787878', margin: 0 }}>
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
        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '-0.02em',
        color: '#fff',
        margin: '0 0 16px',
      }}>
        Ready to Bring Echo to Your Venue?
      </h2>
      <p style={{ fontSize: 17, fontWeight: 300, color: 'rgba(255,255,255,0.85)', margin: '0 0 40px' }}>
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EchoPage1() {
  const [data, setData] = useState<PageData | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchPageData()
      .then(setData)
      .catch(() => setError(true))
  }, [])

  if (error) return <div style={{ padding: 40, color: 'red' }}>Failed to load page data</div>
  if (!data) return <div style={{ height: '100vh', background: '#101213' }} />

  return (
    <div>
      <Hero data={data.hero} />
      <CountertopSection data={data.countertop} />
      <UseCasesSection />
      <ProductSection data={data.product} />
      <B2BSection />
      <LegacySection />
      <StatsSection />
      <FeatureGrid />
      <CTABanner />
    </div>
  )
}
