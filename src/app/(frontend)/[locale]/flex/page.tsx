import FlexHero from '@/components/FlexHero'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  return {
    title: 'JVL Flex — Land-Based Casino Cabinets',
    description: 'Land-based casino cabinets engineered for performance, revenue, and operator peace of mind. 40+ years of proven gaming excellence.',
  }
}

const MODELS = [
  {
    name: 'Diamond Link v43',
    image: 'https://www.jvl.ca/flex/DiamondLink_V43.png',
    pdf: 'https://www.jvl.ca/flex/DiamondLink_V43.pdf',
  },
  {
    name: 'PEACH1 D27',
    image: 'https://www.jvl.ca/flex/PEACH1_D27.png',
    pdf: 'https://www.jvl.ca/flex/PEACH1_D27.pdf',
  },
  {
    name: 'PEACH1 V43',
    image: 'https://www.jvl.ca/flex/PEACH1_V43.png',
    pdf: 'https://www.jvl.ca/flex/PEACH1_V43.pdf',
  },
  {
    name: 'PEACH2 D27',
    image: 'https://www.jvl.ca/flex/PEACH2_D27.png',
    pdf: 'https://www.jvl.ca/flex/PEACH2_D27.pdf',
  },
  {
    name: 'PEACH3 D27',
    image: 'https://www.jvl.ca/flex/PEACH3_D27.png',
    pdf: 'https://www.jvl.ca/flex/PEACH3_D27.pdf',
  },
]

export default function FlexPage() {
  return (
    <main id="flex-page" style={{ background: '#080a0b', color: '#F4F3EC', fontFamily: 'inherit', marginTop: -124 }}>

      {/* ── 1. Hero ── */}
      <FlexHero
        title="Experience FLEX — Precision."
        buttonText="Contact Us"
        buttonUrl="/en/contact-us"
        desktopVideoSrc="https://www.jvl.ca/img/flex_1920x1080.mp4"
        mobileVideoSrc="https://www.jvl.ca/img/flex_1080x1920_mobile.mp4"
      />

      {/* ── 2. Model-Specific Presentations ── */}
      <section style={{ background: '#101213', borderTop: '1px solid #1e2022', padding: '96px 0' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 6vw' }}>

          {/* Section header */}
          <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FB671F', margin: '0 0 14px' }}>
            Product Line
          </p>
          <h2 style={{
            fontFamily: 'inherit', fontSize: 'clamp(1.7rem, 2.5vw, 2.8rem)',
            fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.01em',
            textTransform: 'uppercase', color: '#F4F3EC', margin: '0 0 52px',
          }}>
            Model-Specific Presentations
          </h2>

          {/* Cards grid */}
          <div className="flex-models-grid">
            {MODELS.map((model) => (
              <div key={model.name} style={{
                background: '#181a1b', border: '1px solid #252729', borderRadius: 4,
                overflow: 'hidden', display: 'flex', flexDirection: 'column',
              }}>
                {/* Machine image */}
                <div style={{ background: '#0d0f10', padding: '32px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 220 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={model.image}
                    alt={model.name}
                    style={{ maxHeight: 200, maxWidth: '100%', objectFit: 'contain', display: 'block' }}
                  />
                </div>

                {/* Card footer */}
                <div style={{ padding: '20px 20px 24px', display: 'flex', flexDirection: 'column', gap: 16, flex: 1, justifyContent: 'space-between' }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: '#F4F3EC', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.3 }}>
                    {model.name}
                  </p>
                  <a
                    href={model.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                    style={{ fontSize: 12, padding: '10px 16px', justifyContent: 'center' }}
                  >
                    Download PDF
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Get in Touch ── */}
      <section style={{ background: '#080a0b', borderTop: '1px solid #1e2022', padding: '96px 0' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 6vw' }}>
          <div className="flex-contact-grid">

            {/* Left: contact info */}
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FB671F', margin: '0 0 14px' }}>
                Contact
              </p>
              <h2 style={{
                fontFamily: 'inherit', fontSize: 'clamp(1.7rem, 2.5vw, 2.8rem)',
                fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.01em',
                textTransform: 'uppercase', color: '#F4F3EC', margin: '0 0 20px',
              }}>
                Get in Touch With Our Team
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(244,243,236,0.62)', lineHeight: 1.7, margin: '0 0 48px', maxWidth: 440 }}>
                Our experts are ready to answer your questions, provide product details, and help you find the perfect solution for your needs.
              </p>

              {/* Department */}
              <div style={{ marginBottom: 32 }}>
                <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(244,243,236,0.4)', margin: '0 0 10px' }}>
                  JVL Sales
                </p>
                <a
                  href="tel:+14703041692"
                  style={{ display: 'block', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, color: '#F4F3EC', textDecoration: 'none', letterSpacing: '-0.02em', marginBottom: 16, transition: 'color 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#059FFF' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#F4F3EC' }}
                >
                  (470) 304-1692
                </a>
              </div>

              {/* Address */}
              <div style={{ marginBottom: 40 }}>
                <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(244,243,236,0.4)', margin: '0 0 10px' }}>
                  USA Headquarters
                </p>
                <p style={{ fontSize: 16, color: '#F4F3EC', lineHeight: 1.6, margin: 0 }}>
                  1380 Capital Circle<br />
                  Lawrenceville, GA 30043
                </p>
              </div>

              <Link
                href="/en/contact-us"
                className="btn-amazon"
                style={{ padding: '13px 24px', textTransform: 'uppercase' }}
              >
                Send Us a Message
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M1.5 6H10.5M6 1.5L10.5 6L6 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            {/* Right: Google Map */}
            <div style={{ borderRadius: 4, overflow: 'hidden', minHeight: 420 }}>
              <iframe
                title="JVL Headquarters"
                src="https://maps.google.com/maps?q=1380+Capital+Circle,+Lawrenceville,+GA+30043&z=15&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block', minHeight: 420, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        </div>
      </section>

      <style>{`
        .flex-models-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }
        .flex-contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        @media (max-width: 1100px) {
          .flex-models-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 767px) {
          .flex-models-grid { grid-template-columns: repeat(2, 1fr); }
          .flex-contact-grid { grid-template-columns: 1fr; gap: 48px; }
        }
        @media (max-width: 480px) {
          .flex-models-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  )
}
