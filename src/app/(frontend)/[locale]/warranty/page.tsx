import WarrantyForm from '@/components/WarrantyForm'
import Link from 'next/link'
import { getPageMeta } from '@/lib/db'
import { buildMeta } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const meta = await getPageMeta('warranty', locale)
  const title = meta?.title ?? 'Warranty Registration — JVL'
  const description = meta?.metaDescription ?? meta?.description ?? 'Register your JVL ECHO device warranty. Quick 3-step process to activate your coverage.'
  return buildMeta({ title, description, path: '/en/warranty', ogImage: meta?.ogImage })
}

export default function WarrantyPage() {
  return (
    <main
      id="warranty-page"
      style={{ background: '#080a0b', color: '#F4F3EC', fontFamily: 'inherit', minHeight: '100vh', marginTop: -124 }}
    >
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '204px 6vw 120px' }}>

        {/* Badge */}
        <p style={{
          fontSize: 13, fontWeight: 700, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: '#FB671F',
          margin: '0 0 14px', textAlign: 'center',
        }}>
          Support
        </p>

        {/* Title */}
        <h1 style={{
          fontFamily: 'inherit', fontSize: 'clamp(2.2rem, 5vw, 4rem)',
          fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.02em',
          textTransform: 'uppercase', color: '#F4F3EC',
          textAlign: 'center', margin: '0 0 20px',
        }}>
          Warranty Registration
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 16, color: 'rgba(244,243,236,0.58)', lineHeight: 1.7,
          textAlign: 'center', maxWidth: 520, margin: '0 auto 64px',
        }}>
          Register your JVL ECHO device to activate your warranty coverage.
          The process takes just a few minutes.
        </p>

        {/* Form */}
        <WarrantyForm />

        {/* Help link */}
        <p style={{ textAlign: 'center', marginTop: 40, fontSize: 14, color: 'rgba(244,243,236,0.38)' }}>
          Need help or have a question?{' '}
          <Link href="/en/contact-us" style={{ color: 'rgba(244,243,236,0.6)', textDecoration: 'underline' }}>
            Contact us
          </Link>
        </p>

      </div>
      <style>{`
        @media (max-width: 640px) {
          #warranty-page > div { padding-top: 164px !important; padding-bottom: 80px !important; }
        }
      `}</style>
    </main>
  )
}
