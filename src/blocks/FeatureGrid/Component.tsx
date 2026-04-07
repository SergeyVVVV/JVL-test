import type { JSX } from 'react'

const icons: Record<string, JSX.Element> = {
  games: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h.01M8 10v4M6 12h4"/>
      <circle cx="16" cy="12" r="1" fill="#059FFF"/><circle cx="18" cy="10" r="1" fill="#059FFF"/>
    </svg>
  ),
  support: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      <path d="M12 16v-4M12 8h.01"/>
    </svg>
  ),
  revenue: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  hardware: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  global: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  branding: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
}

const iconKeys = ['games', 'support', 'revenue', 'hardware', 'global', 'branding']

interface FeatureGridProps {
  tagLabel?: string
  headline?: string
  columns?: string
  items?: Array<{ icon?: string; title: string; body?: string }>
  background?: 'dark' | 'light'
}

export default function FeatureGridComponent({
  tagLabel,
  headline,
  columns = '3',
  items = [],
  background = 'dark',
}: FeatureGridProps) {
  const isDark = background !== 'light'
  const bg = isDark ? 'bg-[#101213]' : 'bg-[#F4F3EC]'
  const textColor = isDark ? 'text-[#F4F3EC]' : 'text-[#101213]'
  const bodyColor = isDark ? 'text-[#787878]' : 'text-[#4B4B4B]'
  const borderColor = isDark ? '#2a2a2a' : '#D8D5CC'
  const cols = columns === '2' ? 'md:grid-cols-2' : columns === '4' ? 'md:grid-cols-4' : 'md:grid-cols-3'

  return (
    <section className={`${bg} py-20 md:py-24`}>
      <div className="px-8 md:px-14 lg:px-20 max-w-[1200px] mx-auto">
        {(tagLabel || headline) && (
          <div className="mb-14 text-center">
            {tagLabel && (
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#059FFF] block mb-4">
                {tagLabel}
              </span>
            )}
            {headline && (
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight tracking-tight ${textColor}`}>
                {headline}
              </h2>
            )}
          </div>
        )}

        <div
          className={`grid grid-cols-1 ${cols}`}
          style={{ border: `1px solid ${borderColor}` }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="p-8 md:p-10 flex flex-col gap-5"
              style={{ borderRight: `1px solid ${borderColor}`, borderBottom: `1px solid ${borderColor}` }}
            >
              <div className="w-10 h-10 flex items-center justify-center bg-[#059FFF]/10 rounded-sm flex-shrink-0">
                {icons[iconKeys[i % iconKeys.length]]}
              </div>
              <h3 className={`text-sm font-bold uppercase tracking-[0.15em] ${textColor}`}>
                {item.title}
              </h3>
              {item.body && (
                <p className={`text-sm font-light leading-relaxed ${bodyColor}`}>
                  {item.body}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
