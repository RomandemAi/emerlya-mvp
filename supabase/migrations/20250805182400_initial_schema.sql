-- Create a table for public user profiles
create table public.profiles (
  id uuid references auth.users(id) on delete cascade not null primary key,
  subscription_status text,
  stripe_customer_id text
);

-- Create the 'brands' table
create table public.brands (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade not null,
  name text,
  persona_config_json jsonb,
  created_at timestamptz default now()
);

-- Create the 'documents' table
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references public.brands(id) on delete cascade not null,
  content text,
  status text default 'pending', -- e.g., pending, processed, error
  created_at timestamptz default now()
);

-- Enable Row Level Security (Important for security)
alter table public.profiles enable row level security;
alter table public.brands enable row level security;
alter table public.documents enable row level security;
