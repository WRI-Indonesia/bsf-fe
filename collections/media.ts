import type { CollectionConfig } from 'payload';

const media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip', 'application/x-zip-compressed'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
};

export default media