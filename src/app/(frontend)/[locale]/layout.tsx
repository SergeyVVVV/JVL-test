import Header from '@/components/Header'
import Footer from '@/components/Footer'

export function generateStaticParams() {
  return [{ locale: 'en' }]
}

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 124, background: '#F4F3EC' }}>{children}</main>
      <Footer />
    </>
  )
}
