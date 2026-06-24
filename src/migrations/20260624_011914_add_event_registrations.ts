import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_event_registrations_status" AS ENUM('draft', 'submitted');
  CREATE TYPE "public"."enum_event_registrations_food_preference" AS ENUM('Halal', 'Vegetarian', 'No restriction', 'Other');
  CREATE TABLE "event_registrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"abstract_id" integer NOT NULL,
  	"registration_key" varchar NOT NULL,
  	"status" "enum_event_registrations_status" DEFAULT 'draft' NOT NULL,
  	"prefix" varchar,
  	"first_name" varchar,
  	"middle_name" varchar,
  	"last_name" varchar,
  	"email" varchar,
  	"organization" varchar,
  	"department" varchar,
  	"postal_code" varchar,
  	"full_address" varchar,
  	"position_title" varchar,
  	"field_of_expertise" varchar,
  	"bio_sketch" varchar,
  	"mobile" varchar,
  	"whatsapp_or_viber" varchar,
  	"food_preference" "enum_event_registrations_food_preference",
  	"is_international_participant" boolean DEFAULT false,
  	"passport_number" varchar,
  	"nationality" varchar,
  	"preferred_arrival_date" timestamp(3) with time zone,
  	"preferred_departure_date" timestamp(3) with time zone,
  	"flight_notes" varchar,
  	"cv_file_id" integer,
  	"profile_photo_file_id" integer,
  	"passport_info_page_file_id" integer,
  	"signature_file_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "event_registrations_id" integer;
  ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_abstract_id_abstracts_id_fk" FOREIGN KEY ("abstract_id") REFERENCES "public"."abstracts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_cv_file_id_media_id_fk" FOREIGN KEY ("cv_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_profile_photo_file_id_media_id_fk" FOREIGN KEY ("profile_photo_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_passport_info_page_file_id_media_id_fk" FOREIGN KEY ("passport_info_page_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_signature_file_id_media_id_fk" FOREIGN KEY ("signature_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "event_registrations_abstract_idx" ON "event_registrations" USING btree ("abstract_id");
  CREATE UNIQUE INDEX "event_registrations_registration_key_idx" ON "event_registrations" USING btree ("registration_key");
  CREATE INDEX "event_registrations_cv_file_idx" ON "event_registrations" USING btree ("cv_file_id");
  CREATE INDEX "event_registrations_profile_photo_file_idx" ON "event_registrations" USING btree ("profile_photo_file_id");
  CREATE INDEX "event_registrations_passport_info_page_file_idx" ON "event_registrations" USING btree ("passport_info_page_file_id");
  CREATE INDEX "event_registrations_signature_file_idx" ON "event_registrations" USING btree ("signature_file_id");
  CREATE INDEX "event_registrations_updated_at_idx" ON "event_registrations" USING btree ("updated_at");
  CREATE INDEX "event_registrations_created_at_idx" ON "event_registrations" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_event_registrations_fk" FOREIGN KEY ("event_registrations_id") REFERENCES "public"."event_registrations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_event_registrations_id_idx" ON "payload_locked_documents_rels" USING btree ("event_registrations_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "event_registrations" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "event_registrations" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_event_registrations_fk";
  
  DROP INDEX "payload_locked_documents_rels_event_registrations_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "event_registrations_id";
  DROP TYPE "public"."enum_event_registrations_status";
  DROP TYPE "public"."enum_event_registrations_food_preference";`)
}
