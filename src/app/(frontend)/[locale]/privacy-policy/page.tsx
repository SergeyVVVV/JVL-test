import { getStaticPage } from '@/lib/db'
import LegalLayout from '@/components/LegalLayout'
import { buildMeta, BASE_URL } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import { buildBreadcrumb, buildWebPage, buildGraph } from '@/lib/jsonld'

const privacyJsonLd = buildGraph([
  buildBreadcrumb(`${BASE_URL}/en/privacy-policy`, [
    { name: 'Home', item: `${BASE_URL}/en` },
    { name: 'Privacy Policy', item: `${BASE_URL}/en/privacy-policy` },
  ]),
  buildWebPage({ url: `${BASE_URL}/en/privacy-policy`, name: 'Privacy Policy — JVL' }),
])

export const revalidate = 300

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const page = await getStaticPage(5, locale)
  const title = page?.metaTitle ?? page?.title ?? 'Privacy Policy — JVL'
  const description = page?.metaDescription ?? 'Learn how JVL collects, uses, and protects your personal information.'
  return buildMeta({ title, description, path: '/en/privacy-policy', ogImage: page?.ogImage })
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const page = await getStaticPage(5, locale)

  if (page?.content1) {
    return (
      <>
        <JsonLd data={privacyJsonLd} />
        <LegalLayout
          badge="Legal"
          title={page.title ?? 'Privacy Policy'}
          lastUpdated={page.updatedAt ?? undefined}
          htmlContent={page.content1}
        />
      </>
    )
  }

  // Fallback to static content if CMS is unavailable
  return (
    <>
      <JsonLd data={privacyJsonLd} />
    <LegalLayout
      badge="Legal"
      title="Privacy Policy"
      lastUpdated="January 1, 2025"
      htmlContent={`
        <h2>Our Commitment</h2>
        <p>JVL is committed to protecting user privacy online, and we pledge to give you as much control as possible over your personal information.</p>
        <h2>Information We Collect</h2>
        <p>JVL logs IP addresses for system administration and server diagnostics. Interaction patterns are logged anonymously. Required registration fields include full name, email, ZIP code, username, and password.</p>
        <h2>Our Use of Your Information</h2>
        <p>Information collected supports improved customer service and targeted communications with your permission. Financial information is held confidentially and is not shared.</p>
        <h2>Information Distribution</h2>
        <p>JVL will never wilfully disclose personally identifiable information to a third party without your permission, except as required by law.</p>
        <h2>Contact</h2>
        <p>Questions or concerns may be directed to <a href="mailto:privacy@jvl.ca">privacy@jvl.ca</a>.</p>
      `}
    />
    </>
  )
}
