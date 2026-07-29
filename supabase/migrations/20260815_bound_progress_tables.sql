-- Third pass on the same bug class as 20260813: a client-written column that
-- recalculateUserStats later trusts as XP, with nothing bounding its values.
--
-- Both tables here are legitimately written from the browser (that's how a
-- lesson gets marked complete), so the fix is to bound what can be written,
-- not to revoke the write.
--
--   1. user_progress.lesson_id - bigint, no FK, no CHECK. Real lesson ids run
--      1..1280 (436 lessons). recalculateUserStats pays 10 XP per completed
--      row, and get_xp_leaderboard_since counts them directly, so stuffing
--      arbitrary ids mints XP *and* moves the public leaderboard. This is the
--      single largest XP source in the app.
--
--   2. cfa_module_progress.module_id - free text, no FK. Each row is worth
--      10 XP and also counts toward cfaCompletedCount, which gates Level 9
--      (LEVELS[9].minCfaCompleted = 5 in lib/levels.ts). Five invented
--      module ids unlock the gate without touching a CFA module.

-- 1. user_progress ------------------------------------------------------

-- Sanity bound. Deliberately loose (real max is 1280) so adding lessons
-- doesn't require a migration; the row cap below is what actually binds.
do $$ begin
  alter table public.user_progress
    add constraint user_progress_lesson_id_range
    check (lesson_id > 0 and lesson_id <= 100000);
exception when duplicate_object then null;
end $$;

-- 436 lessons exist today. 1000 leaves room to more than double the catalog
-- while capping this source at 10,000 XP - comfortably under the 40,000 that
-- Level 15 requires, so no legitimate learner can ever reach it.
create or replace function public.enforce_user_progress_row_cap()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- markLessonComplete upserts, and a BEFORE INSERT trigger fires before the
  -- ON CONFLICT clause is evaluated. Without the not-exists guard, a learner
  -- sitting at the cap could no longer re-save a lesson they already had.
  if (select count(*) from public.user_progress where user_id = new.user_id) >= 1000
     and not exists (
       select 1 from public.user_progress
       where user_id = new.user_id and lesson_id = new.lesson_id
     )
  then
    raise exception 'user_progress row cap exceeded for user %', new.user_id
      using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

drop trigger if exists user_progress_row_cap on public.user_progress;
create trigger user_progress_row_cap
  before insert on public.user_progress
  for each row execute function public.enforce_user_progress_row_cap();

-- 2. cfa_module_progress ------------------------------------------------

do $$ begin
  alter table public.cfa_module_progress
    add constraint cfa_module_progress_module_id_len
    check (length(module_id) between 1 and 128);
exception when duplicate_object then null;
end $$;

-- The real fix: module_id must name an actual module. "Module" is an
-- externally-managed table (PascalCase, not created by these migrations), so
-- this is guarded - if it isn't present, or its id column isn't a text type
-- we can reference, the FK is skipped rather than failing the whole
-- migration. NOT VALID so pre-existing bad rows don't block the deploy;
-- every new write is checked.
do $$
declare
  id_type text;
begin
  select data_type into id_type
  from information_schema.columns
  where table_schema = 'public' and table_name = 'Module' and column_name = 'id';

  if id_type is null then
    raise notice 'Module table not found - skipping cfa_module_progress FK';
    return;
  end if;

  if id_type not in ('text', 'character varying') then
    raise notice 'Module.id is %, not text - skipping FK', id_type;
    return;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'cfa_module_progress_module_fk'
      and conrelid = 'public.cfa_module_progress'::regclass
  ) then
    alter table public.cfa_module_progress
      add constraint cfa_module_progress_module_fk
      foreign key (module_id) references public."Module"(id)
      on delete cascade
      not valid;
  end if;
exception
  -- A missing unique index on Module.id, a permissions problem, anything
  -- else: the length check and the XP caps still stand, so degrade to a
  -- notice instead of blocking every other statement in this file.
  when others then
    raise notice 'Could not add cfa_module_progress FK: %', sqlerrm;
end $$;

-- 3. Fix the upsert flaw in the milestone cap from 20260813 --------------

-- Same BEFORE INSERT / ON CONFLICT problem as above: savePassedMilestone
-- upserts when a learner retakes a milestone exam for a better score, so at
-- exactly 40 rows the retake would have been rejected instead of updating.
create or replace function public.enforce_milestone_row_cap()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (select count(*) from public.user_milestone_exams where user_id = new.user_id) >= 40
     and not exists (
       select 1 from public.user_milestone_exams
       where user_id = new.user_id
         and track_id = new.track_id
         and stage_label = new.stage_label
     )
  then
    raise exception 'milestone row cap exceeded for user %', new.user_id
      using errcode = 'check_violation';
  end if;
  return new;
end;
$$;
