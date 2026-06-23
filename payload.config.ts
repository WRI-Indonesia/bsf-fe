import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import latestPublications from './collections/latest_publications';
import events from './collections/events';
import media from './collections/media';
import albumMedia from './collections/album_media';
import pressMedia from './collections/press_media';
import homepageContent from './collections/homepage_content';
import aboutContent from './collections/about_content';
import eventsContent from './collections/events_content';
import publicationsContent from './collections/publications_content';
import mediaContent from './collections/media_content';
import siteSettings from './collections/site_settings';
import users from './collections/users';
import publicUsers from './collections/public_users';
import abstracts from './collections/abstracts';

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'SECRET_KEY',
  admin: {
    components: {
      afterNavLinks: [
        '@/app/(payload)/admin/components/AbstractsByEventNavLink#AbstractsByEventNavLink',
      ],
    },
  },
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URL || 'postgres://127.0.0.1:5432/payload-db',
    },
  }),
  editor: lexicalEditor({}),
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  collections: [users, publicUsers, abstracts, latestPublications, events, media, albumMedia, pressMedia],
  globals: [homepageContent, aboutContent, eventsContent, publicationsContent, mediaContent, siteSettings],
  localization: {
    locales: ['en', 'id'],
    defaultLocale: 'en',
    fallback: true,
  },
});
