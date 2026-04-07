'use client'

import { useEffect, useRef, useState } from 'react'

interface HeroProps {
  headline: string
  subheadline?: string
  cta?: { label?: string; url?: string }
  desktopVideo?: string
  mobileVideo?: string
  desktopPoster?: string
  mobilePoster?: string
}

export default function HeroComponent({
  headline,
  subheadline,
  cta,
  desktopVideo,
  mobileVideo,
  desktopPoster,
  mobilePoster,
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  const togglePlay = () => {
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
    } else {
      videoRef.current.play().catch(() => {})
    }
    setPlaying(!playing)
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !muted
    setMuted(!muted)
  }

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{ height: '100svh', minHeight: '600px' }}
    >
      {/* Video / placeholder background */}
      {desktopVideo ? (
        <>
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover hidden md:block"
            src={desktopVideo}
            poster={desktopPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          />
          {mobileVideo && (
            <video
              className="absolute inset-0 w-full h-full object-cover md:hidden"
              src={mobileVideo}
              poster={mobilePoster}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
            />
          )}
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1a2e] via-[#101213] to-[#050505]" />
      )}

      {/* Dark overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />

      {/* Headline — positioned above the bottom strip */}
      <div className="absolute bottom-[60px] md:bottom-[68px] left-0 z-10 px-8 md:px-14 lg:px-20 pb-5">
        {headline && (
          <h1
            className="text-[2.2rem] sm:text-[3rem] md:text-[3.75rem] lg:text-[4.5rem] font-black uppercase leading-[1.05] tracking-tight text-white"
            style={{ maxWidth: '700px', whiteSpace: 'pre-line' }}
          >
            {headline}
          </h1>
        )}
        {subheadline && (
          <p className="mt-3 text-sm md:text-base font-light text-white/60 max-w-xl">
            {subheadline}
          </p>
        )}
      </div>

      {/* Bottom strip: divider + controls + CTA */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px bg-white/25" />
        <div className="flex items-center justify-between px-8 md:px-14 lg:px-20 py-4 md:py-5">
          {/* Video controls */}
          <div className="flex items-center gap-5">
            {desktopVideo && (
              <>
                <button
                  onClick={togglePlay}
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label={playing ? 'Pause' : 'Play'}
                >
                  {playing ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={toggleMute}
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label={muted ? 'Unmute' : 'Mute'}
                >
                  {muted ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  )}
                </button>
              </>
            )}
          </div>

          {/* CTA button */}
          {cta?.label && cta?.url && (
            <a
              href={cta.url}
              target={cta.url.startsWith('http') ? '_blank' : undefined}
              rel={cta.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 bg-[#059FFF] text-white font-semibold text-sm px-6 py-3 hover:bg-[#007fd4] transition-colors"
            >
              {cta.label}
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
