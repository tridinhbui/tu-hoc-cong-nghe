-- Security hardening for two gaps found in review:
--
-- 1. The CFA library tables (Book/Reading/Module/LessonContent/
--    ModuleQuizHeader/ModuleQuizQuestion) were created outside this repo's
--    tracked migrations (external import), so their RLS state was never
--    auditable from the repo. This locks them down explicitly: RLS enabled,
--    read-only for signed-in users, no client write policies at all -
--    every write goes through /admin/cfa-library's server actions, which
--    use the service-role client (bypasses RLS). Idempotent and guarded on
--    table existence so it no-ops cleanly on an environment where the
--    external import hasn't been loaded.
--
-- 2. The chat-images bucket allowed any authenticated user to upload any
--    number of images to any path. Tightened to: uploads must go under the
--    uploader's own auth.uid() folder (the app has always written
--    `${userId}/<timestamp>-<rand>.<ext>` paths), capped at 200 objects
--    per user so the public bucket can't be farmed as free image hosting.

do $$
declare
  t text;
begin
  foreach t in array array['Book', 'Reading', 'Module', 'LessonContent', 'ModuleQuizHeader', 'ModuleQuizQuestion'] loop
    if exists (select 1 from pg_tables where schemaname = 'public' and tablename = t) then
      execute format('alter table public.%I enable row level security', t);
      execute format('drop policy if exists "CFA library is readable by signed-in users" on public.%I', t);
      execute format(
        'create policy "CFA library is readable by signed-in users" on public.%I for select to authenticated using (true)',
        t
      );
      execute format('revoke insert, update, delete on public.%I from anon, authenticated', t);
      execute format('grant select on public.%I to authenticated', t);
    end if;
  end loop;
end $$;

-- chat-images: replace the wide-open authenticated upload policy from
-- 20260718_chat_images.sql with folder-scoped + per-user-capped uploads.
drop policy if exists "Authenticated users can upload chat images" on storage.objects;
create policy "Authenticated users can upload chat images"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'chat-images'
    and (storage.foldername(name))[1] = auth.uid()::text
    and (
      select count(*)
      from storage.objects o
      where o.bucket_id = 'chat-images'
        and (storage.foldername(o.name))[1] = auth.uid()::text
    ) < 200
  );
