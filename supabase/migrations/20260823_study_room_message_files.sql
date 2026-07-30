-- Lets members attach a generic file (PDF, Word, Excel, zip, etc.) to a
-- study-group message, alongside the image support added in
-- 20260721_study_room_message_images.sql. Reuses the same public
-- "chat-images" storage bucket/policies rather than creating a new bucket -
-- the bucket already accepts any authenticated upload regardless of
-- content type, only the client-side allowlist in lib/supabase-chat.ts
-- actually restricts what gets uploaded.

alter table public.study_room_messages
  add column if not exists file_url text,
  add column if not exists file_name text;

alter table public.study_room_messages
  drop constraint if exists study_room_messages_content_or_image_check;

alter table public.study_room_messages
  add constraint study_room_messages_content_or_image_check
  check (
    char_length(trim(content)) between 0 and 2000
    and (char_length(trim(content)) > 0 or image_url is not null or file_url is not null)
  );
