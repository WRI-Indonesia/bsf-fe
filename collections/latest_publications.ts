import type { CollectionConfig } from 'payload';

const latestPublications: CollectionConfig = {
  slug: 'latest_publications',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'meta',
      type: 'text',
    },
    {
      name: 'tag',
      type: 'text',
    },
    {
      name: 'tagBg',
      type: 'text',
    },
    {
      name: 'tagText',
      type: 'text',
    },
  ],
};

export default latestPublications;
