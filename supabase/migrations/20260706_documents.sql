-- Run this in the Supabase SQL Editor (safe to re-run — uses IF NOT EXISTS guards).
-- Companion to this migration: the "documents" Storage bucket was already
-- created via the Storage API (public read; all writes go through admin
-- server actions using the service-role key, so no storage.objects RLS
-- policies are needed for uploads/deletes).

create table if not exists public.documents (
  id bigint generated always as identity primary key,
  title text not null,
  description text,
  category text not null default 'khac' check (category in ('mau-bieu', 'ebook', 'checklist', 'cong-cu', 'khac')),
  file_url text not null,
  file_name text not null,
  file_size bigint not null default 0,
  download_count bigint not null default 0,
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamp with time zone not null default now()
);

create index if not exists documents_created_at_idx on public.documents(created_at desc);
create index if not exists documents_category_idx on public.documents(category);

alter table public.documents enable row level security;

drop policy if exists "Anyone can view documents" on public.documents;
create policy "Anyone can view documents"
  on public.documents for select
  to anon, authenticated
  using (true);

drop policy if exists "Admins can insert documents" on public.documents;
create policy "Admins can insert documents"
  on public.documents for insert
  to authenticated
  with check (exists (select 1 from public.user_profiles p where p.id = auth.uid() and p.role = 'admin'));

drop policy if exists "Admins can update documents" on public.documents;
create policy "Admins can update documents"
  on public.documents for update
  to authenticated
  using (exists (select 1 from public.user_profiles p where p.id = auth.uid() and p.role = 'admin'));

drop policy if exists "Admins can delete documents" on public.documents;
create policy "Admins can delete documents"
  on public.documents for delete
  to authenticated
  using (exists (select 1 from public.user_profiles p where p.id = auth.uid() and p.role = 'admin'));

grant select on public.documents to anon, authenticated;
grant insert, update, delete on public.documents to authenticated;
grant usage, select on sequence documents_id_seq to authenticated;

-- Lets any logged-in user increment a document's download counter without
-- otherwise being able to update the row (title, file, etc. stay admin-only).
create or replace function public.increment_document_download(doc_id bigint)
returns void
language sql
security definer
set search_path = public
as $$
  update public.documents set download_count = download_count + 1 where id = doc_id;
$$;

grant execute on function public.increment_document_download(bigint) to anon, authenticated;
