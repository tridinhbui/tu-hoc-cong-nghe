-- Real replies for study-room chat.
--
-- Replies were previously faked by prepending the quote into the message body
-- itself (components/StudyGroupsClient.tsx):
--
--   ↩️ [Trả lời Minh]: "câu gốc bị cắt ở 45 ký tự..."\nnội dung thật
--
-- which meant the quote was a frozen copy: editing or deleting the original
-- left the quote showing text that no longer existed anywhere, there was
-- nothing to tap through to, the sender's name was frozen at send time, and
-- the marker leaked into stored content - where the Tài Tài bot and any
-- future search would read it as part of the message.
--
-- A foreign key fixes all of those at once, because the quote becomes a
-- lookup instead of a copy.

alter table public.study_room_messages
  add column if not exists reply_to_id bigint
  references public.study_room_messages(id) on delete set null;

-- `on delete set null` rather than cascade, deliberately: deleting a message
-- someone replied to must not delete their reply. The reply survives and
-- renders as "tin nhắn đã bị xoá", which is what every chat app does and what
-- keeps a conversation readable after a deletion.

-- Partial index - only reply rows are ever looked up by this column, and in a
-- chat table the overwhelming majority of rows are not replies.
create index if not exists study_room_messages_reply_to_idx
  on public.study_room_messages(reply_to_id)
  where reply_to_id is not null;

-- Column-level grant so the existing insert policy can carry the new field
-- without widening anything else.
grant update (reply_to_id) on public.study_room_messages to authenticated;
