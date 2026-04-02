'use client'

import { useState } from 'react'

interface FAQProps {
  headline?: string
  items?: Array<{ question: string; answer?: any }>
}

export default function FAQComponent({ headline, items = [] }: FAQProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="bg-[#101213] py-24 px-6 md:px-12">
      <div className="container mx-auto max-w-3xl">
        {headline && (
          <h2 className="text-4xl font-semibold uppercase tracking-tight text-[#F4F3EC] mb-12 text-center">
            {headline}
          </h2>
        )}
        <div className="flex flex-col border border-[#4B4B4B] divide-y divide-[#4B4B4B]">
          {items.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left group"
              >
                <span className="text-sm font-medium text-[#F4F3EC] uppercase tracking-wide group-hover:text-[#059FFF] transition-colors duration-200">
                  {item.question}
                </span>
                <span className="text-[#059FFF] text-xl flex-shrink-0 ml-4 transition-transform duration-200" style={{ transform: open === i ? 'rotate(45deg)' : 'none' }}>
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sm font-light text-[#787878] leading-relaxed">
                  {item.answer ? (
                    <div>Answer content</div>
                  ) : (
                    <p>No answer provided.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
