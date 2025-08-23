-- Add word_credits column to profiles table for top-up functionality
ALTER TABLE profiles ADD COLUMN word_credits INTEGER DEFAULT 0;

-- Create index for better performance
CREATE INDEX idx_profiles_word_credits ON profiles(word_credits);

-- Add a function to safely add credits
CREATE OR REPLACE FUNCTION add_word_credits(user_id UUID, credits_to_add INTEGER)
RETURNS INTEGER AS $$
DECLARE
  new_total INTEGER;
BEGIN
  UPDATE profiles 
  SET word_credits = COALESCE(word_credits, 0) + credits_to_add
  WHERE id = user_id
  RETURNING word_credits INTO new_total;
  
  RETURN new_total;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION add_word_credits TO authenticated;
