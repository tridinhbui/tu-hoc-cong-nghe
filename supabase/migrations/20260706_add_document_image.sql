-- Add image_url to documents table for post-style display
alter table public.documents add column if not exists image_url text;

-- Create index on image_url for faster filtering
create index if not exists documents_image_url_idx on public.documents(image_url) where image_url is not null;
