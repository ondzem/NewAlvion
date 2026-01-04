/*
  # Add Sponsor Category and Storage Policies

  1. Changes
    - Add 'sponsor' category to website_images table
    - Create storage policies for website-images bucket
    - Allow public access to storage bucket

  2. Security
    - Public read access to storage bucket
    - Authenticated users can upload to storage bucket
*/

-- Add 'sponsor' to category check constraint
ALTER TABLE website_images
DROP CONSTRAINT IF EXISTS website_images_category_check;

ALTER TABLE website_images
ADD CONSTRAINT website_images_category_check 
CHECK (category IN ('background', 'reference_open', 'reference_closed', 'film', 'sponsor'));

-- Create storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('website-images', 'website-images', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view website images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;

-- Storage policies for public read access
CREATE POLICY "Public can view website images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'website-images');

-- Storage policies for authenticated upload
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'website-images');

-- Storage policies for authenticated update
CREATE POLICY "Authenticated users can update images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'website-images')
WITH CHECK (bucket_id = 'website-images');

-- Storage policies for authenticated delete
CREATE POLICY "Authenticated users can delete images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'website-images');