-- "Online now" presence. A lightweight heartbeat (lib/presence.ts,
-- fired every ~60s while the app is open) bumps last_seen_at for the
-- current user - anyone whose last_seen_at is within the last 5 minutes
-- counts as online.
alter table public.user_profiles
  add column if not exists last_seen_at timestamp with time zone;

create index if not exists user_profiles_last_seen_idx on public.user_profiles(last_seen_at);

-- user_profiles' SELECT policy only allows auth.uid() = id (see base
-- schema), so listing OTHER users who are online needs a security-definer
-- RPC - same pattern as get_level_stats/get_game_leaderboard, which only
-- return derived/aggregate fields, never raw cross-user row access.
create or replace function public.get_online_users(p_limit int default 12)
returns table (user_id uuid, name text, avatar_url text, last_seen_at timestamp with time zone)
language sql
security definer
set search_path = public
as $$
  select
    up.id as user_id,
    coalesce(nullif(up.full_name, ''), split_part(up.email, '@', 1), 'Người học') as name,
    up.avatar_url,
    up.last_seen_at
  from public.user_profiles up
  where up.last_seen_at > now() - interval '5 minutes'
  order by up.last_seen_at desc
  limit p_limit;
$$;

grant execute on function public.get_online_users(int) to authenticated;

create or replace function public.get_online_count()
returns bigint
language sql
security definer
set search_path = public
as $$
  select count(*) from public.user_profiles where last_seen_at > now() - interval '5 minutes';
$$;

grant execute on function public.get_online_count() to authenticated;
