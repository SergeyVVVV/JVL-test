import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getNewsArticleBySlug, getRelatedNews } from '@/lib/db'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

function formatDate(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params
  const article = await getNewsArticleBySlug(slug, locale)
  if (!article) return { title: 'Article not found — JVL' }
  return {
    title: `${article.title ?? 'JVL Blog'} — JVL`,
    description: article.description ?? undefined,
  }
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { locale, slug } = await params
  const article = await getNewsArticleBySlug(slug, locale)
  if (!article) notFound()

  const related = await getRelatedNews(article.id, article.type, locale, 6)
  const label = article.type === 1 ? 'Blog' : 'News'

  return (
    <article
      style={{
        background: '#F4F3EC',
        color: '#101213',
        fontFamily: 'var(--font-poppins), system-ui, sans-serif',
        minHeight: '100vh',
        paddingBottom: 80,
      }}
    >
      {/* Scoped prose styles for HTML content incl. tables */}
      <style>{`
        .jvl-prose {
          font-size: 17px;
          font-weight: 300;
          line-height: 1.75;
          color: #2A2A2A;
          letter-spacing: 0.005em;
        }
        /* Strip Summernote inline background/color styles */
        .jvl-prose * {
          background-color: transparent !important;
        }
        .jvl-prose p,
        .jvl-prose li,
        .jvl-prose span,
        .jvl-prose div {
          color: inherit !important;
        }
        .jvl-prose > * + * { margin-top: 1.1em; }
        .jvl-prose p { margin: 0 0 1.1em; }
        .jvl-prose a { color: #059FFF; text-decoration: underline; text-underline-offset: 3px; }
        .jvl-prose a:hover { color: #FB671F; }
        .jvl-prose h2 {
          font-size: clamp(1.5rem, 2.6vw, 2rem);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          color: #101213 !important;
          margin: 2em 0 0.6em;
          line-height: 1.2;
        }
        .jvl-prose h3 {
          font-size: clamp(1.2rem, 2vw, 1.5rem);
          font-weight: 600;
          color: #101213 !important;
          margin: 1.6em 0 0.5em;
          line-height: 1.3;
        }
        .jvl-prose h4 { font-size: 1.1rem; font-weight: 600; color: #101213 !important; margin: 1.4em 0 0.4em; }
        .jvl-prose ul, .jvl-prose ol { margin: 0 0 1.1em 1.4em; padding: 0; }
        .jvl-prose li { margin: 0 0 0.45em; }
        .jvl-prose blockquote {
          border-left: 3px solid #FB671F;
          padding: 0.2em 0 0.2em 1.2em;
          margin: 1.4em 0;
          font-style: italic;
          color: #787878 !important;
          font-size: 1.05em;
        }
        .jvl-prose img {
          max-width: 100%;
          height: auto;
          border-radius: 6px;
          margin: 1.6em 0;
          display: block;
        }
        .jvl-prose hr { border: 0; border-top: 1px solid #D0CEC6; margin: 2.2em 0; }
        .jvl-prose code {
          background: #E8E6DF !important;
          padding: 0.15em 0.4em;
          border-radius: 3px;
          font-size: 0.9em;
          color: #101213 !important;
        }
        .jvl-prose pre {
          background: #E8E6DF !important;
          padding: 1em 1.2em;
          border-radius: 6px;
          overflow-x: auto;
          margin: 1.4em 0;
        }
        .jvl-prose pre code { background: transparent !important; padding: 0; }

        /* Tables */
        .jvl-prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.8em 0;
          font-size: 15px;
          display: block;
          overflow-x: auto;
        }
        .jvl-prose table thead {
          background: #E8E6DF !important;
        }
        .jvl-prose table th {
          text-align: left;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 11px;
          letter-spacing: 0.08em;
          color: #FB671F !important;
          padding: 14px 16px;
          border-bottom: 1px solid #D0CEC6;
        }
        .jvl-prose table td {
          padding: 14px 16px;
          border-bottom: 1px solid #D0CEC6;
          color: #2A2A2A !important;
          vertical-align: top;
        }
        .jvl-prose table tr:last-child td { border-bottom: none; }
        .jvl-prose table tbody tr:hover { background: rgba(0,0,0,0.03) !important; }
        .jvl-prose strong, .jvl-prose b { color: #101213 !important; font-weight: 600; }
      `}</style>

      {/* HEADER */}
      <header
        style={{
          maxWidth: 760,
          margin: '0 auto',
          padding: '4px 24px 40px',
        }}
      >
        {/* Breadcrumb */}
        <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link
            href={`/${locale}/blog-and-news`}
            style={{ fontSize: 13, color: '#787878', textDecoration: 'none', letterSpacing: '0.02em' }}
          >
            Blog
          </Link>
          <span style={{ fontSize: 13, color: '#B0AEA8' }}>/</span>
          <span style={{ fontSize: 13, color: '#B0AEA8', letterSpacing: '0.02em' }}>{label}</span>
        </div>

        {/* Tag pill */}
        <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '5px 14px',
              border: '1px solid #B0AEA8',
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 500,
              color: '#101213',
              letterSpacing: '0.03em',
            }}
          >
            {label}
          </span>
          {article.tags.map((t) => (
            <span
              key={t}
              style={{
                display: 'inline-block',
                padding: '5px 14px',
                border: '1px solid #B0AEA8',
                borderRadius: 999,
                fontSize: 12,
                color: '#787878',
                letterSpacing: '0.03em',
              }}
            >
              {t}
            </span>
          ))}
          {article.publishedAt && (
            <span style={{ fontSize: 12, color: '#787878', letterSpacing: '0.03em', marginLeft: 4 }}>
              {formatDate(article.publishedAt)}
            </span>
          )}
        </div>

        {/* H1 */}
        <h1
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            margin: '0 0 16px',
            color: '#101213',
          }}
        >
          {article.title}
        </h1>

        {/* Description / lead text */}
        {article.description && (
          <p
            style={{
              fontSize: 17,
              fontWeight: 300,
              lineHeight: 1.65,
              color: '#4B4B4B',
              margin: 0,
            }}
          >
            {article.description}
          </p>
        )}
      </header>

      {/* HERO IMAGE */}
      {(article.heroImage || article.heroImageMobile) && (
        <div
          style={{
            maxWidth: 760,
            margin: '0 auto 56px',
            padding: '0 24px',
          }}
        >
          <div style={{ borderRadius: 8, overflow: 'hidden' }}>
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
        </div>
      )}

      {/* CONTENT */}
      <div
        style={{
          maxWidth: 760,
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <div className="jvl-prose">
          {article.content1 && <div dangerouslySetInnerHTML={{ __html: article.content1 }} />}
          {article.content2 && <div dangerouslySetInnerHTML={{ __html: article.content2 }} />}
        </div>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <section
          style={{
            maxWidth: 1200,
            margin: '96px auto 0',
            padding: '0 24px',
            borderTop: '1px solid #D0CEC6',
            paddingTop: 64,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#FB671F',
              marginBottom: 12,
            }}
          >
            More from JVL
          </div>
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              color: '#101213',
              margin: '0 0 40px',
            }}
          >
            Related news
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 28,
            }}
          >
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/${locale}/blog-and-news/${r.slug}`}
                style={{
                  display: 'block',
                  color: '#101213',
                  textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    aspectRatio: '16 / 10',
                    borderRadius: 6,
                    overflow: 'hidden',
                    background: '#D0CEC6',
                    marginBottom: 14,
                  }}
                >
                  {r.heroImage && (
                    <img
                      src={r.heroImage}
                      alt={r.title ?? ''}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  )}
                </div>
                {r.publishedAt && (
                  <div
                    style={{
                      fontSize: 11,
                      color: '#787878',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      marginBottom: 6,
                    }}
                  >
                    {formatDate(r.publishedAt)}
                  </div>
                )}
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 500,
                    lineHeight: 1.3,
                    color: '#101213',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {r.title}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
