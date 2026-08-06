-- Run this once in the Supabase SQL Editor (Project > SQL Editor > New query)

create table subscribers (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text unique not null,
  consent_timestamp timestamptz not null,
  unsubscribe_token text unique not null,
  active boolean default true,
  created_at timestamptz default now()
);

-- Speeds up the daily send query, which filters on active = true
create index subscribers_active_idx on subscribers (active);
