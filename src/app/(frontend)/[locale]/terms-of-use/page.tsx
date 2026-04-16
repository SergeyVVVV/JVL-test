import { getStaticPage } from '@/lib/db'
import LegalLayout from '@/components/LegalLayout'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  return {
    title: 'Terms of Use — JVL',
    description: 'Terms and conditions governing your use of the JVL website and services.',
  }
}

export default async function TermsOfUsePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const page = await getStaticPage(4, locale)

  if (page?.content1) {
    return (
      <LegalLayout
        badge="Legal"
        title={page.title ?? 'Terms of Use'}
        lastUpdated={page.updatedAt ?? undefined}
        htmlContent={page.content1}
      />
    )
  }

  // Fallback to static content if CMS is unavailable
  return (
    <LegalLayout
      badge="Legal"
      title="Terms of Use"
      lastUpdated="January 1, 2025"
      htmlContent={`
        <h2>Agreement</h2>
        <p>BY USING THIS SITE, YOU AGREE TO THESE TERMS OF USE AND OUR PRIVACY POLICY.</p>
        <h2>1. General</h2>
        <p>JVL Labs Inc. owns and operates this website and retains the right to modify or discontinue any features at any time.</p>
        <h2>2. Your Use of the Site</h2>
        <ul>
          <li>You are responsible for obtaining the equipment and bearing the costs necessary to access and use this site.</li>
          <li>All the information you provide on the site must be correct, current, and complete.</li>
          <li>You transmit any information to or through this site at your own risk.</li>
        </ul>
        <h2>11. Miscellaneous</h2>
        <p>These Terms are governed by the laws of the Province of Ontario.</p>
        <h2>12. Reporting</h2>
        <p>To report any misuse of this site, please contact us at <a href="mailto:webmaster@jvl.ca">webmaster@jvl.ca</a>.</p>
      `}
    />
  )
}
