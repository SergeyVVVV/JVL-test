import { NextResponse } from 'next/server'
import { getGameThemes } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const themes = await getGameThemes()
    return NextResponse.json({ themes })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
