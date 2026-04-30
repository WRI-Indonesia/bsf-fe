import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import events from './collections/events';
import latestPublications from './collections/latest_publications';
import media from './collections/media';

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
  collections: [media, events, latestPublications],
});