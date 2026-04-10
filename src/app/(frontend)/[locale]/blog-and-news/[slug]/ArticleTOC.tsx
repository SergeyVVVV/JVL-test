'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

interface TOCItem {
  id: string
  text: string
  level: number
}

const HEADER_OFFSET = 100 // fixed header height + some buffer

export default function ArticleTOC({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string>('')
  const isScrollingRef = useRef(false)
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const getActiveId = useCallback(() => {
    if (!items.length) return ''
    const headings = items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    // Find the last heading whose top is at or above the offset line
    let active = headings[0]
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top <= HEADER_OFFSET + 10) {
        active = heading
      }
    }
    return active?.id ?? ''
  }, [items])

  useEffect(() => {
    if (!items.length) return

    // Set initial active heading on mount
    const init = () => setActiveId(getActiveId())
    // Small delay to let the page settle after render
    const timer = setTimeout(init, 100)

    const onScroll = () => {
      // Ignore scroll events fired during programmatic smooth scroll
      if (isScrollingRef.current) return
      setActiveId(getActiveId())
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [items, getActiveId])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return

    // Mark active immediately and suppress scroll listener during animation
    setActiveId(id)
    isScrollingRef.current = true
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)

    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET + 2
    window.scrollTo({ top, behavior: 'smooth' })

    // Re-enable scroll listener after smooth scroll finishes (~700ms typical)
    scrollTimerRef.current = setTimeout(() => {
      isScrollingRef.current = false
    }, 800)
  }

  if (!items.length) return null

  return (
    <aside style={{
      position: 'sticky',
      top: 88,
      maxHeight: 'calc(100vh - 108px)',
      overflowY: 'auto',
    }}>
      <div style={{
        border: '1px solid #D0CEC6',
        borderRadius: 8,
        padding: 24,
      }}>
        <p style={{
          fontSize: 16,
          fontWeight: 600,
          color: '#101213',
          margin: '0 0 16px',
        }}>
          Contents
        </p>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {items.map((item, i) => {
            const isActive = activeId === item.id
            return (
              <li key={item.id} style={{ margin: '2px 0' }}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 8,
                    padding: '7px 10px',
                    paddingLeft: item.level === 3 ? 22 : 10,
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#FB671F' : '#4B4B4B',
                    textDecoration: 'none',
                    borderRadius: 4,
                    background: isActive ? 'rgba(251,103,31,0.07)' : 'transparent',
                    lineHeight: 1.4,
                    transition: 'color 0.15s, background 0.15s',
                  }}
                >
                  <span style={{
                    fontSize: 12,
                    color: isActive ? '#FB671F' : '#B0AEA8',
                    flexShrink: 0,
                    width: 16,
                    fontVariantNumeric: 'tabular-nums',
                    paddingTop: 1,
                    transition: 'color 0.15s',
                  }}>
                    {i + 1}
                  </span>
                  {item.text}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
