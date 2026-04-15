import LegalLayout, { pStyle, ulStyle } from '@/components/LegalLayout'

export async function generateMetadata() {
  return {
    title: 'Terms of Use — JVL',
    description: 'Terms and conditions governing your use of the JVL website and services.',
  }
}

export default function TermsOfUsePage() {
  return (
    <LegalLayout
      badge="Legal"
      title="Terms of Use"
      lastUpdated="January 1, 2025"
      sections={[
        {
          heading: '1. Acceptance of Terms',
          content: (
            <>
              <p style={pStyle}>
                By accessing or using the JVL website located at jvl.ca (the &quot;Site&quot;), you agree to be bound
                by these Terms of Use (&quot;Terms&quot;). If you do not agree to these Terms, please do not use the Site.
              </p>
              <p style={pStyle}>
                JVL Systems Inc. (&quot;JVL&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) reserves the right to
                update or modify these Terms at any time without prior notice. Your continued use of the Site following
                any changes constitutes your acceptance of the revised Terms.
              </p>
            </>
          ),
        },
        {
          heading: '2. Use of the Site',
          content: (
            <>
              <p style={pStyle}>You agree to use the Site only for lawful purposes and in accordance with these Terms. You agree not to:</p>
              <ul style={ulStyle}>
                <li>Use the Site in any way that violates applicable federal, provincial, or international laws or regulations.</li>
                <li>Transmit any unsolicited or unauthorized advertising or promotional material.</li>
                <li>Attempt to gain unauthorized access to any portion of the Site or its related systems.</li>
                <li>Use any automated means to access the Site without our express written permission.</li>
                <li>Reproduce, duplicate, copy, sell, or exploit any portion of the Site without our written consent.</li>
              </ul>
            </>
          ),
        },
        {
          heading: '3. Intellectual Property',
          content: (
            <>
              <p style={pStyle}>
                The Site and all of its content — including but not limited to text, graphics, logos, images, audio
                clips, and software — are the property of JVL Systems Inc. or its content suppliers and are protected
                by Canadian and international copyright, trademark, and other intellectual property laws.
              </p>
              <p style={pStyle}>
                You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit
                any content from the Site without our prior written permission.
              </p>
            </>
          ),
        },
        {
          heading: '4. Disclaimer of Warranties',
          content: (
            <p style={pStyle}>
              The Site and its content are provided on an &quot;as is&quot; and &quot;as available&quot; basis without
              any warranties of any kind, either express or implied, including but not limited to implied warranties
              of merchantability, fitness for a particular purpose, or non-infringement. JVL does not warrant that
              the Site will be uninterrupted, error-free, or free of viruses or other harmful components.
            </p>
          ),
        },
        {
          heading: '5. Limitation of Liability',
          content: (
            <p style={pStyle}>
              To the fullest extent permitted by applicable law, JVL Systems Inc. shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages arising from your use of, or
              inability to use, the Site or its content — even if JVL has been advised of the possibility of
              such damages.
            </p>
          ),
        },
        {
          heading: '6. Third-Party Links',
          content: (
            <p style={pStyle}>
              The Site may contain links to third-party websites. These links are provided for your convenience only.
              JVL has no control over the content of those sites and accepts no responsibility for them or for any
              loss or damage that may arise from your use of them. Linking to any other site is at your own risk.
            </p>
          ),
        },
        {
          heading: '7. Online Games',
          content: (
            <p style={pStyle}>
              Demo versions of online games made available through the Site are provided for informational and
              entertainment purposes only. They do not involve real money and are intended solely to showcase
              JVL&apos;s gaming products to potential business partners and operators. Any actual deployment of
              games for real-money play is subject to separate licensing agreements and applicable gaming regulations.
            </p>
          ),
        },
        {
          heading: '8. Governing Law',
          content: (
            <p style={pStyle}>
              These Terms are governed by and construed in accordance with the laws of the Province of Ontario
              and the federal laws of Canada applicable therein, without regard to its conflict of law provisions.
              Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts
              located in Ontario, Canada.
            </p>
          ),
        },
        {
          heading: '9. Changes to These Terms',
          content: (
            <p style={pStyle}>
              We reserve the right to modify these Terms at any time. We will indicate the date of the most recent
              revision at the top of this page. It is your responsibility to check this page periodically for changes.
              Your continued use of the Site after changes are posted constitutes your acceptance of the updated Terms.
            </p>
          ),
        },
        {
          heading: '10. Contact Us',
          content: (
            <p style={pStyle}>
              If you have any questions about these Terms of Use, please contact us at{' '}
              <a href="mailto:info@jvl.ca" style={{ color: '#059FFF', textDecoration: 'none' }}>info@jvl.ca</a>
              {' '}or visit our{' '}
              <a href="/en/contact-us" style={{ color: '#059FFF', textDecoration: 'none' }}>Contact page</a>.
            </p>
          ),
        },
      ]}
    />
  )
}
