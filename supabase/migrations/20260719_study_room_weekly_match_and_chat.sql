-- Part D: weekly auto-match for study rooms + group chat.
--
-- D1. Weekly auto-match: flips study_rooms from pure opt-in (join_or_create/
-- join_study_room, unchanged below) to auto-enrolling every user who was
-- active in the last 7 days into a fresh random room each week, alongside
-- the existing manual-join path which stays available as an opt-out/switch.
-- This function is only ever called by app/api/cron/weekly-study-match's
-- route handler using the service-role key - it is NOT granted to
-- `authenticated`, unlike every other study-room RPC in
-- 20260802_study_squads.sql.
create or replace function public.weekly_rematch_study_rooms()
returns table (rooms_created integer, users_matched integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_rooms_created integer := 0;
  v_users_matched integer := 0;
  v_topic text;
  v_user_ids uuid[];
  v_chunk uuid[];
  v_room_id bigint;
  i integer;
begin
  -- Close every currently-open membership - everyone gets freshly regrouped
  -- this week. The manual join_study_room/leave_study_room RPCs still work
  -- unchanged afterward for anyone who wants to switch rooms mid-week.
  update public.study_room_members
  set left_at = now()
  where left_at is null;

  -- Drop rooms that ended up with zero members after the close above (old
  -- rooms from a prior week that never got new joiners) - keeps
  -- study_rooms from accumulating stale empty rows indefinitely.
  delete from public.study_rooms r
  where not exists (
    select 1 from public.study_room_members m where m.room_id = r.id
  );

  -- Active this week = at least one completed lesson in the last 7 days.
  -- Topic = preferred_track, normalized to personal/professional (the only
  -- two values user_profiles.preferred_track ever holds) - CFA rooms stay
  -- manual-join-only since there's no "preferred CFA track" concept.
  for v_topic in select unnest(array['personal', 'professional']) loop
    select array_agg(distinct up.user_id order by up.user_id)
    into v_user_ids
    from public.user_progress up
    join public.user_profiles prof on prof.id = up.user_id
    where up.completed = true
      and up.completed_at >= now() - interval '7 days'
      and coalesce(prof.is_disabled, false) = false
      and (
        (v_topic = 'personal' and coalesce(prof.preferred_track, 'personal') = 'personal')
        or
        (v_topic = 'professional' and prof.preferred_track = 'professional')
      );

    if v_user_ids is null or array_length(v_user_ids, 1) is null then
      continue;
    end if;

    -- Shuffle then chunk into groups of 5 (study_rooms.max_members default).
    select array_agg(uid order by random())
    into v_user_ids
    from unnest(v_user_ids) as uid;

    i := 1;
    while i <= array_length(v_user_ids, 1) loop
      v_chunk := v_user_ids[i : least(i + 4, array_length(v_user_ids, 1))];

      insert into public.study_rooms (topic) values (v_topic)
      returning id into v_room_id;
      v_rooms_created := v_rooms_created + 1;

      insert into public.study_room_members (room_id, user_id)
      select v_room_id, unnest(v_chunk);
      v_users_matched := v_users_matched + array_length(v_chunk, 1);

      i := i + 5;
    end loop;
  end loop;

  return query select v_rooms_created, v_users_matched;
end;
$$;

revoke all on function public.weekly_rematch_study_rooms() from public, anon, authenticated;
grant execute on function public.weekly_rematch_study_rooms() to service_role;

-- D2. Group chat, mirroring direct_messages' shape and RLS pattern
-- (supabase/migrations/20260713_social_friends_and_messages.sql) - keyed by
-- room_id and gated on active membership instead of an accepted friendship.
create table if not exists public.study_room_messages (
  id bigint generated always as identity primary key,
  room_id bigint not null references public.study_rooms(id) on delete cascade,
  sender_id uuid not null references public.user_profiles(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone not null default now(),
  check (char_length(trim(content)) between 1 and 2000)
);

create index if not exists study_room_messages_room_created_idx
  on public.study_room_messages(room_id, created_at asc);

alter table public.study_room_messages enable row level security;

drop policy if exists "Members can view messages in their room" on public.study_room_messages;
create policy "Members can view messages in their room"
  on public.study_room_messages for select
  to authenticated
  using (
    exists (
      select 1 from public.study_room_members m
      where m.room_id = study_room_messages.room_id
        and m.user_id = auth.uid()
        and m.left_at is null
    )
  );

drop policy if exists "Members can send messages in their room" on public.study_room_messages;
create policy "Members can send messages in their room"
  on public.study_room_messages for insert
  to authenticated
  with check (
    auth.uid() = sender_id
    and exists (
      select 1 from public.study_room_members m
      where m.room_id = study_room_messages.room_id
        and m.user_id = auth.uid()
        and m.left_at is null
    )
  );

grant select, insert on public.study_room_messages to authenticated;
grant usage on sequence public.study_room_messages_id_seq to authenticated;
