-- "Học cùng nhóm" (study squads): small (default cap 5) topic-based groups
-- that either get randomly matched into an open room or joined manually by
-- browsing - unlike the 1:1 referral loop this is meant to be an ongoing
-- engagement lever (a standing shared weekly goal + mini leaderboard), not a
-- one-time invite. Deliberately NOT built on user_friendships/direct_messages
-- - joining a study room shouldn't require befriending 4 strangers first,
-- and group chat is a larger follow-up, not in this migration's scope.
create table if not exists public.study_rooms (
  id bigint generated always as identity primary key,
  topic text not null check (topic in ('personal', 'professional', 'cfa')),
  -- Approximate weekly XP goal for the room, checked against a rough
  -- "lessons completed this week by active members * 10" proxy (see
  -- get_study_rooms/get_my_study_room below) - a full per-source weekly XP
  -- ledger doesn't exist yet (total_xp is a running total, not bucketed by
  -- week), so this is intentionally approximate rather than exact.
  weekly_xp_goal integer not null default 500,
  max_members integer not null default 5,
  created_at timestamp with time zone not null default now()
);

create table if not exists public.study_room_members (
  id bigint generated always as identity primary key,
  room_id bigint not null references public.study_rooms(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  joined_at timestamp with time zone not null default now(),
  left_at timestamp with time zone
);

-- One active (not-yet-left) room per user at a time - keeps matchmaking and
-- the "your current room" UI simple (no picking-which-room ambiguity).
create unique index if not exists study_room_members_one_active_idx
  on public.study_room_members(user_id) where left_at is null;

create index if not exists study_room_members_room_active_idx
  on public.study_room_members(room_id) where left_at is null;

alter table public.study_rooms enable row level security;
alter table public.study_room_members enable row level security;

-- Rooms/memberships are readable by any authenticated user (browsing open
-- rooms before joining is the whole point - "cho người ta có muốn tham gia
-- không"), same public-roster precedent as the leaderboard. All writes go
-- through the security-definer RPCs below, not direct table access, so a
-- client can't join/leave on someone else's behalf or edit room settings.
drop policy if exists "Authenticated users can view study rooms" on public.study_rooms;
create policy "Authenticated users can view study rooms"
  on public.study_rooms for select
  to authenticated
  using (true);

drop policy if exists "Authenticated users can view study room members" on public.study_room_members;
create policy "Authenticated users can view study room members"
  on public.study_room_members for select
  to authenticated
  using (true);

grant select on public.study_rooms to authenticated;
grant select on public.study_room_members to authenticated;

-- Joins the caller into the first open room (member count < max_members)
-- for the given topic, or creates a fresh one if none has space. Leaves
-- whatever room the caller is currently in first (the one-active-room-at-a-
-- time rule), so calling this again just moves them to a different topic
-- instead of erroring on the unique index.
create or replace function public.join_or_create_study_room(p_topic text)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  v_room_id bigint;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;
  if p_topic not in ('personal', 'professional', 'cfa') then
    raise exception 'Invalid topic';
  end if;

  update public.study_room_members
  set left_at = now()
  where user_id = auth.uid() and left_at is null;

  select r.id into v_room_id
  from public.study_rooms r
  where r.topic = p_topic
    and (
      select count(*) from public.study_room_members m
      where m.room_id = r.id and m.left_at is null
    ) < r.max_members
  order by r.created_at asc
  limit 1;

  if v_room_id is null then
    insert into public.study_rooms (topic) values (p_topic)
    returning id into v_room_id;
  end if;

  insert into public.study_room_members (room_id, user_id)
  values (v_room_id, auth.uid());

  return v_room_id;
end;
$$;

-- Same as join_or_create_study_room but for manually picking a specific
-- room from the browse list instead of random matching - re-checks
-- capacity server-side since the client's view of member counts can be
-- stale by the time they click "Tham gia".
create or replace function public.join_study_room(p_room_id bigint)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer;
  v_max integer;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  select max_members into v_max from public.study_rooms where id = p_room_id;
  if v_max is null then
    raise exception 'Room not found';
  end if;

  select count(*) into v_count from public.study_room_members
  where room_id = p_room_id and left_at is null;
  if v_count >= v_max then
    raise exception 'Room is full';
  end if;

  update public.study_room_members
  set left_at = now()
  where user_id = auth.uid() and left_at is null;

  insert into public.study_room_members (room_id, user_id)
  values (p_room_id, auth.uid());
end;
$$;

create or replace function public.leave_study_room()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.study_room_members
  set left_at = now()
  where user_id = auth.uid() and left_at is null;
end;
$$;

-- Browsable list of open rooms for a topic (or all topics), with member
-- count/capacity and a rough weekly-progress figure (see weekly_xp_goal's
-- comment above for why it's an approximation).
create or replace function public.get_study_rooms(p_topic text default null)
returns table (
  room_id bigint,
  topic text,
  member_count bigint,
  max_members integer,
  weekly_xp_goal integer,
  weekly_xp_progress bigint,
  created_at timestamp with time zone
)
language sql
security definer
set search_path = public
as $$
  select
    r.id,
    r.topic,
    count(m.id) filter (where m.left_at is null),
    r.max_members,
    r.weekly_xp_goal,
    coalesce(sum(
      case when m.left_at is null then
        (select count(*) from public.user_progress up
         where up.user_id = m.user_id and up.completed = true
           and up.completed_at >= date_trunc('week', now()))
      else 0 end
    ), 0) * 10,
    r.created_at
  from public.study_rooms r
  left join public.study_room_members m on m.room_id = r.id
  where auth.uid() is not null
    and (p_topic is null or r.topic = p_topic)
  group by r.id
  having count(m.id) filter (where m.left_at is null) < r.max_members
  order by r.created_at desc
  limit 30;
$$;

-- The caller's current active room (if any), same shape as get_study_rooms
-- plus the member roster with each member's this-week lesson count for the
-- mini leaderboard.
create or replace function public.get_my_study_room()
returns table (
  room_id bigint,
  topic text,
  member_count bigint,
  max_members integer,
  weekly_xp_goal integer,
  weekly_xp_progress bigint,
  created_at timestamp with time zone
)
language sql
security definer
set search_path = public
as $$
  select
    r.id,
    r.topic,
    count(m2.id) filter (where m2.left_at is null),
    r.max_members,
    r.weekly_xp_goal,
    coalesce(sum(
      case when m2.left_at is null then
        (select count(*) from public.user_progress up
         where up.user_id = m2.user_id and up.completed = true
           and up.completed_at >= date_trunc('week', now()))
      else 0 end
    ), 0) * 10,
    r.created_at
  from public.study_rooms r
  join public.study_room_members mine on mine.room_id = r.id
    and mine.user_id = auth.uid() and mine.left_at is null
  left join public.study_room_members m2 on m2.room_id = r.id
  group by r.id;
$$;

create or replace function public.get_study_room_members(p_room_id bigint)
returns table (
  user_id uuid,
  full_name text,
  avatar_url text,
  current_level integer,
  total_xp integer,
  weekly_lessons bigint
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
    up.total_xp,
    (select count(*) from public.user_progress p
     where p.user_id = up.id and p.completed = true
       and p.completed_at >= date_trunc('week', now()))
  from public.study_room_members m
  join public.user_profiles up on up.id = m.user_id
  where auth.uid() is not null
    and m.room_id = p_room_id
    and m.left_at is null
  order by 6 desc;
$$;

revoke all on function public.join_or_create_study_room(text) from public, anon;
revoke all on function public.join_study_room(bigint) from public, anon;
revoke all on function public.leave_study_room() from public, anon;
revoke all on function public.get_study_rooms(text) from public, anon;
revoke all on function public.get_my_study_room() from public, anon;
revoke all on function public.get_study_room_members(bigint) from public, anon;

grant execute on function public.join_or_create_study_room(text) to authenticated;
grant execute on function public.join_study_room(bigint) to authenticated;
grant execute on function public.leave_study_room() to authenticated;
grant execute on function public.get_study_rooms(text) to authenticated;
grant execute on function public.get_my_study_room() to authenticated;
grant execute on function public.get_study_room_members(bigint) to authenticated;
