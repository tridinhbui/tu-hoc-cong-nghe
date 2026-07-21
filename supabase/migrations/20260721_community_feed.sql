-- Public community feed: lightweight activity feed for milestones and
-- manual posts, separate from the private study-group chat
-- (study_room_messages) and 1:1 chat (chat_messages). Anyone signed in can
-- read non-hidden posts; only the post's author can write a 'manual' post
-- directly, automated kinds ('streak') are only ever inserted by
-- service-role cron jobs (see app/api/cron/send-streak-milestones), same
-- "server verifies, client never self-awards" rule as user_badges.

create table if not exists public.community_posts (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  kind text not null check (kind in ('streak', 'manual')),
  content text not null check (char_length(content) between 1 and 500),
  metadata jsonb,
  is_hidden boolean not null default false,
  created_at timestamp with time zone not null default now()
);

create index if not exists community_posts_created_at_idx on public.community_posts(created_at desc);
create index if not exists community_posts_user_id_idx on public.community_posts(user_id);

create table if not exists public.community_post_reactions (
  post_id bigint not null references public.community_posts(id) on delete cascade,
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  emoji text not null default '👍',
  created_at timestamp with time zone not null default now(),
  primary key (post_id, user_id)
);

alter table public.community_posts enable row level security;
alter table public.community_post_reactions enable row level security;

drop policy if exists "Anyone can view non-hidden posts, authors see their own hidden posts" on public.community_posts;
create policy "Anyone can view non-hidden posts, authors see their own hidden posts"
  on public.community_posts for select
  to authenticated
  using (is_hidden = false or user_id = auth.uid());

drop policy if exists "Users can create their own manual posts" on public.community_posts;
create policy "Users can create their own manual posts"
  on public.community_posts for insert
  to authenticated
  with check (user_id = auth.uid() and kind = 'manual');

drop policy if exists "Users can delete their own posts" on public.community_posts;
create policy "Users can delete their own posts"
  on public.community_posts for delete
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "Anyone can view reactions" on public.community_post_reactions;
create policy "Anyone can view reactions"
  on public.community_post_reactions for select
  to authenticated
  using (true);

drop policy if exists "Users can react as themselves" on public.community_post_reactions;
create policy "Users can react as themselves"
  on public.community_post_reactions for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "Users can remove their own reaction" on public.community_post_reactions;
create policy "Users can remove their own reaction"
  on public.community_post_reactions for delete
  to authenticated
  using (user_id = auth.uid());

grant select, insert, delete on public.community_posts to authenticated;
grant select, insert, delete on public.community_post_reactions to authenticated;

-- Returns feed posts newest-first with author name/avatar joined in and a
-- reaction count + whether the caller already reacted - the same
-- security-definer join pattern as get_my_social_graph, since a plain
-- client-side select can't join user_profiles across users under RLS.
create or replace function public.get_community_feed(p_limit int default 20, p_before_id bigint default null)
returns table (
  id bigint,
  user_id uuid,
  user_name text,
  user_avatar text,
  kind text,
  content text,
  metadata jsonb,
  created_at timestamptz,
  reaction_count bigint,
  my_reaction text
)
language sql
security definer
set search_path = public
stable
as $$
  select
    p.id,
    p.user_id,
    coalesce(up.full_name, 'Người học'),
    up.avatar_url,
    p.kind,
    p.content,
    p.metadata,
    p.created_at,
    coalesce(r.reaction_count, 0),
    mine.emoji
  from public.community_posts p
  join public.user_profiles up on up.id = p.user_id
  left join lateral (
    select count(*) as reaction_count
    from public.community_post_reactions cr
    where cr.post_id = p.id
  ) r on true
  left join public.community_post_reactions mine
    on mine.post_id = p.id and mine.user_id = auth.uid()
  where p.is_hidden = false
    and (p_before_id is null or p.id < p_before_id)
  order by p.id desc
  limit least(greatest(p_limit, 1), 50);
$$;

revoke all on function public.get_community_feed(int, bigint) from public, anon;
grant execute on function public.get_community_feed(int, bigint) to authenticated;
