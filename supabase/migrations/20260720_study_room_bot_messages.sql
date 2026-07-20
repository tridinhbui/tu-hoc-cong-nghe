-- Lets "Tài Tài" post automated daily progress-update messages into study
-- room chats (see app/api/cron/daily-study-group-update/route.ts), instead
-- of requiring a real user_profiles row to satisfy the sender_id FK.
alter table public.study_room_messages
  add column if not exists is_bot boolean not null default false;

alter table public.study_room_messages
  alter column sender_id drop not null;

alter table public.study_room_messages
  add constraint study_room_messages_sender_check
  check ((is_bot = true and sender_id is null) or (is_bot = false and sender_id is not null));

-- Bot messages are inserted by the cron route via the service-role client
-- (bypasses RLS), so no policy change needed for insert - the existing
-- "Members can send messages in their room" policy still correctly governs
-- human sends (sender_id = auth.uid()).
