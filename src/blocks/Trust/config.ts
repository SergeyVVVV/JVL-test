import type { Block } from 'payload'

export const TrustBlock: Block = {
  slug: 'trust',
  labels: { singular: 'Trust / Testimonial', plural: 'Trust Sections' },
  fields: [
    { name: 'headline', type: 'text' },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'stats',
      options: [
        { label: 'Stats', value: 'stats' },
        { label: 'Testimonials', value: 'testimonials' },
        { label: 'Logos', value: 'logos' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'stat', type: 'text', label: 'Stat / Quote / Logo URL' },
        { name: 'label', type: 'text', label: 'Label / Author / Company' },
      ],
    },
  ],
}
