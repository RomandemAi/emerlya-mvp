-- Create brand_drafts table for storing generated content

-- Create the brand_drafts table
CREATE TABLE IF NOT EXISTS public.brand_drafts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id uuid REFERENCES public.brands(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  type text NOT NULL DEFAULT 'generated', -- 'generated', 'bio', 'tagline', 'caption', 'email', 'ad'
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.brand_drafts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for brand_drafts
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
  )
  WITH CHECK (
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
CREATE INDEX IF NOT EXISTS brand_drafts_brand_id_idx ON public.brand_drafts(brand_id);
CREATE INDEX IF NOT EXISTS brand_drafts_created_at_idx ON public.brand_drafts(created_at DESC);
CREATE INDEX IF NOT EXISTS brand_drafts_type_idx ON public.brand_drafts(type);

-- Create updated_at trigger function if it doesn't exist
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

-- Grant necessary permissions
GRANT ALL ON public.brand_drafts TO authenticated;
