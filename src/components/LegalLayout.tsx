import Link from 'next/link'

interface Section {
  heading: string
  content: React.ReactNode
}

interface Props {
  badge: string
  title: string
  lastUpdated: string
  sections: Section[]
}

const h2Style: React.CSSProperties = {
  fontSize: 'clamp(1.4rem, 2.5vw, 2.4rem)',
  fontWeight: 700,
  color: '#F4F3EC',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  margin: '48px 0 16px',
}

const pStyle: React.CSSProperties = {
  fontSize: 16,
  color: 'rgba(244,243,236,0.65)',
  lineHeight: 1.8,
  margin: '0 0 14px',
}

const ulStyle: React.CSSProperties = {
  margin: '0 0 14px',
  paddingLeft: 22,
  color: 'rgba(244,243,236,0.65)',
  fontSize: 16,
  lineHeight: 1.8,
}

export { h2Style, pStyle, ulStyle }

export default function LegalLayout({ badge, title, lastUpdated, sections }: Props) {
  return (
    <main
      style={{
        background: '#080a0b',
        color: '#F4F3EC',
        fontFamily: 'inherit',
        minHeight: '100vh',
        marginTop: -124,
      }}
    >
      <div className="legal-container" style={{ maxWidth: 960, margin: '0 auto', padding: '204px 6vw 120px' }}>

        {/* Badge */}
        <p style={{
          fontSize: 13, fontWeight: 700, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: '#FB671F',
          margin: '0 0 14px', textAlign: 'center',
        }}>
          {badge}
        </p>

        {/* Title */}
        <h1 style={{
          fontFamily: 'inherit',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.02em',
          textTransform: 'uppercase', color: '#F4F3EC',
          textAlign: 'center', margin: '0 0 16px',
        }}>
          {title}
        </h1>

        {/* Last updated */}
        <p style={{
          fontSize: 13, color: 'rgba(244,243,236,0.35)',
          textAlign: 'center', margin: '0 0 64px',
          letterSpacing: '0.04em',
        }}>
          Last updated: {lastUpdated}
        </p>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(244,243,236,0.08)', marginBottom: 48 }} />

        {/* Sections */}
        <div>
          {sections.map((s, i) => (
            <div key={i}>
              <h2 style={h2Style}>{s.heading}</h2>
              {s.content}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(244,243,236,0.08)', margin: '56px 0 40px' }} />

        {/* Footer nav */}
        <div className="legal-footer-nav" style={{ fontSize: 13, color: 'rgba(244,243,236,0.35)', textAlign: 'center' }}>
          <Link href="/en/privacy-policy" style={{ color: 'rgba(244,243,236,0.45)', textDecoration: 'none' }}>Privacy Policy</Link>
          <span className="legal-sep" style={{ margin: '0 12px', opacity: 0.3 }}>·</span>
          <Link href="/en/terms-of-use" style={{ color: 'rgba(244,243,236,0.45)', textDecoration: 'none' }}>Terms of Use</Link>
          <span className="legal-sep" style={{ margin: '0 12px', opacity: 0.3 }}>·</span>
          <Link href="/en/contact-us" style={{ color: 'rgba(244,243,236,0.45)', textDecoration: 'none' }}>Contact Us</Link>
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .legal-container { padding: 164px 5vw 80px !important; }
        }
        @media (max-width: 480px) {
          .legal-footer-nav { display: flex; flex-direction: column; align-items: center; gap: 10px; }
          .legal-sep { display: none; }
        }
      `}</style>
    </main>
  )
}
