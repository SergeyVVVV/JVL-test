import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getNewsArticleBySlug, getRelatedNews } from '@/lib/db'
import ArticleTOC from './ArticleTOC'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

interface TOCItem {
  id: string
  text: string
  level: number
}

/* ── Helpers ───────────────────────────────────────────────── */

function formatDate(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
}

function calculateReadTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, ' ')
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

function extractExcerpt(html: string | null, maxLen = 220): string | null {
  if (!html) return null
  const match = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i)
  if (!match) return null
  const text = match[1].replace(/<[^>]*>/g, '').trim()
  if (!text) return null
  return text.length > maxLen ? text.slice(0, maxLen).replace(/\s+\S*$/, '') + '…' : text
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function extractTOC(html: string): TOCItem[] {
  const toc: TOCItem[] = []
  const seen = new Map<string, number>()
  const regex = /<h([23])[^>]*>([\s\S]*?)<\/h[23]>/gi
  let match
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1])
    const text = match[2].replace(/<[^>]*>/g, '').trim()
    if (!text) continue
    let id = slugify(text)
    const count = seen.get(id) ?? 0
    seen.set(id, count + 1)
    if (count > 0) id = `${id}-${count}`
    toc.push({ id, text, level })
  }
  return toc
}

function injectHeadingIds(html: string | null): string | null {
  if (!html) return null
  const seen = new Map<string, number>()
  return html.replace(/<h([23])([^>]*?)>([\s\S]*?)<\/h\1>/gi, (_, level, attrs, inner) => {
    const text = inner.replace(/<[^>]*>/g, '').trim()
    let id = slugify(text)
    const count = seen.get(id) ?? 0
    seen.set(id, count + 1)
    if (count > 0) id = `${id}-${count}`
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`
  })
}

/* ── Metadata ──────────────────────────────────────────────── */

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params
  const article = await getNewsArticleBySlug(slug, locale)
  if (!article) return { title: 'Article not found — JVL' }
  return {
    title: `${article.title ?? 'JVL Blog'} — JVL`,
    description: article.description ?? undefined,
  }
}

/* ── Page ──────────────────────────────────────────────────── */

export default async function BlogArticlePage({ params }: PageProps) {
  const { locale, slug } = await params
  const article = await getNewsArticleBySlug(slug, locale)
  if (!article) notFound()

  const related = await getRelatedNews(article.id, article.type, locale, 3)
  const label = article.type === 1 ? 'Blog' : 'News'
  const displayTags = article.tags.filter(t => t.toLowerCase() !== label.toLowerCase())
  const category = displayTags[0] ?? label

  const combinedHtml = (article.content1 ?? '') + (article.content2 ?? '')
  const readTime = calculateReadTime(combinedHtml)
  const toc = extractTOC(combinedHtml)
  const content1 = injectHeadingIds(article.content1)
  const content2 = injectHeadingIds(article.content2)

  // Lead text: description from DB or first paragraph of content
  const leadText = article.description || extractExcerpt(article.content1)

  return (
    <article style={{
      background: '#F4F3EC',
      color: '#101213',
      fontFamily: 'var(--font-poppins), system-ui, sans-serif',
      minHeight: '100vh',
    }}>

      {/* ── Scoped styles ─────────────────────────────────── */}
      <style>{`
        .blog-container {
          max-width: 1200px;
          margin: 0 auto;
          padding-inline: 16px;
        }
        @media (min-width: 768px) { .blog-container { padding-inline: 24px; } }

        /* Two-column body */
        .blog-body {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          padding-top: 14px;
          padding-bottom: 64px;
        }
        @media (min-width: 768px) { .blog-body { padding-top: 16px; gap: 48px; } }
        @media (min-width: 1280px) { .blog-body { grid-template-columns: 1fr 300px; } }

        /* TOC hidden below xl */
        .blog-toc { display: none; }
        @media (min-width: 1280px) { .blog-toc { display: block; } }

        /* Prose */
        .jvl-prose {
          font-size: 20px;
          font-weight: 400;
          line-height: 1.85;
          color: #2A2A2A;
        }
        @media (min-width: 768px) { .jvl-prose { font-size: 22px; } }

        .jvl-prose * { background-color: transparent !important; }
        .jvl-prose p, .jvl-prose li, .jvl-prose span, .jvl-prose div, .jvl-prose a, .jvl-prose td {
          color: inherit !important;
          font-size: inherit !important;
          font-family: inherit !important;
          line-height: inherit !important;
        }

        .jvl-prose p { margin: 0 0 20px; }

        .jvl-prose h2 {
          font-size: 24px;
          font-weight: 700;
          color: #101213 !important;
          margin: 48px 0 20px;
          line-height: 1.2;
          scroll-margin-top: 80px;
        }
        @media (min-width: 768px) { .jvl-prose h2 { font-size: 28px; } }

        .jvl-prose h3 {
          font-size: 20px;
          font-weight: 600;
          color: #101213 !important;
          margin: 32px 0 16px;
          line-height: 1.3;
          scroll-margin-top: 80px;
        }

        .jvl-prose h4 { font-size: 18px; font-weight: 600; color: #101213 !important; margin: 24px 0 12px; }

        .jvl-prose a { color: #059FFF; text-decoration: underline; text-underline-offset: 3px; }
        .jvl-prose a:hover { color: #FB671F; }

        .jvl-prose ul, .jvl-prose ol {
          line-height: 1.7;
          padding-left: 24px;
          margin: 0 0 20px;
          color: #2A2A2A !important;
        }
        .jvl-prose li { margin-bottom: 8px; color: #2A2A2A !important; }
        .jvl-prose li * { color: #2A2A2A !important; }

        .jvl-prose blockquote {
          border-left: 4px solid #FB671F;
          padding: 20px 24px;
          margin: 24px 0;
          font-style: italic;
          line-height: 1.7;
          color: #4B4B4B !important;
        }

        .jvl-prose img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 32px 0;
          display: block;
        }

        .jvl-prose hr { border: 0; border-top: 1px solid #D0CEC6; margin: 40px 0; }
        .jvl-prose strong, .jvl-prose b { color: #101213 !important; font-weight: 600; }

        .jvl-prose table {
          width: 100%;
          border-collapse: collapse;
          font-size: 15px;
          border: 1px solid #D0CEC6;
          border-radius: 8px;
          overflow: hidden;
          margin: 32px 0;
        }
        .jvl-prose table th {
          text-align: left;
          font-weight: 600;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #FB671F !important;
          padding: 12px 16px;
          background: #EAE8E0 !important;
          border-bottom: 1px solid #D0CEC6;
        }
        .jvl-prose table td {
          padding: 12px 16px;
          border-bottom: 1px solid #E8E6DF;
          color: #2A2A2A !important;
          vertical-align: top;
        }
        .jvl-prose table tr:last-child td { border-bottom: none; }
        .jvl-prose table tbody tr:hover { background: rgba(0,0,0,0.02) !important; }

        .jvl-prose code {
          background: #E8E6DF !important;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.88em;
          color: #101213 !important;
        }
        .jvl-prose pre {
          background: #E8E6DF !important;
          padding: 16px 20px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 24px 0;
        }
        .jvl-prose pre code { background: transparent !important; padding: 0; }

        /* Related grid */
        .related-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 768px) { .related-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .related-grid { grid-template-columns: repeat(3, 1fr); } }

        .related-card {
          transition: transform 0.2s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .related-card:hover { transform: translateY(-2px); }
        .related-card-body { flex: 1; display: flex; flex-direction: column; }
      `}</style>

      {/* ══ Section 1: Header ════════════════════════════════ */}
      <div className="blog-container">
        <div style={{ paddingTop: 48, paddingBottom: 32 }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
            <Link href={`/${locale}/blog-and-news`} style={{ fontSize: 14, color: '#787878', textDecoration: 'none' }}>
              Blog
            </Link>
            <span style={{ fontSize: 14, color: '#B0AEA8' }}>/</span>
            <span style={{ fontSize: 14, color: '#B0AEA8' }}>{category}</span>
          </div>

          {/* Category badge */}
          <div style={{ marginBottom: 16 }}>
            <span style={{
              display: 'inline-block',
              fontSize: 14,
              fontWeight: 500,
              padding: '6px 12px',
              border: '1px solid #D0CEC6',
              borderRadius: 6,
              color: '#101213',
            }}>
              {label}
            </span>
          </div>

          {/* H1 */}
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#101213',
            margin: '0 0 24px',
          }}>
            {article.title}
          </h1>

          {/* Lead / excerpt */}
          {leadText && (
            <p style={{
              fontSize: 'clamp(17px, 2vw, 20px)',
              fontWeight: 300,
              lineHeight: 1.6,
              color: '#4B4B4B',
              margin: '0 0 24px',
            }}>
              {leadText}
            </p>
          )}

          {/* Meta row: date · read time · author */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px 20px', fontSize: 14, color: '#787878', marginBottom: 12 }}>
            {article.publishedAt && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, opacity: 0.6 }}>
                  <rect x="1" y="2.5" width="14" height="12" rx="2" stroke="#787878" strokeWidth="1.4"/>
                  <path d="M1 6h14" stroke="#787878" strokeWidth="1.4"/>
                  <path d="M5 1v3M11 1v3" stroke="#787878" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                Updated {formatDate(article.publishedAt)}
              </span>
            )}
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, opacity: 0.6 }}>
                <circle cx="8" cy="8" r="6.5" stroke="#787878" strokeWidth="1.4"/>
                <path d="M8 4.5V8l2.5 2" stroke="#787878" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {readTime} min read
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, opacity: 0.6 }}>
                <circle cx="8" cy="5" r="3" stroke="#787878" strokeWidth="1.4"/>
                <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="#787878" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              JVL Editorial Team
            </span>
          </div>

        </div>
      </div>

      {/* ══ Section 2: Two-column body ═══════════════════════ */}
      <div className="blog-container">
        <div className="blog-body">

          {/* LEFT: hero + article content */}
          <div>
            {/* Hero image — inside left column */}
            {(article.heroImage || article.heroImageMobile) && (
              <div style={{ borderRadius: 10, overflow: 'hidden', marginBottom: 40 }}>
                <picture>
                  {article.heroImageMobile && (
                    <source media="(max-width: 640px)" srcSet={article.heroImageMobile} />
                  )}
                  <img
                    src={article.heroImage ?? article.heroImageMobile ?? ''}
                    alt={article.title ?? ''}
                    style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                  />
                </picture>
              </div>
            )}

            {/* Article prose */}
            <div className="jvl-prose">
              {content1 && <div dangerouslySetInnerHTML={{ __html: content1 }} />}
              {content2 && <div dangerouslySetInnerHTML={{ __html: content2 }} />}
            </div>
          </div>

          {/* RIGHT: sticky TOC (xl+ only) */}
          <div className="blog-toc">
            <ArticleTOC items={toc} />
          </div>

        </div>
      </div>

      {/* ══ Section 3: Related Articles (full width) ═════════ */}
      {related.length > 0 && (
        <div className="blog-container">
          <section style={{ borderTop: '1px solid #D0CEC6', paddingTop: 48, paddingBottom: 80 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#101213', margin: '0 0 32px' }}>
              Related Articles
            </h2>
            <div className="related-grid">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/${locale}/blog-and-news/${r.slug}`}
                  style={{ display: 'flex', textDecoration: 'none', color: '#101213' }}
                >
                  <article className="related-card" style={{
                    border: '1px solid #D0CEC6',
                    borderRadius: 8,
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    width: '100%',
                  }}>
                    <div style={{ height: 200, background: '#E8E6DF', overflow: 'hidden', flexShrink: 0 }}>
                      {r.heroImage && (
                        <img
                          src={r.heroImage}
                          alt={r.title ?? ''}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      )}
                    </div>
                    <div className="related-card-body" style={{ padding: 24 }}>
                      <span style={{
                        display: 'inline-block',
                        fontSize: 13,
                        fontWeight: 500,
                        padding: '5px 10px',
                        border: '1px solid #D0CEC6',
                        borderRadius: 6,
                        color: '#787878',
                        marginBottom: 12,
                      }}>
                        {r.type === 1 ? 'Blog' : 'News'}
                      </span>
                      <h3 style={{
                        fontSize: 18,
                        fontWeight: 600,
                        lineHeight: 1.3,
                        color: '#101213',
                        margin: '0 0 8px',
                        flex: 1,
                      }}>
                        {r.title}
                      </h3>
                      {r.publishedAt && (
                        <p style={{ fontSize: 13, color: '#787878', margin: '8px 0 0' }}>
                          {formatDate(r.publishedAt)}
                        </p>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        </div>
      )}

    </article>
  )
}
