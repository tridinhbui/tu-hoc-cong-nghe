-- ============================================================================
-- avatars storage bucket
-- ============================================================================
-- app/settings/page.tsx uploads profile pictures straight from the browser
-- to supabase.storage.from("avatars"), but no migration ever created this
-- bucket - every avatar upload has been failing with "bucket not found".
-- Public read (avatar URLs are shown via getPublicUrl to other users, e.g.
-- on the leaderboard), authenticated write.

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

drop policy if exists "Avatar images are publicly accessible" on storage.objects;
create policy "Avatar images are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'avatars');

drop policy if exists "Authenticated users can upload avatars" on storage.objects;
create policy "Authenticated users can upload avatars"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'avatars');

drop policy if exists "Authenticated users can update avatars" on storage.objects;
create policy "Authenticated users can update avatars"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'avatars');
