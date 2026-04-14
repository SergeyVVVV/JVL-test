import { NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const db = getPool()

    const b2bTypes = [
      'top_echo2b2_block',
      'superiority_echo2b2_block',
      'support_echo2b2_block',
      'screens_echo2b2_block',
      'engineered_echo_b2b_block',
      'support_bottom_echo_b2b_landing_block',
    ]

    const [blocks] = await db.execute(
      `SELECT id, type, title, tag_label, text, button_text, button_url FROM landing_blocks WHERE type IN (${b2bTypes.map(() => '?').join(',')})`,
      b2bTypes
    )

    const blockIds = (blocks as any[]).map(b => b.id)
    let inlineEntities: any[] = []
    let media: any[] = []
    if (blockIds.length > 0) {
      const [entities] = await db.execute(
        `SELECT id, landing_block_id, type, title, text, icon_class, sort FROM landing_inline_entities WHERE landing_block_id IN (${blockIds.map(() => '?').join(',')}) ORDER BY landing_block_id, sort`,
        blockIds
      )
      inlineEntities = entities as any[]

      const inlineIds = (inlineEntities as any[]).map(e => e.id)
      const allIds = [...blockIds, ...inlineIds]
      const [mediaRows] = await db.execute(
        `SELECT model_type, model_id, collection_name, file_name, disk, CONCAT(model_type, '|', model_id, '|', collection_name) as key_id FROM media WHERE model_id IN (${allIds.map(() => '?').join(',')}) ORDER BY model_type, model_id, sort_order`,
        allIds
      )
      media = mediaRows as any[]
    }

    return NextResponse.json({ blocks, inlineEntities, media })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
