import { getLandingBlock, getMediaUrl, getPageMeta } from '@/lib/db'
import { buildMeta, BASE_URL } from '@/lib/seo'
import EchoTwoClient from './EchoTwoClient'
import JsonLd from '@/components/JsonLd'
import { buildBreadcrumb, buildProduct, buildGraph } from '@/lib/jsonld'

export const revalidate = 300

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const meta = await getPageMeta('echo', locale)
  const title = 'Premium Home Arcade Machine | JVL ECHO HD3'
  const description = 'Bring the arcade feeling home with JVL ECHO HD3 — a premium 22" touchscreen bartop arcade machine with 149 built-in games, no Wi-Fi, no downloads, and JVL warranty support.'
  return {
    ...buildMeta({ title, description, path: '/en/echo-2', ogImage: meta?.ogImage }),
    robots: { index: true, follow: true },
  }
}

export default async function EchoPage2Page() {
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
      buttonText: productBlock?.button_text ?? 'Buy on Amazon',
      buttonUrl: productBlock?.button_url ?? 'https://www.amazon.com/dp/B0DJ3BSJ4D',
    },
  }

  const pageUrl = `${BASE_URL}/en/echo-2`
  const jsonLd = buildGraph([
    buildBreadcrumb(pageUrl, [
      { name: 'Home', item: `${BASE_URL}/en` },
      { name: 'Echo HD3', item: pageUrl },
    ]),
    buildProduct({
      url: pageUrl,
      name: 'JVL Echo HD3',
      description: 'Bring the arcade feeling home with JVL ECHO HD3 — a premium 22" touchscreen bartop arcade machine with 149 built-in games, no Wi-Fi, no downloads, and JVL warranty support.',
      image: `${BASE_URL}/api/storage/3522/194.jpg`,
      price: process.env.ECHO_PRICE_B2C ?? '3990',
      priceCurrency: process.env.ECHO_PRICE_CURRENCY ?? 'USD',
      offerUrl: 'https://www.amazon.com/JVL-Echo-Touchscreen-Arcade-Machine/dp/B0DJ3BSJ4D?maas=maas_adg_3E0066E64D67202DECABE629027A7FD0_afap_abs&ref_=aa_maas&tag=maas',
    }),
  ])

  return (
    <>
      <JsonLd data={jsonLd} />
      <EchoTwoClient data={data} />
    </>
  )
}
