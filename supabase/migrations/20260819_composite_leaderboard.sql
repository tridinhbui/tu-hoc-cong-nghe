-- Composite ranking score: one number meant to be the fairest overall measure
-- of a learner, weighted towards actual knowledge rather than time spent.
--
-- Rationale (product decision): raw total_xp rewards grinding - daily check-in
-- streak rewards, chests and mini-games all add to it - so it does not say much
-- about whether someone understands the material. The promotion exam
-- (user_level_exams, server-graded since 20260818) is the strongest available
-- signal of real knowledge, so it carries heavy weight, while the check-in
-- reward is explicitly excluded.
--
--   35%  learning XP  - total_xp minus daily-login chest XP, i.e. XP from
--                       lessons, quizzes, recalls and missions but NOT from
--                       simply showing up each day.
--   30%  promotion exam - server-graded passes only. 'legacy_local' rows were
--                       graded in the browser before 20260818 and are
--                       unverifiable, so they earn nothing here rather than
--                       being silently trusted.
--   20%  quiz accuracy - avg_quiz_score, how correct they actually are.
--   15%  streak       - consistency still counts, but least.
--
-- Each component is normalised to 0..1 against a FIXED reference ceiling, not
-- against the current top user. Normalising against the leader would make
-- everyone's score move when one outlier joins, and would make the number
-- meaningless over time.
--
--   learning: 40,000 XP - what Level 15 requires (see
--             20260815_bound_progress_tables.sql), i.e. "finished the app".
--   exam:     1,400 = 14 levels x 100%, so the component rewards both breadth
--             (how many levels certified) and quality (the score on each).
--   accuracy: 100 - avg_quiz_score is already a percentage.
--   streak:   100 days - beyond that, more consistency adds nothing.
--
-- Reported on a 0..1000 scale so ranks separate legibly without decimals.

create or replace function public.composite_score_components()
returns table (
  user_id uuid,
  name text,
  avatar_url text,
  learning_xp numeric,
  exam_points numeric,
  accuracy numeric,
  streak_days numeric,
  composite numeric
)
language sql
security definer
set search_path = public
as $$
  with checkin_xp as (
    -- The daily check-in reward, deliberately excluded from the learning
    -- component. 'daily_login' became a valid chest source in
    -- 20260801_allow_daily_login_chest_source.sql; on data written before that
    -- there simply are no matching rows, so this sums to 0 and nothing is
    -- subtracted.
    select c.user_id, coalesce(sum(c.xp_earned), 0)::numeric as xp
    from public.user_chests c
    where c.source = 'daily_login'
    group by c.user_id
  ),
  exam_totals as (
    select e.user_id, coalesce(sum(e.score), 0)::numeric as points
    from public.user_level_exams e
    where e.source = 'server_graded'
    group by e.user_id
  ),
  base as (
    select
      up.id as user_id,
      coalesce(nullif(up.full_name, ''), split_part(up.email, '@', 1), 'Người học') as name,
      up.avatar_url,
      greatest(0, coalesce(up.total_xp, 0)::numeric - coalesce(cx.xp, 0)) as learning_xp,
      coalesce(et.points, 0) as exam_points,
      greatest(0, least(100, coalesce(up.avg_quiz_score, 0)::numeric)) as accuracy,
      greatest(0, coalesce(st.current_streak, 0))::numeric as streak_days
    from public.user_profiles up
    left join checkin_xp cx on cx.user_id = up.id
    left join exam_totals et on et.user_id = up.id
    left join public.user_streaks st on st.user_id = up.id
    where coalesce(up.is_disabled, false) = false
      and coalesce(up.role, 'user') <> 'admin'
  )
  select
    b.user_id,
    b.name,
    b.avatar_url,
    b.learning_xp,
    b.exam_points,
    b.accuracy,
    b.streak_days,
    round(
      1000 * (
        0.35 * least(1, b.learning_xp / 40000)
      + 0.30 * least(1, b.exam_points / 1400)
      + 0.20 * (b.accuracy / 100)
      + 0.15 * least(1, b.streak_days / 100)
      )
    )::numeric as composite
  from base b;
$$;

create or replace function public.get_composite_leaderboard(p_limit int default 10)
returns table (user_id uuid, name text, value numeric, avatar_url text)
language sql
security definer
set search_path = public
as $$
  select c.user_id, c.name, c.composite as value, c.avatar_url
  from public.composite_score_components() c
  order by c.composite desc, c.exam_points desc, c.learning_xp desc
  limit greatest(1, least(coalesce(p_limit, 10), 50));
$$;

-- Rank + the component breakdown for one user, so the UI can explain *why*
-- their score is what it is instead of showing an opaque number.
create or replace function public.get_my_composite_rank(p_user_id uuid)
returns table (
  rank bigint,
  value numeric,
  learning_xp numeric,
  exam_points numeric,
  accuracy numeric,
  streak_days numeric
)
language sql
security definer
set search_path = public
as $$
  with scored as (
    select
      c.*,
      rank() over (order by c.composite desc) as rnk
    from public.composite_score_components() c
  )
  select s.rnk, s.composite, s.learning_xp, s.exam_points, s.accuracy, s.streak_days
  from scored s
  -- Own row only: the breakdown reveals another learner's exam points and
  -- accuracy, which the public top-N deliberately does not expose.
  where s.user_id = p_user_id
    and p_user_id = auth.uid();
$$;

-- composite_score_components exposes every learner's raw components, so it is
-- an internal building block only - the two wrappers above are the public
-- surface (one returns a public top-N, the other only ever one user's own row).
revoke all on function public.composite_score_components() from public, anon, authenticated;
revoke all on function public.get_composite_leaderboard(int) from public, anon;
revoke all on function public.get_my_composite_rank(uuid) from public, anon;

grant execute on function public.get_composite_leaderboard(int) to authenticated;
grant execute on function public.get_my_composite_rank(uuid) to authenticated;
