import Link from 'next/link'

export async function generateMetadata() {
  return {
    title: 'Partners — JVL',
    description: 'JVL works with platform providers and operators worldwide to design and build personalized slot games that match your brand and objectives.',
  }
}

export default function PartnersPage() {
  return (
    <main
      id="partners-page"
      style={{ background: '#080a0b', color: '#F4F3EC', fontFamily: 'inherit', minHeight: '100vh', marginTop: -124 }}
    >

      {/* ── Hero ── */}
      <section style={{ padding: '204px 6vw 96px', maxWidth: 1440, margin: '0 auto' }}>
        <p style={{
          fontSize: 13, fontWeight: 700, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: '#FB671F', margin: '0 0 20px',
        }}>
          Work with us
        </p>
        <h1 style={{
          fontFamily: 'inherit',
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.03em',
          textTransform: 'uppercase', color: '#F4F3EC',
          margin: '0 0 64px', maxWidth: 800,
        }}>
          Partners
        </h1>

        {/* Two-column text */}
        <div className="partners-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6vw', borderTop: '1px solid rgba(244,243,236,0.10)', paddingTop: 56 }}>
          <p style={{ fontSize: 18, color: 'rgba(244,243,236,0.72)', lineHeight: 1.75, margin: 0 }}>
            We work both with your chosen platform provider or by direct integration.
            JVL can design and build personalized, custom slot games to match your brand
            and your objectives.
          </p>
          <p style={{ fontSize: 18, color: 'rgba(244,243,236,0.72)', lineHeight: 1.75, margin: 0 }}>
            Our extensive network of partners and our highly acclaimed portfolio stand
            proof to our sustainable capacity to meet highest standards of technology,
            design, support and interoperability.
          </p>
        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{ height: 1, background: 'rgba(244,243,236,0.07)', margin: '0 6vw' }} />

      {/* ── CTA section ── */}
      <section style={{ padding: '120px 6vw', textAlign: 'center', maxWidth: 1440, margin: '0 auto' }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center',
          border: '1px solid rgba(244,243,236,0.22)', borderRadius: 40,
          padding: '7px 20px', marginBottom: 40,
        }}>
          <span style={{ fontSize: 13, color: 'rgba(244,243,236,0.65)', letterSpacing: '0.04em' }}>
            Everything is possible
          </span>
        </div>

        <h2 style={{
          fontFamily: 'inherit',
          fontSize: 'clamp(2rem, 5vw, 4.2rem)',
          fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.02em',
          textTransform: 'uppercase', color: '#F4F3EC',
          margin: '0 auto 28px', maxWidth: 860,
        }}>
          Ready to Start a Conversation?
        </h2>

        <p style={{
          fontSize: 17, color: 'rgba(244,243,236,0.58)', lineHeight: 1.7,
          margin: '0 auto 48px', maxWidth: 560,
        }}>
          The key for us as a true B2B iGaming software provider is to help gaming
          operators implement bold ideas and unleash unlimited creativity.
        </p>

        <Link
          href="/en/contact-us"
          className="btn-amazon"
          style={{ padding: '15px 40px', textTransform: 'uppercase', fontSize: 15 }}
        >
          Contact Us
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M1.5 6H10.5M6 1.5L10.5 6L6 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </section>

      <style>{`
        @media (max-width: 767px) {
          .partners-cols { grid-template-columns: 1fr !important; gap: 32px !important; }
          #partners-page > section:first-child { padding-top: 164px !important; padding-bottom: 64px !important; }
        }
      `}</style>
    </main>
  )
}
