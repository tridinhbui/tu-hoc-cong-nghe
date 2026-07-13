create table if not exists public.user_friendships (
  id bigint generated always as identity primary key,
  user_a uuid not null references public.user_profiles(id) on delete cascade,
  user_b uuid not null references public.user_profiles(id) on delete cascade,
  requested_by uuid not null references public.user_profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'rejected')),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  responded_at timestamp with time zone,
  check (user_a <> user_b),
  check (user_a < user_b),
  check (requested_by = user_a or requested_by = user_b)
);

create unique index if not exists user_friendships_pair_idx
  on public.user_friendships(user_a, user_b);

create index if not exists user_friendships_status_idx
  on public.user_friendships(status, updated_at desc);

alter table public.user_friendships enable row level security;

drop policy if exists "Users can view own friendships" on public.user_friendships;
create policy "Users can view own friendships"
  on public.user_friendships for select
  to authenticated
  using (auth.uid() = user_a or auth.uid() = user_b);

drop policy if exists "Users can create own friend requests" on public.user_friendships;
create policy "Users can create own friend requests"
  on public.user_friendships for insert
  to authenticated
  with check (
    auth.uid() = requested_by
    and status = 'pending'
    and (auth.uid() = user_a or auth.uid() = user_b)
  );

drop policy if exists "Users can update own friendships" on public.user_friendships;
create policy "Users can update own friendships"
  on public.user_friendships for update
  to authenticated
  using (auth.uid() = user_a or auth.uid() = user_b)
  with check (auth.uid() = user_a or auth.uid() = user_b);

create table if not exists public.direct_messages (
  id bigint generated always as identity primary key,
  friendship_id bigint not null references public.user_friendships(id) on delete cascade,
  sender_id uuid not null references public.user_profiles(id) on delete cascade,
  content text not null,
  read_by_recipient boolean not null default false,
  created_at timestamp with time zone not null default now(),
  check (char_length(trim(content)) between 1 and 2000)
);

create index if not exists direct_messages_friendship_created_idx
  on public.direct_messages(friendship_id, created_at asc);

alter table public.direct_messages enable row level security;

drop policy if exists "Users can view direct messages in own friendships" on public.direct_messages;
create policy "Users can view direct messages in own friendships"
  on public.direct_messages for select
  to authenticated
  using (
    exists (
      select 1
      from public.user_friendships f
      where f.id = direct_messages.friendship_id
        and f.status = 'accepted'
        and (auth.uid() = f.user_a or auth.uid() = f.user_b)
    )
  );

drop policy if exists "Users can send direct messages in accepted friendships" on public.direct_messages;
create policy "Users can send direct messages in accepted friendships"
  on public.direct_messages for insert
  to authenticated
  with check (
    auth.uid() = sender_id
    and exists (
      select 1
      from public.user_friendships f
      where f.id = direct_messages.friendship_id
        and f.status = 'accepted'
        and (auth.uid() = f.user_a or auth.uid() = f.user_b)
    )
  );

create or replace function public.search_accounts(search_term text, result_limit integer default 8)
returns table (
  id uuid,
  full_name text,
  email text,
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
    up.email,
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

create or replace function public.get_my_social_graph()
returns table (
  friendship_id bigint,
  user_id uuid,
  full_name text,
  email text,
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
    other_user.email,
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
