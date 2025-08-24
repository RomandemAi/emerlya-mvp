-- Complete RLS policies for brand_drafts table

-- First, check if the policies already exist and drop them if needed
DROP POLICY IF EXISTS "Users can view their own brand drafts" ON brand_drafts;
DROP POLICY IF EXISTS "Users can insert their own brand drafts" ON brand_drafts;
DROP POLICY IF EXISTS "Users can update their own brand drafts" ON brand_drafts;
DROP POLICY IF EXISTS "Users can delete their own brand drafts" ON brand_drafts;

-- Create comprehensive RLS policies for brand_drafts
CREATE POLICY "Users can view their own brand drafts"
  ON brand_drafts FOR SELECT
  USING (
    brand_id IN (
      SELECT id FROM brands WHERE profile_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own brand drafts"
  ON brand_drafts FOR INSERT
  WITH CHECK (
    brand_id IN (
      SELECT id FROM brands WHERE profile_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own brand drafts"
  ON brand_drafts FOR UPDATE
  USING (
    brand_id IN (
      SELECT id FROM brands WHERE profile_id = auth.uid()
    )
  )
  WITH CHECK (
    brand_id IN (
      SELECT id FROM brands WHERE profile_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their own brand drafts"
  ON brand_drafts FOR DELETE
  USING (
    brand_id IN (
      SELECT id FROM brands WHERE profile_id = auth.uid()
    )
  );

-- Ensure RLS is enabled
ALTER TABLE brand_drafts ENABLE ROW LEVEL SECURITY;

-- Add helpful indexes if they don't exist
CREATE INDEX IF NOT EXISTS brand_drafts_brand_id_idx ON brand_drafts(brand_id);
CREATE INDEX IF NOT EXISTS brand_drafts_created_at_idx ON brand_drafts(created_at DESC);
CREATE INDEX IF NOT EXISTS brand_drafts_type_idx ON brand_drafts(type);
