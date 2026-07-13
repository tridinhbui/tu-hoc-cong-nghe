-- Personal finance tools (Net Worth Tracker, Budget 50/30/20, Emergency
-- Fund calculator) - lets learners apply lesson concepts to their own
-- numbers instead of only reading about them. Net worth is a time series
-- (new row each update, so it can be charted); budget/emergency fund are
-- a single current plan per user (upsert on user_id).

create table if not exists public.net_worth_snapshots (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  total_assets numeric not null,
  total_liabilities numeric not null,
  net_worth numeric generated always as (total_assets - total_liabilities) stored,
  assets_breakdown jsonb not null default '{}'::jsonb,
  liabilities_breakdown jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone not null default now()
);

create index if not exists net_worth_snapshots_user_idx on public.net_worth_snapshots(user_id, created_at desc);

alter table public.net_worth_snapshots enable row level security;

drop policy if exists "Users can view their own net worth snapshots" on public.net_worth_snapshots;
create policy "Users can view their own net worth snapshots"
  on public.net_worth_snapshots for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can add their own net worth snapshots" on public.net_worth_snapshots;
create policy "Users can add their own net worth snapshots"
  on public.net_worth_snapshots for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own net worth snapshots" on public.net_worth_snapshots;
create policy "Users can delete their own net worth snapshots"
  on public.net_worth_snapshots for delete
  to authenticated
  using (auth.uid() = user_id);

grant select, insert, delete on public.net_worth_snapshots to authenticated;
grant usage, select on sequence net_worth_snapshots_id_seq to authenticated;

create table if not exists public.budget_plans (
  user_id uuid primary key references public.user_profiles(id) on delete cascade,
  monthly_income numeric not null,
  needs_amount numeric not null,
  wants_amount numeric not null,
  savings_amount numeric not null,
  updated_at timestamp with time zone not null default now()
);

alter table public.budget_plans enable row level security;

drop policy if exists "Users can view their own budget plan" on public.budget_plans;
create policy "Users can view their own budget plan"
  on public.budget_plans for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can upsert their own budget plan" on public.budget_plans;
create policy "Users can upsert their own budget plan"
  on public.budget_plans for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own budget plan" on public.budget_plans;
create policy "Users can update their own budget plan"
  on public.budget_plans for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

grant select, insert, update on public.budget_plans to authenticated;

create table if not exists public.emergency_funds (
  user_id uuid primary key references public.user_profiles(id) on delete cascade,
  monthly_expenses numeric not null,
  target_months numeric not null default 6,
  current_saved numeric not null default 0,
  updated_at timestamp with time zone not null default now()
);

alter table public.emergency_funds enable row level security;

drop policy if exists "Users can view their own emergency fund" on public.emergency_funds;
create policy "Users can view their own emergency fund"
  on public.emergency_funds for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can upsert their own emergency fund" on public.emergency_funds;
create policy "Users can upsert their own emergency fund"
  on public.emergency_funds for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own emergency fund" on public.emergency_funds;
create policy "Users can update their own emergency fund"
  on public.emergency_funds for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

grant select, insert, update on public.emergency_funds to authenticated;
