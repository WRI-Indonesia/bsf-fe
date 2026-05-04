import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN
    CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
   EXCEPTION
    WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
    ALTER TABLE "users" ADD COLUMN "name" varchar NOT NULL;
   EXCEPTION
    WHEN duplicate_column THEN null;
   END $$;

   DO $$ BEGIN
    ALTER TABLE "users" ADD COLUMN "role" "public"."enum_users_role" DEFAULT 'editor' NOT NULL;
   EXCEPTION
    WHEN duplicate_column THEN null;
   END $$;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" DROP COLUMN IF EXISTS "name";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "role";
  DROP TYPE IF EXISTS "public"."enum_users_role";`)
}
