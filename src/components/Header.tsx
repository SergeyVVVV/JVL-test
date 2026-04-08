'use client'

import { useState, useRef, useEffect } from 'react'
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: '#101213', borderBottom: '1px solid #222',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 72, padding: '0 5vw', maxWidth: 1440, margin: '0 auto',
      }}>
        {/* Logo */}
        <Link href="/en/echo" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://www.jvl.ca/img/logo.svg" alt="JVL" style={{ height: 36, width: 'auto' }} />
        </Link>

        {/* Desktop Nav */}
        <nav ref={dropdownRef} style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="hidden md:flex">
          {navItems.map((item) => (
            <div key={item.label} style={{ position: 'relative' }}>
              {item.children ? (
                <button
                  onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: 14, fontWeight: 500,
                    color: openDropdown === item.label ? '#059FFF' : '#F4F3EC',
                    padding: 0, transition: 'color 0.2s',
                  }}
                >
                  {item.label}
                  <svg
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                    style={{ opacity: 0.6, transform: openDropdown === item.label ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                  >
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              ) : (
                <Link
                  href={item.href}
                  style={{ fontSize: 14, fontWeight: 500, color: '#F4F3EC', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#059FFF')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#F4F3EC')}
                >
                  {item.label}
                </Link>
              )}

              {/* Dropdown */}
              {item.children && openDropdown === item.label && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 12px)', left: 0,
                  minWidth: 190, background: '#181818',
                  border: '1px solid #2a2a2a', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}>
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={() => setOpenDropdown(null)}
                      style={{
                        display: 'block', padding: '12px 20px',
                        fontSize: 14, color: '#F4F3EC', textDecoration: 'none',
                        transition: 'color 0.15s, background 0.15s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#059FFF'; e.currentTarget.style.background = '#101213' }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#F4F3EC'; e.currentTarget.style.background = 'transparent' }}
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
            href="https://www.amazon.com/JVL-Echo-Touchscreen-Arcade-Machine/dp/B0DJ3BSJ4D"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: '#059FFF', color: '#fff',
              fontSize: 13, fontWeight: 700, letterSpacing: '0.04em',
              padding: '10px 20px', textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#0080d4')}
            onMouseLeave={e => (e.currentTarget.style.background = '#059FFF')}
          >
            Buy on Amazon
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#F4F3EC', padding: 4 }}
          aria-label="Toggle menu"
        >
          {mobileOpen
            ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          }
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden" style={{ background: '#181818', borderTop: '1px solid #222' }}>
          <nav style={{ padding: '16px 5vw', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{ display: 'block', padding: '12px 0', fontSize: 14, fontWeight: 500, color: '#F4F3EC', textDecoration: 'none' }}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div style={{ paddingLeft: 16, paddingBottom: 8 }}>
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        style={{ display: 'block', padding: '8px 0', fontSize: 13, color: '#787878', textDecoration: 'none' }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href="https://www.amazon.com/JVL-Echo-Touchscreen-Arcade-Machine/dp/B0DJ3BSJ4D"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 6,
                background: '#059FFF', color: '#fff', fontSize: 13, fontWeight: 700,
                padding: '12px 24px', textDecoration: 'none', alignSelf: 'flex-start',
              }}
            >
              Buy on Amazon ↗
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
