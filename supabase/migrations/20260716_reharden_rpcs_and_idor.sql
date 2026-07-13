-- Security audit follow-up (3 findings):
--
-- 1) search_accounts()/get_my_social_graph() were hardened to drop the
--    `email` column in 20260713_badges_and_social_privacy_hardening.sql,
--    but that file and 20260713_social_friends_and_messages.sql (which
--    still defines the leakier, email-including version) share the same
--    date prefix. If migrations are ever replayed from scratch in
--    lexicographic filename order ("b..." before "s..."), the leaky
--    version applies LAST and silently undoes the privacy fix. Re-applying
--    the hardened definitions here, after both by filename, makes the
--    final state correct regardless of history/replay order.
--
-- 2) get_my_leaderboard_rank(p_metric, p_user_id) and
--    get_level_stats(p_user_id) are SECURITY DEFINER and accept p_user_id
--    as a plain argument with no check that it's the caller's own id -
--    called from the browser (lib/supabase-user.ts uses the anon-key
--    client, not a server-only one), so any signed-in user could pass
--    another user's uuid (obtainable via search_accounts) and read that
--    person's private rank/XP percentile. Both are patched to ignore
--    p_user_id unless it matches auth.uid().
--
-- 3) get_daily_active_users(days) had no explicit grant/revoke - Postgres
--    grants EXECUTE on new functions to PUBLIC by default (unlike tables),
--    so unless revoked, any authenticated (or anon, depending on project
--    defaults) caller could hit this admin-only analytics RPC directly via
--    PostgREST, bypassing requireAdmin() entirely since the function
--    itself never checks role.

-- ---- 1) Re-harden search_accounts / get_my_social_graph (no email column) ----

drop function if exists public.search_accounts(text, integer);
create function public.search_accounts(search_term text, result_limit integer default 8)
returns table (
  id uuid,
  full_name text,
  avatar_url text,
  current_level integer,
  total_xp integer
)
language sql
security definer
set search_path = public
as $$
  select
    up.id,
    up.full_name,
    up.avatar_url,
    up.current_level,
    up.total_xp
  from public.user_profiles up
  where auth.uid() is not null
    and up.id <> auth.uid()
    and (
      search_term is not null
      and length(trim(search_term)) >= 2
      and (
        coalesce(up.full_name, '') ilike '%' || trim(search_term) || '%'
        or coalesce(up.email, '') ilike '%' || trim(search_term) || '%'
      )
    )
  order by
    case
      when coalesce(up.full_name, '') ilike trim(search_term) || '%' then 0
      when coalesce(up.email, '') ilike trim(search_term) || '%' then 1
      else 2
    end,
    up.total_xp desc,
    up.created_at desc
  limit greatest(1, least(coalesce(result_limit, 8), 20));
$$;

drop function if exists public.get_my_social_graph();
create function public.get_my_social_graph()
returns table (
  friendship_id bigint,
  user_id uuid,
  full_name text,
  avatar_url text,
  current_level integer,
  total_xp integer,
  status text,
  requested_by uuid,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  responded_at timestamp with time zone,
  direction text
)
language sql
security definer
set search_path = public
as $$
  select
    f.id as friendship_id,
    other_user.id as user_id,
    other_user.full_name,
    other_user.avatar_url,
    other_user.current_level,
    other_user.total_xp,
    f.status,
    f.requested_by,
    f.created_at,
    f.updated_at,
    f.responded_at,
    case
      when f.status = 'accepted' then 'friend'
      when f.requested_by = auth.uid() then 'outgoing'
      else 'incoming'
    end as direction
  from public.user_friendships f
  join public.user_profiles other_user
    on other_user.id = case when f.user_a = auth.uid() then f.user_b else f.user_a end
  where auth.uid() is not null
    and (auth.uid() = f.user_a or auth.uid() = f.user_b)
  order by
    case when f.status = 'pending' then 0 else 1 end,
    f.updated_at desc,
    f.created_at desc;
$$;

grant execute on function public.search_accounts(text, integer) to authenticated;
grant execute on function public.get_my_social_graph() to authenticated;

-- ---- 2) IDOR fix: ignore p_user_id unless it's the caller's own id ----

create or replace function public.get_my_leaderboard_rank(p_metric text, p_user_id uuid)
returns table(rank bigint, value numeric)
language plpgsql
security definer
set search_path = public
as $$
declare
  my_value numeric;
begin
  if p_user_id is distinct from auth.uid() then
    return;
  end if;

  if p_metric = 'streak' then
    select current_streak into my_value from public.user_streaks where user_id = p_user_id;
    if my_value is null then return; end if;
    return query
      select (count(*) + 1)::bigint, my_value
      from public.user_streaks
      where current_streak > my_value;
  else
    select (case p_metric
              when 'lessons' then total_lessons_completed
              when 'avg_score' then avg_quiz_score
              else total_xp
            end)::numeric into my_value
    from public.user_stats where user_id = p_user_id;
    if my_value is null then return; end if;
    return query
      select (count(*) + 1)::bigint, my_value
      from public.user_stats
      where (case p_metric
               when 'lessons' then total_lessons_completed
               when 'avg_score' then avg_quiz_score
               else total_xp
             end) > my_value;
  end if;
end;
$$;

grant execute on function public.get_my_leaderboard_rank(text, uuid) to authenticated;

create or replace function public.get_level_stats(p_user_id uuid default null)
returns table(level int, user_count bigint, total_users bigint, my_rank bigint, top_users jsonb)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_total bigint;
  v_rank bigint;
  v_effective_user_id uuid;
begin
  -- Only compute a personalized rank for the caller's own account - a
  -- p_user_id belonging to someone else is treated the same as null
  -- (aggregate-only, no "my_rank").
  v_effective_user_id := case when p_user_id = auth.uid() then p_user_id else null end;

  select count(*) into v_total from public.user_stats;

  if v_effective_user_id is not null then
    select count(*) + 1 into v_rank
    from public.user_stats
    where total_xp > coalesce((select total_xp from public.user_stats where user_id = v_effective_user_id), -1);
  end if;

  return query
    select lvl.level,
           count(us.user_id) as user_count,
           v_total as total_users,
           v_rank as my_rank,
           coalesce((
             select jsonb_agg(t.* order by t.xp desc)
             from (
               select
                 coalesce(nullif(up.full_name, ''), split_part(up.email, '@', 1), 'Người học') as name,
                 up.avatar_url,
                 us2.total_xp as xp
               from public.user_stats us2
               join public.user_profiles up on up.id = us2.user_id
               where us2.total_xp between lvl.min_xp and lvl.max_xp
               order by us2.total_xp desc
               limit 5
             ) t
           ), '[]'::jsonb) as top_users
    from (values (1, 0, 99), (2, 100, 299), (3, 300, 599), (4, 600, 999), (5, 1000, 1499), (6, 1500, 999999999)) as lvl(level, min_xp, max_xp)
    left join public.user_stats us on us.total_xp between lvl.min_xp and lvl.max_xp
    group by lvl.level, lvl.min_xp, lvl.max_xp, v_total, v_rank
    order by lvl.level;
end;
$$;

grant execute on function public.get_level_stats(uuid) to authenticated;

-- ---- 3) get_daily_active_users: admin-only, restrict to service_role ----

revoke execute on function public.get_daily_active_users(int) from public, anon, authenticated;
grant execute on function public.get_daily_active_users(int) to service_role;
