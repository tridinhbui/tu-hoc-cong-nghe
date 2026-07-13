create table if not exists public.bug_reports (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text not null,
  page_path text,
  status text not null default 'open' check (status in ('open', 'investigating', 'fixed')),
  severity text not null default 'medium' check (severity in ('low', 'medium', 'high')),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create index if not exists bug_reports_user_id_idx on public.bug_reports(user_id);
create index if not exists bug_reports_status_idx on public.bug_reports(status);
create index if not exists bug_reports_created_at_idx on public.bug_reports(created_at desc);

create table if not exists public.bug_report_messages (
  id bigint generated always as identity primary key,
  bug_report_id bigint not null references public.bug_reports(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  sender text not null check (sender in ('user', 'admin', 'system')),
  content text not null,
  created_at timestamp with time zone not null default now()
);

create index if not exists bug_report_messages_bug_report_id_idx on public.bug_report_messages(bug_report_id, created_at asc);

alter table public.bug_reports enable row level security;
alter table public.bug_report_messages enable row level security;

drop policy if exists "Users can view own bug reports" on public.bug_reports;
create policy "Users can view own bug reports"
  on public.bug_reports for select
  to authenticated
  using (
    user_id = auth.uid()
    or exists (
      select 1 from public.user_profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists "Users can create own bug reports" on public.bug_reports;
create policy "Users can create own bug reports"
  on public.bug_reports for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "Admins can update bug reports" on public.bug_reports;
create policy "Admins can update bug reports"
  on public.bug_reports for update
  to authenticated
  using (
    exists (
      select 1 from public.user_profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.user_profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists "Users can view bug report messages" on public.bug_report_messages;
create policy "Users can view bug report messages"
  on public.bug_report_messages for select
  to authenticated
  using (
    exists (
      select 1 from public.bug_reports b
      where b.id = bug_report_id
        and (
          b.user_id = auth.uid()
          or exists (
            select 1 from public.user_profiles p
            where p.id = auth.uid() and p.role = 'admin'
          )
        )
    )
  );

drop policy if exists "Users can create own bug report messages" on public.bug_report_messages;
create policy "Users can create own bug report messages"
  on public.bug_report_messages for insert
  to authenticated
  with check (
    exists (
      select 1 from public.bug_reports b
      where b.id = bug_report_id
        and b.user_id = auth.uid()
    )
    or exists (
      select 1 from public.user_profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

grant select, insert on public.bug_reports to authenticated;
grant update on public.bug_reports to authenticated;
grant select, insert on public.bug_report_messages to authenticated;
grant usage, select on sequence bug_reports_id_seq to authenticated;
grant usage, select on sequence bug_report_messages_id_seq to authenticated;
