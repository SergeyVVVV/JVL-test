/**
 * LEGACY override for the SEO "last updated" date (BlogPosting `dateModified`).
 *
 * As of [PR adding last_updated_at from DB], the canonical source is the
 * `news.last_updated_at` column managed via AdminLTE → article → Settings →
 * "Last update date". The article page reads it as `article.lastUpdatedAt`.
 *
 * This file remains as a SECOND-PRIORITY fallback during the transition period
 * until every applicable article has its `last_updated_at` set in AdminLTE.
 *
 * Source priority in src/app/(frontend)/[locale]/blog-and-news/[slug]/page.tsx:
 *   article.lastUpdatedAt (DB)  ??  articleUpdatedDates[slug] (this file)  ??  article.publishedAt
 *
 * When this file is empty, it can be deleted along with its imports.
 *
 * Date format: ISO 8601 calendar date — `YYYY-MM-DD`.
 */
export const articleUpdatedDates: Record<string, string> = {
  'what-is-an-arcade-machine': '2026-05-15',
}
