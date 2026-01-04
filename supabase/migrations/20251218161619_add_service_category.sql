/*
  # Add Service Category

  1. Changes
    - Add 'service' category to website_images category enum
    - This allows storing service page images (web, app, design services)
*/

ALTER TABLE website_images
  DROP CONSTRAINT IF EXISTS website_images_category_check;

ALTER TABLE website_images
  ADD CONSTRAINT website_images_category_check
  CHECK (category IN ('background', 'reference_open', 'reference_closed', 'film', 'sponsor', 'logo', 'arrow', 'shadow', 'film_smaller', 'line', 'misc', 'service'));