import { NextRequest, NextResponse } from 'next/server'
import { createReadStream, statSync } from 'fs'
import { join } from 'path'

// Primary storage path (set via env)
const STORAGE_ROOT =
  process.env.LARAVEL_STORAGE_PATH ||
  '/var/www/vhosts/jvl.ca/httpdocs/storage/app/public'

// Fallback storage paths to check if file not found in primary
const FALLBACK_ROOTS = [
  '/var/www/vhosts/jvl.ca/httpdocs/storage/app/public',
  '/var/www/vhosts/jvl.ca/devsite-seo.jvl.ca/storage/app/public',
].filter((p) => p !== STORAGE_ROOT)

const MIME_TYPES: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  mp4: 'video/mp4',
  webm: 'video/webm',
  mov: 'video/quicktime',
  pdf: 'application/pdf',
  glb: 'model/gltf-binary',
  gltf: 'model/gltf+json',
}

function findFile(relativePath: string): string | null {
  // Try primary storage first
  const primary = join(STORAGE_ROOT, relativePath)
  if (primary.startsWith(STORAGE_ROOT)) {
    try { statSync(primary); return primary } catch {}
  }
  // Try fallback paths
  for (const root of FALLBACK_ROOTS) {
    const p = join(root, relativePath)
    if (p.startsWith(root)) {
      try { statSync(p); return p } catch {}
    }
  }
  return null
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const relativePath = path.join('/')

  const filePath = findFile(relativePath)
  if (!filePath) {
    return new NextResponse('Not found', { status: 404 })
  }

  let stats
  try {
    stats = statSync(filePath)
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }

  if (!stats.isFile()) {
    return new NextResponse('Not found', { status: 404 })
  }

  const ext = filePath.split('.').pop()?.toLowerCase() || ''
  const contentType = MIME_TYPES[ext] || 'application/octet-stream'
  const fileSize = stats.size

  // Range requests — required for video seeking in browsers
  const rangeHeader = request.headers.get('range')

  if (rangeHeader) {
    const [startStr, endStr] = rangeHeader.replace(/bytes=/, '').split('-')
    const start = parseInt(startStr, 10)
    const end = endStr ? parseInt(endStr, 10) : Math.min(start + 1024 * 1024 - 1, fileSize - 1)
    const chunkSize = end - start + 1

    const stream = createReadStream(filePath, { start, end })
    const readable = streamToWeb(stream)

    return new NextResponse(readable, {
      status: 206,
      headers: {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': String(chunkSize),
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    })
  }

  // Full file
  const stream = createReadStream(filePath)
  const readable = streamToWeb(stream)

  return new NextResponse(readable, {
    headers: {
      'Content-Type': contentType,
      'Content-Length': String(fileSize),
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}

function streamToWeb(nodeStream: ReturnType<typeof createReadStream>): ReadableStream {
  return new ReadableStream({
    start(controller) {
      nodeStream.on('data', (chunk) => controller.enqueue(chunk))
      nodeStream.on('end', () => controller.close())
      nodeStream.on('error', (err) => controller.error(err))
    },
    cancel() {
      nodeStream.destroy()
    },
  })
}
