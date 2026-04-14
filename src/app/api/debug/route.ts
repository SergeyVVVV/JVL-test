import { NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const db = getPool()

    const [dbName] = await db.execute('SELECT DATABASE() as db')

    return NextResponse.json({ db: (dbName as any[])[0]?.db, env_db: process.env.LARAVEL_DB_DATABASE })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
