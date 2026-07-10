-- Run this in the Supabase SQL Editor (safe to re-run - uses IF NOT EXISTS /
-- IF EXISTS guards). Lets logged-in users submit their own document to the
-- existing "documents" table (previously admin-only end to end) for admin
-- review before it becomes publicly visible on /tai-lieu.

alter table public.documents
  add column if not exists status text not null default 'approved';

alter table public.documents drop constraint if exists documents_status_check;
alter table public.documents
  add constraint documents_status_check check (status in ('pending', 'approved', 'rejected'));
-- Existing rows (all admin-uploaded so far) default to 'approved', so
-- nothing already published disappears from /tai-lieu.

create index if not exists documents_status_idx on public.documents(status);

-- The public page should only surface approved documents, plus a
-- submitter's own pending/rejected rows so they can see their submission's
-- status - not everyone else's unreviewed uploads.
drop policy if exists "Anyone can view documents" on public.documents;
create policy "Anyone can view documents"
  on public.documents for select
  to anon, authenticated
  using (status = 'approved' or uploaded_by = auth.uid());

-- Any logged-in user can submit their own document, always landing as
-- 'pending' - only admins (via the separate admin-only insert policy /
-- the service-role client the admin upload flow already uses) can publish
-- straight to 'approved'.
drop policy if exists "Users can submit their own pending documents" on public.documents;
create policy "Users can submit their own pending documents"
  on public.documents for insert
  to authenticated
  with check (uploaded_by = auth.uid() and status = 'pending');
