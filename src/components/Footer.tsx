'use client'

import Link from 'next/link'

const footerLinks = {
  Products: [
    { label: 'Echo Home', href: '/en/echo' },
    { label: 'Echo B2B', href: '/en/echo-b2b' },
    { label: 'Flex', href: '/en/flex' },
    { label: 'Games', href: '/en/games' },
  ],
  Company: [
    { label: 'News', href: '/en/blog-and-news' },
    { label: 'About JVL', href: '/en/about-jvl' },
    { label: 'Contact Us', href: '/en/contact-us' },
  ],
  Support: [
    { label: 'Warranty Registration', href: '/en/warranty' },
    { label: 'Privacy Policy', href: '/en/privacy-policy' },
    { label: 'Terms of Use', href: '/en/terms-of-use' },
  ],
}

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/jvl_echo/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@JVLTube',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61573956107914',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/jvl-corporation/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2" ry="2"/>
        <line x1="8" y1="11" x2="8" y2="16"/>
        <line x1="8" y1="8" x2="8" y2="8.01"/>
        <line x1="12" y1="16" x2="12" y2="11"/>
        <path d="M16 16v-3a2 2 0 0 0-4 0"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer style={{ background: '#101213', borderTop: '1px solid #2a2a2a', paddingTop: 64, paddingBottom: 40 }}>
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 2fr;
          gap: 80px;
          margin-bottom: 56px;
        }
        .footer-bottom {
          border-top: 1px solid #2a2a2a;
          padding-top: 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        @media (max-width: 767px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
            margin-bottom: 40px;
          }
          .footer-brand {
            grid-column: 1 / -1;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: center;
            gap: 16px;
            text-align: center;
          }
          .footer-wrap {
            padding-left: 6vw !important;
            padding-right: 6vw !important;
          }
        }
      `}</style>

      <div className="footer-wrap" style={{ maxWidth: 1440, margin: '0 auto', padding: '0 5vw' }}>

        {/* Top grid */}
        <div className="footer-grid">

          {/* Brand column */}
          <div className="footer-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://www.jvl.ca/img/logo.svg" alt="JVL" style={{ height: 28, width: 'auto', marginBottom: 16 }} />
            <p style={{ fontSize: 15, fontWeight: 300, color: '#787878', lineHeight: 1.75, marginBottom: 20, maxWidth: 320 }}>
              A lifetime in gaming. Premium arcade and digital gaming solutions for home and business since 1984.
            </p>
            <div style={{ display: 'flex', gap: 14 }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{ color: '#555', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#059FFF')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#555')}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 style={{
                  fontSize: 13, fontWeight: 700, letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: '#F4F3EC', marginBottom: 16,
                }}>
                  {category}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        style={{ fontSize: 15, fontWeight: 300, color: '#787878', textDecoration: 'none' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#F4F3EC')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#787878')}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p style={{ fontSize: 12, fontWeight: 300, color: '#787878', margin: 0 }}>
            Copyright © {new Date().getFullYear()} JVL Labs Inc. and its licensors. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://www.jvl.ca/img/logo_18+.svg" alt="18+" style={{ height: 24, width: 'auto', opacity: 0.5 }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://www.jvl.ca/img/logo_gambling.svg" alt="Gambling Commission" style={{ height: 24, width: 'auto', opacity: 0.5 }} />
          </div>
        </div>

      </div>
    </footer>
  )
}
