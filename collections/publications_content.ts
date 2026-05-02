import type { GlobalConfig } from 'payload';

const publicationsContent: GlobalConfig = {
  slug: 'publications_content',
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
          defaultValue: 'PUBLICATIONS',
          localized: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          defaultValue: 'Featured Publications',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          defaultValue: 'Join leading scientists, policy experts, and conservation practitioners for five days of keynotes, sessions, and collaborative workshops on the future of biodiversity in Southeast Asia.',
          localized: true,
        },
      ],
    },
    {
      name: 'filters_section',
      type: 'group',
      label: 'Filters Section',
      fields: [
        {
          name: 'all_label',
          type: 'text',
          label: '"All" Tab Label',
          defaultValue: 'All',
          localized: true,
        },
        {
          name: 'file_type_label',
          type: 'text',
          label: 'File Type Filter Label',
          defaultValue: 'File Type',
          localized: true,
        },
        {
          name: 'publication_year_label',
          type: 'text',
          label: 'Publication Year Filter Label',
          defaultValue: 'Publication Year',
          localized: true,
        },
      ],
    },
    {
      name: 'pagination_section',
      type: 'group',
      label: 'Pagination Section',
      fields: [
        {
          name: 'prev_label',
          type: 'text',
          label: 'Previous Button Label',
          defaultValue: 'Prev',
          localized: true,
        },
        {
          name: 'next_label',
          type: 'text',
          label: 'Next Button Label',
          defaultValue: 'Next',
          localized: true,
        },
      ],
    },
    {
      name: 'download_button_label',
      type: 'text',
      label: 'Download Button Label',
      defaultValue: 'Download',
      localized: true,
    },
  ],
};

export default publicationsContent;
