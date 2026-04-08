import { NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const db = getPool()
    
    const [blocks] = await db.execute('SELECT id, type FROM landing_blocks WHERE active = 1 LIMIT 5')
    const [media] = await db.execute(
      'SELECT id, model_type, model_id, collection_name, file_name FROM media WHERE model_type = ? AND model_id = ? LIMIT 5',
      ['App\\Models\\TopLandingBlock', 1]
    )
    
    return NextResponse.json({ blocks, media, env: {
      db: process.env.LARAVEL_DB_DATABASE,
      storage: process.env.LARAVEL_STORAGE_PATH,
    }})
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
