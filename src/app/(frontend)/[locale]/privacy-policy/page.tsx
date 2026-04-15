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
          heading: 'Our Commitment',
          content: (
            <p style={pStyle}>
              JVL is committed to protecting user privacy online, and we pledge to give you as much control
              as possible over your personal information.
            </p>
          ),
        },
        {
          heading: 'Information We Collect',
          content: (
            <>
              <p style={{ ...pStyle, fontWeight: 600, color: '#F4F3EC', marginBottom: 6 }}>IP Address</p>
              <p style={pStyle}>
                JVL logs IP addresses for system administration and server diagnostics. We track browser type,
                operating system, and referring IP address in aggregate form only, without linking addresses
                to personal identifiers.
              </p>

              <p style={{ ...pStyle, fontWeight: 600, color: '#F4F3EC', marginBottom: 6 }}>Usage</p>
              <p style={pStyle}>
                Interaction patterns are logged anonymously using session IDs only. We analyze what users
                search for and which site areas they visit, reviewing data in aggregated form exclusively.
              </p>

              <p style={{ ...pStyle, fontWeight: 600, color: '#F4F3EC', marginBottom: 6 }}>Registration</p>
              <p style={pStyle}>
                Required fields include full name, email, ZIP code, username, and password. Additional
                information such as age, address, phone, and employer is optional. Users may provide
                content for public posting at their own risk.
              </p>

              <p style={{ ...pStyle, fontWeight: 600, color: '#F4F3EC', marginBottom: 6 }}>Cookies</p>
              <p style={pStyle}>
                JVL uses a feature of your browser called a cookie to store your member ID and state
                information. Cookies store no personal information and are necessary for site functionality.
              </p>

              <p style={{ ...pStyle, fontWeight: 600, color: '#F4F3EC', marginBottom: 6 }}>Third Party Use of Cookies</p>
              <p style={pStyle}>
                Third-party advertisers and content providers may use tracking technologies. Users can
                opt out through provider websites, though this does not eliminate all advertising.
              </p>
            </>
          ),
        },
        {
          heading: 'Our Use of Your Information',
          content: (
            <p style={pStyle}>
              Information collected supports improved customer service and targeted communications with
              your permission. Financial information is held confidentially and is not shared.
            </p>
          ),
        },
        {
          heading: 'Information Distribution',
          content: (
            <p style={pStyle}>
              JVL will never wilfully disclose personally identifiable information to a third party without
              your permission. Exceptions include legal compliance, enforcement of our Terms of Use, and
              protecting the rights or safety of JVL or others.
            </p>
          ),
        },
        {
          heading: 'Links',
          content: (
            <p style={pStyle}>
              JVL is not responsible for the privacy practices of other websites. We encourage you to
              review the privacy policies of any external sites you visit.
            </p>
          ),
        },
        {
          heading: 'Opt-Out Features',
          content: (
            <p style={pStyle}>
              You may decline communications by contacting us at{' '}
              <a href="mailto:webmaster@jvl.ca" style={{ color: '#059FFF', textDecoration: 'none' }}>
                webmaster@jvl.ca
              </a>{' '}
              or by adjusting your registration settings.
            </p>
          ),
        },
        {
          heading: 'Security',
          content: (
            <p style={pStyle}>
              JVL uses firewalls, secure socket layers, and encryption to protect your information.
              Users are responsible for maintaining the security of their own passwords.
            </p>
          ),
        },
        {
          heading: 'Data Retention',
          content: (
            <p style={pStyle}>
              Personal information is retained only as long as necessary for the purposes for which
              it was collected.
            </p>
          ),
        },
        {
          heading: 'Accessing and Correcting Information',
          content: (
            <p style={pStyle}>
              You may request access to or correction of your personal information by contacting us at{' '}
              <a href="mailto:privacy@jvl.ca" style={{ color: '#059FFF', textDecoration: 'none' }}>
                privacy@jvl.ca
              </a>.
            </p>
          ),
        },
        {
          heading: 'Withdrawing Consent',
          content: (
            <p style={pStyle}>
              You may withdraw your consent for us to use your personal information at any time by
              contacting us at{' '}
              <a href="mailto:privacy@jvl.ca" style={{ color: '#059FFF', textDecoration: 'none' }}>
                privacy@jvl.ca
              </a>.
            </p>
          ),
        },
        {
          heading: 'Third Party Collectors',
          content: (
            <p style={pStyle}>
              We encourage users to review the privacy statements of any third parties that may collect
              information through our site.
            </p>
          ),
        },
        {
          heading: 'General',
          content: (
            <p style={pStyle}>
              Questions or concerns regarding our compliance with this Privacy Policy should be directed
              to our Privacy Officer at{' '}
              <a href="mailto:privacy@jvl.ca" style={{ color: '#059FFF', textDecoration: 'none' }}>
                privacy@jvl.ca
              </a>.
            </p>
          ),
        },
        {
          heading: 'Notification of Changes',
          content: (
            <p style={pStyle}>
              Any changes to this Privacy Policy will be posted on this page and communicated to users
              via email where appropriate.
            </p>
          ),
        },
      ]}
    />
  )
}
