import Link from 'next/link'

export default function EchoBanner({ locale }: { locale: string }) {
  return (
    <>
      <style>{`
        .echo-banner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #2a2a2a;
        }
        @media (max-width: 767px) {
          .echo-banner { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="echo-banner">
        {/* For Home */}
        <div style={{ background: '#101213', padding: '48px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FB671F' }}>
            For Home
          </span>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 700, lineHeight: 1.2, color: '#F4F3EC', margin: 0, textTransform: 'uppercase' }}>
            Echo HD3 — Premium Touchscreen Arcade
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(244,243,236,0.65)', lineHeight: 1.7, margin: 0 }}>
            Bring the full arcade experience home. 100+ games, HD touchscreen, tournament-grade hardware.
          </p>
          <div>
            <Link href={`/${locale}/echo`} className="btn-amazon" style={{ textTransform: 'uppercase', padding: '12px 28px' }}>
              Echo for Home
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M1.5 6H10.5M6 1.5L10.5 6L6 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* For Business */}
        <div style={{ background: '#181a1b', padding: '48px 40px', display: 'flex', flexDirection: 'column', gap: 16, borderLeft: '1px solid #2a2a2a' }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#059FFF' }}>
            For Business
          </span>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 700, lineHeight: 1.2, color: '#F4F3EC', margin: 0, textTransform: 'uppercase' }}>
            Echo B2B — Revenue-Generating Gaming
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(244,243,236,0.65)', lineHeight: 1.7, margin: 0 }}>
            Designed for bars, lounges, and hospitality venues. Proven ROI with industry-leading support.
          </p>
          <div>
            <Link href={`/${locale}/echo-b2b`} className="btn-outline" style={{ textTransform: 'uppercase', padding: '12px 28px' }}>
              Echo for Business
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M1.5 6H10.5M6 1.5L10.5 6L6 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
