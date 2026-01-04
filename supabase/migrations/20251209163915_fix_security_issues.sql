/*
  # Fix Security Issues

  1. Drop unused index
    - Remove `idx_website_images_reference_id` as it's not being used

  2. Fix function search_path
    - Update `update_updated_at_column` function to have secure search_path
    - This prevents potential search_path injection attacks

  ## Notes
  - The reference_id index was created but queries haven't utilized it
  - Setting search_path to empty string makes the function only use fully qualified names
  - This is a security best practice for all database functions
*/

-- Drop unused index
DROP INDEX IF EXISTS idx_website_images_reference_id;

-- Recreate the function with secure search_path
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;