interface MediaCopyProps {
  mediaPosition?: 'left' | 'right'
  tagLabel?: string
  headline?: string
  body?: any
  cta?: { label?: string; url?: string }
  mediaType?: 'image' | 'video'
  desktopImageUrl?: string
  mobileImageUrl?: string
  videoUrl?: string
  background?: 'dark' | 'light'
}

export default function MediaCopyComponent({
  tagLabel,
  headline,
  body,
  cta,
  mediaPosition = 'right',
  desktopImageUrl,
  background = 'dark',
}: MediaCopyProps) {
  const isDark = background !== 'light'
  const sectionBg = isDark ? 'bg-[#101213]' : 'bg-[#F4F3EC]'
  const textColor = isDark ? 'text-[#F4F3EC]' : 'text-[#101213]'
  const bodyColor = isDark ? 'text-[#787878]' : 'text-[#4B4B4B]'

  const textSide = (
    <div className={`flex flex-col justify-center px-8 md:px-14 lg:px-20 py-20 md:py-28 ${sectionBg}`}>
      {tagLabel && (
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#059FFF] block mb-6">
          {tagLabel}
        </span>
      )}
      {headline && (
        <h2 className={`text-4xl md:text-5xl lg:text-[3.5rem] font-semibold uppercase leading-[1.06] tracking-tight ${textColor} mb-8`}>
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
          className={`self-start inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] ${textColor} border border-current px-7 py-3.5 hover:text-[#059FFF] hover:border-[#059FFF] transition-colors duration-300`}
        >
          {cta.label}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1.5 6H10.5M6 1.5L10.5 6L6 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      )}
    </div>
  )

  const visualSide = (
    <div className="relative overflow-hidden min-h-[380px] md:min-h-full">
      {desktopImageUrl ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={desktopImageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* subtle blend gradient toward text side */}
          <div
            className={`absolute inset-0 ${
              mediaPosition === 'right'
                ? 'bg-gradient-to-l from-transparent to-[#101213]/30'
                : 'bg-gradient-to-r from-transparent to-[#101213]/30'
            }`}
          />
        </>
      ) : (
        /* Styled placeholder — JVL brand blue panel */
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#059FFF] overflow-hidden">
          {/* Subtle dot grid */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          {/* Diagonal accent lines */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-white"
                style={{
                  width: '200%',
                  top: `${15 + i * 14}%`,
                  left: '-50%',
                  transform: 'rotate(-25deg)',
                }}
              />
            ))}
          </div>
          {/* JVL logo watermark */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.jvl.ca/img/logo.svg"
            alt=""
            className="relative z-10 w-36 md:w-48 opacity-30 brightness-0 invert"
          />
          {/* Product coming soon note */}
          <p className="relative z-10 mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
            Product image
          </p>
        </div>
      )}
    </div>
  )

  return (
    <section className="overflow-hidden w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[560px]">
        {mediaPosition === 'left' ? (
          <>
            {visualSide}
            {textSide}
          </>
        ) : (
          <>
            {textSide}
            {visualSide}
          </>
        )}
      </div>
    </section>
  )
}
