import type { Block } from 'payload'

export const FeatureGridBlock: Block = {
  slug: 'feature-grid',
  labels: { singular: 'Feature Grid', plural: 'Feature Grids' },
  fields: [
    { name: 'tagLabel', type: 'text' },
    { name: 'headline', type: 'text', required: true },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: ['2', '3', '4'].map(v => ({ label: `${v} Columns`, value: v })),
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'icon', type: 'text', label: 'Icon (emoji or class)' },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
      ],
    },
  ],
}
