-- Optimizations for Dashboard loading flow: introducing grouped read-only RPCs
-- secure against IDOR (restricted internally via auth.uid() instead of taking parameters)

create or replace function get_dashboard_summary()
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_profile json;
  v_stats json;
  v_onboarding_completed boolean;
  v_milestones json;
  v_challenges json;
  v_result json;
begin
  v_user_id := auth.uid();
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  -- 1. Profile
  select row_to_json(p) into v_profile
  from (
    select id, email, full_name, avatar_url, bio, current_level, total_xp, lessons_completed, avg_quiz_score, current_stage, preferred_track, dark_mode
    from user_profiles
    where id = v_user_id
  ) p;

  -- 2. Stats
  select row_to_json(s) into v_stats
  from (
    select total_lessons_completed, total_xp, current_level, avg_quiz_score, longest_streak, last_lesson_date, total_study_time_hours
    from user_stats
    where user_id = v_user_id
  ) s;

  -- 3. Onboarding
  select completed into v_onboarding_completed
  from user_onboarding
  where user_id = v_user_id;
  
  if v_onboarding_completed is null then
    v_onboarding_completed := false;
  end if;

  -- 4. Milestones
  select coalesce(json_agg(m), '[]'::json) into v_milestones
  from (
    select track_id, stage_label, score
    from user_milestone_exams
    where user_id = v_user_id
  ) m;

  -- 5. Challenge Passes
  select coalesce(json_agg(lesson_id), '[]'::json) into v_challenges
  from (
    select lesson_id
    from user_challenge_passes
    where user_id = v_user_id
  ) c;

  -- Combine into a single JSON object
  v_result := json_build_object(
    'profile', v_profile,
    'stats', v_stats,
    'has_completed_onboarding', v_onboarding_completed,
    'passed_milestones', v_milestones,
    'challenge_passed_ids', v_challenges
  );

  return v_result;
end;
$$;

create or replace function get_lesson_state()
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_completed integer[];
  v_unlocked integer[];
  v_flags integer[];
  v_bookmarks json;
  v_result json;
begin
  v_user_id := auth.uid();
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  -- 1. Completed lessons
  select coalesce(array_agg(lesson_id), '{}'::integer[]) into v_completed
  from user_progress
  where user_id = v_user_id and completed = true;

  -- 2. Unlocked lessons
  select coalesce(array_agg(lesson_id), '{}'::integer[]) into v_unlocked
  from user_lesson_unlocks
  where user_id = v_user_id;

  -- 3. Flagged lessons
  select coalesce(array_agg(lesson_id), '{}'::integer[]) into v_flags
  from lesson_manual_flags
  where user_id = v_user_id;

  -- 4. Bookmarks
  select coalesce(json_agg(b), '[]'::json) into v_bookmarks
  from (
    select id, lesson_id, lesson_slug, lesson_title, created_at
    from lesson_bookmarks
    where user_id = v_user_id
    order by created_at desc
  ) b;

  v_result := json_build_object(
    'completed_lessons', v_completed,
    'unlocked_lesson_ids', v_unlocked,
    'user_lesson_flags', v_flags,
    'bookmarks', v_bookmarks
  );

  return v_result;
end;
$$;

grant execute on function get_dashboard_summary() to authenticated;
grant execute on function get_lesson_state() to authenticated;
