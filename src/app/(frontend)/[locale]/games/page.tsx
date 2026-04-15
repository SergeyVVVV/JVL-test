import { getGamesList, getGameFilterTags, getPageIdBySlug, getSlides } from '@/lib/db'
import HomeHeroCarousel, { HeroSlide } from '@/components/HomeHeroCarousel'
import GamesGrid from '@/components/GamesGrid'

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

  // Carousel slides (configured in AdminLTE for the "games" page)
  let slides: HeroSlide[] = []
  if (pageId) {
    const raw = await getSlides(pageId, locale)
    slides = raw.map(s => ({
      bg:   s.desktopImage,
      heading: s.title ?? '',
      body:    s.description ?? '',
      cta: {
        text:     s.btnText   ?? 'View Game',
        href:     s.link      ?? `/${locale}/games`,
      },
    }))
  }

  const hasCarousel = slides.length > 0
  const topPad = hasCarousel ? '80px 6vw 0' : '204px 6vw 0'

  return (
    <main
      id="games-page"
      style={{ background: '#080a0b', color: '#F4F3EC', fontFamily: 'inherit', marginTop: -124, minHeight: '100vh' }}
    >
      {/* ── Hero carousel (if slides configured in CMS) ── */}
      {hasCarousel && <HomeHeroCarousel slides={slides} />}

      {/* ── Content section ── */}
      <section style={{ padding: '0 0 120px' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: topPad }}>

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
      </section>

      <style>{`
        /* Carousel height inside games page */
        #games-page .hp-hero { height: 65vh; min-height: 440px; }
        @media (max-width: 767px) {
          #games-page .hp-hero { height: 55vh; min-height: 320px; }
          #games-page .hp-hero-h1 { font-size: clamp(1.1rem, 5vw, 1.5rem) !important; }
          #games-page .hp-hero-ctas { flex-direction: column; align-items: flex-start; }
          .gg-title-br { display: none; }
        }
      `}</style>
    </main>
  )
}
