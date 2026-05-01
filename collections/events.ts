import type { CollectionConfig } from 'payload';

const events: CollectionConfig = {
  slug: 'events',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'date',
      type: 'date',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'location',
      type: 'text',
      localized: true,
    },
    {
      name: 'participants',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'article',
      type: 'richText',
      localized: true,
    },
    {
      name: 'description',
      type: 'text',
      localized: true,
    }
  ],
}

export default events;
