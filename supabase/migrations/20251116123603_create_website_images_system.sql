/*
  # Website Images Storage System

  1. New Tables
    - `website_images`
      - `id` (uuid, primary key)
      - `storage_path` (text) - cesta v Supabase Storage
      - `public_url` (text) - veřejná URL
      - `category` (text) - typ obrázku (background, reference_open, reference_closed, film)
      - `reference_id` (text, nullable) - ID reference (elektrika, storek, raska, spilar)
      - `alt_text` (text) - alt text pro accessibility
      - `display_order` (integer) - pořadí zobrazení
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `website_images` table
    - Add policy for public read access
    - Add policy for authenticated users to manage images

  3. Indexes
    - Index on category for fast filtering
    - Index on reference_id for reference images
*/

-- Create website_images table
CREATE TABLE IF NOT EXISTS website_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path text NOT NULL,
  public_url text NOT NULL,
  category text NOT NULL CHECK (category IN ('background', 'reference_open', 'reference_closed', 'film')),
  reference_id text,
  alt_text text NOT NULL DEFAULT '',
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE website_images ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view website images"
  ON website_images
  FOR SELECT
  TO public
  USING (true);

-- Authenticated users can insert
CREATE POLICY "Authenticated users can insert images"
  ON website_images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update
CREATE POLICY "Authenticated users can update images"
  ON website_images
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete
CREATE POLICY "Authenticated users can delete images"
  ON website_images
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_website_images_category ON website_images(category);
CREATE INDEX IF NOT EXISTS idx_website_images_reference_id ON website_images(reference_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_website_images_updated_at
  BEFORE UPDATE ON website_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
