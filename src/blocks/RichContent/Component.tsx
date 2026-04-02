interface RichContentProps {
  content?: any
  maxWidth?: 'narrow' | 'wide' | 'full'
}

export default function RichContentComponent({ content, maxWidth = 'wide' }: RichContentProps) {
  const maxWidthClass = {
    narrow: 'max-w-2xl',
    wide: 'max-w-4xl',
    full: 'max-w-full',
  }[maxWidth] || 'max-w-4xl'

  return (
    <section className="bg-[#101213] py-16 px-6 md:px-12">
      <div className={`container mx-auto ${maxWidthClass}`}>
        <div className="prose prose-invert prose-lg prose-headings:font-semibold prose-headings:uppercase prose-headings:tracking-tight prose-a:text-[#059FFF] prose-a:no-underline hover:prose-a:underline max-w-none">
          {content ? (
            // In a real implementation, this would render the Lexical serialized content
            <div>Rich content rendered here</div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
