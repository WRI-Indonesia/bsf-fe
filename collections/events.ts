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
      name: 'start_date',
      type: 'date',
      required: true,
      label: 'Start Date',
    },
    {
      name: 'end_date',
      type: 'date',
      required: true,
      label: 'End Date',
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
    },
    {
      name: 'show_on_homepage',
      type: 'checkbox',
      label: 'Show on Homepage',
      defaultValue: false,
    },
    {
      name: 'key_date',
      type: 'date',
      label: 'Key Date',
    },
  ],
}

export default events;
