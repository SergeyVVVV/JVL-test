'use client'

import { useState, useEffect, useCallback } from 'react'

export interface HeroSlide {
  bg: string | null
  video?: string | null
  eyebrow?: string
  heading: string
  body: string
  cta: { text: string; href: string; external?: boolean }
  ctaSecondary?: { text: string; href: string }
}

export default function HomeHeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  const goTo = useCallback((i: number) => {
    if (i === active || transitioning) return
    setTransitioning(true)
    setTimeout(() => {
      setActive(i)
      setTransitioning(false)
    }, 350)
  }, [active, transitioning])

  const goPrev = useCallback(() => goTo((active - 1 + slides.length) % slides.length), [active, slides.length, goTo])
  const goNext = useCallback(() => goTo((active + 1) % slides.length), [active, slides.length, goTo])

  // Auto-advance every 6s
  useEffect(() => {
    const t = setInterval(() => {
      goTo((active + 1) % slides.length)
    }, 6000)
    return () => clearInterval(t)
  }, [active, slides.length, goTo])

  const slide = slides[active]

  return (
    <section
      className="hp-hero"
      style={{ position: 'relative', background: '#080a0b', overflow: 'hidden' }}
    >
      {/* Background layer — fades on transition */}
      <div style={{
        position: 'absolute', inset: 0,
        opacity: transitioning ? 0 : 1,
        transition: 'opacity 0.35s ease',
      }}>
        {slide.bg && (
          <img
            src={slide.bg}
            alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
        {slide.video && (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            src={slide.video}
            poster={slide.bg ?? undefined}
            autoPlay muted loop playsInline
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>

      {/* Gradients */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.22) 55%, rgba(0,0,0,0.04) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0) 65%)' }} />

      {/* Content — also fades */}
      <div style={{
        position: 'absolute', bottom: 96, left: 0, right: 0, padding: '0 6vw',
        opacity: transitioning ? 0 : 1,
        transition: 'opacity 0.35s ease',
      }}>
        {slide.eyebrow && (
          <p style={{
            fontSize: 13, fontWeight: 700, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: '#FB671F', margin: '0 0 14px',
          }}>
            {slide.eyebrow}
          </p>
        )}
        <h1 className="hp-hero-h1" style={{
          fontFamily: 'inherit',
          fontSize: 'clamp(2rem, 3.5vw, 3.8rem)',
          fontWeight: 600, lineHeight: 1.1,
          letterSpacing: '-0.01em', textTransform: 'uppercase',
          color: '#fff', margin: '0 0 16px', maxWidth: 780,
        }}>
          {slide.heading}
        </h1>
        <p style={{
          fontSize: 16, fontWeight: 300,
          color: 'rgba(255,255,255,0.72)', margin: '0 0 32px',
          maxWidth: 500, lineHeight: 1.65,
        }}>
          {slide.body}
        </p>
        <div className="hp-hero-ctas" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <a
            href={slide.cta.href}
            target={slide.cta.external ? '_blank' : undefined}
            rel={slide.cta.external ? 'noopener noreferrer' : undefined}
            className="btn-amazon"
            style={{ padding: '14px 28px', textTransform: 'uppercase' }}
          >
            {slide.cta.text}
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          {slide.ctaSecondary && (
            <a
              href={slide.ctaSecondary.href}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 28px',
                border: '1px solid rgba(255,255,255,0.32)',
                borderRadius: 4,
                color: '#fff', textDecoration: 'none',
                fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
              }}
            >
              {slide.ctaSecondary.text}
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                <path d="M1.5 6H10.5M6 1.5L10.5 6L6 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Bottom bar: scroll hint + slide indicators */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.12)' }} />
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 6vw',
        }}>
          <button
            onClick={() => {
              const hero = document.querySelector('.hp-hero')
              if (hero) window.scrollTo({ top: hero.getBoundingClientRect().bottom + window.scrollY, behavior: 'smooth' })
            }}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              fontSize: 13, fontWeight: 600, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
          >
            Scroll to Explore ↓
          </button>

          {/* Prev/Next arrows + dots + counter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Prev arrow */}
            <button
              onClick={goPrev}
              aria-label="Previous slide"
              style={{
                background: 'none', border: '1px solid rgba(255,255,255,0.22)',
                borderRadius: '50%', width: 32, height: 32,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'rgba(255,255,255,0.55)', padding: 0,
                transition: 'border-color 0.2s, color 0.2s',
                flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18L9 12L15 6"/>
              </svg>
            </button>

            {/* Dots */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Slide ${i + 1}`}
                  style={{
                    width: active === i ? 28 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: active === i ? '#fff' : 'rgba(255,255,255,0.28)',
                    border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'width 0.3s ease, background 0.3s ease',
                  }}
                />
              ))}
            </div>

            {/* Next arrow */}
            <button
              onClick={goNext}
              aria-label="Next slide"
              style={{
                background: 'none', border: '1px solid rgba(255,255,255,0.22)',
                borderRadius: '50%', width: 32, height: 32,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'rgba(255,255,255,0.55)', padding: 0,
                transition: 'border-color 0.2s, color 0.2s',
                flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6L15 12L9 18"/>
              </svg>
            </button>

            {/* Counter */}
            <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>
              {String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
