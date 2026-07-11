-- The leaderboard queried user_stats with an embedded user_profiles(full_name,
-- email) join to get display names. user_profiles' RLS only allows
-- `auth.uid() = id`, and PostgREST's embedded resource is an inner join, so
-- every row whose user_profiles the caller can't see gets silently dropped -
-- in practice this meant the leaderboard only ever showed the current
-- user's own row (or nothing), never other learners. These SECURITY DEFINER
-- functions bypass that by running with elevated privilege, but only ever
-- return user_id/name/value - never email or any other profile column.

create or replace function public.get_leaderboard(p_metric text, p_limit int default 10)
returns table(user_id uuid, name text, value numeric)
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_metric = 'streak' then
    return query
      select s.user_id,
             coalesce(nullif(up.full_name, ''), split_part(up.email, '@', 1), 'Người học') as name,
             s.current_streak::numeric as value
      from public.user_streaks s
      join public.user_profiles up on up.id = s.user_id
      order by s.current_streak desc
      limit p_limit;
  else
    return query
      select us.user_id,
             coalesce(nullif(up.full_name, ''), split_part(up.email, '@', 1), 'Người học') as name,
             (case p_metric
                when 'lessons' then us.total_lessons_completed
                when 'avg_score' then us.avg_quiz_score
                else us.total_xp
              end)::numeric as value
      from public.user_stats us
      join public.user_profiles up on up.id = us.user_id
      order by value desc
      limit p_limit;
  end if;
end;
$$;

grant execute on function public.get_leaderboard(text, int) to authenticated;

create or replace function public.get_my_leaderboard_rank(p_metric text, p_user_id uuid)
returns table(rank bigint, value numeric)
language plpgsql
security definer
set search_path = public
as $$
declare
  my_value numeric;
begin
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
