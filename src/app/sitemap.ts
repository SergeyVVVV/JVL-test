import { MetadataRoute } from 'next'
import { getPool } from '@/lib/db'

const BASE_URL = 'https://www.jvl.ca'
const LOCALE = 'en'

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


/** Returns 'weekly' for articles published within 30 days, 'monthly' for older ones. */
function articleChangeFreq(lastmod: string): 'daily' | 'weekly' | 'monthly' {
  if (!lastmod) return 'monthly'
  const ageMs = Date.now() - new Date(lastmod).getTime()
  const ageDays = ageMs / 86_400_000
  if (ageDays <= 7)  return 'daily'
  if (ageDays <= 30) return 'weekly'
  return 'monthly'
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const today = new Date().toISOString().slice(0, 10)

  // ── Static pages ─────────────────────────────────────────────
  // lastModified reflects actual last meaningful content change, not today's date
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/${LOCALE}`,                lastModified: '2026-04-25', changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/${LOCALE}/echo`,           lastModified: '2026-04-25', changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/${LOCALE}/echo-b2b`,       lastModified: '2026-04-25', changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/${LOCALE}/flex`,           lastModified: '2026-04-25', changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/${LOCALE}/games`,          lastModified: today,        changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/${LOCALE}/blog-and-news`,  lastModified: today,        changeFrequency: 'daily',   priority: 0.7 },
    { url: `${BASE_URL}/${LOCALE}/about-jvl`,      lastModified: '2026-04-25', changeFrequency: 'monthly', priority: 0.6 },
    // partners page hidden — redirect to homepage, excluded from sitemap
    { url: `${BASE_URL}/${LOCALE}/contact-us`,     lastModified: '2026-04-25', changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/${LOCALE}/warranty`,       lastModified: '2026-04-25', changeFrequency: 'monthly', priority: 0.5 },
  ]

  // ── Blog articles ─────────────────────────────────────────────
  const articles = await getBlogArticles()
  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/${LOCALE}/blog-and-news/${a.slug}`,
    lastModified: a.lastmod || today,
    changeFrequency: articleChangeFreq(a.lastmod),
    priority: 0.7,
  }))

  // ── Game pages ────────────────────────────────────────────────
  const games = await getGameSlugs()
  const gamePages: MetadataRoute.Sitemap = games.map((g) => ({
    url: `${BASE_URL}/${LOCALE}/games/${g.slug}`,
    lastModified: g.lastmod || today,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // Pagination pages intentionally excluded — not canonical content

  return [
    ...staticPages,
    ...articlePages,
    ...gamePages,
  ]
}
