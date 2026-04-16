'use client'

import Link from 'next/link'

export interface NewsCardItem {
  id: number
  slug: string
  title: string | null
  publishedAt: string | null
  type: number
  heroImage: string | null
  description?: string | null
}

function formatDate(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function NewsCard({ item, locale, dark = false }: { item: NewsCardItem; locale: string; dark?: boolean }) {
  const bg = dark ? '#181a1b' : '#FFFFFF'
  const border = dark ? '1px solid #2a2a2a' : '1px solid #D0CEC6'
  const imgBg = dark ? '#1a1c1d' : '#E8E6DF'
  const badgeBorder = dark ? '1px solid #3a3a3a' : '1px solid #D0CEC6'
  const badgeColor = dark ? 'rgba(244,243,236,0.5)' : '#787878'
  const titleColor = dark ? '#F4F3EC' : '#101213'
  const textColor = dark ? 'rgba(244,243,236,0.55)' : '#787878'
  const dateColor = dark ? 'rgba(244,243,236,0.35)' : '#787878'
  const linkColor = dark ? '#F4F3EC' : '#101213'

  return (
    <Link
      href={`/${locale}/blog-and-news/${item.slug}`}
      style={{ display: 'flex', textDecoration: 'none', color: linkColor }}
    >
      <article
        style={{
          border,
          borderRadius: 8,
          overflow: 'hidden',
          background: bg,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s ease, border-color 0.2s ease',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.transform = 'translateY(-2px)'
          if (dark) el.style.borderColor = '#3a3a3a'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.transform = 'none'
          if (dark) el.style.borderColor = '#2a2a2a'
        }}
      >
        <div style={{ height: 200, background: imgBg, overflow: 'hidden', flexShrink: 0 }}>
          {item.heroImage && (
            <img
              src={item.heroImage}
              alt={item.title ?? ''}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          )}
        </div>
        <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{
            display: 'inline-block',
            fontSize: 13, fontWeight: 600,
            padding: '5px 10px',
            border: badgeBorder,
            borderRadius: 6,
            color: badgeColor,
            marginBottom: 12,
          }}>
            {item.type === 1 ? 'Blog' : 'News'}
          </span>
          <h3 style={{
            fontSize: 18, fontWeight: 600, lineHeight: 1.3,
            color: titleColor, margin: '0 0 8px', flex: 1,
          }}>
            {item.title}
          </h3>
          {item.description && (
            <p style={{
              fontSize: 15, color: textColor, lineHeight: 1.6,
              margin: '0 0 8px',
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const,
              overflow: 'hidden',
            }}>
              {item.description}
            </p>
          )}
          {item.publishedAt && (
            <p style={{ fontSize: 14, color: dateColor, margin: '8px 0 0' }}>
              {formatDate(item.publishedAt)}
            </p>
          )}
        </div>
      </article>
    </Link>
  )
}
