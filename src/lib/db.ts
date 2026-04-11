import mysql from 'mysql2/promise'

let pool: mysql.Pool | null = null

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.LARAVEL_DB_HOST || 'localhost',
      port: parseInt(process.env.LARAVEL_DB_PORT || '3306'),
      database: process.env.LARAVEL_DB_DATABASE || 'jvl_dev',
      user: process.env.LARAVEL_DB_USERNAME || 'jvl',
      password: process.env.LARAVEL_DB_PASSWORD || '',
      waitForConnections: true,
      connectionLimit: 5,
    })
  }
  return pool
}

export interface LandingBlock {
  id: number
  title: string | null
  tag_label: string | null
  text: string | null
  button_text: string | null
  button_url: string | null
  second_title: string | null
  price: string | null
  type: string
}

/** Parse a JSON-encoded multilingual field, return the `en` value */
function parseLocale(raw: string | null, locale = 'en'): string | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    return parsed[locale] ?? parsed['en'] ?? null
  } catch {
    return raw
  }
}

/** Get a landing block by type from the unified landing_blocks table */
export async function getLandingBlock(type: string, locale = 'en'): Promise<LandingBlock | null> {
  try {
    const db = getPool()
    const [rows] = await db.execute(
      'SELECT id, title, tag_label, text, button_text, button_url, second_title, price FROM landing_blocks WHERE type = ? AND active = 1 LIMIT 1',
      [type]
    )
    const row = (rows as any[])[0]
    if (!row) return null
    return {
      id: row.id,
      title: parseLocale(row.title, locale),
      tag_label: parseLocale(row.tag_label, locale),
      text: parseLocale(row.text, locale),
      button_text: parseLocale(row.button_text, locale),
      button_url: row.button_url,
      second_title: parseLocale(row.second_title, locale),
      price: row.price,
      type,
    }
  } catch {
    return null
  }
}

export interface NewsArticle {
  id: number
  pageId: number
  slug: string
  title: string | null
  content1: string | null
  content2: string | null
  description: string | null
  publishedAt: string | null
  type: number
  heroImage: string | null
  heroImageMobile: string | null
  tags: string[]
}

export interface RelatedNewsItem {
  id: number
  slug: string
  title: string | null
  publishedAt: string | null
  type: number
  heroImage: string | null
}

/** Fetch a published news article by its page slug */
export async function getNewsArticleBySlug(slug: string, locale = 'en'): Promise<NewsArticle | null> {
  try {
    const db = getPool()
    const [rows] = await db.execute(
      `SELECT p.id AS page_id, p.slug, p.title, p.content1, p.content2, p.description,
              n.id AS news_id, n.type, n.published_at
       FROM pages p
       INNER JOIN news n ON n.page_id = p.id
       WHERE p.slug = ? AND n.active = 1
       LIMIT 1`,
      [slug]
    )
    const row = (rows as any[])[0]
    if (!row) {
      console.warn(`[news] no active article for slug="${slug}"`)
      return null
    }

    const [hero, heroMobile] = await Promise.all([
      getMediaUrl('App\\Models\\Page', row.page_id, 'main'),
      getMediaUrl('App\\Models\\Page', row.page_id, 'mainMobile'),
    ])

    // tags (Spatie) via taggables → tags
    let tags: string[] = []
    try {
      const [tagRows] = await db.execute(
        `SELECT t.name FROM taggables tg
         INNER JOIN tags t ON t.id = tg.tag_id
         WHERE tg.taggable_type = 'App\\\\Models\\\\News' AND tg.taggable_id = ? AND t.type = 'Game Tags'`,
        [row.news_id]
      )
      tags = (tagRows as any[])
        .map((r) => parseLocale(r.name, locale))
        .filter((v): v is string => !!v)
    } catch {}

    const publishedAt = row.published_at
      ? (row.published_at instanceof Date
          ? row.published_at.toISOString().slice(0, 10)
          : String(row.published_at).slice(0, 10))
      : null

    return {
      id: row.news_id,
      pageId: row.page_id,
      slug: row.slug,
      title: parseLocale(row.title, locale),
      content1: parseLocale(row.content1, locale),
      content2: parseLocale(row.content2, locale),
      description: parseLocale(row.description, locale),
      publishedAt,
      type: Number(row.type ?? 0),
      heroImage: hero,
      heroImageMobile: heroMobile,
      tags,
    }
  } catch (err) {
    console.error('[news] getNewsArticleBySlug failed:', err)
    return null
  }
}

