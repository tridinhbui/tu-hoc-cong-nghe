-- FinSocial has never told a poster that someone reacted to or commented on
-- their post - the interaction loop dead-ends unless they happen to scroll
-- back past it. This is the single biggest missing retention hook for a
-- social feed: without it, there is no reason to come back and check.
--
-- Written server-side via triggers, not client inserts: the two write paths
-- that should produce a notification (lib/supabase-community.ts#createComment
-- and #reactToPost) are plain client-side table writes with no server route
-- in front of them, same as most of this feed. A trigger guarantees a
-- notification fires no matter which code path performs the write, and
-- keeps the client from being able to fabricate or suppress notifications.

create table if not exists public.community_notifications (
  id bigint generated always as identity primary key,
  recipient_id uuid not null references public.user_profiles(id) on delete cascade,
  actor_id uuid not null references public.user_profiles(id) on delete cascade,
  type text not null check (type in ('comment', 'reaction')),
  post_id bigint not null references public.community_posts(id) on delete cascade,
  comment_id bigint references public.community_post_comments(id) on delete cascade,
  emoji text,
  created_at timestamp with time zone not null default now(),
  read_at timestamp with time zone
);

create index if not exists community_notifications_recipient_unread_idx
  on public.community_notifications(recipient_id, created_at desc)
  where read_at is null;

alter table public.community_notifications enable row level security;

drop policy if exists "Users can view their own notifications" on public.community_notifications;
create policy "Users can view their own notifications"
  on public.community_notifications for select
  to authenticated
  using (recipient_id = auth.uid());

-- Only `read_at` may move, and only on the recipient's own rows - narrowed
-- the same way 20260819_community_edit_own_content.sql narrowed post/comment
-- updates, so a future looser policy edit can't silently let a reader
-- rewrite who a notification is about.
drop policy if exists "Users can mark their own notifications read" on public.community_notifications;
create policy "Users can mark their own notifications read"
  on public.community_notifications for update
  to authenticated
  using (recipient_id = auth.uid())
  with check (recipient_id = auth.uid());

-- No insert/delete grant for `authenticated` at all - rows are only ever
-- created by the trigger functions below (SECURITY DEFINER, run as the
-- function owner) and cleaned up via `on delete cascade` when the
-- underlying post/comment/user is deleted.
grant select on public.community_notifications to authenticated;
grant update (read_at) on public.community_notifications to authenticated;

-- 1. Notify on comment ----------------------------------------------------

create or replace function public.notify_on_community_comment()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_recipient uuid;
begin
  select user_id into v_recipient
  from public.community_posts
  where id = new.post_id;

  -- No self-notifications, and no row if the post vanished between the
  -- comment insert and this trigger running (shouldn't happen given the FK,
  -- but v_recipient would be null in that case regardless).
  if v_recipient is not null and v_recipient <> new.user_id then
    insert into public.community_notifications (recipient_id, actor_id, type, post_id, comment_id)
    values (v_recipient, new.user_id, 'comment', new.post_id, new.id);
  end if;

  return new;
end;
$$;

drop trigger if exists community_post_comments_notify on public.community_post_comments;
create trigger community_post_comments_notify
  after insert on public.community_post_comments
  for each row execute function public.notify_on_community_comment();

-- 2. Notify on reaction -----------------------------------------------------
--
-- AFTER INSERT only, not UPDATE: reactToPost() in lib/supabase-community.ts
-- upserts on (post_id, user_id), so switching your reaction from one emoji
-- to another is an UPDATE on the same row, not a fresh INSERT. Notifying on
-- every emoji change would let a reader spam a poster's notification feed
-- just by toggling their own reaction back and forth. The first reaction
-- from a given user on a given post still always fires.

create or replace function public.notify_on_community_reaction()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_recipient uuid;
begin
  select user_id into v_recipient
  from public.community_posts
  where id = new.post_id;

  if v_recipient is not null and v_recipient <> new.user_id then
    insert into public.community_notifications (recipient_id, actor_id, type, post_id, emoji)
    values (v_recipient, new.user_id, 'reaction', new.post_id, new.emoji);
  end if;

  return new;
end;
$$;

drop trigger if exists community_post_reactions_notify on public.community_post_reactions;
create trigger community_post_reactions_notify
  after insert on public.community_post_reactions
  for each row execute function public.notify_on_community_reaction();
