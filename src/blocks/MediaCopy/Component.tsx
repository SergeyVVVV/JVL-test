interface MediaCopyProps {
  layout?: 'split' | 'centered'
  mediaPosition?: 'left' | 'right'
  tagLabel?: string
  headline?: string
  body?: string
  quote?: string
  cta?: { label?: string; url?: string }
  mediaType?: 'image' | 'video'
  desktopImageUrl?: string
  videoUrl?: string
  background?: 'dark' | 'light'
}

export default function MediaCopyComponent({
  layout = 'split',
  tagLabel,
  headline,
  body,
  quote,
  cta,
  mediaPosition = 'right',
  desktopImageUrl,
  background = 'dark',
}: MediaCopyProps) {
  const isLight = background === 'light'
  const sectionBg = isLight ? 'bg-[#F4F3EC]' : 'bg-[#101213]'
  const textColor = isLight ? 'text-[#101213]' : 'text-[#F4F3EC]'
  const bodyColor = isLight ? 'text-[#4B4B4B]' : 'text-[#787878]'
  const borderColor = isLight ? 'border-[#C8C5BC]' : 'border-[#333]'

  // ─── CENTERED LAYOUT ────────────────────────────────────────────────────────
  if (layout === 'centered') {
    return (
      <section className={`${sectionBg} py-16 md:py-24`}>
        <div className="px-6 md:px-14 lg:px-20 max-w-[1200px] mx-auto">
          {/* Tag */}
          {tagLabel && (
            <div className="flex justify-center mb-6">
              <span className={`text-sm font-normal border ${borderColor} ${textColor} rounded-full px-5 py-1.5`}>
                {tagLabel}
              </span>
            </div>
          )}

          {/* Heading */}
          {headline && (
            <h2 className={`text-2xl md:text-4xl lg:text-[2.75rem] font-black uppercase leading-tight tracking-tight ${textColor} text-center mb-10`}>
              {headline}
            </h2>
          )}

          {/* Image */}
          {desktopImageUrl && (
            <div className="mb-10 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={desktopImageUrl}
                alt=""
                className="w-full object-cover"
              />
            </div>
          )}

          {/* Body + quote */}
          {(body || quote) && (
            <div className={`max-w-2xl mx-auto text-center ${bodyColor}`}>
              {body && (
                <p className="text-base md:text-lg font-light leading-relaxed mb-6">
                  {body}
                </p>
              )}
              {quote && (
                <p className="text-base md:text-lg font-medium italic">
                  &ldquo;{quote}&rdquo;
                </p>
              )}
            </div>
          )}

          {/* CTA */}
          {cta?.label && cta?.url && (
            <div className="flex justify-center mt-8">
              <a
                href={cta.url}
                className={`inline-flex items-center gap-2 text-sm font-semibold ${textColor} hover:text-[#059FFF] transition-colors`}
              >
                {cta.label}
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                  <path d="M1.5 6H10.5M6 1.5L10.5 6L6 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </section>
    )
  }

  // ─── SPLIT LAYOUT (default) ──────────────────────────────────────────────────
  const textSide = (
    <div className={`flex flex-col justify-center px-8 md:px-14 lg:px-20 py-20 md:py-28 ${sectionBg}`}>
      {tagLabel && (
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#059FFF] block mb-6">
          {tagLabel}
        </span>
      )}
      {headline && (
        <h2 className={`text-4xl md:text-5xl font-black uppercase leading-[1.05] tracking-tight ${textColor} mb-6`}>
          {headline}
        </h2>
      )}
      <div className="w-12 h-[2px] bg-[#059FFF] mb-8" />
      {body && (
        <p className={`text-base font-light leading-relaxed ${bodyColor} mb-10 max-w-md`}>
          {body}
        </p>
      )}
      {cta?.label && cta?.url && (
        <a
          href={cta.url}
          className={`self-start inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] ${textColor} border border-current px-7 py-3.5 hover:text-[#059FFF] hover:border-[#059FFF] transition-colors duration-200`}
        >
          {cta.label}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1.5 6H10.5M6 1.5L10.5 6L6 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      )}
    </div>
  )

  const visualSide = (
    <div className="relative overflow-hidden min-h-[380px] md:min-h-full">
      {desktopImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={desktopImageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[#059FFF]/10">
          <span className={`text-xs font-semibold uppercase tracking-widest ${bodyColor}`}>Image</span>
        </div>
      )}
    </div>
  )

  return (
    <section className="overflow-hidden w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[560px]">
        {mediaPosition === 'left' ? (
          <>{visualSide}{textSide}</>
        ) : (
          <>{textSide}{visualSide}</>
        )}
      </div>
    </section>
  )
}
