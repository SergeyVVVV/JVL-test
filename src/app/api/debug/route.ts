import { NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const db = getPool()
    const [rows] = await db.execute(
      "SELECT id, model_type, model_id, collection_name, file_name FROM media WHERE file_name LIKE '%about%' LIMIT 20"
    )
    return NextResponse.json({ rows })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
