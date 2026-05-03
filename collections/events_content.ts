import type { GlobalConfig } from 'payload';

const eventsContent: GlobalConfig = {
  slug: 'events_content',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Page Content',
  },
  fields: [
    {
      name: 'hero_section',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'featured_event',
          type: 'relationship',
          relationTo: 'events',
          label: 'Featured Event',
          admin: {
            description: 'Select an event to display in the hero section',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          defaultValue: 'UPCOMING FORUM',
          localized: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero Image',
          admin: {
            description: 'Upload a custom image. If empty, will use the featured event image.',
          },
        },
        {
          name: 'buttons',
          type: 'array',
          label: 'Buttons',
          labels: {
            singular: 'Button',
            plural: 'Buttons',
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Button Text',
              required: true,
              localized: true,
            },
            {
              name: 'style',
              type: 'select',
              label: 'Button Style',
              required: true,
              options: [
                { label: 'Primary (Green)', value: 'primary' },
                { label: 'Secondary (White Outline)', value: 'secondary' },
              ],
              defaultValue: 'primary',
            },
            {
              name: 'show_arrow',
              type: 'checkbox',
              label: 'Show Arrow Icon',
              defaultValue: false,
            },
          ],
        },
      ],
    },
    {
      name: 'key_dates_section',
      type: 'group',
      label: 'Key Dates Section',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          defaultValue: 'IMPORTANT DATES',
          localized: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          defaultValue: 'Key dates & Deadlines',
          localized: true,
        },
      ],
    },
    {
      name: 'thematic_areas_section',
      type: 'group',
      label: 'Thematic Areas Section',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          defaultValue: 'Programme',
          localized: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          defaultValue: 'Thematic Areas',
          localized: true,
        },
        {
          name: 'items',
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
      ],
    },
    {
      name: 'speakers_section',
      type: 'group',
      label: 'Featured Speakers Section',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          defaultValue: 'Keynote Speakers',
          localized: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          defaultValue: 'Featured Speakers',
          localized: true,
        },
        {
          name: 'speakers',
          type: 'array',
          label: 'Speakers',
          labels: {
            singular: 'Speaker',
            plural: 'Speakers',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Name',
              required: true,
              localized: true,
            },
            {
              name: 'role',
              type: 'text',
              label: 'Role / Position',
              required: true,
              localized: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Photo',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
              required: true,
              localized: true,
            },
            {
              name: 'social_links',
              type: 'group',
              label: 'Social Links',
              fields: [
                {
                  name: 'x',
                  type: 'text',
                  label: 'X (Twitter) URL',
                },
                {
                  name: 'linkedin',
                  type: 'text',
                  label: 'LinkedIn URL',
                },
                {
                  name: 'facebook',
                  type: 'text',
                  label: 'Facebook URL',
                },
                {
                  name: 'telegram',
                  type: 'text',
                  label: 'Telegram URL',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'sessions_section',
      type: 'group',
      label: 'Sessions Section',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          defaultValue: 'Session',
          localized: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          defaultValue: 'Sessions',
          localized: true,
        },
        {
          name: 'items',
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
    },
    {
      name: 'registration_section',
      type: 'group',
      label: 'Registration Section',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          defaultValue: 'Participate',
          localized: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          defaultValue: 'Registration',
          localized: true,
        },
        {
          name: 'left_box',
          type: 'group',
          label: 'Left Box',
          fields: [
            {
              name: 'icon',
              type: 'select',
              label: 'Icon',
              options: [
                { label: 'Document Green', value: 'document_green.png' },
                { label: 'Document Yellow', value: 'document_yellow.png' },
              ],
              defaultValue: 'document_green.png',
            },
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
            {
              name: 'button_text',
              type: 'text',
              label: 'Button Text',
              required: true,
              localized: true,
            },
          ],
        },
        {
          name: 'right_box',
          type: 'group',
          label: 'Right Box',
          fields: [
            {
              name: 'icon',
              type: 'select',
              label: 'Icon',
              options: [
                { label: 'Document Green', value: 'document_green.png' },
                { label: 'Document Yellow', value: 'document_yellow.png' },
              ],
              defaultValue: 'document_yellow.png',
            },
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
            {
              name: 'button_text',
              type: 'text',
              label: 'Button Text',
              required: true,
              localized: true,
            },
          ],
        },
      ],
    },
    {
      name: 'past_events_section',
      type: 'group',
      label: 'Past Events Section',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          defaultValue: 'Archive',
          localized: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          defaultValue: 'Past Events',
          localized: true,
        },
        {
          name: 'view_all_text',
          type: 'text',
          label: 'View All Text',
          defaultValue: 'View all past events',
          localized: true,
        },
      ],
    },
  ],
};

export default eventsContent;
