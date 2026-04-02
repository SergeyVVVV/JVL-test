import type { Block } from 'payload'

export const GalleryBlock: Block = {
  slug: 'gallery',
  labels: { singular: 'Gallery', plural: 'Galleries' },
  fields: [
    { name: 'headline', type: 'text' },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'carousel',
      options: [
        { label: 'Carousel', value: 'carousel' },
        { label: 'Grid', value: 'grid' },
        { label: 'Masonry', value: 'masonry' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'mediaUrl', type: 'text', label: 'Image or Video URL', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
  ],
}
