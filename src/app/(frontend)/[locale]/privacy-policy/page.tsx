import LegalLayout, { pStyle, ulStyle } from '@/components/LegalLayout'

export async function generateMetadata() {
  return {
    title: 'Privacy Policy — JVL',
    description: 'Learn how JVL collects, uses, and protects your personal information.',
  }
}

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      badge="Legal"
      title="Privacy Policy"
      lastUpdated="January 1, 2025"
      sections={[
        {
          heading: '1. Introduction',
          content: (
            <p style={pStyle}>
              JVL Systems Inc. (&quot;JVL&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to
              protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard
              your information when you visit our website jvl.ca (the &quot;Site&quot;) or communicate with us.
              Please read this policy carefully. If you disagree with its terms, please discontinue use of the Site.
            </p>
          ),
        },
        {
          heading: '2. Information We Collect',
          content: (
            <>
              <p style={pStyle}>We may collect the following types of information:</p>
              <ul style={ulStyle}>
                <li>
                  <strong style={{ color: '#F4F3EC' }}>Personal Information</strong> — name, email address,
                  phone number, mailing address, and other identifiers you voluntarily provide when filling
                  out contact forms, warranty registrations, or other submissions.
                </li>
                <li>
                  <strong style={{ color: '#F4F3EC' }}>Device &amp; Usage Data</strong> — IP address, browser
                  type, operating system, referring URLs, pages visited, and time spent on the Site, collected
                  automatically via cookies and similar tracking technologies.
                </li>
                <li>
                  <strong style={{ color: '#F4F3EC' }}>Communications</strong> — the content of messages you
                  send us through contact forms or by email.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: '3. How We Use Your Information',
          content: (
            <>
              <p style={pStyle}>We use the information we collect to:</p>
              <ul style={ulStyle}>
                <li>Respond to your inquiries, requests, and warranty registrations.</li>
                <li>Provide, operate, and improve the Site and our services.</li>
                <li>Send administrative communications, such as confirmations and technical notices.</li>
                <li>Send marketing communications where you have consented to receive them.</li>
                <li>Analyze usage patterns and trends to enhance user experience.</li>
                <li>Comply with legal obligations and enforce our Terms of Use.</li>
              </ul>
            </>
          ),
        },
        {
          heading: '4. Sharing of Information',
          content: (
            <>
              <p style={pStyle}>
                We do not sell, trade, or rent your personal information to third parties. We may share your
                information in the following limited circumstances:
              </p>
              <ul style={ulStyle}>
                <li>
                  <strong style={{ color: '#F4F3EC' }}>Service Providers</strong> — trusted third-party vendors
                  who assist us in operating the Site and conducting our business, subject to confidentiality agreements.
                </li>
                <li>
                  <strong style={{ color: '#F4F3EC' }}>Legal Requirements</strong> — when required by law,
                  regulation, or valid legal process.
                </li>
                <li>
                  <strong style={{ color: '#F4F3EC' }}>Business Transfers</strong> — in connection with a merger,
                  acquisition, or sale of all or a portion of our assets.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: '5. Cookies & Tracking Technologies',
          content: (
            <>
              <p style={pStyle}>
                The Site uses cookies and similar technologies to enhance your experience, analyse traffic, and
                remember your preferences. Cookies are small data files stored on your device.
              </p>
              <p style={pStyle}>
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                However, some features of the Site may not function properly without cookies.
              </p>
            </>
          ),
        },
        {
          heading: '6. Data Retention',
          content: (
            <p style={pStyle}>
              We retain personal information only for as long as necessary to fulfil the purposes outlined in
              this policy, unless a longer retention period is required or permitted by law. When personal
              information is no longer needed, we securely delete or anonymise it.
            </p>
          ),
        },
        {
          heading: '7. Your Rights',
          content: (
            <>
              <p style={pStyle}>
                Depending on your jurisdiction, you may have the following rights regarding your personal information:
              </p>
              <ul style={ulStyle}>
                <li>The right to access the personal information we hold about you.</li>
                <li>The right to request correction of inaccurate or incomplete information.</li>
                <li>The right to request deletion of your personal information.</li>
                <li>The right to withdraw consent for marketing communications at any time.</li>
                <li>The right to lodge a complaint with a supervisory authority.</li>
              </ul>
              <p style={pStyle}>
                To exercise any of these rights, please contact us using the details in Section 10.
              </p>
            </>
          ),
        },
        {
          heading: '8. Security',
          content: (
            <p style={pStyle}>
              We implement reasonable technical and organisational measures to protect your personal information
              against unauthorised access, alteration, disclosure, or destruction. However, no method of
              transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee
              absolute security.
            </p>
          ),
        },
        {
          heading: '9. Third-Party Links',
          content: (
            <p style={pStyle}>
              The Site may contain links to third-party websites. We are not responsible for the privacy
              practices or content of those sites. We encourage you to review the privacy policies of any
              third-party sites you visit.
            </p>
          ),
        },
        {
          heading: '10. Changes to This Policy',
          content: (
            <p style={pStyle}>
              We may update this Privacy Policy from time to time. We will indicate the date of the most recent
              revision at the top of this page. We encourage you to review this policy periodically to stay
              informed about how we protect your information.
            </p>
          ),
        },
        {
          heading: '11. Contact Us',
          content: (
            <p style={pStyle}>
              If you have questions, concerns, or requests regarding this Privacy Policy or our data practices,
              please contact us at{' '}
              <a href="mailto:info@jvl.ca" style={{ color: '#059FFF', textDecoration: 'none' }}>info@jvl.ca</a>
              {' '}or through our{' '}
              <a href="/en/contact-us" style={{ color: '#059FFF', textDecoration: 'none' }}>Contact page</a>.
            </p>
          ),
        },
      ]}
    />
  )
}
