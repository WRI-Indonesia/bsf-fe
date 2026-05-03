import type { CollectionConfig } from 'payload';

const albumMedia: CollectionConfig = {
  slug: 'album_media',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Media',
    useAsTitle: 'title',
    defaultColumns: ['title', 'cover_image', 'media_count', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Album Title',
      required: true,
      localized: true,
    },
    {
      name: 'cover_image',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover Image',
      required: true,
      admin: {
        description: 'This image will be used as the album thumbnail.',
      },
    },
    {
      name: 'media_items',
      type: 'array',
      label: 'Photos & Videos',
      labels: {
        singular: 'Media Item',
        plural: 'Media Items',
      },
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Type',
          required: true,
          options: [
            { label: 'Photo', value: 'photo' },
            { label: 'Video', value: 'video' },
          ],
          defaultValue: 'photo',
        },
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          label: 'File',
          required: true,
          admin: {
            description: 'Upload a photo or video file.',
          },
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Caption',
          localized: true,
        },
      ],
    },
  ],
};

export default albumMedia;
