export const BASE_URL = 'https://www.jvl.ca'
export const DEFAULT_OG_IMAGE = `${BASE_URL}/api/storage/3692/1.jpg`

/**
 * Normalize a date for SEO emission (BlogPosting datePublished/dateModified
 * and og:article:published_time / modified_time).
 *
 * Google's Article structured data docs explicitly recommend ISO 8601 with
 * hour, minute, second AND time zone. A bare `YYYY-MM-DD` is interpreted as
 * midnight UTC, which can shift the displayed date by ±1 day in non-UTC zones.
 *
 * Behavior:
 *  - null / undefined / "" → null
 *  - Already contains "T" (full DateTime) → returned unchanged
 *  - `YYYY-MM-DD` → appended with `T12:00:00-05:00` (noon Eastern, JVL's local TZ).
 *    Noon is chosen because it lands on the correct calendar day in every world
 *    time zone (from UTC-12 to UTC+14). The fixed -05:00 offset ignores DST —
 *    acceptable approximation when we don't know the exact publish time.
 */
export function toFullIsoDate(value: string | null | undefined): string | null {
  if (!value) return null
  if (value.includes('T')) return value
  return `${value}T12:00:00-05:00`
}

export function buildMeta({
  title,
  description,
  path,
  ogImage,
  type = 'website',
  publishedTime,
  modifiedTime,
  noindex = false,
}: {
  title: string
  description: string
  path: string
  ogImage?: string | null
  type?: 'website' | 'article'
  publishedTime?: string | null
  modifiedTime?: string | null
  /** When true, emit <meta name="robots" content="noindex, nofollow">.
   *  Driven by the `noindexNofollow` flag from the Laravel admin (metas table). */
  noindex?: boolean
}) {
  const url = `${BASE_URL}${path}`
  const image = ogImage
    ? ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`
    : DEFAULT_OG_IMAGE
  return {
    title,
    description,
    alternates: { canonical: url },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title,
      description,
      url,
      siteName: 'JVL',
      images: [{ url: image }],
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
  }
}
