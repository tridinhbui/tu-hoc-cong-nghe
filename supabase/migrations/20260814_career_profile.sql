-- Hồ sơ năng lực nghề nghiệp (career competency profile), Job Skill Gap and
-- Weekly Career Mission - all three surfaces added to /su-nghiep.
--
-- Design note: the competency scores and the skill gap are NOT stored. They
-- are derived on every read from data the app already writes (user_progress,
-- user_quiz_sessions, cfa_module_progress, user_career_goals) by
-- app/api/career-profile/route.ts, so there is no second copy of "how much
-- does this user know" to drift out of sync with the real progress tables.
-- Only the two things that cannot be derived get tables here: CV bullets the
-- user types, and the ledger of which weekly missions have been paid out.

-- 1. Mock interview quiz track ------------------------------------------
--
-- 20260729_allow_ib_quiz_track.sql widened user_quiz_sessions.track to
-- include 'ib' (the IB question-bank drill on /kiem-tra). A mock interview
-- run is a different thing - longer, timed, spread across interview
-- categories - and "Interview readiness" weighs it far more heavily than a
-- 5-question drill, so it needs to be distinguishable in the same table
-- rather than blended into 'ib'.
alter table public.user_quiz_sessions drop constraint if exists user_quiz_sessions_track_check;
alter table public.user_quiz_sessions add constraint user_quiz_sessions_track_check
  check (track in ('personal', 'professional', 'cfa', 'ib', 'mock-interview'));

-- 2. CV bullets ----------------------------------------------------------
--
-- Written by the "viết 3 CV bullets" weekly mission. Insert/update/delete
-- stay open to the owner (this is the user's own free text, no XP is minted
-- off the row itself) - only the mission payout is server-authoritative, and
-- that route counts rows rather than trusting a client-supplied count.
create table if not exists public.user_cv_bullets (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  career_id text not null,
  content text not null check (char_length(content) between 10 and 500),
  created_at timestamp with time zone not null default now()
);

create index if not exists user_cv_bullets_user_idx
  on public.user_cv_bullets(user_id, created_at desc);

alter table public.user_cv_bullets enable row level security;

drop policy if exists "Users can view their own CV bullets" on public.user_cv_bullets;
create policy "Users can view their own CV bullets"
  on public.user_cv_bullets for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can write their own CV bullets" on public.user_cv_bullets;
create policy "Users can write their own CV bullets"
  on public.user_cv_bullets for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can edit their own CV bullets" on public.user_cv_bullets;
create policy "Users can edit their own CV bullets"
  on public.user_cv_bullets for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own CV bullets" on public.user_cv_bullets;
create policy "Users can delete their own CV bullets"
  on public.user_cv_bullets for delete
  to authenticated
  using (auth.uid() = user_id);

grant select, insert, update, delete on public.user_cv_bullets to authenticated;
grant usage, select on sequence public.user_cv_bullets_id_seq to authenticated;

-- 3. Weekly career mission payouts ---------------------------------------
--
-- Pure ledger: one row per (user, ISO week, mission) that has been claimed.
-- Same threat model as user_quest_completions
-- (20260813_harden_quest_and_recall_xp.sql): xp_earned feeds
-- recalculateUserStats' total_xp sum, so the client must not be able to
-- write it. INSERT is granted to service_role only -
-- app/api/career-profile/claim/route.ts re-derives the amount from
-- lib/weekly-career-mission.ts and re-verifies the mission is actually
-- complete before inserting. The unique constraint makes a double-claim a
-- 23505 instead of double XP.
create table if not exists public.user_career_mission_claims (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  week_key text not null check (week_key ~ '^\d{4}-W\d{2}$'),
  mission_id text not null check (char_length(mission_id) <= 64),
  xp_earned integer not null check (xp_earned >= 0 and xp_earned <= 100),
  coin_earned integer not null default 0 check (coin_earned >= 0 and coin_earned <= 200),
  claimed_at timestamp with time zone not null default now(),
  unique (user_id, week_key, mission_id)
);

create index if not exists user_career_mission_claims_user_week_idx
  on public.user_career_mission_claims(user_id, week_key);

alter table public.user_career_mission_claims enable row level security;

drop policy if exists "Users can view their own mission claims" on public.user_career_mission_claims;
create policy "Users can view their own mission claims"
  on public.user_career_mission_claims for select
  to authenticated
  using (auth.uid() = user_id);

grant select on public.user_career_mission_claims to authenticated;
revoke insert, update, delete on public.user_career_mission_claims from authenticated;
