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
  perPage = 7,
  search?: string
): Promise<{ items: NewsListItem[]; total: number }> {
  try {
    const db = getPool()
    const offset = (Math.max(1, page) - 1) * perPage

    const whereType = type !== undefined ? 'AND n.type = ?' : ''
    const whereSearch = search ? 'AND (p.title LIKE ? OR p.description LIKE ?)' : ''
    const params: any[] = type !== undefined ? [type] : []
    if (search) {
      const like = `%${search}%`
      params.push(like, like)
    }

    // Count
    const [countRows] = await db.execute(
      `SELECT COUNT(*) AS cnt FROM news n
       INNER JOIN pages p ON p.id = n.page_id
       WHERE n.active = 1 ${whereType} ${whereSearch}`,
      params
    )
    const total = (countRows as any[])[0]?.cnt ?? 0

    // Items
    const [rows] = await db.execute(
      `SELECT n.id AS news_id, n.type, n.published_at,
              p.id AS page_id, p.slug, p.title, p.description, p.content1
       FROM news n
       INNER JOIN pages p ON p.id = n.page_id
       WHERE n.active = 1 ${whereType} ${whereSearch}
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

/** ── Game Themes ─────────────────────────────────────────────────────────── */

export interface GameThemeItem {
  id: number
  name: string | null
  url: string | null
  tag_id: number | null
  sort: number
  image: string | null
}

export async function getGameThemes(locale = 'en'): Promise<GameThemeItem[]> {
  try {
    const db = getPool()
    // Join with taggables+tags to get the theme name (Spatie Tag of type 'Themes')
    const [rows] = await db.execute(
      `SELECT gt.id, gt.text, gt.url, gt.sort,
              t.name AS tag_name, t.id AS tag_id
       FROM game_themes gt
       LEFT JOIN taggables tbl ON tbl.taggable_type = 'App\\\\Models\\\\GameTheme' AND tbl.taggable_id = gt.id
       LEFT JOIN tags t ON t.id = tbl.tag_id AND t.type = 'Themes'
       WHERE gt.page_id = 1
       ORDER BY gt.sort ASC`
    )
    const results: GameThemeItem[] = []
    for (const r of rows as any[]) {
      const image = await getMediaUrl('App\\Models\\GameTheme', r.id, 'image')
      // Use tag name as display label; fallback to text field
      const tagName = r.tag_name ? parseLocale(r.tag_name, locale) : null
      const bannerText = parseLocale(r.text, locale)
      results.push({
        id: r.id,
        name: tagName ?? bannerText,
        url: parseLocale(r.url, locale),
        tag_id: r.tag_id ?? null,
        sort: r.sort,
        image,
      })
    }
    return results
  } catch (err) {
    console.error('[gameThemes] getGameThemes failed:', err)
    return []
  }
}

/** ── Hero Slides ──────────────────────────────────────────────────────────── */

export interface SlideItem {
  id: number
  title: string | null
  description: string | null
  btnText: string | null
  link: string | null
  sort: number
  desktopImage: string | null
  mobileImage: string | null
}

/**
 * Fetch slides for the page-level slider (homepage: pageId=1).
 * Slider → Slides → Media (main + mainMobile).
 */
export async function getSlides(pageId: number, locale = 'en'): Promise<SlideItem[]> {
  try {
    const db = getPool()

    // Find the slider attached to this page
    const [sliderRows] = await db.execute(
      "SELECT id FROM sliders WHERE model_type = 'App\\\\Models\\\\Page' AND model_id = ? LIMIT 1",
      [pageId]
    )
    const slider = (sliderRows as any[])[0]
    if (!slider) return []

    // Get slides ordered by sort
    const [rows] = await db.execute(
      'SELECT id, title, description, btn_text, link, sort, active FROM slides WHERE slider_id = ? ORDER BY sort ASC',
      [slider.id]
    )
    const slideRows = rows as any[]

    const results: SlideItem[] = []
    for (const r of slideRows) {
      // Check active (JSON field): {"en":1} or just 1
      let active = true
      try {
        const raw = r.active
        if (raw !== null && raw !== undefined) {
          const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
          if (typeof parsed === 'object') {
            active = !!(parsed[locale] ?? parsed['en'] ?? 1)
          } else {
            active = !!parsed
          }
        }
      } catch {}
      if (!active) continue

      const [desktop, mobile] = await Promise.all([
        getMediaUrl('App\\Models\\Slide', r.id, 'main'),
        getMediaUrl('App\\Models\\Slide', r.id, 'mainMobile'),
      ])

      results.push({
        id: r.id,
        title: parseLocale(r.title, locale),
        description: parseLocale(r.description, locale),
        btnText: parseLocale(r.btn_text, locale),
        link: parseLocale(r.link, locale),
        sort: r.sort,
        desktopImage: desktop,
        mobileImage: mobile,
      })
    }

    return results
  } catch (err) {
    console.error('[slides] getSlides failed:', err)
    return []
  }
}

export interface InlineEntity {
  id: number
  landing_block_id: number
  type: string
  title: string | null
  text: string | null
  icon_class: string | null
  sort: number
}

/** Get inline entities for a landing block */
export async function getLandingInlineEntities(blockId: number, locale = 'en'): Promise<InlineEntity[]> {
  try {
    const db = getPool()
    const [rows] = await db.execute(
      'SELECT id, landing_block_id, type, title, text, icon_class, sort FROM landing_inline_entities WHERE landing_block_id = ? ORDER BY sort ASC',
      [blockId]
    )
    return (rows as any[]).map(r => ({
      id: r.id,
      landing_block_id: r.landing_block_id,
      type: r.type,
      title: parseLocale(r.title, locale),
      text: parseLocale(r.text, locale),
      icon_class: r.icon_class,
      sort: r.sort,
    }))
  } catch {
    return []
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
