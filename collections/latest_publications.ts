import type { CollectionConfig } from 'payload';

const latestPublications: CollectionConfig = {
  slug: 'latest_publications',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'meta',
      type: 'text',
    },
    {
      name: 'tag',
      type: 'select',
      required: true,
      options: [
        { label: 'Policy brief', value: 'Policy brief' },
        { label: 'Proceedings', value: 'Proceedings' },
        { label: 'Publications', value: 'Publications' },
        { label: 'Technical Outputs', value: 'Technical Outputs' },
      ],
    },
  ],
}

export  default  latestPublications ;
