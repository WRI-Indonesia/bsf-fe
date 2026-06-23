import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_abstracts_status" AS ENUM('submitted', 'under_review', 'accepted', 'rejected');
  CREATE TABLE "public_users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "public_users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "abstracts_keywords" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"keyword" varchar NOT NULL
  );
  
  CREATE TABLE "abstracts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"event_id" integer NOT NULL,
  	"user_id" integer,
  	"main_author" varchar NOT NULL,
  	"affiliation" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"citation" varchar NOT NULL,
  	"status" "enum_abstracts_status" DEFAULT 'submitted' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "public_users_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "abstracts_id" integer;
  ALTER TABLE "payload_preferences_rels" ADD COLUMN "public_users_id" integer;
  ALTER TABLE "public_users_sessions" ADD CONSTRAINT "public_users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."public_users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "abstracts_keywords" ADD CONSTRAINT "abstracts_keywords_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."abstracts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "abstracts" ADD CONSTRAINT "abstracts_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "abstracts" ADD CONSTRAINT "abstracts_user_id_public_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."public_users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "public_users_sessions_order_idx" ON "public_users_sessions" USING btree ("_order");
  CREATE INDEX "public_users_sessions_parent_id_idx" ON "public_users_sessions" USING btree ("_parent_id");
  CREATE INDEX "public_users_updated_at_idx" ON "public_users" USING btree ("updated_at");
  CREATE INDEX "public_users_created_at_idx" ON "public_users" USING btree ("created_at");
  CREATE UNIQUE INDEX "public_users_email_idx" ON "public_users" USING btree ("email");
  CREATE INDEX "abstracts_keywords_order_idx" ON "abstracts_keywords" USING btree ("_order");
  CREATE INDEX "abstracts_keywords_parent_id_idx" ON "abstracts_keywords" USING btree ("_parent_id");
  CREATE INDEX "abstracts_event_idx" ON "abstracts" USING btree ("event_id");
  CREATE INDEX "abstracts_user_idx" ON "abstracts" USING btree ("user_id");
  CREATE UNIQUE INDEX "abstracts_event_user_unique_idx" ON "abstracts" USING btree ("event_id","user_id");
  CREATE INDEX "abstracts_updated_at_idx" ON "abstracts" USING btree ("updated_at");
  CREATE INDEX "abstracts_created_at_idx" ON "abstracts" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_public_users_fk" FOREIGN KEY ("public_users_id") REFERENCES "public"."public_users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_abstracts_fk" FOREIGN KEY ("abstracts_id") REFERENCES "public"."abstracts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_public_users_fk" FOREIGN KEY ("public_users_id") REFERENCES "public"."public_users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_public_users_id_idx" ON "payload_locked_documents_rels" USING btree ("public_users_id");
  CREATE INDEX "payload_locked_documents_rels_abstracts_id_idx" ON "payload_locked_documents_rels" USING btree ("abstracts_id");
  CREATE INDEX "payload_preferences_rels_public_users_id_idx" ON "payload_preferences_rels" USING btree ("public_users_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "public_users_sessions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "public_users" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "abstracts_keywords" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "abstracts" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "public_users_sessions" CASCADE;
  DROP TABLE "public_users" CASCADE;
  DROP TABLE "abstracts_keywords" CASCADE;
  DROP TABLE "abstracts" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_public_users_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_abstracts_fk";
  
  ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_public_users_fk";
  
  DROP INDEX "payload_locked_documents_rels_public_users_id_idx";
  DROP INDEX "payload_locked_documents_rels_abstracts_id_idx";
  DROP INDEX "payload_preferences_rels_public_users_id_idx";
  DROP INDEX "abstracts_event_user_unique_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "public_users_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "abstracts_id";
  ALTER TABLE "payload_preferences_rels" DROP COLUMN "public_users_id";
  DROP TYPE "public"."enum_abstracts_status";`)
}
