/*
  # Fix Image Categories

  1. Changes
    - Update category check constraint to include all current categories
    - Add 'service' category which is used but missing from original constraint
    - Ensure all categories match what's actually in use

  2. Current Categories in Database
    - background
    - film
    - film_smaller
    - reference_open
    - reference_closed
    - sponsor
    - logo
    - arrow
    - line
    - shadow
    - misc
    - service (was missing!)
*/

-- Drop the old constraint
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage 
    WHERE constraint_name = 'website_images_category_check'
  ) THEN
    ALTER TABLE website_images DROP CONSTRAINT website_images_category_check;
  END IF;
END $$;

-- Add updated constraint with all categories
ALTER TABLE website_images 
  ADD CONSTRAINT website_images_category_check 
  CHECK (category IN (
    'background',
    'film',
    'film_smaller',
    'reference_open',
    'reference_closed',
    'sponsor',
    'logo',
    'arrow',
    'line',
    'shadow',
    'misc',
    'service'
  ));
