-- Simple brand_drafts table creation (no sequence issues)

-- Create the brand_drafts table
CREATE TABLE public.brand_drafts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id uuid REFERENCES public.brands(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  type text NOT NULL DEFAULT 'generated',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.brand_drafts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own brand drafts"
  ON public.brand_drafts FOR SELECT
  USING (
    brand_id IN (
      SELECT id FROM public.brands WHERE profile_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own brand drafts"
  ON public.brand_drafts FOR INSERT
  WITH CHECK (
    brand_id IN (
      SELECT id FROM public.brands WHERE profile_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own brand drafts"
  ON public.brand_drafts FOR UPDATE
  USING (
    brand_id IN (
      SELECT id FROM public.brands WHERE profile_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their own brand drafts"
  ON public.brand_drafts FOR DELETE
  USING (
    brand_id IN (
      SELECT id FROM public.brands WHERE profile_id = auth.uid()
    )
  );

-- Create indexes for performance
CREATE INDEX brand_drafts_brand_id_idx ON public.brand_drafts(brand_id);
CREATE INDEX brand_drafts_created_at_idx ON public.brand_drafts(created_at DESC);

-- Create updated_at function if it doesn't exist
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER handle_brand_drafts_updated_at
  BEFORE UPDATE ON public.brand_drafts
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
