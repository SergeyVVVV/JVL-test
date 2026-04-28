import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getGameBySlug,
  getGameScreenSlides,
  getGameFeatures,
  getGameReviews,
  getGamesList,
} from '@/lib/db'
import GameScreensCarousel from '@/components/GameScreensCarousel'
import GameFeatures from '@/components/GameFeatures'
import GameCard from '@/components/GameCard'
import JsonLd from '@/components/JsonLd'
import { buildBreadcrumb, buildGraph } from '@/lib/jsonld'
import { BASE_URL } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params
  const game = await getGameBySlug(slug, locale)
  if (!game) return {}
  return {
    title: game.metaTitle ?? `${game.title} — JVL Online Games`,
    description: game.metaDescription ?? game.description ?? undefined,
  }
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params
  const game = await getGameBySlug(slug, locale)
  if (!game) notFound()

  const [screenSlides, features, reviews, alsoLikeData] = await Promise.all([
    getGameScreenSlides(game.pageId),
    getGameFeatures(game.id, locale),
    getGameReviews(game.id, locale),
    game.themes[0]
      ? getGamesList({ locale, perPage: 4, search: undefined })
      : Promise.resolve({ items: [], total: 0 }),
  ])

  // Exclude self from also-like
  const alsoLike = alsoLikeData.items.filter(g => g.slug !== slug).slice(0, 3)

  const heroBg = game.backgroundImage ?? game.horizontalImage ?? game.verticalImage ?? game.squareImage
  const pageUrl = `${BASE_URL}/en/games/${game.slug}`
  const jsonLd = buildGraph([
    buildBreadcrumb(pageUrl, [
      { name: 'Home', item: `${BASE_URL}/en` },
      { name: 'Games', item: `${BASE_URL}/en/games` },
      { name: game.title ?? '', item: pageUrl },
    ]),
    // VideoGame/SoftwareApp schema removed — slot games don't benefit from it
    // and it caused aggregateRating/review validation errors with no fix available.
  ])

  // Parse RTP lines
  const rtpLines = game.rtps ? game.rtps.split('\n').filter(Boolean) : []

  const statLabelStyle = {
    fontSize: 12, fontWeight: 700, letterSpacing: '0.12em',
    textTransform: 'uppercase' as const, color: 'rgba(244,243,236,0.45)', margin: '0 0 6px',
  }
  const statValueStyle = {
    fontSize: 'clamp(1rem, 2vw, 1.4rem)' as const, fontWeight: 700,
    color: '#F4F3EC', margin: 0, lineHeight: 1.2,
  }

  return (
    <>
      <JsonLd data={jsonLd} />
    <main
      id="game-detail-page"
      style={{ background: '#080a0b', color: '#F4F3EC', fontFamily: 'inherit', marginTop: -124, minHeight: '100vh' }}
    >
      {/* ── 1. Hero ── */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: '70vh', display: 'flex', alignItems: 'flex-end' }}>
        {/* Background */}
        {heroBg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={heroBg}
            alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: '#101213' }} />
        )}
        {/* Gradients */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,10,11,1) 0%, rgba(8,10,11,0.55) 50%, rgba(8,10,11,0.15) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,10,11,0.8) 0%, rgba(8,10,11,0) 60%)' }} />

        {/* Content */}
        <div className="gd-hero-content" style={{ position: 'relative', zIndex: 1, width: '100%', padding: '140px 6vw 60px', maxWidth: 1440, margin: '0 auto' }}>
          {/* Breadcrumb */}
          <p style={{ fontSize: 13, color: 'rgba(244,243,236,0.45)', margin: '0 0 20px' }}>
            <Link href={`/${locale}/games`} style={{ color: 'rgba(244,243,236,0.45)', textDecoration: 'none' }}>
              Games
            </Link>
            <span style={{ margin: '0 8px' }}>→</span>
            <span style={{ color: 'rgba(244,243,236,0.7)' }}>{game.title}</span>
          </p>

          {/* Tags / badges */}
          {[...new Set([...game.themes, ...game.gameTags])].length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {[...new Set([...game.themes, ...game.gameTags])].map(tag => (
                <span
                  key={tag}
                  style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: 'rgba(244,243,236,0.7)', background: 'rgba(244,243,236,0.08)',
                    border: '1px solid rgba(244,243,236,0.15)',
                    padding: '4px 10px', borderRadius: 4,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 style={{
            fontFamily: 'inherit', fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.02em',
            textTransform: 'uppercase', color: '#F4F3EC', margin: '0 0 16px', maxWidth: 800,
          }}>
            {game.title}
          </h1>

          {/* Description */}
          {game.description && (
            <p style={{ fontSize: 16, color: 'rgba(244,243,236,0.65)', lineHeight: 1.7, margin: '0 0 32px', maxWidth: 560 }}>
              {game.description}
            </p>
          )}

        </div>
      </section>

      {/* ── 2. Stats bars ── */}
      <section style={{ borderTop: '1px solid #1e2022', borderBottom: '1px solid #1e2022' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 6vw' }}>

          {/* Row 1: Theme / Reels / Volatility / Paylines */}
          <div className="gd-stats-row">
            {[
              { label: 'Theme',          value: game.themes[0] ?? null },
              { label: 'Reels',          value: game.reels },
              { label: 'Volatility',     value: game.volatility },
              { label: 'Paylines',       value: game.paylines },
            ].filter(s => s.value).map(stat => (
              <div key={stat.label} className="gd-stat-cell">
                <p style={statLabelStyle}>{stat.label}</p>
                <p style={statValueStyle}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Row 2: RTP / Min Bet / Max Bet / Max Win (only if data exists) */}
          {(rtpLines.length > 0 || game.minBet || game.maxBet || game.maxWin) && (
            <div className="gd-stats-row" style={{ borderTop: '1px solid #1e2022' }}>
              {rtpLines.length > 0 && (
                <div className="gd-stat-cell">
                  <p style={statLabelStyle}>RTP</p>
                  {rtpLines.map((rtp, i) => <p key={i} style={statValueStyle}>{rtp}</p>)}
                </div>
              )}
              {game.minBet && (
                <div className="gd-stat-cell">
                  <p style={statLabelStyle}>Min Bet</p>
                  <p style={statValueStyle}>{game.minBet}</p>
                </div>
              )}
              {game.maxBet && (
                <div className="gd-stat-cell">
                  <p style={statLabelStyle}>Max Bet</p>
                  <p style={statValueStyle}>{game.maxBet}</p>
                </div>
              )}
              {game.maxWin && (
                <div className="gd-stat-cell">
                  <p style={statLabelStyle}>Max Win</p>
                  <p style={statValueStyle}>{game.maxWin}x</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── 3. Screenshots ── */}
      {screenSlides.length > 0 && (
        <section style={{ padding: '80px 0', borderBottom: '1px solid #1e2022' }}>
          <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 6vw' }}>
            <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FB671F', margin: '0 0 14px' }}>
              Screenshots
            </p>
            <h2 style={{
              fontFamily: 'inherit', fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
              fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.01em',
              textTransform: 'uppercase', color: '#F4F3EC', margin: '0 0 40px',
            }}>
              Game Screens
            </h2>
            <GameScreensCarousel slides={screenSlides} title={game.title ?? ''} />
          </div>
        </section>
      )}

      {/* ── 4. Game Features ── */}
      {features.length > 0 && (
        <section style={{ padding: '80px 0', borderBottom: '1px solid #1e2022' }}>
          <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 6vw' }}>
            <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FB671F', margin: '0 0 14px' }}>
              Features
            </p>
            <h2 style={{
              fontFamily: 'inherit', fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
              fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.01em',
              textTransform: 'uppercase', color: '#F4F3EC', margin: '0 0 48px',
            }}>
              Game Features
            </h2>
            <GameFeatures features={features} />
          </div>
        </section>
      )}

      {/* ── 5. Story ── */}
      {(game.storyTitle || game.storyText) && (
        <section style={{ padding: '80px 0', borderBottom: '1px solid #1e2022' }}>
          <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 6vw' }}>
            <div className="gd-story-grid">
              {/* Left */}
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FB671F', margin: '0 0 14px' }}>
                  Story
                </p>
                {game.storyTitle && (
                  <h2 style={{
                    fontFamily: 'inherit', fontSize: 'clamp(1.4rem, 2.5vw, 2.4rem)',
                    fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.01em',
                    textTransform: 'uppercase', color: '#F4F3EC', margin: '0 0 24px',
                  }}>
                    {game.storyTitle}
                  </h2>
                )}
                {game.storyText && (
                  <div
                    style={{ fontSize: 16, color: 'rgba(244,243,236,0.7)', lineHeight: 1.75 }}
                    dangerouslySetInnerHTML={{ __html: game.storyText }}
                  />
                )}
              </div>

              {/* Right: symbol */}
              {(game.symbolImage || game.storySymbolName) && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                  {game.symbolImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={game.symbolImage}
                      alt={game.storySymbolName ?? ''}
                      style={{ maxWidth: 280, width: '100%', display: 'block', borderRadius: 4 }}
                    />
                  )}
                  {game.storySymbolName && (
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: 14, fontWeight: 700, color: '#F4F3EC', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {game.storySymbolName}
                      </p>
                      {game.storyAboutSymbol && (
                        <p style={{ fontSize: 13, color: 'rgba(244,243,236,0.5)', margin: 0, lineHeight: 1.5 }}>
                          {game.storyAboutSymbol}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. Reviews ── */}
      {reviews.length > 0 && (
        <section style={{ padding: '80px 0', borderBottom: '1px solid #1e2022' }}>
          <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 6vw' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FB671F', margin: '0 0 14px' }}>
                  Press
                </p>
                <h2 style={{
                  fontFamily: 'inherit', fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
                  fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.01em',
                  textTransform: 'uppercase', color: '#F4F3EC', margin: 0,
                }}>
                  Reviews
                </h2>
              </div>
            </div>
            <div className="gd-reviews-grid">
              {reviews.map(r => (
                <a
                  key={r.id}
                  href={r.url ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block', textDecoration: 'none',
                    background: '#181a1b', border: '1px solid #252729', borderRadius: 4,
                    overflow: 'hidden', transition: 'border-color 0.18s',
                  }}
                  className="gd-review-card"
                >
                  {r.image && (
                    <div style={{ aspectRatio: '1', overflow: 'hidden', background: '#101213' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={r.image} alt={r.title ?? ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                  )}
                  <div style={{ padding: '16px 16px 20px' }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#F4F3EC', margin: 0, lineHeight: 1.4 }}>
                      {r.title}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 7. Also Like ── */}
      {alsoLike.length > 0 && (
        <section style={{ padding: '80px 0' }}>
          <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 6vw' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FB671F', margin: '0 0 14px' }}>
                  More Games
                </p>
                <h2 style={{
                  fontFamily: 'inherit', fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
                  fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.01em',
                  textTransform: 'uppercase', color: '#F4F3EC', margin: 0,
                }}>
                  You May Also Like
                </h2>
              </div>
              <Link
                href={`/${locale}/games`}
                className="btn-outline"
                style={{ fontSize: 12, padding: '10px 20px' }}
              >
                View All Games
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M1.5 6H10.5M6 1.5L10.5 6L6 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
            <div className="gd-also-grid">
              {alsoLike.map(g => (
                <GameCard key={g.id} slug={g.slug ?? ''} image={g.image} title={g.title} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        /* Stats rows */
        .gd-stats-row {
          display: flex;
          flex-wrap: wrap;
        }
        .gd-stat-cell {
          flex: 1;
          min-width: 120px;
          padding: 28px 24px;
          border-right: 1px solid #1e2022;
        }
        .gd-stat-cell:last-child { border-right: none; }

        /* Story */
        .gd-story-grid {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 80px;
          align-items: start;
        }

        /* Reviews */
        .gd-reviews-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .gd-review-card:hover { border-color: rgba(244,243,236,0.3) !important; }

        /* Also Like */
        .gd-also-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        @media (max-width: 1023px) { .gd-also-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 639px)  { .gd-also-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; } }

        /* Mobile */
        @media (max-width: 767px) {
          .gd-stat-cell { padding: 20px 16px; min-width: 80px; }
          .gd-story-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .gd-reviews-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .gd-also-grid { grid-template-columns: repeat(2, 1fr) !important; }
          #game-detail-page section:not(:first-child) { padding-top: 56px !important; padding-bottom: 56px !important; }
          .gd-hero-content { padding-top: 100px !important; padding-bottom: 48px !important; }
        }
        @media (max-width: 480px) {
          .gd-reviews-grid { grid-template-columns: 1fr !important; }
          .gd-also-grid { grid-template-columns: 1fr !important; }
          .gd-stat-cell { min-width: 60px; }
        }
      `}</style>
    </main>
    </>
  )
}
