-- Study Group Missions v1: weekly room missions, persistent notes,
-- synchronized Pomodoro, group quiz attempts, message reactions, and rewards.

alter table public.study_rooms
  add column if not exists streak_weeks integer not null default 0,
  add column if not exists is_permanent boolean not null default false,
  add column if not exists leader_id uuid references public.user_profiles(id) on delete set null;

update public.study_rooms r
set leader_id = first_member.user_id
from (
  select distinct on (room_id) room_id, user_id
  from public.study_room_members
  where left_at is null
  order by room_id, joined_at asc
) first_member
where r.id = first_member.room_id
  and r.leader_id is null;

alter table public.user_chests drop constraint if exists user_chests_source_check;
alter table public.user_chests add constraint user_chests_source_check
  check (source in ('weekly_quest', 'milestone_exam', 'daily_login', 'shop_purchase', 'study_group'));

create table if not exists public.study_room_checkins (
  id bigint generated always as identity primary key,
  room_id bigint not null references public.study_rooms(id) on delete cascade,
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  day_key date not null default current_date,
  source text not null default 'chat',
  created_at timestamp with time zone not null default now(),
  unique (room_id, user_id, day_key)
);

create index if not exists study_room_checkins_room_day_idx
  on public.study_room_checkins(room_id, day_key);

alter table public.study_room_checkins enable row level security;

drop policy if exists "Members can view study room checkins" on public.study_room_checkins;
create policy "Members can view study room checkins"
  on public.study_room_checkins for select
  to authenticated
  using (
    exists (
      select 1 from public.study_room_members m
      where m.room_id = study_room_checkins.room_id
        and m.user_id = auth.uid()
        and m.left_at is null
    )
  );

grant select on public.study_room_checkins to authenticated;
grant usage on sequence public.study_room_checkins_id_seq to authenticated;

create table if not exists public.study_room_notes (
  id bigint generated always as identity primary key,
  room_id bigint not null references public.study_rooms(id) on delete cascade,
  author_id uuid not null references public.user_profiles(id) on delete cascade,
  content text not null check (char_length(trim(content)) between 1 and 1200),
  color text not null default 'emerald',
  created_at timestamp with time zone not null default now()
);

create index if not exists study_room_notes_room_created_idx
  on public.study_room_notes(room_id, created_at desc);

alter table public.study_room_notes enable row level security;

drop policy if exists "Members can read study room notes" on public.study_room_notes;
create policy "Members can read study room notes"
  on public.study_room_notes for select
  to authenticated
  using (
    exists (
      select 1 from public.study_room_members m
      where m.room_id = study_room_notes.room_id
        and m.user_id = auth.uid()
        and m.left_at is null
    )
  );

drop policy if exists "Members can create study room notes" on public.study_room_notes;
create policy "Members can create study room notes"
  on public.study_room_notes for insert
  to authenticated
  with check (
    auth.uid() = author_id
    and exists (
      select 1 from public.study_room_members m
      where m.room_id = study_room_notes.room_id
        and m.user_id = auth.uid()
        and m.left_at is null
    )
  );

drop policy if exists "Authors can delete study room notes" on public.study_room_notes;
create policy "Authors can delete study room notes"
  on public.study_room_notes for delete
  to authenticated
  using (auth.uid() = author_id);

grant select, insert, delete on public.study_room_notes to authenticated;
grant usage on sequence public.study_room_notes_id_seq to authenticated;

create table if not exists public.study_room_pomodoro (
  room_id bigint primary key references public.study_rooms(id) on delete cascade,
  mode text not null default 'focus' check (mode in ('focus', 'break')),
  is_running boolean not null default false,
  duration_seconds integer not null default 1500,
  remaining_seconds integer not null default 1500,
  started_at timestamp with time zone,
  updated_by uuid references public.user_profiles(id) on delete set null,
  updated_at timestamp with time zone not null default now()
);

alter table public.study_room_pomodoro enable row level security;

drop policy if exists "Members can read study room pomodoro" on public.study_room_pomodoro;
create policy "Members can read study room pomodoro"
  on public.study_room_pomodoro for select
  to authenticated
  using (
    exists (
      select 1 from public.study_room_members m
      where m.room_id = study_room_pomodoro.room_id
        and m.user_id = auth.uid()
        and m.left_at is null
    )
  );

grant select on public.study_room_pomodoro to authenticated;

create table if not exists public.study_room_quiz_attempts (
  id bigint generated always as identity primary key,
  room_id bigint not null references public.study_rooms(id) on delete cascade,
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  track text not null default 'personal',
  score integer not null,
  total integer not null,
  percent integer not null,
  created_at timestamp with time zone not null default now()
);

