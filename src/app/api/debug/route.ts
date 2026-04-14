import { NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const db = getPool()

    const [gameThemes] = await db.execute('SELECT id, text, url, sort FROM game_themes ORDER BY sort ASC LIMIT 20')
    const [tags] = await db.execute("SELECT id, name, type FROM tags WHERE type = 'Game Themes' ORDER BY name ASC LIMIT 20")

    return NextResponse.json({ gameThemes, tags })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
