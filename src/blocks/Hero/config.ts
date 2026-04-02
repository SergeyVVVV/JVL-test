import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'full-video',
      options: [
        { label: 'Full Video', value: 'full-video' },
        { label: 'Centered', value: 'centered' },
        { label: 'Split', value: 'split' },
      ],
    },
    { name: 'headline', type: 'text', required: true },
    { name: 'subheadline', type: 'text' },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
          ],
        },
      ],
    },
    {
      name: 'desktopVideo',
      type: 'text',
      label: 'Desktop Video URL',
      admin: { description: 'Full URL to .mp4 file, e.g. https://www.jvl.ca/storage/3681/1.mp4' },
    },
    {
      name: 'mobileVideo',
      type: 'text',
      label: 'Mobile Video URL',
    },
    {
      name: 'desktopPoster',
      type: 'text',
      label: 'Desktop Poster Image URL',
    },
    {
      name: 'mobilePoster',
      type: 'text',
      label: 'Mobile Poster Image URL',
    },
  ],
}
