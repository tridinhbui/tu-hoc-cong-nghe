-- Let people fix their own FinSocial posts and comments.
--
-- Until now the tables had `grant select, insert, delete` and no UPDATE
-- policy at all, so the only way to correct a typo was delete-and-repost -
-- which throws away every reaction and every comment the post had collected.
--
-- Three things are deliberately constrained here, because an edit button on
-- a social feed is a trust surface, not just a convenience:
--
--  1. Only `kind = 'manual'` posts are editable. The feed also carries
--     system-generated posts ('streak', and anything added later), which
--     carry the platform's voice - "vừa đạt chuỗi 30 ngày". Letting a user
--     rewrite the text of one of those would produce a fabricated
--     achievement wearing a system badge.
--  2. `kind` itself is frozen. Without this, a user could flip a manual post
--     to 'streak' and get the same effect through the back door.
--  3. Hidden posts stay uneditable. `is_hidden` is the moderation flag; if a
--     post has been taken down, editing it back into circulation would
--     undo the moderator's action.

-- 1. Track that an edit happened -----------------------------------------
--
-- Nullable rather than defaulting to created_at: null means "never edited",
-- which is what the UI needs to decide whether to render the "đã chỉnh sửa"
-- marker. Readers deserve to know a post changed after they reacted to it.
alter table public.community_posts
  add column if not exists edited_at timestamp with time zone;

alter table public.community_post_comments
  add column if not exists edited_at timestamp with time zone;

-- 2. RLS: authors may update their own manual, visible posts --------------
--
-- The USING clause decides which rows can be targeted; the WITH CHECK clause
-- decides what the row is allowed to look like afterwards. Both are needed -
-- USING alone would let an author rewrite a row into a state they could not
-- have created.
drop policy if exists "Users can edit their own manual posts" on public.community_posts;
create policy "Users can edit their own manual posts"
  on public.community_posts for update
  using (
    user_id = auth.uid()
    and kind = 'manual'
    and is_hidden = false
  )
  with check (
    user_id = auth.uid()
    and kind = 'manual'
    and is_hidden = false
  );

drop policy if exists "Users can edit their own comments" on public.community_post_comments;
create policy "Users can edit their own comments"
  on public.community_post_comments for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- 3. Column-level grants --------------------------------------------------
--
-- Narrowed on purpose. A blanket `grant update` would also expose user_id
-- (letting an author reassign a post to someone else) and is_hidden (letting
-- them un-hide their own moderated post) - the WITH CHECK above blocks both,
-- but granting only the columns that may legitimately change means a future
-- policy edit cannot silently widen the hole.
grant update (content, metadata, edited_at) on public.community_posts to authenticated;
grant update (content, edited_at) on public.community_post_comments to authenticated;

-- 4. Surface edited_at through the read RPCs ------------------------------
--
-- Both are `security definer` and select an explicit column list, so a new
-- column is invisible to the client until the function is redefined.

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
    and (p_before_id is null or p.id < p_before_id)
  order by p.id desc
  limit least(greatest(p_limit, 1), 50);
$$;

drop function if exists public.get_community_post_comments(bigint, int);
create function public.get_community_post_comments(p_post_id bigint, p_limit int default 30)
returns table (
  id bigint,
  post_id bigint,
  user_id uuid,
  user_name text,
  user_avatar text,
  content text,
  created_at timestamptz,
  edited_at timestamptz
)
language sql
security definer
set search_path = public
stable
as $$
  select
    c.id,
    c.post_id,
    c.user_id,
    coalesce(up.full_name, 'Người học'),
    up.avatar_url,
    c.content,
    c.created_at,
    c.edited_at
  from public.community_post_comments c
  join public.user_profiles up on up.id = c.user_id
  join public.community_posts p on p.id = c.post_id
  where c.post_id = p_post_id
    and p.is_hidden = false
  order by c.created_at asc
  limit least(greatest(p_limit, 1), 100);
$$;

revoke all on function public.get_community_feed(int, bigint) from public, anon;
grant execute on function public.get_community_feed(int, bigint) to authenticated;

revoke all on function public.get_community_post_comments(bigint, int) from public, anon;
grant execute on function public.get_community_post_comments(bigint, int) to authenticated;
