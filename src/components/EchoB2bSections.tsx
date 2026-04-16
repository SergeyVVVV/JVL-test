'use client'

import { useState } from 'react'

/* ─── Places / Venues (tab-based full-bleed images) ────────────────────────── */

interface VenueItem {
  title: string
  text: string
  image: string | null
}

export function VenuesSection({ items }: { items: VenueItem[] }) {
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

  const item = items[displayed]
  if (!item) return null

  return (
    <section className="eb2b-uc-section" style={{ position: 'relative', width: '100%', height: 'clamp(500px, 75vh, 70vw)', overflow: 'hidden' }}>
      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: item.image ? `url(${item.image})` : 'none',
        backgroundColor: '#080a0b',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.28s ease',
      }} />

      {/* Gradients */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%)' }} />

      {/* Tab bar */}
      <div className="eb2b-uc-outer" style={{ position: 'absolute', top: 30, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <div className="eb2b-uc-tabs">
          {items.map((uc, i) => (
            <button
              key={uc.title}
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
              {uc.title}
            </button>
          ))}
        </div>
      </div>

      {/* Text */}
      <div className="eb2b-uc-text-wrap" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '50px 5vw 70px',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.28s ease',
      }}>
        <p className="eb2b-uc-desc" style={{ maxWidth: 600, margin: 0 }}>
          {item.text}
        </p>
      </div>

      <style>{`
        .eb2b-uc-tabs { display: inline-flex; align-items: center; background: rgba(16,18,19,0.6); backdrop-filter: blur(5px); padding: 15px 20px; border-radius: 4px; }
        .eb2b-uc-desc { font-size: 24px; font-weight: 400; line-height: 1.15; color: #F4F3EC; }
        @media (max-width: 767px) {
          .eb2b-uc-section { height: 520px !important; }
          .eb2b-uc-outer { padding: 0 16px !important; }
          .eb2b-uc-tabs {
            display: flex !important;
            flex-direction: column !important;
            width: 100% !important;
            padding: 0 !important;
          }
          .eb2b-uc-tabs button {
            padding: 11px 16px !important;
            font-size: 14px !important;
            border-left: none !important;
            border-bottom: 1px solid rgba(244,243,236,0.18) !important;
            text-align: left !important;
            white-space: normal !important;
          }
          .eb2b-uc-tabs button:last-child { border-bottom: none !important; }
          .eb2b-uc-desc { font-size: 15px !important; line-height: 1.45 !important; }
          .eb2b-uc-text-wrap { padding: 20px 5vw 36px !important; }
        }
      `}</style>
    </section>
  )
}

/* ─── Features (image left, accordion right) ───────────────────────────────── */

interface FeatureItem {
  title: string
  text: string
  image: string | null
}

export function FeaturesSection({
  heading,
  description,
  buttonText,
  buttonUrl,
  items,
}: {
  heading: string
  description: string
  buttonText: string | null
  buttonUrl: string | null
  items: FeatureItem[]
}) {
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
            {heading}
          </h2>
          <div className="eb2b-specs-hdr">
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.75, color: '#4B4B4B', margin: 0 }}>
              {description}
            </p>
            {buttonUrl && (
              <a
                href={buttonUrl}
                target="_blank" rel="noopener noreferrer"
                className="btn-amazon"
                style={{ padding: '10px 20px', whiteSpace: 'nowrap' }}
              >
                {buttonText ?? 'Buy on Amazon'}
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Two-col: image left, accordion right */}
        <div className="eb2b-specs-grid">

          {/* Image */}
          <div className="eb2b-specs-img">
            {items[Math.max(open, 0)]?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={Math.max(open, 0)}
                src={items[Math.max(open, 0)].image!}
                alt={items[Math.max(open, 0)].title}
                style={{ width: '100%', display: 'block', borderRadius: 4 }}
              />
            ) : (
              <div style={{ width: '100%', aspectRatio: '4/3', background: '#E0DDD4', borderRadius: 4 }} />
            )}
          </div>

          {/* Accordion */}
          <div>
            {items.map((item, i) => (
              <div key={i} style={{ borderTop: '1px solid #D0CEC6' }}>
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
                  {item.title}
                  <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    style={{ flexShrink: 0, transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: open === i ? '#FB671F' : '#787878' }}
                  >
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {open === i && (
                  <div style={{ paddingBottom: 20 }}>
                    <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.75, color: '#4B4B4B', margin: 0 }}>
                      {item.text}
                    </p>
                  </div>
                )}
              </div>
            ))}
            <div style={{ borderTop: '1px solid #D0CEC6' }} />
          </div>

        </div>
      </div>

      <style>{`
        .eb2b-specs-hdr { display: grid; grid-template-columns: 1fr auto; gap: 48px; align-items: center; }
        .eb2b-specs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .eb2b-specs-img { position: sticky; top: 140px; }
        @media (max-width: 767px) {
          .eb2b-specs-hdr { grid-template-columns: 1fr; gap: 20px; }
          .eb2b-specs-hdr > a { justify-self: start; width: auto !important; }
          .eb2b-specs-grid { grid-template-columns: 1fr; gap: 24px; }
          .eb2b-specs-img { position: static; }
        }
      `}</style>
    </section>
  )
}
