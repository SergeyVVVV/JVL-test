import { NextRequest, NextResponse } from 'next/server'
import { getGamesList } from '@/lib/db'

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams
  const locale    = sp.get('locale')    || 'en'
  const page      = Math.max(1, parseInt(sp.get('page')    || '1'))
  const perPage   = Math.max(1, Math.min(100, parseInt(sp.get('perPage') || '24')))
  const themeId   = sp.get('theme')      ? parseInt(sp.get('theme')!)      : null
  const featuresId = sp.get('features') ? parseInt(sp.get('features')!)   : null
  const volatilityId = sp.get('volatility') ? parseInt(sp.get('volatility')!) : null
  const search    = sp.get('search')    || undefined

  const result = await getGamesList({ locale, page, perPage, themeId, featuresId, volatilityId, search })
  return NextResponse.json(result)
}
