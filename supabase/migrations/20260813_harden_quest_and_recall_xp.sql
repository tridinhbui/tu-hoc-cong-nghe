-- XP audit follow-up. 20260714_harden_quiz_writes.sql closed the
-- "client-computed xp_earned inserted straight from the browser" hole for
-- quiz sessions, and 20260812_tighten_xp_economy.sql capped game XP. The
-- three reward surfaces added after those migrations never got the same
-- treatment, and all three feed lib/supabase-user.ts#recalculateUserStats'
-- total_xp sum:
--
--   1. user_quest_completions.xp_earned - client-supplied, no CHECK, RLS
--      only verified auth.uid() = user_id. Unbounded XP from devtools.
--   2. user_lesson_recalls.recall_stage - XP is (recall_stage - 1) * 10 and
--      the column had no upper bound, while the client holds an UPDATE
--      policy. Unbounded XP from devtools.
--   3. user_milestone_exams - 50 XP per row with score >= 0.8. The unique
--      constraint is on (user_id, track_id, stage_label), but both text
--      columns come from the client, so arbitrary pairs mint 50 XP each.
--      Bounded here by length + a per-user row cap; the XP sum is also
--      capped in recalculateUserStats as defense-in-depth.

-- 1. Quests -------------------------------------------------------------

-- Normalize any historical rows that don't match the canonical reward table
-- in lib/quest-rewards.ts, so leaderboards use one economy.
update public.user_quest_completions
set xp_earned = case quest_type
  when 'daily_1' then 10
  when 'daily_study_group' then 10
  when 'daily_2' then 5
  when 'daily_3' then 15
  when 'daily_4' then 0
  when 'daily_game' then 0
  when 'daily_news_quiz' then 15
  when 'career_assessment' then 50
  else 0
end
where xp_earned is distinct from case quest_type
  when 'daily_1' then 10
  when 'daily_study_group' then 10
  when 'daily_2' then 5
  when 'daily_3' then 15
  when 'daily_4' then 0
  when 'daily_game' then 0
  when 'daily_news_quiz' then 15
  when 'career_assessment' then 50
  else 0
end;

do $$ begin
  alter table public.user_quest_completions
    add constraint user_quest_completions_xp_range
    check (xp_earned >= 0 and xp_earned <= 50);
exception when duplicate_object then null;
end $$;

-- app/api/quests/claim/route.ts is the only writer now (service-role).
revoke insert on public.user_quest_completions from authenticated;
drop policy if exists "Users can insert their own quest completions" on public.user_quest_completions;

-- 2. Lesson recalls -----------------------------------------------------

-- lib/supabase-recalls.ts#processRecallAttempt already clamps to 4; this is
-- the DB-side guarantee, so the UPDATE policy can stay.
update public.user_lesson_recalls
set recall_stage = least(greatest(coalesce(recall_stage, 1), 1), 4)
where recall_stage is distinct from least(greatest(coalesce(recall_stage, 1), 1), 4);

do $$ begin
  alter table public.user_lesson_recalls
    add constraint user_lesson_recalls_stage_range
    check (recall_stage >= 1 and recall_stage <= 4);
exception when duplicate_object then null;
end $$;

-- 3. Milestone exams ----------------------------------------------------

-- lib/track-stages.ts defines 26 stage labels across the two tracks, so no
-- legitimate account can have more than that many milestone rows. Enforced
-- with a trigger rather than a CHECK (CHECK can't see other rows).
do $$ begin
  alter table public.user_milestone_exams
    add constraint user_milestone_exams_label_len
    check (
      length(track_id) between 1 and 64
      and length(stage_label) between 1 and 64
    );
exception when duplicate_object then null;
end $$;

create or replace function public.enforce_milestone_row_cap()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (select count(*) from public.user_milestone_exams where user_id = new.user_id) >= 40 then
    raise exception 'milestone row cap exceeded for user %', new.user_id
      using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

drop trigger if exists user_milestone_exams_row_cap on public.user_milestone_exams;
create trigger user_milestone_exams_row_cap
  before insert on public.user_milestone_exams
  for each row execute function public.enforce_milestone_row_cap();
