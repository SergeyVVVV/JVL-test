import { getLandingBlock, getMediaUrl, getPageMeta } from '@/lib/db'
import { buildMeta, BASE_URL } from '@/lib/seo'
import EchoPageClient from '../echo-1/EchoPageClient'
import JsonLd from '@/components/JsonLd'
import { buildBreadcrumb, buildProduct, buildGraph } from '@/lib/jsonld'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const meta = await getPageMeta('echo', locale)
  const title = meta?.title ?? 'JVL Echo HD3 — Premium Tabletop Arcade Machine'
  const description = meta?.metaDescription ?? meta?.description ?? 'The ultimate tabletop arcade machine for home and business. 40+ years of gaming excellence.'
  return buildMeta({ title, description, path: '/en/echo', ogImage: meta?.ogImage })
}

export default async function EchoPage() {
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
      title: heroBlock?.title ?? 'JVL ECHO HD3 – PREMIUM TABLETOP ARCADE MACHINE FOR HOME & BUSINESS',
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

  const pageUrl = `${BASE_URL}/en/echo`
  const jsonLd = buildGraph([
    buildBreadcrumb(pageUrl, [
      { name: 'Home', item: `${BASE_URL}/en` },
      { name: 'Echo HD3', item: pageUrl },
    ]),
    buildProduct({
      url: pageUrl,
      name: 'JVL Echo HD3',
      description: 'Premium countertop arcade machine for home and business with 149 built-in games and HD touchscreen.',
      image: `${BASE_URL}/api/storage/3522/194.jpg`,
    }),
  ])

  return (
    <>
      <JsonLd data={jsonLd} />
      <EchoPageClient data={data} />
    </>
  )
}
