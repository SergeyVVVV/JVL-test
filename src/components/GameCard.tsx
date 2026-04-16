/**
 * Reusable game card — same style as GamesGrid cards.
 * Usage: <GameCard slug="..." image="..." title="..." locale="en" />
 */
interface Props {
  slug: string
  image: string | null | undefined
  title: string | null | undefined
  locale: string
}

export default function GameCard({ slug, image, title, locale }: Props) {
  return (
    <a
      href={`/${locale}/games/${slug}`}
      className="gc-card"
      style={{ display: 'block', textDecoration: 'none' }}
    >
      <div className="gc-card-img" style={{
        position: 'relative',
        background: '#101213',
        borderRadius: 4, overflow: 'hidden',
        aspectRatio: '3/4',
      }}>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={title ?? ''}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: '#181a1b' }} />
        )}
        <div className="gc-card-overlay" style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '60px 14px 18px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
          opacity: 0, transition: 'opacity 0.22s',
        }}>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#F4F3EC', textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.2 }}>
            {title}
          </p>
        </div>
      </div>

      <style>{`
        .gc-card:hover .gc-card-img { outline: 2px solid #FB671F; }
        .gc-card:hover .gc-card-overlay { opacity: 1 !important; }
      `}</style>
    </a>
  )
}
