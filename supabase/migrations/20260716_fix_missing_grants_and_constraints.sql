-- Follow-up to the data-loss report investigated 2026-07-13: the root
-- cause pattern (a table with RLS policies written but no explicit `grant`
-- to `authenticated`, or an .upsert() whose onConflict target has no
-- matching unique constraint) turned out not to be unique to
-- user_progress. Auditing every .upsert() call and every client-writable
-- table in the codebase against its migration history found the same
-- pattern in five more places. RLS alone does nothing without the
-- underlying GRANT - Postgres checks table-level privileges before RLS
-- even runs, so a missing grant means every read/write silently fails
-- with 42501 regardless of how correct the RLS policy is.
--
-- Each block below is safe to run whether or not the gap actually exists
-- in this project (idempotent: `if not exists`/`do $$ ... exception`).

-- ============================================================
-- 1) reading_progress - referenced by lib/supabase-reading.ts and
--    components/LessonPageLayout.tsx (every lesson page: scroll-position
--    persistence + 25/50/75/100% milestone toasts) but has NO migration
--    anywhere in this repo. If it was never created by hand on production
--    either, every call silently no-ops (PGRST205 is treated as benign) -
--    not a crash, just a feature that's quietly never worked.
-- ============================================================
create table if not exists public.reading_progress (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id bigint not null,
  scroll_percent integer not null default 0,
  max_percent_reached integer not null default 0,
  milestone_25 boolean not null default false,
  milestone_50 boolean not null default false,
  milestone_75 boolean not null default false,
  milestone_100 boolean not null default false,
  last_read_at timestamp with time zone not null default now(),
  unique (user_id, lesson_id)
);

create index if not exists reading_progress_user_idx on public.reading_progress(user_id);

alter table public.reading_progress enable row level security;

drop policy if exists "Users can view their own reading progress" on public.reading_progress;
create policy "Users can view their own reading progress"
  on public.reading_progress for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can upsert their own reading progress" on public.reading_progress;
create policy "Users can upsert their own reading progress"
  on public.reading_progress for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own reading progress" on public.reading_progress;
create policy "Users can update their own reading progress"
  on public.reading_progress for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

grant select, insert, update on public.reading_progress to authenticated;
grant usage, select on sequence reading_progress_id_seq to authenticated;

-- ============================================================
-- 2) user_stats - same upsert-needs-a-real-constraint issue as
--    user_progress (fixed for that table in
--    20260710_ensure_user_progress_unique.sql), but that migration only
--    re-granted user_stats privileges - it never verified the unique(user_id)
--    constraint the upsert's onConflict:"user_id" actually depends on.
--    recalculateUserStats() writes here after every lesson completion, so
--    if this constraint is missing, XP/level silently stop updating even
--    after the user_progress fix lands.
-- ============================================================
do $$ begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.user_stats'::regclass
      and contype = 'u'
      and conkey = (
        select array_agg(attnum order by attnum)
        from pg_attribute
        where attrelid = 'public.user_stats'::regclass and attname = 'user_id'
      )
  ) then
    alter table public.user_stats add constraint user_stats_user_id_key unique (user_id);
  end if;
end $$;

grant select, insert, update on public.user_stats to authenticated;

-- ============================================================
-- 3) user_profiles - the most central table (total_xp, current_level,
--    lessons_completed, dark_mode, preferred_track) has RLS policies but
--    was never given an explicit grant in any migration. The app clearly
--    works today, which means either Postgres default privileges already
--    cover it, or writes have been silently failing since day one - this
--    grant is a no-op in the first case and a real fix in the second, so
--    it's safe to run either way.
-- ============================================================
grant select, insert, update on public.user_profiles to authenticated;

-- ============================================================
-- 4) lesson_notes - RLS is fully defined in 20260708_lesson_notes.sql but
--    that migration has zero GRANT statements. Personal lesson notes may
--    have been completely non-functional (read AND write) since launch.
-- ============================================================
grant select, insert, update, delete on public.lesson_notes to authenticated;

-- ============================================================
-- 5) user_friendships / direct_messages - same gap:
--    20260713_social_friends_and_messages.sql grants `execute` on two RPCs
--    but never grants table-level privileges on the tables themselves that
--    the friend-request and chat flows write to directly from the client.
-- ============================================================
grant select, insert, update on public.user_friendships to authenticated;
grant select, insert on public.direct_messages to authenticated;

-- ============================================================
-- 6) announcement_reads - had select+insert but not update. supabase-js's
--    .upsert() always compiles to INSERT ... ON CONFLICT DO UPDATE, and the
--    DO UPDATE branch needs table-level UPDATE privilege even though it's
--    only ever rewriting the same two key columns - re-dismissing an
--    already-read announcement (double click, multiple tabs) would fail.
-- ============================================================
grant update on public.announcement_reads to authenticated;
