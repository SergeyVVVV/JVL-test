export default function SplitSectionComponent({
  leftContent,
  rightContent,
  background = 'dark',
}: {
  leftContent?: any
  rightContent?: any
  background?: string
}) {
  const isDark = background === 'dark'
  const bg = isDark ? 'bg-[#101213]' : background === 'accent' ? 'bg-[#059FFF]' : 'bg-[#F4F3EC]'
  const textColor = isDark ? 'text-[#787878]' : background === 'accent' ? 'text-white' : 'text-[#4B4B4B]'

  return (
    <section className={`${bg} py-24 px-6 md:px-12`}>
      <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-12 divide-y md:divide-y-0 md:divide-x divide-[#4B4B4B]">
        <div className={`text-sm font-light leading-relaxed ${textColor} md:pr-12`}>
          {leftContent ? (
            <div className="prose prose-sm max-w-none">Left content</div>
          ) : (
            <p>Content not provided.</p>
          )}
        </div>
        <div className={`text-sm font-light leading-relaxed ${textColor} md:pl-12 pt-12 md:pt-0`}>
          {rightContent ? (
            <div className="prose prose-sm max-w-none">Right content</div>
          ) : (
            <p>Content not provided.</p>
          )}
        </div>
      </div>
    </section>
  )
}
