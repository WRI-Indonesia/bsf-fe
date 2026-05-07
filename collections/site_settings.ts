import type { GlobalConfig } from 'payload';

const siteSettings: GlobalConfig = {
  slug: 'site_settings',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Page Content',
  },
  fields: [
    {
      name: 'header',
      type: 'group',
      label: 'Header',
      fields: [
        {
          name: 'about_label',
          type: 'text',
          label: 'About Menu Label',
          defaultValue: 'About',
          localized: true,
        },
        {
          name: 'events_label',
          type: 'text',
          label: 'Events Menu Label',
          defaultValue: 'Events',
          localized: true,
        },
        {
          name: 'events_upcoming_label',
          type: 'text',
          label: 'Events > Upcoming Forum Label',
          defaultValue: 'Upcoming forum',
          localized: true,
        },
        {
          name: 'events_past_label',
          type: 'text',
          label: 'Events > Past Events Label',
          defaultValue: 'Past Events',
          localized: true,
        },
        {
          name: 'publications_label',
          type: 'text',
          label: 'Publications Menu Label',
          defaultValue: 'Publications',
          localized: true,
        },
        {
          name: 'media_label',
          type: 'text',
          label: 'Media Menu Label',
          defaultValue: 'Media',
          localized: true,
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      label: 'Footer',
      fields: [
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          defaultValue: 'The Biodiversity Science Forum brings together researches, practitioners, institutions, and decision-makers to strengthen dialogue, biodiversity conservation across the ASEAN region',
          localized: true,
        },
        {
          name: 'home_label',
          type: 'text',
          label: 'Home Link Label',
          defaultValue: 'Home',
          localized: true,
        },
        {
          name: 'about_label',
          type: 'text',
          label: 'About Link Label',
          defaultValue: 'About',
          localized: true,
        },
        {
          name: 'events_label',
          type: 'text',
          label: 'Events Heading Label',
          defaultValue: 'Events',
          localized: true,
        },
        {
          name: 'upcoming_label',
          type: 'text',
          label: 'Upcoming Forum Link Label',
          defaultValue: 'Upcoming Forum',
          localized: true,
        },
        {
          name: 'past_label',
          type: 'text',
          label: 'Past Events Link Label',
          defaultValue: 'Past Events',
          localized: true,
        },
        {
          name: 'publications_label',
          type: 'text',
          label: 'Publications Heading Label',
          defaultValue: 'Publications',
          localized: true,
        },
        {
          name: 'media_label',
          type: 'text',
          label: 'Media Heading Label',
          defaultValue: 'Media',
          localized: true,
        },
        {
          name: 'press_label',
          type: 'text',
          label: 'Press Release Link Label',
          defaultValue: 'Press Release',
          localized: true,
        },
        {
          name: 'media_kit_label',
          type: 'text',
          label: 'Media Kit Link Label',
          defaultValue: 'Media Kit',
          localized: true,
        },
        {
          name: 'copyright_text',
          type: 'text',
          label: 'Copyright Text',
          defaultValue: '© 2026 Biodiversity Science Forum. All rights reserved.',
          localized: true,
        },
        {
          name: 'privacy_label',
          type: 'text',
          label: 'Privacy Policy Link Label',
          defaultValue: 'Privacy Policy',
          localized: true,
        },
        {
          name: 'terms_label',
          type: 'text',
          label: 'Terms of Use Link Label',
          defaultValue: 'Terms of Use',
          localized: true,
        },
      ],
    },
  ],
};

export default siteSettings;
