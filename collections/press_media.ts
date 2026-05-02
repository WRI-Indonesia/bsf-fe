import type { CollectionConfig } from 'payload';

const pressMedia: CollectionConfig = {
  slug: 'press_media',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Media',
    useAsTitle: 'title',
    defaultColumns: ['title', 'source_name', 'date', 'updatedAt'],
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Thumbnail Image',
      required: true,
    },
    {
      name: 'source_logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Source Logo',
      required: true,
    },
    {
      name: 'source_name',
      type: 'text',
      label: 'Source Name',
      required: true,
      localized: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      localized: true,
    },
    {
      name: 'date',
      type: 'date',
      label: 'Date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMMM yyyy',
        },
      },
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'Article Content',
      localized: true,
    },
    {
      name: 'related_press',
      type: 'relationship',
      relationTo: 'press_media',
      label: 'Related Press Releases',
      hasMany: true,
      admin: {
        description: 'Select related press releases to display in the sidebar.',
      },
    },
  ],
};

export default pressMedia;
