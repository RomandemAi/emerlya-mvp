-- Debug script for brand_drafts save issues

-- 1. Check if brand_drafts table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name = 'brand_drafts'
);

-- 2. Check table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'brand_drafts' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. Check RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'brand_drafts';

-- 4. Check existing policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'brand_drafts';

-- 5. Check current user and test data access
SELECT 
    auth.uid() as current_user_id,
    COUNT(*) as user_brand_count
FROM brands 
WHERE profile_id = auth.uid();

-- 6. Test insert permissions (replace with actual values)
-- INSERT INTO brand_drafts (brand_id, title, content, type) 
-- VALUES ('your-brand-id-here', 'Test Title', 'Test Content', 'generated');

-- 7. Check if there are any existing brand_drafts
SELECT COUNT(*) as total_drafts FROM brand_drafts;

-- 8. Check sample brand data structure
SELECT id, profile_id, name, created_at 
FROM brands 
LIMIT 3;
