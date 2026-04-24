import { MetadataRoute } from 'next'
import { getPool } from '@/lib/db'

const BASE_URL = 'https://www.jvl.ca'
const LOCALE = 'en'
const BLOG_PER_PAGE = 7
const GAMES_PER_PAGE = 24

async function getBlogArticles(): Promise<Array<{ slug: string; lastmod: string }>> {
  try {
    const db = getPool()
    const [rows] = await db.execute(
      `SELECT p.slug, n.published_at
       FROM pages p INNER JOIN news n ON n.page_id = p.id
       WHERE n.active = 1
       ORDER BY n.published_at DESC`
    )
    return (rows as any[]).map((r) => ({
      slug: r.slug,
      lastmod: r.published_at instanceof Date
        ? r.published_at.toISOString().slice(0, 10)
        : String(r.published_at ?? '').slice(0, 10),
    }))
  } catch {
    return []
  }
}

async function getBlogTotal(): Promise<number> {
  try {
    const db = getPool()
    const [rows] = await db.execute(`SELECT COUNT(*) AS cnt FROM news WHERE active = 1`)
    return Number((rows as any[])[0]?.cnt ?? 0)
  } catch {
    return 0
  }
}

async function getGameSlugs(): Promise<Array<{ slug: string; lastmod: string }>> {
  try {
    const db = getPool()
    const [rows] = await db.execute(
      `SELECT DISTINCT p.slug, g.updated_at
       FROM games g INNER JOIN pages p ON p.id = g.page_id
       WHERE g.active = 1
       ORDER BY g.id ASC`
    )
    return (rows as any[]).map((r) => ({
      slug: r.slug,
      lastmod: r.updated_at instanceof Date
        ? r.updated_at.toISOString().slice(0, 10)
        : String(r.updated_at ?? '').slice(0, 10),
    }))
  } catch {
    return []
  }
}

async function getGamesTotal(): Promise<number> {
  try {
    const db = getPool()
    const [rows] = await db.execute(`SELECT COUNT(DISTINCT g.id) AS cnt FROM games g WHERE g.active = 1`)
    return Number((rows as any[])[0]?.cnt ?? 0)
  } catch {
    return 0
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const today = new Date().toISOString().slice(0, 10)

  // ── Static pages ─────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/${LOCALE}`,                lastModified: today, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE_URL}/${LOCALE}/echo`,           lastModified: today, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/${LOCALE}/echo-b2b`,       lastModified: today, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/${LOCALE}/flex`,           lastModified: today, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/${LOCALE}/games`,          lastModified: today, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/${LOCALE}/blog-and-news`,  lastModified: today, changeFrequency: 'daily',   priority: 0.7 },
    { url: `${BASE_URL}/${LOCALE}/about-jvl`,      lastModified: today, changeFrequency: 'monthly', priority: 0.6 },
    // partners page hidden — redirect to homepage, excluded from sitemap
    { url: `${BASE_URL}/${LOCALE}/contact-us`,     lastModified: today, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/${LOCALE}/warranty`,       lastModified: today, changeFrequency: 'monthly', priority: 0.5 },
  ]

  // ── Blog articles ─────────────────────────────────────────────
  const articles = await getBlogArticles()
  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/${LOCALE}/blog-and-news/${a.slug}`,
    lastModified: a.lastmod || today,
    changeFrequency: 'daily',
    priority: 0.7,
  }))

  // ── Blog pagination ───────────────────────────────────────────
  const blogTotal = await getBlogTotal()
  const blogPageCount = Math.ceil(blogTotal / BLOG_PER_PAGE)
  const blogPagination: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(0, blogPageCount - 1) },
    (_, i) => ({
      url: `${BASE_URL}/${LOCALE}/blog-and-news?page=${i + 2}`,
      lastModified: today,
      changeFrequency: 'daily' as const,
      priority: 0.5,
    })
  )

  // ── Game pages ────────────────────────────────────────────────
  const games = await getGameSlugs()
  const gamePages: MetadataRoute.Sitemap = games.map((g) => ({
    url: `${BASE_URL}/${LOCALE}/games/${g.slug}`,
    lastModified: g.lastmod || today,
    changeFrequency: 'daily',
    priority: 0.6,
  }))

  // ── Games pagination ──────────────────────────────────────────
  const gamesTotal = await getGamesTotal()
  const gamesPageCount = Math.ceil(gamesTotal / GAMES_PER_PAGE)
  const gamesPagination: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(0, gamesPageCount - 1) },
    (_, i) => ({
      url: `${BASE_URL}/${LOCALE}/games?page=${i + 2}`,
      lastModified: today,
      changeFrequency: 'daily' as const,
      priority: 0.4,
    })
  )

  return [
    ...staticPages,
    ...articlePages,
    ...blogPagination,
    ...gamePages,
    ...gamesPagination,
  ]
}
