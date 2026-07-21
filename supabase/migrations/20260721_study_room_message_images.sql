-- Lets members attach an image to a study-group message (drag-drop, paste,
-- or file picker in FloatingStudyGroupChat/StudyGroupsClient), same as
-- ChatWithAdminWidget already supports for the 1:1 admin chat. Reuses the
-- same public "chat-images" storage bucket/policies from
-- 20260718_chat_images.sql rather than creating a second bucket.

alter table public.study_room_messages
  add column if not exists image_url text;

-- The original check required non-empty content unconditionally, which
-- would reject an image-only message (empty text, just a picture). It was
-- declared as an unnamed table-level check in the original CREATE TABLE, so
-- its actual Postgres-generated name isn't guessable here - look it up.
do $$
declare
  old_constraint_name text;
begin
  select con.conname into old_constraint_name
  from pg_constraint con
  join pg_class rel on rel.oid = con.conrelid
  where rel.relname = 'study_room_messages'
    and con.contype = 'c'
    and pg_get_constraintdef(con.oid) ilike '%char_length(trim(content))%'
    and pg_get_constraintdef(con.oid) not ilike '%image_url%';

  if old_constraint_name is not null then
    execute format('alter table public.study_room_messages drop constraint %I', old_constraint_name);
  end if;
end $$;

alter table public.study_room_messages
  drop constraint if exists study_room_messages_content_or_image_check;

alter table public.study_room_messages
  add constraint study_room_messages_content_or_image_check
  check (char_length(trim(content)) between 0 and 2000 and (char_length(trim(content)) > 0 or image_url is not null));
