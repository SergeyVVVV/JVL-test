import Link from 'next/link'
import { getNewsList } from '@/lib/db'
import BlogSearchInput from '@/components/BlogSearchInput'
import EchoBanner from '@/components/EchoBanner'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ type?: string; page?: string; q?: string }>
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const { getPageMeta } = await import('@/lib/db')
  const meta = await getPageMeta('blog-and-news', locale)
  return {
    title: meta?.title ?? 'Blog, News & Offers — JVL',
    description: meta?.description ?? 'Read the latest JVL articles, news and special offers about arcade gaming.',
  }
}

/* ── Page ─────────────────────────────────────────────────── */

export default async function BlogListingPage({ params, searchParams }: PageProps) {
  const { locale } = await params
  const sp = await searchParams
  const typeFilter = sp.type === 'blog' ? 1 : sp.type === 'news' ? 0 : undefined
  const searchQuery = sp.q?.trim() || undefined
  const page = Math.max(1, parseInt(sp.page ?? '1') || 1)
  const perPage = 7

  const { items, total } = await getNewsList(locale, typeFilter, page, perPage, searchQuery)
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
      background: '#101213',
      color: '#F4F3EC',
      fontFamily: 'var(--font-poppins), system-ui, sans-serif',
      minHeight: '100vh',
      marginTop: -124,
      paddingTop: 124,
    }}>

      <style>{`
        .bl-container { max-width: 1200px; margin: 0 auto; padding-inline: 16px; }
        @media (min-width: 768px) { .bl-container { padding-inline: 24px; } }

        /* Featured full-width horizontal card */
        .bl-featured-card {
          display: flex; flex-direction: row;
          border: 1px solid #2a2a2a; border-radius: 8px; overflow: hidden;
          background: #181a1b; transition: transform 0.2s ease, border-color 0.2s ease;
          text-decoration: none; color: #F4F3EC;
        }
        .bl-featured-card:hover { transform: translateY(-2px); border-color: #3a3a3a; }
        .bl-featured-img { width: 45%; flex-shrink: 0; min-height: 360px; background: #1a1c1d; overflow: hidden; }
        .bl-featured-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .bl-featured-body { flex: 1; display: flex; flex-direction: column; align-items: flex-start; padding: 40px; justify-content: center; }
        @media (max-width: 767px) {
          .bl-featured-card { flex-direction: column; }
          .bl-featured-img { width: 100%; min-height: 220px; }
          .bl-featured-body { padding: 24px; }
        }

        .bl-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
        @media (min-width: 768px) { .bl-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .bl-grid { grid-template-columns: repeat(3, 1fr); } }

        .bl-card {
          display: flex; flex-direction: column; height: 100%;
          border: 1px solid #2a2a2a; border-radius: 8px; overflow: hidden;
          background: #181a1b; transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .bl-card:hover { transform: translateY(-2px); border-color: #3a3a3a; }
        .bl-card-body { flex: 1; display: flex; flex-direction: column; align-items: flex-start; padding: 24px; }

        /* Filters + Search row */
        .bl-toolbar {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 16px;
        }
        .bl-filter { display: inline-flex; gap: 8px; flex-wrap: wrap; }
        .bl-filter-btn {
          display: inline-block; padding: 8px 20px; border-radius: 6px;
          font-size: 14px; font-weight: 500; text-decoration: none;
          transition: all 0.2s ease; border: 1px solid #2a2a2a;
        }
        .bl-filter-active { background: #FB671F; color: #fff; border-color: #FB671F; }
        .bl-filter-inactive { background: transparent; color: rgba(244,243,236,0.6); border-color: #2a2a2a; }
        .bl-filter-inactive:hover { border-color: #555; color: #F4F3EC; }

        .bl-search { position: relative; width: 280px; flex-shrink: 0; }
        @media (max-width: 767px) { .bl-search { width: 100%; order: -1; } }
        .bl-search input {
          width: 100%; padding: 9px 16px 9px 38px;
          font-size: 14px; font-family: inherit;
          border: 1px solid #2a2a2a; border-radius: 6px;
          background: #181a1b; color: #F4F3EC;
          outline: none; transition: border-color 0.2s;
        }
        .bl-search input:focus { border-color: #059FFF; }
        .bl-search input::placeholder { color: rgba(244,243,236,0.35); }
        .bl-search-icon {
          position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
          pointer-events: none; color: rgba(244,243,236,0.35);
        }

        .bl-pagination { display: flex; gap: 6px; justify-content: center; flex-wrap: wrap; }
        .bl-page-btn {
          display: inline-flex; align-items: center; justify-content: center;
          min-width: 40px; height: 40px; border-radius: 6px;
          font-size: 14px; font-weight: 500; text-decoration: none;
          transition: all 0.2s ease; border: 1px solid #2a2a2a;
        }
        .bl-page-active { background: #F4F3EC; color: #101213; border-color: #F4F3EC; }
        .bl-page-inactive { background: transparent; color: rgba(244,243,236,0.5); }
        .bl-page-inactive:hover { border-color: #555; color: #F4F3EC; }

      `}</style>

      {/* ── Header ───────────────────────────────────────── */}
      <div className="bl-container" style={{ paddingTop: 40, paddingBottom: 28 }}>
        <h1 style={{
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: '#F4F3EC',
          margin: 0,
        }}>
          Blog, News &amp; Offers
        </h1>
      </div>

      {/* ── Filters + Search ─────────────────────────────── */}
      <div className="bl-container" style={{ marginBottom: 40 }}>
        <div className="bl-toolbar">
          <div className="bl-filter">
            {filters.map((f) => {
              const isActive = sp.type === f.value || (!sp.type && !f.value)
              const fp = new URLSearchParams()
              if (f.value) fp.set('type', f.value)
              if (searchQuery) fp.set('q', searchQuery)
              const fqs = fp.toString()
              const href = `/${locale}/blog-and-news${fqs ? `?${fqs}` : ''}`
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
          <BlogSearchInput defaultValue={searchQuery} typeParam={sp.type} />
        </div>
      </div>

      {/* ── No results ─────────────────────────────────── */}
      {items.length === 0 && (
        <div className="bl-container" style={{ paddingTop: 40, paddingBottom: 80, textAlign: 'center' }}>
          <p style={{ fontSize: 18, color: 'rgba(244,243,236,0.5)' }}>
            {searchQuery
              ? `No articles found for "${searchQuery}"`
              : 'No articles found'}
          </p>
        </div>
      )}

      {/* ── Featured — full-width horizontal card ────────── */}
      {featured && (
        <div className="bl-container" style={{ marginBottom: 24 }}>
          <Link href={`/${locale}/blog-and-news/${featured.slug}`} className="bl-featured-card">
            <div className="bl-featured-img">
              {featured.heroImage && <img src={featured.heroImage} alt={featured.title ?? ''} />}
            </div>
            <div className="bl-featured-body">
              <span style={{ display: 'inline-block', fontSize: 13, fontWeight: 500, padding: '5px 10px', border: '1px solid #3a3a3a', borderRadius: 6, color: 'rgba(244,243,236,0.5)', marginBottom: 16 }}>
                {featured.type === 1 ? 'Blog' : 'News'}
              </span>
              <h2 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)', fontWeight: 700, lineHeight: 1.2, color: '#F4F3EC', margin: '0 0 14px', textTransform: 'uppercase' }}>
                {featured.title}
              </h2>
              {(featured.description || featured.content1) && (
                <p style={{ fontSize: 15, color: 'rgba(244,243,236,0.6)', lineHeight: 1.65, margin: '0 0 24px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
                  {featured.description || extractExcerpt(featured.content1, 240)}
                </p>
              )}
              <p style={{ fontSize: 13, color: 'rgba(244,243,236,0.35)', margin: '0 0 24px' }}>{formatDate(featured.publishedAt)}</p>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: '#F4F3EC', background: '#FB671F', padding: '10px 22px', borderRadius: 6 }}>
                Read Article →
              </span>
            </div>
          </Link>
        </div>
      )}

      {/* ── Remaining articles — 3-column ────────────────── */}
      {rest.length > 0 && (
        <div className="bl-container" style={{ marginBottom: 56 }}>
          <div className="bl-grid">
            {rest.map((item) => (
              <Link
                key={item.id}
                href={`/${locale}/blog-and-news/${item.slug}`}
                style={{ display: 'flex', textDecoration: 'none', color: '#F4F3EC' }}
              >
                <article className="bl-card" style={{ width: '100%' }}>
                  <div style={{ height: 200, background: '#1a1c1d', overflow: 'hidden', flexShrink: 0 }}>
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
                      padding: '5px 10px', border: '1px solid #3a3a3a', borderRadius: 6,
                      color: 'rgba(244,243,236,0.5)', marginBottom: 12,
                    }}>
                      {item.type === 1 ? 'Blog' : 'News'}
                    </span>
                    <h3 style={{
                      fontSize: 18, fontWeight: 600, lineHeight: 1.3,
                      color: '#F4F3EC', margin: '0 0 8px', flex: 1, textTransform: 'uppercase',
                    }}>
                      {item.title}
                    </h3>
                    {(item.description || item.content1) && (
                      <p style={{
                        fontSize: 14, color: 'rgba(244,243,236,0.55)', lineHeight: 1.55, margin: '0 0 10px',
                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const,
                        overflow: 'hidden',
                      }}>
                        {item.description || extractExcerpt(item.content1)}
                      </p>
                    )}
                    <p style={{ fontSize: 13, color: 'rgba(244,243,236,0.35)', margin: 'auto 0 0' }}>
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
              const pp = new URLSearchParams()
              if (sp.type) pp.set('type', sp.type)
              if (searchQuery) pp.set('q', searchQuery)
              if (p > 1) pp.set('page', String(p))
              const qs = pp.toString()
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


      {/* ── Echo CTA Banner ─────────────────────────────── */}
      <div className="bl-container" style={{ paddingBottom: 80, paddingTop: 40 }}>
        <EchoBanner locale={locale} />
      </div>

    </div>
  )
}
