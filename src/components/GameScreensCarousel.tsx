'use client'

import { useState, useRef } from 'react'
import type { GameScreenSlide } from '@/lib/db'

export default function GameScreensCarousel({ slides, title }: { slides: GameScreenSlide[]; title: string }) {
  const [active, setActive] = useState(0)
  const thumbsRef = useRef<HTMLDivElement>(null)

  if (!slides.length) return null

  function go(i: number) {
    const idx = Math.max(0, Math.min(slides.length - 1, i))
    setActive(idx)
    // scroll thumb into view
    const thumb = thumbsRef.current?.children[idx] as HTMLElement
    thumb?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }

  const current = slides[active]
  const isVideo = !!(current.videoFile || current.url)

  return (
    <div>
      {/* Main slide */}
      <div className="gsc-main" style={{
        position: 'relative', background: '#0d0f10', borderRadius: 4,
        overflow: 'hidden', aspectRatio: '16/9', maxWidth: '100%',
      }}>
        {isVideo ? (
          current.videoFile ? (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
              key={current.id}
              src={current.videoFile}
              poster={current.mainImage ?? undefined}
              controls
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
            />
          ) : (
            <iframe
              key={current.id}
              title={title}
              src={current.url ?? ''}
              style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={current.id}
            src={current.mainImage ?? ''}
            alt={`${title} screenshot ${active + 1}`}
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
        )}

        {/* Prev / Next arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={() => go(active - 1)}
              disabled={active === 0}
              aria-label="Previous"
              style={{
                position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.18)',
                color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: active === 0 ? 0.3 : 1, transition: 'opacity 0.18s',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18L9 12L15 6"/></svg>
            </button>
            <button
              onClick={() => go(active + 1)}
              disabled={active === slides.length - 1}
              aria-label="Next"
              style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.18)',
                color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: active === slides.length - 1 ? 0.3 : 1, transition: 'opacity 0.18s',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6L15 12L9 18"/></svg>
            </button>
          </>
        )}

        {/* Counter */}
        <div style={{
          position: 'absolute', bottom: 12, right: 14,
          fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.08em',
        }}>
          {String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </div>
      </div>

      {/* Thumbnails */}
      {slides.length > 1 && (
        <div
          ref={thumbsRef}
          style={{
            display: 'flex', gap: 8, overflowX: 'auto', marginTop: 12,
            scrollbarWidth: 'none', paddingBottom: 2,
          }}
        >
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i)}
              style={{
                flexShrink: 0, width: 96, height: 60, borderRadius: 3, overflow: 'hidden',
                border: i === active ? '2px solid #FB671F' : '2px solid transparent',
                background: '#0d0f10', padding: 0, cursor: 'pointer', transition: 'border-color 0.18s',
                position: 'relative',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.mainImage ?? ''}
                alt={`thumb ${i + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: i === active ? 1 : 0.55 }}
              />
              {(s.videoFile || s.url) && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.8)"><path d="M8 5v14l11-7z"/></svg>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      <style>{`
        .gsc-main video, .gsc-main iframe { background: #0d0f10; }
      `}</style>
    </div>
  )
}
