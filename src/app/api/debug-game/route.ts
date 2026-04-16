import { NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export const dynamic = 'force-dynamic'

// Usage: /api/debug-game?slug=MythicTiger
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug') ?? 'MythicTiger'

    const db = getPool()

    // 1. Find page + game
    const [pageRows] = await db.execute(
      `SELECT p.id AS page_id, p.slug, g.id AS game_id
       FROM pages p
       INNER JOIN games g ON g.page_id = p.id
       WHERE p.slug = ? LIMIT 1`,
      [slug]
    )
    const page = (pageRows as any[])[0]
    if (!page) return NextResponse.json({ error: 'Game not found', slug })

    // 2. Raw features rows
    const [featRows] = await db.execute(
      `SELECT id, game_id, text FROM features WHERE game_id = ?`,
      [page.game_id]
    )

    // 3. Taggables for first feature (if any)
    let taggables: any[] = []
    if ((featRows as any[]).length > 0) {
      const firstFeatId = (featRows as any[])[0].id
      const [tagRows] = await db.execute(
        `SELECT tbl.taggable_type, tbl.taggable_id, t.id AS tag_id, t.name, t.type
         FROM taggables tbl
         INNER JOIN tags t ON t.id = tbl.tag_id
         WHERE tbl.taggable_id = ? LIMIT 10`,
        [firstFeatId]
      )
      taggables = tagRows as any[]
    }

    // 4. Sample taggable_type values stored in DB
    const [typeRows] = await db.execute(
      `SELECT DISTINCT taggable_type FROM taggables LIMIT 20`
    )

    // 5. Media collections available for this game
    const [mediaRows] = await db.execute(
      `SELECT id, collection_name, file_name FROM media
       WHERE model_type = 'App\\\\Models\\\\Game' AND model_id = ?`,
      [page.game_id]
    )

    // 6. Game screen slider (uses model_type + model_id)
    const [screenSliderRows] = await db.execute(
      `SELECT id FROM game_screen_sliders WHERE model_type = 'App\\\\Models\\\\Page' AND model_id = ? LIMIT 1`,
      [page.page_id]
    )
    let screenSlides: any[] = []
    if ((screenSliderRows as any[]).length > 0) {
      const sliderId = (screenSliderRows as any[])[0].id
      const [slideRows] = await db.execute(
        `SELECT id, url FROM game_screen_slides WHERE game_screen_slider_id = ? ORDER BY sort ASC`,
        [sliderId]
      )
      screenSlides = slideRows as any[]
    }

    return NextResponse.json({
      slug,
      page_id: page.page_id,
      game_id: page.game_id,
      features_count: (featRows as any[]).length,
      features: featRows,
      taggables_for_first_feature: taggables,
      taggable_types_in_db: typeRows,
      media_collections: mediaRows,
      screen_slides_count: screenSlides.length,
      screen_slides: screenSlides,
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message, stack: e.stack }, { status: 500 })
  }
}
