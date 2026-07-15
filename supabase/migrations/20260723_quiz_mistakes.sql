-- Tracks which specific in-lesson quiz questions a learner has gotten
-- wrong, across every lesson - closes a real gap: user_progress.quiz_score
-- and user_quiz_sessions are both aggregate scores only, nothing anywhere
-- records WHICH question was missed, so there was no way to build a
-- cross-lesson "review your mistakes" feature (the lesson-level equivalent,
-- RecallCard, already existed - this is its quiz counterpart).
--
-- One row per (user, lesson, question). `resolved` flips to true the next
-- time that exact question is answered correctly (in the lesson itself, on
-- retry, or from the review page) - so the review list is self-clearing as
-- mistakes get fixed, mirroring the lesson completion checklist's pattern
-- rather than being a permanent log.
create table if not exists public.quiz_mistakes (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id bigint not null,
  question_index int not null,
  wrong_count int not null default 1,
  resolved boolean not null default false,
  first_wrong_at timestamp with time zone not null default now(),
  last_attempt_at timestamp with time zone not null default now()
);

create unique index if not exists quiz_mistakes_user_lesson_question_key
  on public.quiz_mistakes(user_id, lesson_id, question_index);
create index if not exists quiz_mistakes_user_unresolved_idx
  on public.quiz_mistakes(user_id) where resolved = false;

alter table public.quiz_mistakes enable row level security;

drop policy if exists "Users can view their own quiz mistakes" on public.quiz_mistakes;
create policy "Users can view their own quiz mistakes"
  on public.quiz_mistakes for select
  to authenticated
  using (auth.uid() = user_id);

-- No insert/update policy for the client - all writes go through
-- record_quiz_mistake() below (security definer, binds to auth.uid()
-- itself) so a client can't fabricate/inflate another user's mistake
-- history or forge wrong_count.
grant select on public.quiz_mistakes to authenticated;

-- Atomic upsert: a plain client-side upsert would need a
-- read-then-write to increment wrong_count, which races if the same
-- question is answered from two tabs. This does it in one statement,
-- and using auth.uid() server-side (not a client-supplied user_id)
-- means a forged RPC call can only ever affect the caller's own rows.
create or replace function public.record_quiz_mistake(p_lesson_id bigint, p_question_index int, p_correct boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_correct then
    update public.quiz_mistakes
    set resolved = true, last_attempt_at = now()
    where user_id = auth.uid() and lesson_id = p_lesson_id and question_index = p_question_index;
  else
    insert into public.quiz_mistakes (user_id, lesson_id, question_index, wrong_count, resolved, first_wrong_at, last_attempt_at)
    values (auth.uid(), p_lesson_id, p_question_index, 1, false, now(), now())
    on conflict (user_id, lesson_id, question_index)
    do update set
      wrong_count = quiz_mistakes.wrong_count + 1,
      resolved = false,
      last_attempt_at = now();
  end if;
end;
$$;

revoke all on function public.record_quiz_mistake(bigint, int, boolean) from public, anon;
grant execute on function public.record_quiz_mistake(bigint, int, boolean) to authenticated;
