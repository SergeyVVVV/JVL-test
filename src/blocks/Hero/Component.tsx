'use client'

import { useEffect, useRef } from 'react'

interface HeroProps {
  headline: string
  subheadline?: string
  cta?: { label?: string; url?: string; style?: string }
  desktopVideo?: string
  mobileVideo?: string
  desktopPoster?: string
  mobilePoster?: string
  layout?: string
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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <section className="relative min-h-screen w-full flex items-end pb-20 md:items-center md:pb-0 overflow-hidden bg-[#101213] pt-[72px] md:pt-0">
      {/* Video background or placeholder */}
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
        /* Placeholder when no video */
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1a2e] via-[#101213] to-[#0a0a0a]">
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#059FFF]/5 to-transparent" />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#101213] via-[rgba(16,18,19,0.4)] to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(16,18,19,0.6)] to-transparent md:hidden" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 py-20 md:py-0">
        <div className="max-w-3xl">
          {headline && (
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-semibold uppercase leading-[1.05] tracking-tight text-[#F4F3EC] mb-6"
              style={{ whiteSpace: 'pre-line' }}
            >
              {headline}
            </h1>
          )}
          {subheadline && (
            <p className="text-base md:text-lg font-light text-[#F4F3EC] opacity-80 mb-10 max-w-lg">
              {subheadline}
            </p>
          )}
          {cta?.label && cta?.url && (
            <a
              href={cta.url}
              target={cta.url.startsWith('http') ? '_blank' : undefined}
              rel={cta.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 bg-[#059FFF] text-white font-semibold text-sm uppercase tracking-widest px-8 py-4 hover:bg-[#0080d4] transition-colors duration-200"
            >
              {cta.label}
              <span>↗</span>
            </a>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs uppercase tracking-widest text-[#F4F3EC] font-light">Scroll</span>
        <div className="w-px h-12 bg-[#F4F3EC] animate-pulse" />
      </div>
    </section>
  )
}
