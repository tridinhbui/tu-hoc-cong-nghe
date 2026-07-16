-- Real, server-persisted reward chests - replaces the old CombinedRewardsWidget
-- implementation, which tracked everything (chest count, unlocked titles/
-- themes) in localStorage only. That meant no cross-device sync, and more
-- importantly the "+30/+50/+100 XP" a chest promised was never actually
-- added anywhere - opening a chest just called recalculateUserStats(), which
-- only ever recomputes total_xp from real activity (lessons/quiz/game/
-- referral/milestone/quest tables), so chest XP was pure decoration with no
-- effect. This table makes chest XP a real, additional source that
-- recalculateUserStats reads and folds in, same as every other XP source.
--
-- One row per chest, from earn to (eventually) open - `opened=false` rows
-- are the "unopened chest count" a user sees; opening one is an UPDATE on
-- that specific row guarded by `where opened = false`, which makes
-- double-opening the same chest naturally impossible (the second concurrent
-- update simply matches zero rows).
create table if not exists public.user_chests (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  source text not null check (source in ('weekly_quest', 'milestone_exam')),
  earned_at timestamp with time zone not null default now(),
  opened boolean not null default false,
  opened_at timestamp with time zone,
  reward_type text check (reward_type in ('title', 'xp', 'theme')),
  reward_value text,
  xp_earned integer not null default 0
);

create index if not exists user_chests_user_idx on public.user_chests(user_id);
create index if not exists user_chests_user_unopened_idx on public.user_chests(user_id) where opened = false;

alter table public.user_chests enable row level security;

drop policy if exists "Users can view their own chests" on public.user_chests;
create policy "Users can view their own chests"
  on public.user_chests for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can earn their own chests" on public.user_chests;
create policy "Users can earn their own chests"
  on public.user_chests for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can open their own chests" on public.user_chests;
create policy "Users can open their own chests"
  on public.user_chests for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

grant select, insert, update on public.user_chests to authenticated;
