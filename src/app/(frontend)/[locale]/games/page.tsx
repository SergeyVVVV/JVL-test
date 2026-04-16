import { getGamesList, getGameFilterTags, getPageIdBySlug, getGameSliderSlides } from '@/lib/db'
import GamesHeroCarousel from '@/components/GamesHeroCarousel'
import GamesGrid from '@/components/GamesGrid'
import EchoBanner from '@/components/EchoBanner'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  return {
    title: 'Online Slot Games — JVL',
    description: 'Browse JVL\'s full collection of online slot games and video slots — crafted for casinos worldwide with 40+ years of gaming expertise.',
  }
}

const PER_PAGE = 24

export default async function GamesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  const [pageId, tags, initial] = await Promise.all([
    getPageIdBySlug('games'),
    getGameFilterTags(locale),
    getGamesList({ locale, perPage: PER_PAGE }),
  ])

  // Carousel: games configured in AdminLTE → Games Top Slider
  const gameSlides = pageId ? await getGameSliderSlides(pageId, locale) : []
  const hasCarousel = gameSlides.length > 0
  const topPad = hasCarousel ? '80px 6vw 0' : '204px 6vw 0'

  return (
    <main
      id="games-page"
      style={{ background: '#080a0b', color: '#F4F3EC', fontFamily: 'inherit', marginTop: -124, minHeight: '100vh' }}
    >
      {/* ── Hero carousel (games configured in AdminLTE) ── */}
      {hasCarousel && <GamesHeroCarousel slides={gameSlides} locale={locale} />}

      {/* ── Content section ── */}
      <section style={{ padding: '0 0 120px' }}>
        <div className="gp-top-inner" style={{ maxWidth: 1440, margin: '0 auto', padding: topPad }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Page header */}
          <p style={{
            fontSize: 13, fontWeight: 700, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: '#FB671F', margin: '0 0 14px',
          }}>
            Games
          </p>
          <h1 style={{
            fontFamily: 'inherit',
            fontSize: 'clamp(1.6rem, 3vw, 3rem)',
            fontWeight: 600, lineHeight: 1.1,
            letterSpacing: '-0.02em', textTransform: 'uppercase',
            color: '#F4F3EC', margin: '0 0 48px',
          }}>
            Online Slot Games<br className="gg-title-br" /> and Video Slots
          </h1>

          {/* Grid + filters */}
          <GamesGrid
            initialItems={initial.items}
            initialTotal={initial.total}
            themes={tags.themes}
            features={tags.features}
            volatility={tags.volatility}
            locale={locale}
            perPage={PER_PAGE}
          />
        </div>
        </div>
      </section>

      {/* ── Echo CTA Banner ── */}
      <section style={{ background: '#080a0b', padding: '0 0 96px' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 6vw' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <EchoBanner locale={locale} />
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 767px) {
          #games-page .gp-top-inner { padding-top: 164px !important; }
          .gg-title-br { display: none; }
        }
      `}</style>
    </main>
  )
}
