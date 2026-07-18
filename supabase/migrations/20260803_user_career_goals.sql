-- "Đặt Mục tiêu Sự nghiệp" (target career), moved from the /su-nghiep page's
-- previous localStorage-only implementation to a real per-user row - so it
-- persists across devices and can actually be surfaced on the dashboard
-- ("bạn đang hướng tới: Financial Analyst - đã học 12/30 bài liên quan"),
-- which localStorage alone could never do. One row per user (primary key
-- on user_id) since a person tracks exactly one target career at a time.
create table if not exists public.user_career_goals (
  user_id uuid primary key references auth.users(id) on delete cascade,
  career_id text not null,
  set_at timestamp with time zone not null default now()
);

alter table public.user_career_goals enable row level security;

drop policy if exists "Users can view their own career goal" on public.user_career_goals;
create policy "Users can view their own career goal"
  on public.user_career_goals for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can set their own career goal" on public.user_career_goals;
create policy "Users can set their own career goal"
  on public.user_career_goals for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own career goal" on public.user_career_goals;
create policy "Users can update their own career goal"
  on public.user_career_goals for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can clear their own career goal" on public.user_career_goals;
create policy "Users can clear their own career goal"
  on public.user_career_goals for delete
  to authenticated
  using (auth.uid() = user_id);

grant select, insert, update, delete on public.user_career_goals to authenticated;
