import { getLandingBlock, getMediaUrl, getPageMeta } from '@/lib/db'
import { buildMeta, BASE_URL } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import { buildBreadcrumb, buildProduct, buildFAQ, buildGraph } from '@/lib/jsonld'
import EchoHomeClient from './EchoHomeClient'

export const revalidate = 300

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const meta = await getPageMeta('echo', locale)
  const title = 'JVL Echo HD3 — Premium Home Arcade Machine'
  const description = 'Bring the arcade feeling home with JVL ECHO HD3 — a premium 22" touchscreen bartop arcade machine with 149 built-in games, no Wi-Fi, no downloads, and JVL warranty support.'
  return {
    ...buildMeta({ title, description, path: '/en/echo-1', ogImage: meta?.ogImage }),
    robots: { index: false, follow: false },
  }
}

export default async function EchoPage1Page() {
  const [heroBlock, superBlock, productBlock] = await Promise.all([
    getLandingBlock('top_landing_block'),
    getLandingBlock('superiority_landing_block'),
    getLandingBlock('premium_purchase_landing_block'),
  ])

  const [desktopVideo, desktopPoster, mobileVideo, mobilePoster, superImage, productImage] = await Promise.all([
    heroBlock ? getMediaUrl('App\\Models\\TopLandingBlock', heroBlock.id, 'desktop_video') : null,
    heroBlock ? getMediaUrl('App\\Models\\TopLandingBlock', heroBlock.id, 'desktop_poster') : null,
    heroBlock ? getMediaUrl('App\\Models\\TopLandingBlock', heroBlock.id, 'phone_video') : null,
    heroBlock ? getMediaUrl('App\\Models\\TopLandingBlock', heroBlock.id, 'phone_poster') : null,
    superBlock ? getMediaUrl('App\\Models\\SuperiorityLandingBlock', superBlock.id, 'desktop_image') : null,
    productBlock ? getMediaUrl('App\\Models\\PremiumPurchaseLandingBlock', productBlock.id, '3d_poster') : null,
  ])

  const data = {
    hero: {
      title: heroBlock?.title ?? 'ECHO HD3 – PREMIUM TABLETOP ARCADE MACHINE FOR YOUR HOME',
      buttonText: heroBlock?.button_text ?? 'Explore on Amazon',
      buttonUrl: heroBlock?.button_url ?? 'https://www.amazon.com/dp/B0DJ3BSJ4D',
      desktopVideo,
      desktopPoster,
      mobileVideo,
      mobilePoster,
    },
    countertop: {
      tagLabel: superBlock?.tag_label ?? 'Countertop Classics',
      title: superBlock?.title ?? 'THE ULTIMATE HOME ARCADE MACHINE WITH BUILT-IN GAMES',
      image: superImage,
    },
    product: {
      title: productBlock?.title ?? 'PREMIUM HOME ARCADE MACHINE – BACKED BY AMAZON & JVL WARRANTY',
      image: productImage,
      buttonText: productBlock?.button_text ?? 'Explore on Amazon',
      buttonUrl: productBlock?.button_url ?? 'https://www.amazon.com/dp/B0DJ3BSJ4D',
    },
  }

  const pageUrl = `${BASE_URL}/en/echo-1`
  const faqItems = [
    { q: 'How long does setup actually take?', a: 'About 10 minutes — mostly unboxing. Plug in the power cord, insert the USB stick, and you\'re playing. No account required, no internet needed, no technical knowledge assumed.' },
    { q: 'Will it fit on my counter?', a: 'ECHO\'s footprint is 15" × 19.5" × 18.5". It sits comfortably on a kitchen counter, bar cart, or games room table — without taking over the surface.' },
    { q: 'Does it need internet?', a: 'No. ECHO is 100% offline. All 149 games are built in and run locally. No subscription, no streaming, no Wi-Fi required — ever.' },
    { q: 'Can I keep kids out of the Adult category?', a: 'Yes. The Adult category is locked with a physical key included with the machine. You can also disable it entirely, or set a schedule. Kids cannot bypass it.' },
    { q: 'How is ECHO different from a full-size arcade cabinet?', a: 'A full-size cabinet can take up 8+ square feet of floor space. ECHO sits on your counter, weighs a fraction of the price, and delivers the same game variety without needing a dedicated room.' },
    { q: 'Are the games licensed classics?', a: 'No — ECHO\'s 149 games are proprietary JVL titles built and refined over 40+ years. They include original card games, arcade-style action titles, trivia, puzzle games, and more.' },
    { q: 'Is it loud? Can I control volume?', a: 'ECHO has a 25-watt, 4-speaker audio system with fully adjustable volume. You can bring it up for a party or dial it down for a quiet evening.' },
    { q: 'What if a game glitches or something fails with the hardware?', a: 'Call, chat, or email JVL — a real person from our team will help you. ECHO is covered by a 1-year all-inclusive warranty. If something needs fixing, we fix it — and we cover shipping both ways.' },
    { q: 'Is there a two-player mode?', a: 'Yes. Many games support two-player mode, and the 360° swivel base makes it easy to pass turns and share the screen — whether it\'s two kids or two adults at the kitchen table.' },
    { q: 'What languages does it support?', a: 'ECHO supports English, Spanish, Italian, French, German, Polish, and Russian.' },
    { q: 'Can older parents or younger kids use it?', a: 'Yes. The touchscreen interface requires no login, no controller, and no instructions. If you can tap a screen, you can play. We\'ve seen 6-year-olds and 80-year-olds both figure it out independently.' },
    { q: 'What\'s the difference between ECHO Home and ECHO Commercial?', a: 'ECHO Home is designed for free-play in a private setting — no coin or bill acceptor. ECHO Commercial adds a bill acceptor and coin mechanism for venues that charge per play. Same screen, same games, different payment setup.' },
  ]
  const jsonLd = buildGraph([
    buildBreadcrumb(pageUrl, [
      { name: 'Home', item: `${BASE_URL}/en` },
      { name: 'Echo HD3', item: pageUrl },
    ]),
    buildProduct({
      url: pageUrl,
      name: 'JVL Echo HD3',
      description: 'Bring the arcade feeling home with JVL ECHO HD3 — a premium 22" touchscreen bartop arcade machine with 149 built-in games, no Wi-Fi, no downloads, and JVL warranty support.',
      image: `${BASE_URL}/api/storage/3797/jvl-echo-frontside-view.png`,
      price: process.env.ECHO_PRICE_B2C ?? '3990',
      priceCurrency: process.env.ECHO_PRICE_CURRENCY ?? 'USD',
      offerUrl: 'https://www.amazon.com/dp/B0DJ3BSJ4D',
    }),
    buildFAQ(pageUrl, faqItems),
  ])

  return (
    <>
      <JsonLd data={jsonLd} />
      <EchoHomeClient data={data} />
    </>
  )
}
