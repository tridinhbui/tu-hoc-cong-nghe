-- Public, anonymous-callable count of completed lessons across all users,
-- for the homepage hero's live stats ("X bài học đã hoàn thành"). Same
-- reasoning as get_total_user_count (20260713_total_user_count.sql):
-- user_progress's RLS only allows a user to see their own rows, so a plain
-- client-side count() from a logged-out visitor would return 0. Returns
-- only a count, never any row data, so there's no PII exposure.

create or replace function public.get_total_completed_lessons_count()
returns bigint
language sql
security definer
set search_path = public
stable
as $$
  select count(*) from public.user_progress where completed = true;
$$;

grant execute on function public.get_total_completed_lessons_count() to anon, authenticated;
