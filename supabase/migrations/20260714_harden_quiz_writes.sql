-- QA finding (Critical, C-1): user_quiz_sessions and user_challenge_passes
-- were insertable directly from the browser client with client-computed
-- score/total/xp_earned values - RLS only checked `auth.uid() = user_id`,
-- not whether the numbers were truthful. Anyone with devtools open could
-- insert an arbitrary score/XP, or fake a passing lesson-gate result to
-- unlock content without actually answering correctly.
--
-- Both tables are now written exclusively by
-- app/api/knowledge-challenge/submit/route.ts, which re-derives the score
-- from signed per-question tokens (lib/quiz-tokens.ts) server-side before
-- writing via the service-role client. Direct insert from `authenticated`
-- is no longer needed and is revoked here; reads are unaffected. The CHECK
-- constraints are defense-in-depth in case that route (or a future one)
-- ever has a bug that lets an inconsistent score/total slip through.

revoke insert on public.user_quiz_sessions from authenticated;
revoke insert on public.user_challenge_passes from authenticated;

drop policy if exists "Users can insert own quiz sessions" on public.user_quiz_sessions;
drop policy if exists "Users can insert own challenge passes" on public.user_challenge_passes;

do $$ begin
  alter table public.user_quiz_sessions
    add constraint user_quiz_sessions_total_positive check (total > 0);
exception when duplicate_object then null;
end $$;

do $$ begin
  alter table public.user_quiz_sessions
    add constraint user_quiz_sessions_score_range check (score >= 0 and score <= total);
exception when duplicate_object then null;
end $$;

do $$ begin
  alter table public.user_challenge_passes
    add constraint user_challenge_passes_total_positive check (total > 0);
exception when duplicate_object then null;
end $$;

do $$ begin
  alter table public.user_challenge_passes
    add constraint user_challenge_passes_score_range check (score >= 0 and score <= total);
exception when duplicate_object then null;
end $$;
