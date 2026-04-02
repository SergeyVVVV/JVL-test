'use client'

import { useState } from 'react'

interface GalleryItem {
  mediaUrl: string
  caption?: string
}

interface GalleryProps {
  headline?: string
  layout?: 'carousel' | 'grid' | 'masonry'
  items?: GalleryItem[]
}

export default function GalleryComponent({ headline, layout = 'grid', items = [] }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (items.length === 0) return null

  return (
    <section className="bg-[#101213] py-24 px-6 md:px-12">
      <div className="container mx-auto max-w-6xl">
        {headline && (
          <h2 className="text-4xl font-semibold uppercase tracking-tight text-[#F4F3EC] mb-12 text-center">
            {headline}
          </h2>
        )}

        {layout === 'carousel' && (
          <div>
            <div className="relative aspect-video overflow-hidden bg-[#181818] mb-4">
              <img
                src={items[activeIndex].mediaUrl}
                alt={items[activeIndex].caption || ''}
                className="w-full h-full object-cover"
              />
              {items[activeIndex].caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#101213] to-transparent px-6 py-4">
                  <p className="text-sm font-light text-[#F4F3EC] opacity-80">{items[activeIndex].caption}</p>
                </div>
              )}
              {items.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveIndex((activeIndex - 1 + items.length) % items.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#101213]/80 text-[#F4F3EC] flex items-center justify-center hover:bg-[#059FFF] transition-colors"
                    aria-label="Previous"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setActiveIndex((activeIndex + 1) % items.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#101213]/80 text-[#F4F3EC] flex items-center justify-center hover:bg-[#059FFF] transition-colors"
                    aria-label="Next"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {items.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`flex-shrink-0 w-20 h-14 overflow-hidden border-2 transition-colors ${
                    i === activeIndex ? 'border-[#059FFF]' : 'border-transparent'
                  }`}
                >
                  <img src={item.mediaUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {layout === 'grid' && (
          <div className="grid grid-cols-2 md:grid-cols-3 border border-[#4B4B4B] divide-x divide-y divide-[#4B4B4B]">
            {items.map((item, i) => (
              <div key={i} className="aspect-square overflow-hidden bg-[#181818]">
                <img
                  src={item.mediaUrl}
                  alt={item.caption || ''}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

        {layout === 'masonry' && (
          <div className="columns-2 md:columns-3 gap-px space-y-px">
            {items.map((item, i) => (
              <div key={i} className="break-inside-avoid overflow-hidden bg-[#181818]">
                <img
                  src={item.mediaUrl}
                  alt={item.caption || ''}
                  className="w-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
