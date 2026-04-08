import Link from 'next/link'

const footerLinks = {
  Products: [
    { label: 'Echo Home', href: '/en/echo' },
    { label: 'Echo B2B', href: '/en/echo-b2b' },
    { label: 'Flex', href: '/en/flex' },
    { label: 'Games', href: '/en/games' },
  ],
  Company: [
    { label: 'About JVL', href: '/en/about-jvl' },
    { label: 'Partners', href: '/en/partners' },
    { label: 'Contact Us', href: '/en/contact-us' },
    { label: 'Warranty', href: '/en/warranty' },
  ],
  Support: [
    { label: 'FAQ', href: '/en/faq' },
    { label: 'Register Product', href: '/en/register' },
    { label: 'Privacy Policy', href: '/en/privacy' },
    { label: 'Terms of Use', href: '/en/terms' },
  ],
}

export default function Footer() {
  return (
    <footer style={{ background: '#101213', borderTop: '1px solid #2a2a2a', paddingTop: 64, paddingBottom: 40 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5vw' }}>

        {/* Top grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 48, marginBottom: 56 }}>

          {/* Brand column */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://www.jvl.ca/img/logo.svg" alt="JVL" style={{ height: 28, width: 'auto', marginBottom: 20 }} />
            <p style={{ fontSize: 13, fontWeight: 300, color: '#787878', lineHeight: 1.75, marginBottom: 20 }}>
              A lifetime in gaming. Premium arcade and digital gaming solutions for home and business since 1983.
            </p>
            <p style={{ fontSize: 13, fontWeight: 300, color: '#787878', lineHeight: 1.9, margin: 0 }}>
              1380 Capital Circle<br />
              Lawrenceville, GA 30043<br />
              USA<br />
              <a href="tel:+14703041692" style={{ color: '#787878', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F4F3EC')}
                onMouseLeave={e => (e.currentTarget.style.color = '#787878')}
              >
                (470) 304-1692
              </a>
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: '#F4F3EC', marginBottom: 20,
              }}>
                {category}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{ fontSize: 13, fontWeight: 300, color: '#787878', textDecoration: 'none' }}
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

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #2a2a2a', paddingTop: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontSize: 12, fontWeight: 300, color: '#787878', margin: 0 }}>
            © {new Date().getFullYear()} JVL. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://www.jvl.ca/img/logo_18+.svg" alt="18+" style={{ height: 24, width: 'auto', opacity: 0.5 }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://www.jvl.ca/img/logo_gambling.svg" alt="Responsible Gambling" style={{ height: 24, width: 'auto', opacity: 0.5 }} />
          </div>
        </div>

      </div>
    </footer>
  )
}
