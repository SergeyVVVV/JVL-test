import { NextRequest, NextResponse } from 'next/server'
import { createReadStream, readFileSync, statSync } from 'fs'
import { join } from 'path'
import sharp from 'sharp'

const STORAGE_ROOT =
  process.env.LARAVEL_STORAGE_PATH ||
  '/var/www/vhosts/jvl.ca/httpdocs/storage/app/public'

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

// Formats Sharp can actually transform
const TRANSFORMABLE = new Set(['jpg', 'jpeg', 'png', 'webp'])

type OutputFormat = 'webp' | 'avif' | 'jpeg' | 'png'

function parseTransformParams(url: URL, ext: string):
  | { format: OutputFormat; width?: number; height?: number; quality: number }
  | null {
  const w = url.searchParams.get('w')
  const h = url.searchParams.get('h')
  const f = url.searchParams.get('f')?.toLowerCase()
  const q = url.searchParams.get('q')

  // No transform params at all → return original
  if (!w && !h && !f && !q) return null

  // Only images are transformable
  if (!TRANSFORMABLE.has(ext)) return null

  const validFormats: OutputFormat[] = ['webp', 'avif', 'jpeg', 'png']
  const format: OutputFormat = validFormats.includes(f as OutputFormat)
    ? (f as OutputFormat)
    : 'webp' // default to webp when any transform param is present

  const width = w ? Math.min(parseInt(w, 10) || 0, 3840) : undefined
  const height = h ? Math.min(parseInt(h, 10) || 0, 3840) : undefined
  const quality = q ? Math.min(Math.max(parseInt(q, 10) || 80, 1), 100) : 80

  return { format, width, height, quality }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const relativePath = path.join('/')
  const filePath = join(STORAGE_ROOT, relativePath)

  // Prevent path traversal
  if (!filePath.startsWith(STORAGE_ROOT)) {
    return new NextResponse('Forbidden', { status: 403 })
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

  // ─── Image transformation path ────────────────────────────────────────
  const url = new URL(request.url)
  const transform = parseTransformParams(url, ext)

  if (transform) {
    try {
      const buffer = readFileSync(filePath)
      let pipeline = sharp(buffer, { failOn: 'none' })

      if (transform.width || transform.height) {
        pipeline = pipeline.resize({
          width: transform.width,
          height: transform.height,
          fit: 'inside',
          withoutEnlargement: true,
        })
      }

      let outBuffer: Buffer
      let outType: string
      switch (transform.format) {
        case 'avif':
          outBuffer = await pipeline.avif({ quality: transform.quality }).toBuffer()
          outType = 'image/avif'
          break
        case 'jpeg':
          outBuffer = await pipeline.jpeg({ quality: transform.quality, mozjpeg: true }).toBuffer()
          outType = 'image/jpeg'
          break
        case 'png':
          outBuffer = await pipeline.png({ quality: transform.quality, compressionLevel: 9 }).toBuffer()
          outType = 'image/png'
          break
        case 'webp':
        default:
          outBuffer = await pipeline.webp({ quality: transform.quality }).toBuffer()
          outType = 'image/webp'
      }

      return new NextResponse(new Uint8Array(outBuffer), {
        headers: {
          'Content-Type': outType,
          'Content-Length': String(outBuffer.byteLength),
          'Cache-Control': 'public, max-age=31536000, immutable',
          'Vary': 'Accept',
        },
      })
    } catch (err) {
      console.error('[storage] Sharp transform failed, falling back to original:', err)
      // fall through to original serving
    }
  }

  // ─── Original file serving (videos, PDFs, or transform failed) ────────
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
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  }

  const stream = createReadStream(filePath)
  const readable = streamToWeb(stream)

  return new NextResponse(readable, {
    headers: {
      'Content-Type': contentType,
      'Content-Length': String(fileSize),
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=31536000, immutable',
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
