import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const SplitSectionBlock: Block = {
  slug: 'split-section',
  labels: { singular: 'Split Section', plural: 'Split Sections' },
  fields: [
    { name: 'leftContent', type: 'richText', editor: lexicalEditor() },
    { name: 'rightContent', type: 'richText', editor: lexicalEditor() },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
        { label: 'Accent', value: 'accent' },
      ],
    },
  ],
}
