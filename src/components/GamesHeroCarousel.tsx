'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import type { GameHeroSlide } from '@/lib/db'

interface Props {
  slides: GameHeroSlide[]
  locale?: string
}

export default function GamesHeroCarousel({ slides, locale = 'en' }: Props) {
  const [active, setActive] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

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

  // Auto-advance
  useEffect(() => {
    if (slides.length < 2) return
    timerRef.current = setInterval(() => {
      goTo((active + 1) % slides.length)
    }, 5000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [active, slides.length, goTo])

  if (!slides.length) return null

  const current = slides[active]

  // Swipe support
  const touchStartX = useRef<number | null>(null)
  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 30) delta > 0 ? goNext() : goPrev()
    touchStartX.current = null
  }

  return (
    <div
      className="ghc-wrap"
      style={{ position: 'relative', height: '65vh', minHeight: 440, overflow: 'hidden' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >

      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.gameId}
          style={{
            position: 'absolute', inset: 0,
            opacity: i === active ? (transitioning ? 0 : 1) : 0,
            transition: 'opacity 0.35s ease',
            pointerEvents: i === active ? 'auto' : 'none',
          }}
        >
          {s.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={s.image}
              alt=""
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
          ) : (
            <div style={{ position: 'absolute', inset: 0, background: '#101213' }} />
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,10,11,0.95) 0%, rgba(8,10,11,0.4) 50%, rgba(8,10,11,0.15) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,10,11,0.75) 0%, rgba(8,10,11,0) 55%)' }} />
        </div>
      ))}

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2, height: '100%',
        display: 'flex', alignItems: 'flex-end',
        opacity: transitioning ? 0 : 1,
        transition: 'opacity 0.35s ease',
      }}>
        <div style={{ maxWidth: 1440, width: '100%', margin: '0 auto', padding: '0 6vw 72px' }}>
          <h2 style={{
            fontFamily: 'inherit',
            fontSize: 'clamp(1.8rem, 4vw, 4rem)',
            fontWeight: 700, lineHeight: 1.05,
            letterSpacing: '-0.02em', textTransform: 'uppercase',
            color: '#F4F3EC', margin: '0 0 12px', maxWidth: 640,
          }}>
            {current.title}
          </h2>

          {current.description && (
            <p style={{
              fontSize: 17, color: 'rgba(244,243,236,0.65)', lineHeight: 1.65,
              margin: '0 0 28px', maxWidth: 460,
            }}>
              {current.description}
            </p>
          )}

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href={`/${locale}/games/${current.slug}`}
              className="btn-amazon"
              style={{ padding: '13px 28px', textTransform: 'uppercase' }}
            >
              View Game
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M1.5 6H10.5M6 1.5L10.5 6L6 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            {current.playUrl && (
              <a
                href={current.playUrl}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="btn-outline"
                style={{ padding: '13px 28px', textTransform: 'uppercase' }}
              >
                Play Demo
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar — same style as HomeHeroCarousel */}
      {slides.length > 1 && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3 }}>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.12)' }} />
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
            padding: '14px 6vw',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {/* Prev */}
              <button
                onClick={goPrev}
                aria-label="Previous slide"
                style={{
                  background: 'none', border: 'none',
                  cursor: 'pointer', color: 'rgba(255,255,255,0.55)', padding: 4,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'color 0.2s', flexShrink: 0,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                      height: 8, borderRadius: 4,
                      background: active === i ? '#fff' : 'rgba(255,255,255,0.28)',
                      border: 'none', cursor: 'pointer', padding: 0,
                      transition: 'width 0.3s ease, background 0.3s ease',
                    }}
                  />
                ))}
              </div>

              {/* Next */}
              <button
                onClick={goNext}
                aria-label="Next slide"
                style={{
                  background: 'none', border: 'none',
                  cursor: 'pointer', color: 'rgba(255,255,255,0.55)', padding: 4,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'color 0.2s', flexShrink: 0,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 6L15 12L9 18"/>
                </svg>
              </button>

              {/* Counter */}
              <span style={{ fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>
                {String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 767px) {
          .ghc-wrap { height: 55vh !important; min-height: 320px !important; }
        }
      `}</style>
    </div>
  )
}
