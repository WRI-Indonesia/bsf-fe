import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import latestPublications from './collections/latest_publications';
import events from './collections/events';
import media from './collections/media';
import homepageContent from './collections/homepage_content';
import aboutContent from './collections/about_content';

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'SECRET_KEY',
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URL || 'postgres://127.0.0.1:5432/payload-db',
    },
  }),
  editor: lexicalEditor({}),
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  collections: [latestPublications, events, media],
  globals: [homepageContent, aboutContent],
  localization: {
    locales: ['en', 'id'],
    defaultLocale: 'en',
    fallback: true,
  },
});