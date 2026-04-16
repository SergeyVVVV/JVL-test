'use client'

import { useState, useEffect, useRef } from 'react'
import type { GameHeroSlide } from '@/lib/db'

interface Props {
  slides: GameHeroSlide[]
  locale?: string
}

export default function GamesHeroCarousel({ slides, locale = 'en' }: Props) {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function go(idx: number) {
    if (animating || idx === active) return
    setAnimating(true)
    setActive(idx)
    setTimeout(() => setAnimating(false), 600)
  }

  useEffect(() => {
    if (slides.length < 2) return
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % slides.length)
    }, 5000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [slides.length])

  if (!slides.length) return null

  const current = slides[active]

  return (
    <div className="ghc-wrap" style={{ position: 'relative', height: '65vh', minHeight: 440, overflow: 'hidden' }}>

      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.gameId}
          style={{
            position: 'absolute', inset: 0,
            opacity: i === active ? 1 : 0,
            transition: 'opacity 0.6s ease',
            pointerEvents: i === active ? 'auto' : 'none',
          }}
        >
          {/* Background image */}
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

          {/* Gradient overlays */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,10,11,0.95) 0%, rgba(8,10,11,0.4) 50%, rgba(8,10,11,0.15) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,10,11,0.75) 0%, rgba(8,10,11,0) 55%)' }} />
        </div>
      ))}

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2, height: '100%',
        display: 'flex', alignItems: 'flex-end',
      }}>
        <div style={{ maxWidth: 1440, width: '100%', margin: '0 auto', padding: '0 6vw 56px' }}>

          {/* Title */}
          <h2 style={{
            fontFamily: 'inherit',
            fontSize: 'clamp(1.8rem, 4vw, 4rem)',
            fontWeight: 700, lineHeight: 1.05,
            letterSpacing: '-0.02em', textTransform: 'uppercase',
            color: '#F4F3EC', margin: '0 0 12px', maxWidth: 640,
            transition: 'opacity 0.4s',
          }}>
            {current.title}
          </h2>

          {/* Description */}
          {current.description && (
            <p style={{
              fontSize: 15, color: 'rgba(244,243,236,0.65)', lineHeight: 1.65,
              margin: '0 0 28px', maxWidth: 460,
            }}>
              {current.description}
            </p>
          )}

          {/* CTAs */}
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

      {/* Dots / thumbnails */}
      {slides.length > 1 && (
        <div style={{
          position: 'absolute', bottom: 20, right: '6vw', zIndex: 3,
          display: 'flex', gap: 8, alignItems: 'center',
        }}>
          {slides.map((s, i) => (
            <button
              key={s.gameId}
              onClick={() => go(i)}
              aria-label={s.title ?? `Slide ${i + 1}`}
              style={{
                width: i === active ? 28 : 8,
                height: 8, borderRadius: 4, border: 'none', cursor: 'pointer', padding: 0,
                background: i === active ? '#FB671F' : 'rgba(244,243,236,0.35)',
                transition: 'width 0.3s, background 0.3s',
              }}
            />
          ))}
        </div>
      )}

      {/* Prev / Next arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => go((active - 1 + slides.length) % slides.length)}
            aria-label="Previous"
            style={{
              position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
              zIndex: 3, width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.18)',
              color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18L9 12L15 6"/></svg>
          </button>
          <button
            onClick={() => go((active + 1) % slides.length)}
            aria-label="Next"
            style={{
              position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
              zIndex: 3, width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.18)',
              color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6L15 12L9 18"/></svg>
          </button>
        </>
      )}

      <style>{`
        @media (max-width: 767px) {
          .ghc-wrap { height: 55vh !important; min-height: 320px !important; }
        }
      `}</style>
    </div>
  )
}
