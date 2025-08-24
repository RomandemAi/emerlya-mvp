-- Create brand_images table for storing generated images
CREATE TABLE IF NOT EXISTS brand_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
    original_prompt TEXT NOT NULL,
    revised_prompt TEXT,
    image_url TEXT NOT NULL,
    size VARCHAR(20) NOT NULL DEFAULT '1024x1024',
    quality VARCHAR(20) NOT NULL DEFAULT 'standard',
    style VARCHAR(20) NOT NULL DEFAULT 'vivid',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_brand_images_user_id ON brand_images(user_id);
CREATE INDEX IF NOT EXISTS idx_brand_images_brand_id ON brand_images(brand_id);
CREATE INDEX IF NOT EXISTS idx_brand_images_created_at ON brand_images(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE brand_images ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own images" ON brand_images
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own images" ON brand_images
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own images" ON brand_images
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own images" ON brand_images
    FOR DELETE USING (auth.uid() = user_id);

-- Grant permissions to authenticated users
GRANT ALL ON brand_images TO authenticated;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_brand_images_updated_at 
    BEFORE UPDATE ON brand_images 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
