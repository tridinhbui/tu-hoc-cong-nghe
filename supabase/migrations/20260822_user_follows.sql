-- Follow graph for FinSocial, requested as "theo dõi như Threads - ai đăng
-- bài lên cũng có nút follow" plus a Facebook-style personal wall on the
-- existing /nguoi-hoc/[userId] stats page (see lib/public-user-profile.ts).
--
-- Deliberately does NOT change the main feed's ordering or add a
-- "following only" filter tab - this migration only adds the relationship
-- itself, a follow button surface, and a way to list one person's own
-- posts. Personalizing the feed by follows is a separate, larger decision
-- left for later.

create table if not exists public.user_follows (
  follower_id uuid not null references public.user_profiles(id) on delete cascade,
  followed_id uuid not null references public.user_profiles(id) on delete cascade,
  created_at timestamp with time zone not null default now(),
  primary key (follower_id, followed_id),
  constraint user_follows_no_self_follow check (follower_id <> followed_id)
);

create index if not exists user_follows_followed_id_idx on public.user_follows(followed_id);

alter table public.user_follows enable row level security;

-- Follow relationships are public information on this app (same openness as
-- community_posts/comments - anyone can see who's following whom), not a
-- private setting. If that ever needs to change, this is the one policy to
-- narrow.
drop policy if exists "Anyone can see follow relationships" on public.user_follows;
create policy "Anyone can see follow relationships"
  on public.user_follows for select
  to authenticated
  using (true);

drop policy if exists "Users can follow as themselves" on public.user_follows;
create policy "Users can follow as themselves"
  on public.user_follows for insert
  to authenticated
  with check (follower_id = auth.uid());

drop policy if exists "Users can unfollow their own follows" on public.user_follows;
create policy "Users can unfollow their own follows"
  on public.user_follows for delete
  to authenticated
  using (follower_id = auth.uid());

grant select, insert, delete on public.user_follows to authenticated;

-- 1. Surface `is_following` on the main feed --------------------------------
--
-- Same left-join-against-auth.uid() pattern the RPC already uses for
-- `my_reaction`, so the feed can show a "Theo dõi" button next to an
-- author's name without an extra round trip per post.

drop function if exists public.get_community_feed(int, bigint);
create function public.get_community_feed(p_limit int default 20, p_before_id bigint default null)
returns table (
  id bigint,
  user_id uuid,
  user_name text,
  user_avatar text,
  kind text,
  content text,
  metadata jsonb,
  created_at timestamptz,
  edited_at timestamptz,
  reaction_count bigint,
  my_reaction text,
  comment_count bigint,
  reaction_summary jsonb,
  is_following boolean
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
    p.edited_at,
    coalesce(r.reaction_count, 0),
    mine.emoji,
    coalesce(c.comment_count, 0),
    coalesce(r.reaction_summary, '[]'::jsonb),
    (uf.follower_id is not null)
  from public.community_posts p
  join public.user_profiles up on up.id = p.user_id
  left join lateral (
    select
      count(*) as reaction_count,
      coalesce(
        jsonb_agg(
          jsonb_build_object('emoji', emoji, 'count', emoji_count)
          order by emoji_count desc, emoji
        ),
        '[]'::jsonb
      ) as reaction_summary
    from (
      select cr.emoji, count(*) as emoji_count
      from public.community_post_reactions cr
      where cr.post_id = p.id
      group by cr.emoji
    ) reaction_groups
  ) r on true
  left join lateral (
    select count(*) as comment_count
    from public.community_post_comments cc
    where cc.post_id = p.id
  ) c on true
  left join public.community_post_reactions mine
    on mine.post_id = p.id and mine.user_id = auth.uid()
  left join public.user_follows uf
    on uf.followed_id = p.user_id and uf.follower_id = auth.uid()
  where p.is_hidden = false
    and (p_before_id is null or p.id < p_before_id)
  order by p.id desc
  limit least(greatest(p_limit, 1), 50);
$$;

revoke all on function public.get_community_feed(int, bigint) from public, anon;
grant execute on function public.get_community_feed(int, bigint) to authenticated;

-- 2. One person's own posts, for their profile wall --------------------------
--
-- Same column shape as get_community_feed (minus is_following - a profile
-- page never needs to know if you follow yourself), so the client can reuse
-- the exact same CommunityFeedPost type and post-card rendering instead of
-- a second parallel implementation.

drop function if exists public.get_user_community_posts(uuid, int, bigint);
create function public.get_user_community_posts(p_user_id uuid, p_limit int default 20, p_before_id bigint default null)
returns table (
  id bigint,
  user_id uuid,
  user_name text,
  user_avatar text,
  kind text,
  content text,
  metadata jsonb,
  created_at timestamptz,
  edited_at timestamptz,
  reaction_count bigint,
  my_reaction text,
  comment_count bigint,
  reaction_summary jsonb
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
    p.edited_at,
    coalesce(r.reaction_count, 0),
    mine.emoji,
    coalesce(c.comment_count, 0),
    coalesce(r.reaction_summary, '[]'::jsonb)
  from public.community_posts p
  join public.user_profiles up on up.id = p.user_id
  left join lateral (
    select
      count(*) as reaction_count,
      coalesce(
        jsonb_agg(
          jsonb_build_object('emoji', emoji, 'count', emoji_count)
          order by emoji_count desc, emoji
        ),
        '[]'::jsonb
      ) as reaction_summary
    from (
      select cr.emoji, count(*) as emoji_count
      from public.community_post_reactions cr
      where cr.post_id = p.id
      group by cr.emoji
    ) reaction_groups
  ) r on true
  left join lateral (
    select count(*) as comment_count
    from public.community_post_comments cc
    where cc.post_id = p.id
  ) c on true
  left join public.community_post_reactions mine
    on mine.post_id = p.id and mine.user_id = auth.uid()
  where p.is_hidden = false
    and p.user_id = p_user_id
    and (p_before_id is null or p.id < p_before_id)
  order by p.id desc
  limit least(greatest(p_limit, 1), 50);
$$;

revoke all on function public.get_user_community_posts(uuid, int, bigint) from public, anon;
grant execute on function public.get_user_community_posts(uuid, int, bigint) to authenticated;

-- 3. Follow/follower counts for a profile page --------------------------

drop function if exists public.get_follow_counts(uuid);
create function public.get_follow_counts(p_user_id uuid)
returns table (followers bigint, following bigint)
language sql
security definer
set search_path = public
stable
as $$
  select
    (select count(*) from public.user_follows where followed_id = p_user_id),
    (select count(*) from public.user_follows where follower_id = p_user_id);
$$;

revoke all on function public.get_follow_counts(uuid) from public, anon;
grant execute on function public.get_follow_counts(uuid) to authenticated;
