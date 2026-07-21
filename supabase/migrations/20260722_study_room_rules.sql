-- Add custom rules columns to study_rooms
alter table public.study_rooms
  add column if not exists consecutive_weeks_hit integer not null default 0,
  add column if not exists is_permanent boolean not null default false;

-- Recreate weekly_rematch_study_rooms to support weekly goals, disbandment, and permanent groups
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
  
  -- variables for processing existing rooms
  r_record record;
  v_member_count integer;
  v_lessons_completed integer;
  v_avg_lessons numeric;
  v_consecutive integer;
  v_is_permanent boolean;
  v_notices_sent integer := 0;
begin
  -- 1. Evaluate existing active rooms before disbanding/rematching
  for r_record in 
    select id, topic, consecutive_weeks_hit, is_permanent 
    from public.study_rooms
  loop
    -- Count active members in this room
    select count(*) into v_member_count
    from public.study_room_members
    where room_id = r_record.id and left_at is null;

    if v_member_count > 0 then
      if r_record.is_permanent then
        -- Permanent rooms: Maintain them and send a new week greeting
        insert into public.study_room_messages (room_id, sender_id, is_bot, content)
        values (
          r_record.id, 
          null, 
          true, 
          'Chào cả nhóm! Tuần mới lại bắt đầu. Nhóm của chúng ta đã đạt trạng thái Vĩnh Viễn, hãy tiếp tục đồng hành và học tập cùng nhau nhé! 🚀'
        );
      else
        -- Non-permanent rooms: Check performance
        select count(*) into v_lessons_completed
        from public.user_progress up
        where up.completed = true 
          and up.completed_at >= now() - interval '7 days'
          and up.user_id in (
            select user_id from public.study_room_members 
            where room_id = r_record.id and left_at is null
          );
        
        v_avg_lessons := v_lessons_completed::numeric / v_member_count;

        if v_avg_lessons >= 3.0 then
          -- HITS TARGET: Keep room
          v_consecutive := r_record.consecutive_weeks_hit + 1;
          v_is_permanent := (v_consecutive >= 3);

          update public.study_rooms
          set consecutive_weeks_hit = v_consecutive,
              is_permanent = v_is_permanent
          where id = r_record.id;

          if v_is_permanent then
            insert into public.study_room_messages (room_id, sender_id, is_bot, is_pinned, content)
            values (
              r_record.id, 
              null, 
              true, 
              true,
              'Chúc mừng nhóm! 🎉 Nhóm đã xuất sắc đạt chỉ tiêu tuần qua (trung bình >= 3 bài học/thành viên) trong 3 tuần liên tiếp! Từ nay, nhóm của chúng ta được nâng cấp thành **Nhóm Vĩnh Viễn**, sẽ duy trì mãi mãi và không bị xếp lại nữa!'
            );
          else
            insert into public.study_room_messages (room_id, sender_id, is_bot, content)
            values (
              r_record.id, 
              null, 
              true, 
              'Chúc mừng nhóm! 🎉 Nhóm đã đạt chỉ tiêu tuần qua (trung bình ' || round(v_avg_lessons, 1) || ' bài học/thành viên, yêu cầu >= 3). Nhóm sẽ tiếp tục được duy trì vào tuần tới! Số tuần đạt chỉ tiêu liên tiếp hiện tại: ' || v_consecutive || '/3 tuần.'
            );
          end if;
        else
          -- FAILS TARGET: Disband room
          insert into public.study_room_messages (room_id, sender_id, is_bot, content)
          values (
            r_record.id, 
            null, 
            true, 
            'Rất tiếc! 💔 Tuần vừa qua nhóm chỉ đạt trung bình ' || round(v_avg_lessons, 1) || ' bài học/thành viên, không đủ chỉ tiêu tối thiểu là 3 bài/thành viên. Nhóm của chúng ta sẽ bị giải tán. Hãy cố gắng học tập đều đặn hơn ở các nhóm mới nhé! Tạm biệt mọi người!'
          );

          update public.study_room_members
          set left_at = now()
          where room_id = r_record.id and left_at is null;
        end if;
      end if;
    end if;
  end loop;

  -- 2. Drop empty rooms (no active members) that are not permanent
  delete from public.study_rooms r
  where not r.is_permanent 
    and not exists (
      select 1 from public.study_room_members m where m.room_id = r.id and m.left_at is null
    );

  -- 3. Match remaining active users who completed a lesson in the last 7 days
  -- AND are NOT currently active in a maintained room (is_permanent or surviving)
  for v_topic in select unnest(array['personal', 'professional']) loop
    select array_agg(distinct up.user_id order by up.user_id)
    into v_user_ids
    from public.user_progress up
    join public.user_profiles prof on prof.id = up.user_id
    where up.completed = true
      and up.completed_at >= now() - interval '7 days'
      and coalesce(prof.is_disabled, false) = false
      -- User must NOT be active in any study room currently
      and not exists (
        select 1 from public.study_room_members m 
        where m.user_id = up.user_id and m.left_at is null
      )
      and (
        (v_topic = 'personal' and coalesce(prof.preferred_track, 'personal') = 'personal')
        or
        (v_topic = 'professional' and prof.preferred_track = 'professional')
      );

    if v_user_ids is null or array_length(v_user_ids, 1) is null then
      continue;
    end if;

    -- Shuffle then chunk into groups of 5
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

      -- Build member list summary for intro
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
        || '. Chỉ tiêu của nhóm: mỗi thành viên học trung bình ít nhất 3 bài/tuần. Nếu đạt chỉ tiêu, nhóm sẽ tiếp tục duy trì vào tuần sau. Nếu không đạt, nhóm sẽ bị giải tán vào cuối tuần. Đặc biệt, nếu đạt chỉ tiêu liên tiếp 3 tuần, nhóm sẽ được duy trì Vĩnh Viễn!';

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
