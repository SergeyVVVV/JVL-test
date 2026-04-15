'use client'

import { useState, useCallback, useRef, useEffect, KeyboardEvent } from 'react'
import type { GameListItem, FilterTag } from '@/lib/db'

interface Props {
  initialItems: GameListItem[]
  initialTotal: number
  themes: FilterTag[]
  features: FilterTag[]
  volatility: FilterTag[]
  locale?: string
  perPage?: number
}

interface DropdownProps {
  label: string
  options: FilterTag[]
  value: number | null
  onChange: (id: number | null) => void
  allLabel: string
}

function FilterDropdown({ label, options, value, onChange, allLabel }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [])

  const selected = value ? options.find(o => o.id === value) : null
  const displayLabel = selected?.name ?? allLabel

  return (
    <div ref={ref} className="gg-filter-wrap" style={{ position: 'relative', minWidth: 160 }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="gg-filter-btn"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
          width: '100%', padding: '10px 14px',
          background: '#181a1b', border: '1px solid #2a2c2e', borderRadius: 4,
          color: selected ? '#F4F3EC' : 'rgba(244,243,236,0.5)',
          fontSize: 14, fontFamily: 'inherit', cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{displayLabel}</span>
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }}>
          <path d="M2 4.5L6 8.5L10 4.5" stroke="rgba(244,243,236,0.5)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 200,
          background: '#222527', border: '1px solid #2a2c2e', borderRadius: 4, overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        }}>
          {/* "All" option */}
          <button
            type="button"
            onClick={() => { onChange(null); setOpen(false) }}
            className="gg-dd-item"
            style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '10px 14px', fontSize: 14, fontFamily: 'inherit',
              color: !value ? '#059FFF' : 'rgba(244,243,236,0.6)',
              background: 'transparent', border: 'none', cursor: 'pointer',
            }}
          >
            {allLabel}
          </button>
          {options.map(opt => (
            <button
              key={opt.id}
              type="button"
              onClick={() => { onChange(opt.id); setOpen(false) }}
              className="gg-dd-item"
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '10px 14px', fontSize: 14, fontFamily: 'inherit',
                color: value === opt.id ? '#059FFF' : '#F4F3EC',
                background: 'transparent', border: 'none', cursor: 'pointer',
              }}
            >
              {opt.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function GamesGrid({
  initialItems,
  initialTotal,
  themes,
  features,
  volatility,
  locale = 'en',
  perPage = 24,
}: Props) {
  const [items, setItems]         = useState(initialItems)
  const [total, setTotal]         = useState(initialTotal)
  const [page, setPage]           = useState(1)
  const [themeId, setThemeId]     = useState<number | null>(null)
  const [featuresId, setFeatId]   = useState<number | null>(null)
  const [volId, setVolId]         = useState<number | null>(null)
  const [search, setSearch]       = useState('')
  const [searchInput, setInput]   = useState('')
  const [loading, setLoading]     = useState(false)
  const gridRef                   = useRef<HTMLDivElement>(null)

  const totalPages = Math.ceil(total / perPage)

  const fetchGames = useCallback(async (opts: {
    page?: number
    themeId?: number | null
    featuresId?: number | null
    volId?: number | null
    search?: string
  }) => {
    setLoading(true)
    try {
      const p = new URLSearchParams({ locale, perPage: String(perPage), page: String(opts.page ?? 1) })
      if (opts.themeId)   p.set('theme',      String(opts.themeId))
      if (opts.featuresId) p.set('features',  String(opts.featuresId))
      if (opts.volId)     p.set('volatility', String(opts.volId))
      if (opts.search)    p.set('search',     opts.search)
      const res  = await fetch(`/api/games?${p}`)
      const data = await res.json()
      setItems(data.items)
      setTotal(data.total)
    } catch {
      // keep current
    } finally {
      setLoading(false)
    }
  }, [locale, perPage])

  function applyFilter(newTheme: number | null, newFeat: number | null, newVol: number | null, newSearch: string) {
    setPage(1)
    fetchGames({ page: 1, themeId: newTheme, featuresId: newFeat, volId: newVol, search: newSearch || undefined })
  }

  function handleTheme(v: number | null)  { setThemeId(v); applyFilter(v, featuresId, volId, search) }
  function handleFeat(v: number | null)   { setFeatId(v);  applyFilter(themeId, v, volId, search) }
  function handleVol(v: number | null)    { setVolId(v);   applyFilter(themeId, featuresId, v, search) }

  function handleSearchSubmit() {
    setSearch(searchInput)
    setPage(1)
    fetchGames({ page: 1, themeId, featuresId, volId, search: searchInput || undefined })
  }

  function handleSearchKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSearchSubmit()
  }

  function goToPage(p: number) {
    if (p === page || p < 1 || p > totalPages) return
    setPage(p)
    fetchGames({ page: p, themeId, featuresId, volId, search: search || undefined })
    // Scroll to grid top
    if (gridRef.current) {
      const y = gridRef.current.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  // Pagination page numbers with ellipsis
  function pageNumbers(): (number | '…')[] {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const pages: (number | '…')[] = [1]
    if (page > 3) pages.push('…')
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i)
    if (page < totalPages - 2) pages.push('…')
    pages.push(totalPages)
    return pages
  }

  return (
    <div>
      {/* ── Filters row ── */}
      <div className="gg-filters-row" style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
        <FilterDropdown label="Themes"     options={themes}     value={themeId}   onChange={handleTheme} allLabel="All Themes" />
        <FilterDropdown label="Features"   options={features}   value={featuresId} onChange={handleFeat}  allLabel="All Features" />
        <FilterDropdown label="Volatility" options={volatility} value={volId}     onChange={handleVol}  allLabel="All Volatility" />

        {/* Search */}
        <div className="gg-search-wrap" style={{ flex: 1, minWidth: 200, position: 'relative' }}>
          <input
            type="text"
            placeholder="Find a game"
            value={searchInput}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleSearchKey}
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '10px 42px 10px 14px',
              background: '#181a1b', border: '1px solid #2a2c2e', borderRadius: 4,
              color: '#F4F3EC', fontSize: 14, fontFamily: 'inherit', outline: 'none',
            }}
          />
          <button
            type="button"
            onClick={handleSearchSubmit}
            style={{
              position: 'absolute', right: 0, top: 0, bottom: 0,
              width: 42, background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(244,243,236,0.45)',
            }}
            aria-label="Search"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── Grid ── */}
      <div ref={gridRef} style={{ opacity: loading ? 0.45 : 1, transition: 'opacity 0.25s' }}>
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(244,243,236,0.45)', fontSize: 16 }}>
            Sorry, nothing was found for your request.
          </div>
        ) : (
          <div className="gg-grid">
            {items.map(game => (
              <a
                key={game.id}
                href={`/${locale}/games/${game.slug}`}
                className="gg-card"
                style={{ display: 'block', textDecoration: 'none' }}
              >
                <div className="gg-card-img" style={{
                  position: 'relative',
                  background: '#101213',
                  borderRadius: 4, overflow: 'hidden',
                  aspectRatio: '2/3',
                }}>
                  {game.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={game.image}
                      alt={game.title ?? ''}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <div style={{ position: 'absolute', inset: 0, background: '#181a1b' }} />
                  )}
                  {/* Bottom overlay with title */}
                  <div className="gg-card-overlay" style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '60px 14px 18px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
                    opacity: 0, transition: 'opacity 0.22s',
                  }}>
                    <p style={{ margin: 0, fontSize: 26, fontWeight: 700, color: '#F4F3EC', textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.2 }}>
                      {game.title}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 56 }}>
            {/* Prev */}
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="gg-page-btn"
              aria-label="Previous page"
              style={{ width: 36, height: 36, opacity: page === 1 ? 0.3 : 1 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18L9 12L15 6"/>
              </svg>
            </button>

            {pageNumbers().map((p, i) =>
              p === '…' ? (
                <span key={`e${i}`} style={{ color: 'rgba(244,243,236,0.3)', fontSize: 14, padding: '0 4px' }}>…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => goToPage(p as number)}
                  className="gg-page-btn"
                  style={{
                    width: 36, height: 36,
                    background: p === page ? '#FB671F' : 'transparent',
                    color: p === page ? '#fff' : 'rgba(244,243,236,0.6)',
                    border: p === page ? '1px solid #FB671F' : '1px solid rgba(244,243,236,0.15)',
                    fontWeight: p === page ? 700 : 400,
                  }}
                >
                  {p}
                </button>
              )
            )}

            {/* Next */}
            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className="gg-page-btn"
              aria-label="Next page"
              style={{ width: 36, height: 36, opacity: page === totalPages ? 0.3 : 1 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6L15 12L9 18"/>
              </svg>
            </button>
          </div>
        )}
      </div>

      <style>{`
        .gg-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        @media (max-width: 1023px) { .gg-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 639px)  { .gg-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; } }

        .gg-card:hover .gg-card-img {
          outline: 2px solid #FB671F;
        }
        .gg-card:hover .gg-card-overlay { opacity: 1 !important; }

        .gg-filter-btn:hover { border-color: rgba(244,243,236,0.45) !important; }
        .gg-dd-item:hover    { background: rgba(244,243,236,0.06) !important; }

        .gg-page-btn {
          display: flex; align-items: center; justify-content: center;
          border-radius: 4px; border: 1px solid rgba(244,243,236,0.15);
          background: transparent; color: rgba(244,243,236,0.6);
          font-size: 14px; font-family: inherit; cursor: pointer;
          transition: border-color 0.18s, color 0.18s;
        }
        .gg-page-btn:hover:not(:disabled) { border-color: rgba(244,243,236,0.4); color: #F4F3EC; }
        .gg-page-btn:disabled { cursor: default; }

        @media (max-width: 767px) {
          .gg-filters-row { gap: 8px; }
          .gg-filter-wrap { min-width: 0 !important; flex: 1; }
          .gg-search-wrap { min-width: 0 !important; width: 100%; flex-basis: 100%; }
          .gg-page-btn { width: 40px !important; height: 40px !important; }
        }
        @media (max-width: 480px) {
          .gg-card-overlay p { font-size: 18px !important; }
        }
      `}</style>
    </div>
  )
}
