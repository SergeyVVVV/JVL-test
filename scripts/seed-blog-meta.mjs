#!/usr/bin/env node
/**
 * Seed meta titles + descriptions for blog articles that are missing them.
 *
 * Usage (on server):
 *   cd /var/www/vhosts/jvl.ca/devsite-vibe.jvl.ca
 *   node scripts/seed-blog-meta.mjs
 */

import { readFileSync } from 'fs'
import { createPool } from 'mysql2/promise'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// ── Env ──────────────────────────────────────────────────────────────────────
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const envFile = resolve(root, '.env.local')
const env = Object.fromEntries(
  readFileSync(envFile, 'utf8')
    .split('\n')
    .filter(l => l.includes('=') && !l.startsWith('#'))
    .map(l => {
      const i = l.indexOf('=')
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^['"]|['"]$/g, '')]
    })
)

const pool = createPool({
  host:     env.LARAVEL_DB_HOST     || 'localhost',
  port:     Number(env.LARAVEL_DB_PORT || 3306),
  database: env.LARAVEL_DB_DATABASE || 'jvl_dev',
  user:     env.LARAVEL_DB_USERNAME || 'jvl',
  password: env.LARAVEL_DB_PASSWORD || '',
})

const MODEL_TYPE = 'App\\Models\\Page'

// ── Data ─────────────────────────────────────────────────────────────────────
// [slug, meta_title (≤55 chars), meta_description (≤150 chars)]
// title = null → skip (keep existing or leave empty)
const ARTICLES = [
  [
    'are-arcade-games-good-for-your-brain',
    'Are Arcade Games Good for Your Brain? — JVL',
    'Arcade games boost hand-eye coordination, reaction time, and spatial reasoning. See which game types offer the best proven cognitive benefits.',
  ],
  [
    'are-arcades-basically-gambling',
    'Are Arcades Basically Gambling? — JVL',
    'Arcades are skill-based entertainment, not gambling. Learn the key legal and practical differences and why classic arcade games are legitimate fun.',
  ],
  [
    'are-arcades-dying-out',
    'Are Arcades Dying Out? — JVL',
    'Traditional arcades have declined, but the industry is evolving. Discover how barcades, home machines, and premium venues are reshaping arcades.',
  ],
  [
    'are-arcades-expensive-to-run',
    'Are Arcades Expensive to Run? — JVL',
    'A commercial arcade costs $10,000–$50,000/month to run. Explore the key expenses, revenue benchmarks, and why a home arcade machine is a smarter buy.',
  ],
  [
    'are-home-arcade-machines-worth-getting',
    'Are Home Arcade Machines Worth Getting? — JVL',
    'Home arcade machines deliver years of entertainment with no subscriptions. See what makes a quality unit worth the investment for your home.',
  ],
  [
    'can-i-add-games-to-an-arcade-machine',
    'Can I Add Games to an Arcade Machine? — JVL',
    'Whether you can add games depends on machine type. Vintage cabinets are fixed; modern systems vary. Here\'s what to know before you buy.',
  ],
  [
    'can-i-put-modern-games-on-an-arcade-cabinet',
    'Can I Put Modern Games on an Arcade Cabinet? — JVL',
    'Modern games run on DIY builds, but commercial machines use locked systems for licensing compliance. Here\'s what\'s possible and what to consider.',
  ],
  [
    'do-arcade-machines-use-a-lot-of-electricity',
    'Do Arcade Machines Use a Lot of Electricity? — JVL',
    'Modern arcade machines use just 50–150 watts — similar to a laptop — costing $5–$15/month. Here\'s a breakdown of what drives power consumption.',
  ],
  [
    'how-does-an-arcade-get-the-games-for-its-machines',
    'How Arcades Get Their Games — JVL',                   // custom: default is 56 chars
    'Arcades get games through direct purchases, leasing, or revenue-share deals. Learn how each model works and what fits different venue types.',
  ],
  [
    'how-much-can-an-arcade-make-a-day',
    'How Much Can an Arcade Make a Day? — JVL',
    'A single arcade machine earns $50–$300/day depending on location and game type. See how venue type, placement, and machine selection impact revenue.',
  ],
  [
    'how-much-did-arcade-machines-cost',
    'How Much Did Arcade Machines Cost? — JVL',
    'Classic arcade machines from the 1980s–90s cost $2,000–$5,000 new. See how golden-era pricing compares to today\'s home arcade machines.',
  ],
  [
    'is-buying-vintage-arcade-video-game-machines-a-good-investment',
    'Are Vintage Arcade Machines a Good Buy? — JVL',       // custom: default is 70 chars
    'Rare vintage arcade cabinets can appreciate 3–7% yearly, but most are risky. Here\'s when buying vintage makes financial sense — and when it doesn\'t.',
  ],
  [
    'touchscreen-vs-button-controls-which-arcade-style-is-right-for-you',
    'Touchscreen vs. Button Controls — JVL',               // custom: default is 76 chars
    'Touchscreen or button controls? The best arcade style depends on your audience. Here\'s a practical comparison to help you decide what fits best.',
  ],
  [
    'why-did-arcades-fail',
    'Why Did Arcades Fail? — JVL',
    'Arcades declined when home consoles eliminated their technical edge. Discover why the golden-era business model failed and which concepts survived.',
  ],
  [
    'is-the-arcade-worth-it-in-2026',
    'Is the Arcade Worth It in 2026? — JVL',
    'Arcades in 2026 are great for social occasions, but home machines often offer better long-term value. Compare the real costs to find the right choice.',
  ],
  [
    'why-do-they-call-it-an-arcade',
    'Why Do They Call It an Arcade? — JVL',
    'The word "arcade" comes from covered 19th-century commercial walkways. Learn how this architectural term became synonymous with gaming culture.',
  ],
  [
    'what-age-is-appropriate-for-arcades',
    'What Age Is Appropriate for Arcades? — JVL',
    'Arcades suit ages 5 and up depending on venue type and game selection. From family entertainment centers to adult barcades, here\'s what to expect.',
  ],
  [
    'what-are-the-10-most-popular-arcade-games',
    'What Are the 10 Most Popular Arcade Games? — JVL',
    'From Pac-Man to Street Fighter II, these 10 titles shaped a generation. Discover the iconic games that defined the arcade golden era.',
  ],
  [
    'what-do-you-need-to-run-an-arcade',
    'What Do You Need to Run an Arcade? — JVL',
    'Running an arcade requires space, 15–30 machines, licensing, staffing, and solid cash reserves. Here\'s a complete breakdown of what\'s involved.',
  ],
  [
    'why-do-people-buy-arcade-machines',
    'Why Do People Buy Arcade Machines? — JVL',
    'Adults buy arcade machines for nostalgia and family entertainment. See why premium home arcades are becoming a sought-after investment.',
  ],
  [
    'how-to-start-a-game-room-business',
    'How to Start a Game Room Business? — JVL',
    'Starting a game room requires $75,000–$250,000, the right location, permits, and planning. Here\'s a practical step-by-step guide to get started.',
  ],
  [
    'is-the-arcade-industry-growing',
    'Is the Arcade Industry Growing? — JVL',
    'Traditional arcades are contracting, but barcades and home arcade sales are booming. Here\'s where real growth is happening in a $3.8B global market.',
  ],
  [
    'what-do-you-need-to-start-an-arcade-business',
    'How to Start an Arcade Business — JVL',
    'Starting an arcade business requires $50,000–$200,000, a high-traffic location, 15–30 machines, and licensing. Here\'s everything you need to know.',
  ],
  [
    'what-is-the-most-profitable-arcade-game',
    'What Is the Most Profitable Arcade Game? — JVL',
    'Redemption and skill games earn $300–$600/month — far ahead of classic video games. Discover the most profitable arcade game types for your venue.',
  ],
  [
    'how-much-money-can-your-arcade-make',
    'How Much Money Can Your Arcade Make? — JVL',
    'A well-run arcade earns $50,000–$300,000 annually with 10–25% net margins. See what drives revenue and what to realistically expect.',
  ],
  [
    'is-it-cheaper-to-build-or-buy-an-arcade-machine',
    'Is It Cheaper to Build or Buy an Arcade Machine? — JVL',
    'DIY arcade builds cost $300–$800 in parts, but pre-built machines offer better quality and warranty coverage. Here\'s which route is right for you.',
  ],
  [
    'is-arcade-good-passive-income',
    'Is Arcade Good Passive Income? — JVL',
    'Arcades require active management and daily oversight — not passive income. Here\'s the honest reality of arcade ownership before you invest.',
  ],
  [
    'is-owning-an-arcade-worth-it',
    'Is Owning an Arcade Worth It? — JVL',
    'Owning an arcade can yield 15–25% annual returns, but takes $50,000–$150,000 upfront and up to 36 months to reach profitability.',
  ],
  [
    'is-an-arcade-business-profitable',
    'Is an Arcade Business Profitable? — JVL',
    'Arcade businesses can earn 15–30% margins and up to $300,000 annually when managed well. Learn the key factors that determine whether yours succeeds.',
  ],
]

// ── Run ───────────────────────────────────────────────────────────────────────
async function run() {
  const conn = await pool.getConnection()
  let inserted = 0, updated = 0, skipped = 0

  try {
    for (const [slug, title, description] of ARTICLES) {
      // Verify lengths
      if (title && title.length > 55) console.warn(`  ⚠ title too long (${title.length}): ${slug}`)
      if (description.length > 150)   console.warn(`  ⚠ desc  too long (${description.length}): ${slug}`)

      const [pages] = await conn.execute('SELECT id FROM pages WHERE slug = ? LIMIT 1', [slug])
      if (!pages.length) { console.warn(`  ✗ page not found: ${slug}`); skipped++; continue }
      const pageId = pages[0].id

      const [existing] = await conn.execute(
        'SELECT id FROM metas WHERE model_type = ? AND model_id = ? LIMIT 1',
        [MODEL_TYPE, pageId]
      )

      if (existing.length) {
        await conn.execute(
          'UPDATE metas SET title = ?, description = ? WHERE model_type = ? AND model_id = ?',
          [title, description, MODEL_TYPE, pageId]
        )
        console.log(`  ✓ updated  ${slug}`)
        updated++
      } else {
        await conn.execute(
          'INSERT INTO metas (model_type, model_id, title, description) VALUES (?, ?, ?, ?)',
          [MODEL_TYPE, pageId, title, description]
        )
        console.log(`  + inserted ${slug}`)
        inserted++
      }
    }
  } finally {
    conn.release()
    await pool.end()
  }

  console.log(`\nDone: ${inserted} inserted, ${updated} updated, ${skipped} skipped`)
}

run().catch(err => { console.error(err); process.exit(1) })