create index if not exists study_room_quiz_attempts_room_created_idx
  on public.study_room_quiz_attempts(room_id, created_at desc);

alter table public.study_room_quiz_attempts enable row level security;

drop policy if exists "Members can read study room quiz attempts" on public.study_room_quiz_attempts;
create policy "Members can read study room quiz attempts"
  on public.study_room_quiz_attempts for select
  to authenticated
  using (
    exists (
      select 1 from public.study_room_members m
      where m.room_id = study_room_quiz_attempts.room_id
        and m.user_id = auth.uid()
        and m.left_at is null
    )
  );

grant select on public.study_room_quiz_attempts to authenticated;
grant usage on sequence public.study_room_quiz_attempts_id_seq to authenticated;

create table if not exists public.study_room_message_reactions (
  id bigint generated always as identity primary key,
  message_id bigint not null references public.study_room_messages(id) on delete cascade,
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  emoji text not null check (char_length(emoji) between 1 and 16),
  created_at timestamp with time zone not null default now(),
  unique (message_id, user_id, emoji)
);

create index if not exists study_room_message_reactions_message_idx
  on public.study_room_message_reactions(message_id);

alter table public.study_room_message_reactions enable row level security;

drop policy if exists "Members can read study room reactions" on public.study_room_message_reactions;
create policy "Members can read study room reactions"
  on public.study_room_message_reactions for select
  to authenticated
  using (
    exists (
      select 1
      from public.study_room_messages msg
      join public.study_room_members m on m.room_id = msg.room_id
      where msg.id = study_room_message_reactions.message_id
        and m.user_id = auth.uid()
        and m.left_at is null
    )
  );

grant select on public.study_room_message_reactions to authenticated;
grant usage on sequence public.study_room_message_reactions_id_seq to authenticated;

create table if not exists public.study_room_reward_claims (
  id bigint generated always as identity primary key,
  room_id bigint not null references public.study_rooms(id) on delete cascade,
  week_start date not null,
  claimed_by uuid not null references public.user_profiles(id) on delete cascade,
  xp_reward integer not null default 150,
  coin_reward integer not null default 25,
  created_at timestamp with time zone not null default now(),
  unique (room_id, week_start)
);

alter table public.study_room_reward_claims enable row level security;

drop policy if exists "Members can read study room reward claims" on public.study_room_reward_claims;
create policy "Members can read study room reward claims"
  on public.study_room_reward_claims for select
  to authenticated
  using (
    exists (
      select 1 from public.study_room_members m
      where m.room_id = study_room_reward_claims.room_id
        and m.user_id = auth.uid()
        and m.left_at is null
    )
  );

grant select on public.study_room_reward_claims to authenticated;
grant usage on sequence public.study_room_reward_claims_id_seq to authenticated;

create or replace function public.record_study_room_checkin(p_room_id bigint, p_source text default 'chat')
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;
  if not exists (
    select 1 from public.study_room_members
    where room_id = p_room_id and user_id = auth.uid() and left_at is null
  ) then
    raise exception 'Not a room member';
  end if;

  insert into public.study_room_checkins (room_id, user_id, day_key, source)
  values (p_room_id, auth.uid(), current_date, coalesce(nullif(trim(p_source), ''), 'chat'))
  on conflict (room_id, user_id, day_key) do nothing;

  return true;
end;
$$;

create or replace function public.set_study_room_pomodoro(
  p_room_id bigint,
  p_mode text,
  p_is_running boolean,
  p_duration_seconds integer,
  p_remaining_seconds integer
)
returns public.study_room_pomodoro
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row public.study_room_pomodoro;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;
  if p_mode not in ('focus', 'break') then
    raise exception 'Invalid mode';
  end if;
  if not exists (
    select 1 from public.study_room_members
    where room_id = p_room_id and user_id = auth.uid() and left_at is null
  ) then
    raise exception 'Not a room member';
  end if;

  insert into public.study_room_pomodoro (
    room_id, mode, is_running, duration_seconds, remaining_seconds, started_at, updated_by, updated_at
  )
  values (
    p_room_id,
    p_mode,
    p_is_running,
    greatest(60, least(7200, p_duration_seconds)),
    greatest(0, least(7200, p_remaining_seconds)),
    case when p_is_running then now() else null end,
    auth.uid(),
    now()
  )
  on conflict (room_id) do update set
    mode = excluded.mode,
    is_running = excluded.is_running,
    duration_seconds = excluded.duration_seconds,
    remaining_seconds = excluded.remaining_seconds,
    started_at = excluded.started_at,
    updated_by = excluded.updated_by,
    updated_at = now()
  returning * into v_row;

  return v_row;
