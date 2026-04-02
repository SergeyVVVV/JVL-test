import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const MediaCopyBlock: Block = {
  slug: 'media-copy',
  labels: { singular: 'Media + Copy', plural: 'Media + Copy Sections' },
  fields: [
    {
      name: 'mediaPosition',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Media on Right', value: 'right' },
        { label: 'Media on Left', value: 'left' },
      ],
    },
    { name: 'tagLabel', type: 'text', label: 'Tag Label' },
    { name: 'headline', type: 'text', required: true },
    { name: 'body', type: 'richText', editor: lexicalEditor() },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'mediaType',
      type: 'select',
      defaultValue: 'image',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
      ],
    },
    {
      name: 'desktopImageUrl',
      type: 'text',
      label: 'Desktop Image URL',
    },
    {
      name: 'mobileImageUrl',
      type: 'text',
      label: 'Mobile Image URL',
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Video URL',
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
