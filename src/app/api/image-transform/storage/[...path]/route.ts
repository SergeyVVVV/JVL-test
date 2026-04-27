import { NextRequest, NextResponse } from 'next/server'

/**
 * Compatibility shim for legacy Laravel image-transform URLs.
 *
 * Old format:  /image-transform/storage/width=1280,format=webp,quality=80/3757/file.png
 * New format:  /api/storage/3757/file.png?w=1280&f=webp&q=80
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params

  // path[0] may be transform params like "width=1280,format=webp,quality=80"
  // or directly the numeric media ID if no transform params present
  let transformStr = ''
  let fileParts: string[]

  if (path[0] && /^(width|height|format|quality)=/.test(path[0])) {
    transformStr = path[0]
    fileParts = path.slice(1)
  } else {
    fileParts = path
  }

  if (!fileParts.length) {
    return new NextResponse('Not found', { status: 404 })
  }

  // Parse transform params: width=1280,format=webp,quality=80
  const searchParams = new URLSearchParams()
  for (const part of transformStr.split(',')) {
    const [key, val] = part.split('=')
    if (!key || !val) continue
    if (key === 'width')   searchParams.set('w', val)
    if (key === 'height')  searchParams.set('h', val)
    if (key === 'format')  searchParams.set('f', val)
    if (key === 'quality') searchParams.set('q', val)
  }

  const filePath = fileParts.join('/')
  const qs = searchParams.toString()
  const newUrl = new URL(
    `/api/storage/${filePath}${qs ? `?${qs}` : ''}`,
    request.url
  )

  return NextResponse.redirect(newUrl, { status: 301 })
}
