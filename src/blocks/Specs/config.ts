import type { Block } from 'payload'

export const SpecsBlock: Block = {
  slug: 'specs',
  labels: { singular: 'Specs', plural: 'Specs Sections' },
  fields: [
    { name: 'headline', type: 'text' },
    {
      name: 'groups',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        {
          name: 'rows',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'value', type: 'text', required: true },
          ],
        },
      ],
    },
  ],
}
