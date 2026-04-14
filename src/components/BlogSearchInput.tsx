'use client'

import { useRef, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface Props {
  defaultValue?: string
  typeParam?: string
}

export default function BlogSearchInput({ defaultValue = '', typeParam }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const q = e.target.value.trim()
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        const params = new URLSearchParams()
        if (typeParam) params.set('type', typeParam)
        if (q) params.set('q', q)
        const qs = params.toString()
        router.push(`${pathname}${qs ? `?${qs}` : ''}`)
      }, 350)
    },
    [router, pathname, typeParam]
  )

  return (
    <div className="bl-search">
      <svg
        className="bl-search-icon"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        placeholder="Search articles..."
        defaultValue={defaultValue}
        onChange={handleChange}
      />
    </div>
  )
}
