-- "Tài Tài" opens every freshly-formed weekly study room with an intro
-- message introducing the members by name and their progress so far this
-- week, pinned at the top of the chat (see is_pinned) so it stays visible
-- above the free-flowing conversation below it.
alter table public.study_room_messages
  add column if not exists is_pinned boolean not null default false;

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
  v_member_summary text;
  v_intro_text text;
  i integer;
begin
  update public.study_room_members
  set left_at = now()
  where left_at is null;

  delete from public.study_rooms r
  where not exists (
    select 1 from public.study_room_members m where m.room_id = r.id
  );

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

      -- Build "Tên (N bài tuần này), Tên (N bài tuần này), ..." from the
      -- same 7-day completed-lesson window used to determine who's active,
      -- so the intro message's numbers match what "active" meant when this
      -- group was formed.
      select string_agg(
        coalesce(nullif(up.full_name, ''), split_part(up.email, '@', 1), 'Người học')
          || ' (' || coalesce(wp.cnt, 0) || ' bài tuần này)',
        ', '
        order by up.full_name
      )
      into v_member_summary
      from public.user_profiles up
      left join (
        select user_id, count(*) as cnt
        from public.user_progress
        where completed = true and completed_at >= now() - interval '7 days'
        group by user_id
      ) wp on wp.user_id = up.id
      where up.id = any(v_chunk);

      v_intro_text := 'Chào mọi người! Mình là Tài Tài 👋 Đây là nhóm học chung tuần này của các bạn: '
        || coalesce(v_member_summary, '')
        || '. Cùng nhau giữ nhịp học đều mỗi ngày nhé - mình sẽ ghé cập nhật tiến độ cả nhóm mỗi ngày!';

      insert into public.study_room_messages (room_id, sender_id, is_bot, is_pinned, content)
      values (v_room_id, null, true, true, v_intro_text);

      i := i + 5;
    end loop;
  end loop;

  return query select v_rooms_created, v_users_matched;
end;
$$;

revoke all on function public.weekly_rematch_study_rooms() from public, anon, authenticated;
grant execute on function public.weekly_rematch_study_rooms() to service_role;
