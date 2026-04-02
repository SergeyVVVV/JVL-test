import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

// Import all block configs
import { HeroBlock } from '../blocks/Hero/config'
import { MediaCopyBlock } from '../blocks/MediaCopy/config'
import { SplitSectionBlock } from '../blocks/SplitSection/config'
import { FeatureGridBlock } from '../blocks/FeatureGrid/config'
import { ProductCardsBlock } from '../blocks/ProductCards/config'
import { SpecsBlock } from '../blocks/Specs/config'
import { FAQBlock } from '../blocks/FAQ/config'
import { CTABlock } from '../blocks/CTA/config'
import { TrustBlock } from '../blocks/Trust/config'
import { GalleryBlock } from '../blocks/Gallery/config'
import { ComparisonBlock } from '../blocks/Comparison/config'
import { RichContentBlock } from '../blocks/RichContent/config'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL slug, e.g. "echo", "flex", "games"' },
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', label: 'SEO Title' },
        { name: 'description', type: 'textarea', label: 'SEO Description' },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'OG Image' },
      ],
    },
    {
      name: 'sections',
      type: 'blocks',
      label: 'Page Sections',
      blocks: [
        HeroBlock,
        MediaCopyBlock,
        SplitSectionBlock,
        FeatureGridBlock,
        ProductCardsBlock,
        SpecsBlock,
        FAQBlock,
        CTABlock,
        TrustBlock,
        GalleryBlock,
        ComparisonBlock,
        RichContentBlock,
      ],
    },
  ],
}
