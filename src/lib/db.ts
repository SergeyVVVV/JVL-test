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
  metaTitle: string | null
  metaDescription: string | null
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
              n.id AS news_id, n.type, n.published_at,
              m.title AS meta_title, m.description AS meta_description
       FROM pages p
       INNER JOIN news n ON n.page_id = p.id
       LEFT JOIN metas m ON m.model_type = 'App\\\\Models\\\\Page' AND m.model_id = p.id
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
      metaTitle: parseLocale(row.meta_title, locale),
      metaDescription: parseLocale(row.meta_description, locale),
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

/** Fetch related news (same category tag, excluding the current article) */
export async function getRelatedNews(
  excludeNewsId: number,
  category: string | null,
  locale = 'en',
  limit = 6
): Promise<RelatedNewsItem[]> {
  try {
    const db = getPool()
    const safeLimit = Math.max(1, Math.min(20, Math.floor(limit)))
    const whereCategory = category
      ? `AND EXISTS (
           SELECT 1 FROM taggables tbl
           INNER JOIN tags t ON t.id = tbl.tag_id
           WHERE tbl.taggable_type = 'App\\\\Models\\\\News'
           AND tbl.taggable_id = n.id AND t.type = 'Game Tags'
           AND (t.name = ? OR JSON_UNQUOTE(JSON_EXTRACT(t.name, '$.en')) = ?)
         )`
      : ''
    const params: any[] = category ? [category, category, excludeNewsId] : [excludeNewsId]
    const [rows] = await db.execute(
      `SELECT n.id AS news_id, n.type, n.published_at,
              p.id AS page_id, p.slug, p.title
       FROM news n
       INNER JOIN pages p ON p.id = n.page_id
       WHERE n.active = 1 ${whereCategory} AND n.id != ?
       ORDER BY n.published_at DESC
       LIMIT ${safeLimit}`,
      params
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
  metaDescription: string | null
  content1: string | null
  publishedAt: string | null
  type: number
  category: string | null
  heroImage: string | null
}

export async function getNewsCategories(locale = 'en'): Promise<string[]> {
  try {
    const db = getPool()
    const [rows] = await db.execute(
      `SELECT DISTINCT t.name
       FROM taggables tbl
       INNER JOIN tags t ON t.id = tbl.tag_id
       INNER JOIN news n ON n.id = tbl.taggable_id
       WHERE tbl.taggable_type = 'App\\\\Models\\\\News' AND t.type = 'Game Tags' AND n.active = 1
       ORDER BY t.name`
    )
    return (rows as any[])
      .map((r: any) => parseLocale(r.name, locale))
      .filter((v): v is string => !!v)
  } catch {
    return []
  }
}

export async function getNewsList(
  locale = 'en',
  category?: string,
  page = 1,
  perPage = 7,
  search?: string
): Promise<{ items: NewsListItem[]; total: number }> {
  try {
    const db = getPool()
    const offset = (Math.max(1, page) - 1) * perPage

    const whereCategory = category
      ? `AND EXISTS (
           SELECT 1 FROM taggables tbl2
           INNER JOIN tags t2 ON t2.id = tbl2.tag_id
           WHERE tbl2.taggable_type = 'App\\\\Models\\\\News'
           AND tbl2.taggable_id = n.id AND t2.type = 'Game Tags'
           AND (t2.name = ? OR JSON_UNQUOTE(JSON_EXTRACT(t2.name, '$.en')) = ?)
         )`
      : ''
    const whereSearch = search
      ? `AND (
           p.title LIKE ? OR
           JSON_UNQUOTE(JSON_EXTRACT(p.title, '$.en')) LIKE ? OR
           p.description LIKE ? OR
           p.content1 LIKE ?
         )`
      : ''
    const params: any[] = category ? [category, category] : []
    if (search) {
      const like = `%${search}%`
      params.push(like, like, like, like)
    }

    // Count
    const [countRows] = await db.execute(
      `SELECT COUNT(*) AS cnt FROM news n
       INNER JOIN pages p ON p.id = n.page_id
       WHERE n.active = 1 ${whereCategory} ${whereSearch}`,
      params
    )
    const total = (countRows as any[])[0]?.cnt ?? 0

    // Items
    const [rows] = await db.execute(
      `SELECT n.id AS news_id, n.type, n.published_at,
              p.id AS page_id, p.slug, p.title, p.description, p.content1,
              m.description AS meta_description,
              (SELECT t3.name FROM taggables tbl3
               INNER JOIN tags t3 ON t3.id = tbl3.tag_id
               WHERE tbl3.taggable_type = 'App\\\\Models\\\\News'
               AND tbl3.taggable_id = n.id AND t3.type = 'Game Tags'
               LIMIT 1) AS tag_name
       FROM news n
       INNER JOIN pages p ON p.id = n.page_id
       LEFT JOIN metas m ON m.model_type = 'App\\\\Models\\\\Page' AND m.model_id = p.id
       WHERE n.active = 1 ${whereCategory} ${whereSearch}
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
        metaDescription: parseLocale(r.meta_description, locale),
        content1: parseLocale(r.content1, locale),
        publishedAt,
        type: Number(r.type ?? 0),
        category: parseLocale(r.tag_name, locale),
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

/** ── Games ───────────────────────────────────────────────────────────────── */

export interface FilterTag {
  id: number
  name: string | null
}

export interface GameFilterTags {
  themes: FilterTag[]
  features: FilterTag[]
  volatility: FilterTag[]
}

/** Fetch all tag options for the games filters */
export async function getGameFilterTags(locale = 'en'): Promise<GameFilterTags> {
  try {
    const db = getPool()
    const [rows] = await db.execute(
      `SELECT id, name, type FROM tags WHERE type IN ('Themes','Features','Volatility') ORDER BY type, name`
    )
    const themes: FilterTag[] = []
    const features: FilterTag[] = []
    const volatility: FilterTag[] = []
    for (const r of rows as any[]) {
      const item: FilterTag = { id: r.id, name: parseLocale(r.name, locale) }
      if (r.type === 'Themes') themes.push(item)
      else if (r.type === 'Features') features.push(item)
      else if (r.type === 'Volatility') volatility.push(item)
    }
    return { themes, features, volatility }
  } catch (err) {
    console.error('[tags] getGameFilterTags failed:', err)
    return { themes: [], features: [], volatility: [] }
  }
}

export interface GameListItem {
  id: number
  pageId: number
  slug: string
  title: string | null
  image: string | null
}

/** Fetch a paginated, filterable list of active games */
export async function getGamesList(options: {
  locale?: string
  page?: number
  perPage?: number
  themeId?: number | null
  featuresId?: number | null
  volatilityId?: number | null
  search?: string
}): Promise<{ items: GameListItem[]; total: number }> {
  const {
    locale = 'en',
    page = 1,
    perPage = 24,
    themeId,
    featuresId,
    volatilityId,
    search,
  } = options
  try {
    const db = getPool()
    const safeOffset = (Math.max(1, page) - 1) * perPage
    const safeLimit  = Math.max(1, Math.min(100, perPage))

    let joins = ''
    const params: any[] = []
    const where: string[] = ['g.active = 1']

    if (themeId) {
      joins += ` INNER JOIN taggables tbl_th
        ON tbl_th.taggable_type = 'App\\\\Models\\\\Game'
        AND tbl_th.taggable_id = g.id
        AND tbl_th.tag_id = ?`
      params.push(themeId)
    }
    if (volatilityId) {
      joins += ` INNER JOIN taggables tbl_vol
        ON tbl_vol.taggable_type = 'App\\\\Models\\\\Game'
        AND tbl_vol.taggable_id = g.id
        AND tbl_vol.tag_id = ?`
      params.push(volatilityId)
    }
    if (featuresId) {
      joins += ` INNER JOIN features feat ON feat.game_id = g.id
        INNER JOIN taggables tbl_feat
          ON tbl_feat.taggable_type = 'App\\\\Models\\\\Feature'
          AND tbl_feat.taggable_id = feat.id
          AND tbl_feat.tag_id = ?`
      params.push(featuresId)
    }
    if (search) {
      where.push(
        `LOWER(COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p.title,'$."${locale}"')),p.title,'')) LIKE ?`
      )
      params.push(`%${search.toLowerCase()}%`)
    }

    const whereClause = 'WHERE ' + where.join(' AND ')

    const [countRows] = await db.execute(
      `SELECT COUNT(DISTINCT g.id) AS cnt
       FROM games g
       INNER JOIN pages p ON p.id = g.page_id
       ${joins}
       ${whereClause}`,
      params
    )
    const total = Number((countRows as any[])[0]?.cnt ?? 0)

    const [rows] = await db.execute(
      `SELECT DISTINCT g.id AS game_id, p.id AS page_id, p.slug, p.title
       FROM games g
       INNER JOIN pages p ON p.id = g.page_id
       ${joins}
       ${whereClause}
       ORDER BY g.id DESC
       LIMIT ${safeLimit} OFFSET ${safeOffset}`,
      params
    )

    const items: GameListItem[] = []
    for (const r of rows as any[]) {
      // Prefer vertical image, fallback to square
      const image =
        (await getMediaUrl('App\\Models\\Game', r.game_id, 'vertical')) ??
        (await getMediaUrl('App\\Models\\Game', r.game_id, 'square'))
      items.push({
        id: r.game_id,
        pageId: r.page_id,
        slug: r.slug,
        title: parseLocale(r.title, locale),
        image,
      })
    }
    return { items, total }
  } catch (err) {
    console.error('[games] getGamesList failed:', err)
    return { items: [], total: 0 }
  }
}

/** Find a page's numeric ID by its slug */
export async function getPageIdBySlug(slug: string): Promise<number | null> {
  try {
    const db = getPool()
    const [rows] = await db.execute(
      'SELECT id FROM pages WHERE slug = ? LIMIT 1',
      [slug]
    )
    return (rows as any[])[0]?.id ?? null
  } catch {
    return null
  }
}

/** ── Game Detail ─────────────────────────────────────────────────────────── */

export interface GameDetail {
  id: number
  pageId: number
  slug: string
  title: string | null
  metaTitle: string | null
  metaDescription: string | null
  description: string | null
  reels: string | null
  paylines: string | null
  playUrl: string | null
  storyTitle: string | null
  storyText: string | null
  storySymbolName: string | null
  storyAboutSymbol: string | null
  rtps: string | null
  minBet: string | null
  maxBet: string | null
  maxWin: string | null
  themes: string[]
  volatility: string | null
  gameTags: string[]
  horizontalImage: string | null
  verticalImage: string | null
  squareImage: string | null
  symbolImage: string | null
  backgroundImage: string | null
}

export async function getGameBySlug(slug: string, locale = 'en'): Promise<GameDetail | null> {
  try {
    const db = getPool()
    const [rows] = await db.execute(
      `SELECT p.id AS page_id, p.slug, p.title, p.description, p.meta_title, p.meta_description,
              g.id AS game_id, g.reels, g.paylines, g.play_url,
              g.story_title, g.story_text, g.story_symbol_name, g.story_about_symbol,
              g.rtps, g.min_bet, g.max_bet, g.max_win
       FROM pages p
       INNER JOIN games g ON g.page_id = p.id
       WHERE p.slug = ? AND g.active = 1
       LIMIT 1`,
      [slug]
    )
    const r = (rows as any[])[0]
    if (!r) return null

    // Tags: themes, volatility, game tags
    const [tagRows] = await db.execute(
      `SELECT t.name, t.type
       FROM taggables tbl
       INNER JOIN tags t ON t.id = tbl.tag_id
       WHERE tbl.taggable_type = 'App\\\\Models\\\\Game' AND tbl.taggable_id = ?
       AND t.type IN ('Themes','Volatility','Game Tags')`,
      [r.game_id]
    )
    const themes: string[] = []
    const gameTags: string[] = []
    let volatility: string | null = null
    for (const t of tagRows as any[]) {
      const name = parseLocale(t.name, locale)
      if (!name) continue
      if (t.type === 'Themes') themes.push(name)
      else if (t.type === 'Volatility') volatility = name
      else if (t.type === 'Game Tags') gameTags.push(name)
    }

    const [horizontal, vertical, square, symbol, background] = await Promise.all([
      getMediaUrl('App\\Models\\Game', r.game_id, 'horizontal'),
      getMediaUrl('App\\Models\\Game', r.game_id, 'vertical'),
      getMediaUrl('App\\Models\\Game', r.game_id, 'square'),
      getMediaUrl('App\\Models\\Game', r.game_id, 'symbol'),
      getMediaUrl('App\\Models\\Game', r.game_id, 'background'),
    ])

    return {
      id: r.game_id,
      pageId: r.page_id,
      slug: r.slug,
      title: parseLocale(r.title, locale),
      metaTitle: parseLocale(r.meta_title, locale),
      metaDescription: parseLocale(r.meta_description, locale),
      description: parseLocale(r.description, locale),
      reels: parseLocale(r.reels, locale),
      paylines: parseLocale(r.paylines, locale),
      playUrl: r.play_url,
      storyTitle: parseLocale(r.story_title, locale),
      storyText: parseLocale(r.story_text, locale),
      storySymbolName: parseLocale(r.story_symbol_name, locale),
      storyAboutSymbol: parseLocale(r.story_about_symbol, locale),
      rtps: r.rtps,
      minBet: r.min_bet,
      maxBet: r.max_bet,
      maxWin: r.max_win,
      themes,
      volatility,
      gameTags,
      horizontalImage: horizontal,
      verticalImage: vertical,
      squareImage: square,
      symbolImage: symbol,
      backgroundImage: background,
    }
  } catch (err) {
    console.error('[game] getGameBySlug failed:', err)
    return null
  }
}

export interface GameScreenSlide {
  id: number
  url: string | null       // YouTube/external video URL
  mainImage: string | null
  mobileImage: string | null
  videoFile: string | null
}

/** ── Games Top Slider (used on /games listing page) ───────────────────────
 *  game_sliders (polymorphic) → game_slides → games + pages + media
 */
export interface GameHeroSlide {
  gameId: number
  slug: string
  title: string | null
  description: string | null
  playUrl: string | null
  image: string | null      // horizontal image
}

export async function getGameSliderSlides(pageId: number, locale = 'en'): Promise<GameHeroSlide[]> {
  try {
    const db = getPool()

    // 1. Find the game_slider attached to this page
    const [sliderRows] = await db.execute(
      "SELECT id FROM game_sliders WHERE model_type = 'App\\\\Models\\\\Page' AND model_id = ? LIMIT 1",
      [pageId]
    )
    const slider = (sliderRows as any[])[0]
    if (!slider) return []

    // 2. Get game_slides ordered by sort, only active ones
    const [slideRows] = await db.execute(
      `SELECT gs.page_id, gs.sort, gs.active
       FROM game_slides gs
       WHERE gs.game_slider_id = ?
       ORDER BY gs.sort ASC`,
      [slider.id]
    )

    const results: GameHeroSlide[] = []

    for (const s of slideRows as any[]) {
      // Check active JSON field
      try {
        const raw = s.active
        if (raw !== null && raw !== undefined) {
          const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
          const isActive = typeof parsed === 'object'
            ? !!(parsed[locale] ?? parsed['en'] ?? 1)
            : !!parsed
          if (!isActive) continue
        }
      } catch {}

      // 3. Get game + page data for this slide
      const [gameRows] = await db.execute(
        `SELECT g.id AS game_id, g.play_url, p.slug, p.title, p.description
         FROM games g
         INNER JOIN pages p ON p.id = g.page_id
         WHERE g.page_id = ? AND g.active = 1
         LIMIT 1`,
        [s.page_id]
      )
      const game = (gameRows as any[])[0]
      if (!game) continue

      // 4. Get horizontal image
      const image = await getMediaUrl('App\\Models\\Game', game.game_id, 'horizontal')

      results.push({
        gameId: game.game_id,
        slug: game.slug,
        title: parseLocale(game.title, locale),
        description: parseLocale(game.description, locale),
        playUrl: game.play_url,
        image,
      })
    }

    return results
  } catch (err) {
    console.error('[game_slider] getGameSliderSlides failed:', err)
    return []
  }
}

export async function getGameScreenSlides(pageId: number): Promise<GameScreenSlide[]> {
  try {
    const db = getPool()
    // Find the game_screen_slider for this page
    const [sliderRows] = await db.execute(
      `SELECT id FROM game_screen_sliders
       WHERE model_type = 'App\\\\Models\\\\Page' AND model_id = ?
       LIMIT 1`,
      [pageId]
    )
    const slider = (sliderRows as any[])[0]
    if (!slider) return []

    const [rows] = await db.execute(
      `SELECT id, url, sort FROM game_screen_slides
       WHERE game_screen_slider_id = ?
       ORDER BY sort ASC`,
      [slider.id]
    )

    const results: GameScreenSlide[] = []
    for (const r of rows as any[]) {
      const [main, mobile, video] = await Promise.all([
        getMediaUrl('App\\Models\\GameScreenSlide', r.id, 'main'),
        getMediaUrl('App\\Models\\GameScreenSlide', r.id, 'mainMobile'),
        getMediaUrl('App\\Models\\GameScreenSlide', r.id, 'video'),
      ])
      results.push({ id: r.id, url: r.url || null, mainImage: main, mobileImage: mobile, videoFile: video })
    }
    return results
  } catch (err) {
    console.error('[game] getGameScreenSlides failed:', err)
    return []
  }
}

export interface GameFeature {
  id: number
  name: string | null
  text: string | null
  image: string | null
}

export async function getGameFeatures(gameId: number, locale = 'en'): Promise<GameFeature[]> {
  try {
    const db = getPool()
    const [rows] = await db.execute(
      `SELECT id, text FROM features WHERE game_id = ?`,
      [gameId]
    )
    const results: GameFeature[] = []
    for (const r of rows as any[]) {
      // Feature name = first tag of type 'Features'
      const [tagRows] = await db.execute(
        `SELECT t.name FROM taggables tbl
         INNER JOIN tags t ON t.id = tbl.tag_id
         WHERE tbl.taggable_type = 'App\\\\Models\\\\Feature' AND tbl.taggable_id = ?
         LIMIT 1`,
        [r.id]
      )
      const tagName = (tagRows as any[])[0]?.name
      const image = await getMediaUrl('App\\Models\\Feature', r.id, 'main')
      results.push({
        id: r.id,
        name: tagName ? parseLocale(tagName, locale) : null,
        text: parseLocale(r.text, locale),
        image,
      })
    }
    return results
  } catch (err) {
    console.error('[game] getGameFeatures failed:', err)
    return []
  }
}

export interface GameReview {
  id: number
  title: string | null
  url: string | null
  image: string | null
}

export async function getGameReviews(gameId: number, locale = 'en'): Promise<GameReview[]> {
  try {
    const db = getPool()
    const [rows] = await db.execute(
      `SELECT id, title, url FROM game_reviews WHERE game_id = ? AND active = 1 ORDER BY sort ASC`,
      [gameId]
    )
    const results: GameReview[] = []
    for (const r of rows as any[]) {
      const image = await getMediaUrl('App\\Models\\GameReview', r.id, 'image')
      results.push({ id: r.id, title: parseLocale(r.title, locale), url: r.url, image })
    }
    return results
  } catch (err) {
    console.error('[game] getGameReviews failed:', err)
    return []
  }
}

/** Get a static page by its ID (for legal pages like privacy-policy, terms-of-use) */
export async function getStaticPage(pageId: number, locale = 'en'): Promise<{
  title: string | null
  metaTitle: string | null
  metaDescription: string | null
  content1: string | null
  content2: string | null
  updatedAt: string | null
} | null> {
  try {
    const db = getPool()
    const [rows] = await db.execute(
      `SELECT title, meta_title, meta_description, content1, content2, updated_at FROM pages WHERE id = ? LIMIT 1`,
      [pageId]
    )
    const r = (rows as any[])[0]
    if (!r) return null
    return {
      title: parseLocale(r.title, locale),
      metaTitle: parseLocale(r.meta_title, locale),
      metaDescription: parseLocale(r.meta_description, locale),
      content1: parseLocale(r.content1, locale),
      content2: parseLocale(r.content2, locale),
      updatedAt: r.updated_at ? new Date(r.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : null,
    }
  } catch (err) {
    console.error('[getStaticPage] failed:', err)
    return null
  }
}

/** Get SEO meta + description for any page by its URL slug */
export async function getPageMeta(slug: string, locale = 'en'): Promise<{
  title: string | null
  description: string | null
  metaDescription: string | null
} | null> {
  try {
    const db = getPool()
    const [rows] = await db.execute(
      `SELECT p.description, m.title AS meta_title, m.description AS meta_description
       FROM pages p
       LEFT JOIN metas m ON m.model_type = 'App\\\\Models\\\\Page' AND m.model_id = p.id
       WHERE p.slug = ?
       LIMIT 1`,
      [slug]
    )
    const r = (rows as any[])[0]
    if (!r) return null
    return {
      title: parseLocale(r.meta_title, locale),
      description: parseLocale(r.description, locale),
      metaDescription: parseLocale(r.meta_description, locale),
    }
  } catch (err) {
    console.error('[getPageMeta] failed:', err)
    return null
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
      'SELECT id, file_name FROM media WHERE model_type = ? AND model_id = ? AND collection_name = ? ORDER BY id DESC LIMIT 1',
      [modelType, modelId, collection]
    )
    const media = (rows as any[])[0]
    if (!media) return null
    return `/api/storage/${media.id}/${media.file_name}`
  } catch {
    return null
  }
}