/** Fetch related news (same type, excluding the current article) */
export async function getRelatedNews(
  excludeNewsId: number,
  type: number,
  locale = 'en',
  limit = 6
): Promise<RelatedNewsItem[]> {
  try {
    const db = getPool()
    const safeLimit = Math.max(1, Math.min(20, Math.floor(limit)))
    const [rows] = await db.execute(
      `SELECT n.id AS news_id, n.type, n.published_at,
              p.id AS page_id, p.slug, p.title
       FROM news n
       INNER JOIN pages p ON p.id = n.page_id
       WHERE n.active = 1 AND n.type = ? AND n.id != ?
       ORDER BY n.published_at DESC
       LIMIT ${safeLimit}`,
      [type, excludeNewsId]
    )
    const items = rows as any[]
    const results: RelatedNewsItem[] = []
    for (const r of items) {
      const heroImage = await getMediaUrl('App\\Models\\Page', r.page_id, 'main')
      const publishedAt = r.published_at
        ? (r.published_at instanceof Date
            ? r.published_at.toISOString().slice(0, 10)
            : String(r.published_at).slice(0, 10))
        : null
      results.push({
        id: r.news_id,
        slug: r.slug,
        title: parseLocale(r.title, locale),
        publishedAt,
        type: Number(r.type ?? 0),
        heroImage,
      })
    }
    return results
  } catch {
    return []
  }
}

/** ── News listing (paginated) ────────────────────────────────────────────── */

export interface NewsListItem {
  id: number
  slug: string
  title: string | null
  description: string | null
  content1: string | null
  publishedAt: string | null
  type: number
  heroImage: string | null
}

export async function getNewsList(
  locale = 'en',
  type?: number,
  page = 1,
  perPage = 7
): Promise<{ items: NewsListItem[]; total: number }> {
  try {
    const db = getPool()
    const offset = (Math.max(1, page) - 1) * perPage

    const whereType = type !== undefined ? 'AND n.type = ?' : ''
    const params: any[] = type !== undefined ? [type] : []

    // Count
    const [countRows] = await db.execute(
      `SELECT COUNT(*) AS cnt FROM news n
       INNER JOIN pages p ON p.id = n.page_id
       WHERE n.active = 1 ${whereType}`,
      params
    )
    const total = (countRows as any[])[0]?.cnt ?? 0

    // Items
    const [rows] = await db.execute(
      `SELECT n.id AS news_id, n.type, n.published_at,
              p.id AS page_id, p.slug, p.title, p.description, p.content1
       FROM news n
       INNER JOIN pages p ON p.id = n.page_id
       WHERE n.active = 1 ${whereType}
       ORDER BY n.published_at DESC
       LIMIT ${perPage} OFFSET ${offset}`,
      params
    )

    const items: NewsListItem[] = []
    for (const r of rows as any[]) {
      const heroImage = await getMediaUrl('App\\Models\\Page', r.page_id, 'main')
      const publishedAt = r.published_at
        ? (r.published_at instanceof Date
            ? r.published_at.toISOString().slice(0, 10)
            : String(r.published_at).slice(0, 10))
        : null
      items.push({
        id: r.news_id,
        slug: r.slug,
        title: parseLocale(r.title, locale),
        description: parseLocale(r.description, locale),
        content1: parseLocale(r.content1, locale),
        publishedAt,
        type: Number(r.type ?? 0),
        heroImage,
      })
    }

    return { items, total }
  } catch (err) {
    console.error('[news] getNewsList failed:', err)
    return { items: [], total: 0 }
  }
}

/** Get a media file URL (served via /api/storage) for a Laravel MediaLibrary record */
export async function getMediaUrl(
  modelType: string,
  modelId: number,
  collection: string
): Promise<string | null> {
  try {
    const db = getPool()
    const [rows] = await db.execute(
      'SELECT id, file_name FROM media WHERE model_type = ? AND model_id = ? AND collection_name = ? LIMIT 1',
      [modelType, modelId, collection]
    )
    const media = (rows as any[])[0]
    if (!media) return null
    return `/api/storage/${media.id}/${media.file_name}`
  } catch {
    return null
  }
}
