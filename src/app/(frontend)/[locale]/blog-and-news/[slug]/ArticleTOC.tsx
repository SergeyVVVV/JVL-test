'use client'

import { useEffect, useState } from 'react'

interface TOCItem {
  id: string
  text: string
  level: number
}

export default function ArticleTOC({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (!items.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-20% 0% -60% 0%', threshold: 0 }
    )
    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [items])

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
          {items.map((item, i) => (
            <li key={item.id} style={{ margin: '2px 0' }}>
              <a
                href={`#${item.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 8,
                  padding: '7px 10px',
                  fontSize: 14,
                  fontWeight: activeId === item.id ? 600 : 400,
                  color: activeId === item.id ? '#FB671F' : '#4B4B4B',
                  textDecoration: 'none',
                  borderRadius: 4,
                  background: activeId === item.id ? 'rgba(251,103,31,0.07)' : 'transparent',
                  paddingLeft: item.level === 3 ? 22 : 10,
                  lineHeight: 1.4,
                  transition: 'color 0.15s, background 0.15s',
                }}
              >
                <span style={{
                  fontSize: 12,
                  color: '#B0AEA8',
                  flexShrink: 0,
                  width: 16,
                  fontVariantNumeric: 'tabular-nums',
                  paddingTop: 1,
                }}>
                  {i + 1}
                </span>
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
