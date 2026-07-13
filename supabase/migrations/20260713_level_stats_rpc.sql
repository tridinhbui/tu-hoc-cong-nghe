-- Powers the level roadmap card on the dashboard: how many users currently
-- sit at each of the 6 levels, plus the requesting user's XP rank/percentile.
-- SECURITY DEFINER because user_stats' RLS only allows `auth.uid() =
-- user_id` - a plain client query would only ever see the caller's own row,
-- same reason the leaderboard RPCs (20260711_leaderboard_rpc.sql) exist.
-- Level thresholds are hardcoded here to match lib/levels.ts's LEVELS array;
-- if that array changes, this function must be updated to match.

create or replace function public.get_level_stats(p_user_id uuid default null)
returns table(level int, user_count bigint, total_users bigint, my_rank bigint)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_total bigint;
  v_rank bigint;
begin
  select count(*) into v_total from public.user_stats;

  if p_user_id is not null then
    select count(*) + 1 into v_rank
    from public.user_stats
    where total_xp > coalesce((select total_xp from public.user_stats where user_id = p_user_id), -1);
  end if;

  return query
    select lvl.level,
           count(us.user_id) as user_count,
           v_total as total_users,
           v_rank as my_rank
    from (values (1, 0, 99), (2, 100, 299), (3, 300, 599), (4, 600, 999), (5, 1000, 1499), (6, 1500, 999999999)) as lvl(level, min_xp, max_xp)
    left join public.user_stats us on us.total_xp between lvl.min_xp and lvl.max_xp
    group by lvl.level, v_total, v_rank
    order by lvl.level;
end;
$$;

grant execute on function public.get_level_stats(uuid) to authenticated;
