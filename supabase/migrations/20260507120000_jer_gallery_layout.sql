-- Run in Supabase SQL editor or via CLI. Stores which images appear on the homepage hero and /gallery page.
-- Service role (server) bypasses RLS for API routes; no public anon access needed.

create table if not exists public.jer_gallery_layout (
  id text primary key default 'default',
  hero jsonb not null default '[]'::jsonb,
  gallery_page jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.jer_gallery_layout enable row level security;

-- No policies: anon/authenticated cannot read/write; only service role used from Next.js server.

comment on table public.jer_gallery_layout is 'Curated image lists for marketing site hero and gallery page';
