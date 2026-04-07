'use client'

import { useState } from 'react'

interface ProductFeature {
  icon?: string
  text: string
}

interface ProductCardItem {
  title: string
  subtitle?: string
  mediaUrl?: string
  price?: string
  features?: ProductFeature[]
  cta?: { label?: string; url?: string }
  ctaSecondary?: { label?: string; url?: string }
}

interface ProductCardsProps {
  headline?: string
  background?: 'dark' | 'light'
  items?: ProductCardItem[]
}

function FeatureIcon({ icon }: { icon?: string }) {
  switch (icon) {
    case 'shipping':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="flex-shrink-0 text-[#4B4B4B]">
          <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      )
    case 'return':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="flex-shrink-0 text-[#4B4B4B]">
          <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.5" />
        </svg>
      )
    case 'finance':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="flex-shrink-0 text-[#4B4B4B]">
          <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
        </svg>
      )
    case 'secure':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="flex-shrink-0 text-[#4B4B4B]">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    default:
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
          <path d="M5 12l5 5L20 7" stroke="#059FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
  }
}

export default function ProductCardsComponent({
  headline,
  background = 'light',
  items = [],
}: ProductCardsProps) {
  const [activeTab, setActiveTab] = useState(0)
  const isLight = background === 'light'
  const sectionBg = isLight ? 'bg-[#F4F3EC]' : 'bg-[#0d0f10]'
  const headingColor = isLight ? 'text-[#101213]' : 'text-[#F4F3EC]'
  const bodyColor = isLight ? 'text-[#4B4B4B]' : 'text-[#A0A0A0]'
  const dividerColor = isLight ? 'border-[#D8D5CC]' : 'border-[#2a2a2a]'
  const priceColor = isLight ? 'text-[#101213]' : 'text-[#F4F3EC]'

  const activeItem = items[activeTab]

  return (
    <section className={`${sectionBg} py-16 md:py-24`}>
      <div className="px-6 md:px-14 lg:px-20 max-w-[1200px] mx-auto">
        {/* Heading */}
        {headline && (
          <h2
            className={`text-3xl md:text-[2.75rem] font-black uppercase leading-tight tracking-tight ${headingColor} mb-12 md:mb-16`}
            style={{ maxWidth: '700px', whiteSpace: 'pre-line' }}
          >
            {headline}
          </h2>
        )}

        {/* Two-column: image left, details right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Product image */}
          <div className="flex items-center justify-center">
            {activeItem?.mediaUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={activeItem.mediaUrl}
                alt={activeItem.title}
                className="max-w-full object-contain"
                style={{ maxHeight: '420px' }}
              />
            ) : (
              /* Placeholder — product silhouette */
              <div className="w-full aspect-square max-w-[360px] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://www.jvl.ca/img/echo-hd3.png"
                  alt="JVL Echo HD3"
                  className="max-w-full object-contain opacity-90"
                  style={{ maxHeight: '420px' }}
                  onError={(e) => {
                    // fallback to logo if image not found
                    (e.target as HTMLImageElement).src = 'https://www.jvl.ca/img/logo.svg'
                    ;(e.target as HTMLImageElement).style.filter = 'opacity(0.15)'
                  }}
                />
              </div>
            )}
          </div>

          {/* Product details */}
          <div>
            {/* Tabs */}
            {items.length > 1 && (
              <div className={`flex items-center gap-8 pb-4 border-b ${dividerColor} mb-6`}>
                {items.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`text-sm font-bold uppercase tracking-wider pb-1 transition-colors border-b-2 -mb-[1px] ${
                      activeTab === i
                        ? `${headingColor} border-current`
                        : `${bodyColor} border-transparent hover:${headingColor}`
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}

            {activeItem && (
              <>
                {/* Title + subtitle */}
                <h3 className={`text-lg font-black uppercase tracking-tight ${headingColor} mb-1`}>
                  {activeItem.title} Touchscreen Countertop
                </h3>
                {activeItem.subtitle && (
                  <p className={`text-sm font-light ${bodyColor} mb-5`}>{activeItem.subtitle}</p>
                )}

                {/* Features */}
                {activeItem.features && activeItem.features.length > 0 && (
                  <ul className={`flex flex-col divide-y ${dividerColor} mb-6`}>
                    {activeItem.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 py-3">
                        <FeatureIcon icon={f.icon} />
                        <span className={`text-sm font-light ${bodyColor}`}>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Price */}
                {activeItem.price && (
                  <p className={`text-3xl font-bold ${priceColor} mb-6`}>{activeItem.price}</p>
                )}

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4">
                  {activeItem.cta?.label && activeItem.cta?.url && (
                    <a
                      href={activeItem.cta.url}
                      target={activeItem.cta.url.startsWith('http') ? '_blank' : undefined}
                      rel={activeItem.cta.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-2 bg-[#059FFF] text-white font-semibold text-sm px-7 py-3 hover:bg-[#007fd4] transition-colors"
                    >
                      {activeItem.cta.label}
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                        <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  )}
                  {activeItem.ctaSecondary?.label && activeItem.ctaSecondary?.url && (
                    <a
                      href={activeItem.ctaSecondary.url}
                      className={`inline-flex items-center gap-1.5 text-sm font-medium ${headingColor} hover:text-[#059FFF] transition-colors`}
                    >
                      {activeItem.ctaSecondary.label}
                      <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                        <path d="M1.5 6H10.5M6 1.5L10.5 6L6 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
