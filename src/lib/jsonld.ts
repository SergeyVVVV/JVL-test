import { BASE_URL, DEFAULT_OG_IMAGE } from './seo'

const ORG_ID = `${BASE_URL}#organization`

export function buildOrganization() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'JVL',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/img/logo.svg`,
      width: 114,
      height: 30,
    },
    sameAs: [
      'https://www.linkedin.com/company/jvl-corporation/',
      'https://www.youtube.com/@JVLTube',
      'https://www.facebook.com/jvl.echo/',
      'https://www.instagram.com/jvl_echo/',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: `${BASE_URL}/en/contact-us`,
    },
  }
}

export function buildBreadcrumb(
  pageUrl: string,
  items: { name: string; item: string }[],
) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.item,
    })),
  }
}

export function buildWebPage({
  url,
  name,
  locale = 'en',
}: {
  url: string
  name: string
  locale?: string
}) {
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    inLanguage: locale,
    publisher: { '@id': ORG_ID },
    breadcrumb: { '@id': `${url}#breadcrumb` },
  }
}

export function buildCollectionPage({
  url,
  name,
  locale = 'en',
}: {
  url: string
  name: string
  locale?: string
}) {
  return {
    '@type': 'CollectionPage',
    '@id': `${url}#collectionPage`,
    url,
    name,
    inLanguage: locale,
    breadcrumb: { '@id': `${url}#breadcrumb` },
  }
}

export function buildVideoGame({
  url,
  title,
  description,
  genre,
  image,
  playUrl,
}: {
  url: string
  title: string
  description?: string | null
  genre?: string | null
  image?: string | null
  playUrl?: string | null
}) {
  return {
    '@type': 'VideoGame',
    '@id': `${url}#game`,
    name: title,
    url,
    ...(description ? { description } : {}),
    ...(genre ? { genre } : {}),
    image: image ?? DEFAULT_OG_IMAGE,
    applicationCategory: 'ArcadeGame',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    publisher: { '@id': ORG_ID },
    ...(playUrl
      ? {
          potentialAction: {
            '@type': 'PlayAction',
            name: 'Play Game',
            target: playUrl,
          },
        }
      : {}),
  }
}

export function buildBlogPosting({
  url,
  title,
  description,
  publishedAt,
  image,
}: {
  url: string
  title: string
  description?: string | null
  publishedAt?: string | null
  image?: string | null
}) {
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#BlogPosting`,
    mainEntityOfPage: url,
    headline: title,
    name: title,
    ...(description ? { description } : {}),
    ...(publishedAt ? { datePublished: publishedAt } : {}),
    image: image ?? DEFAULT_OG_IMAGE,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    url,
  }
}

export function buildProduct({
  url,
  name,
  description,
  image,
  price = '3990',
  priceCurrency = 'CAD',
}: {
  url: string
  name: string
  description?: string | null
  image?: string | null
  price?: string
  priceCurrency?: string
}) {
  return {
    '@type': 'Product',
    '@id': `${url}#product`,
    name,
    url,
    ...(description ? { description } : {}),
    image: image ?? DEFAULT_OG_IMAGE,
    brand: {
      '@type': 'Brand',
      name: 'JVL',
    },
    manufacturer: { '@id': ORG_ID },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency,
      availability: 'https://schema.org/InStock',
      url: 'https://www.amazon.com/dp/B0D7KQNLNC',
    },
  }
}

export function buildGraph(nodes: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  }
}
