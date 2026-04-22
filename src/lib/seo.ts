export const BASE_URL = 'https://www.jvl.ca'
export const DEFAULT_OG_IMAGE = `${BASE_URL}/api/storage/3692/1.jpg`

export function buildMeta({
  title,
  description,
  path,
  ogImage,
  type = 'website',
  publishedTime,
}: {
  title: string
  description: string
  path: string
  ogImage?: string | null
  type?: 'website' | 'article'
  publishedTime?: string | null
}) {
  const url = `${BASE_URL}${path}`
  const image = ogImage
    ? ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`
    : DEFAULT_OG_IMAGE
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'JVL',
      images: [{ url: image }],
      type,
      ...(publishedTime ? { publishedTime } : {}),
    },
  }
}
