import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "events_thematic_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "events_thematic_areas_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "events_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "events_sessions_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  DROP TABLE "events_content_thematic_areas_section_items" CASCADE;
  DROP TABLE "events_content_thematic_areas_section_items_locales" CASCADE;
  DROP TABLE "events_content_sessions_section_items" CASCADE;
  DROP TABLE "events_content_sessions_section_items_locales" CASCADE;
  ALTER TABLE "homepage_content_locales" ADD COLUMN "hero_section_title" varchar DEFAULT 'ASEAN Biodiversity
  Science Forum';
  ALTER TABLE "homepage_content_locales" ADD COLUMN "contact_section_form_name_label" varchar DEFAULT 'Full Name';
  ALTER TABLE "homepage_content_locales" ADD COLUMN "contact_section_form_email_label" varchar DEFAULT 'Email';
  ALTER TABLE "homepage_content_locales" ADD COLUMN "contact_section_form_subject_label" varchar DEFAULT 'Subject';
  ALTER TABLE "homepage_content_locales" ADD COLUMN "contact_section_form_message_label" varchar DEFAULT 'Message';
  ALTER TABLE "media_content" ADD COLUMN "media_kit_section_view_all_link" varchar DEFAULT '/media/kit';
  ALTER TABLE "media_content_locales" ADD COLUMN "media_kit_section_description" varchar DEFAULT 'Download our media resources and brand assets.';
  ALTER TABLE "media_content_locales" ADD COLUMN "media_kit_section_view_all_text" varchar DEFAULT 'All Media Kit';
  ALTER TABLE "events_thematic_areas" ADD CONSTRAINT "events_thematic_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_thematic_areas_locales" ADD CONSTRAINT "events_thematic_areas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_thematic_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_sessions" ADD CONSTRAINT "events_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_sessions_locales" ADD CONSTRAINT "events_sessions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_sessions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "events_thematic_areas_order_idx" ON "events_thematic_areas" USING btree ("_order");
  CREATE INDEX "events_thematic_areas_parent_id_idx" ON "events_thematic_areas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "events_thematic_areas_locales_locale_parent_id_unique" ON "events_thematic_areas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "events_sessions_order_idx" ON "events_sessions" USING btree ("_order");
  CREATE INDEX "events_sessions_parent_id_idx" ON "events_sessions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "events_sessions_locales_locale_parent_id_unique" ON "events_sessions_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "events_content_thematic_areas_section_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "events_content_thematic_areas_section_items_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "events_content_sessions_section_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "events_content_sessions_section_items_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  DROP TABLE "events_thematic_areas" CASCADE;
  DROP TABLE "events_thematic_areas_locales" CASCADE;
  DROP TABLE "events_sessions" CASCADE;
  DROP TABLE "events_sessions_locales" CASCADE;
  ALTER TABLE "events_content_thematic_areas_section_items" ADD CONSTRAINT "events_content_thematic_areas_section_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_content_thematic_areas_section_items_locales" ADD CONSTRAINT "events_content_thematic_areas_section_items_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_content_thematic_areas_section_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_content_sessions_section_items" ADD CONSTRAINT "events_content_sessions_section_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_content_sessions_section_items_locales" ADD CONSTRAINT "events_content_sessions_section_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_content_sessions_section_items"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "events_content_thematic_areas_section_items_order_idx" ON "events_content_thematic_areas_section_items" USING btree ("_order");
  CREATE INDEX "events_content_thematic_areas_section_items_parent_id_idx" ON "events_content_thematic_areas_section_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "events_content_thematic_areas_section_items_locales_locale_p" ON "events_content_thematic_areas_section_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "events_content_sessions_section_items_order_idx" ON "events_content_sessions_section_items" USING btree ("_order");
  CREATE INDEX "events_content_sessions_section_items_parent_id_idx" ON "events_content_sessions_section_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "events_content_sessions_section_items_locales_locale_parent_" ON "events_content_sessions_section_items_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "homepage_content_locales" DROP COLUMN "hero_section_title";
  ALTER TABLE "homepage_content_locales" DROP COLUMN "contact_section_form_name_label";
  ALTER TABLE "homepage_content_locales" DROP COLUMN "contact_section_form_email_label";
  ALTER TABLE "homepage_content_locales" DROP COLUMN "contact_section_form_subject_label";
  ALTER TABLE "homepage_content_locales" DROP COLUMN "contact_section_form_message_label";
  ALTER TABLE "media_content" DROP COLUMN "media_kit_section_view_all_link";
  ALTER TABLE "media_content_locales" DROP COLUMN "media_kit_section_description";
  ALTER TABLE "media_content_locales" DROP COLUMN "media_kit_section_view_all_text";`)
}
