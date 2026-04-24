'use client'

/**
 * Global analytics event dispatcher.
 *
 * Mirrors the Laravel /public/js/script.js behavior:
 *
 * - Any element with `data-ga-event="event_name"` fires that event on click
 *   (e.g. <a data-ga-event="echo_hero_buy" href="https://amazon.com/...">)
 *
 * - Any element with `data-ga-block-view="event_name"` fires that event
 *   when scrolled into view once (IntersectionObserver, 30% threshold)
 *
 * This component mounts once in layout.tsx and listens to the whole document,
 * so components don't need to import anything — they just add data attributes.
 */

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

export default function AnalyticsEvents() {
  useEffect(() => {
    // ─── Click events via data-ga-event ──────────────────────────────
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      if (!target) return
      const el = target.closest<HTMLElement>('[data-ga-event]')
      if (!el) return

      const eventName = el.dataset.gaEvent
      if (!eventName) return

      // Collect any data-ga-param-* attributes as event params
      const params: Record<string, string> = {}
      for (const [key, val] of Object.entries(el.dataset)) {
        if (key.startsWith('gaParam') && val !== undefined) {
          // gaParamButtonLocation → button_location
          const paramKey = key
            .replace(/^gaParam/, '')
            .replace(/([A-Z])/g, '_$1')
            .toLowerCase()
            .replace(/^_/, '')
          params[paramKey] = val
        }
      }

      trackEvent(eventName, params)
    }

    document.addEventListener('click', onClick, { capture: true })

    // ─── Scroll-into-view events via data-ga-block-view ──────────────
    // Matches the GTM-MXFJV2DZ built-in block-view tag: fires as
    //   { event: 'block_view', block_name: <attribute value> }
    // on 50% visibility, once per element per page.
    const seen = new WeakSet<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          if (entry.intersectionRatio < 0.5) continue
          if (seen.has(entry.target)) continue
          seen.add(entry.target)

          const el = entry.target as HTMLElement
          const blockName = el.dataset.gaBlockView
          if (blockName) trackEvent('block_view', { block_name: blockName })
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.5 }
    )

    // Observe existing + any that mount later (MutationObserver for SPA)
    function observeAll() {
      document.querySelectorAll<HTMLElement>('[data-ga-block-view]').forEach((el) => {
        if (!seen.has(el)) observer.observe(el)
      })
    }
    observeAll()

    const mo = new MutationObserver(() => observeAll())
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('click', onClick, { capture: true })
      observer.disconnect()
      mo.disconnect()
    }
  }, [])

  return null
}
