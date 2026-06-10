import { NextRequest, NextResponse } from 'next/server'

/**
 * Locale redirect middleware.
 *
 * The app router serves pages under `[locale]` (e.g. /en/contact-us). Without
 * this guard, any single-segment path such as `/contact-us` is interpreted as
 * `[locale] = "contact-us"` and renders the locale homepage instead of the real
 * page — producing duplicate-content URLs and broken internal links.
 *
 * Here we ensure every public path carries a valid locale prefix. Paths that
 * already start with a known locale pass through untouched (es/pt_br are then
 * folded into /en by the redirects() rules in next.config.ts). Everything else,
 * including the bare root `/`, is permanently redirected under `/en`.
 *
 * Static/system paths (api, admin, _next, image-transform) and any path with a
 * file extension (robots.txt, sitemap.xml, llms.txt, *.png, …) are excluded via
 * the matcher below and never reach this function.
 */

// First-segment values that already represent a locale and must NOT be
// re-prefixed. es/pt_br are valid inbound URLs handled by next.config redirects.
const LOCALE_SEGMENTS = new Set(['en', 'es', 'pt_br'])

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const firstSegment = pathname.split('/')[1] // '' for the bare root "/"

  if (LOCALE_SEGMENTS.has(firstSegment)) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = pathname === '/' ? '/en' : `/en${pathname}`
  return NextResponse.redirect(url, 308)
}

export const config = {
  // Run on everything except API/admin/internal routes and any file-like path
  // (those containing a dot, e.g. robots.txt, sitemap.xml, llms.txt, favicon.ico).
  matcher: ['/((?!api|admin|_next|image-transform|.*\\..*).*)'],
}
