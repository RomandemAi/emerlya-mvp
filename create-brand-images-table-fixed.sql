-- Create brand_images table for storing generated images

-- Create the brand_images table
CREATE TABLE IF NOT EXISTS public.brand_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  brand_id uuid REFERENCES public.brands(id) ON DELETE CASCADE,
  original_prompt text NOT NULL,
  revised_prompt text,
  image_url text NOT NULL,
  size text NOT NULL DEFAULT '1024x1024',
  quality text NOT NULL DEFAULT 'standard',
  style text NOT NULL DEFAULT 'vivid',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.brand_images ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own images" ON public.brand_images;
DROP POLICY IF EXISTS "Users can insert their own images" ON public.brand_images;
DROP POLICY IF EXISTS "Users can update their own images" ON public.brand_images;
DROP POLICY IF EXISTS "Users can delete their own images" ON public.brand_images;

-- Create RLS policies for brand_images
CREATE POLICY "Users can view their own images"
  ON public.brand_images FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own images"
  ON public.brand_images FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own images"
  ON public.brand_images FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own images"
  ON public.brand_images FOR DELETE
  USING (user_id = auth.uid());

-- Create indexes for performance (only if they don't exist)
CREATE INDEX IF NOT EXISTS brand_images_user_id_idx ON public.brand_images(user_id);
CREATE INDEX IF NOT EXISTS brand_images_brand_id_idx ON public.brand_images(brand_id);
CREATE INDEX IF NOT EXISTS brand_images_created_at_idx ON public.brand_images(created_at DESC);

-- Create updated_at trigger (only if the function exists)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'handle_updated_at') THEN
    DROP TRIGGER IF EXISTS handle_brand_images_updated_at ON public.brand_images;
    CREATE TRIGGER handle_brand_images_updated_at
      BEFORE UPDATE ON public.brand_images
      FOR EACH ROW
      EXECUTE FUNCTION public.handle_updated_at();
  END IF;
END $$;
