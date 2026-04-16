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
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '204px 6vw 120px' }}>

        {/* Badge */}
        <p style={{
          fontSize: 13, fontWeight: 700, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: '#FB671F', margin: '0 0 20px',
        }}>
          Our Story
        </p>

        {/* H1 */}
        <h1 style={{
          fontFamily: 'inherit',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em',
          textTransform: 'uppercase', color: '#F4F3EC',
          margin: '0 0 64px',
        }}>
          About JVL
        </h1>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(244,243,236,0.08)', marginBottom: 64 }} />

        {/* Content with float image */}
        <div className="about-content">

          {/* Image — float right */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/api/storage/3567/about-jvl.jpg"
            alt="Joseph Levitan, founder of JVL"
            className="about-photo"
          />

          <h2 style={{
            fontFamily: 'inherit',
            fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)',
            fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.01em',
            textTransform: 'uppercase', color: '#F4F3EC',
            margin: '0 0 32px',
          }}>
            A Family Tradition of Precision, Passion, and Play
          </h2>

          <p className="about-body">
            In 1984, Joseph Levitan opened a modest coin-operated machine repair shop in a small
            garage in Canada, laying the cornerstone for what would become a multigenerational family
            enterprise. Joseph, an experienced craftsman with a passion for precision mechanics, built
            the business on principles of integrity, quality, and meticulous attention to detail.
          </p>
          <p className="about-body">
            When Joseph&apos;s son Val joined the business, he quickly learned from his father&apos;s extensive
            expertise. Joseph patiently guided every aspect of the business through its early
            stages — meticulously fixing buttons, polishing cabinets, and fine-tuning mechanics until
            each machine felt brand new. Together, their days were filled with the steady hum of
            machines, the scent of solder, and the quiet satisfaction of bringing broken games back to life.
          </p>
          <p className="about-body">
            Word spread about Joseph and Val&apos;s commitment to craftsmanship. Customers returned
            repeatedly, appreciating the genuine care Joseph instilled into every project. Each machine
            they worked on reflected Joseph&apos;s lifelong commitment to excellence.
          </p>
          <p className="about-body">
            By the early 1990s, the company expanded from repairs into designing and creating its own games —
            combining hardware, software, and aesthetics into a unique product line. Today, three generations
            of the Levitan family operate the business, upholding Joseph&apos;s founding values while
            embracing innovation. <em style={{ color: 'rgba(244,243,236,0.55)', fontStyle: 'italic' }}>We Take Our Games Seriously.</em>
          </p>

          <div style={{ clear: 'both' }} />
        </div>

        {/* Stats */}
        <div style={{ height: 1, background: 'rgba(244,243,236,0.08)', margin: '64px 0 48px' }} />
        <div className="about-stats">
          {[
            { value: '40+', label: 'Years in the industry' },
            { value: '1984', label: 'Founded' },
            { value: '3rd', label: 'Generation family business' },
          ].map(s => (
            <div key={s.label}>
              <p style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 800,
                color: '#F4F3EC', margin: '0 0 8px', lineHeight: 1, letterSpacing: '-0.02em',
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

      <style>{`
        .about-content { overflow: hidden; }

        .about-photo {
          float: right;
          width: 340px;
          margin: 4px 0 32px 48px;
          border-radius: 4px;
          display: block;
          filter: grayscale(100%) contrast(1.05);
        }

        .about-body {
          font-size: 17px;
          color: rgba(244,243,236,0.72);
          line-height: 1.8;
          margin: 0 0 20px;
        }

        .about-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        @media (max-width: 767px) {
          .about-photo { float: none; width: 100%; margin: 0 0 32px 0; }
          #about-page > div { padding-top: 164px !important; }
        }
        @media (max-width: 540px) {
          .about-stats { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </main>
  )
}
