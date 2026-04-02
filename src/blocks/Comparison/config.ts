import type { Block } from 'payload'

export const ComparisonBlock: Block = {
  slug: 'comparison',
  labels: { singular: 'Comparison', plural: 'Comparison Sections' },
  fields: [
    { name: 'headline', type: 'text' },
    { name: 'subheadline', type: 'text' },
    {
      name: 'products',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'mediaUrl', type: 'text' },
        {
          name: 'features',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'value', type: 'text' },
            { name: 'included', type: 'checkbox', defaultValue: true },
          ],
        },
      ],
    },
  ],
}
