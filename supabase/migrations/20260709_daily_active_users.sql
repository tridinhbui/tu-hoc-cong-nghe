-- Run this in the Supabase SQL Editor (safe to re-run - create or replace).
-- Backs the admin analytics page's "daily active users" chart
-- (lib/admin/analytics.ts calls this via .rpc("get_daily_active_users", { days })).
-- "Active" here = completed at least one lesson that day, per user_progress.completed_at.

create or replace function public.get_daily_active_users(days int)
returns table(date date, count bigint)
language sql
security definer
set search_path = public
as $$
  select
    d::date as date,
    count(distinct up.user_id) as count
  from generate_series(
    (current_date - ((days - 1) * interval '1 day')),
    current_date,
    interval '1 day'
  ) as d
  left join public.user_progress up
    on up.completed = true
    and up.completed_at::date = d::date
  group by d
  order by d;
$$;