end;
$$;

create or replace function public.record_study_room_quiz_attempt(
  p_room_id bigint,
  p_track text,
  p_score integer,
  p_total integer
)
returns public.study_room_quiz_attempts
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row public.study_room_quiz_attempts;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;
  if not exists (
    select 1 from public.study_room_members
    where room_id = p_room_id and user_id = auth.uid() and left_at is null
  ) then
    raise exception 'Not a room member';
  end if;
  if p_total <= 0 or p_total > 50 or p_score < 0 or p_score > p_total then
    raise exception 'Invalid score';
  end if;

  insert into public.study_room_quiz_attempts (room_id, user_id, track, score, total, percent)
  values (p_room_id, auth.uid(), coalesce(nullif(p_track, ''), 'personal'), p_score, p_total, round((p_score::numeric / p_total::numeric) * 100)::int)
  returning * into v_row;

  perform public.record_study_room_checkin(p_room_id, 'group_quiz');
  return v_row;
end;
$$;

create or replace function public.toggle_study_room_message_reaction(p_message_id bigint, p_emoji text)
returns table (message_id bigint, emoji text, user_ids uuid[])
language plpgsql
security definer
set search_path = public
as $$
declare
  v_room_id bigint;
  v_exists boolean;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  select room_id into v_room_id from public.study_room_messages where id = p_message_id;
  if v_room_id is null then
    raise exception 'Message not found';
  end if;
  if not exists (
    select 1 from public.study_room_members
    where room_id = v_room_id and user_id = auth.uid() and left_at is null
  ) then
    raise exception 'Not a room member';
  end if;

  select exists (
    select 1 from public.study_room_message_reactions
    where message_id = p_message_id and user_id = auth.uid() and emoji = p_emoji
  ) into v_exists;

  if v_exists then
    delete from public.study_room_message_reactions
    where message_id = p_message_id and user_id = auth.uid() and emoji = p_emoji;
  else
    insert into public.study_room_message_reactions (message_id, user_id, emoji)
    values (p_message_id, auth.uid(), p_emoji)
    on conflict do nothing;
  end if;

  return query
    select
      r.message_id,
      r.emoji,
      array_agg(r.user_id order by r.created_at asc) as user_ids
    from public.study_room_message_reactions r
    join public.study_room_messages msg on msg.id = r.message_id
    where msg.room_id = v_room_id
    group by r.message_id, r.emoji;
end;
$$;

create or replace function public.get_study_room_reactions(p_room_id bigint)
returns table (message_id bigint, emoji text, user_ids uuid[])
language sql
security definer
set search_path = public
as $$
  select
    r.message_id,
    r.emoji,
    array_agg(r.user_id order by r.created_at asc) as user_ids
  from public.study_room_message_reactions r
  join public.study_room_messages msg on msg.id = r.message_id
  where msg.room_id = p_room_id
    and exists (
      select 1 from public.study_room_members m
      where m.room_id = p_room_id
        and m.user_id = auth.uid()
        and m.left_at is null
    )
  group by r.message_id, r.emoji;
$$;

create or replace function public.get_study_room_mission_status(p_room_id bigint)
returns table (
  mission_key text,
  title text,
  description text,
  current_value integer,
  target_value integer,
  completed boolean,
  streak_weeks integer,
  is_permanent boolean,
  reward_claimed boolean,
  leader_id uuid
)
language sql
security definer
set search_path = public
as $$
  with room_ctx as (
    select r.*
    from public.study_rooms r
    where r.id = p_room_id
      and exists (
        select 1 from public.study_room_members m
        where m.room_id = r.id and m.user_id = auth.uid() and m.left_at is null
      )
  ),
  members as (
    select m.user_id
    from public.study_room_members m
    where m.room_id = p_room_id and m.left_at is null
  ),
  counts as (
    select
      greatest(3, (select count(*)::int from members) * 3) as lesson_target,
      greatest(3, (select count(*)::int from members)) as quiz_target,
      greatest(3, (select count(*)::int from members) * 3) as checkin_target,
      coalesce((
        select count(*)::int
        from public.user_progress up
        where up.user_id in (select user_id from members)
          and up.completed = true
          and up.completed_at >= date_trunc('week', now())
      ), 0) as lesson_count,
      coalesce((
        select count(*)::int
        from public.user_quiz_sessions qs
        where qs.user_id in (select user_id from members)
          and qs.completed_at >= date_trunc('week', now())
      ), 0) + coalesce((
        select count(*)::int
        from public.study_room_quiz_attempts qa
        where qa.room_id = p_room_id
          and qa.created_at >= date_trunc('week', now())
      ), 0) as quiz_count,
      coalesce((
        select count(*)::int
        from public.study_room_checkins ci
        where ci.room_id = p_room_id
          and ci.day_key >= date_trunc('week', now())::date
      ), 0) as checkin_count
  ),
  reward as (
    select exists (
      select 1 from public.study_room_reward_claims c
      where c.room_id = p_room_id
        and c.week_start = date_trunc('week', now())::date
    ) as claimed
  )
  select
    v.mission_key,
    v.title,
    v.description,
    v.current_value,
    v.target_value,
    v.current_value >= v.target_value,
    rc.streak_weeks,
    rc.is_permanent,
    reward.claimed,
    rc.leader_id
  from room_ctx rc
  cross join counts c
  cross join reward
  cross join lateral (
    values
      ('lessons', 'Học bài cùng nhau', 'Cả nhóm hoàn thành bài học trong tuần', c.lesson_count, c.lesson_target),
      ('quizzes', 'Quiz nhóm & ôn tập', 'Cả nhóm làm quiz tự chọn hoặc thử thách nhóm', c.quiz_count, c.quiz_target),
      ('checkins', 'Điểm danh đều đặn', 'Mỗi thành viên duy trì thói quen check-in tuần này', c.checkin_count, c.checkin_target)
  ) as v(mission_key, title, description, current_value, target_value);
