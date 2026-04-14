import { NextResponse } from 'next/server'
import { getSlides } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const slides = await getSlides(1)
    return NextResponse.json({ slides })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
