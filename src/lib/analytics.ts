/**
 * Analytics helpers — mirror the Laravel jvl.ca tracking conventions
 * so the GTM-MXFJV2DZ container's existing triggers continue to work.
 *
 * Two categories of events:
 *
 * 1. `echo_*` — product-specific events tied to buttons/scroll/video
 *    on the ECHO pages. In Laravel these are wired via `data-ga-event`
 *    HTML attributes and a global click listener. We replicate both.
 *
 * 2. `wg_*` — cross-site events (e.g. `wg_go_to_amazon`, `wg_file_download`,
 *    `wg_form_submit`, `wg_interested_user`). In Laravel these are NOT
 *    in the code — they are defined inside the GTM container as triggers
 *    on link clicks / form submissions / scroll depth. When the GTM
 *    container loads on our Next.js site, those triggers fire automatically
 *    against our DOM. No Next.js code required for them to work — we just
 *    need the links/forms to match the container's selectors.
 */

export type AnalyticsParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Push an event to GTM's dataLayer. GTM picks it up and forwards it to
 * GA4, Meta Pixel, Twitter, or whichever tags are configured to listen.
 */
export function trackEvent(eventName: string, params: AnalyticsParams = {}): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: eventName,
    ...params,
  })
}
