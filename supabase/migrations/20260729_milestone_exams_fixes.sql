-- 1) savePassedMilestone's upsert now specifies onConflict correctly, but
--    an upsert's ON CONFLICT DO UPDATE path still needs UPDATE privileges
--    under RLS - the original migration only granted SELECT and INSERT, so
--    retaking a milestone exam (updating an existing row) would still be
--    rejected by RLS even with the onConflict fix in application code.
drop policy if exists "Users can update their own milestone completions" on public.user_milestone_exams;
create policy "Users can update their own milestone completions"
  on public.user_milestone_exams for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

grant select, insert, update on public.user_milestone_exams to authenticated;
