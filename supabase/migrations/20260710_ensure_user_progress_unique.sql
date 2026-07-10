-- markLessonComplete() upserts user_progress with
-- onConflict: "user_id,lesson_id", which requires a real unique
-- constraint on that column pair. The base schema was reconstructed
-- by guesswork (see its header) and may not match the live table,
-- causing every completion upsert to fail with "no unique or
-- exclusion constraint matching ON CONFLICT" (Postgres 42P10). Add
-- the constraint idempotently so the upsert always has one to target.
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.user_progress'::regclass
      and contype = 'u'
      and conkey = (
        select array_agg(attnum order by attnum)
        from pg_attribute
        where attrelid = 'public.user_progress'::regclass
          and attname in ('user_id', 'lesson_id')
      )
  ) then
    alter table public.user_progress
      add constraint user_progress_user_id_lesson_id_key unique (user_id, lesson_id);
  end if;
end $$;

-- The base schema migration never grants CRUD on these tables to the
-- `authenticated` role (unlike user_streaks, which a later migration
-- grants explicitly). Without these grants every write from a logged-in
-- user is rejected regardless of RLS policy, which would also explain
-- the save failures. Grants are idempotent/safe to re-run.
grant select, insert, update on public.user_progress to authenticated;
grant select, insert, update on public.user_stats to authenticated;
grant select, insert, update on public.user_streaks to authenticated;
