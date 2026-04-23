import ContactForm from '@/components/ContactForm'
import { getPageMeta } from '@/lib/db'
import { buildMeta, BASE_URL } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import { buildBreadcrumb, buildWebPage, buildGraph } from '@/lib/jsonld'

const contactJsonLd = buildGraph([
  buildBreadcrumb(`${BASE_URL}/en/contact-us`, [
    { name: 'Home', item: `${BASE_URL}/en` },
    { name: 'Contact Us', item: `${BASE_URL}/en/contact-us` },
  ]),
  buildWebPage({ url: `${BASE_URL}/en/contact-us`, name: 'Contact Us — JVL' }),
])

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const meta = await getPageMeta('contact-us', locale)
  const title = meta?.title ?? 'Contact Us — JVL'
  const description = meta?.metaDescription ?? meta?.description ?? 'Contact us with any questions — we\'re here to help. Whether it\'s about partnerships, our cabinets and games, or just to say hello.'
  return buildMeta({ title, description, path: '/en/contact-us', ogImage: meta?.ogImage })
}

export default function ContactUsPage() {
  return (
    <main id="contact-page" style={{ background: '#080a0b', color: '#F4F3EC', fontFamily: 'inherit', minHeight: '100vh', marginTop: -124 }}>
      <JsonLd data={contactJsonLd} />
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '204px 6vw 120px' }}>

        {/* Badge */}
        <p style={{
          fontSize: 13, fontWeight: 700, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: '#FB671F',
          margin: '0 0 14px', textAlign: 'center',
        }}>
          Connect
        </p>

        {/* Title */}
        <h1 style={{
          fontFamily: 'inherit', fontSize: 'clamp(2.2rem, 5vw, 4rem)',
          fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.02em',
          textTransform: 'uppercase', color: '#F4F3EC',
          textAlign: 'center', margin: '0 0 20px',
        }}>
          Get in Touch
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 16, color: 'rgba(244,243,236,0.58)', lineHeight: 1.7,
          textAlign: 'center', maxWidth: 520, margin: '0 auto 64px',
        }}>
          Contact us with any questions — we're here to help. Whether it's about
          partnerships, our cabinets and games, or just to say hello, we're here for it.
        </p>

        {/* Form section */}
        <div>
          <p style={{
            fontSize: 18, fontWeight: 600, color: '#F4F3EC',
            margin: '0 0 32px',
          }}>
            Please fill in this form:
          </p>
          <ContactForm />
        </div>

      </div>
      <style>{`
        @media (max-width: 640px) {
          #contact-page > div { padding-top: 164px !important; padding-bottom: 80px !important; }
        }
      `}</style>
    </main>
  )
}
