import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"header_about_label" varchar DEFAULT 'About',
  	"header_events_label" varchar DEFAULT 'Events',
  	"header_events_upcoming_label" varchar DEFAULT 'Upcoming forum',
  	"header_events_past_label" varchar DEFAULT 'Past Events',
  	"header_publications_label" varchar DEFAULT 'Publications',
  	"header_media_label" varchar DEFAULT 'Media',
  	"footer_description" varchar DEFAULT 'The Biodiversity Science Forum brings together researches, practitioners, institutions, and decision-makers to strengthen dialogue, biodiversity conservation across the ASEAN region',
  	"footer_home_label" varchar DEFAULT 'Home',
  	"footer_about_label" varchar DEFAULT 'About',
  	"footer_events_label" varchar DEFAULT 'Events',
  	"footer_upcoming_label" varchar DEFAULT 'Upcoming Forum',
  	"footer_past_label" varchar DEFAULT 'Past Events',
  	"footer_publications_label" varchar DEFAULT 'Publications',
  	"footer_media_label" varchar DEFAULT 'Media',
  	"footer_press_label" varchar DEFAULT 'Press Release',
  	"footer_media_kit_label" varchar DEFAULT 'Media Kit',
  	"footer_copyright_text" varchar DEFAULT '© 2026 Biodiversity Science Forum. All rights reserved.',
  	"footer_privacy_label" varchar DEFAULT 'Privacy Policy',
  	"footer_terms_label" varchar DEFAULT 'Terms of Use',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "homepage_content" ADD COLUMN "hero_section_background_image_id" integer;
  ALTER TABLE "homepage_content" ADD COLUMN "hero_section_register_cta_url" varchar DEFAULT '#';
  ALTER TABLE "homepage_content" ADD COLUMN "hero_section_explore_cta_url" varchar DEFAULT '/publications';
  ALTER TABLE "homepage_content" ADD COLUMN "upcoming_forum_section_register_cta_url" varchar DEFAULT '#';
  ALTER TABLE "homepage_content" ADD COLUMN "upcoming_forum_section_view_program_cta_url" varchar DEFAULT '#';
  ALTER TABLE "homepage_content_locales" ADD COLUMN "upcoming_forum_section_label" varchar DEFAULT 'Upcoming Forum';
  ALTER TABLE "about_content" ADD COLUMN "mission_section_read_more_url" varchar DEFAULT '#';
  ALTER TABLE "events_content_hero_section_buttons" ADD COLUMN "url" varchar DEFAULT '#';
  ALTER TABLE "events_content" ADD COLUMN "registration_section_left_box_button_url" varchar DEFAULT '#';
  ALTER TABLE "events_content" ADD COLUMN "registration_section_right_box_button_url" varchar DEFAULT '#';
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "homepage_content" ADD CONSTRAINT "homepage_content_hero_section_background_image_id_media_id_fk" FOREIGN KEY ("hero_section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "homepage_content_hero_section_hero_section_background_im_idx" ON "homepage_content" USING btree ("hero_section_background_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  ALTER TABLE "homepage_content" DROP CONSTRAINT "homepage_content_hero_section_background_image_id_media_id_fk";
  
  DROP INDEX "homepage_content_hero_section_hero_section_background_im_idx";
  ALTER TABLE "homepage_content" DROP COLUMN "hero_section_background_image_id";
  ALTER TABLE "homepage_content" DROP COLUMN "hero_section_register_cta_url";
  ALTER TABLE "homepage_content" DROP COLUMN "hero_section_explore_cta_url";
  ALTER TABLE "homepage_content" DROP COLUMN "upcoming_forum_section_register_cta_url";
  ALTER TABLE "homepage_content" DROP COLUMN "upcoming_forum_section_view_program_cta_url";
  ALTER TABLE "homepage_content_locales" DROP COLUMN "upcoming_forum_section_label";
  ALTER TABLE "about_content" DROP COLUMN "mission_section_read_more_url";
  ALTER TABLE "events_content_hero_section_buttons" DROP COLUMN "url";
  ALTER TABLE "events_content" DROP COLUMN "registration_section_left_box_button_url";
  ALTER TABLE "events_content" DROP COLUMN "registration_section_right_box_button_url";`)
}
