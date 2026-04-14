'use client'

import { useRef, useState, useEffect } from 'react'

interface EchoB2bHeroProps {
  title: string
  subtitle?: string
  buttonText: string
  buttonUrl: string
  videoSrc?: string | null
  posterSrc?: string | null
}

export default function EchoB2bHero({
  title, subtitle, buttonText, buttonUrl, videoSrc, posterSrc,
}: EchoB2bHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  return (
    <>
    <style>{`
      .eb2b-hero { height: 100svh; min-height: 600px; }
      @media (max-width: 767px) { .eb2b-hero { height: 75vh; min-height: 450px; }
    `}</style>
    <section className="echo-hero eb2b-hero" style={{
      position: 'relative', width: '100%', background: '#080a0b',
      overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    }}>
      {/* Video (no poster placeholder — dark bg until video loads) */}
      {videoSrc && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay muted loop playsInline
          className="echo-hero-video"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}

      {/* Gradient overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.0) 60%)' }} />

      {/* Headline */}
      <div style={{ position: 'relative', bottom: 'auto', padding: '0 5vw 80px' }}>
        <h1 className="echo-hero-h1" style={{
          fontFamily: 'inherit',
          fontSize: 'clamp(2rem, 3.5vw, 3.8rem)',
          fontWeight: 600, lineHeight: 1.1,
          letterSpacing: '-0.01em', textTransform: 'uppercase',
          color: '#fff', margin: 0, maxWidth: 860,
        }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{
            fontSize: 16, fontWeight: 300,
            color: 'rgba(255,255,255,0.68)', margin: 0,
            maxWidth: 520, lineHeight: 1.65,
          }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom bar */}
      <div style={{ position: 'relative' }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.15)' }} />
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 5vw', maxWidth: 1440, margin: '0 auto', width: '100%',
        }}>
          {/* Video controls */}
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <button
              onClick={() => {
                if (videoRef.current) {
                  playing ? videoRef.current.pause() : videoRef.current.play()
                  setPlaying(!playing)
                }
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', padding: 0, display: 'flex' }}
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing
                ? <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                : <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              }
            </button>
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.muted = !muted
                  setMuted(!muted)
                }
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', padding: 0, display: 'flex' }}
              aria-label={muted ? 'Unmute' : 'Mute'}
            >
              {muted
                ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
              }
            </button>
          </div>

          {/* CTA */}
          <a
            href={buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-amazon"
            style={{ padding: '14px 28px', textTransform: 'uppercase' }}
          >
            {buttonText}
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
    </>
  )
}
