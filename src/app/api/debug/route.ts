import { NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const db = getPool()

    const [allTags] = await db.execute('SELECT id, name, type, slug FROM tags ORDER BY type, name ASC LIMIT 50')
    const [tables] = await db.execute("SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME LIKE '%theme%' ORDER BY TABLE_NAME")

    return NextResponse.json({ allTags, tables })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
