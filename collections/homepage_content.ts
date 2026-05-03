import type { GlobalConfig } from 'payload';

const homepageContent: GlobalConfig = {
  slug: 'homepage_content',
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
          name: 'subtitle',
          type: 'textarea',
          label: 'Subtitle',
          defaultValue: 'A hub for community to get the biodiversity science updates around ACB.',
          localized: true,
        },
        {
          name: 'register_cta',
          type: 'text',
          label: 'Register CTA Text',
          defaultValue: 'Register Now',
          localized: true,
        },
        {
          name: 'explore_cta',
          type: 'text',
          label: 'Explore CTA Text',
          defaultValue: 'Explore Publications',
          localized: true,
        },
      ],
    },
    {
      name: 'about_section',
      type: 'group',
      label: 'About Section',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'ABOUT THE FORUM',
          localized: true,
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: 'A space for biodiversity science, collaboration, and knowledge exchange.',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'The Biodiversity Science Forum brings together researches, practitioners, institutions, and decision-makers to strengthen dialogue, biodiversity conservation across the ASEAN region',
          localized: true,
        },
        {
          name: 'boxes',
          type: 'array',
          label: 'Feature Boxes',
          labels: {
            singular: 'Box',
            plural: 'Boxes',
          },
          fields: [
            {
              name: 'icon',
              type: 'select',
              label: 'Icon',
              required: true,
              options: [
                { label: 'Globe', value: 'globe' },
                { label: 'Stakeholder', value: 'stakeholder' },
                { label: 'Book', value: 'book' },
                { label: 'Bulb', value: 'bulb' },
              ],
              defaultValue: 'globe',
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
          ],
        },
      ],
    },
  {
    name: 'upcoming_forum_section',
    type: 'group',
    label: 'Upcoming Forum Section',
    fields: [
      {
        name: 'featured_event',
        type: 'relationship',
        relationTo: 'events',
        label: 'Upcoming Forum Event',
      },
      {
        name: 'register_cta',
        type: 'text',
        label: 'Register CTA Text',
        defaultValue: 'Register Now',
        localized: true,
      },
      {
        name: 'view_program_cta',
        type: 'text',
        label: 'View Program CTA Text',
        defaultValue: 'View Program',
        localized: true,
      },
    ]
    },
    {
      name: 'publications_section',
      type: 'group',
      label: 'Publications Section',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Latest Publication',
          localized: true,
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Recent Knowledge Products',
          localized: true,
        },
        {
          name: 'view_all_text',
          type: 'text',
          defaultValue: 'View all publications →',
          localized: true,
        },
        {
          name: 'download_cta',
          type: 'text',
          label: 'Download CTA Text',
          defaultValue: 'Download',
          localized: true,
        },
      ],
    },
    {
      name: 'contact_section',
      type: 'group',
      label: 'Contact Section',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Contact Us',
          localized: true,
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Get in touch with the BSF team',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: "Whether you're interested in partnerships, have questions about the forum, or want to contribute to biodiversity science, we'd love to hear from you.",
          localized: true,
        },
        {
          name: 'contact_items',
          type: 'array',
          label: 'Contact Items',
          labels: {
            singular: 'Contact Item',
            plural: 'Contact Items',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
              localized: true,
            },
            {
              name: 'value',
              type: 'textarea',
              label: 'Value',
              required: true,
              localized: true,
            },
          ],
        },
        {
          name: 'form_name_placeholder',
          type: 'text',
          label: 'Form Name Placeholder',
          defaultValue: 'Your name',
          localized: true,
        },
        {
          name: 'form_email_placeholder',
          type: 'text',
          label: 'Form Email Placeholder',
          defaultValue: 'you@example.com',
          localized: true,
        },
        {
          name: 'form_subject_placeholder',
          type: 'text',
          label: 'Form Subject Placeholder',
          defaultValue: 'Add a subject',
          localized: true,
        },
        {
          name: 'form_message_placeholder',
          type: 'text',
          label: 'Form Message Placeholder',
          defaultValue: 'Write your message',
          localized: true,
        },
        {
          name: 'form_privacy_text',
          type: 'text',
          label: 'Form Privacy Text',
          defaultValue: 'Your request will be sent securely and remain private.',
          localized: true,
        },
        {
          name: 'form_submit_cta',
          type: 'text',
          label: 'Form Submit CTA',
          defaultValue: 'Send your message',
          localized: true,
        },
      ],
    },
  ],
};

export default homepageContent;
