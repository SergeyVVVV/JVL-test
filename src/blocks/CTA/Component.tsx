interface CTAProps {
  layout?: 'centered' | 'banner' | 'split'
  headline?: string
  subheadline?: string
  primaryCta?: { label?: string; url?: string }
  secondaryCta?: { label?: string; url?: string }
  background?: 'dark' | 'light' | 'brand'
  backgroundImageUrl?: string
}

export default function CTAComponent({
  layout = 'centered',
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  background = 'dark',
  backgroundImageUrl,
}: CTAProps) {
  const bgClass = {
    dark: 'bg-[#101213]',
    light: 'bg-[#F4F3EC]',
    brand: 'bg-[#059FFF]',
  }[background]

  const textClass = background === 'light' ? 'text-[#101213]' : 'text-[#F4F3EC]'
  const subTextClass = background === 'light' ? 'text-[#101213]' : 'text-[#F4F3EC]'

  const primaryBtnClass =
    background === 'brand'
      ? 'bg-[#101213] text-[#F4F3EC] hover:bg-[#1a1d1f]'
      : 'bg-[#059FFF] text-white hover:bg-[#0080d4]'

  const secondaryBtnClass =
    background === 'light'
      ? 'border-[#101213] text-[#101213] hover:bg-[#101213] hover:text-[#F4F3EC]'
      : 'border-[#F4F3EC] text-[#F4F3EC] hover:bg-[#F4F3EC] hover:text-[#101213]'

  return (
    <section className={`relative ${bgClass} py-24 overflow-hidden`}>
      {backgroundImageUrl && (
        <img
          src={backgroundImageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity"
          aria-hidden="true"
        />
      )}
      <div className="relative z-10 text-center" style={{ padding: '0 5vw', maxWidth: '1200px', margin: '0 auto' }}>
        {headline && (
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-semibold uppercase tracking-tight leading-tight ${textClass} mb-6`}
          >
            {headline}
          </h2>
        )}
        {subheadline && (
          <p className={`text-base md:text-lg font-light ${subTextClass} opacity-80 mb-10 max-w-2xl mx-auto`}>
            {subheadline}
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {primaryCta?.label && primaryCta?.url && (
            <a
              href={primaryCta.url}
              target={primaryCta.url.startsWith('http') ? '_blank' : undefined}
              rel={primaryCta.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`inline-flex items-center gap-2 font-semibold text-sm uppercase tracking-widest px-8 py-4 transition-colors duration-200 ${primaryBtnClass}`}
            >
              {primaryCta.label}
            </a>
          )}
          {secondaryCta?.label && secondaryCta?.url && (
            <a
              href={secondaryCta.url}
              className={`inline-flex items-center gap-2 font-semibold text-sm uppercase tracking-widest px-8 py-4 border transition-colors duration-200 ${secondaryBtnClass}`}
            >
              {secondaryCta.label}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
