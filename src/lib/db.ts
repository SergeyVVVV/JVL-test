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

/** Get a landing block by type */
export async function getLandingBlock(type: string): Promise<{ id: number } | null> {
  try {
    const db = getPool()
    const tableName = typeToTable(type)
    const [rows] = await db.execute(
      `SELECT id FROM \`${tableName}\` WHERE type = ? LIMIT 1`,
      [type]
    )
    return (rows as any[])[0] || null
  } catch {
    return null
  }
}

function typeToTable(type: string): string {
  const map: Record<string, string> = {
    top_landing_block: 'top_landing_blocks',
    superiority_landing_block: 'superiority_landing_blocks',
    premium_purchase_landing_block: 'premium_purchase_landing_blocks',
    screens_landing_block: 'screens_landing_blocks',
    history_landing_block: 'history_landing_blocks',
    engineered_landing_block: 'engineered_landing_blocks',
    support_landing_block: 'support_landing_blocks',
  }
  return map[type] || type.replace(/_/g, '_') + 's'
}
