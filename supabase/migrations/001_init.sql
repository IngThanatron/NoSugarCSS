-- NoSugar CSS Chat — initial schema
-- Run this in your Supabase SQL editor (or via supabase db push)

create table if not exists orders (
  id                  uuid primary key default gen_random_uuid(),
  kofi_transaction_id text unique not null,           -- dedup protection
  email               text not null,
  plan_id             text not null,                  -- theme id e.g. 'cyberpunk'
  amount              integer not null,               -- in THB
  promo_code          text,                           -- from Ko-fi message field
  created_at          timestamptz not null default now(),
  delivered_at        timestamptz
);

create table if not exists licenses (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references orders(id) on delete cascade,
  license_key text unique not null,                   -- format: NSC-XXXX-XXXX-XXXX
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Index for fast license key lookup
create index if not exists licenses_key_idx on licenses(license_key);

-- Index for order lookup by transaction id
create index if not exists orders_kofi_idx on orders(kofi_transaction_id);

-- Enable Row Level Security (read-only from client — writes only via service role)
alter table orders  enable row level security;
alter table licenses enable row level security;

-- No public read policies — all access is via service role key in API functions
