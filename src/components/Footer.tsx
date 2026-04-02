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
    <footer className="bg-[#101213] border-t border-[#4B4B4B] pt-16 pb-10 px-6 md:px-12">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand column */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://www.jvl.ca/img/logo.svg"
              alt="JVL"
              width={114}
              height={30}
              className="h-7 w-auto mb-6"
            />
            <p className="text-xs font-light text-[#787878] leading-relaxed mb-6">
              A lifetime in gaming. Premium arcade and digital gaming solutions for home and business since 1983.
            </p>
            <p className="text-xs font-light text-[#787878] leading-loose">
              1380 Capital Circle<br />
              Lawrenceville, GA 30043<br />
              USA<br />
              <a href="tel:+14703041692" className="hover:text-[#F4F3EC] transition-colors">(470) 304-1692</a>
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[#F4F3EC] mb-5">
                {category}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs font-light text-[#787878] hover:text-[#F4F3EC] transition-colors duration-200"
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
        <div className="border-t border-[#4B4B4B] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-light text-[#787878]">
            © {new Date().getFullYear()} JVL. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://www.jvl.ca/img/logo_18+.svg"
              alt="18+"
              className="h-6 w-auto opacity-50 hover:opacity-80 transition-opacity"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://www.jvl.ca/img/logo_gambling.svg"
              alt="Responsible Gambling"
              className="h-6 w-auto opacity-50 hover:opacity-80 transition-opacity"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
