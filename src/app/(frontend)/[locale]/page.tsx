import { getLandingBlock, getNewsList, getSlides, getGameThemes } from '@/lib/db'
import HomeHeroCarousel, { type HeroSlide } from '@/components/HomeHeroCarousel'
import NewsCard from '@/components/NewsCard'

export const dynamic = 'force-dynamic'

// ── Static product data ───────────────────────────────────────────────────────

const PRODUCTS = [
  {
    label: 'FLEX',
    desc: 'Land-based casino cabinets engineered for performance, revenue, and operator peace of mind.',
    img: '/api/img?url=https://www.jvl.ca/storage/3644/9.jpg',
    href: '/en/flex',
    dark: true,
  },
  {
    label: 'Online Games',
    desc: 'A growing library of slot titles built for both land-based cabinets and web platforms.',
    img: '/api/img?url=https://www.jvl.ca/storage/3646/14.jpg',
    href: '/en/games',
    dark: true,
  },
  {
    label: 'ECHO',
    desc: '22" touchscreen countertop arcade with 149 built-in games — for home and commercial use.',
    img: '/api/storage/3409/jvl-echo-game-room-entertainment-system.jpg',
    href: '/en/echo-1',
    dark: false,
  },
]

// ── Helpers ──────────────────────────────────────────────────────────────────

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim()
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const [historyBlock, categoriesBlock, dbSlides, gameThemes] = await Promise.all([
    getLandingBlock('history_landing_block'),
    getLandingBlock('categories_landing_block'),
    getSlides(1), // homepage page_id = 1
    getGameThemes(),
  ])

  const { items: news } = await getNewsList('en', undefined, 1, 3)

  // ── Carousel slides — from CMS, with fallback ──────────────────────────────
  const slides: HeroSlide[] = dbSlides.length > 0
    ? dbSlides.map((s) => ({
        bg: s.desktopImage,
        eyebrow: 'JVL Entertainment',
        heading: s.title ?? '',
        body: s.description ?? '',
        cta: {
          text: s.btnText ?? 'Learn More',
          href: s.link ?? '/en',
          external: s.link?.startsWith('http') ?? false,
        },
      }))
    : [
        {
          bg: null,
          eyebrow: 'JVL Entertainment',
          heading: 'ECHO HD3 — Premium Touchscreen Arcade',
          body: '22\u2033 touchscreen bartop arcade with 149 pre-installed games. Plug & play — no setup required.',
          cta: { text: 'Explore on Amazon', href: 'https://www.amazon.com/dp/B0DJ3BSJ4D', external: true },
        },
      ]

  return (
    <div id="home-page" style={{ marginTop: -52 }}>
      <style>{`
        /* ── Hero ── */
        #home-page .hp-hero { height: calc(100svh - 72px); min-height: 520px; }
        @media (max-width: 767px) {
          #home-page .hp-hero { height: 65vh; min-height: 380px; }
          #home-page .hp-hero-h1 { font-size: clamp(1.25rem, 5vw, 1.75rem) !important; }
          #home-page .hp-hero-ctas { flex-direction: column; align-items: flex-start; }
        }

        /* ── Products ── */
        #home-page .hp-products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 56px;
        }
        @media (max-width: 900px) {
          #home-page .hp-products-grid { grid-template-columns: 1fr; gap: 12px; }
        }

        /* ── Games grid ── */
        #home-page .hp-games-header {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 40px;
          align-items: start;
          margin-bottom: 48px;
        }
        #home-page .hp-games-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        #home-page .hp-games-all-tile {
          margin-top: 10px;
          width: calc((100% - 20px) / 3);
          align-self: flex-end;
          margin-left: auto;
        }
        #home-page .hp-game-cat-card img { transition: transform 0.5s ease; }
        #home-page .hp-game-cat-card:hover img { transform: scale(1.04); }
        @media (max-width: 960px) {
          #home-page .hp-games-grid { grid-template-columns: repeat(2, 1fr); }
          #home-page .hp-games-header { grid-template-columns: 1fr; }
          #home-page .hp-games-all-tile { width: calc((100% - 10px) / 2); }
        }
        @media (max-width: 540px) {
          #home-page .hp-games-grid { grid-template-columns: 1fr 1fr; }
          #home-page .hp-games-all-tile { width: 100%; }
        }

        /* ── News ── */
        #home-page .hp-news-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        @media (max-width: 900px) {
          #home-page .hp-news-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          #home-page .hp-news-grid { grid-template-columns: 1fr; }
        }

        /* ── News card hover ── */
        #home-page .hp-news-card { transition: opacity 0.2s; }
        #home-page .hp-news-card:hover { opacity: 0.78; }

        /* ── All News button hover ── */
        #home-page .hp-news-all-btn { transition: color 0.2s; }
        #home-page .hp-news-all-btn:hover { color: #FB671F !important; opacity: 1 !important; }

        /* ── Search input ── */
        #home-page .hp-search-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(244,243,236,0.2);
          color: #F4F3EC;
          font-size: 15px;
          font-weight: 300;
          padding: 10px 40px 10px 0;
          outline: none;
          transition: border-color 0.2s;
        }
        #home-page .hp-search-input::placeholder { color: rgba(244,243,236,0.35); }
        #home-page .hp-search-input:focus { border-color: rgba(244,243,236,0.5); }

        /* ── Product card hover ── */
        #home-page .hp-prod-card img { transition: transform 0.5s ease; }
        #home-page .hp-prod-card:hover img { transform: scale(1.04); }

        /* ── 149+ tile hover (like btn-amazon) ── */
        #home-page .hp-games-all-tile {
          transition: background 0.22s ease, box-shadow 0.22s ease;
        }
        #home-page .hp-games-all-tile:hover {
          background: #FB671F !important;
          box-shadow: 0 6px 20px rgba(251,103,31,0.35);
        }
      `}</style>

      {/* ── 1. Hero Carousel ─────────────────────────────────────────────────── */}
      <HomeHeroCarousel slides={slides} />

      {/* ── 2. Products / Welcome ────────────────────────────────────────────── */}
      <section style={{ background: '#101213', padding: '96px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 6vw' }}>

          {/* Badge */}
          <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FB671F', margin: '0 0 16px' }}>
            About Us
          </p>

          {/* Heading */}
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '-0.02em', lineHeight: 1.0,
            color: '#F4F3EC', margin: 0,
          }}>
            Welcome to JVL!
          </h2>

          {/* Body */}
          <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.75, color: 'rgba(244,243,236,0.6)', margin: '20px 0 0' }}>
            {historyBlock?.text
              ? stripHtml(historyBlock.text)
              : 'For over 30 years, JVL has led the world in touchscreen arcade entertainment. From ENCORE to ECHO HD3 — elegant hardware, intelligent software, timeless gameplay.'}
          </p>

          {/* Product cards */}
          <div className="hp-products-grid">
            {PRODUCTS.map((p) => (
              <a
                key={p.label}
                href={p.href}
                className="hp-prod-card"
                style={{
                  position: 'relative', display: 'block', textDecoration: 'none',
                  borderRadius: 4, overflow: 'hidden',
                  aspectRatio: '3/4',
                  background: '#1a1c1d',
                }}
              >
                <img
                  src={p.img}
                  alt={p.label}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.05) 75%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 28px' }}>
                  <h3 style={{
                    fontSize: 24, fontWeight: 700, textTransform: 'uppercase',
                    letterSpacing: '0.04em', color: '#fff', margin: '0 0 10px',
                  }}>
                    {p.label}
                  </h3>
                  <p style={{ fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.72)', margin: 0, lineHeight: 1.6 }}>
                    {p.desc}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Discover Our Games ────────────────────────────────────────────── */}
      <section style={{ background: '#101213', padding: '96px 0', borderTop: '1px solid #222' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 6vw' }}>

          {/* Badge */}
          <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FB671F', margin: '0 0 16px' }}>
            Game Themes
          </p>

          {/* Heading + search */}
          <div className="hp-games-header">
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '-0.02em', lineHeight: 1.0,
              color: '#F4F3EC', margin: 0,
            }}>
              Discover Our Games
            </h2>
            <form action="/en/echo-1" method="GET" style={{ position: 'relative', width: 280, paddingTop: 8 }}>
              <input
                name="q"
                className="hp-search-input"
                placeholder="Find a game"
                autoComplete="off"
              />
              <button
                type="submit"
                style={{
                  position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(244,243,236,0.45)', display: 'flex', padding: 0,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </button>
            </form>
          </div>

          {/* Category grid — from CMS */}
          <div className="hp-games-grid">
            {gameThemes.slice(0, 6).map((g) => (
              <a
                key={g.id}
                href={g.url || `/en/games?Themes=${g.id}`}
                className="hp-game-cat-card"
                style={{
                  position: 'relative', display: 'block', borderRadius: 6,
                  overflow: 'hidden', textDecoration: 'none', aspectRatio: '4/5',
                  background: '#1a1c1d',
                }}
              >
                {g.image && (
                  <img
                    src={g.image}
                    alt={g.name ?? ''}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0) 70%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '22px 20px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', lineHeight: 1.2 }}>
                    {g.name}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, color: 'rgba(255,255,255,0.6)' }}>
                    <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </a>
            ))}
          </div>

          {/* "View all" tile — 1/3 width, right-aligned below grid */}
          <a
            href="/en/games"
            className="hp-games-all-tile"
            style={{
              display: 'flex',
              flexDirection: 'column', justifyContent: 'center',
              borderRadius: 6, textDecoration: 'none',
              aspectRatio: '4/1.5', background: '#059FFF',
              padding: '20px 28px',
            }}
          >
            <span style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 800, color: '#fff', lineHeight: 1, marginBottom: 6 }}>
              149+
            </span>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              View All Games →
            </span>
          </a>
        </div>
      </section>

      {/* ── 4. News ──────────────────────────────────────────────────────────── */}
      <section style={{ background: '#080a0b', padding: '96px 0', borderTop: '1px solid #1e2022' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 6vw' }}>

          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 52, gap: 24 }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FB671F', margin: '0 0 12px' }}>
                Blog
              </p>
              <h2 style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '-0.02em',
                lineHeight: 1.05, color: '#F4F3EC', margin: 0,
              }}>
                Latest News
              </h2>
            </div>
            <a
              href="/en/blog-and-news"
              className="hp-news-all-btn"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0,
                fontSize: 14, fontWeight: 600, color: 'rgba(244,243,236,0.6)',
                textDecoration: 'none', letterSpacing: '0.02em',
              }}
            >
              All News
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                <path d="M1.5 6H10.5M6 1.5L10.5 6L6 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Cards */}
          {news.length > 0 ? (
            <div className="hp-news-grid">
              {news.map((article) => (
                <NewsCard key={article.id} item={article} locale="en" dark />
              ))}
            </div>
          ) : (
            <p style={{ color: 'rgba(244,243,236,0.35)', fontSize: 15 }}>No articles yet.</p>
          )}
        </div>
      </section>

    </div>
  )
}
