import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_abstracts_status" AS ENUM('submitted', 'under_review', 'accepted', 'rejected');
  CREATE TYPE "public"."enum_event_registrations_status" AS ENUM('draft', 'submitted');
  CREATE TYPE "public"."enum_event_registrations_food_preference" AS ENUM('Halal', 'Vegetarian', 'No restriction', 'Other');
  CREATE TYPE "public"."enum_latest_publications_tag" AS ENUM('Policy brief', 'Proceedings', 'Publications', 'Technical Outputs');
  CREATE TYPE "public"."enum_album_media_media_items_type" AS ENUM('photo', 'video');
  CREATE TYPE "public"."enum_homepage_content_about_section_boxes_icon" AS ENUM('globe', 'stakeholder', 'book', 'bulb');
  CREATE TYPE "public"."enum_events_content_hero_section_buttons_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_events_content_registration_section_left_box_icon" AS ENUM('document_green.png', 'document_yellow.png');
  CREATE TYPE "public"."enum_events_content_registration_section_right_box_icon" AS ENUM('document_green.png', 'document_yellow.png');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
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
  	"_verified" boolean,
  	"_verificationtoken" varchar,
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
  	"food_preference_other" varchar,
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
  
  CREATE TABLE "latest_publications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"tag" "enum_latest_publications_tag" NOT NULL,
  	"file_id" integer NOT NULL,
  	"file_type" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "latest_publications_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "events_key_dates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"show" boolean DEFAULT true
  );
  
  CREATE TABLE "events_key_dates_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
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
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone NOT NULL,
  	"participants" varchar,
  	"image_id" integer,
  	"show_on_homepage" boolean DEFAULT false,
  	"is_upcoming_event" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "events_locales" (
  	"title" varchar NOT NULL,
  	"location" varchar,
  	"article" jsonb,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "album_media_media_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_album_media_media_items_type" DEFAULT 'photo' NOT NULL,
  	"file_id" integer NOT NULL
  );
  
  CREATE TABLE "album_media_media_items_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "album_media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cover_image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "album_media_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "press_media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"source_logo_id" integer NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "press_media_locales" (
  	"source_name" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "press_media_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"press_media_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"public_users_id" integer,
  	"abstracts_id" integer,
  	"event_registrations_id" integer,
  	"latest_publications_id" integer,
  	"events_id" integer,
  	"media_id" integer,
  	"album_media_id" integer,
  	"press_media_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"public_users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "homepage_content_about_section_boxes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_homepage_content_about_section_boxes_icon" DEFAULT 'globe' NOT NULL
  );
  
  CREATE TABLE "homepage_content_about_section_boxes_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_content_contact_section_contact_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "homepage_content_contact_section_contact_items_locales" (
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_section_background_image_id" integer,
  	"hero_section_register_cta_url" varchar DEFAULT '#',
  	"hero_section_explore_cta_url" varchar DEFAULT '/publications',
  	"upcoming_forum_section_register_cta_url" varchar DEFAULT '#',
  	"upcoming_forum_section_view_program_cta_url" varchar DEFAULT '#',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_content_locales" (
  	"hero_section_title" varchar DEFAULT 'ASEAN Biodiversity
  Science Forum',
  	"hero_section_subtitle" varchar DEFAULT 'A hub for community to get the biodiversity science updates around ACB.',
  	"hero_section_register_cta" varchar DEFAULT 'Register Now',
  	"hero_section_explore_cta" varchar DEFAULT 'Explore Publications',
  	"about_section_label" varchar DEFAULT 'ABOUT THE FORUM',
  	"about_section_title" varchar DEFAULT 'A space for biodiversity science, collaboration, and knowledge exchange.',
  	"about_section_description" varchar DEFAULT 'The Biodiversity Science Forum brings together researches, practitioners, institutions, and decision-makers to strengthen dialogue, biodiversity conservation across the ASEAN region',
  	"upcoming_forum_section_label" varchar DEFAULT 'Upcoming Forum',
  	"upcoming_forum_section_hero_card_label" varchar DEFAULT 'Upcoming Forum',
  	"upcoming_forum_section_hero_card_submit_cta" varchar DEFAULT 'Submit Your Abstract',
  	"upcoming_forum_section_register_cta" varchar DEFAULT 'Register Now',
  	"upcoming_forum_section_view_program_cta" varchar DEFAULT 'View Program',
  	"upcoming_forum_section_participants_suffix" varchar DEFAULT 'Expected',
  	"upcoming_forum_section_participants_label" varchar DEFAULT 'Participants',
  	"upcoming_forum_section_key_dates_label" varchar DEFAULT 'KEY DATES',
  	"publications_section_label" varchar DEFAULT 'Latest Publication',
  	"publications_section_title" varchar DEFAULT 'Recent Knowledge Products',
  	"publications_section_view_all_text" varchar DEFAULT 'View all publications →',
  	"publications_section_download_cta" varchar DEFAULT 'Download',
  	"contact_section_label" varchar DEFAULT 'Contact Us',
  	"contact_section_title" varchar DEFAULT 'Get in touch with the BSF team',
  	"contact_section_description" varchar DEFAULT 'Whether you''re interested in partnerships, have questions about the forum, or want to contribute to biodiversity science, we''d love to hear from you.',
  	"contact_section_form_name_placeholder" varchar DEFAULT 'Your name',
  	"contact_section_form_name_label" varchar DEFAULT 'Full Name',
  	"contact_section_form_email_placeholder" varchar DEFAULT 'you@example.com',
  	"contact_section_form_email_label" varchar DEFAULT 'Email',
  	"contact_section_form_subject_placeholder" varchar DEFAULT 'Add a subject',
  	"contact_section_form_subject_label" varchar DEFAULT 'Subject',
  	"contact_section_form_message_placeholder" varchar DEFAULT 'Write your message',
  	"contact_section_form_message_label" varchar DEFAULT 'Message',
  	"contact_section_form_privacy_text" varchar DEFAULT 'Your request will be sent securely and remain private.',
  	"contact_section_form_submit_cta" varchar DEFAULT 'Send your message',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "about_content_mission_section_objectives" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "about_content_mission_section_objectives_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_content_milestones_section_milestones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar NOT NULL,
  	"align_right" boolean DEFAULT false
  );
  
  CREATE TABLE "about_content_milestones_section_milestones_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_content_experts_section_experts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"social_links_x" varchar,
  	"social_links_facebook" varchar,
  	"social_links_linkedin" varchar,
  	"social_links_telegram" varchar
  );
  
  CREATE TABLE "about_content_experts_section_experts_locales" (
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_section_image_id" integer,
  	"mission_section_read_more_url" varchar DEFAULT '#',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_content_locales" (
  	"hero_section_label" varchar DEFAULT 'ABOUT THE FORUM',
  	"hero_section_title" varchar DEFAULT 'Advancing biodiversity science through regional collaboration',
  	"hero_section_description" varchar DEFAULT 'Join leading scientists, policy experts, and conservation practitioners for five days of keynotes, sessions, and collaborative workshops on the future of biodiversity in Southeast Asia.',
  	"mission_section_label" varchar DEFAULT 'MISSION & OBJECTIVES',
  	"mission_section_title" varchar DEFAULT 'Bridging science and policy for biodiversity action',
  	"mission_section_description" varchar DEFAULT 'Whether you''re interested in partnerships, have questions about the forum, or want to contribute to biodiversity science, we''d love to hear from you.',
  	"mission_section_read_more_text" varchar DEFAULT 'Read full mission statement',
  	"milestones_section_label" varchar DEFAULT 'OUR JOURNEY',
  	"milestones_section_title" varchar DEFAULT 'Key Milestones',
  	"experts_section_label" varchar DEFAULT 'SCIENTIFIC COMMITTEE',
  	"experts_section_title" varchar DEFAULT 'Meet our Experts',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "events_content_hero_section_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar DEFAULT '#',
  	"style" "enum_events_content_hero_section_buttons_style" DEFAULT 'primary' NOT NULL,
  	"show_arrow" boolean DEFAULT false
  );
  
  CREATE TABLE "events_content_hero_section_buttons_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "events_content_speakers_section_speakers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"social_links_x" varchar,
  	"social_links_linkedin" varchar,
  	"social_links_facebook" varchar,
  	"social_links_telegram" varchar
  );
  
  CREATE TABLE "events_content_speakers_section_speakers_locales" (
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "events_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_section_image_id" integer,
  	"registration_section_left_box_icon" "enum_events_content_registration_section_left_box_icon" DEFAULT 'document_green.png',
  	"registration_section_left_box_button_url" varchar DEFAULT '#',
  	"registration_section_right_box_icon" "enum_events_content_registration_section_right_box_icon" DEFAULT 'document_yellow.png',
  	"registration_section_right_box_button_url" varchar DEFAULT '#',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "events_content_locales" (
  	"hero_section_label" varchar DEFAULT 'UPCOMING FORUM',
  	"hero_section_abstract_cta_text" varchar DEFAULT 'Submit your Abstract',
  	"hero_section_registration_note" varchar DEFAULT 'note : Registration is by invitation only, selected authors will receive an email link after abstract review.',
  	"key_dates_section_label" varchar DEFAULT 'IMPORTANT DATES',
  	"key_dates_section_title" varchar DEFAULT 'Key dates & Deadlines',
  	"thematic_areas_section_label" varchar DEFAULT 'Programme',
  	"thematic_areas_section_title" varchar DEFAULT 'Thematic Areas',
  	"speakers_section_label" varchar DEFAULT 'Keynote Speakers',
  	"speakers_section_title" varchar DEFAULT 'Featured Speakers',
  	"sessions_section_label" varchar DEFAULT 'Session',
  	"sessions_section_title" varchar DEFAULT 'Sessions',
  	"registration_section_label" varchar DEFAULT 'Participate',
  	"registration_section_title" varchar DEFAULT 'Registration',
  	"registration_section_left_box_title" varchar,
  	"registration_section_left_box_description" varchar,
  	"registration_section_left_box_button_text" varchar,
  	"registration_section_right_box_title" varchar,
  	"registration_section_right_box_description" varchar,
  	"registration_section_right_box_button_text" varchar,
  	"past_events_section_label" varchar DEFAULT 'Archive',
  	"past_events_section_title" varchar DEFAULT 'Past Events',
  	"past_events_section_view_all_text" varchar DEFAULT 'View all past events',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "publications_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "publications_content_locales" (
  	"hero_section_label" varchar DEFAULT 'PUBLICATIONS',
  	"hero_section_title" varchar DEFAULT 'Featured Publications',
  	"hero_section_description" varchar DEFAULT 'Join leading scientists, policy experts, and conservation practitioners for five days of keynotes, sessions, and collaborative workshops on the future of biodiversity in Southeast Asia.',
  	"filters_section_all_label" varchar DEFAULT 'All',
  	"filters_section_file_type_label" varchar DEFAULT 'File Type',
  	"filters_section_publication_year_label" varchar DEFAULT 'Publication Year',
  	"pagination_section_prev_label" varchar DEFAULT 'Prev',
  	"pagination_section_next_label" varchar DEFAULT 'Next',
  	"download_button_label" varchar DEFAULT 'Download',
  	"empty_state_message" varchar DEFAULT 'No publications found.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media_content_media_kit_section_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"type" varchar DEFAULT 'PDF' NOT NULL,
  	"size" varchar DEFAULT '2.4 MB' NOT NULL,
  	"file_id" integer
  );
  
  CREATE TABLE "media_content_media_kit_section_resources_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "media_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"photos_section_view_all_link" varchar DEFAULT '/media/gallery',
  	"press_section_view_all_link" varchar DEFAULT '/media/press',
  	"media_kit_section_view_all_link" varchar DEFAULT '/media/kit',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "media_content_locales" (
  	"photos_section_label" varchar DEFAULT 'Gallery',
  	"photos_section_title" varchar DEFAULT 'Photos & Videos',
  	"photos_section_album_count_label" varchar DEFAULT 'Photos & Videos',
  	"photos_section_view_all_text" varchar DEFAULT 'Click here to see all albums',
  	"press_section_label" varchar DEFAULT 'Press',
  	"press_section_title" varchar DEFAULT 'Press Releases',
  	"press_section_view_all_text" varchar DEFAULT 'All Press Release',
  	"media_kit_section_label" varchar DEFAULT 'Media Kit',
  	"media_kit_section_title" varchar DEFAULT 'Media Resources',
  	"media_kit_section_description" varchar DEFAULT 'Download our media resources and brand assets.',
  	"media_kit_section_view_all_text" varchar DEFAULT 'All Media Kit',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media_content_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"album_media_id" integer,
  	"press_media_id" integer
  );
  
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
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "public_users_sessions" ADD CONSTRAINT "public_users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."public_users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "abstracts_keywords" ADD CONSTRAINT "abstracts_keywords_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."abstracts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "abstracts" ADD CONSTRAINT "abstracts_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "abstracts" ADD CONSTRAINT "abstracts_user_id_public_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."public_users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_abstract_id_abstracts_id_fk" FOREIGN KEY ("abstract_id") REFERENCES "public"."abstracts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_cv_file_id_media_id_fk" FOREIGN KEY ("cv_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_profile_photo_file_id_media_id_fk" FOREIGN KEY ("profile_photo_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_passport_info_page_file_id_media_id_fk" FOREIGN KEY ("passport_info_page_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_signature_file_id_media_id_fk" FOREIGN KEY ("signature_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "latest_publications" ADD CONSTRAINT "latest_publications_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "latest_publications_locales" ADD CONSTRAINT "latest_publications_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."latest_publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_key_dates" ADD CONSTRAINT "events_key_dates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_key_dates_locales" ADD CONSTRAINT "events_key_dates_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_key_dates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_thematic_areas" ADD CONSTRAINT "events_thematic_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_thematic_areas_locales" ADD CONSTRAINT "events_thematic_areas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_thematic_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_sessions" ADD CONSTRAINT "events_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_sessions_locales" ADD CONSTRAINT "events_sessions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_sessions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_locales" ADD CONSTRAINT "events_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "album_media_media_items" ADD CONSTRAINT "album_media_media_items_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "album_media_media_items" ADD CONSTRAINT "album_media_media_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."album_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "album_media_media_items_locales" ADD CONSTRAINT "album_media_media_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."album_media_media_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "album_media" ADD CONSTRAINT "album_media_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "album_media_locales" ADD CONSTRAINT "album_media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."album_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_media" ADD CONSTRAINT "press_media_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "press_media" ADD CONSTRAINT "press_media_source_logo_id_media_id_fk" FOREIGN KEY ("source_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "press_media_locales" ADD CONSTRAINT "press_media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_media_rels" ADD CONSTRAINT "press_media_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."press_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_media_rels" ADD CONSTRAINT "press_media_rels_press_media_fk" FOREIGN KEY ("press_media_id") REFERENCES "public"."press_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_public_users_fk" FOREIGN KEY ("public_users_id") REFERENCES "public"."public_users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_abstracts_fk" FOREIGN KEY ("abstracts_id") REFERENCES "public"."abstracts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_event_registrations_fk" FOREIGN KEY ("event_registrations_id") REFERENCES "public"."event_registrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_latest_publications_fk" FOREIGN KEY ("latest_publications_id") REFERENCES "public"."latest_publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_album_media_fk" FOREIGN KEY ("album_media_id") REFERENCES "public"."album_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_press_media_fk" FOREIGN KEY ("press_media_id") REFERENCES "public"."press_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_public_users_fk" FOREIGN KEY ("public_users_id") REFERENCES "public"."public_users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_content_about_section_boxes" ADD CONSTRAINT "homepage_content_about_section_boxes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_content_about_section_boxes_locales" ADD CONSTRAINT "homepage_content_about_section_boxes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_content_about_section_boxes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_content_contact_section_contact_items" ADD CONSTRAINT "homepage_content_contact_section_contact_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_content_contact_section_contact_items_locales" ADD CONSTRAINT "homepage_content_contact_section_contact_items_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_content_contact_section_contact_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_content" ADD CONSTRAINT "homepage_content_hero_section_background_image_id_media_id_fk" FOREIGN KEY ("hero_section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_content_locales" ADD CONSTRAINT "homepage_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_content_mission_section_objectives" ADD CONSTRAINT "about_content_mission_section_objectives_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_content_mission_section_objectives_locales" ADD CONSTRAINT "about_content_mission_section_objectives_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_content_mission_section_objectives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_content_milestones_section_milestones" ADD CONSTRAINT "about_content_milestones_section_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_content_milestones_section_milestones_locales" ADD CONSTRAINT "about_content_milestones_section_milestones_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_content_milestones_section_milestones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_content_experts_section_experts" ADD CONSTRAINT "about_content_experts_section_experts_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_content_experts_section_experts" ADD CONSTRAINT "about_content_experts_section_experts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_content_experts_section_experts_locales" ADD CONSTRAINT "about_content_experts_section_experts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_content_experts_section_experts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_content" ADD CONSTRAINT "about_content_hero_section_image_id_media_id_fk" FOREIGN KEY ("hero_section_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_content_locales" ADD CONSTRAINT "about_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_content_hero_section_buttons" ADD CONSTRAINT "events_content_hero_section_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_content_hero_section_buttons_locales" ADD CONSTRAINT "events_content_hero_section_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_content_hero_section_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_content_speakers_section_speakers" ADD CONSTRAINT "events_content_speakers_section_speakers_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_content_speakers_section_speakers" ADD CONSTRAINT "events_content_speakers_section_speakers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_content_speakers_section_speakers_locales" ADD CONSTRAINT "events_content_speakers_section_speakers_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_content_speakers_section_speakers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_content" ADD CONSTRAINT "events_content_hero_section_image_id_media_id_fk" FOREIGN KEY ("hero_section_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_content_locales" ADD CONSTRAINT "events_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_content_locales" ADD CONSTRAINT "publications_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_content_media_kit_section_resources" ADD CONSTRAINT "media_content_media_kit_section_resources_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media_content_media_kit_section_resources" ADD CONSTRAINT "media_content_media_kit_section_resources_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media_content_media_kit_section_resources" ADD CONSTRAINT "media_content_media_kit_section_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_content_media_kit_section_resources_locales" ADD CONSTRAINT "media_content_media_kit_section_resources_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media_content_media_kit_section_resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_content_locales" ADD CONSTRAINT "media_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_content_rels" ADD CONSTRAINT "media_content_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_content_rels" ADD CONSTRAINT "media_content_rels_album_media_fk" FOREIGN KEY ("album_media_id") REFERENCES "public"."album_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_content_rels" ADD CONSTRAINT "media_content_rels_press_media_fk" FOREIGN KEY ("press_media_id") REFERENCES "public"."press_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "public_users_sessions_order_idx" ON "public_users_sessions" USING btree ("_order");
  CREATE INDEX "public_users_sessions_parent_id_idx" ON "public_users_sessions" USING btree ("_parent_id");
  CREATE INDEX "public_users_updated_at_idx" ON "public_users" USING btree ("updated_at");
  CREATE INDEX "public_users_created_at_idx" ON "public_users" USING btree ("created_at");
  CREATE UNIQUE INDEX "public_users_email_idx" ON "public_users" USING btree ("email");
  CREATE INDEX "abstracts_keywords_order_idx" ON "abstracts_keywords" USING btree ("_order");
  CREATE INDEX "abstracts_keywords_parent_id_idx" ON "abstracts_keywords" USING btree ("_parent_id");
  CREATE INDEX "abstracts_event_idx" ON "abstracts" USING btree ("event_id");
  CREATE INDEX "abstracts_user_idx" ON "abstracts" USING btree ("user_id");
  CREATE INDEX "abstracts_updated_at_idx" ON "abstracts" USING btree ("updated_at");
  CREATE INDEX "abstracts_created_at_idx" ON "abstracts" USING btree ("created_at");
  CREATE INDEX "event_registrations_abstract_idx" ON "event_registrations" USING btree ("abstract_id");
  CREATE UNIQUE INDEX "event_registrations_registration_key_idx" ON "event_registrations" USING btree ("registration_key");
  CREATE INDEX "event_registrations_cv_file_idx" ON "event_registrations" USING btree ("cv_file_id");
  CREATE INDEX "event_registrations_profile_photo_file_idx" ON "event_registrations" USING btree ("profile_photo_file_id");
  CREATE INDEX "event_registrations_passport_info_page_file_idx" ON "event_registrations" USING btree ("passport_info_page_file_id");
  CREATE INDEX "event_registrations_signature_file_idx" ON "event_registrations" USING btree ("signature_file_id");
  CREATE INDEX "event_registrations_updated_at_idx" ON "event_registrations" USING btree ("updated_at");
  CREATE INDEX "event_registrations_created_at_idx" ON "event_registrations" USING btree ("created_at");
  CREATE INDEX "latest_publications_file_idx" ON "latest_publications" USING btree ("file_id");
  CREATE INDEX "latest_publications_updated_at_idx" ON "latest_publications" USING btree ("updated_at");
  CREATE INDEX "latest_publications_created_at_idx" ON "latest_publications" USING btree ("created_at");
  CREATE UNIQUE INDEX "latest_publications_locales_locale_parent_id_unique" ON "latest_publications_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "events_key_dates_order_idx" ON "events_key_dates" USING btree ("_order");
  CREATE INDEX "events_key_dates_parent_id_idx" ON "events_key_dates" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "events_key_dates_locales_locale_parent_id_unique" ON "events_key_dates_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "events_thematic_areas_order_idx" ON "events_thematic_areas" USING btree ("_order");
  CREATE INDEX "events_thematic_areas_parent_id_idx" ON "events_thematic_areas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "events_thematic_areas_locales_locale_parent_id_unique" ON "events_thematic_areas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "events_sessions_order_idx" ON "events_sessions" USING btree ("_order");
  CREATE INDEX "events_sessions_parent_id_idx" ON "events_sessions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "events_sessions_locales_locale_parent_id_unique" ON "events_sessions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "events_image_idx" ON "events" USING btree ("image_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE UNIQUE INDEX "events_locales_locale_parent_id_unique" ON "events_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "album_media_media_items_order_idx" ON "album_media_media_items" USING btree ("_order");
  CREATE INDEX "album_media_media_items_parent_id_idx" ON "album_media_media_items" USING btree ("_parent_id");
  CREATE INDEX "album_media_media_items_file_idx" ON "album_media_media_items" USING btree ("file_id");
  CREATE UNIQUE INDEX "album_media_media_items_locales_locale_parent_id_unique" ON "album_media_media_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "album_media_cover_image_idx" ON "album_media" USING btree ("cover_image_id");
  CREATE INDEX "album_media_updated_at_idx" ON "album_media" USING btree ("updated_at");
  CREATE INDEX "album_media_created_at_idx" ON "album_media" USING btree ("created_at");
  CREATE UNIQUE INDEX "album_media_locales_locale_parent_id_unique" ON "album_media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "press_media_image_idx" ON "press_media" USING btree ("image_id");
  CREATE INDEX "press_media_source_logo_idx" ON "press_media" USING btree ("source_logo_id");
  CREATE INDEX "press_media_updated_at_idx" ON "press_media" USING btree ("updated_at");
  CREATE INDEX "press_media_created_at_idx" ON "press_media" USING btree ("created_at");
  CREATE UNIQUE INDEX "press_media_locales_locale_parent_id_unique" ON "press_media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "press_media_rels_order_idx" ON "press_media_rels" USING btree ("order");
  CREATE INDEX "press_media_rels_parent_idx" ON "press_media_rels" USING btree ("parent_id");
  CREATE INDEX "press_media_rels_path_idx" ON "press_media_rels" USING btree ("path");
  CREATE INDEX "press_media_rels_press_media_id_idx" ON "press_media_rels" USING btree ("press_media_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_public_users_id_idx" ON "payload_locked_documents_rels" USING btree ("public_users_id");
  CREATE INDEX "payload_locked_documents_rels_abstracts_id_idx" ON "payload_locked_documents_rels" USING btree ("abstracts_id");
  CREATE INDEX "payload_locked_documents_rels_event_registrations_id_idx" ON "payload_locked_documents_rels" USING btree ("event_registrations_id");
  CREATE INDEX "payload_locked_documents_rels_latest_publications_id_idx" ON "payload_locked_documents_rels" USING btree ("latest_publications_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_album_media_id_idx" ON "payload_locked_documents_rels" USING btree ("album_media_id");
  CREATE INDEX "payload_locked_documents_rels_press_media_id_idx" ON "payload_locked_documents_rels" USING btree ("press_media_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_rels_public_users_id_idx" ON "payload_preferences_rels" USING btree ("public_users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "homepage_content_about_section_boxes_order_idx" ON "homepage_content_about_section_boxes" USING btree ("_order");
  CREATE INDEX "homepage_content_about_section_boxes_parent_id_idx" ON "homepage_content_about_section_boxes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_content_about_section_boxes_locales_locale_parent_i" ON "homepage_content_about_section_boxes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_content_contact_section_contact_items_order_idx" ON "homepage_content_contact_section_contact_items" USING btree ("_order");
  CREATE INDEX "homepage_content_contact_section_contact_items_parent_id_idx" ON "homepage_content_contact_section_contact_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_content_contact_section_contact_items_locales_local" ON "homepage_content_contact_section_contact_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_content_hero_section_hero_section_background_im_idx" ON "homepage_content" USING btree ("hero_section_background_image_id");
  CREATE UNIQUE INDEX "homepage_content_locales_locale_parent_id_unique" ON "homepage_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_content_mission_section_objectives_order_idx" ON "about_content_mission_section_objectives" USING btree ("_order");
  CREATE INDEX "about_content_mission_section_objectives_parent_id_idx" ON "about_content_mission_section_objectives" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_content_mission_section_objectives_locales_locale_pare" ON "about_content_mission_section_objectives_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_content_milestones_section_milestones_order_idx" ON "about_content_milestones_section_milestones" USING btree ("_order");
  CREATE INDEX "about_content_milestones_section_milestones_parent_id_idx" ON "about_content_milestones_section_milestones" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_content_milestones_section_milestones_locales_locale_p" ON "about_content_milestones_section_milestones_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_content_experts_section_experts_order_idx" ON "about_content_experts_section_experts" USING btree ("_order");
  CREATE INDEX "about_content_experts_section_experts_parent_id_idx" ON "about_content_experts_section_experts" USING btree ("_parent_id");
  CREATE INDEX "about_content_experts_section_experts_image_idx" ON "about_content_experts_section_experts" USING btree ("image_id");
  CREATE UNIQUE INDEX "about_content_experts_section_experts_locales_locale_parent_" ON "about_content_experts_section_experts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_content_hero_section_hero_section_image_idx" ON "about_content" USING btree ("hero_section_image_id");
  CREATE UNIQUE INDEX "about_content_locales_locale_parent_id_unique" ON "about_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "events_content_hero_section_buttons_order_idx" ON "events_content_hero_section_buttons" USING btree ("_order");
  CREATE INDEX "events_content_hero_section_buttons_parent_id_idx" ON "events_content_hero_section_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "events_content_hero_section_buttons_locales_locale_parent_id" ON "events_content_hero_section_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "events_content_speakers_section_speakers_order_idx" ON "events_content_speakers_section_speakers" USING btree ("_order");
  CREATE INDEX "events_content_speakers_section_speakers_parent_id_idx" ON "events_content_speakers_section_speakers" USING btree ("_parent_id");
  CREATE INDEX "events_content_speakers_section_speakers_image_idx" ON "events_content_speakers_section_speakers" USING btree ("image_id");
  CREATE UNIQUE INDEX "events_content_speakers_section_speakers_locales_locale_pare" ON "events_content_speakers_section_speakers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "events_content_hero_section_hero_section_image_idx" ON "events_content" USING btree ("hero_section_image_id");
  CREATE UNIQUE INDEX "events_content_locales_locale_parent_id_unique" ON "events_content_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "publications_content_locales_locale_parent_id_unique" ON "publications_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_content_media_kit_section_resources_order_idx" ON "media_content_media_kit_section_resources" USING btree ("_order");
  CREATE INDEX "media_content_media_kit_section_resources_parent_id_idx" ON "media_content_media_kit_section_resources" USING btree ("_parent_id");
  CREATE INDEX "media_content_media_kit_section_resources_image_idx" ON "media_content_media_kit_section_resources" USING btree ("image_id");
  CREATE INDEX "media_content_media_kit_section_resources_file_idx" ON "media_content_media_kit_section_resources" USING btree ("file_id");
  CREATE UNIQUE INDEX "media_content_media_kit_section_resources_locales_locale_par" ON "media_content_media_kit_section_resources_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "media_content_locales_locale_parent_id_unique" ON "media_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_content_rels_order_idx" ON "media_content_rels" USING btree ("order");
  CREATE INDEX "media_content_rels_parent_idx" ON "media_content_rels" USING btree ("parent_id");
  CREATE INDEX "media_content_rels_path_idx" ON "media_content_rels" USING btree ("path");
  CREATE INDEX "media_content_rels_album_media_id_idx" ON "media_content_rels" USING btree ("album_media_id");
  CREATE INDEX "media_content_rels_press_media_id_idx" ON "media_content_rels" USING btree ("press_media_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "public_users_sessions" CASCADE;
  DROP TABLE "public_users" CASCADE;
  DROP TABLE "abstracts_keywords" CASCADE;
  DROP TABLE "abstracts" CASCADE;
  DROP TABLE "event_registrations" CASCADE;
  DROP TABLE "latest_publications" CASCADE;
  DROP TABLE "latest_publications_locales" CASCADE;
  DROP TABLE "events_key_dates" CASCADE;
  DROP TABLE "events_key_dates_locales" CASCADE;
  DROP TABLE "events_thematic_areas" CASCADE;
  DROP TABLE "events_thematic_areas_locales" CASCADE;
  DROP TABLE "events_sessions" CASCADE;
  DROP TABLE "events_sessions_locales" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "events_locales" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "album_media_media_items" CASCADE;
  DROP TABLE "album_media_media_items_locales" CASCADE;
  DROP TABLE "album_media" CASCADE;
  DROP TABLE "album_media_locales" CASCADE;
  DROP TABLE "press_media" CASCADE;
  DROP TABLE "press_media_locales" CASCADE;
  DROP TABLE "press_media_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "homepage_content_about_section_boxes" CASCADE;
  DROP TABLE "homepage_content_about_section_boxes_locales" CASCADE;
  DROP TABLE "homepage_content_contact_section_contact_items" CASCADE;
  DROP TABLE "homepage_content_contact_section_contact_items_locales" CASCADE;
  DROP TABLE "homepage_content" CASCADE;
  DROP TABLE "homepage_content_locales" CASCADE;
  DROP TABLE "about_content_mission_section_objectives" CASCADE;
  DROP TABLE "about_content_mission_section_objectives_locales" CASCADE;
  DROP TABLE "about_content_milestones_section_milestones" CASCADE;
  DROP TABLE "about_content_milestones_section_milestones_locales" CASCADE;
  DROP TABLE "about_content_experts_section_experts" CASCADE;
  DROP TABLE "about_content_experts_section_experts_locales" CASCADE;
  DROP TABLE "about_content" CASCADE;
  DROP TABLE "about_content_locales" CASCADE;
  DROP TABLE "events_content_hero_section_buttons" CASCADE;
  DROP TABLE "events_content_hero_section_buttons_locales" CASCADE;
  DROP TABLE "events_content_speakers_section_speakers" CASCADE;
  DROP TABLE "events_content_speakers_section_speakers_locales" CASCADE;
  DROP TABLE "events_content" CASCADE;
  DROP TABLE "events_content_locales" CASCADE;
  DROP TABLE "publications_content" CASCADE;
  DROP TABLE "publications_content_locales" CASCADE;
  DROP TABLE "media_content_media_kit_section_resources" CASCADE;
  DROP TABLE "media_content_media_kit_section_resources_locales" CASCADE;
  DROP TABLE "media_content" CASCADE;
  DROP TABLE "media_content_locales" CASCADE;
  DROP TABLE "media_content_rels" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_abstracts_status";
  DROP TYPE "public"."enum_event_registrations_status";
  DROP TYPE "public"."enum_event_registrations_food_preference";
  DROP TYPE "public"."enum_latest_publications_tag";
  DROP TYPE "public"."enum_album_media_media_items_type";
  DROP TYPE "public"."enum_homepage_content_about_section_boxes_icon";
  DROP TYPE "public"."enum_events_content_hero_section_buttons_style";
  DROP TYPE "public"."enum_events_content_registration_section_left_box_icon";
  DROP TYPE "public"."enum_events_content_registration_section_right_box_icon";`)
}
