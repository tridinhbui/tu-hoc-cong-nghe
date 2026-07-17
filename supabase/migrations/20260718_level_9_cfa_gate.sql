-- lib/levels.ts added a 9th tier ("Chuyên viên CFA", 7000xp) that also
-- requires completing CFA content (enforced client/server-side in
-- lib/supabase-user.ts's recalculateUserStats, not by this RPC). This
-- migration only extends get_level_stats's XP buckets to add L9's range -
-- the per-level user_count here is still XP-only bucketing (same
-- approximation the L1-L8 buckets always had), so a handful of high-XP
-- users who haven't done enough CFA content yet may show counted under L9
-- here even though their persisted current_level is capped lower.
drop function if exists public.get_level_stats(uuid);

create or replace function public.get_level_stats(p_user_id uuid default null)
returns table(level int, user_count bigint, total_users bigint, my_rank bigint, top_users jsonb)
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
    from (values
      (1, 0, 99),
      (2, 100, 299),
      (3, 300, 599),
      (4, 600, 1199),
      (5, 1200, 1999),
      (6, 2000, 3199),
      (7, 3200, 4999),
      (8, 5000, 6999),
      (9, 7000, 999999999)
    ) as lvl(level, min_xp, max_xp)
    left join public.user_stats us on us.total_xp between lvl.min_xp and lvl.max_xp
    group by lvl.level, lvl.min_xp, lvl.max_xp, v_total, v_rank
    order by lvl.level;
end;
$$;

grant execute on function public.get_level_stats(uuid) to authenticated;
