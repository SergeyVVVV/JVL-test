/**
 * Per-article override for the SEO "last updated" date (BlogPosting `dateModified`).
 *
 * Behavior in src/app/(frontend)/[locale]/blog-and-news/[slug]/page.tsx:
 *   const lastUpdatedAt = articleUpdatedDates[slug] ?? article.publishedAt
 *
 * So:
 *  - If a slug is listed here, that date is emitted as `dateModified` (and `og:article:modified_time`).
 *  - If not listed, `dateModified` falls back to the article's `datePublished` (i.e. same as published).
 *
 * Date format: ISO 8601 calendar date — `YYYY-MM-DD`.
 *
 * Long-term: an AdminLTE field "Last update date" should be added to articles in the Laravel
 * backend (suggested column name: `last_updated_at` on the `news` / page rows). Once available,
 * db.ts can read it and pass it through `article.lastUpdatedAt`, and this override file can
 * be retired (or kept as an editorial-only fallback).
 */
export const articleUpdatedDates: Record<string, string> = {
  'what-is-an-arcade-machine': '2026-05-15',
}
