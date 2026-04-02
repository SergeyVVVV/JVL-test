interface ProductCardItem {
  title: string
  subtitle?: string
  mediaUrl?: string
  price?: string
  features?: Array<{ text: string }>
  cta?: { label?: string; url?: string }
}

interface ProductCardsProps {
  headline?: string
  items?: ProductCardItem[]
}

// Gradient palettes per card index
const cardGradients = [
  'from-[#091628] via-[#0c1e38] to-[#080f1a]', // Navy blue — Echo Home
  'from-[#120800] via-[#1c0e00] to-[#0a0503]',  // Deep amber — Echo Amusement
]

export default function ProductCardsComponent({ headline, items = [] }: ProductCardsProps) {
  return (
    <section className="bg-[#0d0f10] py-24">
      <div className="container mx-auto max-w-6xl px-6 md:px-12">
        {headline && (
          <div className="mb-14 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#059FFF]">
              {headline}
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 border border-[#2a2a2a]">
          {items.map((item, i) => (
            <div
              key={i}
              className={`flex flex-col ${
                i < items.length - 1 ? 'border-b md:border-b-0 md:border-r border-[#2a2a2a]' : ''
              }`}
            >
              {/* Visual card header */}
              {item.mediaUrl ? (
                <div className="relative h-64 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.mediaUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f10]/70 to-transparent" />
                </div>
              ) : (
                <div
                  className={`relative h-64 overflow-hidden bg-gradient-to-br ${
                    cardGradients[i % cardGradients.length]
                  }`}
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#059FFF] via-[#059FFF]/40 to-transparent" />
                  {/* Subtle dot grid */}
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />
                  {/* Ghost product name */}
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <span className="text-[7rem] md:text-[9rem] font-bold text-white/[0.04] uppercase tracking-tighter select-none leading-none text-center">
                      {item.title.split(' ')[0]}
                    </span>
                  </div>
                  {/* Bottom-left label */}
                  <div className="absolute bottom-7 left-8">
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#059FFF]/80 block mb-1.5">
                      {item.subtitle}
                    </span>
                    <h3 className="text-2xl font-semibold uppercase tracking-tight text-[#F4F3EC]">
                      {item.title}
                    </h3>
                  </div>
                  {/* Bottom gradient fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0d0f10]/60 to-transparent" />
                </div>
              )}

              {/* Card body */}
              <div className="flex flex-col p-8 lg:p-10 flex-1">
                {/* Show title/subtitle here only if image is present (header already shows them otherwise) */}
                {item.mediaUrl && (
                  <>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#059FFF] mb-3">
                      {item.subtitle}
                    </span>
                    <h3 className="text-2xl font-semibold uppercase tracking-tight text-[#F4F3EC] mb-4">
                      {item.title}
                    </h3>
                  </>
                )}

                {/* Price */}
                {item.price && (
                  <p className="text-4xl md:text-5xl font-semibold text-[#F4F3EC] mt-2 mb-6 tracking-tight">
                    {item.price}
                  </p>
                )}

                {/* Divider */}
                <div className="w-full h-px bg-[#2a2a2a] mb-7" />

                {/* Features */}
                {item.features && item.features.length > 0 && (
                  <ul className="flex flex-col gap-3.5 mb-10 flex-1">
                    {item.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3.5">
                        <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M2 8L6.5 12.5L14 4" stroke="#059FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-sm font-light text-[#F4F3EC]/70 leading-relaxed">
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA */}
                {item.cta?.label && item.cta?.url && (
                  <a
                    href={item.cta.url}
                    target={item.cta.url.startsWith('http') ? '_blank' : undefined}
                    rel={item.cta.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center justify-center gap-2 bg-[#059FFF] text-white font-semibold text-sm uppercase tracking-widest px-6 py-4 hover:bg-[#0080d4] transition-colors duration-200"
                  >
                    {item.cta.label}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7H12M7 2L12 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
