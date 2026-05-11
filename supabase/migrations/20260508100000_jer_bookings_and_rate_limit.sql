-- Bookings table (contact form → server inserts with service role)
-- Rate limiting via RPC (no extra Redis required)

create table if not exists public.jer_bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  organization text,
  check_in date not null,
  check_out date not null,
  guests integer not null default 1 check (guests > 0),
  purpose text,
  message text,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists jer_bookings_created_at_idx on public.jer_bookings (created_at desc);
create index if not exists jer_bookings_status_idx on public.jer_bookings (status);

alter table public.jer_bookings enable row level security;

comment on table public.jer_bookings is 'Inquiries from the public contact form; written only via service role from Next.js API.';

-- Append-only rate limit events (keyed by logical bucket e.g. booking:1.2.3.4)
create table if not exists public.jer_rate_limit_events (
  id bigserial primary key,
  key text not null,
  created_at timestamptz not null default now()
);

create index if not exists jer_rate_limit_events_key_created_idx
  on public.jer_rate_limit_events (key, created_at desc);

alter table public.jer_rate_limit_events enable row level security;

-- Returns true if under limit (and records this attempt); false if over limit.
create or replace function public.jer_check_rate_limit(p_key text, p_max integer, p_window_seconds integer)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  c integer;
begin
  if p_max < 1 or p_window_seconds < 1 then
    return true;
  end if;

  select count(*)::integer into c
  from public.jer_rate_limit_events
  where key = p_key
    and created_at >= now() - make_interval(secs => p_window_seconds);

  if c >= p_max then
    return false;
  end if;

  insert into public.jer_rate_limit_events (key) values (p_key);
  return true;
end;
$$;

comment on function public.jer_check_rate_limit is 'Atomic-ish rate limit check for API routes; call from service role only.';
