import { NextResponse } from 'next/server'
import { getLandingBlock, getMediaUrl } from '@/lib/db'

export const dynamic = 'force-dynamic'

function parseLocale(raw: string | null, locale = 'en'): string {
  if (!raw) return ''
  try {
    const p = JSON.parse(raw)
    return p[locale] ?? p['en'] ?? ''
  } catch {
    return raw
  }
}

export async function GET() {
  try {
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

    return NextResponse.json({
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
        title: productBlock?.title ?? 'HOME ARCADE MACHINE FOR SALE – BACKED BY AMAZON & JVL WARRANTY',
        image: productImage,
        buttonText: productBlock?.button_text ?? 'Buy on Amazon',
        buttonUrl: productBlock?.button_url ?? 'https://www.amazon.com/dp/B0DJ3BSJ4D',
      },
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
