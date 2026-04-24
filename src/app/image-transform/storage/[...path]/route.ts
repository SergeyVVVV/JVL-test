/**
 * Legacy Laravel image-transform URL compatibility layer.
 *
 * Laravel used:  /image-transform/storage/width=800,format=webp,quality=80/3791/file.png
 * Next.js uses:  /api/storage/3791/file.png?w=800&f=webp&q=80
 *
 * This route parses the old format and redirects to the new one (301).
 */

import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params

  // path[0] may be the transform params string (e.g. "width=800,format=webp,quality=80")
  // or it could go straight to folder/file if no params
  // Detect: if path[0] contains "=" it's the params segment
  let transformSegment = ''
  let fileParts: string[]

  if (path[0]?.includes('=')) {
    transformSegment = path[0]
    fileParts = path.slice(1)
  } else {
    fileParts = path
  }

  // Parse comma-separated params: width=800,format=webp,quality=80
  const searchParams = new URLSearchParams()
  if (transformSegment) {
    for (const pair of transformSegment.split(',')) {
      const [key, val] = pair.split('=')
      if (!key || !val) continue
      if (key === 'width')   searchParams.set('w', val)
      if (key === 'height')  searchParams.set('h', val)
      if (key === 'format')  searchParams.set('f', val)
      if (key === 'quality') searchParams.set('q', val)
    }
  }

  const storagePath = fileParts.join('/')
  const qs = searchParams.toString()
  const newUrl = `/api/storage/${storagePath}${qs ? `?${qs}` : ''}`

  return NextResponse.redirect(new URL(newUrl, req.url), 301)
}
