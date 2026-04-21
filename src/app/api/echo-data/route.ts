import { NextResponse } from 'next/server'
import { getLandingBlock, getPool } from '@/lib/db'

export const dynamic = 'force-dynamic'

async function getMediaRaw(
  modelType: string,
  modelId: number,
  collection: string
): Promise<{ id: number; file_name: string; url: string } | null> {
  try {
    const db = getPool()
    const [rows] = await db.execute(
      'SELECT id, file_name FROM media WHERE model_type = ? AND model_id = ? AND collection_name = ? ORDER BY id DESC LIMIT 1',
      [modelType, modelId, collection]
    )
    const media = (rows as any[])[0]
    if (!media) return null
    return {
      id: media.id,
      file_name: media.file_name,
      url: `/api/storage/${media.id}/${media.file_name}`,
    }
  } catch {
    return null
  }
}

async function getAllMediaForModel(
  modelType: string,
  modelId: number
): Promise<Array<{ id: number; collection_name: string; file_name: string }>> {
  try {
    const db = getPool()
    const [rows] = await db.execute(
      'SELECT id, collection_name, file_name FROM media WHERE model_type = ? AND model_id = ? ORDER BY collection_name, id DESC',
      [modelType, modelId]
    )
    return rows as any[]
  } catch {
    return []
  }
}

export async function GET() {
  try {
    const [heroBlock, superBlock, productBlock] = await Promise.all([
      getLandingBlock('top_landing_block'),
      getLandingBlock('superiority_landing_block'),
      getLandingBlock('premium_purchase_landing_block'),
    ])

    const [desktopVideo, desktopPoster, mobileVideo, mobilePoster, superImage, productImage] =
      await Promise.all([
        heroBlock ? getMediaRaw('App\\Models\\TopLandingBlock', heroBlock.id, 'desktop_video') : null,
        heroBlock ? getMediaRaw('App\\Models\\TopLandingBlock', heroBlock.id, 'desktop_poster') : null,
        heroBlock ? getMediaRaw('App\\Models\\TopLandingBlock', heroBlock.id, 'phone_video') : null,
        heroBlock ? getMediaRaw('App\\Models\\TopLandingBlock', heroBlock.id, 'phone_poster') : null,
        superBlock
          ? getMediaRaw('App\\Models\\SuperiorityLandingBlock', superBlock.id, 'desktop_image')
          : null,
        productBlock
          ? getMediaRaw('App\\Models\\PremiumPurchaseLandingBlock', productBlock.id, '3d_poster')
          : null,
      ])

    // Fetch ALL media for the hero block to see the full picture
    const allHeroMedia = heroBlock
      ? await getAllMediaForModel('App\\Models\\TopLandingBlock', heroBlock.id)
      : []

    return NextResponse.json({
      debug: {
        heroBlockId: heroBlock?.id ?? null,
        superBlockId: superBlock?.id ?? null,
        productBlockId: productBlock?.id ?? null,
        desktopVideoMediaId: desktopVideo?.id ?? null,
        desktopPosterMediaId: desktopPoster?.id ?? null,
        mobileVideoMediaId: mobileVideo?.id ?? null,
        allHeroMedia,
      },
      hero: {
        title: heroBlock?.title ?? 'JVL ECHO HD3 – PREMIUM TABLETOP ARCADE MACHINE FOR HOME & BUSINESS',
        buttonText: heroBlock?.button_text ?? 'Explore on Amazon',
        buttonUrl: heroBlock?.button_url ?? 'https://www.amazon.com/dp/B0DJ3BSJ4D',
        desktopVideo: desktopVideo?.url ?? null,
        desktopPoster: desktopPoster?.url ?? null,
        mobileVideo: mobileVideo?.url ?? null,
        mobilePoster: mobilePoster?.url ?? null,
      },
      countertop: {
        tagLabel: superBlock?.tag_label ?? 'Countertop Classics',
        title:
          superBlock?.title ?? 'THE ULTIMATE HOME ARCADE MACHINE WITH BUILT-IN GAMES',
        image: superImage?.url ?? null,
      },
      product: {
        title:
          productBlock?.title ??
          'PREMIUM HOME ARCADE MACHINE – BACKED BY AMAZON & JVL WARRANTY',
        image: productImage?.url ?? null,
        buttonText: productBlock?.button_text ?? 'Buy on Amazon',
        buttonUrl: productBlock?.button_url ?? 'https://www.amazon.com/dp/B0DJ3BSJ4D',
      },
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
