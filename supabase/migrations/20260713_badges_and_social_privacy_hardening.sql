-- Harden badge writes: learners must not be able to self-insert earned
-- badges from the browser. Profile UI already derives currently-eligible
-- level badges defensively, so direct table writes are unnecessary.

alter table public.user_badges enable row level security;

drop policy if exists "Users can earn their own badges" on public.user_badges;

revoke insert on public.user_badges from authenticated;
revoke usage, select on sequence user_badges_id_seq from authenticated;

-- Tighten the public-facing social RPCs so they no longer expose raw email
-- addresses to other learners. Search may still MATCH against email
-- internally, but the returned payload is display-safe.

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
