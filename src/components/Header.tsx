'use client'

import { useState } from 'react'
import Link from 'next/link'

const navItems = [
  {
    label: 'Echo',
    href: '/en/echo',
    children: [
      { label: 'Echo Home', href: '/en/echo' },
      { label: 'Echo Amusement', href: '/en/echo-b2b' },
    ],
  },
  { label: 'Flex', href: '/en/flex' },
  { label: 'Online Games', href: '/en/games' },
  { label: 'About JVL', href: '/en/about-jvl' },
  { label: 'News', href: '/en/news' },
  { label: 'Contact', href: '/en/contact-us' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [echoOpen, setEchoOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#101213] border-b border-[#2a2a2a]">
      <div className="px-6 md:px-10 h-[72px] flex items-center justify-between max-w-[1440px] mx-auto">
        {/* Logo — larger to match production */}
        <Link href="/en/echo" className="flex items-center flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.jvl.ca/img/logo.svg"
            alt="JVL"
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              <Link
                href={item.href}
                className="flex items-center gap-1 text-sm font-medium text-[#F4F3EC] hover:text-[#059FFF] transition-colors duration-200"
              >
                {item.label}
                {item.children && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-60 group-hover:opacity-100 transition-transform duration-200 group-hover:rotate-180">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </Link>
              {item.children && (
                <div className="absolute top-full left-0 mt-1 min-w-[180px] bg-[#181818] border border-[#2a2a2a] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block px-5 py-3 text-sm text-[#F4F3EC] hover:text-[#059FFF] hover:bg-[#101213] transition-colors duration-150"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Buy on Amazon CTA */}
          <a
            href="https://www.amazon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#059FFF] text-white text-sm font-semibold px-5 py-2 hover:bg-[#0080d4] transition-colors duration-200"
          >
            Buy on Amazon
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[#F4F3EC] hover:text-[#059FFF] transition-colors p-1"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-[#181818] border-t border-[#2a2a2a]">
          <nav className="px-6 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-sm font-medium text-[#F4F3EC] hover:text-[#059FFF] transition-colors duration-200"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-4 flex flex-col gap-1 pb-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 text-sm font-light text-[#787878] hover:text-[#F4F3EC] transition-colors duration-200"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href="https://www.amazon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 bg-[#059FFF] text-white text-sm font-semibold px-5 py-3 self-start"
            >
              Buy on Amazon ↗
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
