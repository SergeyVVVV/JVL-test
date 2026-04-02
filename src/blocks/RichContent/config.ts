import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const RichContentBlock: Block = {
  slug: 'rich-content',
  labels: { singular: 'Rich Content', plural: 'Rich Content Blocks' },
  fields: [
    { name: 'content', type: 'richText', editor: lexicalEditor(), required: true },
    {
      name: 'maxWidth',
      type: 'select',
      defaultValue: 'wide',
      options: [
        { label: 'Narrow', value: 'narrow' },
        { label: 'Wide', value: 'wide' },
        { label: 'Full', value: 'full' },
      ],
    },
  ],
}
