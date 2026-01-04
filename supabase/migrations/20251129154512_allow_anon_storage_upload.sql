/*
  # Allow Anonymous Storage Upload

  1. Changes
    - Allow anon users to upload to website-images bucket
    - This is needed for the upload script to work

  2. Security
    - Anon users can upload images
    - This should be used carefully in production
*/

-- Drop existing upload policy
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;

-- Allow anon users to upload
CREATE POLICY "Anyone can upload website images"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'website-images');