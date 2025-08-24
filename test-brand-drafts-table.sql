-- Test script to verify brand_drafts table is working correctly

-- 1. Check if table exists
SELECT 
  EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'brand_drafts'
  ) AS table_exists;

-- 2. Check table structure
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns 
WHERE table_name = 'brand_drafts' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. Check RLS is enabled
SELECT 
  schemaname, 
  tablename, 
  rowsecurity 
FROM pg_tables 
WHERE tablename = 'brand_drafts';

-- 4. Check RLS policies
SELECT 
  policyname,
  cmd,
  permissive,
  roles
FROM pg_policies 
WHERE tablename = 'brand_drafts'
ORDER BY policyname;

-- 5. Check current user and their brands
SELECT 
  auth.uid() AS current_user_id,
  COUNT(*) AS user_brand_count
FROM brands 
WHERE profile_id = auth.uid();

-- 6. Show user's brands (for reference)
SELECT 
  id,
  name,
  created_at
FROM brands 
WHERE profile_id = auth.uid()
ORDER BY created_at DESC;

-- 7. Test permissions message
SELECT 'All checks completed! The brand_drafts table should now work for content saving.' AS status;
