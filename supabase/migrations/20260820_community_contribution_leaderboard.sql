-- Replaces fabricated numbers on the "Đóng góp" (contribution) leaderboard with
-- a real count.
--
-- components/Leaderboard.tsx used to build this tab by reading the XP
-- leaderboard and inventing a value:
--
--     value: Math.max(2, Math.round(row.value * 0.15) + (35 - idx * 2))
--
-- It never touched a single community table, yet the UI presented the result to
-- learners as "X tương tác" alongside titles like "Đại sứ Cộng đồng". The data
-- to do this honestly already existed - community_posts,
-- community_post_comments and community_post_reactions have been populated
-- since 20260721/20260723.
--
-- The value is a plain SUM of real interactions, deliberately unweighted, so the
-- number matches the label the UI shows ("X tương tác") instead of being a score
-- that only looks like a count:
--
--   * posts the learner wrote (hidden/moderated posts excluded)
--   * comments they wrote
--   * reactions they gave
--
-- Reactions and comments on a hidden post are left in, since the contribution
-- was still made; only the learner's own hidden posts stop counting for them.

create or replace function public.get_community_contribution_leaderboard(p_limit int default 10)
returns table (user_id uuid, name text, value numeric, avatar_url text)
language sql
security definer
set search_path = public
as $$
  with post_counts as (
    select p.user_id, count(*)::numeric as n
    from public.community_posts p
    where coalesce(p.is_hidden, false) = false
    group by p.user_id
  ),
  comment_counts as (
    select c.user_id, count(*)::numeric as n
    from public.community_post_comments c
    group by c.user_id
  ),
  reaction_counts as (
    select r.user_id, count(*)::numeric as n
    from public.community_post_reactions r
    group by r.user_id
  ),
  totals as (
    select
      up.id as user_id,
      coalesce(nullif(up.full_name, ''), split_part(up.email, '@', 1), 'Người học') as name,
      up.avatar_url,
      coalesce(pc.n, 0) + coalesce(cc.n, 0) + coalesce(rc.n, 0) as value
    from public.user_profiles up
    left join post_counts pc on pc.user_id = up.id
    left join comment_counts cc on cc.user_id = up.id
    left join reaction_counts rc on rc.user_id = up.id
    where coalesce(up.is_disabled, false) = false
      and coalesce(up.role, 'user') <> 'admin'
  )
  select t.user_id, t.name, t.value, t.avatar_url
  from totals t
  -- Nobody with zero contributions: an empty board is honest, a board padded
  -- with 0s pretending to be a ranking is not.
  where t.value > 0
  order by t.value desc
  limit greatest(1, least(coalesce(p_limit, 10), 50));
$$;

create or replace function public.get_my_community_contribution_rank(p_user_id uuid)
returns table (rank bigint, value numeric)
language sql
security definer
set search_path = public
as $$
  with post_counts as (
    select p.user_id, count(*)::numeric as n
    from public.community_posts p
    where coalesce(p.is_hidden, false) = false
    group by p.user_id
  ),
  comment_counts as (
    select c.user_id, count(*)::numeric as n
    from public.community_post_comments c
    group by c.user_id
  ),
  reaction_counts as (
    select r.user_id, count(*)::numeric as n
    from public.community_post_reactions r
    group by r.user_id
  ),
  totals as (
    select
      up.id as user_id,
      coalesce(pc.n, 0) + coalesce(cc.n, 0) + coalesce(rc.n, 0) as value
    from public.user_profiles up
    left join post_counts pc on pc.user_id = up.id
    left join comment_counts cc on cc.user_id = up.id
    left join reaction_counts rc on rc.user_id = up.id
    where coalesce(up.is_disabled, false) = false
      and coalesce(up.role, 'user') <> 'admin'
  ),
  scored as (
    select t.user_id, t.value, rank() over (order by t.value desc) as rnk
    from totals t
    where t.value > 0
  )
  select s.rnk, s.value
  from scored s
  where s.user_id = p_user_id
    and p_user_id = auth.uid();
$$;

revoke all on function public.get_community_contribution_leaderboard(int) from public, anon;
revoke all on function public.get_my_community_contribution_rank(uuid) from public, anon;

grant execute on function public.get_community_contribution_leaderboard(int) to authenticated;
grant execute on function public.get_my_community_contribution_rank(uuid) to authenticated;
