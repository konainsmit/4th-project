create extension if not exists "pgcrypto";

create table if not exists agents (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  phone text,
  whatsapp_number text,
  status text not null default 'offline' check (status in ('online', 'offline', 'away')),
  created_at timestamptz not null default now()
);

create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text not null,
  price numeric(14,2) not null,
  bedrooms integer not null default 0,
  bathrooms numeric(3,1) not null default 0,
  square_feet integer,
  image_url text,
  tags text[] not null default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  assigned_agent_id uuid references agents(id) on delete set null,
  full_name text not null,
  email text,
  phone text,
  budget numeric(14,2),
  financing_status text check (financing_status in ('pre_approved', 'cash', 'exploring')),
  preferred_locations text[] not null default '{}',
  purchase_timeline text,
  tier text not null default 'cold' check (tier in ('hot', 'warm', 'cold')),
  intent_score integer not null default 0 check (intent_score between 0 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists qualification_assessments (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references leads(id) on delete cascade,
  conversation_state jsonb not null default '{}',
  signals jsonb not null default '[]',
  score integer not null check (score between 0 and 100),
  tier text not null check (tier in ('hot', 'warm', 'cold')),
  created_at timestamptz not null default now()
);

create table if not exists tour_bookings (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references leads(id) on delete cascade,
  property_id uuid not null references properties(id) on delete cascade,
  slot timestamptz not null,
  tour_type text not null check (tour_type in ('in_person', 'virtual_3d')),
  status text not null default 'confirmed' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists properties_active_idx on properties(is_active);
create index if not exists leads_tier_idx on leads(tier);
create index if not exists bookings_slot_idx on tour_bookings(slot);

alter table agents enable row level security;
alter table properties enable row level security;
alter table leads enable row level security;
alter table qualification_assessments enable row level security;
alter table tour_bookings enable row level security;