$$;

create or replace function public.claim_study_room_weekly_reward(p_room_id bigint)
returns table (ok boolean, message text, streak_weeks integer, is_permanent boolean)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_week date := date_trunc('week', now())::date;
  v_incomplete integer;
  v_streak integer;
  v_perm boolean;
  v_member uuid;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;
  if not exists (
    select 1 from public.study_room_members
    where room_id = p_room_id and user_id = auth.uid() and left_at is null
  ) then
    raise exception 'Not a room member';
  end if;

  select count(*) into v_incomplete
  from public.get_study_room_mission_status(p_room_id)
  where completed = false;

  if v_incomplete > 0 then
    return query select false, 'Nhóm chưa hoàn thành đủ 3 nhiệm vụ tuần.'::text, r.streak_weeks, r.is_permanent
    from public.study_rooms r where r.id = p_room_id;
    return;
  end if;

  insert into public.study_room_reward_claims (room_id, week_start, claimed_by)
  values (p_room_id, v_week, auth.uid())
  on conflict (room_id, week_start) do nothing;

  if not found then
    return query select false, 'Tuần này nhóm đã nhận thưởng rồi.'::text, r.streak_weeks, r.is_permanent
    from public.study_rooms r where r.id = p_room_id;
    return;
  end if;

  update public.study_rooms
  set streak_weeks = streak_weeks + 1,
      is_permanent = (streak_weeks + 1) >= 3
  where id = p_room_id
  returning study_rooms.streak_weeks, study_rooms.is_permanent into v_streak, v_perm;

  for v_member in
    select user_id from public.study_room_members
    where room_id = p_room_id and left_at is null
  loop
    update public.user_profiles
    set coins = coalesce(coins, 0) + 25
    where id = v_member;

    insert into public.user_chests (user_id, source)
    values (v_member, 'study_group')
    on conflict do nothing;
  end loop;

  return query select true, 'Đã mở rương nhóm: mỗi thành viên nhận +25 coin và 1 rương.'::text, v_streak, v_perm;
end;
$$;

revoke all on function public.record_study_room_checkin(bigint, text) from public, anon;
revoke all on function public.set_study_room_pomodoro(bigint, text, boolean, integer, integer) from public, anon;
revoke all on function public.record_study_room_quiz_attempt(bigint, text, integer, integer) from public, anon;
revoke all on function public.toggle_study_room_message_reaction(bigint, text) from public, anon;
revoke all on function public.get_study_room_reactions(bigint) from public, anon;
revoke all on function public.get_study_room_mission_status(bigint) from public, anon;
revoke all on function public.claim_study_room_weekly_reward(bigint) from public, anon;

grant execute on function public.record_study_room_checkin(bigint, text) to authenticated;
grant execute on function public.set_study_room_pomodoro(bigint, text, boolean, integer, integer) to authenticated;
grant execute on function public.record_study_room_quiz_attempt(bigint, text, integer, integer) to authenticated;
grant execute on function public.toggle_study_room_message_reaction(bigint, text) to authenticated;
grant execute on function public.get_study_room_reactions(bigint) to authenticated;
grant execute on function public.get_study_room_mission_status(bigint) to authenticated;
grant execute on function public.claim_study_room_weekly_reward(bigint) to authenticated;
