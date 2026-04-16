export async function generateMetadata() {
  return {
    title: 'About JVL — A Family Tradition of Precision, Passion, and Play',
    description: 'Since 1984, JVL has been a family-owned supplier of gaming cabinets, slot games, and coin-operated amusement machines — built on integrity and craftsmanship.',
  }
}

export default function AboutJVLPage() {
  return (
    <main
      id="about-page"
      style={{ background: '#080a0b', color: '#F4F3EC', fontFamily: 'inherit', minHeight: '100vh', marginTop: -124 }}
    >

      {/* ── Hero ── */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '204px 6vw 96px' }}>
        <p style={{
          fontSize: 13, fontWeight: 700, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: '#FB671F', margin: '0 0 20px',
        }}>
          Our Story
        </p>
        <h1 style={{
          fontFamily: 'inherit',
          fontSize: 'clamp(2.4rem, 6vw, 5.5rem)',
          fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.03em',
          textTransform: 'uppercase', color: '#F4F3EC',
          margin: 0,
        }}>
          About JVL
        </h1>
      </section>

      {/* ── Main content ── */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 6vw 120px' }}>

        <div className="about-grid">

          {/* Left: text */}
          <div>
            <h2 style={{
              fontFamily: 'inherit',
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em',
              textTransform: 'uppercase', color: '#F4F3EC',
              margin: '0 0 40px',
            }}>
              A Family Tradition of Precision, Passion, and Play
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <p style={{ fontSize: 16, color: 'rgba(244,243,236,0.72)', lineHeight: 1.8, margin: 0 }}>
                In 1984, Joseph Levitan opened a modest coin-operated machine repair shop in a small
                garage in Canada, laying the cornerstone for what would become a multigenerational family
                enterprise. Joseph, an experienced craftsman with a passion for precision mechanics, built
                the business on principles of integrity, quality, and meticulous attention to detail.
              </p>
              <p style={{ fontSize: 16, color: 'rgba(244,243,236,0.72)', lineHeight: 1.8, margin: 0 }}>
                When Joseph&apos;s son Vivi joined the business, he quickly learned from his father&apos;s extensive
                expertise. Joseph patiently guided every aspect of the business through its early
                stages — meticulously fixing buttons, polishing cabinets, and fine-tuning mechanics until
                each machine felt brand new. Together, their days were filled with the steady hum of
                machines, the scent of solder, and the quiet satisfaction of bringing broken games back to life.
              </p>
              <p style={{ fontSize: 16, color: 'rgba(244,243,236,0.72)', lineHeight: 1.8, margin: 0 }}>
                Word spread about Joseph and Vivi&apos;s commitment to craftsmanship. Customers returned
                repeatedly, appreciating the genuine care Joseph instilled into every project. Each machine
                they worked on reflected Joseph&apos;s lifelong commitment to excellence.
              </p>
            </div>

            {/* Stats */}
            <div className="about-stats">
              {[
                { value: '40+', label: 'Years in the industry' },
                { value: '1984', label: 'Founded' },
                { value: '3rd', label: 'Generation family business' },
              ].map(s => (
                <div key={s.label} style={{ borderTop: '1px solid rgba(244,243,236,0.12)', paddingTop: 20 }}>
                  <p style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800,
                    color: '#F4F3EC', margin: '0 0 6px', lineHeight: 1,
                  }}>
                    {s.value}
                  </p>
                  <p style={{ fontSize: 13, color: 'rgba(244,243,236,0.45)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: photo */}
          <div className="about-photo-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://www.jvl.ca/storage/3567/about-jvl.jpg"
              alt="Joseph Levitan, founder of JVL"
              style={{
                width: '100%', display: 'block', borderRadius: 4,
                filter: 'grayscale(100%) contrast(1.05)',
              }}
            />
          </div>
        </div>
      </section>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 80px;
          align-items: start;
        }
        .about-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 56px;
        }
        @media (max-width: 1023px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .about-photo-wrap { order: -1; max-width: 480px; }
        }
        @media (max-width: 640px) {
          #about-page > section:first-child { padding-top: 164px !important; }
          .about-stats { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </main>
  )
}
