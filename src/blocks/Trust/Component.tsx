interface TrustItem {
  stat?: string
  label?: string
}

interface TrustProps {
  headline?: string
  variant?: 'stats' | 'testimonials' | 'logos'
  items?: TrustItem[]
}

export default function TrustComponent({ headline, variant = 'stats', items = [] }: TrustProps) {
  return (
    <section className="bg-[#059FFF] py-20 px-6 md:px-12">
      <div className="container mx-auto max-w-6xl">
        {headline && (
          <h2 className="text-3xl md:text-4xl font-semibold uppercase tracking-tight text-white mb-14 text-center">
            {headline}
          </h2>
        )}

        {variant === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/30">
            {items.map((item, i) => (
              <div key={i} className="text-center py-8 md:py-0 px-8">
                <p className="text-6xl md:text-7xl font-semibold text-white leading-none mb-3">
                  {item.stat}
                </p>
                <p className="text-sm font-light uppercase tracking-widest text-white/80">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {variant === 'testimonials' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm p-8 flex flex-col gap-4">
                <p className="text-white font-light leading-relaxed italic">
                  &ldquo;{item.stat}&rdquo;
                </p>
                <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">
                  — {item.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {variant === 'logos' && (
          <div className="flex flex-wrap items-center justify-center gap-10">
            {items.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                {item.stat && (
                  <img src={item.stat} alt={item.label || ''} className="h-10 object-contain filter brightness-0 invert" />
                )}
                {item.label && !item.stat && (
                  <span className="text-sm font-semibold uppercase tracking-widest text-white">{item.label}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
