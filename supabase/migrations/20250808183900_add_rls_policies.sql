-- GitHub Integration Test: Added 2025-08-08
-- 1. Create policy to allow users to insert their own profile
create policy "Users can insert their own profile."
on public.profiles for insert
with check (auth.uid() = id);

-- 2. Create policy to allow users to read their own profile
create policy "Users can view their own profile."
on public.profiles for select
using (auth.uid() = id);

-- 3. Create policy to allow users to update their own profile
create policy "Users can update their own profile."
on public.profiles for update
using (auth.uid() = id);

-- 4. Create policies for brands table
create policy "Users can create their own brands."
on public.brands for insert
with check (auth.uid() = profile_id);

create policy "Users can view their own brands."
on public.brands for select
using (auth.uid() = profile_id);

create policy "Users can update their own brands."
on public.brands for update
using (auth.uid() = profile_id);

create policy "Users can delete their own brands."
on public.brands for delete
using (auth.uid() = profile_id);

-- 5. Create policies for documents table
create policy "Users can insert documents for their brands."
on public.documents for insert
with check (
  exists (
    select 1 from public.brands
    where brands.id = documents.brand_id
    and brands.profile_id = auth.uid()
  )
);

create policy "Users can view documents for their brands."
on public.documents for select
using (
  exists (
    select 1 from public.brands
    where brands.id = documents.brand_id
    and brands.profile_id = auth.uid()
  )
);

create policy "Users can update documents for their brands."
on public.documents for update
using (
  exists (
    select 1 from public.brands
    where brands.id = documents.brand_id
    and brands.profile_id = auth.uid()
  )
);

create policy "Users can delete documents for their brands."
on public.documents for delete
using (
  exists (
    select 1 from public.brands
    where brands.id = documents.brand_id
    and brands.profile_id = auth.uid()
  )
);

-- 6. Create policies for generations table
create policy "Users can insert generations for their brands."
on public.generations for insert
with check (
  exists (
    select 1 from public.brands
    where brands.id = generations.brand_id
    and brands.profile_id = auth.uid()
  )
);

create policy "Users can view generations for their brands."
on public.generations for select
using (
  exists (
    select 1 from public.brands
    where brands.id = generations.brand_id
    and brands.profile_id = auth.uid()
  )
);

create policy "Users can update generations for their brands."
on public.generations for update
using (
  exists (
    select 1 from public.brands
    where brands.id = generations.brand_id
    and brands.profile_id = auth.uid()
  )
);

create policy "Users can delete generations for their brands."
on public.generations for delete
using (
  exists (
    select 1 from public.brands
    where brands.id = generations.brand_id
    and brands.profile_id = auth.uid()
  )
);
