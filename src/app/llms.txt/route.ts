/**
 * llms.txt — concise navigation index for AI/LLM agents
 *
 * Format spec: https://llmstxt.org/
 *
 * This short version lists key pages with one-line descriptions.
 * AI agents follow the links to get full page content.
 * For AI without web access, see /llms-full.txt
 */

const BASE_URL = 'https://www.jvl.ca'

const CONTENT = `# JVL

> JVL is a family-owned Canadian manufacturer of coin-operated amusement machines, land-based casino cabinets, and online slot games. Founded in 1984, headquartered in Ontario, Canada. Flagship product: ECHO HD3 — a premium 22" touchscreen tabletop arcade machine with 149 built-in games, available in Home (consumer) and Amusement (commercial) versions.

## Products

- [ECHO HD3 — Home Arcade](${BASE_URL}/en/echo): Premium 22" touchscreen countertop arcade machine with 149 built-in games. No internet required. Plug-and-play. Sold on Amazon.
- [ECHO Amusement — Commercial](${BASE_URL}/en/echo-b2b): Free Play and coin-operated version of ECHO HD3, engineered for bars, lounges, game rooms, and amusement venues. Includes bill validator, secure bank, customizable ads.
- [FLEX — Casino Cabinets](${BASE_URL}/en/flex): Land-based casino cabinets for licensed gaming operators. 40+ years of proven performance and quality.
- [Online Games](${BASE_URL}/en/games): Growing library of slot titles for both land-based cabinets and web platforms.

## Company

- [About JVL](${BASE_URL}/en/about-jvl): 40+ years of gaming industry experience. Family-owned, Ontario-based.
- [B2B Partners](${BASE_URL}/en/partners): Volume discounts, dedicated account managers, fast maintenance for commercial operators.
- [Contact](${BASE_URL}/en/contact-us): Get in touch with sales and support.
- [Warranty](${BASE_URL}/en/warranty): Warranty information and registration.

## Resources

- [News & Blog](${BASE_URL}/en/blog-and-news): Latest product announcements, industry news, case studies.
- [Privacy Policy](${BASE_URL}/en/privacy-policy)
- [Terms of Use](${BASE_URL}/en/terms-of-use)

## Optional

- [llms-full.txt](${BASE_URL}/llms-full.txt): Complete product specs, FAQs, and company reference in a single markdown file for AI agents without web access.
- [Sitemap](${BASE_URL}/sitemap.xml): Machine-readable list of all pages.
`

export async function GET() {
  return new Response(CONTENT, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
