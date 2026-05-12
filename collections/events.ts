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
      name: 'key_dates',
      type: 'array',
      label: 'Key Dates',
      fields: [
        {
          name: 'date',
          type: 'date',
          required: true,
          label: 'Date',
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
          localized: true,
        },
        {
          name: 'show',
          type: 'checkbox',
          label: 'Show on website',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'thematic_areas',
      type: 'array',
      label: 'Thematic Areas',
      labels: {
        singular: 'Thematic Area',
        plural: 'Thematic Areas',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'sessions',
      type: 'array',
      label: 'Sessions',
      labels: {
        singular: 'Session',
        plural: 'Sessions',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
          localized: true,
        },
      ],
    },
  ],
}

export default events;
