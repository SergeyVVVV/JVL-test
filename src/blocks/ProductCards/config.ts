import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const ProductCardsBlock: Block = {
  slug: 'product-cards',
  labels: { singular: 'Product Cards', plural: 'Product Cards Sections' },
  fields: [
    { name: 'headline', type: 'text' },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'subtitle', type: 'text' },
        { name: 'mediaUrl', type: 'text', label: 'Image or 3D Model URL' },
        { name: 'price', type: 'text', label: 'Price (e.g. $3,999)' },
        {
          name: 'features',
          type: 'array',
          fields: [
            { name: 'text', type: 'text' },
          ],
        },
        {
          name: 'cta',
          type: 'group',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'url', type: 'text' },
          ],
        },
      ],
    },
  ],
}
