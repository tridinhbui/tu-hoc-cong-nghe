-- Phase 3 Migration: Financial Guilds and PvP Duels

-- 1. Table: financial_guilds
create table if not exists public.financial_guilds (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  tag text not null,
  logo_emoji text default '🏰',
  leader_id uuid references public.user_profiles(id) on delete set null,
  level integer default 1,
  total_xp integer default 0,
  guild_coins integer default 0,
  created_at timestamp with time zone default now()
);

alter table public.financial_guilds enable row level security;
create policy "Guilds readable by everyone" on public.financial_guilds for select using (true);
create policy "Authenticated users can create guilds" on public.financial_guilds for insert with check (auth.uid() = leader_id);

-- 2. Table: guild_members
create table if not exists public.guild_members (
  id bigint primary key generated always as identity,
  guild_id uuid not null references public.financial_guilds(id) on delete cascade,
  user_id uuid not null references public.user_profiles(id) on delete cascade unique,
  role text default 'member',
  joined_at timestamp with time zone default now()
);

create index if not exists guild_members_guild_idx on public.guild_members(guild_id);
alter table public.guild_members enable row level security;
create policy "Guild members readable by everyone" on public.guild_members for select using (true);
create policy "Users can join guilds" on public.guild_members for insert with check (auth.uid() = user_id);

-- 3. Table: pvp_duels
create table if not exists public.pvp_duels (
  id uuid primary key default gen_random_uuid(),
  challenger_id uuid not null references public.user_profiles(id) on delete cascade,
  opponent_id uuid references public.user_profiles(id) on delete cascade,
  winner_id uuid references public.user_profiles(id) on delete cascade,
  wager_coins integer default 50,
  status text default 'completed',
  challenger_score integer default 0,
  opponent_score integer default 0,
  created_at timestamp with time zone default now()
);

alter table public.pvp_duels enable row level security;
create policy "PvP duels readable by everyone" on public.pvp_duels for select using (true);
create policy "Users can create pvp duels" on public.pvp_duels for insert with check (auth.uid() = challenger_id);

-- Grants
grant select, insert, update on public.financial_guilds to authenticated;
grant select, insert, delete on public.guild_members to authenticated;
grant select, insert on public.pvp_duels to authenticated;
