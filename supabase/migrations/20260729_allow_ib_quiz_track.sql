alter table public.user_quiz_sessions
  drop constraint if exists user_quiz_sessions_track_check;

alter table public.user_quiz_sessions
  add constraint user_quiz_sessions_track_check
  check (track in ('personal', 'professional', 'cfa', 'ib'));

