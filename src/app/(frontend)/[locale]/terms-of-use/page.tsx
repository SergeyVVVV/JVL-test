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
          heading: 'Agreement',
          content: (
            <p style={pStyle}>
              BY USING THIS SITE, YOU AGREE TO THESE TERMS OF USE AND OUR PRIVACY POLICY.
            </p>
          ),
        },
        {
          heading: '1. General',
          content: (
            <p style={pStyle}>
              JVL Labs Inc. owns and operates this website and retains the right to modify or discontinue any
              features at any time. The information and material on this site may be changed, withdrawn, or
              terminated at any time in our sole discretion without notice.
            </p>
          ),
        },
        {
          heading: '2. Your Use of the Site',
          content: (
            <ul style={ulStyle}>
              <li>You are responsible for obtaining the equipment and bearing the costs necessary to access and use this site.</li>
              <li>All the information you provide on the site must be correct, current, and complete. You are responsible for the security and accuracy of your account information.</li>
              <li>You transmit any information to or through this site at your own risk.</li>
              <li>You must not provide any other person with access to this site or portions of it using your username, password, or other security information.</li>
              <li>You must not frame this site or link to any page other than the homepage without our written permission.</li>
            </ul>
          ),
        },
        {
          heading: '3. Restrictions on Use',
          content: (
            <ul style={ulStyle}>
              <li>You may only use this site for lawful purposes. You may not post or transmit any material that is unlawful, threatening, abusive, defamatory, invasive of privacy or publicity rights.</li>
              <li>No copying, redistribution, retransmission, publication, or commercial exploitation of any content is permitted without our prior written permission.</li>
              <li>By submitting material to this site, you grant JVL a royalty-free, worldwide, perpetual, irrevocable, non-exclusive right and license to use, reproduce, modify, and distribute that material.</li>
              <li>You must not attempt to circumvent site security, gain unauthorized access, or introduce malicious software.</li>
              <li>JVL reserves the right to remove any content or terminate accounts at its sole discretion.</li>
            </ul>
          ),
        },
        {
          heading: '4. Disclaimer of Warranty; Limitation of Liability',
          content: (
            <ul style={ulStyle}>
              <li>This site is used AT YOUR SOLE RISK. We do not warrant uninterrupted or error-free service.</li>
              <li>This site is provided &quot;AS IS&quot; without warranties of any kind, either express or implied.</li>
              <li>IN NO EVENT WILL JVL BE LIABLE FOR ANY INCIDENTAL, SPECIAL, PUNITIVE, CONSEQUENTIAL, OR SIMILAR DAMAGES arising from your use of this site.</li>
              <li>This limitation applies to all damages regardless of their cause or the form of action.</li>
            </ul>
          ),
        },
        {
          heading: '5. Monitoring',
          content: (
            <p style={pStyle}>
              JVL reserves the right to monitor all content submitted to or through this site and to remove
              any material that violates these Terms of Use.
            </p>
          ),
        },
        {
          heading: '6. Indemnification',
          content: (
            <p style={pStyle}>
              You agree to defend, indemnify, and hold harmless JVL and its affiliates from and against any
              claims, damages, costs, and expenses (including legal fees) arising from your use of this site
              or your violation of these Terms.
            </p>
          ),
        },
        {
          heading: '7. Trademarks',
          content: (
            <p style={pStyle}>
              JVL retains all rights to its trademarks, logos, and graphic elements. All other marks
              referenced on this site belong to their respective owners.
            </p>
          ),
        },
        {
          heading: '8. No Reliance',
          content: (
            <p style={pStyle}>
              Content on this site is provided for general information purposes only. It is not intended to
              amount to advice on which you should rely. You must obtain professional advice before taking
              any action based on content from this site.
            </p>
          ),
        },
        {
          heading: '9. Third Party Content',
          content: (
            <p style={pStyle}>
              JVL does not endorse third-party opinions expressed on this site and assumes no responsibility
              for the content of external sites accessed through links on this site.
            </p>
          ),
        },
        {
          heading: '10. Changed Terms',
          content: (
            <p style={pStyle}>
              JVL may modify these Terms of Use at any time. Changes are effective immediately upon notice.
              Your continued use of the site following any changes constitutes your acceptance of the
              revised Terms.
            </p>
          ),
        },
        {
          heading: '11. Miscellaneous',
          content: (
            <p style={pStyle}>
              These Terms are governed by the laws of the Province of Ontario. If any provision of these
              Terms is found to be invalid or unenforceable, the remaining provisions shall continue in
              full force and effect.
            </p>
          ),
        },
        {
          heading: '12. Reporting',
          content: (
            <p style={pStyle}>
              To report any misuse of this site, please contact us at{' '}
              <a href="mailto:webmaster@jvl.ca" style={{ color: '#059FFF', textDecoration: 'none' }}>
                webmaster@jvl.ca
              </a>.
            </p>
          ),
        },
      ]}
    />
  )
}
