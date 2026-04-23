/**
 * Build a transformed image URL for our /api/storage/ proxy.
 *
 * The proxy accepts query params:
 *   w = width (max 3840)
 *   h = height (max 3840)
 *   f = format: 'webp' | 'avif' | 'jpeg' | 'png' (default 'webp' when any param given)
 *   q = quality 1-100 (default 80)
 *
 * Examples:
 *   imgSrc('/api/storage/3544/12.png', { w: 1920 })
 *     → '/api/storage/3544/12.png?w=1920'
 *   imgSrc('/api/storage/3477/005_720_01.jpg', { w: 900, q: 75 })
 *     → '/api/storage/3477/005_720_01.jpg?w=900&q=75'
 *
 * Safe for:
 * - null/undefined inputs (returns as-is)
 * - non-storage URLs (returns unchanged)
 * - SVG files (proxy will pass through if ext is .svg)
 */
export function imgSrc(
  url: string | null | undefined,
  opts: { w?: number; h?: number; f?: 'webp' | 'avif' | 'jpeg' | 'png'; q?: number } = {}
): string {
  if (!url) return ''
  // Only transform our own storage proxy URLs
  if (!url.startsWith('/api/storage/')) return url
  // Skip SVG / video / other non-image files
  const lower = url.toLowerCase().split('?')[0]
  if (lower.endsWith('.svg') || lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.pdf') || lower.endsWith('.glb')) {
    return url
  }

  const params = new URLSearchParams()
  if (opts.w) params.set('w', String(opts.w))
  if (opts.h) params.set('h', String(opts.h))
  if (opts.f) params.set('f', opts.f)
  if (opts.q) params.set('q', String(opts.q))

  const query = params.toString()
  if (!query) return url

  const sep = url.includes('?') ? '&' : '?'
  return `${url}${sep}${query}`
}
