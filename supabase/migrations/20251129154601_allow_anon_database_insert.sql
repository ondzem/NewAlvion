/*
  # Allow Anonymous Database Insert

  1. Changes
    - Allow anon users to insert into website_images table
    - This is needed for the upload script to work

  2. Security
    - Anon users can insert images
    - This should be used carefully in production
*/

-- Drop existing insert policy
DROP POLICY IF EXISTS "Authenticated users can insert images" ON website_images;

-- Allow anon users to insert
CREATE POLICY "Anyone can insert images"
ON website_images FOR INSERT
TO anon, authenticated
WITH CHECK (true);