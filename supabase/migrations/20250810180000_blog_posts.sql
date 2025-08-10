-- Brand Blog Posts: blog posts for each brand
create table if not exists brand_blog_posts (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references brands(id) on delete cascade,
  title text not null,
  content text not null,
  excerpt text, -- first 150 chars or custom excerpt
  tags text[], -- array of tags
  status text default 'draft' check (status in ('draft', 'published')),
  author_type text default 'manual' check (author_type in ('manual', 'ai-generated')),
  topic text, -- original topic/prompt for AI-generated posts
  seo_title text,
  word_count int default 0,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Enable RLS on blog posts table
alter table brand_blog_posts enable row level security;

-- Create indexes for performance
create index if not exists brand_blog_posts_brand_id_idx on brand_blog_posts(brand_id);
create index if not exists brand_blog_posts_status_idx on brand_blog_posts(status);
create index if not exists brand_blog_posts_created_at_idx on brand_blog_posts(created_at desc);
create index if not exists brand_blog_posts_tags_idx on brand_blog_posts using gin(tags);

-- Add RLS policies (users can only access their own brand blog posts)
create policy "Users can view their own brand blog posts"
  on brand_blog_posts for select
  using (
    brand_id in (
      select id from brands where profile_id = auth.uid()
    )
  );

create policy "Users can insert their own brand blog posts"
  on brand_blog_posts for insert
  with check (
    brand_id in (
      select id from brands where profile_id = auth.uid()
    )
  );

create policy "Users can update their own brand blog posts"
  on brand_blog_posts for update
  using (
    brand_id in (
      select id from brands where profile_id = auth.uid()
    )
  );

create policy "Users can delete their own brand blog posts"
  on brand_blog_posts for delete
  using (
    brand_id in (
      select id from brands where profile_id = auth.uid()
    )
  );

-- Function to automatically update updated_at timestamp
create or replace function update_brand_blog_posts_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger to automatically update updated_at
create trigger update_brand_blog_posts_updated_at
  before update on brand_blog_posts
  for each row
  execute function update_brand_blog_posts_updated_at();

-- Function to automatically generate excerpt if not provided
create or replace function generate_blog_excerpt()
returns trigger as $$
begin
  if new.excerpt is null or new.excerpt = '' then
    new.excerpt = left(new.content, 150) || '...';
  end if;
  
  -- Calculate word count
  new.word_count = array_length(string_to_array(trim(new.content), ' '), 1);
  
  return new;
end;
$$ language plpgsql;

-- Trigger to automatically generate excerpt and word count
create trigger generate_blog_excerpt
  before insert or update on brand_blog_posts
  for each row
  execute function generate_blog_excerpt();
