-- Admin-editable YouTube video URL per lesson, read by the lesson page's
-- video player. Kept in its own small table (not in lib/lessons.ts) so
-- admins can add/change a video at runtime from app/admin/videos without a
-- redeploy - lesson content itself stays in the static generated files.
create table if not exists public.lesson_videos (
  lesson_id integer primary key,
  video_url text not null,
  updated_at timestamptz not null default now()
);

alter table public.lesson_videos enable row level security;

-- Anyone (including anon) can read - the video player is public.
create policy "lesson_videos_public_read" on public.lesson_videos
  for select using (true);

-- No insert/update/delete policy: writes only happen via the admin Server
-- Actions, which use the service-role client and bypass RLS entirely.
