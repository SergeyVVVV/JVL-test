/**
 * robots.txt — crawler directives + AI/LLM resource hints
 *
 * Replaces the typed robots.ts so we can include non-standard comment
 * lines that point AI agents at /llms.txt and /llms-full.txt.
 */

const CONTENT = `User-agent: *
Allow: /
Disallow: /en/echo-1
Disallow: /en/echo-2
Disallow: /en/echo-3
Disallow: /en/echo-4
Disallow: /en/echo-5

Sitemap: https://www.jvl.ca/sitemap.xml

# AI/LLM-friendly resources (llmstxt.org standard)
# Short index:       https://www.jvl.ca/llms.txt
# Full reference:    https://www.jvl.ca/llms-full.txt
`

export async function GET() {
  return new Response(CONTENT, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
