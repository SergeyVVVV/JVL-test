import ContactForm from '@/components/ContactForm'

export async function generateMetadata() {
  return {
    title: 'Contact Us — JVL',
    description: 'Contact us with any questions — we\'re here to help. Whether it\'s about partnerships, our cabinets and games, or just to say hello.',
  }
}

export default function ContactUsPage() {
  return (
    <main id="contact-page" style={{ background: '#080a0b', color: '#F4F3EC', fontFamily: 'inherit', minHeight: '100vh', marginTop: -124 }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '204px 6vw 120px' }}>

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
