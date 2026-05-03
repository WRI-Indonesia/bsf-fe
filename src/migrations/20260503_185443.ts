import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "events_key_dates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "events_key_dates_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "events_key_dates" ADD CONSTRAINT "events_key_dates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_key_dates_locales" ADD CONSTRAINT "events_key_dates_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_key_dates"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "events_key_dates_order_idx" ON "events_key_dates" USING btree ("_order");
  CREATE INDEX "events_key_dates_parent_id_idx" ON "events_key_dates" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "events_key_dates_locales_locale_parent_id_unique" ON "events_key_dates_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "events" DROP COLUMN "key_date";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "events_key_dates" CASCADE;
  DROP TABLE "events_key_dates_locales" CASCADE;
  ALTER TABLE "events" ADD COLUMN "key_date" timestamp(3) with time zone;`)
}
