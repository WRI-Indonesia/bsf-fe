import type { GlobalConfig } from 'payload';

const mediaContent: GlobalConfig = {
  slug: 'media_content',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Page Content',
  },
  fields: [
    {
      name: 'photos_section',
      type: 'group',
      label: 'Photos & Videos Section',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          defaultValue: 'Gallery',
          localized: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          defaultValue: 'Photos & Videos',
          localized: true,
        },
        {
          name: 'albums',
          type: 'relationship',
          relationTo: 'album_media',
          label: 'Albums',
          hasMany: true,
          admin: {
            description: 'Select up to 9 albums to display on the media page.',
          },
        },
        {
          name: 'view_all_text',
          type: 'text',
          label: 'View All Link Text',
          defaultValue: 'Click here to see all albums',
          localized: true,
        },
        {
          name: 'view_all_link',
          type: 'text',
          label: 'View All Link URL',
          defaultValue: '/media/gallery',
        },
      ],
    },
    {
      name: 'press_section',
      type: 'group',
      label: 'Press Section',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          defaultValue: 'Press',
          localized: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          defaultValue: 'Press Releases',
          localized: true,
        },
        {
          name: 'press_releases',
          type: 'relationship',
          relationTo: 'press_media',
          label: 'Press Releases',
          hasMany: true,
        },
        {
          name: 'view_all_text',
          type: 'text',
          label: 'View All Link Text',
          defaultValue: 'All Press Release',
          localized: true,
        },
        {
          name: 'view_all_link',
          type: 'text',
          label: 'View All Link URL',
          defaultValue: '/media/press',
        },
      ],
    },
    {
      name: 'media_kit_section',
      type: 'group',
      label: 'Media Kit Section',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          defaultValue: 'Media Kit',
          localized: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          defaultValue: 'Media Resources',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          defaultValue: 'Download our media resources and brand assets.',
          localized: true,
        },
        {
          name: 'view_all_text',
          type: 'text',
          label: 'View All Link Text',
          defaultValue: 'All Media Kit',
          localized: true,
        },
        {
          name: 'view_all_link',
          type: 'text',
          label: 'View All Link URL',
          defaultValue: '/media/kit',
        },
        {
          name: 'resources',
          type: 'array',
          label: 'Resources',
          labels: {
            singular: 'Resource',
            plural: 'Resources',
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
              name: 'title',
              type: 'text',
              label: 'Title',
              required: true,
              localized: true,
            },
            {
              name: 'type',
              type: 'text',
              label: 'File Type (e.g. ZIP, PDF)',
              required: true,
              defaultValue: 'PDF',
            },
            {
              name: 'size',
              type: 'text',
              label: 'File Size (e.g. 2.4 MB)',
              required: true,
              defaultValue: '2.4 MB',
            },
            {
              name: 'file',
              type: 'upload',
              relationTo: 'media',
              label: 'File',
            },
          ],
        },
      ],
    },
  ],
};

export default mediaContent;
