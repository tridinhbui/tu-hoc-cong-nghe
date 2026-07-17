-- Lets users attach a screenshot/image to a message in ChatWithAdminWidget
-- (drag-drop, paste, or file picker). Public read (images are shown via
-- getPublicUrl in both the user's widget and the admin ChatThreadsPanel),
-- authenticated write - same pattern as the avatars bucket.

alter table public.chat_messages
  add column if not exists image_url text;

insert into storage.buckets (id, name, public)
values ('chat-images', 'chat-images', true)
on conflict (id) do nothing;

drop policy if exists "Chat images are publicly accessible" on storage.objects;
create policy "Chat images are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'chat-images');

drop policy if exists "Authenticated users can upload chat images" on storage.objects;
create policy "Authenticated users can upload chat images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'chat-images');
