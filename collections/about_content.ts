import type { GlobalConfig } from 'payload';

const aboutContent: GlobalConfig = {
  slug: 'about_content',
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
          name: 'label',
          type: 'text',
          label: 'Label',
          defaultValue: 'ABOUT THE FORUM',
          localized: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          defaultValue: 'Advancing biodiversity science through regional collaboration',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          defaultValue: 'Join leading scientists, policy experts, and conservation practitioners for five days of keynotes, sessions, and collaborative workshops on the future of biodiversity in Southeast Asia.',
          localized: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero Image',
          admin: {
            description: 'Recommended size: 703x552px or similar aspect ratio. Image will be cropped to fill the container.',
          },
        },
      ],
    },
    {
      name: 'mission_section',
      type: 'group',
      label: 'Mission & Objectives Section',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          defaultValue: 'MISSION & OBJECTIVES',
          localized: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          defaultValue: 'Bridging science and policy for biodiversity action',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          defaultValue: "Whether you're interested in partnerships, have questions about the forum, or want to contribute to biodiversity science, we'd love to hear from you.",
          localized: true,
        },
        {
          name: 'read_more_text',
          type: 'text',
          label: 'Read More Text',
          defaultValue: 'Read full mission statement →',
          localized: true,
        },
        {
          name: 'objectives',
          type: 'array',
          label: 'Objectives',
          labels: {
            singular: 'Objective',
            plural: 'Objectives',
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
      name: 'milestones_section',
      type: 'group',
      label: 'Key Milestones Section',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          defaultValue: 'OUR JOURNEY',
          localized: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          defaultValue: 'Key Milestones',
          localized: true,
        },
        {
          name: 'milestones',
          type: 'array',
          label: 'Milestones',
          labels: {
            singular: 'Milestone',
            plural: 'Milestones',
          },
          fields: [
            {
              name: 'year',
              type: 'text',
              label: 'Year',
              required: true,
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
              localized: true,
            },
            {
              name: 'align_right',
              type: 'checkbox',
              label: 'Align Right',
              defaultValue: false,
            },
          ],
        },
      ],
    },
    {
      name: 'experts_section',
      type: 'group',
      label: 'Experts Section',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          defaultValue: 'SCIENTIFIC COMMITTEE',
          localized: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          defaultValue: 'Meet our Experts',
          localized: true,
        },
        {
          name: 'experts',
          type: 'array',
          label: 'Experts',
          labels: {
            singular: 'Expert',
            plural: 'Experts',
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
              admin: {
                description: 'Recommended: square image, e.g. 220x220px',
              },
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
                  admin: {
                    description: 'Leave empty to hide the icon',
                  },
                },
                {
                  name: 'facebook',
                  type: 'text',
                  label: 'Facebook URL',
                  admin: {
                    description: 'Leave empty to hide the icon',
                  },
                },
                {
                  name: 'linkedin',
                  type: 'text',
                  label: 'LinkedIn URL',
                  admin: {
                    description: 'Leave empty to hide the icon',
                  },
                },
                {
                  name: 'telegram',
                  type: 'text',
                  label: 'Telegram URL',
                  admin: {
                    description: 'Leave empty to hide the icon',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default aboutContent;
