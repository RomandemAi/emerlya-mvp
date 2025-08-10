-- Brand Memory: facts the model should always remember about the brand
create table if not exists brand_memory (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references brands(id) on delete cascade,
  key text not null,
  value text not null,
  importance int default 1 check (importance >= 1 and importance <= 5), -- 1..5
  created_at timestamp default now()
);

-- Brand Settings: quick knobs per brand  
create table if not exists brand_settings (
  brand_id uuid primary key references brands(id) on delete cascade,
  default_tone text default 'on-brand',
  default_type text default 'post',
  region text, -- e.g. "UK", "US"
  language text default 'en',
  profanity_policy text default 'soft',
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Brand Drafts: seed content created at brand creation
create table if not exists brand_drafts (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references brands(id) on delete cascade,
  title text not null,
  content text not null,
  type text not null, -- 'bio', 'tagline', 'caption', 'email', 'ad'
  created_at timestamp default now()
);

-- Brand Chunks: processed document chunks for RAG
create table if not exists brand_chunks (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references brands(id) on delete cascade,
  document_id uuid references documents(id) on delete cascade,
  chunk text not null,
  chunk_index int not null,
  embedding vector(1536), -- OpenAI ada-002 dimension
  created_at timestamp default now()
);

-- Enable RLS on new tables
alter table brand_memory enable row level security;
alter table brand_settings enable row level security;
alter table brand_drafts enable row level security;
alter table brand_chunks enable row level security;

-- Create indexes for performance
create index if not exists brand_memory_brand_id_idx on brand_memory(brand_id);
create index if not exists brand_memory_importance_idx on brand_memory(importance desc);
create index if not exists brand_settings_brand_id_idx on brand_settings(brand_id);
create index if not exists brand_drafts_brand_id_idx on brand_drafts(brand_id);
create index if not exists brand_chunks_brand_id_idx on brand_chunks(brand_id);
create index if not exists brand_chunks_embedding_idx on brand_chunks using ivfflat (embedding vector_cosine_ops);

-- Add RLS policies (users can only access their own brand data)
create policy "Users can view their own brand memory"
  on brand_memory for select
  using (
    brand_id in (
      select id from brands where profile_id = auth.uid()
    )
  );

create policy "Users can insert their own brand memory"
  on brand_memory for insert
  with check (
    brand_id in (
      select id from brands where profile_id = auth.uid()
    )
  );

create policy "Users can update their own brand memory"
  on brand_memory for update
  using (
    brand_id in (
      select id from brands where profile_id = auth.uid()
    )
  );

create policy "Users can delete their own brand memory"
  on brand_memory for delete
  using (
    brand_id in (
      select id from brands where profile_id = auth.uid()
    )
  );

-- Brand Settings policies
create policy "Users can view their own brand settings"
  on brand_settings for select
  using (
    brand_id in (
      select id from brands where profile_id = auth.uid()
    )
  );

create policy "Users can insert their own brand settings"
  on brand_settings for insert
  with check (
    brand_id in (
      select id from brands where profile_id = auth.uid()
    )
  );

create policy "Users can update their own brand settings"
  on brand_settings for update
  using (
    brand_id in (
      select id from brands where profile_id = auth.uid()
    )
  );

-- Brand Drafts policies
create policy "Users can view their own brand drafts"
  on brand_drafts for select
  using (
    brand_id in (
      select id from brands where profile_id = auth.uid()
    )
  );

create policy "Users can insert their own brand drafts"
  on brand_drafts for insert
  with check (
    brand_id in (
      select id from brands where profile_id = auth.uid()
    )
  );

-- Brand Chunks policies
create policy "Users can view their own brand chunks"
  on brand_chunks for select
  using (
    brand_id in (
      select id from brands where profile_id = auth.uid()
    )
  );

create policy "Users can insert their own brand chunks"
  on brand_chunks for insert
  with check (
    brand_id in (
      select id from brands where profile_id = auth.uid()
    )
  );

create policy "Users can delete their own brand chunks"
  on brand_chunks for delete
  using (
    brand_id in (
      select id from brands where profile_id = auth.uid()
    )
  );
