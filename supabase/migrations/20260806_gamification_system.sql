-- Gamification System Schema Migration
-- Create tables for Assets, Inventories, Domain Mastery, Weekly Challenges, and Challenge Attempts

-- 1. Table: gamification_assets
create table if not exists public.gamification_assets (
  id uuid primary key default gen_random_uuid(),
  asset_type text not null check (asset_type in ('card', 'avatar_frame', 'profile_theme', 'title')),
  asset_key text not null unique,
  name text not null,
  description text,
  rarity text not null default 'common' check (rarity in ('common', 'rare', 'epic', 'legendary')),
  domain_type text check (domain_type in ('accounting', 'valuation', 'corporate_finance', 'economics', 'investment', 'risk_management', 'ai_for_finance', null)),
  image_url text,
  metadata jsonb,
  created_at timestamp with time zone default now()
);

alter table public.gamification_assets enable row level security;
create policy "Assets readable by everyone" on public.gamification_assets for select using (true);

-- 2. Table: user_inventories
create table if not exists public.user_inventories (
  id bigint primary key generated always as identity,
  user_id uuid not null references public.user_profiles on delete cascade,
  asset_id uuid not null references public.gamification_assets on delete cascade,
  acquired_at timestamp with time zone default now(),
  is_equipped boolean default false,
  unique(user_id, asset_id)
);

create index if not exists user_inventories_user_idx on public.user_inventories(user_id);
alter table public.user_inventories enable row level security;
create policy "Users can view their own inventory" on public.user_inventories for select using (auth.uid() = user_id);
create policy "Users can manage their own inventory" on public.user_inventories for all using (auth.uid() = user_id);

-- 3. Table: user_domain_mastery
create table if not exists public.user_domain_mastery (
  id bigint primary key generated always as identity,
  user_id uuid not null references public.user_profiles on delete cascade,
  domain_type text not null check (domain_type in ('accounting', 'valuation', 'corporate_finance', 'economics', 'investment', 'risk_management', 'ai_for_finance')),
  current_xp int default 0,
  current_level int default 1,
  updated_at timestamp with time zone default now(),
  unique(user_id, domain_type)
);

create index if not exists user_domain_mastery_user_idx on public.user_domain_mastery(user_id);
alter table public.user_domain_mastery enable row level security;
create policy "Users can view their own domain mastery" on public.user_domain_mastery for select using (auth.uid() = user_id);
create policy "Users can update their own domain mastery" on public.user_domain_mastery for all using (auth.uid() = user_id);

-- 4. Table: weekly_challenges
create table if not exists public.weekly_challenges (
  id uuid primary key default gen_random_uuid(),
  week_start_date date not null,
  title text not null,
  description text,
  difficulty text not null check (difficulty in ('bronze', 'silver', 'gold')),
  case_study_url text,
  questions jsonb not null, -- Array of 5 questions with options and correct option
  xp_reward int default 200,
  coin_reward int default 50,
  created_at timestamp with time zone default now()
);

alter table public.weekly_challenges enable row level security;
create policy "Challenges readable by everyone" on public.weekly_challenges for select using (true);

-- 5. Table: user_challenge_attempts
create table if not exists public.user_challenge_attempts (
  id bigint primary key generated always as identity,
  user_id uuid not null references public.user_profiles on delete cascade,
  challenge_id uuid not null references public.weekly_challenges on delete cascade,
  score int not null, -- Correct answers count (0 to 5)
  xp_earned int default 0,
  coins_earned int default 0,
  completed_at timestamp with time zone default now(),
  unique(user_id, challenge_id)
);

create index if not exists user_challenge_attempts_user_idx on public.user_challenge_attempts(user_id);
alter table public.user_challenge_attempts enable row level security;
create policy "Users can view their own attempts" on public.user_challenge_attempts for select using (auth.uid() = user_id);
create policy "Users can insert their own attempts" on public.user_challenge_attempts for insert with check (auth.uid() = user_id);

-- Grants
grant select on public.gamification_assets to authenticated;
grant select, insert, update, delete on public.user_inventories to authenticated;
grant select, insert, update, delete on public.user_domain_mastery to authenticated;
grant select on public.weekly_challenges to authenticated;
grant select, insert on public.user_challenge_attempts to authenticated;
