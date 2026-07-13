-- Public, anonymous-callable count of registered accounts for the homepage
-- hero ("Hơn X người học đã tham gia"). user_profiles' RLS only allows
-- `auth.uid() = id`, so a plain client-side count() would return 0 (or just
-- 1) for a logged-out visitor - same reasoning as the leaderboard/level-stats
-- RPCs, except this one is intentionally granted to `anon` too since the
-- homepage is shown to signed-out visitors. Returns only a count, never any
-- row data, so there's no PII exposure in making it public.

create or replace function public.get_total_user_count()
returns bigint
language sql
security definer
set search_path = public
stable
as $$
  select count(*) from public.user_profiles;
$$;

grant execute on function public.get_total_user_count() to anon, authenticated;
