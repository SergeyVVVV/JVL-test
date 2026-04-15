'use client'

import { useState } from 'react'
import type { GameFeature } from '@/lib/db'

export default function GameFeatures({ features }: { features: GameFeature[] }) {
  const [open, setOpen] = useState(0)

  if (!features.length) return null

  return (
    <div className="gf-wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>

      {/* Left: accordion list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {features.map((f, i) => (
          <div key={f.id}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              style={{
                width: '100%', textAlign: 'left',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 0', background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: '1px solid rgba(244,243,236,0.10)',
                color: open === i ? '#F4F3EC' : 'rgba(244,243,236,0.55)',
                transition: 'color 0.18s',
                gap: 12,
              }}
            >
              <span style={{ fontSize: 16, fontWeight: open === i ? 700 : 400, transition: 'font-weight 0.1s' }}>
                {f.name ?? `Feature ${i + 1}`}
              </span>
              <svg
                width="14" height="14" viewBox="0 0 12 12" fill="none"
                style={{ flexShrink: 0, transition: 'transform 0.2s', transform: open === i ? 'rotate(180deg)' : 'none' }}
              >
                <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Mobile: inline content */}
            {open === i && f.text && (
              <div className="gf-mobile-content" style={{ padding: '12px 0 16px', display: 'none' }}>
                <p style={{ fontSize: 15, color: 'rgba(244,243,236,0.72)', lineHeight: 1.7, margin: 0 }}
                   dangerouslySetInnerHTML={{ __html: f.text }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right: active feature content */}
      <div className="gf-content-panel" style={{ position: 'sticky', top: 140 }}>
        {features[open] && (
          <div key={features[open].id}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#F4F3EC', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {features[open].name}
            </h3>
            {features[open].text && (
              <p
                style={{ fontSize: 15, color: 'rgba(244,243,236,0.72)', lineHeight: 1.75, margin: '0 0 24px' }}
                dangerouslySetInnerHTML={{ __html: features[open].text }}
              />
            )}
            {features[open].image && (
              <div style={{ borderRadius: 4, overflow: 'hidden', background: '#101213' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={features[open].image!}
                  alt={features[open].name ?? ''}
                  style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .gf-wrap { grid-template-columns: 1fr !important; gap: 0 !important; }
          .gf-content-panel { display: none !important; }
          .gf-mobile-content { display: block !important; }
        }
      `}</style>
    </div>
  )
}
