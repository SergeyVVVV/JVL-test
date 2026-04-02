import type { Block } from 'payload'

export const CTABlock: Block = {
  slug: 'cta',
  labels: { singular: 'CTA', plural: 'CTA Sections' },
  fields: [
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'centered',
      options: [
        { label: 'Centered', value: 'centered' },
        { label: 'Banner', value: 'banner' },
        { label: 'Split', value: 'split' },
      ],
    },
    { name: 'headline', type: 'text', required: true },
    { name: 'subheadline', type: 'text' },
    {
      name: 'primaryCta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'secondaryCta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
        { label: 'Brand Blue', value: 'brand' },
      ],
    },
    {
      name: 'backgroundImageUrl',
      type: 'text',
      label: 'Background Image URL (optional)',
    },
  ],
}
