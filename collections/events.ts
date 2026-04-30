import type { CollectionConfig } from 'payload';

const events: CollectionConfig = {
  slug: 'events',
  access: {
    read: () => true,
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
    },
    {
      name: 'location',
      type: 'text',
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
    },
  ],
};

export default events;
