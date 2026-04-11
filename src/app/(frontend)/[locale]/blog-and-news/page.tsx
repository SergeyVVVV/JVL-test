import Link from 'next/link'
import { getNewsList } from '@/lib/db'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ type?: string; page?: string }>
}

/* ── Helpers ──────────────────────────────────────────────── */

function formatDate(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
}

function extractExcerpt(html: string | null, maxLen = 160): string | null {
  if (!html) return null
  const match = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i)
  if (!match) return null
  const text = match[1].replace(/<[^>]*>/g, '').trim()
  if (!text) return null
  return text.length > maxLen ? text.slice(0, maxLen).replace(/\s+\S*$/, '') + '...' : text
}

/* ── Metadata ─────────────────────────────────────────────── */

export async function generateMetadata() {
  return {
    title: 'Blog, News & Offers — JVL',
    description: 'Read the latest JVL articles, news and special offers about arcade gaming.',
  }
}

/* ── Page ─────────────────────────────────────────────────── */

export default async function BlogListingPage({ params, searchParams }: PageProps) {
  const { locale } = await params
  const sp = await searchParams
  const typeFilter = sp.type === 'blog' ? 1 : sp.type === 'news' ? 2 : undefined
  const page = Math.max(1, parseInt(sp.page ?? '1') || 1)
  const perPage = 7

  const { items, total } = await getNewsList(locale, typeFilter, page, perPage)
  const totalPages = Math.ceil(total / perPage)

  const featured = items[0] ?? null
  const rest = items.slice(1)

  const filters = [
    { label: 'All', value: undefined },
    { label: 'Blog', value: 'blog' },
    { label: 'News', value: 'news' },
  ]

  return (
    <div style={{
      background: '#F4F3EC',
      color: '#101213',
      fontFamily: 'var(--font-poppins), system-ui, sans-serif',
      minHeight: '100vh',
    }}>

      <style>{`
        .bl-container { max-width: 1200px; margin: 0 auto; padding-inline: 16px; }
        @media (min-width: 768px) { .bl-container { padding-inline: 24px; } }

        .bl-featured-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
        @media (min-width: 768px) { .bl-featured-grid { grid-template-columns: 2fr 1fr; } }

        .bl-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
        @media (min-width: 768px) { .bl-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .bl-grid { grid-template-columns: repeat(3, 1fr); } }

        .bl-card {
          display: flex; flex-direction: column; height: 100%;
          border: 1px solid #D0CEC6; border-radius: 8px; overflow: hidden;
          background: #fff; transition: transform 0.2s ease;
        }
        .bl-card:hover { transform: translateY(-2px); }
        .bl-card-body { flex: 1; display: flex; flex-direction: column; align-items: flex-start; padding: 24px; }

        .bl-filter { display: inline-flex; gap: 8px; flex-wrap: wrap; }
        .bl-filter-btn {
          display: inline-block; padding: 8px 20px; border-radius: 6px;
          font-size: 14px; font-weight: 500; text-decoration: none;
          transition: all 0.2s ease; border: 1px solid #D0CEC6;
        }
        .bl-filter-active { background: #101213; color: #F4F3EC; border-color: #101213; }
        .bl-filter-inactive { background: transparent; color: #4B4B4B; border-color: #D0CEC6; }
        .bl-filter-inactive:hover { border-color: #101213; color: #101213; }

        .bl-pagination { display: flex; gap: 6px; justify-content: center; flex-wrap: wrap; }
        .bl-page-btn {
          display: inline-flex; align-items: center; justify-content: center;
          min-width: 40px; height: 40px; border-radius: 6px;
          font-size: 14px; font-weight: 500; text-decoration: none;
          transition: all 0.2s ease; border: 1px solid #D0CEC6;
        }
        .bl-page-active { background: #101213; color: #F4F3EC; border-color: #101213; }
        .bl-page-inactive { background: transparent; color: #4B4B4B; }
        .bl-page-inactive:hover { border-color: #101213; color: #101213; }
      `}</style>

      {/* ── Header ───────────────────────────────────────── */}
      <div className="bl-container" style={{ paddingTop: 40, paddingBottom: 12 }}>
        <h1 style={{
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: '#101213',
          margin: '0 0 24px',
        }}>
          Blog, News &amp; Offers
        </h1>
      </div>

      {/* ── Filters ──────────────────────────────────────── */}
      <div className="bl-container" style={{ marginBottom: 40 }}>
        <div className="bl-filter">
          {filters.map((f) => {
            const isActive = sp.type === f.value || (!sp.type && !f.value)
            const href = f.value ? `/${locale}/blog-and-news?type=${f.value}` : `/${locale}/blog-and-news`
            return (
              <Link
                key={f.label}
                href={href}
                className={`bl-filter-btn ${isActive ? 'bl-filter-active' : 'bl-filter-inactive'}`}
              >
                {f.label}
              </Link>
            )
          })}
        </div>
      </div>

      {/* ── Featured + First card ────────────────────────── */}
      {featured && (
        <div className="bl-container" style={{ marginBottom: 24 }}>
          <div className="bl-featured-grid">
            {/* Featured (large) */}
            <Link
              href={`/${locale}/blog-and-news/${featured.slug}`}
              style={{ display: 'flex', textDecoration: 'none', color: '#101213' }}
            >
              <article className="bl-card" style={{ width: '100%' }}>
                <div style={{ height: 320, background: '#E8E6DF', overflow: 'hidden', flexShrink: 0 }}>
                  {featured.heroImage && (
                    <img
                      src={featured.heroImage}
                      alt={featured.title ?? ''}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  )}
                </div>
                <div className="bl-card-body">
                  <span style={{
                    display: 'inline-block', fontSize: 13, fontWeight: 500,
                    padding: '5px 10px', border: '1px solid #D0CEC6', borderRadius: 6,
                    color: '#787878', marginBottom: 12,
                  }}>
                    {featured.type === 1 ? 'Blog' : 'News'}
                  </span>
                  <h2 style={{
                    fontSize: 24, fontWeight: 600, lineHeight: 1.25,
                    color: '#101213', margin: '0 0 10px',
                  }}>
                    {featured.title}
                  </h2>
                  {(featured.description || featured.content1) && (
                    <p style={{
                      fontSize: 15, color: '#4B4B4B', lineHeight: 1.6, margin: '0 0 12px',
                      display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const,
                      overflow: 'hidden',
                    }}>
                      {featured.description || extractExcerpt(featured.content1, 220)}
                    </p>
                  )}
                  <p style={{ fontSize: 13, color: '#787878', margin: 'auto 0 0' }}>
                    {formatDate(featured.publishedAt)}
                  </p>
                </div>
              </article>
            </Link>

            {/* Second card (normal) */}
            {rest[0] && (
              <Link
                href={`/${locale}/blog-and-news/${rest[0].slug}`}
                style={{ display: 'flex', textDecoration: 'none', color: '#101213' }}
              >
                <article className="bl-card" style={{ width: '100%' }}>
                  <div style={{ height: 200, background: '#E8E6DF', overflow: 'hidden', flexShrink: 0 }}>
                    {rest[0].heroImage && (
                      <img
                        src={rest[0].heroImage}
                        alt={rest[0].title ?? ''}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    )}
                  </div>
                  <div className="bl-card-body">
                    <span style={{
                      display: 'inline-block', fontSize: 13, fontWeight: 500,
                      padding: '5px 10px', border: '1px solid #D0CEC6', borderRadius: 6,
                      color: '#787878', marginBottom: 12,
                    }}>
                      {rest[0].type === 1 ? 'Blog' : 'News'}
                    </span>
                    <h3 style={{
                      fontSize: 18, fontWeight: 600, lineHeight: 1.3,
                      color: '#101213', margin: '0 0 8px', flex: 1,
                    }}>
                      {rest[0].title}
                    </h3>
                    {(rest[0].description || rest[0].content1) && (
                      <p style={{
                        fontSize: 14, color: '#4B4B4B', lineHeight: 1.55, margin: '0 0 10px',
                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const,
                        overflow: 'hidden',
                      }}>
                        {rest[0].description || extractExcerpt(rest[0].content1)}
                      </p>
                    )}
                    <p style={{ fontSize: 13, color: '#787878', margin: 'auto 0 0' }}>
                      {formatDate(rest[0].publishedAt)}
                    </p>
                  </div>
                </article>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* ── Rest of articles ─────────────────────────────── */}
      {rest.length > 1 && (
        <div className="bl-container" style={{ marginBottom: 56 }}>
          <div className="bl-grid">
            {rest.slice(1).map((item) => (
              <Link
                key={item.id}
                href={`/${locale}/blog-and-news/${item.slug}`}
                style={{ display: 'flex', textDecoration: 'none', color: '#101213' }}
              >
                <article className="bl-card" style={{ width: '100%' }}>
                  <div style={{ height: 200, background: '#E8E6DF', overflow: 'hidden', flexShrink: 0 }}>
                    {item.heroImage && (
                      <img
                        src={item.heroImage}
                        alt={item.title ?? ''}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    )}
                  </div>
                  <div className="bl-card-body">
                    <span style={{
                      display: 'inline-block', fontSize: 13, fontWeight: 500,
                      padding: '5px 10px', border: '1px solid #D0CEC6', borderRadius: 6,
                      color: '#787878', marginBottom: 12,
                    }}>
                      {item.type === 1 ? 'Blog' : 'News'}
                    </span>
                    <h3 style={{
                      fontSize: 18, fontWeight: 600, lineHeight: 1.3,
                      color: '#101213', margin: '0 0 8px', flex: 1,
                    }}>
                      {item.title}
                    </h3>
                    {(item.description || item.content1) && (
                      <p style={{
                        fontSize: 14, color: '#4B4B4B', lineHeight: 1.55, margin: '0 0 10px',
                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const,
                        overflow: 'hidden',
                      }}>
                        {item.description || extractExcerpt(item.content1)}
                      </p>
                    )}
                    <p style={{ fontSize: 13, color: '#787878', margin: 'auto 0 0' }}>
                      {formatDate(item.publishedAt)}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Pagination ───────────────────────────────────── */}
      {totalPages > 1 && (
        <div className="bl-container" style={{ paddingBottom: 80 }}>
          <div className="bl-pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
              const params = new URLSearchParams()
              if (sp.type) params.set('type', sp.type)
              if (p > 1) params.set('page', String(p))
              const qs = params.toString()
              const href = `/${locale}/blog-and-news${qs ? `?${qs}` : ''}`
              return (
                <Link
                  key={p}
                  href={href}
                  className={`bl-page-btn ${p === page ? 'bl-page-active' : 'bl-page-inactive'}`}
                >
                  {p}
                </Link>
              )
            })}
          </div>
        </div>
      )}

    </div>
  )
}
