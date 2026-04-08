import mysql from 'mysql2/promise'

let pool: mysql.Pool | null = null

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.LARAVEL_DB_HOST || 'localhost',
      port: parseInt(process.env.LARAVEL_DB_PORT || '3306'),
      database: process.env.LARAVEL_DB_DATABASE || 'jvl_dev',
      user: process.env.LARAVEL_DB_USERNAME || 'jvl',
      password: process.env.LARAVEL_DB_PASSWORD || '',
      waitForConnections: true,
      connectionLimit: 5,
    })
  }
  return pool
}

export interface LandingBlock {
  id: number
  title: string | null
  tag_label: string | null
  text: string | null
  button_text: string | null
  button_url: string | null
  second_title: string | null
  price: string | null
  type: string
}

/** Parse a JSON-encoded multilingual field, return the `en` value */
function parseLocale(raw: string | null, locale = 'en'): string | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    return parsed[locale] ?? parsed['en'] ?? null
  } catch {
    return raw
  }
}

/** Get a landing block by type from the unified landing_blocks table */
export async function getLandingBlock(type: string, locale = 'en'): Promise<LandingBlock | null> {
  try {
    const db = getPool()
    const [rows] = await db.execute(
      'SELECT id, title, tag_label, text, button_text, button_url, second_title, price FROM landing_blocks WHERE type = ? AND active = 1 LIMIT 1',
      [type]
    )
    const row = (rows as any[])[0]
    if (!row) return null
    return {
      id: row.id,
      title: parseLocale(row.title, locale),
      tag_label: parseLocale(row.tag_label, locale),
      text: parseLocale(row.text, locale),
      button_text: parseLocale(row.button_text, locale),
      button_url: row.button_url,
      second_title: parseLocale(row.second_title, locale),
      price: row.price,
      type,
    }
  } catch {
    return null
  }
}

/** Get a media file URL (served via /api/storage) for a Laravel MediaLibrary record */
export async function getMediaUrl(
  modelType: string,
  modelId: number,
  collection: string
): Promise<string | null> {
  try {
    const db = getPool()
    const [rows] = await db.execute(
      'SELECT id, file_name FROM media WHERE model_type = ? AND model_id = ? AND collection_name = ? LIMIT 1',
      [modelType, modelId, collection]
    )
    const media = (rows as any[])[0]
    if (!media) return null
    return `/api/storage/${media.id}/${media.file_name}`
  } catch {
    return null
  }
}
