-- Adds configurable images for corporate/residence page heroes and homepage “Designed for” cards.
-- Run after `20260507120000_jer_gallery_layout.sql`.

alter table public.jer_gallery_layout
  add column if not exists corporate_hero jsonb;

alter table public.jer_gallery_layout
  add column if not exists residence_hero jsonb;

alter table public.jer_gallery_layout
  add column if not exists designed_for jsonb;

comment on column public.jer_gallery_layout.corporate_hero is 'Single {src, alt} for /corporate hero background';
comment on column public.jer_gallery_layout.residence_hero is 'Single {src, alt} for /residence hero background';
comment on column public.jer_gallery_layout.designed_for is 'Array of four {src, alt} for homepage Designed For cards';
