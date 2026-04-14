'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
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
  { label: 'News', href: '/en/blog-and-news' },
  { label: 'Contact', href: '/en/contact-us' },
]

const PRODUCTS = [
  {
    label: 'Home',
    price: '$3,990',
    url: 'https://www.amazon.com/JVL-Echo-Touchscreen-Arcade-Machine/dp/B0DJ3BSJ4D?maas=maas_adg_3E0066E64D67202DECABE629027A7FD0_afap_abs&ref_=aa_maas&tag=maas',
  },
  {
    label: 'Amusement',
    price: '$4,250',
    url: 'https://www.amazon.com/JVL-Operated-Touchscreen-Machine-Business/dp/B0FHWY5P1L?maas=maas_adg_D7235AE0727233DF666BF751400C1557_afap_abs&ref_=aa_maas&tag=maas',
  },
]

export default function Header() {
  const pathname = usePathname()
  const showProductBar = /\/echo/.test(pathname)

  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [dropdownLeft, setDropdownLeft] = useState(0)
  const [activeProduct, setActiveProduct] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Hide top bar on scroll (disabled on blog/news and homepage)
  const isHomePage = pathname.split('/').filter(Boolean).length <= 1
  const disableHide = isHomePage || /\/blog-and-news/.test(pathname)
  useEffect(() => {
    if (disableHide) { setScrolled(false); return }
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [disableHide])

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

  const product = PRODUCTS[activeProduct]

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>

      {/* ── Top bar: logo + nav ── */}
      <div style={{
        background: '#101213',
        borderBottom: '1px solid #222',
        overflow: 'hidden',
        maxHeight: scrolled ? 0 : 72,
        opacity: scrolled ? 0 : 1,
        transition: 'max-height 0.3s ease, opacity 0.25s ease',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 72, padding: '0 5vw', maxWidth: 1440, margin: '0 auto', width: '100%',
        }}>
          {/* Logo */}
          <Link href="/en" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://www.jvl.ca/img/logo.svg" alt="JVL" style={{ height: 36, width: 'auto' }} className="hidden md:block" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://www.jvl.ca/img/logo.svg" alt="JVL" style={{ height: 14, width: 'auto' }} className="md:hidden" />
          </Link>

          {/* Desktop Nav */}
          <nav ref={dropdownRef} style={{ alignItems: 'center', gap: 28 }} className="hidden md:flex">
            {navItems.map((item) => (
              <div key={item.label} style={{ position: 'relative' }}>
                {item.children ? (
                  <button
                    onClick={(e) => {
                      const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect()
                      setDropdownLeft(rect.left)
                      setOpenDropdown(openDropdown === item.label ? null : item.label)
                    }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 4,
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: 15, fontWeight: 500,
                      color: openDropdown === item.label ? '#059FFF' : '#F4F3EC',
                      padding: 0, transition: 'color 0.2s',
                    }}
                  >
                    {item.label}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                      style={{ opacity: 0.6, transform: openDropdown === item.label ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                ) : (
                  <Link href={item.href} style={{ fontSize: 15, fontWeight: 500, color: '#F4F3EC', textDecoration: 'none' }}>
                    {item.label}
                  </Link>
                )}

              </div>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#F4F3EC', padding: 4 }}
          >
            {mobileOpen
              ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            }
          </button>
        </div>
      </div>

      {/* ── Dropdown (rendered at header level, outside overflow:hidden) ── */}
      {openDropdown && (() => {
        const item = navItems.find(n => n.label === openDropdown)
        if (!item?.children) return null
        return (
          <div style={{
            position: 'fixed', top: 76, left: dropdownLeft,
            minWidth: 190, background: '#181818',
            border: '1px solid #2a2a2a', borderRadius: 10,
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            overflow: 'hidden',
            zIndex: 300,
          }}>
            {item.children.map((child) => (
              <Link
                key={child.label}
                href={child.href}
                onClick={() => setOpenDropdown(null)}
                style={{ display: 'block', padding: '11px 20px', fontSize: 15, fontWeight: 500, color: '#F4F3EC', textDecoration: 'none', transition: 'background 0.15s, color 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#059FFF'; e.currentTarget.style.background = '#101213' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#F4F3EC'; e.currentTarget.style.background = 'transparent' }}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )
      })()}

      {/* ── Product switcher bar (echo pages only, desktop only) ── */}
      {showProductBar && <div className="hidden md:block" style={{ background: '#101213', borderBottom: '1px solid #222' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 52, padding: '0 5vw', maxWidth: 1440, margin: '0 auto',
        }}>
          {/* Home / Amusement tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            {PRODUCTS.map((p, i) => (
              <button
                key={p.label}
                onClick={() => setActiveProduct(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  fontSize: 14, fontWeight: 500,
                  color: activeProduct === i ? '#F4F3EC' : '#787878',
                  transition: 'color 0.2s',
                }}
              >
                {/* Dot indicator */}
                <span style={{
                  width: 10, height: 10, borderRadius: '50%',
                  border: '2px solid',
                  borderColor: activeProduct === i ? '#059FFF' : '#555',
                  background: activeProduct === i ? '#059FFF' : 'transparent',
                  display: 'inline-block', flexShrink: 0,
                  transition: 'all 0.2s',
                }} />
                {p.label}
              </button>
            ))}
          </div>

          {/* Price + CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#F4F3EC', letterSpacing: '-0.02em' }}>
              {product.price}
            </span>
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-amazon"
              style={{ padding: '8px 18px' }}
            >
              Buy on Amazon
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>}

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden" style={{ background: '#181818', borderBottom: '1px solid #222' }}>
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
          </nav>
        </div>
      )}
    </header>
  )
}
